import Swal from "sweetalert2";
import {
    edit_akun
} from "../template/template-creator";
import supabase from "../../global/config";

const EditAkun = {
    async render() {
        return `
      <div class="container col-container content">
        <h3>Edit Akun</h3>
        <div id="edit" class="card container col-container">
          Loading...
        </div>
      </div>
    `;
    },

    async afterRender() {
        const userId = window.location.hash.split('/')[2];
        const {
            data: user,
            error
        } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching user data:', error);
            document.querySelector('#edit').innerHTML = 'Error loading data';
            return;
        }

        const edit = document.querySelector('#edit');
        edit.innerHTML = edit_akun(user);

        const form = document.getElementById('editForm');
        const cancelButton = document.getElementById('cancelButton');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const updatedUser = {
                nama: formData.get('nama'),
                no_telp: formData.get('no_telp'),
                nama_jalan: formData.get('nama_jalan'),
                desa: formData.get('desa'),
                kecamatan: formData.get('kecamatan'),
                kabupaten: formData.get('kabupaten'),
                provinsi: formData.get('provinsi'),
                email: formData.get('email')
            };

            const {
                error
            } = await supabase
                .from('users')
                .update(updatedUser)
                .eq('id', userId);

            if (error) {
                console.error('Error updating user data:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Terjadi kesalahan saat menyimpan data.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    title: 'Success',
                    text: 'Data berhasil disimpan.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    willClose: () => {
                        window.location.href = `#/informasi_anda`;
                    }
                });
            }
        });

        cancelButton.addEventListener('click', () => {
            Swal.fire({
                title: 'Apakah Anda yakin?',
                text: "Perubahan yang Anda buat tidak akan disimpan.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, Batalkan!'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = `#/informasi_anda`;
                }
            });
        });
    },
};

export default EditAkun;