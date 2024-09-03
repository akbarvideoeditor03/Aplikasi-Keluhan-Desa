import supabase from "../../global/config.js";
import {
    kotak_pengaduan,
} from "../template/template-creator.js";

const KotakPengaduan = {
    async render() {
        return `
            <div class="content container col-container">
                <div>
                    <h2>Kotak Pengaduan <i class="bi bi-envelope-arrow-down-fill"></i></h2>
                    <p>Klik untuk melihat rincian pengaduan</p>
                </div>
                <div id="kotak_pengaduan" class="container col-container card card-container">
                </div>
            </div>
        `;
    },

    async afterRender() {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user.id;
            const {
                data,
                error
            } = await supabase
                .from('usersActivity')
                .select('*')
                .eq('id_pengguna_kepala_desa', userId)
                .eq('status_pengaduan', false);

            if (error) {
                throw error;
            }

            const pengaduan = data || [];
            const newPengaduanContainer = document.querySelector('#kotak_pengaduan');

            pengaduan.forEach(item => {
                const pengaduanItem = document.createElement('div');
                pengaduanItem.innerHTML = kotak_pengaduan(item);
                pengaduanItem.addEventListener('click', () => {
                    localStorage.setItem('selectedPengaduan', JSON.stringify(item));
                    window.location.href = `#/rincian-pengaduan/${item.id}`;
                });
                newPengaduanContainer.appendChild(pengaduanItem);
            });

            if (user.verifikasi === "true") {
                if (pengaduan.length === 0) {
                    newPengaduanContainer.classList.add('center', 'container', 'col-container');
                    newPengaduanContainer.innerHTML = '<p><i class="bi bi-emoji-sunglasses-fill text-green"></i> Yeay, kotak pengaduan kosong.</p>';
                }
            } else {
                newPengaduanContainer.innerHTML = `
                <div class="container col-container text-center">
                    <p class="text-link">
                        <i class="bi bi-exclamation-triangle-fill text-yellow"></i>
                        Maaf, sepertinya akun Anda belum terverifikasi. Silakan periksa halaman <a href="#/status-verifikasi"><strong>Status
                                Verifikasi</strong></a> Anda. Jika akun sudah terverifikasi di halaman <a
                            href="#/status-verifikasi"><strong>Status Verifikasi</strong></a>, coba keluar dari akun Anda <i>(logout)</i>,
                        lalu masuk kembali <i>(login)</i>.
                    </p>
                </div>
                `;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            const newPengaduanContainer = document.querySelector('#kotak_pengaduan');
            newPengaduanContainer.classList.add('center', 'container', 'col-container');
            newPengaduanContainer.innerHTML = '<p><i class="bi bi-emoji-frown-fill"></i> Gagal mengambil data pengaduan. Harap periksa koneksi internet Anda</p>';
        }
    }
}

export default KotakPengaduan;