class AdminFooter extends HTMLElement {
    constructor() {
        super();
        this._style = document.createElement('style');
    }
    connectedCallback() {
        this.render();
    }
    render(){
        this.innerHTML = 
        `
        <p class="admin-footer footer-text">
            Copyright © 2024 - <img style="width: 2rem;" src="./icons/icon.svg" alt="gambar-icon-br">
            Keluhan Desa
        </p>
        `;
    }
}

customElements.define('admin-footer', AdminFooter);