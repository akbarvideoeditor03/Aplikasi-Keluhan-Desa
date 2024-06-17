import Swal from "sweetalert2";
import { akun_admin } from "../template/template-creator";
import supabase from "../../global/config";

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
        const { data, error } = await supabase
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
                        title: 'Berhasil!',
                        text: 'Anda telah keluar.',
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
    },
};

export default AccountPage;
