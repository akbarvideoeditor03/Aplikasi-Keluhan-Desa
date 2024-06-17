import supabase from "../../global/config.js";
import { kotak_pengaduan, rincianPengaduan } from "../template/template-creator.js";
import UrlParser from '../../routes/url-parser';

const KotakPengaduan = {
    async render() {
        return `
            <div class="content container col-container">
                <div>
                    <h2>Kotak Pengaduan</h2>
                    <p>Klik untuk melihat rincian pengaduan</p>
                </div>
                <div id="kotak_pengaduan" class="container col-container card card-container"></div>
            </div>
        `;
    },

    async afterRender() {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user.id; // Id pengguna kepala desa yang sedang login

            const { data, error } = await supabase
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

            if (pengaduan.length === 0) {
                newPengaduanContainer.innerHTML = '<p>Tidak ada pengaduan yang belum direspon.</p>';
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            const newPengaduanContainer = document.querySelector('#kotak_pengaduan');
            newPengaduanContainer.innerHTML = '<p>Gagal mengambil data pengaduan. Harap coba lagi nanti.</p>';
        }
    }
}

export default KotakPengaduan;
