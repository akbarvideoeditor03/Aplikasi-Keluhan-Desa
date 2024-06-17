import Swal from 'sweetalert2';

const Beranda = {
  async render() {
    const user = JSON.parse(localStorage.getItem('user'));
    return `
      <div class="content">
        <h2 class="content__heading">Beranda</h2>
        <div id="menu" class="menu">
          <h4 class="content__subheading">Menu</h4>
          <div class="isi_menu">
            ${!user ? `
              <a href="" class="menu_link" data-link="#/kirim-pengaduan">
                <div class="content_menu">
                  <img src="./web-icons/kirim-pengaduan.svg" alt="">
                  <p>Kirim Pengaduan</p>
                </div>
              </a>
            ` : ''}

            ${user ? `
              ${user.role === 'pengguna' ? `
                <a href="" class="menu_link" data-link="#/kirim-pengaduan">
                  <div class="content_menu">
                    <img src="./web-icons/kirim-pengaduan.svg" alt="">
                    <p>Kirim Pengaduan</p>
                  </div>
                </a>

                <a class="menu_link" data-link="#/status-pengaduan">
                  <div class="content_menu">
                    <img src="./web-icons/status-pengaduan.svg" alt="">
                    <p>Status Pengaduan</p>
                  </div>
                </a>

                <a class="menu_link" data-link="#/umpan-balik">
                  <div class="content_menu">
                    <img src="./web-icons/umpan-balik.svg" alt="">
                    <p>Umpan Balik</p>
                  </div>
                </a>
              ` : ''}

              ${user.role === 'admin' ? `
                <a href="#/umum">
                  <div class="content_menu">
                    <img src="./web-icons/data.svg" alt="Data Pengguna">
                    <p>Data Pengguna</p>
                  </div>
                </a>

                <a href="#/baru">
                  <div class="content_menu">
                    <img src="./web-icons/verifikasi.svg" alt="Verifikasi">
                    <p>Verifikasi</p>
                  </div>
                </a>
              ` : ''}

              ${user.role === 'kepala desa' ? `
                <a href="#/kotak-pengaduan">
                  <div class="content_menu">
                    <img src="./web-icons/kotak-pengaduan.svg" alt="Kotak Pengaduan">
                    <p>Kotak Pengaduan</p>
                  </div>
                </a>
              ` : ''}
            ` : ''}

            <a href="#/kritik-saran">
              <div class="content_menu">
                <img src="./web-icons/kritik-saran.svg" alt="">
                <p>Kritik & Saran</p>
              </div>
            </a>

            <a href="#/bantuan">
              <div class="content_menu">
                <img src="./web-icons/bantuan.svg" alt="">
                <p>Bantuan</p>
              </div>
            </a>

            <a href="#/tentang-kami">
              <div class="content_menu">
                <img src="./web-icons/tentang-kami.svg" alt="">
                <p>Tentang Kami</p>
              </div>
            </a>
          </div>

          ${user ? `
          <div class="logout-container">
            <button id="logoutButton" class="button button-remove">Logout</button>
          </div>
          ` : ''}
        </div>
      </div>
    `;
  },

  async afterRender() {
    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = !!user;

    const menuLinks = document.querySelectorAll('.menu_link');
    menuLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetLink = link.getAttribute('data-link');
        if (!isLoggedIn) {
          Swal.fire({
            title: 'Sebentar...',
            text: 'Apakah Anda sudah memiliki akun Keluhan Desa?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Saya belum punya',
            confirmButtonText: 'Ya, sudah',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '#/masuk';
            } else {
              window.location.href = '#/daftar';
            }
          });
        } else {
          window.location.href = targetLink;
        }
      });
    });

    if (isLoggedIn) {
      const logoutButton = document.getElementById('logoutButton');
      logoutButton.addEventListener('click', () => {
        localStorage.removeItem('user');
        Swal.fire({
          title: 'Berhasil!',
          text: 'Anda telah keluar.',
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
  },
};

export default Beranda;
