import Swal from 'sweetalert2';
import UrlParser from '../../routes/url-parser';
import { responPage } from '../templates/template-creator';

const ResponPage = {
    async render() {
        return `
            <div id="response-container" class="container col-container center">
                
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


        const sentButton = document.querySelector('#sentButton');
        const textarea = document.querySelector('#keterangan');
        
        if (sentButton && textarea) {
            textarea.addEventListener('input', () => {
                const wordCount = textarea.value.trim().split(/\s+/).length;
                if (wordCount >= 20) {
                    sentButton.removeAttribute('disabled');
                } else {
                    sentButton.setAttribute('disabled', 'disabled');
                }
            });

            sentButton.addEventListener('click', (event) => {
                event.preventDefault();
                Swal.fire({
                    title: 'Apakah keterangan sudah benar dan lengkap?',
                    icon: 'question',
                    showCancelButton: true,
                    cancelButtonText: 'Kembali',
                    confirmButtonText: 'Ya, kirim',
                }).then((result) => {
                    if (result.isConfirmed) {
                        document.querySelector('#myForm').submit();
                    }
                });
            });
        } else {
            if (!sentButton) console.error('Send button not found');
            if (!textarea) console.error('Textarea not found');
        }
        sentButton.setAttribute('disabled', 'disabled');
    }
};

export default ResponPage;
