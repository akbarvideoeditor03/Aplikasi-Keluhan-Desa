class WebHeader extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
    }
    render(){
        this.innerHTML = `
        <div class="jumbotron">
            <div class="jumbotron-title">
                <div class="app_bar_title">
                    <div class="header-icon">
                        <img src="./icons/icon.svg" alt="header-icon">
                    </div>
                    <div class="app-bar__brand">
                        <h1>Selamat datang di aplikasi Keluhan Desa</h1>
                        <h2>Solusi pengaduan cepat dan tepat</h2>
                    </div>
                </div>
                <div class="sign_in right-side">
                    <a href="#/masuk">
                        <img src="./web-icons/sign_in.svg" alt="">
                        <p>Masuk</p>
                    </a>
                </div>
            </div>
        </div>

        <nav id="navigationDrawer">
            <div class="drawer-open">
                <button id="navigationDrawerSatu" class="app-bar__menu">☰</button>
                <nav id="drawer">
                    <ul class="nav__list">
                        <li><a href="#/"><i class="bi bi-house-door-fill"></i> Beranda</a></li>
                        <li><a href="#/"><i class="bi bi-person-circle"></i> Akun</a></li>
                    </ul>
                </nav>
            </div>
            <div class="nav-open">
                <ul class="nav">
                    <li><a href="#/"><i class="bi bi-house-door-fill"></i> Beranda</a></li>
                    <li><a href="#/"><i class="bi bi-person-circle"></i> Akun</a></li>
                </ul>
            </div>
        </nav>
        `;
    };
};

customElements.define('web-header', WebHeader);