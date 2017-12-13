let ENV = process.env.NODE_ENV;
console.log(ENV)
function livereloader(){
  if(ENV === "development"){
    return `<script src="http://localhost:35729/livereload.js"></script>`
  } return ``
}
export default ({ body, title, store }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>${title}</title>
        ` + livereloader() +`
      </head>
      <body>
        <div id="app">${body}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(store).replace(/</g, '\\u003c')}
          </script>
        </body>
      <script src="./dist/client.js"></script>
    </html>
  `;
};
