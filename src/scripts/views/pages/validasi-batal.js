const ValidasiBatal = {
  async render() {
    return `
          <div class="content">
            <h2 class="content__heading">Sebentar...</h2>
            <div id="menu" class="menu">
                <div class="validasi">
                    <img src="./icon-tanya.png" alt="">
                    <h2>Apakah Anda yakin ingin membatalkan isian?</h2>
                    <div class="aksi">
                        <button class="belum" id="kembaliButton">
                          Kembali
                        </button>
                        <a href="#/">
                            <button class="sudah" id="yaButton">
                                Ya, saya yakin
                            </button>
                        </a>
                    </div>
                </div>
            </div>
          </div>
        `;
  },

  async afterRender() {
    const yaButton = document.getElementById('yaButton');
    yaButton.addEventListener('click', () => {
      localStorage.removeItem('daftarFormData');
    });

    const kembaliButton = document.getElementById('kembaliButton');
    kembaliButton.addEventListener('click', () => {
      history.back();
    });
  },
};

export default ValidasiBatal;
