import Swal from 'sweetalert2';

const Beranda = {
  async render() {
    return `
          <div class="content">
            <h2 class="content__heading">Beranda</h2>
            <div id="menu" class="menu">
            <h4 class="content__subheading">Menu</h4>
                <div class="isi_menu">

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

                    <a href="#/umpan-balik">    
                        <div class="content_menu">
                            <img src="./web-icons/umpan-balik.svg" alt="">
                            <p>Umpan Balik</p>
                        </div>
                    </a>
                    
                    <a href="#/kotak-pengaduan">    
                        <div class="content_menu">
                            <img src="./web-icons/kotak-pengaduan.svg" alt="kotak-pangaduan">
                            <p>Kotak Pengaduan</p>
                        </div>
                    </a>

                    <a href="#/notifikasi">    
                        <div class="content_menu">
                            <img src="./web-icons/notifikasi.svg" alt="notifikasi">
                            <p>Notifikasi</p>
                        </div>
                    </a>

                    <a href="#/kotak-penilaian">    
                        <div class="content_menu">
                            <img src="./web-icons/kotak-penilaian.svg" alt="kotak-penilaian">
                            <p>Kotak Penilaian</p>
                        </div>
                    </a>

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

                    <button id="logoutButton" class="btn-logout">Logout</button>
                </div>
            </div>
          </div>
        `;
  },

  async afterRender() {
    const menuLinks = document.querySelectorAll('.menu_link');
    menuLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        // Hentikan event navigasi
        event.preventDefault();
        // Ambil link tujuan dari atribut data
        const targetLink = link.getAttribute('data-link');

        const isLoggedIn = !!localStorage.getItem('user');

        // Jika pengguna belum login, tampilkan pop-up konfirmasi
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
          // Jika pengguna sudah login, langsung arahkan ke link tujuan
          window.location.href = targetLink;
        }
      });
    });

    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', () => {
      Swal.fire({
        title: 'Sebentar...',
        text: 'Apakah Anda yakin ingin keluar?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Kembali',
        confirmButtonText: 'Ya, keluar',
      }).then((result) => {
        if (result.isConfirmed) {
          // Hapus data pengguna dari localStorage
          localStorage.removeItem('user');
          // Redirect pengguna ke halaman login
          window.location.href = '#/masuk';

          // Perbarui tampilan profil pengguna setelah logout
          const userProfile = document.querySelector('.user-profile');
          userProfile.innerHTML = '<div class="sign_in"><a href="#/masuk"><img src="./sign_in.png" alt=""> Masuk</a></div>';
        } else {
          window.location.href = '#/daftar';
        }
      });
    });

    // Perbarui tampilan profil pengguna
    const userProfile = document.querySelector('.user-profile');
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      userProfile.innerHTML = `<p>${user.body.nama}</p>`; // Ganti 'nama' dengan properti yang sesuai
    } else {
      userProfile.innerHTML = '<div class="sign_in"><a href="#/masuk"><img src="./sign_in.png" alt=""> Masuk</a></div>';
    }
  },
};

export default Beranda;
