import Swal from "sweetalert2";
import { kritiksaran } from "../template/template-creator";

const KritikSaran = {
    async render() {
        return `
            <div id="kritik__saran">
                
            </div>
        `;
    },

    async afterRender() {
        const kritikSaran_Form = document.querySelector('#kritik__saran');
        kritikSaran_Form.innerHTML = kritiksaran();

        const cancelButton = document.querySelector('#cancel');
        if (cancelButton) {
            cancelButton.addEventListener('click', () => {
                Swal.fire({
                    title: 'Sebentar...',
                    text: 'Apakah Anda yakin ingin membatalkan isian?',
                    icon: 'question',
                    showCancelButton: true,
                    cancelButtonText: 'Kembali',
                    confirmButtonText: 'Ya, saya yakin',
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.clear();
                        window.history.back();
                    }
                });
            });
        } else {
            console.error('Cancel button not found');
        }

        const sentButton = document.querySelector('#sentButton');
        const textarea = document.querySelector('#complain-toSystem');
        
        if (sentButton && textarea) {
            textarea.addEventListener('input', () => {
                const wordCount = textarea.value.trim().split(/\s+/).length;
                if (wordCount > 20) {
                    sentButton.removeAttribute('disabled');
                } else {
                    sentButton.setAttribute('disabled', 'disabled');
                }
            });

            sentButton.addEventListener('click', (event) => {
                event.preventDefault();
                Swal.fire({
                    title: 'Apakah kritik saran telah benar?',
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

export default KritikSaran;
