import { informasi_anda } from "../template/template-creator";
import supabase from "../../global/config";

const InformasiAnda = {
    async render() {
        return `
            <div class="container col-container content">
                <h2>Informasi Anda</h2>
                <div class="account card container col-container">
                    Loading...
                </div>
            </div>
        `;
    },

    async afterRender() {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
        
        if (error) {
            console.error('Error fetching user data:', error);
            document.querySelector('.account').innerHTML = 'Error loading data';
            return;
        }

        const Account = document.querySelector('.account');
        Account.innerHTML = informasi_anda(user);
        
        document.getElementById('editButton').addEventListener('click', () => {
            window.location.href = `/edit-akun/${userId}`;
        });
    }
}

export default InformasiAnda;
