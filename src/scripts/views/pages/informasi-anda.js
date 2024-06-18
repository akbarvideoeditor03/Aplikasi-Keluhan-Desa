import {
    informasi_anda
} from "../template/template-creator";
import supabase from "../../global/config";
import Swal from "sweetalert2";

let logoutTimer;

const startLogoutTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
        localStorage.removeItem('user');
        Swal.fire({
            title: 'Session Expired',
            text: 'Sesi Anda telah habis. Silakan login kembali.',
            icon: 'warning',
            confirmButtonText: 'OK',
            willClose: () => {
                window.location.href = '#/masuk';
                window.location.reload();
            }
        });
    }, 600000);
};

const resetTimer = () => {
    startLogoutTimer();
    localStorage.setItem('lastActivity', Date.now());
};

const checkSession = () => {
    const lastActivity = localStorage.getItem('lastActivity');
    if (lastActivity) {
        const currentTime = Date.now();
        const elapsed = currentTime - lastActivity;
        if (elapsed > 600000) {
            localStorage.removeItem('user');
            Swal.fire({
                title: 'Session Expired',
                text: 'Sesi Anda telah habis. Silakan login kembali.',
                icon: 'warning',
                confirmButtonText: 'OK',
                willClose: () => {
                    window.location.href = '#/masuk';
                    window.location.reload();
                }
            });
        } else {
            startLogoutTimer();
        }
    } else {
        startLogoutTimer();
    }
};

document.addEventListener('mousemove', resetTimer);
document.addEventListener('keypress', resetTimer);
document.addEventListener('scroll', resetTimer);
document.addEventListener('click', resetTimer);

checkSession();

const InformasiAnda = {
    async render() {
        return `
            <div class="container col-container content">
                <h2>Informasi Anda</h2>
                <div class="account card container col-container">
                    Loading...
                </div>
            </div>
        `;
    },

    async afterRender() {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const {
            data: user,
            error
        } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching user data:', error);
            document.querySelector('.account').innerHTML = 'Error loading data';
            return;
        }

        const Account = document.querySelector('.account');
        Account.innerHTML = informasi_anda(user);

        document.getElementById('editButton').addEventListener('click', () => {
            window.location.href = `#/edit-akun/${userId}`;
        });
    }
}

export default InformasiAnda;