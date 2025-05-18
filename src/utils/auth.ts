import { browser } from 'wxt/browser'

interface AuthInfo {
  isAuthenticated: boolean
  authToken: string | null
  workspaceId: string | null
}

export async function checkAuth(): Promise<AuthInfo> {
  try {
    console.log('Checking authentication...')
    
    // Send message to background script to check cookies
    const result = await browser.runtime.sendMessage({ action: 'checkAuth' })
    
    console.log('Auth check result:', result)
    return result as AuthInfo
  } catch (error) {
    console.error('Error checking auth:', error)
    return {
      isAuthenticated: false,
      authToken: null,
      workspaceId: null
    }
  }
}