import 'regenerator-runtime';
import '../styles/style-admin.css';
import '../styles/responsive-admin.css';
import '../styles/tables.css'
import './views/component/admin-header';
import './views/component/admin-footer';
import App from './views/app';
import swal from 'sweetalert';

const app = new App();

window.addEventListener('hashchange', () => {
    app.renderPage();
    document.querySelector('admin-header').highlightActiveNav();
});

window.addEventListener('load', () => {
    app.renderPage();
    document.querySelector('admin-header').highlightActiveNav();
});
