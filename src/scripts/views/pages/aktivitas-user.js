import Swal from "sweetalert2";
import supabase from "../../global/config";
import { user_activity } from "../template/template-creator";

const UserActivity = {
    async render() {
        return `
            <div class="container col-container content">
                <h2>Aktivitas Pengguna <i class="bi bi-ui-checks"></i></h2>
                <div class="card card-container">
                    <table class="table-line">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Judul</th>
                                <th>Tanggal Pengaduan</th>
                                <th>Status Pengaduan</th>
                                <th>Informasi Rinci</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="user-activity">
                        </tbody>
                    </table>
                    <div id="loading-indicator" class="container col-container center">
                        <img src="./loading.svg" class="loading" alt="">
                    </div>
                </div>
            </div>
        `;
    },

    async afterRender() {
        const userActivity = document.querySelector('.user-activity');
        const loadingIndicator = document.querySelector('#loading-indicator')
        try {
            const { data, error } = await supabase
                .from('usersActivity')
                .select('*');

            if (error) {
                throw error;
            }

            loadingIndicator.style.display = 'none';

            data.forEach((body, index) => {
                userActivity.innerHTML += user_activity(body, index + 1);
            });

            const infoButtons = document.querySelectorAll('.button-info');
            infoButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    const id_penggunaUmum = button.getAttribute('id_pengguna_umum');
                    const data_isi = button.getAttribute('data-isi');
                    const data_id_kepalaDesa = button.getAttribute('id_kepalaDesa');
                    const data_Respon = button.getAttribute('data_respon');
                    const lampiran = button.getAttribute('data_lampiran');

                    Swal.fire({
                        width: 960,
                        title: `Informasi Rinci`,
                        html: `
                            <div class="container col-container left">
                                <div>
                                    <caption>ID Pengguna Umum</caption>
                                    <article class="text text-bg">${id_penggunaUmum}</article>
                                </div>
                                <div>
                                    <caption>Isi Pengaduan</caption>
                                    <article class="text text-bg">${data_isi}</article>
                                </div>
                                <div>
                                    <caption>ID Kepala Desa</caption>
                                    <article class="text text-bg">${data_id_kepalaDesa}</article>
                                </div>
                                <div>
                                    <caption>Respon</caption>
                                    <article class="text text-bg">${data_Respon}</article>
                                </div>
                                <div class="container col-container">
                                    <caption>Lampiran</caption>
                                    <div class="container center">
                                        <img class="img detail" src="${lampiran}" alt="">
                                    </div>
                                </div>
                            </div>`,
                        icon: 'info',
                        confirmButtonText: 'Tutup'
                    });
                });
            });

            const removeButtons = document.querySelectorAll('.button-remove');
            removeButtons.forEach(button => {
                button.addEventListener('click', async () => {
                    const id = button.getAttribute('data-id');
                    const result = await Swal.fire({
                        title: 'Apakah Anda yakin?',
                        html: `
                        <p>Anda yakin akan menghapus aktivitas pengguna?</p>
                        `,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Ya, hapus!',
                        cancelButtonText: 'Batal'
                    });
    
                    if (result.isConfirmed) {
                        try {
                            await supabase
                                .from('usersActivity')
                                .delete()
                                .eq('id', id);
    
                            Swal.fire('Dihapus!', 'Aktivitas pengguna telah dihapus.', 'success');
                            button.closest('tr').remove();
                        } catch (error) {
                            Swal.fire('Gagal!', 'Aktivitas pengguna gagal dihapus.', 'error');
                        }
                    }
                });
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Error!', 'Gagal mengambil data aktivitas pengguna.', 'error');
        };
    },
};

export default UserActivity;