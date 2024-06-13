
import Beranda from '../views/pages/beranda';
import Masuk from '../views/pages/masuk';
import Daftar from '../views/pages/daftar';
import kirimPengaduan from '../views/pages/kirim-pengaduan';
import statusPengaduan from '../views/pages/status-pengaduan';

import AccountPage from "../views/pages/akun";
import DashboardPage from "../views/pages/dashboard";
import DataUmum from "../views/pages/data-umum";
import DataKepalaDesa from "../views/pages/data-kepala-desa";
import NewVerificationPage from "../views/pages/verifikasi-baru";
import ResponPage from "../views/pages/response";
//import  HistoryVerificationPage from "../views/pages/verifikasi-riwayat";

const routes = {
  '/': Beranda,
  '/beranda': Beranda,
  '/masuk': Masuk,
  '/daftar': Daftar,
  '/kirim-pengaduan': kirimPengaduan,
  '/status-pengaduan': statusPengaduan,
  
  '/admin': DashboardPage,
  '/umum': DataUmum,
  '/kades' : DataKepalaDesa,
  '/baru': NewVerificationPage,
  // '/riwayat' : HistoryVerificationPage,
  '/account': AccountPage,
  '/baru/:id' : NewVerificationPage,
  '/respon/:id' : ResponPage,
};

export default routes;
