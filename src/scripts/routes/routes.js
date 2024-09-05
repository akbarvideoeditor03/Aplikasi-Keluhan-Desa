import Swal from 'sweetalert2';
import Beranda from '../views/pages/beranda';
import Masuk from '../views/pages/masuk';
import Daftar from '../views/pages/daftar';
import KotakPengaduan from '../views/pages/kotak-pengaduan';
import StatusPengaduan from '../views/pages/status-pengaduan';
import UmpanBalik from '../views/pages/umpan-balik';
import RincianUmpan_Balik from '../views/pages/umpan-balik-rincian';
import KritikSaran from '../views/pages/kritik-saran';
import Bantuan from '../views/pages/bantuan';
import TentangKami from '../views/pages/tentang';
import kirimPengaduan from '../views/pages/kirim-pengaduan';
import AccountPage from "../views/pages/akun-admin";
import DataUmum from '../views/pages/data-umum';
import DataKepalaDesa from '../views/pages/data-kepala-desa';
import NewVerificationPage from '../views/pages/verifikasi-baru';
import ResponPage from '../views/pages/response';
import RincianPengaduan from '../views/pages/rincian-pengaduan';
import RincianStatusPengaduan from '../views/pages/rincian-status-pengaduan';
import Akun from '../views/pages/akun';
import InformasiAnda from '../views/pages/informasi-anda';
import StatusVerifikasi from '../views/pages/status-verifikasi';
import EditAkun from '../views/pages/edit-akun';
import UserActivity from '../views/pages/aktivitas-user';
import kritik_saranCollection from '../views/pages/kritik-saran-collection';

const user = JSON.parse(localStorage.getItem('user'));

const commonRoutes = {
  '/' : Beranda,
  '/beranda': Beranda,
  '/masuk': Masuk,
  '/daftar': Daftar,
  '/bantuan': Bantuan,
  '/kritik-saran': KritikSaran,
  '/tentang-kami': TentangKami,
  '/kirim-pengaduan': kirimPengaduan,
};

const adminRoutes = {
  '/account': AccountPage,
  '/umum': DataUmum,
  '/kades': DataKepalaDesa,
  '/baru': NewVerificationPage,
  '/baru/:id': NewVerificationPage,
  '/respon': ResponPage,
  '/respon/:id': ResponPage,
  '/aktivitas': UserActivity,
  '/krisar': kritik_saranCollection,
};

const penggunaUmumRoutes = {
  '/status-pengaduan': StatusPengaduan,
  '/status-pengaduan/:id': RincianStatusPengaduan,
  '/umpan-balik': UmpanBalik,
  '/rincian-umpanbalik/:id': RincianUmpan_Balik,
  '/akun': Akun,
  '/informasi_anda': InformasiAnda,
  '/edit-akun/:id': EditAkun,
};

const kepalaDesaRoutes = {
  '/kotak-pengaduan': KotakPengaduan,
  '/rincian-pengaduan/:id': RincianPengaduan,
  '/akun': Akun,
  '/informasi_anda': InformasiAnda,
  '/status-verifikasi': StatusVerifikasi,
  '/edit-akun/:id': EditAkun,
};

const routes = {
  ...commonRoutes,
  ...(user && user.role === 'admin' ? adminRoutes : {}),
  ...(user && user.role === 'kepala desa' ? kepalaDesaRoutes : {}),
  ...(user && user.role === 'pengguna' ? penggunaUmumRoutes : {}),
};

function checkAccess(route) {
  if (user) {
    if (user.role === 'admin' && !adminRoutes[route] && !commonRoutes[route]) {
      Swal.fire('ANDA TIDAK DIIZINKAN', '', 'error');
      return false;
    }
    if (user.role === 'kepala desa' && !kepalaDesaRoutes[route] && !commonRoutes[route]) {
      Swal.fire('ANDA TIDAK DIIZINKAN', '', 'error');
      return false;
    }
    if (user.role === 'pengguna' && !penggunaUmumRoutes[route] && !commonRoutes[route]) {
      Swal.fire('ANDA TIDAK DIIZINKAN', '', 'error');
      return false;
    }
    return true;
  } else {
    if (!commonRoutes[route]) {
      Swal.fire({
        html: `<p><strong>Anda tidak dizinkan.</strong></p><p>Silakan Masuk sesuai akun Anda.</p>`,
        icon: 'error',
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false,
        willClose: () => {
          window.location.href = '#/masuk';
        }
      });
      return false;
    }    
    return true;
  }
}

export { routes, checkAccess };
