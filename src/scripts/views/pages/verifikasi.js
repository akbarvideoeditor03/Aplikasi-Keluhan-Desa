import { verifikasi } from "../templates/template-creator";

const VerificationPage = {
    async render() {
        return `
        <div id="verification" class="verification">
            
        </div>
        `;
    },

    async afterRender(){
        const verificationContainer = document.querySelector('#verification');
        verificationContainer.innerHTML = verifikasi();
    }
};

export default VerificationPage;