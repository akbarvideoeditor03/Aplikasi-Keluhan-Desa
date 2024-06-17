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
                    
                </div>
            </div>
        `;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const statusId = url.id;

        const { data, error } = await supabase
            .from('usersActivity')
            .select('*')
            .eq('id', statusId);

        if (error) {
            console.error('Error fetching data:', error);
            document.querySelector('#rincian_status_pengaduan').innerHTML = '<p>Gagal mengambil data pengaduan. Harap coba lagi nanti.</p>';
            return;
        }

        if (data.length === 0) {
            document.querySelector('#rincian_status_pengaduan').innerHTML = '<p>Data pengaduan tidak ditemukan.</p>';
            return;
        }

        const status = data[0];
        document.querySelector('#rincian_status_pengaduan').innerHTML = rincian_status_pengaduan(status);

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
    }
}

export default RincianStatusPengaduan;