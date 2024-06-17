import { akun } from "../template/template-creator";

const Akun = {
    async render() {
        return `
        <div class="container col-container content">
            <div>
                <h2>Akun</h2>
            </div>
            <div id="akun_page" class="container col-container card card-container">   
                
            </div>
        </div>
        `;
    },

    async afterRender() {
        const akun_page = document.querySelector('#akun_page');
        akun_page.innerHTML = akun();
    }
}

export default Akun;