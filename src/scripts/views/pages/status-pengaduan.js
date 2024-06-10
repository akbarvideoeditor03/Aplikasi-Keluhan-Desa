import { status_pengaduan } from "../template/template-creator";

const StatusPengaduan = {
    async render() {
        return `
            <div id="status_pengaduan">
                
            </div>
        `;
    },

    async afterRender() {
        const statusPengaduan = document.querySelector('#status_pengaduan');
        statusPengaduan.innerHTML = status_pengaduan();
    }
}

export default StatusPengaduan;