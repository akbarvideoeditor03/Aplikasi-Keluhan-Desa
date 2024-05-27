import Beranda from '../views/pages/beranda';
import ValidasiMasuk from '../views/pages/validasi-masuk';
import Masuk from '../views/pages/masuk';
import Daftar from '../views/pages/daftar';
import ValidasiBatal from '../views/pages/validasi-batal';

const routes = {
  '/': Beranda,
  '/beranda': Beranda,
  '/validasi-masuk': ValidasiMasuk,
  '/validasi-batal': ValidasiBatal,
  '/masuk': Masuk,
  '/daftar': Daftar,
};

export default routes;
