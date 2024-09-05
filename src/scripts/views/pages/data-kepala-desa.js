import Swal from "sweetalert2";
import supabase from "../../global/config.js";
import { data_kepaladesa } from "../template/template-creator.js";

const DataKepalaDesa = {
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
            <h3>Daftar Pengguna Kepala Desa</h3>
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
                <div id="pagination-controls" class="button-group row-container-0">
                    <button id="prev-button" class="page-button button-info"><i class="bi bi-chevron-left" style="font-size: 1rem;"></i></button>
                    <div id="page-numbers" class="button-group row-container-0"></div>
                    <button id="next-button" class="page-button button-info"><i class="bi bi-chevron-right" style="font-size:1rem;"></i></button>
                </div>
            </div>
        </div>
        `;
    },

    async afterRender() {
        let itemsPerPage = 10;
        let currentPage = 1;
        const dataContainer = document.querySelector('#isi');
        const searchBox = document.querySelector('#search');
        const loadingIndicator = document.querySelector('#loading-indicator');
        const paginationControls = document.querySelector('#pagination-controls');

        let userData = [];
        
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('role', 'kepala desa')
                .eq('verifikasi', true);

    
            if (error) {
                throw error;
            }

            loadingIndicator.style.display = 'none';
            userData = data;
            displayData(userData);

            document.querySelector('#next-button').addEventListener('click', () => {
                if (currentPage * itemsPerPage < userData.length) {
                    currentPage++;
                    displayData(userData);
                }
            });
    
            document.querySelector('#prev-button').addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    displayData(userData);
                }
            });

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

        function paginateData(data, page, itemsPerPage) {
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return data.slice(startIndex, endIndex);
        }

        function displayData(data) {
            dataContainer.innerHTML = '';
            const paginatedData = paginateData(data, currentPage, itemsPerPage);
            paginatedData.forEach((body, index) => {
                dataContainer.innerHTML += data_kepaladesa(body, index + 1 + (currentPage - 1) * itemsPerPage);
            });
            attachEventListeners();
            displayPagination(data.length, itemsPerPage, currentPage);
        }

        function displayPagination(totalItems, itemsPerPage, currentPage) {
            const pageNumberContainer = document.querySelector('#page-numbers');
            pageNumberContainer.innerHTML = '';
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const maxPageButtons = 2;

            let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
            let endPage = Math.min(totalPages, currentPage + Math.floor(maxPageButtons / 2));
    
            if (endPage - startPage < maxPageButtons - 1) {
                startPage = Math.max(1, endPage - maxPageButtons + 1);
            }

            if (startPage > 1) {
                const firstPageButton = document.createElement('button');
                firstPageButton.textContent = '1';
                firstPageButton.classList.add('button', 'button-info', 'page-button-number');
                firstPageButton.addEventListener('click', () => {
                    currentPage = 1;
                    displayData(userData);
                });
                pageNumberContainer.appendChild(firstPageButton);
    
                if (startPage > 2) {
                    const dots = document.createElement('span');
                    dots.classList.add('button-group', 'col-container', 'center', 'page-button-dots');
                    dots.textContent = '...';
                    pageNumberContainer.appendChild(dots);
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i;
                pageButton.classList.add('button', 'button-info', 'page-button-number');
                if (i === currentPage) {
                    pageButton.classList.add('current-page');
                }
                pageButton.addEventListener('click', () => {
                    currentPage = i;
                    displayData(userData);
                });
                pageNumberContainer.appendChild(pageButton);
            }
    
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    const dots = document.createElement('span');
                    dots.classList.add('button-group', 'col-container', 'center', 'page-button-dots');
                    dots.textContent = '...';
                    pageNumberContainer.appendChild(dots);
                }
    
                const lastPageButton = document.createElement('button');
                lastPageButton.textContent = totalPages;
                lastPageButton.classList.add('button', 'button-info', 'page-button-number');
                lastPageButton.addEventListener('click', () => {
                    currentPage = totalPages;
                    displayData(userData);
                });
                pageNumberContainer.appendChild(lastPageButton);
            }
        }

        paginationControls.addEventListener('click', (e) => {
            if (e.target.classList.contains('page-button-number')) {
                const pageNumber = parseInt(e.target.textContent, 10);
                currentPage = pageNumber;
                displayData(userData);
            }
        });

        function attachEventListeners() {
            const infoButtons = document.querySelectorAll('#btn-info');
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
    
            const removeButtons = document.querySelectorAll('#btn-remove');
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

export default DataKepalaDesa;
