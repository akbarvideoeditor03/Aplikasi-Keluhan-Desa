import { dashboard } from "../templates/template-creator";

const DashboardPage = {
    async render() {
        return `
        <div id="dashboard" class="container col-container admin-container content">
        </div>
        `;
    },

    async afterRender() {
        const dashboardContainer = document.querySelector('#dashboard');
        dashboardContainer.innerHTML = dashboard();
    },
};

export default DashboardPage;
