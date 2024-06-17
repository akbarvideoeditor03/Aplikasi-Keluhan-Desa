import supabase from "../../global/config.js";
import Swal from 'sweetalert2';
import { rincian_status_pengaduan } from '../template/template-creator.js';
import UrlParser from '../../routes/url-parser.js';

const RincianStatusPengaduan = {
    async render() {
        return `
            <div class="content container col-container">
                <div>
                    <h2>Rincian Status Pengaduan</h2>
                </div>
                <div id="rincian_status_pengaduan" class="container col-container card card-container">
                    Loading...
                </div>
            </div>
        `;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const statusId = url.id;

        const { data: pengaduanData, error: pengaduanError } = await supabase
            .from('usersActivity')
            .select('*')
            .eq('id', statusId);

        if (pengaduanError) {
            console.error('Error fetching data:', pengaduanError);
            document.querySelector('#rincian_status_pengaduan').innerHTML = '<p>Gagal mengambil data pengaduan. Harap coba lagi nanti.</p>';
            return;
        }

        if (pengaduanData.length === 0) {
            document.querySelector('#rincian_status_pengaduan').innerHTML = '<p>Data pengaduan tidak ditemukan.</p>';
            return;
        }

        const status = pengaduanData[0];
        const idPenggunaKepalaDesa = status.id_pengguna_kepala_desa;

        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('nama')
            .eq('id', idPenggunaKepalaDesa)
            .single();

        if (userError) {
            console.error('Error fetching user data:', userError);
            document.querySelector('#rincian_status_pengaduan').innerHTML = '<p>Gagal mengambil data kepala desa. Harap coba lagi nanti.</p>';
            return;
        }

        const namaKepalaDesa = userData ? userData.nama : 'Nama tidak ditemukan';
        document.querySelector('#rincian_status_pengaduan').innerHTML = rincian_status_pengaduan(status, namaKepalaDesa);

        const lihatLampiranButton = document.querySelector('#lihat-lampiran');
        const imageUrl = status.lampiran;

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
}

export default RincianStatusPengaduan;
