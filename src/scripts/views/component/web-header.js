import Swal from "sweetalert2";

class WebHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.innerHTML = `
      <div class="jumbotron">
        <div class="jumbotron-title">
          <div class="app_bar_title">
            <div class="header-icon">
              <img src="./web-icons/icon.svg" alt="header-icon">
            </div>
            <div class="app-bar__brand">
              <h1>Selamat datang ${user ? `${user.nama},` : ``} di aplikasi Keluhan Desa</h1>
              <h2>Solusi pengaduan cepat dan tepat</h2>
            </div>
          </div>
          ${!user ? `
          <div class="sign_in right-side">
            <a href="#/masuk">
              <img src="./web-icons/sign_in.svg" alt="Sign In">
              <p>Masuk</p>
            </a>
          </div>
          ` : ''}
        </div>
      </div>
      <nav id="navigationDrawer">
        <div class="drawer-open">
          <button id="navigationDrawerSatu" class="app-bar__menu">☰</button>
          <nav id="drawer">
            <ul class="nav__list">
              <li><a href="#/beranda"><i class="bi bi-house-door-fill"></i> Beranda</a></li>
              ${user ? `
              ${user.role === 'admin' ? `
              <li><a href="#/account"><i class="bi bi-person-circle"></i> Akun</a></li>
              ` : `
              <li><a href="#/akun"><i class="bi bi-person-circle"></i> Akun</a></li>
              `}
              ` : ''}
            </ul>
          </nav>
        </div>
        <div class="nav-open">
          <ul class="nav">
            <li><a href="#/beranda"><i class="bi bi-house-door-fill"></i> Beranda</a></li>
            ${user ? `
            ${user.role === 'admin' ? `
            <li><a href="#/account"><i class="bi bi-person-circle"></i> Akun</a></li>
            ` : `
            <li><a href="#/akun"><i class="bi bi-person-circle"></i> Akun</a></li>
            `}
            ` : ''}
          </ul>
        </div>
      </nav>
    `;

    if (user) {
      const logoutButton = this.querySelector('#logoutButton');
      if (logoutButton) {
        logoutButton.addEventListener('click', () => {
          localStorage.removeItem('user');
          Swal.fire({
            title: 'Selesai',
            text: 'Anda berhasil keluar.',
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
            },
            willClose: () => {
              window.location.reload();
            }
          });
        });
      }
    }
  }
}

customElements.define('web-header', WebHeader);
