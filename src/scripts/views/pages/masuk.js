import Swal from 'sweetalert2';

const Masuk = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Masuk</h2>
        <div id="menu" class="menu">
          <div class="form">
            <img src="./favicon.png" alt="">
            <form id="loginForm">
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
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Mencegah pengiriman formulir secara default

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch(`https://ap-southeast-1.aws.data.mongodb-api.com/app/keluhandesa-gnkpeux/endpoint/sign_in_user?email=${email}&password=${password}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();

        if (result.statusCode === 200) {
          localStorage.setItem('user', JSON.stringify(result));
          Swal.fire({
            title: 'Berhasil Login',
            text: 'Dalam 2 detik anda akan dialihkan',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000, // Waktu dalam milidetik sebelum notifikasi ditutup secara otomatis
            timerProgressBar: true, // Menampilkan progress bar waktu
          }).then(() => {
            // Alihkan pengguna ke halaman lain setelah menutup notifikasi
            window.location.href = '#/beranda'; // Ganti '/dashboard' dengan URL tujuan Anda
          });
          console.log(result.body, response);
        } else {
          Swal.fire({
            title: 'Gagal',
            text: result.body,
            icon: 'error',
          });
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
        alert('Terjadi kesalahan. Silakan coba lagi.');
      }
    });
  },
};

export default Masuk;
