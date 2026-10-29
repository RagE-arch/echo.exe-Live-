# ECHO.exe — GitHub Pages Demo

A haunted-terminal experience for **Hacktoberfest: Ghost in the Machine**.

## Live it on GitHub Pages

1. Create a GitHub repository (for example, `echo-exe`).
2. Upload the contents of this `github-pages` folder to the **root** of the repository: `index.html`, `styles.css`, `app.js`, `README.md`, and `LICENSE`.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch `main` and folder `/(root)`, then click **Save**.
6. Wait for the Pages deployment, then open the URL shown in Settings → Pages (usually `https://YOUR-USERNAME.github.io/REPOSITORY/`).

## Important: demo vs. local AI

GitHub Pages hosts static files only. This version is configured to run directly on Pages and includes scripted, spooky demo replies. It does **not** run Node.js/Express or Ollama in GitHub Pages. To use actual local Ollama inference, run the full project on your own computer using the main project README; a public GitHub Pages website cannot access a visitor's local Ollama instance by itself.

No API keys or external AI services are required for this demo. Google Fonts are optional styling resources; all core interactions work in the browser.
