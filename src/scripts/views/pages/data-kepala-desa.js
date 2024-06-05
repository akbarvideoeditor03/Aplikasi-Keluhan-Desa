import { data_kepaladesa } from "../templates/template-creator";

const DataKepalaDesa = {
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
                <h3>Daftar Pengguna Kepala Desa</h3>
                <div id="isi" class="table">

                </div>
            </div>
        </div>
        `;
    },

    async afterRender() {
        const dataContainer = document.querySelector('#isi');
        dataContainer.innerHTML = data_kepaladesa();
    },
};

export default DataKepalaDesa;
