import { rincianPengaduan } from "../template/template-creator";
import Swal from "sweetalert2";

const RincianPengaduan = {
    async render() {
        return `
            <div class="content container col-container">
                <div>
                    <h2>Rincian Pengaduan</h2>
                </div>
                <div id="pengaduan" class="container col-container card card-container">
                    
                </div>
            </div>
        `;
    },

    async afterRender() {
        const rincian_pengaduan = document.querySelector('#pengaduan');
        rincian_pengaduan.innerHTML = rincianPengaduan();

        const lihatLampiranButton = document.querySelector('#lihat-lampiran');
        const imageUrl = 'https://sidakpost.id/wp-content/uploads/2024/01/Screenshot_2024-01-27-17-24-35-62_6012fa4d4ddec268fc5c7112cbb265e7.jpg';

        if (!imageUrl) {
            lihatLampiranButton.setAttribute('disabled', 'true');
            lihatLampiranButton.classList.add('disabled');
        }

        lihatLampiranButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (imageUrl) {
                Swal.fire({
                    title: 'Lampiran Gambar',
                    imageUrl: imageUrl,
                    imageAlt: 'Lampiran Gambar',
                });
            }
        });

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
        const textarea = document.querySelector('#sentComplaintRespon');
        
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
}

export default RincianPengaduan;