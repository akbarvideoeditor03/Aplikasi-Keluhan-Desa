const Masuk = {
  async render() {
    return `
          <div class="content">
            <h2 class="content__heading">Masuk</h2>
            <div id="menu" class="menu">
                <div class="form">
                    <img src="./icon-banner.svg" alt="icon-banner">
                    <form action="">
                        <input type="email" name="email" id="email" placeholder="Email*" required>
                        <input type="password" name="password" id="password" placeholder="Password*" required>
                        <button class="btn-masuk" type="submit">MASUK</button>
                    </form>
                    <p>Belum memiliki akun? <a href="#/daftar">Klik Disini</a></p>
                </div>
            </div>
          </div>
        `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
  },
};

export default Masuk;
