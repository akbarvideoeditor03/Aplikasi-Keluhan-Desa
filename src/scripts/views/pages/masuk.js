import Swal from 'sweetalert2';
import supabase from '../../global/config';

let logoutTimer;

const startLogoutTimer = () => {
  clearTimeout(logoutTimer);
  logoutTimer = setTimeout(() => {
    localStorage.removeItem('user');
    Swal.fire({
      title: 'Session Expired',
      text: 'Sesi Anda telah habis. Silakan login kembali.',
      icon: 'warning',
      confirmButtonText: 'OK',
      willClose: () => {
        window.location.href = '#/masuk';
        window.location.reload();
      }
    });
  }, 600000);
};

const resetTimer = () => {
  startLogoutTimer();
  localStorage.setItem('lastActivity', Date.now());
};

const checkSession = () => {
  const lastActivity = localStorage.getItem('lastActivity');
  if (lastActivity) {
    const currentTime = Date.now();
    const elapsed = currentTime - lastActivity;
    if (elapsed > 600000) {
      localStorage.removeItem('user');
      Swal.fire({
        title: 'Session Expired',
        text: 'Sesi Anda telah habis. Silakan login kembali.',
        icon: 'warning',
        confirmButtonText: 'OK',
        willClose: () => {
          window.location.href = '#/masuk';
          window.location.reload();
        }
      });
    } else {
      startLogoutTimer();
    }
  } else {
    startLogoutTimer();
  }
};

document.addEventListener('mousemove', resetTimer);
document.addEventListener('keypress', resetTimer);
document.addEventListener('scroll', resetTimer);
document.addEventListener('click', resetTimer);

checkSession();

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

        if (error || !data) {
          Swal.fire({
            title: 'Error',
            text: 'Pengguna tidak ditemukan atau akun belum terverifikasi.',
            icon: 'error',
            timer: 2000,
            timerProgressBar: true
          });
          return;
        }

        if (data.password !== password) {
          Swal.fire({
            title: 'Error',
            text: 'Password salah',
            icon: 'error',
            timer: 2000,
            timerProgressBar: true
          });
          return;
        }

        if (data.role === 'kepala desa' && !data.verifikasi) {
          Swal.fire({
            title: 'Access Denied',
            text: 'Akun Anda masih dalam proses verifikasi. Harap tunggu hingga admin mengonfirmasi.',
            icon: 'warning',
            timer: 2000,
            timerProgressBar: true
          });
          return;
        }

        Swal.fire({
          title: 'Success',
          text: 'Login berhasil',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          willClose: () => {
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('lastActivity', Date.now());
            window.dispatchEvent(new Event('userLoggedIn'));
            setTimeout(() => {
              window.location.href = '#/';
              window.location.reload();
            }, 2000);
          }
        });

        startLogoutTimer();
      } catch (error) {
        console.error('Error during login process:', error);
        Swal.fire({
          title: 'Error',
          text: 'Terjadi kesalahan saat login, silakan coba lagi.',
          icon: 'error',
          timer: 3000,
          timerProgressBar: true
        });
      }
    });
  },
};

export default Masuk;
