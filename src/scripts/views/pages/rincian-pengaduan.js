import supabase from "../../global/config.js";
import Swal from 'sweetalert2';
import {
    rincianPengaduan
} from '../template/template-creator.js';
import UrlParser from '../../routes/url-parser.js';

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

const RincianPengaduan = {
    async render() {
        return `
            <div class="content container col-container">
                <div>
                    <h2>Rincian Pengaduan</h2>
                </div>
                <div id="rincian_pengaduan" class="container col-container card card-container">
                </div>
            </div>
        `;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const pengaduanId = url.id;

        const {
            data,
            error
        } = await supabase
            .from('usersActivity')
            .select('*')
            .eq('id', pengaduanId);

        if (error) {
            console.error('Error fetching data:', error);
            document.querySelector('#rincian_pengaduan').innerHTML = '<p>Gagal mengambil data pengaduan. Harap coba lagi nanti.</p>';
            return;
        }

        if (data.length === 0) {
            document.querySelector('#rincian_pengaduan').innerHTML = '<p>Data pengaduan tidak ditemukan.</p>';
            return;
        }

        const pengaduan = data[0];
        document.querySelector('#rincian_pengaduan').innerHTML = rincianPengaduan(pengaduan);

        const lihatLampiranButton = document.querySelector('#lihat-lampiran');
        const imageUrl = `${data.map(item => item.lampiran).join('')}`;

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

        const responForm = document.querySelector('#responForm');
        const textarea = document.querySelector('#respon_pengaduan');
        const sentButton = document.querySelector('#sentButton');

        const cancelButton = document.querySelector('#cancel');
        if (cancelButton) {
            cancelButton.addEventListener('click', () => {
                Swal.fire({
                    title: 'Sebentar...',
                    text: 'Apakah Anda yakin ingin membatalkan isian?',
                    icon: 'question',
                    showCancelButton: true,
                    cancelButtonText: 'Kembali',
                    confirmButtonText: 'Ya, saya yakin',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.history.back();
                    }
                });
            });
        } else {
            console.error('Cancel button not found');
        }

        responForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const respon = textarea.value.trim();

            try {
                const {
                    data,
                    error
                } = await supabase
                    .from('usersActivity')
                    .update({
                        respon_pengaduan: respon,
                        status_pengaduan: true
                    })
                    .eq('id', pengaduanId);

                if (error) {
                    throw error;
                }

                Swal.fire({
                    title: 'Sukses!',
                    text: 'Respon pengaduan telah berhasil dikirim.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    window.location.href = '#/kotak-pengaduan';
                });
            } catch (error) {
                console.error('Error updating data:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Gagal mengirim respon pengaduan.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        });
    }
}

export default RincianPengaduan;