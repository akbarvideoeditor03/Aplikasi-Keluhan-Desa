import supabase from '../../global/config.js';
import UrlParser from '../../routes/url-parser.js';
import { list_NewItem, verifikasi_baru } from '../template/template-creator';

const NewVerificationPage = {
  async render() {
    return `
        <div class="container row-container content center-start admin-container">
            <div class="nav-menu bg-white">
                <h3>Daftar</h3>
                <div id="new-item" class="new-item button button-new"></div>
            </div>
            <div class="new-item verification-core center-start bg-white">
                <h3>Isi</h3>
                <div id="isi">
                    <p class="new-item empty-verification-core verification-core center-start">Tidak ada daftar yang dipilih</p>
                </div>
            </div>
        </div>
        `;
  },

  async afterRender() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'kepala desa')
        .eq('verifikasi', false);

      if (error) {
        throw error;
      }

      const dataKepalaDesaUnverified = data || [];
      const newItemsContainer = document.querySelector('#new-item');
      const verificationContainer = document.querySelector('#isi');
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      let selectedItem = null;

      dataKepalaDesaUnverified.forEach((body) => {
        const listItem = document.createElement('div');
        listItem.classList.add('button', 'button-new-item');
        listItem.innerHTML = list_NewItem(body);

        listItem.addEventListener('click', (event) => {
          event.preventDefault();
          selectedItem = body;
          verificationContainer.innerHTML = verifikasi_baru(body);
          window.location.hash = `#/baru/${body.id}`;
        });

        newItemsContainer.appendChild(listItem);
      });

      if (url.id) {
        const item = dataKepalaDesaUnverified.find((body) => body.id === url.id);
        if (item) {
          verificationContainer.innerHTML = verifikasi_baru(item);
          selectedItem = item;
        }
      }

      document.addEventListener('click', (event) => {
        if (event.target.classList.contains('button-respon')) {
          const item = dataKepalaDesaUnverified.find((body) => body.id === url.id);
          if (item) {
            localStorage.setItem('selectedKepalaDesa', JSON.stringify(item));
            window.location.hash = `#/respon/${item.id}`;
          }
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      const verificationContainer = document.querySelector('#isi');
      verificationContainer.innerHTML = '<p class="error">Gagal mengambil data pengguna. Harap coba lagi nanti.</p>';
    }
  },
};

export default NewVerificationPage;
