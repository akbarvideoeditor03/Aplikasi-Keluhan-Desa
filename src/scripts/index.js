import 'regenerator-runtime';
import '../styles/style.css';
import '../styles/responsive.css';
import '../styles/team-profiles.css';
import '../styles/tables.css';
import '../styles/loading.css';
import '../scripts/views/component/web-header';
import '../scripts/views/component/web-footer';
import App from './views/app';

const app = new App({
  button: document.querySelector('#navigationDrawerSatu'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});