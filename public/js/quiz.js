const _pageConstants = { // eslint-disable-line no-unused-vars
  host: window.location.host,
  protocol: 'http',
  createOperation: {
    path: '/create',
    name: 'CREATE'
  },
  readOperation: {
    path: '/quiz',
    name: 'READ'
  }
};
let quizApp = angular.module('quizApp', ['ngCookies']); // eslint-disable-line no-unused-vars, prefer-const, no-template-curly-in-string
let editor;
$(function(){
  const LibPath = './static/libs/editor.md-master/lib/';
    editor = editormd('editormd', { // eslint-disable-line  no-unused-vars
    path: LibPath, // Autoload modules mode, codemirror, marked... dependents libs path
    emoji: true,
    theme: 'dark',
    previewTheme: 'dark',
    editorTheme: 'pastel-on-dark',
    saveHTMLToTextarea: true
  });
  editormd.loadScript(LibPath + '../languages/'.concat('en'), () => {}); // eslint-disable-line no-template-curly-in-string
});