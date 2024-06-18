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


const user = JSON.parse(localStorage.getItem('user'));

const commonRoutes = {
  '/': Beranda,
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
  '/respon' : ResponPage,
  '/respon/:id' : ResponPage,
};

const penggunaUmumRoutes = {
  '/status-pengaduan': StatusPengaduan,
  '/status-pengaduan/:id': RincianStatusPengaduan,
  '/umpan-balik': UmpanBalik,
  '/rincian-umpanbalik': RincianUmpan_Balik,
  '/akun': Akun,
  '/informasi_anda': InformasiAnda,
};

const kepalaDesaRoutes = {
  '/kotak-pengaduan': KotakPengaduan,
  '/rincian-pengaduan/:id': RincianPengaduan,
  '/akun': Akun,
  '/informasi_anda': InformasiAnda,
  '/status-verifikasi' : StatusVerifikasi,
};

const routes = {
  ...commonRoutes,
  ...(user && user.role === 'admin' ? adminRoutes : {}),
  ...(user && user.role === 'kepala desa' ? kepalaDesaRoutes : {}),
  ...(user && user.role === 'pengguna' ? penggunaUmumRoutes : {}),
};

function checkAccess(route) {
  if (user && user.role === 'admin') {
    if (adminRoutes[route] || commonRoutes[route]) {
      return true;
    } else {
      Swal.fire('ANDA TIDAK DIIZINKAN', '', 'error');
      return false;
    }
  } else if (user && user.role === 'kepala desa') {
    if (kepalaDesaRoutes[route] || commonRoutes[route]) {
      return true;
    } else {
      Swal.fire('ANDA TIDAK DIIZINKAN', '', 'error');
      return false;
    }
  } else if (user && user.role === 'pengguna') {
    if (penggunaUmumRoutes[route] || commonRoutes[route]) {
      return true;
    } else {
      Swal.fire('ANDA TIDAK DIIZINKAN', '', 'error');
      return false;
    }
  } else {
    if (commonRoutes[route]) {
      return true;
    } else {
      Swal.fire('ANDA TIDAK DIIZINKAN', '', 'error');
      return false;
    }
  }
}

export { routes, checkAccess };
