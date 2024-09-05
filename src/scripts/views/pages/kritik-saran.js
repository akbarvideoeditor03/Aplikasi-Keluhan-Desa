import Swal from "sweetalert2";
import {
    kritiksaran
} from "../template/template-creator";
import supabase from "../../global/config";

const KritikSaran = {
    async render() {
        return `
            <div id="kritik__saran">
                <img src="./loading.svg" class="container-wide loading" alt="">
            </div>
        `;
    },

    async afterRender() {
        const kritikSaran_Form = document.querySelector('#kritik__saran');
        kritikSaran_Form.innerHTML = kritiksaran();

        const cancelButton = document.querySelector('#cancel');
        const sentButton = document.querySelector('#sentButton');
        const textarea = document.querySelector('#complain-toSystem');

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
                        window.history.back();
                    }
                });
            });
        } else {
            console.error('Cancel button not found');
        }

        if (sentButton && textarea) {
            textarea.addEventListener('input', () => {
                const wordCount = textarea.value.trim().split(/\s+/).length;
                if (wordCount > 20) {
                    sentButton.removeAttribute('disabled');
                } else {
                    sentButton.setAttribute('disabled', 'disabled');
                }
            });

            sentButton.addEventListener('click', async (event) => {
                event.preventDefault();
                const complainText = textarea.value.trim();
                const userId = JSON.parse(localStorage.getItem('user')).id;

                if (complainText.length < 20) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Kritik atau saran harus lebih dari 20 kata.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    return;
                }

                Swal.fire({
                    title: 'Apakah kritik saran telah benar?',
                    icon: 'question',
                    showCancelButton: true,
                    cancelButtonText: 'Kembali',
                    confirmButtonText: 'Ya, kirim',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            const {
                                data,
                                error
                            } = await supabase
                                .from('kritiksaran_sistem')
                                .insert([{
                                    id_pengguna: userId,
                                    isi: complainText
                                }]);

                            if (error) {
                                throw error;
                            }

                            Swal.fire({
                                title: 'Success',
                                text: 'Kritik atau saran Anda berhasil terkirim.',
                                icon: 'success',
                                confirmButtonText: 'OK',
                                willClose: () => {
                                    window.location.href = `#/beranda`;
                                }
                            });
                        } catch (error) {
                            Swal.fire({
                                title: 'Error',
                                text: error.message || 'Terjadi kesalahan saat mengirimkan kritik atau saran.',
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                        }
                    }
                });
            });
        }
    }
};

export default KritikSaran;