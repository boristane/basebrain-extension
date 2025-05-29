import { createApp } from 'vue'
import SidebarApp from './SidebarApp.vue'
import '../../styles/content.css'
import { browser } from 'wxt/browser'

export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    let sidebarContainer: HTMLElement | null = null

    function createSidebar() {
      // Create sidebar container
      sidebarContainer = document.createElement('div')
      sidebarContainer.id = 'basebrain-sidebar-container'
      document.body.appendChild(sidebarContainer)

      // Create Vue app
      const app = createApp(SidebarApp)
      app.mount(sidebarContainer)
    }

    function removeSidebar() {
      if (sidebarContainer) {
        sidebarContainer.remove()
        sidebarContainer = null
      }
    }

    // Listen for sidebar close events from the Vue component
    window.addEventListener('basebrain-close-sidebar', () => {
      removeSidebar()
    })

    // Listen for messages from the background script
    browser.runtime.onMessage.addListener((message: any) => {
      if (message.action === 'toggleSidebar') {
        if (sidebarContainer && document.getElementById('basebrain-sidebar-container')) {
          removeSidebar()
        } else {
          createSidebar()
        }
      }
    })
  }
})