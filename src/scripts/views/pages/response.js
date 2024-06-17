import Swal from 'sweetalert2';
import UrlParser from '../../routes/url-parser';
import supabase from "../../global/config.js";
import { responPage } from '../template/template-creator';

const ResponPage = {
    async render() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', url.id);

        if (error) {
            console.error('Error fetching data:', error);
            return '<p>Error fetching data.</p>';
        }

        if (data.length === 0) {
            return '<p>Data tidak ditemukan.</p>';
        }

        const selectedItem = data[0];
        window.selectedItem = selectedItem;
        return responPage(selectedItem);
    },

    async afterRender() {
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

            sentButton.addEventListener('click', async (event) => {
                event.preventDefault();
                const keterangan = textarea.value.trim();
                Swal.fire({
                    title: 'Apakah keterangan sudah benar dan lengkap?',
                    icon: 'question',
                    showCancelButton: true,
                    cancelButtonText: 'Kembali',
                    confirmButtonText: 'Ya, kirim',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            const { data, error } = await supabase
                                .from('users')
                                .update({
                                    verifikasi: true,
                                    keterangan,
                                })
                                .eq('id', window.selectedItem.id);

                            if (error) {
                                throw error;
                            }

                            Swal.fire('Berhasil!', 'Data telah diperbarui.', 'success');
                        } catch (error) {
                            Swal.fire('Gagal!', 'Terjadi kesalahan saat memperbarui data.', 'error');
                        }
                    }
                });
            });
        } else {
            if (!sentButton) console.error('Send button not found');
            if (!textarea) console.error('Textarea not found');
        }
        sentButton.setAttribute('disabled', 'disabled');
    },
};

export default ResponPage;
