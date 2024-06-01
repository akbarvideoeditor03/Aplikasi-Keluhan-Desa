import { data } from "../templates/template-creator";

const DataPage = {
    async render() {
        return `
        <div id="data" class="data">
            
        </div>
        `;
    },

    async afterRender() {
        const dataContainer = document.querySelector('#data');
        dataContainer.innerHTML = data();
    },
};

export default DataPage;
