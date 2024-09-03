import Swal from 'sweetalert2';
import supabase from '../../global/config';
import {
    rincian_umpanbalik
} from '../template/template-creator';
import UrlParser from '../../routes/url-parser';

const RincianUmpan_Balik = {
    async render() {
        return `
            <div class="content container col-container">
                <div>
                    <h2>Rincian Umpan Balik</h2>
                </div>
                <div id="rincian" class="container col-container card card-container">
                    <img src="./loading.svg" class="container-wide loading" alt="">
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
            document.querySelector('#rincian').innerHTML = '<p>Gagal mengambil data pengaduan. Harap coba lagi nanti.</p>';
            return;
        }

        if (data.length === 0) {
            document.querySelector('#rincian').innerHTML = '<p>Data pengaduan tidak ditemukan.</p>';
            return;
        }

        const umpanBalik = data[0];

        const idPenggunaKepalaDesa = umpanBalik.id_pengguna_kepala_desa;

        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('nama, desa')
            .eq('id', idPenggunaKepalaDesa)
            .single();

        if (userError) {
            console.error('Error fetching user data:', userError);
            document.querySelector('#rincian_status_pengaduan').innerHTML = '<p>Gagal mengambil data kepala desa. Harap coba lagi nanti.</p>';
            return;
        }

        const namaKepalaDesa = userData ? userData.nama : 'Nama tidak ditemukan';
        const namaDesa = userData ? userData.desa : 'Desa tidak ditemukan';
        document.querySelector('#rincian').innerHTML = rincian_umpanbalik(umpanBalik,  namaKepalaDesa, namaDesa);

        const lihatLampiranButton = document.querySelector('#lihat-lampiran');
        const imageUrl = `${data.map((item) => item.lampiran).join('')}`;

        if (!imageUrl) {
            lihatLampiranButton.setAttribute('disabled', 'true');
            lihatLampiranButton.classList.add('disabled');
        }

        lihatLampiranButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (imageUrl) {
                Swal.fire({
                    title: 'Lampiran Gambar',
                    imageUrl,
                    imageAlt: 'Lampiran Gambar',
                });
            }
        });
    },
};

export default RincianUmpan_Balik;