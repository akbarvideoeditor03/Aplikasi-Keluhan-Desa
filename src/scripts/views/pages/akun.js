import { akun } from "../templates/template-creator";

const AccountPage = {
    async render() {
        return `
            <div class="center">
                <div id="akun" class="profile-container">
                        
                </div>
            </div>
        `;
    },

    async afterRender() {
        const akunContainer = document.querySelector('#akun');
        akunContainer.innerHTML = akun();
    },
};

export default AccountPage;