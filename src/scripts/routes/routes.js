
import Beranda from '../views/pages/beranda';
import Masuk from '../views/pages/masuk';
import Daftar from '../views/pages/daftar';
import kirimPengaduan from '../views/pages/kirim-pengaduan';
import statusPengaduan from '../views/pages/status-pengaduan';
<<<<<<< Updated upstream

import AccountPage from "../views/pages/akun";
import DashboardPage from "../views/pages/dashboard";
import DataUmum from "../views/pages/data-umum";
import DataKepalaDesa from "../views/pages/data-kepala-desa";
import NewVerificationPage from "../views/pages/verifikasi-baru";
import ResponPage from "../views/pages/response";
//import  HistoryVerificationPage from "../views/pages/verifikasi-riwayat";
=======
>>>>>>> Stashed changes

const routes = {
  '/': Beranda,
  '/beranda': Beranda,
  '/masuk': Masuk,
  '/daftar': Daftar,
  '/kirim-pengaduan': kirimPengaduan,
  '/status-pengaduan': statusPengaduan,
<<<<<<< Updated upstream
  
  '/admin': DashboardPage,
  '/umum': DataUmum,
  '/kades' : DataKepalaDesa,
  '/baru': NewVerificationPage,
  // '/riwayat' : HistoryVerificationPage,
  '/account': AccountPage,
  '/baru/:id' : NewVerificationPage,
  '/respon/:id' : ResponPage,
=======
>>>>>>> Stashed changes
};

export default routes;
