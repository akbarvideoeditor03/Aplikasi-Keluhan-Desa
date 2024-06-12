import UrlParser from '../../routes/url-parser';
import { responPage } from '../templates/template-creator';

const ResponPage = {
    async render() {
        return `
            <div id="response-container" class="response-container">
                
            </div>
        `;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const selectedItem = JSON.parse(localStorage.getItem('selectedKepalaDesa'));
        const responContainer = document.querySelector('#response-container');

        if (selectedItem && selectedItem._id === url.id) {
            responContainer.innerHTML = responPage(selectedItem);
        } else {
            responContainer.innerHTML = '<p>Data tidak ditemukan.</p>';
        }
    }
};

export default ResponPage;
