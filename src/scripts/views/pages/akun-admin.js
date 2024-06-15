import Swal from "sweetalert2";
import { akun_admin } from "../templates/template-creator";

const AccountPage = {
    async render() {
        return `
            <div class="container col-container admin-container content">
                <div id="akun" class="card">
                    
                </div>
            </div>
        `;
    },

    async afterRender() {
        const akunContainer = document.querySelector('#akun');
        akunContainer.innerHTML = akun_admin();

        const logoutButton = document.querySelector('#logout');
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            Swal.fire({
                title: 'Apakah Anda yakin ingin keluar?',
                icon: 'question',
                showCancelButton: true,
                cancelButtonText: 'Kembali',
                confirmButtonText: 'Ya, keluar',
            }).then((result) => {
                if (result.isConfirmed) {
                    document.querySelector('#myForm').submit();
                }
            });
        });
    },
};

export default AccountPage;