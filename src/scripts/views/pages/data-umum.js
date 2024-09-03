import Swal from "sweetalert2";
import supabase from "../../global/config.js";
import { data_umum } from "../template/template-creator.js";

const DataUmum = {
    async render() {
        return `
        <div class="card container col-container sticky-card data-menu content">
            <div class="container row-container align-center flex-sb-0">
                <h3>Pilih</h3>
                <div class="container row-container-0 search-container">
                    <input class="search-box" type="search" name="search" id="search" placeholder="Cari">
                    <button class="search-button" type="submit"><i class="bi bi-search"></i></button>
                </div>
            </div>
            <div>
                <a href="#/umum" class="ub-link">
                    <div class="button button-accept">Data Pengguna Umum</div>
                </a>
                <a href="#/kades" class="ub-link">
                    <div class="button button-accept">Data Kepala Desa</div>
                </a>
            </div>
        </div>
        <div class="card container card-container col-container content admin-container">
            <div>
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
                    <div id="loading-indicator" class="container col-container center">
                        <img src="./loading.svg" class="loading" alt="">
                    </div>
                </div>
                <div class="container col-container card">
                    <h3><i class="bi bi-exclamation-triangle-fill text-yellow"></i> Perhatian</h3>
                    <p>Jika pengguna tidak dapat dihapus, kemungkinan pengguna tersebut memiliki pengaduan atau kritik saran yang masih tersimpan di tabel database. Sehingga <i>foreign key data</i> menolak untuk dihapus.</p>
                </div>
            </div>
        </div>
        `;
    },

    async afterRender() {
        const dataContainer = document.querySelector('#isi');
        const searchBox = document.querySelector('#search');
        const loadingIndicator = document.querySelector('#loading-indicator');

        let userData = [];

        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('role', 'pengguna');

            if (error) {
                throw error;
            }

            loadingIndicator.style.display = 'none';
            userData = data;
            displayData(userData);

            searchBox.addEventListener('input', () => {
                const searchValue = searchBox.value.toLowerCase();
                const filteredData = userData.filter(user => 
                    user.nama.toLowerCase().includes(searchValue) || user.id.toLowerCase().includes(searchValue)
                );
                if (filteredData.length === 0) {
                    dataContainer.innerHTML = `<td colspan="6">Data tidak ditemukan :(</td>`;
                } else {
                    displayData(filteredData);
                }
            });
    
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Error!', 'Gagal mengambil data pengguna.', 'error');
        }

        function displayData(data) {
            dataContainer.innerHTML = ''; // Clear existing content
            data.forEach((body, index) => {
                dataContainer.innerHTML += data_umum(body, index + 1);
            });
            attachEventListeners();
        }

        function attachEventListeners() {
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
                        <div class="container col-container left">
                            <div>
                                <caption>ID</caption>
                                <article class="text text-bg">${id}</article>
                            </div>
                            <div>
                                <caption>Nama</caption>
                                <article class="text text-bg">${nama}</article>
                            </div>
                            <div>
                                <caption>Nomor Telepon</caption>
                                <article class="text text-bg">${no_telp}</article>
                            </div>
                            <div>
                                <caption>Nama Jalan</caption>
                                <article class="text text-bg">${nama_jalan}</article>
                            </div>
                            <div>
                                <caption>Alamat</caption>
                                <article class="text text-bg">${alamat}</article>
                            </div>
                            <div>
                                <caption>Email</caption>
                                <article class="text text-bg">${email}</article>
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
        }
    }
};

export default DataUmum;
