import supabase from "../../global/config";
import {
    umpan_balik_template
} from "../template/template-creator";

const UmpanBalik = {
    async render() {
        return `
            <div class="content container col-container">
                <div>
                    <h2>Umpan Balik <i class="bi bi-chat-left-text-fill"></i></h2>
                    <p>Klik untuk melihat rincian umpan balik pengaduan Anda</p>
                </div>
                <div id="umpan_balik" class="container col-container card card-container">
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
                .eq('id_pengguna_umum', userId)
                .eq('status_pengaduan', true);

            if (error) {
                throw error;
            }

            const umpan_balik = data.map(item => item) || [];
            const umpanBalikContainer = document.querySelector('#umpan_balik');

            umpan_balik.forEach(item => {
                const umpan_balikItem = document.createElement('div');
                umpan_balikItem.innerHTML = umpan_balik_template(item);
                umpan_balikItem.classList.add('container', 'col-container');

                umpan_balikItem.addEventListener('click', () => {
                    localStorage.setItem('detailUmpanBalik', JSON.stringify(item));
                    window.location.href = `#/rincian-umpanbalik/${item.id}`;
                });

                umpanBalikContainer.appendChild(umpan_balikItem);
            });

            if (umpan_balik.length === 0) {
                umpanBalikContainer.innerHTML = '<p>Status pengaduan kosong</p>';
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            const newUmpanBalikContainer = document.querySelector('#umpan_balik');
            newUmpanBalikContainer.innerHTML = '<p>Gagal mengambil data pengaduan. Harap coba lagi nanti.</p>';
        }
    }
}

export default UmpanBalik;