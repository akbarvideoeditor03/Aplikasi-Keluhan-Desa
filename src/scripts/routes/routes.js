import Beranda from '../views/pages/beranda';
import Masuk from '../views/pages/masuk';
import Daftar from '../views/pages/daftar';
import kirimPengaduan from '../views/pages/kirim-pengaduan';
import statusPengaduan from '../views/pages/status-pengaduan';

const routes = {
  '/': Beranda,
  '/beranda': Beranda,
  '/masuk': Masuk,
  '/daftar': Daftar,
  '/kirim-pengaduan': kirimPengaduan,
  '/status-pengaduan': statusPengaduan,
};

export default routes;
