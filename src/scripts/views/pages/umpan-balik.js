import { umpan_balik } from "../template/template-creator";

const UmpanBalik = {
    async render() {
        return `
            <div id="umpan_balik">
                
            </div>
        `;
    },

    async afterRender() {
        const umpanBalik = document.querySelector('#umpan_balik');
        umpanBalik.innerHTML = umpan_balik();
    }
}

export default UmpanBalik;