# Quick Notes

Quick Notes is a lightweight browser-based note-taking app for quickly capturing and organizing thoughts by Personal, Work, or Study category. Notes are displayed as readable cards, saved in the browser with localStorage, and can be searched without reloading the page.

## Features

- Add notes with a category and timestamp
- Validate empty notes and notes longer than 200 characters
- Display notes with category-specific styling
- Search notes with case-insensitive, multi-word matching
- Delete individual notes
- Persist notes in localStorage between visits
- Responsive layout for small screens

## Run Locally

1. Open a terminal in the project directory.
2. Start a local web server:

   ```bash
   python3 -m http.server 8000
   ```

3. Open [http://localhost:8000](http://localhost:8000) in your browser.

## What I Learned

- How to structure a small web app with semantic HTML.
- How to use Flexbox and responsive CSS media queries to create a readable layout.
- How to manage application state and persist data with localStorage.
- How to filter and update the DOM in response to user input.
