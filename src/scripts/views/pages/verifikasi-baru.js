import { verifikasi_baru } from "../templates/template-creator";

const NewVerificationPage = {
    async render() {
        return `
        <div class="content">
            <div class="v-left-side">
                <h3>Pilih</h3>
                <a href="#/baru">
                    <div class="btn">Baru</div>
                </a>
                <a href="#/riwayat">
                    <div class="btn">Riwayat</div>
                </a>
            </div>
            <div class="verification-content">
                <div class="v-card nav-menu">
                    <h3>Daftar</h3>
                </div>
                <div class="v-card verification-core">
                    <h3>Isi</h3>
                    <div id="isi" class="table">
                    
                    </div>
                </div>
            </div>
        </div>
        `;
    },

    async afterRender(){
        const verificationContainer = document.querySelector('#isi');
        verificationContainer.innerHTML = verifikasi_baru();
    }
};

export default NewVerificationPage;