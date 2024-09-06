import { tentang_kami } from "../template/template-creator";


const TentangKami = {
    async render() {
        return `
        <div class="about_us content container col-container">
            <div id="help" class="container col-container card card-container">
                <img src="./loading.svg" class="container-wide loading" alt="">
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