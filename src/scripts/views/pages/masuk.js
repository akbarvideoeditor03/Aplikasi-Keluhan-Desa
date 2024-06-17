import Swal from 'sweetalert2';
import supabase from '../../global/config';

const Masuk = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Masuk</h2>
        <div id="menu" class="menu">
          <div class="form">
            <img src="./icon-banner.svg" alt="icon-banner">
            <form id="loginForm">
              <input type="email" name="email" id="email" placeholder="Email*" required>
              <input type="password" name="password" id="password" placeholder="Password*" required>
              <button class="button button-accept" type="submit">MASUK</button>
            </form>
            <p>Belum memiliki akun? <a href="#/daftar">Klik Disini</a></p>
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
          .select('id, email, password, role, verifikasi')
          .eq('email', email)
          .eq('verifikasi', true)
          .single();

        if (error) {
          Swal.fire('Error', 'Pengguna tidak ditemukan atau akun belum terverifikasi.', 'error');
          return;
        }

        if (data.password !== password) {
          Swal.fire('Error', 'Password salah', 'error');
          return;
        }

        console.log('User Data:', data);
        console.log('Role:', data.role);
        console.log('Is Verified:', data.verifikasi);

        if (data.role === 'kepala desa' && !data.verifikasi) {
          Swal.fire('Access Denied', 'Akun Anda masih dalam proses verifikasi. Harap tunggu hingga admin mengonfirmasi.', 'warning');
          return;
        }

        Swal.fire('Success', 'Login berhasil', 'success');
        localStorage.setItem('user', JSON.stringify(data));
        window.location.hash = '#/';
      } catch (error) {
        console.error('Error during login process:', error);
        Swal.fire('Error', 'Terjadi kesalahan saat login, silakan coba lagi.', 'error');
      }
    });
  },
};

export default Masuk;
