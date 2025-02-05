import supabase from "../../global/config";
import { status_pengaduan } from "../template/template-creator";

const StatusPengaduan = {
    async render() {
        return `
            <div class="container col-container content">
                <div>
                    <h2>Status Pengaduan <i class="bi bi-clock-fill"></i></h2>
                    <p>Klik untuk melihat status pengaduan Anda</p>
                </div>
                <div id="status_pengaduan" class="card container col-container card-container">
                    
                </div>
            </div>
        `;
    },

    async afterRender() {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user.id;

            const { data, error } = await supabase
            .from('usersActivity')
            .select('*')
            .eq('id_pengguna_umum', userId)
            .eq('status_pengaduan', false);

            if (error) {
                throw error;
            }

            const status = data || [];
            const statusPengaduanContainer = document.querySelector('#status_pengaduan');

            status.forEach(item => {
                const statusItem = document.createElement('div');
                statusItem.innerHTML = status_pengaduan(item);
                statusItem.classList.add('container', 'col-container');
                statusItem.addEventListener('click', () => {
                    localStorage.setItem('selectedStatus', JSON.stringify(item));
                    window.location.href = `#/status-pengaduan/${item.id}`;
                });
                statusPengaduanContainer.appendChild(statusItem);
            });

            if (status.length === 0) {
                statusPengaduanContainer.innerHTML = '<p>Status pengaduan kosong</p>'
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            const newPengaduanContainer = document.querySelector('#kotak_pengaduan');
            newPengaduanContainer.innerHTML = '<p>Gagal mengambil data pengaduan. Harap coba lagi nanti.</p>';
        }
    }
}

export default StatusPengaduan;