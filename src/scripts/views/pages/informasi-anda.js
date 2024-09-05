import {
    informasi_anda
} from "../template/template-creator";
import supabase from "../../global/config";

const InformasiAnda = {
    async render() {
        return `
            <div class="container col-container content">
                <h2>Informasi Anda <i class="bi bi-person-vcard-fill"></i></h2>
                <div class="card container col-container card-container account">
                </div>
            </div>
        `;
    },

    async afterRender() {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const errorNetwork = document.querySelector('.account');

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
            errorNetwork.classList.add('center');
            errorNetwork.innerHTML = `
                <p><i class="bi bi-emoji-tear-fill"></i> Sepertinya koneksi internet Anda bermasalah</p>
            `;
            return;
        }

        const Account = document.querySelector('.account');
        Account.innerHTML = informasi_anda(user);

        document.getElementById('editButton').addEventListener('click', () => {
            window.location.href = `#/edit-akun/${userId}`;
        });
    }
}

export default InformasiAnda;