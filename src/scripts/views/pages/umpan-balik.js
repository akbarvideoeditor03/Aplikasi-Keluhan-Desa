import supabase from '../../global/config';
import { umpan_balik } from '../template/template-creator';

const UmpanBalik = {
  async render() {
    return `
        <div class="content container col-container">
            <div>
                <h2>Umpan Balik</h2>
                <p>Klik untuk melihat respon yang diberikan</p>
            </div>
            <div id="new-item" class="container col-container card card-container">
                
            </div>
        </div>
        `;
  },

  async afterRender() {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user.id;
      console.log(userId);

      const { data, error } = await supabase
        .from('usersActivity')
        .select('*')
        .eq('id_pengguna_umum', userId)
        .eq('status_pengaduan', true);

      if (error) {
        throw error;
      }

      const status = data || [];
      const statusPengaduanContainer = document.querySelector('#new-item');

      status.forEach((item) => {
        const statusItem = document.createElement('div');
        statusItem.innerHTML = umpan_balik(item);
        statusItem.classList.add('container', 'col-container');
        statusItem.addEventListener('click', () => {
          localStorage.setItem('selectedStatus', JSON.stringify(item));
          window.location.href = `#/status-pengaduan/${item.id}`;
        });
        statusPengaduanContainer.appendChild(statusItem);
      });

      if (status.length === 0) {
        statusPengaduanContainer.innerHTML = '<p>Status pengaduan kosong</p>';
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      const newPengaduanContainer = document.querySelector('#kotak_pengaduan');
      newPengaduanContainer.innerHTML = '<p>Gagal mengambil data pengaduan. Harap coba lagi nanti.</p>';
    }
  },
};

export default UmpanBalik;
