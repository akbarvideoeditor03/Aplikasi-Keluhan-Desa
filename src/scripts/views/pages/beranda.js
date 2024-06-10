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
                            <img src="./kirim-pengaduan.png" alt="">
                            <p>Kirim Pengaduan</p>
                        </div>
                    </a>

                    <a class="menu_link" data-link="#/status-pengaduan"> 
                        <div class="content_menu">   
                            <img src="./status-pengaduan.png" alt="">
                            <p>Status Pengaduan</p>
                        </div>
                    </a>

                    <a href="#/umpan-balik">    
                        <div class="content_menu">
                            <img src="./umpan-balik.png" alt="">
                            <p>Umpan Balik</p>
                        </div>
                    </a>

                    //halaman kotak pengaduan dan kotak penilaian hanya dapat dilihat oleh akun kepala desa (auth.role === kepala desa)

                    <a href="#/kotak-pengaduan">    
                        <div class="content_menu">
                            <img src="" alt="kotak-pangaduan">
                            <p>Kotak Pengaduan</p>
                        </div>
                    </a>

                    <a href="#/kotak-penilaian">    
                        <div class="content_menu">
                            <img src="" alt="kotak-penilaian">
                            <p>Kotak Penilaian</p>
                        </div>
                    </a>

                    <a href="#/kritik-saran">    
                        <div class="content_menu">
                            <img src="./kritik-saran.png" alt="">
                            <p>Kritik & Saran</p> 
                        </div>   
                    </a>

                    <a href="#/bantuan">                        
                        <div class="content_menu">
                            <img src="./bantuan.png" alt="">
                            <p>Bantuan</p>
                        </div>
                    </a>

                    <a href="#/tentang-kami">
                        <div class="content_menu">
                            <img src="./tentang-kami.png" alt="">
                            <p>Tentang Kami</p>
                        </div>
                    </a>
                </div>
            </div>
          </div>
        `;
  },

  async afterRender() {
    const isLoggedIn = false;

    const menuLinks = document.querySelectorAll('.menu_link');
    menuLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        // Hentikan event navigasi
        event.preventDefault();
        // Ambil link tujuan dari atribut data
        const targetLink = link.getAttribute('data-link');

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
  },
};

export default Beranda;
