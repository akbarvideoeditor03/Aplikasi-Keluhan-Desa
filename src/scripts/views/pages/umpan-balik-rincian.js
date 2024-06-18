import { rincian_umpanbalik } from "../template/template-creator";
import Swal from 'sweetalert2';

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

const RincianUmpan_Balik = {
    async render() {
        return `
            <div class="content container col-container">
                <div>
                    <h2>Rincian Umpan Balik</h2>
                </div>
                <div id="rincian" class="container col-container card card-container">
                    Loading...
                </div>
            </div>
        `;
    },

    async afterRender() {
        const rincian = document.querySelector('#rincian');
        rincian.innerHTML = rincian_umpanbalik();

        const lihatLampiranButton = document.querySelector('#lihat-lampiran');
        const imageUrl = 'https://sidakpost.id/wp-content/uploads/2024/01/Screenshot_2024-01-27-17-24-35-62_6012fa4d4ddec268fc5c7112cbb265e7.jpg';

        if (!imageUrl) {
            lihatLampiranButton.setAttribute('disabled', 'true');
            lihatLampiranButton.classList.add('disabled');
        }

        lihatLampiranButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (imageUrl) {
                Swal.fire({
                    title: 'Lampiran Gambar',
                    imageUrl: imageUrl,
                    imageAlt: 'Lampiran Gambar',
                });
            }
        });
    }
};

export default RincianUmpan_Balik;
