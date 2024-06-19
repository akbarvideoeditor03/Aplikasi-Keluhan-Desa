import supabase from "../../global/config";
import { status_pengaduan } from "../template/template-creator";
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

const StatusPengaduan = {
    async render() {
        return `
            <div class="container col-container content">
                <div>
                    <h3>Status Pengaduan</h3>
                    <p>Klik untuk melihat status pengaduan Anda</p>
                </div>
                <div id="status_pengaduan" class="card container col-container card-container">
                    
                </div>
            </div>
        `;
    },

    async afterRender() {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user.id;

            const { data, error } = await supabase
            .from('usersActivity')
            .select('*')
            .eq('id_pengguna_umum', userId)
            .eq('status_pengaduan', false);

            if (error) {
                throw error;
            }

            const status = data || [];
            const statusPengaduanContainer = document.querySelector('#status_pengaduan');

            status.forEach(item => {
                const statusItem = document.createElement('div');
                statusItem.innerHTML = status_pengaduan(item);
                statusItem.classList.add('container', 'col-container');
                statusItem.addEventListener('click', () => {
                    localStorage.setItem('selectedStatus', JSON.stringify(item));
                    window.location.href = `#/status-pengaduan/${item.id}`;
                });
                statusPengaduanContainer.appendChild(statusItem);
            });

            if (status.length === 0) {
                statusPengaduanContainer.innerHTML = '<p>Status pengaduan kosong</p>'
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            const newPengaduanContainer = document.querySelector('#kotak_pengaduan');
            newPengaduanContainer.innerHTML = '<p>Gagal mengambil data pengaduan. Harap coba lagi nanti.</p>';
        }
    }
}

export default StatusPengaduan;