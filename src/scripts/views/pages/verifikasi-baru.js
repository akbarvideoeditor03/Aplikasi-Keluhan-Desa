import FetchApiSource from "../../data/api-fetching";
import UrlParser from "../../routes/url-parser";
import { list_NewItem, verifikasi_baru } from "../templates/template-creator";

const NewVerificationPage = {
    async render() {
        return `
        <div class="content v-content">
            <div class="v-left-side">
                <h3>Pilih</h3>
                <a href="#/baru">
                    <div class="btn">Baru</div>
                </a>
                <a href="#/riwayat">
                    <div class="btn">Riwayat</div>
                </a>
            </div>

            <div class="verification-content">
                <div class="v-card nav-menu">
                    <h3>Daftar</h3>
                    <div id="new-item" class="new-item"></div>
                </div>
                <div class="v-card verification-core">
                    <h3>Isi</h3>
                    <div id="isi">
                        <p>Tidak ada daftar yang dipilih</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    },

    async afterRender(){
        const { dataKepalaDesaUnverified } = await FetchApiSource.data_page();
        const newItemsContainer = document.querySelector('#new-item');
        const verificationContainer = document.querySelector('#isi');
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        let selectedItem = null;

        dataKepalaDesaUnverified.forEach(body => {
            const listItem = document.createElement('div');
            listItem.classList.add('button', 'button-new-item');
            listItem.innerHTML = list_NewItem(body);

            listItem.addEventListener('click', (event) => {
                event.preventDefault();
                selectedItem = body;
                verificationContainer.innerHTML = verifikasi_baru(body);
                window.location.hash = `#/baru/${body._id}`;
            });

            newItemsContainer.appendChild(listItem);
        });

        if (url.id) {
            const item = dataKepalaDesaUnverified.find(body => body._id === url.id);
            if (item) {
                verificationContainer.innerHTML = verifikasi_baru(item);
                selectedItem = item;
            }
        }

        // Store the selected item in localStorage when the Respon button is clicked
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('button-respon')) {
                const id = event.target.getAttribute('data-id');
                const item = dataKepalaDesaUnverified.find(body => body._id === id);
                if (item) {
                    localStorage.setItem('selectedKepalaDesa', JSON.stringify(item));
                }
                window.location.hash = `#/respon/${id}`;
            }
        });
    }
};

export default NewVerificationPage;
