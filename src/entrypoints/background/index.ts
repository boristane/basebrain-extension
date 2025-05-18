export default defineBackground(() => {
  console.log('Basebrain background script initialized', { id: browser.runtime.id })
  
  // Handle extension icon click
  browser.action.onClicked.addListener(async (tab) => {
    if (tab.id) {
      // Send message to content script to toggle sidebar
      await browser.tabs.sendMessage(tab.id, { action: 'toggleSidebar' })
    }
  })
  
  // Listen for messages from content scripts
  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'checkAuth') {
      // Check cookies in the background script where we have permissions
      checkAuthCookies().then(sendResponse)
      return true // Indicates we will send a response asynchronously
    }
    
    if (request.action === 'saveMemory') {
      // Make API call from background script to avoid CORS issues
      saveMemory(request.payload).then(sendResponse)
      return true
    }
    
    if (request.action === 'updateMemoryNotes') {
      // Update memory with notes
      updateMemoryNotes(request.memoryId, request.notes, request.workspaceId).then(sendResponse)
      return true
    }
  })
  
  // Handle extension installation
  browser.runtime.onInstalled.addListener(() => {
    console.log('Basebrain extension installed')
  })
})

async function checkAuthCookies() {
  try {
    console.log('Background: Checking authentication...')
    
    // Get all cookies for basebrain.ai
    const allCookies = await browser.cookies.getAll({
      url: 'https://basebrain.ai'
    })
    
    console.log('Background: All cookies found for basebrain.ai:', allCookies.map(c => ({
      name: c.name,
      domain: c.domain,
      path: c.path,
      value: c.value.substring(0, 20) + '...'
    })))
    
    // Find specific cookies
    let authSessionCookie = allCookies.find(c => c.name === 'auth_session')
    let workspaceIdCookie = allCookies.find(c => c.name === 'workspace_id')
    
    // If not found, try without URL constraint  
    if (!authSessionCookie || !workspaceIdCookie) {
      const allCookiesAny = await browser.cookies.getAll({})
      const basebrainCookies = allCookiesAny.filter(c => 
        c.domain.includes('basebrain.ai') || 
        c.domain === '.basebrain.ai' ||
        c.domain === 'basebrain.ai'
      )
      
      console.log('Background: Basebrain cookies found:', basebrainCookies.map(c => ({
        name: c.name,
        domain: c.domain
      })))
      
      const authFromAny = basebrainCookies.find(c => c.name === 'auth_session')
      const workspaceFromAny = basebrainCookies.find(c => c.name === 'workspace_id')
      
      if (authFromAny && !authSessionCookie) {
        authSessionCookie = authFromAny
      }
      if (workspaceFromAny && !workspaceIdCookie) {
        workspaceIdCookie = workspaceFromAny
      }
    }
    
    const authToken = authSessionCookie?.value || null
    const workspaceId = workspaceIdCookie?.value || null
    
    const result = {
      isAuthenticated: !!authToken,
      authToken,
      workspaceId
    }
    
    console.log('Background: Auth check result:', {
      isAuthenticated: result.isAuthenticated,
      hasToken: !!result.authToken,
      workspaceId: result.workspaceId
    })
    
    return result
  } catch (error) {
    console.error('Background: Error checking auth:', error)
    return {
      isAuthenticated: false,
      authToken: null,
      workspaceId: null
    }
  }
}

async function saveMemory(payload: any) {
  try {
    console.log('Background: Saving memory...')
    payload.contents = undefined;
    console.log('Background: Payload:', payload)
    
    // Get auth info including token
    const authInfo = await checkAuthCookies()
    
    if (!authInfo.isAuthenticated || !authInfo.authToken) {
      throw new Error('Not authenticated')
    }
    
    // Prepare the request
    const url = 'https://api.basebrain.ai/v1/memories'
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authInfo.authToken}`
    }
    const body = JSON.stringify(payload)
    
    console.log('Background: Request URL:', url)
    console.log('Background: Request headers:', headers)
    console.log('Background: Request body (truncated):', body.substring(0, 500) + '...')
    
    // Make the API request with Bearer token
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    })
    
    console.log('Background: Response status:', response.status)
    console.log('Background: Response headers:', Object.fromEntries(response.headers.entries()))
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Background: Error response body:', errorText)
      
      let errorData = {}
      try {
        errorData = JSON.parse(errorText)
      } catch (e) {
        console.error('Background: Could not parse error response as JSON')
      }
      
      throw new Error(`Failed to save: ${response.status} ${response.statusText} - ${errorData.error?.detail || errorData.detail || errorText}`)
    }
    
    const data = await response.json()
    console.log('Background: Memory saved successfully', data)
    console.log('Background: Full response data:', JSON.stringify(data, null, 2))
    console.log('Background: Data keys:', Object.keys(data))
    
    // Try to extract memory ID from different possible locations
    const memoryId = data.result?.id || data.id || data._id || data.memoryId || data.memory?.id || data.memory?._id || data.data?.id || data.data?._id
    console.log('Background: Extracted memory ID:', memoryId)
    
    if (!memoryId) {
      console.error('Background: No memory ID found in response')
      console.error('Background: Response structure:', JSON.stringify(data, null, 2))
    }
    
    return { success: true, memoryId }
    
  } catch (error) {
    console.error('Background: Error saving memory:', error)
    return { success: false, error: error.message }
  }
}

async function updateMemoryNotes(memoryId: string, notes: string, workspaceId?: string) {
  try {
    console.log('Background: Updating memory notes...')
    console.log('Background: Memory ID:', memoryId)
    console.log('Background: Workspace ID:', workspaceId)
    
    // Get auth info including token
    const authInfo = await checkAuthCookies()
    
    if (!authInfo.isAuthenticated || !authInfo.authToken) {
      throw new Error('Not authenticated')
    }
    
    // Use workspace ID from parameter or from auth info
    const workspace = workspaceId || authInfo.workspaceId
    
    if (!workspace) {
      throw new Error('Workspace ID not found')
    }
    
    // Make the PATCH request with Bearer token
    const url = `https://api.basebrain.ai/v1/memories/${workspace}/${memoryId}`
    console.log('Background: PATCH URL:', url)
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authInfo.authToken}`
      },
      body: JSON.stringify({ notes })
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`Failed to update notes: ${response.status} ${response.statusText} - ${errorData.error?.detail || ''}`)
    }
    
    const data = await response.json()
    console.log('Background: Memory notes updated successfully', data)
    return { success: true }
    
  } catch (error) {
    console.error('Background: Error updating memory notes:', error)
    return { success: false, error: error.message }
  }
}