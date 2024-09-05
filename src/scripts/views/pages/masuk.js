import Swal from 'sweetalert2';
import supabase from '../../global/config';

const Masuk = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Masuk <i class="bi bi-box-arrow-in-right"></i></h2>
        <div id="menu" class="menu">
          <div class="form">
            <img src="./icon-banner.svg" alt="icon-banner">
            <form id="loginForm">
              <input type="email" name="email" id="email" placeholder="Email*" required>
              <input type="password" name="password" id="password" placeholder="Password*" required>
              <button class="button button-accept" type="submit"><i class="bi bi-box-arrow-in-right"></i> Masuk</button>
            </form>
            <p class="text-link" style="font-weight: 500;">Belum memiliki akun? <a href="#/daftar" style="font-weight: bold;" class="button button-info">Klik Disini</a></p>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const { data, error } = await supabase
          .from('users')
          .select('id, nama, email, password, role, verifikasi, kecamatan, desa')
          .eq('email', email)
          .single();

        if (error || !data) {
          Swal.fire({
            title: 'Error',
            text: 'Pengguna tidak ditemukan.',
            icon: 'error',
            timer: 2000,
            timerProgressBar: true,
          });
          return;
        }

        if (data.password !== password) {
          Swal.fire({
            title: 'Error',
            text: 'Password salah',
            icon: 'error',
            timer: 2000,
            timerProgressBar: true,
          });
          return;
        }

        Swal.fire({
          title: 'Success',
          text: 'Login berhasil',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            localStorage.setItem('user', JSON.stringify(data));
            window.dispatchEvent(new Event('userLoggedIn'));
            window.location.href = '#/beranda';
            window.location.reload();
          },
        });

      } catch (error) {
        console.error('Error during login process:', error);
        Swal.fire({
          title: 'Error',
          text: 'Terjadi kesalahan saat login, silakan coba lagi.',
          icon: 'error',
          timer: 3000,
          timerProgressBar: true,
        });
      }
    });
  },
};

export default Masuk;
