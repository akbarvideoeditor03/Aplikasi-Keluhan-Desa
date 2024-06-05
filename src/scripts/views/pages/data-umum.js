import FetchApiSource from "../../data/api-fetching";
import { data_umum } from "../templates/template-creator";

const DataUmum = {
    async render() {
        return `
        <div class="content">
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
        const datas = await FetchApiSource.data_page();
        const dataContainer = document.querySelector('#isi');
        datas.forEach((data, index) => {
            dataContainer.innerHTML += data_umum(data, index + 1);
        });
    },
};

export default DataUmum;