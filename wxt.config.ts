import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  manifestVersion: 3,
  manifest: {
    name: 'Basebrain - Your memory with AI',
    description: 'Save websites and web content to your personal knowledge base',
    permissions: ['cookies', 'storage', 'tabs', 'activeTab', 'scripting'],
    host_permissions: ['https://basebrain.ai/*', '<all_urls>', 'http://localhost/*'],
    icons: {
      "16": "icons/icon-16.png",
      "32": "icons/icon-32.png",
      "48": "icons/icon-48.png",
      "128": "icons/icon-128.png"
    },
    action: {
      default_icon: {
        "16": "icons/icon-16.png",
        "32": "icons/icon-32.png",
        "48": "icons/icon-48.png",
        "128": "icons/icon-128.png"
      },
      default_title: "Toggle Basebrain sidebar"
    }
  },
  srcDir: 'src',
  vite: () => ({
    plugins: [vue()],
  }),
});