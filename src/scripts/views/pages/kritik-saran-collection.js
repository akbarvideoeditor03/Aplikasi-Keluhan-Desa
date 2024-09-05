import Swal from "sweetalert2";
import supabase from "../../global/config";
import { krisar_collection } from "../template/template-creator";

const kritik_saranCollection = {
    async render() {
        return `
            <div class="container col-container content">
                <h2>Kritik Saran Pengguna <i class="bi bi-chat-left-text-fill"></i></h2>
                <div class="krisar card grid krisar-grid grid-gap card-container">
                </div>
                </div>
                `;
    },
    
    // <div id="loading-indicator" class="container col-container center">
    //     <img src="./loading.svg" class="loading" alt="">
    // </div>
    async afterRender(){
        const krisarCollection = document.querySelector('.krisar');
        
        try {
            const {data, error} = await supabase
            .from('kritiksaran_sistem')
            .select('*')

            if (error) {
                throw error;
            }

            data.forEach((body, index) => {
                krisarCollection.innerHTML += krisar_collection(body, index + 1);
            });

            const infoButtons = document.querySelectorAll('.button-info');
            infoButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    const id = button.getAttribute('data-id');
                    const isi = button.getAttribute('data-isi');
                    const tanggal = button.getAttribute('data-tanggal');

                    const formatDate = (dateString) => {
                        const options = { 
                            day: '2-digit', 
                            month: 'long', 
                            year: 'numeric', 
                            hour: '2-digit', 
                            minute: '2-digit',
                            hour12: false,
                        };
                        const date = new Date(dateString);
                        const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(date);
                        return formattedDate.replace(' pukul ', ' | <strong><i class="bi bi-clock text-green"></i></strong> : ');
                    };

                    Swal.fire({
                        title: `Informasi Rinci`,
                        html: `
                        <div class="container col-container left">
                            <div>
                                <caption>Tanggal</caption>
                                <article class="text text-bg">${formatDate(tanggal)}</article>
                            </div>
                            <div>
                                <caption>ID</caption>
                                <article class="text text-bg">${id}</article>
                            </div>
                            <div>
                                <caption>Isi Kritik Saran</caption>
                                <article class="text text-bg">${isi}</article>
                            </div>
                        </div>`,
                        icon: 'info',
                        confirmButtonText: 'Tutup'
                    });
                });
            });

            const removeButtons = document.querySelectorAll('.button-remove');
            removeButtons.forEach(button => {
                button.addEventListener('click', async () => {
                    const id = button.getAttribute('data-id');
                    const isi = button.getAttribute('data-isi');
    
                    const result = await Swal.fire({
                        title: 'Apakah Anda yakin?',
                        html: `
                        <p>Anda akan menghapus kritik saran dengan isi</p>
                        <p>${isi}</p>
                        `,
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Ya, hapus!',
                        cancelButtonText: 'Batal'
                    });
    
                    if (result.isConfirmed) {
                        try {
                            await supabase
                                .from('kritiksaran_sistem')
                                .delete()
                                .eq('id', id);
    
                            Swal.fire('Dihapus!', 'Kritik saran berhasil dihapus', 'success');
                            button.closest('tr').remove();
                        } catch (error) {
                            Swal.fire('Gagal!', 'Kritik saran gagal dihapus.', 'error');
                        }
                    }
                });
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Error!', 'Gagal mengambil data kritik saran.', 'error');
        };
    },
};

export default kritik_saranCollection;