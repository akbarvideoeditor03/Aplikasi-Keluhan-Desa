import Beranda from '../views/pages/beranda';
import Masuk from '../views/pages/masuk';
import Daftar from '../views/pages/daftar';
import KotakPengaduan from '../views/pages/kotak-pengaduan';
import RincianPengaduan from '../views/pages/rincian-pengaduan';
import StatusPengaduan from '../views/pages/status-pengaduan';
import UmpanBalik from '../views/pages/umpan-balik';
import RincianUmpan_Balik from '../views/pages/umpan-balik-rincian';
import KritikSaran from '../views/pages/kritik-saran';
import Bantuan from '../views/pages/bantuan';
import TentangKami from '../views/pages/tentang';


const routes = {
  '/': Beranda,
  '/beranda': Beranda,
  '/masuk': Masuk,
  '/daftar': Daftar,
  '/kotak-pengaduan' : KotakPengaduan,
  '/status-pengaduan' : StatusPengaduan,
  '/rincian-pengaduan' : RincianPengaduan,
  '/umpan-balik' : UmpanBalik,
  '/rincian-umpanbalik' : RincianUmpan_Balik,
  '/bantuan' : Bantuan,
  '/kritik-saran' : KritikSaran,
  '/tentang-kami' : TentangKami,
};

export default routes;
