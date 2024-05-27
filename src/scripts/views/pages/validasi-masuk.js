const ValidasiMasuk = {
  async render() {
    return `
          <div class="content">
            <h2 class="content__heading">Sebentar...</h2>
            <div id="menu" class="menu">
                <div class="validasi">
                    <img src="./icon-tanya.png" alt="">
                    <h2>Apakah Anda telah memiliki akun Keluhan Desa?</h2>
                    <div class="aksi">
                        <a href="#/daftar">
                            <button class="belum">
                                Saya belum punya
                            </button>
                        </a>

                        <a href="#/masuk">
                            <button class="sudah">
                                Ya, sudah
                            </button>
                        </a>
                    </div>
                </div>
            </div>
          </div>
        `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
  },
};

export default ValidasiMasuk;
