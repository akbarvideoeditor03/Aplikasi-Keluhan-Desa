import Swal from 'sweetalert2';
import UrlParser from '../../routes/url-parser';
import supabase from '../../global/config.js';
import { responPage } from '../template/template-creator';

const ResponPage = {
  async render() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', url.id);

    if (error) {
      console.error('Error fetching data:', error);
      return '<p>Error fetching data.</p>';
    }

    if (data.length === 0) {
      return '<p>Data tidak ditemukan.</p>';
    }

    const selectedItem = data[0];
    // Menyimpan selectedItem dalam variabel global atau dengan cara lain untuk mengaksesnya di afterRender
    window.selectedItem = selectedItem; // Ini memungkinkan akses ke selectedItem di afterRender
    return responPage(selectedItem);
  },

  async afterRender() {
    const sentButton = document.querySelector('#sentButton');
    const textarea = document.querySelector('#keterangan');
    const { selectedItem } = window; // Mengambil selectedItem yang sudah disimpan di render

    if (sentButton && textarea && selectedItem) {
      textarea.addEventListener('input', () => {
        const wordCount = textarea.value.trim().split(/\s+/).length;
        if (wordCount >= 20) {
          sentButton.removeAttribute('disabled');
        } else {
          sentButton.setAttribute('disabled', 'disabled');
        }
      });

      sentButton.addEventListener('click', async (event) => {
        event.preventDefault();

        try {
          const { data, error } = await supabase
            .from('users')
            .update({
              verifikasi: true,
              keterangan: textarea.value.trim(),
            })
            .eq('id', selectedItem.id);

          if (error) {
            throw error;
          }

          Swal.fire({
            title: 'Sukses!',
            text: 'Verifikasi telah berhasil diubah.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            window.location.href = '#/baru';
          });
        } catch (error) {
          console.error('Error updating data:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Gagal mengubah verifikasi.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      });
    } else {
      if (!sentButton) console.error('Send button not found');
      if (!textarea) console.error('Textarea not found');
      if (!selectedItem) console.error('Selected item not found');
    }
  },
};

export default ResponPage;
