import Swal from 'sweetalert2';

const Beranda = {
  async render() {
    const user = JSON.parse(localStorage.getItem('user'));
    return `
      <div class="content">
        <h2 class="left"><i class="bi bi-house-door-fill"></i> Beranda</h2>
        <div id="menu" class="menu container col-container">
          <h3><i class="bi bi-ui-checks-grid"></i> Menu</h3>
          <div class="isi_menu">
            ${!user ? `

              <a href="" class="menu_link" data-link="#/kirim-pengaduan">
                <div class="content_menu">
                  <img src="./web-icons/kirim-pengaduan.svg" alt="">
                  <p>Kirim Pengaduan</p>
                </div>
              </a>

              <a href="#/kritik-saran">
                <div class="content_menu">
                  <img src="./web-icons/kritik-saran.svg" alt="">
                  <p>Kritik & Saran</p>
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

                <a href="#/kritik-saran">
                  <div class="content_menu">
                    <img src="./web-icons/kritik-saran.svg" alt="">
                    <p>Kritik & Saran</p>
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

                <a href="#/aktivitas">
                  <div class="content_menu">
                    <img src="./web-icons/user-activity.svg" alt="Verifikasi">
                    <p>Aktivitas Pengguna</p>
                  </div>
                </a>

                <a href="#/krisar">
                  <div class="content_menu">
                    <img src="./web-icons/kritik-saran.svg" alt="">
                    <p>Kumpulan Kritik & Saran</p>
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

                <a href="#/kritik-saran">
                  <div class="content_menu">
                    <img src="./web-icons/kritik-saran.svg" alt="">
                    <p>Kritik & Saran</p>
                  </div>
                </a>
              ` : ''}
            ` : ''}

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
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonColor: "#3481AC",
            denyButtonColor: "#3481AC",
            cancelButtonColor: "#6e7881ff",
            confirmButtonText: 'Ya, sudah',
            denyButtonText: 'Saya belum punya',
            cancelButtonText: 'Batal',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '#/masuk';
            } else if (result.isDenied) {
              window.location.href = '#/daftar';
            }
          });
        } else {
          window.location.href = targetLink;
        }                
      });
    });
  },
};

export default Beranda;
