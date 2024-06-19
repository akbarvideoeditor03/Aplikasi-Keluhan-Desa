import { tentang_kami } from "../template/template-creator";


const TentangKami = {
    async render() {
        return `
        <div class="about_us content container col-container">
            <div>
                <h2>Bantuan</h2>
            </div>
            <div id="help" class="container col-container card card-container">
                Loading...
            </div>
        </div>
        `;
    },

    async afterRender() {
        const aboutUs = document.querySelector('.about_us');
        aboutUs.innerHTML = tentang_kami();
    }
}

export default TentangKami;