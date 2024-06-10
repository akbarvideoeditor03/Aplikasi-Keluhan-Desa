import Beranda from '../views/pages/beranda';
import Masuk from '../views/pages/masuk';
import Daftar from '../views/pages/daftar';
import StatusPengaduan from '../views/pages/status-pengaduan';
import UmpanBalik from '../views/pages/umpan-balik';
import KotakPengaduan from '../views/pages/kotak-pengaduan';
import KotakPenilaian from '../views/pages/kotak-penilaian';


const routes = {
  '/': Beranda,
  '/beranda': Beranda,
  '/masuk': Masuk,
  '/daftar': Daftar,
  '/status-pengaduan' : StatusPengaduan,
  '/kritik-saran' : UmpanBalik,
  '/kotak-pengaduan' : KotakPengaduan,
  '/kotak-penilaian' : KotakPenilaian,
};

export default routes;
