
module.exports = {
  html: {
    title: '<%= title %> - <%= description %>',
    template: './index.ejs',
  },
  filename: {
    js: 'js/[name].js',
    css: 'css/style.css',
  },
  entry: './index.js',
  removeDist: true,
}
