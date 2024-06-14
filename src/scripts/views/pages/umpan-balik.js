import { umpan_balik } from "../template/template-creator";

const UmpanBalik = {
    async render() {
        return `
        <div class="content container col-container">
            <div>
                <h2>Umpan Balik</h2>
                <p>Klik untuk melihat respon yang diberikan</p>
            </div>
            <div id="new-item" class="container col-container card card-container">
                
            </div>
        </div>
        `;
    },

    async afterRender() {
        const umpanBalik = document.querySelector('#new-item');
        umpanBalik.innerHTML = umpan_balik();
    }
}

export default UmpanBalik;
