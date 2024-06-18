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
        const { data, error } = await supabase
            .from('users')
            .select('nama, keterangan')
            .eq('role', 'kepala desa')
            .eq('verifikasi', true);

        const statusVerif = document.querySelector('.account');
        
        if (error) {
            console.error('Error fetching data:', error);
            statusVerif.innerHTML = '<p>Error fetching data</p>';
            return;
        }

        if (data && data.length > 0) {
            const user = data[0];
            statusVerif.innerHTML = statusverifikasiTemplate(user.nama, user.keterangan);
        } else {
            statusVerif.innerHTML = '<p>No verified Kepala Desa found</p>';
        }
    }
};

export default StatusVerifikasi;
