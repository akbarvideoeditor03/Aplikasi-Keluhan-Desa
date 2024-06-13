class WebFooter extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
    }
    
    render(){
        this.innerHTML = `
            <p>All Rights Reserved © 2024</p>
            <p>Grup Capstone</p>
        `;
    };
};

customElements.define('web-footer', WebFooter);