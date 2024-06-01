import AccountPage from "../views/pages/akun";
import DashboardPage from "../views/pages/dashboard";
import DataPage from "../views/pages/data";
import VerificationPage from "../views/pages/verifikasi";

const routes = {
  '/': DashboardPage,
  '/data': DataPage,
  '/verifikasi': VerificationPage,
  '/account': AccountPage,
};

export default routes;
