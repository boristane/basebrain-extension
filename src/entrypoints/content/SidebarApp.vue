<template>
  <div class="basebrain-sidebar" :class="{ 'dark': isDarkMode }">
    <div class="sidebar-content">
      <!-- Header with Logo -->
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <svg width="100" height="20" viewBox="0 0 419 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M85.376 39.728C86.528 38.0213 88.1067 36.6347 90.112 35.568C92.16 34.5013 94.4853 33.968 97.088 33.968C100.117 33.968 102.848 34.7147 105.28 36.208C107.755 37.7013 109.696 39.8347 111.104 42.608C112.555 45.3387 113.28 48.5173 113.28 52.144C113.28 55.7707 112.555 58.992 111.104 61.808C109.696 64.5813 107.755 66.736 105.28 68.272C102.848 69.808 100.117 70.576 97.088 70.576C94.4427 70.576 92.1173 70.064 90.112 69.04C88.1493 67.9733 86.5707 66.608 85.376 64.944V70H76.416V22.64H85.376V39.728ZM104.128 52.144C104.128 50.0107 103.68 48.176 102.784 46.64C101.931 45.0613 100.779 43.8667 99.328 43.056C97.92 42.2453 96.384 41.84 94.72 41.84C93.0987 41.84 91.5627 42.2667 90.112 43.12C88.704 43.9307 87.552 45.1253 86.656 46.704C85.8027 48.2827 85.376 50.1387 85.376 52.272C85.376 54.4053 85.8027 56.2613 86.656 57.84C87.552 59.4187 88.704 60.6347 90.112 61.488C91.5627 62.2987 93.0987 62.704 94.72 62.704C96.384 62.704 97.92 62.2773 99.328 61.424C100.779 60.5707 101.931 59.3547 102.784 57.776C103.68 56.1973 104.128 54.32 104.128 52.144ZM117.487 52.144C117.487 48.56 118.191 45.3813 119.599 42.608C121.05 39.8347 122.991 37.7013 125.423 36.208C127.898 34.7147 130.65 33.968 133.679 33.968C136.324 33.968 138.628 34.5013 140.591 35.568C142.596 36.6347 144.196 37.9787 145.391 39.6V34.544H154.415V70H145.391V64.816C144.239 66.48 142.639 67.8667 140.591 68.976C138.586 70.0427 136.26 70.576 133.615 70.576C130.628 70.576 127.898 69.808 125.423 68.272C122.991 66.736 121.05 64.5813 119.599 61.808C118.191 58.992 117.487 55.7707 117.487 52.144ZM145.391 52.272C145.391 50.096 144.964 48.24 144.111 46.704C143.258 45.1253 142.106 43.9307 140.655 43.12C139.204 42.2667 137.647 41.84 135.983 41.84C134.319 41.84 132.783 42.2453 131.375 43.056C129.967 43.8667 128.815 45.0613 127.919 46.64C127.066 48.176 126.639 50.0107 126.639 52.144C126.639 54.2773 127.066 56.1547 127.919 57.776C128.815 59.3547 129.967 60.5707 131.375 61.424C132.826 62.2773 134.362 62.704 135.983 62.704C137.647 62.704 139.204 62.2987 140.655 61.488C142.106 60.6347 143.258 59.44 144.111 57.904C144.964 56.3253 145.391 54.448 145.391 52.272ZM176.734 70.576C173.833 70.576 171.23 70.064 168.926 69.04C166.622 67.9733 164.787 66.544 163.422 64.752C162.099 62.96 161.374 60.976 161.246 58.8H170.27C170.441 60.1653 171.102 61.296 172.254 62.192C173.449 63.088 174.921 63.536 176.67 63.536C178.377 63.536 179.699 63.1947 180.638 62.512C181.619 61.8293 182.11 60.9547 182.11 59.888C182.11 58.736 181.513 57.8827 180.318 57.328C179.166 56.7307 177.31 56.0907 174.75 55.408C172.105 54.768 169.929 54.1067 168.222 53.424C166.558 52.7413 165.107 51.696 163.87 50.288C162.675 48.88 162.078 46.9813 162.078 44.592C162.078 42.6293 162.633 40.8373 163.742 39.216C164.894 37.5947 166.515 36.3147 168.606 35.376C170.739 34.4373 173.235 33.968 176.094 33.968C180.318 33.968 183.689 35.0347 186.206 37.168C188.723 39.2587 190.11 42.096 190.366 45.68H181.79C181.662 44.272 181.065 43.1627 179.998 42.352C178.974 41.4987 177.587 41.072 175.838 41.072C174.217 41.072 172.958 41.3707 172.062 41.968C171.209 42.5653 170.782 43.3973 170.782 44.464C170.782 45.6587 171.379 46.576 172.574 47.216C173.769 47.8133 175.625 48.432 178.142 49.072C180.702 49.712 182.814 50.3733 184.478 51.056C186.142 51.7387 187.571 52.8053 188.766 54.256C190.003 55.664 190.643 57.5413 190.686 59.888C190.686 61.936 190.11 63.7707 188.958 65.392C187.849 67.0133 186.227 68.2933 184.094 69.232C182.003 70.128 179.55 70.576 176.734 70.576ZM231.001 51.504C231.001 52.784 230.916 53.936 230.745 54.96H204.825C205.038 57.52 205.934 59.5253 207.513 60.976C209.092 62.4267 211.033 63.152 213.337 63.152C216.665 63.152 219.033 61.7227 220.441 58.864H230.105C229.081 62.2773 227.118 65.0933 224.217 67.312C221.316 69.488 217.753 70.576 213.529 70.576C210.116 70.576 207.044 69.8293 204.313 68.336C201.625 66.8 199.513 64.6453 197.977 61.872C196.484 59.0987 195.737 55.8987 195.737 52.272C195.737 48.6027 196.484 45.3813 197.977 42.608C199.47 39.8347 201.561 37.7013 204.249 36.208C206.937 34.7147 210.03 33.968 213.529 33.968C216.9 33.968 219.908 34.6933 222.553 36.144C225.241 37.5947 227.31 39.664 228.761 42.352C230.254 44.9973 231.001 48.048 231.001 51.504ZM221.721 48.944C221.678 46.64 220.846 44.8053 219.225 43.44C217.604 42.032 215.62 41.328 213.273 41.328C211.054 41.328 209.177 42.0107 207.641 43.376C206.148 44.6987 205.23 46.5547 204.889 48.944H221.721ZM246.501 39.728C247.653 38.0213 249.232 36.6347 251.237 35.568C253.285 34.5013 255.61 33.968 258.213 33.968C261.242 33.968 263.973 34.7147 266.405 36.208C268.88 37.7013 270.821 39.8347 272.229 42.608C273.68 45.3387 274.405 48.5173 274.405 52.144C274.405 55.7707 273.68 58.992 272.229 61.808C270.821 64.5813 268.88 66.736 266.405 68.272C263.973 69.808 261.242 70.576 258.213 70.576C255.568 70.576 253.242 70.064 251.237 69.04C249.274 67.9733 247.696 66.608 246.501 64.944V70H237.541V22.64H246.501V39.728ZM265.253 52.144C265.253 50.0107 264.805 48.176 263.909 46.64C263.056 45.0613 261.904 43.8667 260.453 43.056C259.045 42.2453 257.509 41.84 255.845 41.84C254.224 41.84 252.688 42.2667 251.237 43.12C249.829 43.9307 248.677 45.1253 247.781 46.704C246.928 48.2827 246.501 50.1387 246.501 52.272C246.501 54.4053 246.928 56.2613 247.781 57.84C248.677 59.4187 249.829 60.6347 251.237 61.488C252.688 62.2987 254.224 62.704 255.845 62.704C257.509 62.704 259.045 62.2773 260.453 61.424C261.904 60.5707 263.056 59.3547 263.909 57.776C264.805 56.1973 265.253 54.32 265.253 52.144ZM289.876 40.048C291.028 38.1707 292.521 36.6987 294.356 35.632C296.233 34.5653 298.367 34.032 300.756 34.032V43.44H298.388C295.572 43.44 293.439 44.1013 291.988 45.424C290.58 46.7467 289.876 49.0507 289.876 52.336V70H280.916V34.544H289.876V40.048ZM304.487 52.144C304.487 48.56 305.191 45.3813 306.599 42.608C308.05 39.8347 309.991 37.7013 312.423 36.208C314.898 34.7147 317.65 33.968 320.679 33.968C323.324 33.968 325.628 34.5013 327.591 35.568C329.596 36.6347 331.196 37.9787 332.391 39.6V34.544H341.415V70H332.391V64.816C331.239 66.48 329.639 67.8667 327.591 68.976C325.586 70.0427 323.26 70.576 320.615 70.576C317.628 70.576 314.898 69.808 312.423 68.272C309.991 66.736 308.05 64.5813 306.599 61.808C305.191 58.992 304.487 55.7707 304.487 52.144ZM332.391 52.272C332.391 50.096 331.964 48.24 331.111 46.704C330.258 45.1253 329.106 43.9307 327.655 43.12C326.204 42.2667 324.647 41.84 322.983 41.84C321.319 41.84 319.783 42.2453 318.375 43.056C316.967 43.8667 315.815 45.0613 314.919 46.64C314.066 48.176 313.639 50.0107 313.639 52.144C313.639 54.2773 314.066 56.1547 314.919 57.776C315.815 59.3547 316.967 60.5707 318.375 61.424C319.826 62.2773 321.362 62.704 322.983 62.704C324.647 62.704 326.204 62.2987 327.655 61.488C329.106 60.6347 330.258 59.44 331.111 57.904C331.964 56.3253 332.391 54.448 332.391 52.272ZM354.71 30.32C353.131 30.32 351.809 29.8293 350.742 28.848C349.718 27.824 349.206 26.5653 349.206 25.072C349.206 23.5787 349.718 22.3413 350.742 21.36C351.809 20.336 353.131 19.824 354.71 19.824C356.289 19.824 357.59 20.336 358.614 21.36C359.681 22.3413 360.214 23.5787 360.214 25.072C360.214 26.5653 359.681 27.824 358.614 28.848C357.59 29.8293 356.289 30.32 354.71 30.32ZM359.126 34.544V70H350.166V34.544H359.126ZM387.627 34.032C391.851 34.032 395.264 35.376 397.867 38.064C400.469 40.7093 401.771 44.4213 401.771 49.2V70H392.811V50.416C392.811 47.6 392.107 45.4453 390.699 43.952C389.291 42.416 387.371 41.648 384.939 41.648C382.464 41.648 380.501 42.416 379.051 43.952C377.643 45.4453 376.939 47.6 376.939 50.416V70H367.979V34.544H376.939V38.96C378.133 37.424 379.648 36.2293 381.483 35.376C383.36 34.48 385.408 34.032 387.627 34.032Z" :fill="isDarkMode ? '#f3f4f6' : '#111827'"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 13C5.37258 13 0 18.3726 0 25V65C0 71.6274 5.37258 77 12 77H52C58.6274 77 64 71.6274 64 65V25C64 18.3726 58.6274 13 52 13H12ZM13.8783 54.1132C9.70971 54.1132 6.33044 57.4925 6.33044 61.661C6.33044 65.8296 9.70972 69.2088 13.8783 69.2088H50.0522C54.2207 69.2088 57.6 65.8296 57.6 61.661C57.6 57.4925 54.2207 54.1132 50.0522 54.1132H13.8783Z" fill="#10b981"/>
          </svg>
        </div>
        <button @click="closeSidebar" class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
      </div>

      <!-- Note saved state - takes over entire sidebar -->
      <div v-else-if="showNoteSaved" class="sidebar-main">
        <div class="saving-indicator">
          <span>Note saved!</span>
        </div>
      </div>

      <!-- Main Content -->
      <div v-else class="sidebar-main">
        <template v-if="isAuthenticated">
          <!-- Authenticated State -->

          <!-- Save state - shown when saving or when memory is not saved yet -->
          <div v-if="!savedMemoryId" class="save-state">
            <div v-if="saving" class="saving-indicator">
              <div class="spinner-small"></div>
              <span>Saving your memory...</span>
            </div>
            <div v-else class="action-buttons">
              <button class="action-button action-button-primary" @click="saveCurrent" :disabled="saving">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                {{ saving ? 'Saving...' : 'Save Current Page' }}
              </button>
            </div>
          </div>

          <!-- Post-save state - shown when memory is saved -->
          <div v-if="showAddNoteButton" class="post-save-state">
            <button class="action-button action-button-secondary" @click.stop="onAddNoteClick">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z"></path>
              </svg>
              Add Note
            </button>
          </div>
          
          <!-- DEBUG: Always show add note button for testing -->
          <div v-if="false && savedMemoryId" class="debug-section">
            <p>DEBUG: savedMemoryId = {{ savedMemoryId }}</p>
            <button class="action-button action-button-secondary" @click.stop="onAddNoteClick">
              DEBUG: Force Add Note
            </button>
          </div>

          <!-- Notes input - shown after clicking "Add Note" -->
          <div v-if="savedMemoryId && showNotesInput" class="notes-input">
            <textarea 
              v-model="notes" 
              placeholder="Add your notes..."
              rows="4"
              class="notes-textarea"
              ref="notesTextareaRef"
            ></textarea>
            
            <div class="notes-actions">
              <button class="action-button action-button-secondary" @click.stop="cancelAddNote">
                Cancel
              </button>
              <button class="action-button action-button-primary" @click.stop="saveNote" :disabled="savingNote">
                <span>Save Note</span>
                <div v-if="savingNote" class="spinner-small"></div>
              </button>
            </div>
          </div>
          
          <!-- Status messages -->
          <p v-if="saveStatus && !savedMemoryId && !saving" class="save-status" :class="{ 'error': saveStatus.includes('Failed') }">
            {{ saveStatus }}
          </p>
          
          <p v-if="noteStatus" class="save-status" :class="{ 'error': noteStatus.includes('Failed') }">
            {{ noteStatus }}
          </p>
        </template>

        <template v-else>
          <!-- Non-authenticated State -->
          <div class="action-buttons">
            <button class="action-button action-button-primary" @click="openLogin">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              Sign in to Basebrain
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch, computed } from 'vue'
import { checkAuth } from '../../utils/auth'
import { browser } from 'wxt/browser'

