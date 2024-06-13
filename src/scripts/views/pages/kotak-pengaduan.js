import { kotak_pengaduan } from "../template/template-creator";

const KotakPengaduan = {
    async render() {
        return `
            <div id="kotak_pengaduan">
                
            </div>
        `;
    },

    async afterRender() {
        const kotakPengaduan = document.querySelector('#kotak_pengaduan');
        kotakPengaduan.innerHTML = kotak_pengaduan();
    }
}

export default KotakPengaduan;