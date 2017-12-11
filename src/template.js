export default ({ body, title }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <script src="http://localhost:35729/livereload.js"></script>
      </head>
      <body>
        <div id="app">${body}</div>
      </body>
      <script src="./dist/client.js"></script>
    </html>
  `;
};
