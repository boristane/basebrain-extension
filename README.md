# Basebrain Browser Extension

A browser extension for saving memories to Basebrain with a single click.

## Features

- Check authentication status with Basebrain
- Save current page as a memory
- Direct links to Basebrain and login pages
- Beautiful UI inspired by Basebrain's design

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Load the extension in your browser:
   - Chrome: Navigate to `chrome://extensions/`, enable Developer mode, and load the unpacked extension from `.output/chrome-mv3`
   - Firefox: Navigate to `about:debugging`, click "This Firefox", and load the temporary add-on from `.output/firefox-mv3/manifest.json`

### Building

Build the extension for production:
```bash
npm run build
```

Create a packaged zip file:
```bash
npm run package
```

## Architecture

- Built with [WXT](https://wxt.dev/) - Next-gen Web Extension Framework
- Vue 3 for the popup UI
- Tailwind CSS for styling
- TypeScript for type safety

## Authentication

The extension checks for Basebrain authentication by looking for:
- `auth_session` cookie (Bearer token)
- `workspace_id` cookie (Workspace identifier)

If not authenticated, users are directed to the Basebrain login page.

## Next Steps

- Implement page content extraction
- Add memory saving functionality
- Add quick search/access to existing memories
- Implement keyboard shortcuts
- Add context menu integration