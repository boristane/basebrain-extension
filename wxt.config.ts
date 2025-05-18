import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  manifestVersion: 3,
  manifest: {
    name: 'Basebrain Extension',
    description: 'Save memories to Basebrain',
    permissions: ['cookies', 'storage', 'tabs', 'activeTab', 'scripting'],
    host_permissions: ['https://basebrain.ai/*', '<all_urls>', 'http://localhost/*'],
    icons: {
      "16": "icons/brain-logo.svg",
      "48": "icons/brain-logo.svg",
      "128": "icons/brain-logo.svg"
    },
    action: {
      default_icon: {
        "16": "icons/brain-logo.svg",
        "48": "icons/brain-logo.svg",
        "128": "icons/brain-logo.svg"
      },
      default_title: "Toggle Basebrain sidebar"
    }
  },
  srcDir: 'src',
  vite: () => ({
    plugins: [vue()],
  }),
});