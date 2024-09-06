import Swal from "sweetalert2";
import {
    akun
} from "../template/template-creator";

const user = JSON.parse(localStorage.getItem('user'));
const isLoggedIn = !!user;

const Akun = {
    async render() {
        return `
        <div class="container col-container content">
            <div>
                <h2><i class="bi bi-person-circle"></i> Akun</h2>
            </div>
            <div id="akun_page" class="container col-container card card-container">
            </div>
        </div>
        `;
    },

    async afterRender() {
        const akun_page = document.querySelector('#akun_page');
        akun_page.innerHTML = akun();

        if (isLoggedIn) {
            const logoutButton = document.getElementById('logoutButton');
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('user');
                Swal.fire({
                    title: 'Selesai',
                    text: 'Anda berhasil keluar.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                    willClose: () => {
                        window.location.href = '#/masuk';
                        window.location.reload();
                    }
                });
            });
        }
    }
}

export default Akun;