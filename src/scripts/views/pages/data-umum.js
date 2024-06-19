import Swal from "sweetalert2";
import supabase from "../../global/config.js";
import { data_umum } from "../template/template-creator.js";

const DataUmum = {
    async render() {
        return `
        <div class="container row-container content admin-container">
            <div class="left-side">
                <h3>Menu</h3>
                <a href="#/umum">
                    <div class="btn">Data Pengguna Umum</div>
                </a>
                <a href="#/kades">
                    <div class="btn">Data Kepala Desa</div>
                </a>
            </div>
            <div class="content-side">
                <h3>Daftar Pengguna Umum</h3>
                <div class="table">
                    <table class="table-line">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>ID</th>
                                <th>Nama</th>
                                <th>Status</th>
                                <th>Informasi Rinci</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="isi">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `;
    },

    async afterRender() {
        const dataContainer = document.querySelector('#isi');
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('role', 'pengguna');
    
            if (error) {
                throw error;
            }

            // console.log(data.map(item => item.nama));
            data.forEach((body, index) => {
                dataContainer.innerHTML += data_umum(body, index + 1);
            });
    
            const infoButtons = document.querySelectorAll('.button-info');
            infoButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    const id = button.getAttribute('data-id');
                    const nama = button.getAttribute('data-nama');
                    const no_telp = button.getAttribute('data-no_telp');
                    const nama_jalan = button.getAttribute('data-nama_jalan');
                    const alamat = button.getAttribute('data-alamat');
                    const email = button.getAttribute('data-email');
    
                    Swal.fire({
                        title: `Informasi Rinci`,
                        html: `
                        <table class="swal-table">
                            <tbody>
                                <tr>
                                    <td>ID</td>
                                    <td>:</td>
                                    <td>${id}</td>
                                </tr>
                                <tr>
                                    <td>Nama</td>
                                    <td>:</td>
                                    <td>${nama}</td>
                                </tr>
                                <tr>
                                    <td>Nomor Telepon</td>
                                    <td>:</td>
                                    <td>${no_telp}</td>
                                </tr>
                                <tr>
                                    <td>Nama Jalan</td>
                                    <td>:</td>
                                    <td>${nama_jalan}</td>
                                </tr>
                                <tr>
                                    <td>Alamat</td>
                                    <td>:</td>
                                    <td>${alamat}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>:</td>
                                    <td>${email}</td>
                                </tr>
                            </tbody>
                        </table>`,
                        icon: 'info',
                        confirmButtonText: 'Tutup'
                    });
                });
            });
    
            const removeButtons = document.querySelectorAll('.button-remove');
            removeButtons.forEach(button => {
                button.addEventListener('click', async () => {
                    const id = button.getAttribute('data-id');
                    const nama_pengguna = button.getAttribute('data-nama');
    
                    const result = await Swal.fire({
                        title: 'Apakah Anda yakin?',
                        html: `
                        <p>Anda akan menghapus pengguna dengan</p>
                        <p>Nama: ${nama_pengguna}</p>
                        `,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Ya, hapus!',
                        cancelButtonText: 'Batal'
                    });
    
                    if (result.isConfirmed) {
                        try {
                            await supabase
                                .from('users')
                                .delete()
                                .eq('id', id);
    
                            Swal.fire('Dihapus!', 'Pengguna telah dihapus.', 'success');
                            button.closest('tr').remove();
                        } catch (error) {
                            Swal.fire('Gagal!', 'Pengguna gagal dihapus.', 'error');
                        }
                    }
                });
            });
    
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Error!', 'Gagal mengambil data pengguna.', 'error');
        }
    }
    
};

export default DataUmum;