const loading = ref(true)
const isAuthenticated = ref(false)
const authToken = ref(null)
const workspaceId = ref(null)
const isDarkMode = ref(false)
const notes = ref('')
const saving = ref(false)
const savingNote = ref(false)
const saveStatus = ref('')
const noteStatus = ref('')
const savedMemoryId = ref(null)
const showNotesInput = ref(false)
const notesTextareaRef = ref(null)
const autoCloseTimer = ref(null)
const showNoteSaved = ref(false)
const authCheckInterval = ref(null)

// Watch savedMemoryId changes for debugging
watch(savedMemoryId, (newVal, oldVal) => {
  console.log('Content: savedMemoryId changed from', oldVal, 'to', newVal)
  console.log('Content: savedMemoryId is truthy:', !!newVal)
  console.log('Content: showNotesInput value:', showNotesInput.value)
})

// Computed property for showing add note button
const showAddNoteButton = computed(() => {
  const shouldShow = !!savedMemoryId.value && !showNotesInput.value
  console.log('Content: showAddNoteButton computed:', shouldShow, 'savedMemoryId:', savedMemoryId.value, 'showNotesInput:', showNotesInput.value)
  return shouldShow
})

// Check for dark mode
const checkDarkMode = () => {
  isDarkMode.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

// Listen for dark mode changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkDarkMode)

const checkAuthentication = async (isInitialCheck = false) => {
  if (isInitialCheck) {
    loading.value = true
  }
  
  const auth = await checkAuth()
  isAuthenticated.value = auth.isAuthenticated
  authToken.value = auth.authToken
  workspaceId.value = auth.workspaceId
  
  // Automatically save page if authenticated
  if (auth.isAuthenticated && !savedMemoryId.value) {
    // Start saving immediately
    if (isInitialCheck) {
      loading.value = false
    }
    await performSave()
  } else {
    if (isInitialCheck) {
      loading.value = false
    }
  }
}

const startAuthCheckInterval = () => {
  // Clear existing interval if any
  if (authCheckInterval.value) {
    clearInterval(authCheckInterval.value)
  }
  
  // Check auth every 5 seconds if not authenticated
  authCheckInterval.value = setInterval(() => {
    if (!isAuthenticated.value) {
      checkAuthentication(false)
    } else {
      // Stop checking once authenticated
      clearInterval(authCheckInterval.value)
      authCheckInterval.value = null
    }
  }, 5000)
}

const openLogin = () => {
  window.open('https://basebrain.ai/login', '_blank')
}

const saveCurrent = async () => {
  await performSave()
}

const performSave = async () => {
  if (saving.value) return
  
  saving.value = true
  saveStatus.value = 'Saving...'
  
  try {
    // Get page metadata
    const pageTitle = document.title
    const pageUrl = window.location.href
    const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
    
    // Extract keywords from meta tags or generate basic tags
    const metaKeywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content') || ''
    const tags = metaKeywords ? metaKeywords.split(',').map(tag => tag.trim()).filter(tag => tag) : []
    
    // Get page HTML content (limit size to be reasonable)
    const htmlContent = document.documentElement.outerHTML
    
    // Create memory payload without notes initially
    const payload = {
      workspaceId: workspaceId.value,
      url: pageUrl,
      title: pageTitle,
      contents: htmlContent,
      description: metaDescription,
      tags: tags.length > 0 ? tags : ['web', 'saved'],
      origin: 'browser_extension',
      notes: '' // Empty string as required by API
    }
    
    // Send message to background script to make the API call
    const response = await browser.runtime.sendMessage({
      action: 'saveMemory',
      payload
    })
    
    console.log('Save response:', response) // Debug log
    console.log('Response details:', JSON.stringify(response, null, 2)) // More detailed log
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to save')
    }
    
    // Store the memory ID for later use - try all possible paths
    const memoryId = response.memoryId || response.id || response._id || response.data?.id || response.data?._id || response.memory?.id
    console.log('Content: Attempting to extract memory ID from response')
    console.log('Content: response.memoryId:', response.memoryId)
    console.log('Content: response.id:', response.id)
    console.log('Content: response._id:', response._id)
    console.log('Content: extracted memoryId:', memoryId)
    
    if (!memoryId) {
      console.error('Content: Failed to extract memory ID from response!')
      throw new Error('No memory ID returned from API')
    }
    
    savedMemoryId.value = memoryId
    console.log('Content: Setting savedMemoryId.value to:', memoryId)
    console.log('Content: savedMemoryId.value is now:', savedMemoryId.value)
    
    // Clear save status since we're now showing the add note button
    saveStatus.value = ''
    
    // Force Vue to update
    await nextTick()
    
    console.log('Content: After nextTick, savedMemoryId.value:', savedMemoryId.value)
    console.log('Content: showNotesInput.value:', showNotesInput.value)
    console.log('Content: showAddNoteButton should be:', !!savedMemoryId.value && !showNotesInput.value)
    
    // Start auto-close timer (4 seconds)
    startAutoCloseTimer()
    
  } catch (error) {
    console.error('Error saving memory:', error)
    saveStatus.value = 'Failed to save. Please try again.'
    setTimeout(() => {
      saveStatus.value = ''
    }, 3000)
  } finally {
    saving.value = false
  }
}

