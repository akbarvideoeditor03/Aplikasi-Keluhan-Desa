import { bantuan__page } from "../template/template-creator";



const Bantuan = {
    async render() {
        return `
            <div class="content container col-container">
                <div>
                    <h2>Bantuan</h2>
                </div>
                <div id="help" class="container col-container card card-container">
                    
                </div>
            </div>
        `;
    },

    async afterRender() {
        const bantuan = document.querySelector('#help');
        bantuan.innerHTML = bantuan__page();

        const collapsibles = document.querySelectorAll('.collapsible');
        collapsibles.forEach(collapsible => {
            collapsible.addEventListener('click', () => {
                collapsible.classList.toggle('active');
                const content = collapsible.nextElementSibling;
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                }
            });
        });
    }
}

export default Bantuan;
