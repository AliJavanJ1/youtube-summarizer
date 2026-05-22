# YouTube to Gemini Auto Flow

Automatically extract transcripts from YouTube videos and seamlessly send them to Google Gemini for summarization, explanation, or analysis.

## Features

- 📝 **Automatic Transcript Extraction**: Grabs the transcript of the currently playing YouTube video.
- 🤖 **Gemini Integration**: Automatically opens Google Gemini and passes the transcript to it for analysis.
- ⚡ **Built with Bun**: Fast bundling and script execution.

## Prerequisites

- [Bun](https://bun.sh/) is required to build the project.
- A modern web browser that supports Manifest V3 extensions (Google Chrome, Mozilla Firefox, Microsoft Edge, etc.).

## Development & Build

1. Clone or download this repository.
2. Install dependencies:
   ```bash
   bun install
   ```
3. Build the extension bundle (this packages `youtube.js` and dependencies into `youtube.bundle.js`):
   ```bash
   bun run build
   ```

## Installation

### Google Chrome / Brave / Edge

1. Open your browser and navigate to the Extensions page (`chrome://extensions/` or `edge://extensions/`).
2. Enable **Developer mode** (usually a toggle in the top right corner).
3. Click on **Load unpacked**.
4. Select the directory containing this project.

### Mozilla Firefox

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
2. Click on **Load Temporary Add-on...**
3. Select the `manifest.json` file from this project directory.
4. *Note: The extension ID is already configured for Firefox compatibility in the `manifest.json` under `browser_specific_settings.gecko`.*

## Project Structure

- `manifest.json` - Configuration and permissions for the extension.
- `background.js` - Background service worker handling message queues and tab management between YouTube and Gemini.
- `youtube.js` - Source content script for YouTube to extract transcripts.
- `youtube.bundle.js` - Bundled output of `youtube.js` (do not edit directly).
- `gemini.js` - Content script for Gemini to receive the transcript and populate the prompt.
- `package.json` - Project metadata and build scripts.

## License

This project is open-source. Feel free to fork and modify as needed.
