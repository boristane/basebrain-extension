# Icon Setup Instructions

The extension requires PNG files for icons. Browser extensions don't support SVG files for manifest icons.

## Required Icon Files

You need to create these PNG files in the `/public/` directory:
- `icon-16.png` (16x16 pixels)
- `icon-32.png` (32x32 pixels)
- `icon-48.png` (48x48 pixels)
- `icon-128.png` (128x128 pixels)

## Converting the SVG to PNG

1. Open the SVG file: `/public/icons/icon.svg`
2. Use an image editor or online converter to:
   - Export to PNG at each required size
   - Ensure transparent background is preserved
   - Save with the filenames listed above

## Recommended Tools

- Online converter: https://cloudconvert.com/svg-to-png
- Image editor: GIMP, Photoshop, or Inkscape
- Command line: ImageMagick (`convert icon.svg -resize 128x128 icon-128.png`)

## Alternative: Using @wxt-dev/auto-icons

Install the auto-icons module:
```bash
npm i --save-dev @wxt-dev/auto-icons
```

Then place a single high-resolution PNG (at least 128x128) at:
`/src/assets/icon.png`

The module will automatically generate all required sizes.

## After Creating Icons

1. Place the PNG files in `/public/`
2. The current configuration in `wxt.config.ts` is already set up for PNG files
3. Run `npm run build` to rebuild the extension
4. Reload the extension in your browser