const saveNote = async () => {
  if (savingNote.value || !savedMemoryId.value) return
  
  savingNote.value = true
  noteStatus.value = 'Saving note...'
  
  try {
    // Send message to background script to update the memory with notes
    const response = await browser.runtime.sendMessage({
      action: 'updateMemoryNotes',
      memoryId: savedMemoryId.value,
      notes: notes.value,
      workspaceId: workspaceId.value
    })
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to save note')
    }
    
    // Show note saved state
    showNoteSaved.value = true
    
    // Close after 2 seconds
    setTimeout(() => {
      closeSidebar()
    }, 2000)
    
  } catch (error) {
    console.error('Error saving note:', error)
    noteStatus.value = 'Failed to save note. Please try again.'
    setTimeout(() => {
      noteStatus.value = ''
    }, 3000)
  } finally {
    savingNote.value = false
  }
}

const cancelAddNote = () => {
  closeSidebar()
}

const onAddNoteClick = () => {
  cancelAutoCloseTimer()
  showNotesInput.value = true
}

const closeSidebar = () => {
  // Dispatch event to notify content script
  window.dispatchEvent(new CustomEvent('basebrain-close-sidebar'))
}

const startAutoCloseTimer = () => {
  // Clear any existing timer
  if (autoCloseTimer.value) {
    clearTimeout(autoCloseTimer.value)
  }
  
  // Set new timer for 4 seconds
  autoCloseTimer.value = setTimeout(() => {
    closeSidebar()
  }, 4000)
}

