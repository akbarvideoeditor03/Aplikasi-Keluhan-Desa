import Swal from 'sweetalert2';
import supabase from '../../global/config.js';
import { rincianPengaduan } from '../template/template-creator.js';
import UrlParser from '../../routes/url-parser.js';

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

    const { data, error } = await supabase
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

    const responForm = document.querySelector('#responForm');
    const textarea = document.querySelector('#respon_pengaduan');
    const sentButton = document.querySelector('#sentButton');

    responForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const respon = textarea.value.trim();

      try {
        const { data, error } = await supabase
          .from('usersActivity')
          .update({ respon_pengaduan: respon, status_pengaduan: true })
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
  },
};

export default RincianPengaduan;
