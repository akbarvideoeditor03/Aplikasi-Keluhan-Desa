supabase
import supabase from '../../global/config';
import { statusverifikasiTemplate } from '../template/template-creator';
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

const StatusVerifikasi = {
    async render() {
        return `
            <div class="container col-container content">
                <h2>Status Verifikasi</h2>
                <div class="card card-container account">
                    <!-- Data will be inserted here -->
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
        Account.innerHTML = statusverifikasiTemplate(user);
    }
};

export default StatusVerifikasi;