const cancelAutoCloseTimer = () => {
  if (autoCloseTimer.value) {
    clearTimeout(autoCloseTimer.value)
    autoCloseTimer.value = null
  }
}

// Auto-focus textarea when it appears
watch(() => showNotesInput.value, async (newValue) => {
  if (newValue) {
    await nextTick()
    notesTextareaRef.value?.focus()
  }
})

// Click outside handler
const handleClickOutside = (event) => {
  const sidebar = document.querySelector('.basebrain-sidebar')
  if (sidebar && !sidebar.contains(event.target)) {
    closeSidebar()
  }
}

onMounted(async () => {
  checkDarkMode()
  checkAuthentication(true)
  startAuthCheckInterval()
  
  // Add click outside listener after a small delay to prevent immediate trigger
  await nextTick()
  setTimeout(() => {
    document.addEventListener('click', handleClickOutside)
  }, 100)
})

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (authCheckInterval.value) {
    clearInterval(authCheckInterval.value)
  }
})
</script>

<style scoped>
.basebrain-sidebar {
  position: fixed;
  right: 20px;
  top: 20px;
  width: 380px;
  background: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  z-index: 999999;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  transition: background-color 0.2s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  box-sizing: border-box;
}

.basebrain-sidebar * {
  box-sizing: border-box;
}

