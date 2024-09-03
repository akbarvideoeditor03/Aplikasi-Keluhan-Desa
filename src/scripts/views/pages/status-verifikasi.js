supabase
import supabase from '../../global/config';
import { statusverifikasiTemplate } from '../template/template-creator';

const StatusVerifikasi = {
    async render() {
        return `
            <div class="container col-container content">
                <h2>Status Verifikasi <i class="bi bi-patch-check-fill"></i></h2>
                <div class="card card-container account">
                    <img src="./loading.svg" class="container-wide loading" alt="">
                </div>
            </div>
        `;
    },

    async afterRender() {
        const userId = JSON.parse(localStorage.getItem('user')).id;
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
            document.querySelector('.account').innerHTML = 'Error loading data';
            return;
        }

        const Account = document.querySelector('.account');
        Account.innerHTML = statusverifikasiTemplate(user);
    }
};

export default StatusVerifikasi;