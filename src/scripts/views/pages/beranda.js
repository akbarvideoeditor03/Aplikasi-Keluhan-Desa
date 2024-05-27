const Beranda = {
  async render() {
    return `
          <div class="content">
            <h2 class="content__heading">Beranda</h2>
            <div id="menu" class="menu">
            <h4 class="content__subheading">Menu</h4>
                <div class="isi_menu">
                    <a href="#/kirim-pengaduan">
                        <button>
                            <img src="./kirim-pengaduan.png" alt="">
                            <p>Kirim Pengaduan</p>
                        </button>
                    </a>

                    <a href="#/status-pengaduan">
                        <button>
                            <img src="./status-pengaduan.png" alt="">
                            <p>Status Pengaduan</p>
                        </button>
                    </a>

                    <a href="#/umpan-balik">
                        <button>
                            <img src="./umpan-balik.png" alt="">
                            <p>Umpan Balik</p>
                        </button>
                    </a>

                    <a href="#/kritik-saran">
                        <button>
                            <img src="./kritik-saran.png" alt="">
                            <p>Kritik & Saran</p>
                        </button>
                    </a>

                    <a href="#/bantuan">
                        <button>
                            <img src="./bantuan.png" alt="">
                            <p>Bantuan</p>
                        </button>
                    </a>

                    <a href="#/tentang-kami">
                        <button>
                            <img src="./tentang-kami.png" alt="">
                            <p>Tentang Kami</p>
                        </button>
                    </a>
                </div>
            </div>
          </div>
        `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
  },
};

export default Beranda;