.basebrain-sidebar.dark {
  background: #1a1a1a;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.sidebar-content {
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  min-height: 32px;
}

.dark .sidebar-header {
  border-bottom-color: #374151;
}

.sidebar-logo {
  flex: 1;
}

.close-button {
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s;
  margin-left: auto;
}

.close-button:hover {
  color: #374151;
}

.dark .close-button {
  color: #9ca3af;
}

.dark .close-button:hover {
  color: #e5e7eb;
}

.loading-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid #e5e7eb;
  border-top-color: #10b981;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.dark .spinner {
  border-color: #374151;
  border-top-color: #10b981;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.sidebar-main {
  padding: 1rem;
  overflow-y: auto;
  max-height: calc(80vh - 48px);
}


.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border: none;
  outline: none;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  justify-content: center;
  box-sizing: border-box;
}

.action-button:focus {
  outline: none;
}

.action-button-primary {
  background: #10b981;
  color: white;
}

.action-button-primary:hover {
  background: #059669;
}

.dark .action-button-primary {
  background: #10b981;
  color: white;
}

.dark .action-button-primary:hover {
  background: #059669;
}

.action-button-secondary {
  background: #f3f4f6;
  color: #374151;
}

.action-button-secondary:hover {
  background: #e5e7eb;
}

.dark .action-button-secondary {
  background: #374151;
  color: #f3f4f6;
}

