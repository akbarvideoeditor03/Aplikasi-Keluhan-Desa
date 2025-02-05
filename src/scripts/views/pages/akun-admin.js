import Swal from "sweetalert2";
const user = JSON.parse(localStorage.getItem('user'));
const isLoggedIn = !!user;
import {
    akun_admin
} from "../template/template-creator";
import supabase from "../../global/config";

const AccountPage = {
    async render() {
        return `
            <div class="container col-container content">
                <h2>Profil <i class="bi bi-person-circle"></i></h2>
                <div id="akun" class="card-container admin-container content">
                    <img src="./loading.svg" class="container-wide loading" alt="">
                </div>
                <div class="container col-container">
                    <button id="logoutButton" class="button button-remove" style="width:calc(100%);"><i class="bi bi-box-arrow-right""></i> Keluar</button>
                </div>
            </div>
        `;
    },

    async afterRender() {
        const {
            data,
            error
        } = await supabase
            .from('users')
            .select('*')
            .eq('role', 'admin');

        if (error) {
            console.error('Error fetching admin users:', error);
            return;
        }

        if (data.length > 0) {
            const user = data[0];
            const akunContainer = document.querySelector('#akun');
            akunContainer.innerHTML = akun_admin(user);

            const logoutButton = document.getElementById('logoutButton');
            if (logoutButton) {
                logoutButton.addEventListener('click', () => {
                    localStorage.removeItem('user');
                    Swal.fire({
                        title: 'Selesai',
                        text: 'Anda berhasil keluar.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        window.location.href = '#/';
                        document.querySelector('web-header').render();
                    });
                });
            }
        } else {
            const akunContainer = document.querySelector('#akun');
            akunContainer.innerHTML = '<p>No admin users found.</p>';
        }

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
    },
};

export default AccountPage;