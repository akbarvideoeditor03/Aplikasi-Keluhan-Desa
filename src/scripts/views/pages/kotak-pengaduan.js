import { kotak_pengaduan } from "../template/template-creator";

const KotakPengaduan = {
    async render() {
        return `
            <div class="content container col-container">
                <div>
                    <h2>Kotak Pengaduan</h2>
                    <p>Klik untuk melihat rincian yang pengaduan</p>
                </div>
                <div id="kotak_pengaduan" class="container col-container card card-container">
                    
                </div>
            </div>
        `;
    },

    async afterRender() {
        const kotakPengaduan = document.querySelector('#kotak_pengaduan');
        kotakPengaduan.innerHTML = kotak_pengaduan();
    }
}

export default KotakPengaduan;