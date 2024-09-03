import supabase from "../../global/config.js";
import UrlParser from "../../routes/url-parser.js";
import { list_NewItem, verifikasi_baru } from "../template/template-creator";

const NewVerificationPage = {
    async render() {
        return `
        <div class="card container verif-container content admin-container">
            <div class="nav-menu">
                <h3>Daftar</h3>
                <section class="inner-menu">
                    <div id="new-item" class="menu-container new-item">
                    </div>
                </section>
            </div>
            <div class="new-item verification-core center-start">
                <h3>Isi</h3>
                <section>
                    <div id="isi" class="inner-content">
                        <p style="text-align: center;">Tidak ada daftar yang dipilih</p>
                    </div>
                </section>
            </div>
        </div>
        `;
    },

    async afterRender() {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('role', 'kepala desa')
                .eq('verifikasi', false);

            if (error) {
                throw error;
            }

            const dataKepalaDesaUnverified = data;
            // console.log(dataKepalaDesaUnverified);
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
                    window.location.hash = `#/baru/${body.id}`;
                    
                });

                newItemsContainer.appendChild(listItem);
            });

            if (url.id) {
                const item = dataKepalaDesaUnverified.find(body => body.id === url.id);
                if (item) {
                    verificationContainer.innerHTML = verifikasi_baru(item);
                    selectedItem = item;
                }

                // console.log(item.id);
                const buttonRespon = document.querySelector('#responButton');
                if (buttonRespon) {
                    buttonRespon.addEventListener('click', () => {
                        const id = item.id;
                        window.location.hash = `#/respon/${id}`;
                    });
                }

                const itemElement =  document.querySelector(`.button-new-item[data-id="${item.id}"]`);
                if (itemElement) {
                    itemElement.appendChild(buttonRespon);
                }
            }
        } catch (error) {
            const verificationContainer = document.querySelector('#isi');
            verificationContainer.innerHTML = `<p class="error">Tidak ada item yang dipilih</p>`;
        }
    }
};

export default NewVerificationPage;
