export function createPreview(html, css) {
    return `<!DOCTYPE html>
  <html>
    <head>
      <title>My Cats Page</title>
    </head>
    <style>${css}</style>
    <body>
     ${html}
    </body>
  </html>`
}

