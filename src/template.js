let ENV = process.env.NODE_ENV;

function livereloader(){
  if(ENV === "development"){
    return `<script src="http://localhost:35729/livereload.js"></script>`
  } return ``
}
export default ({ body, title }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        ` + livereloader() +`
      </head>
      <body>
        <div id="app">${body}</div>
      </body>
      <script src="./dist/client.js"></script>
    </html>
  `;
};