.dark .action-button-secondary:hover {
  background: #4b5563;
}

.alert {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #fed7aa;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

.dark .alert {
  background: #7c2d12;
  color: #fed7aa;
}

.alert-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  color: #c2410c;
}

.dark .alert-icon {
  color: #fed7aa;
}

.alert p {
  margin: 0;
  font-size: 0.875rem;
  color: #c2410c;
}

.dark .alert p {
  color: #fed7aa;
}

.save-status {
  margin: 0.5rem 0 0 0;
  padding: 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  text-align: center;
  background: #d1fae5;
  color: #065f46;
}

.dark .save-status {
  background: #064e3b;
  color: #6ee7b7;
}

.save-status.error {
  background: #fee2e2;
  color: #991b1b;
}

.dark .save-status.error {
  background: #7f1d1d;
  color: #fca5a5;
}

.save-status.success {
  background: #d1fae5;
  color: #065f46;
}

.dark .save-status.success {
  background: #064e3b;
  color: #6ee7b7;
}

.post-save-state {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.notes-input {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.notes-textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  resize: vertical;
  background: white;
  color: #111827;
  font-family: inherit;
  box-sizing: border-box;
}

.dark .notes-textarea {
  background: #1f2937;
  border-color: #374151;
  color: #f3f4f6;
}

.notes-textarea:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.notes-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.action-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.save-state {
  width: 100%;
}

.saving-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  padding: 1rem 0;
  color: #059669;
  font-size: 0.875rem;
}

.dark .saving-indicator {
  color: #10b981;
}

.spinner-small {
  width: 1rem;
  height: 1rem;
  border: 2px solid #e5e7eb;
  border-top-color: #10b981;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.dark .spinner-small {
  border-color: #374151;
  border-top-color: #10b981;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000000;
}

.dialog {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.dark .dialog {
  background: #1a1a1a;
  color: #f3f4f6;
}

.dialog h3 {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.dark .dialog h3 {
  color: #f3f4f6;
}

.dialog textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  resize: vertical;
  font-family: inherit;
  font-size: 0.875rem;
  min-height: 100px;
}

.dark .dialog textarea {
  background: #374151;
  border-color: #4b5563;
  color: #f3f4f6;
}

.dialog textarea:focus {
  outline: none;
  border-color: #10b981;
}

.dialog textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.dialog-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: flex-end;
}
</style>