import AccountPage from "../views/pages/akun";
import DashboardPage from "../views/pages/dashboard";
import DataUmum from "../views/pages/data-umum";
import DataKepalaDesa from "../views/pages/data-kepala-desa";
import NewVerificationPage from "../views/pages/verifikasi-baru";
import ResponPage from "../views/pages/response";
//import  HistoryVerificationPage from "../views/pages/verifikasi-riwayat";

const routes = {
  '/': DashboardPage,
  '/umum': DataUmum,
  '/kades' : DataKepalaDesa,
  '/baru': NewVerificationPage,
  // '/riwayat' : HistoryVerificationPage,
  '/account': AccountPage,
  '/baru/:id' : NewVerificationPage,
  '/respon/:id' : ResponPage,
};

export default routes;
