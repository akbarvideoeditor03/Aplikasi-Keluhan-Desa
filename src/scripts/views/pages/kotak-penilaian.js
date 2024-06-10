import { kotak_penilaian } from "../template/template-creator";

const KotakPenilaian = {
    async render() {
        return `
            <div id="kotak_penilaian">
                
            </div>
        `;
    },

    async afterRender() {
        const kotakPenilaian = document.querySelector('#kotak_penilaian');
        kotakPenilaian.innerHTML = kotak_penilaian();
    }
}

export default KotakPenilaian;