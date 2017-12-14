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
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="dist/assets/favicon.ico">
        <link rel="manifest" href="dist/assets/manifest.json">

        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="application-name" content="Finbar's Isomorph">
        <meta name="apple-mobile-web-app-title" content="Finbar's Isomorph">
        <meta name="theme-color" content="#e6e6e6">
        <meta name="msapplication-navbutton-color" content="#e6e6e6">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="msapplication-starturl" content="/">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${title}</title>
        ` + livereloader() + `
      </head>
      <body>
        <div id="app">${body}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(store).replace(/</g, '\\u003c')}
          </script>
          <script src="./dist/client.js"></script>
      </body>
    </html>
  `;
};
