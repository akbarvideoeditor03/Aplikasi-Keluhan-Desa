import { akun } from "../templates/template-creator";

const AccountPage = {
    async render() {
        return `
        <div id="akun" class="akun">
        
        </div>
        `;
    },

    async afterRender() {
        const akunContainer = document.querySelector('#akun');
        akunContainer.innerHTML = akun();
    },
};

export default AccountPage;