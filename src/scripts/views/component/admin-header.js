class AdminHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.highlightActiveNav();
    }

    render() {
        this.innerHTML =
            `
        <div class="jambotron">
            <div>
                <img src="./icons/icon.svg" style="width: 4rem;" alt="">
            </div>
            <div class="admin-header">
                <h1 class="title__upper">Selamat Datang di Keluhan Desa</h1>
                <h2 class="title__lower">Solusi keluhan cepat dan tepat</h2>
            </div>
        </div>
        <nav>
            <ul class="nav-model" id="nav">
                <a href="#/dashboard" class="nav-link">
                    <div class="nav-list">Dashboard</div>
                </a>
                
                <a href="#/umum" class="nav-link">
                    <div class="nav-list">Data</div>
                </a>

                <a href="#/baru" class="nav-link">
                    <div class="nav-list">Verifikasi</div>
                </a>

                <a href="#/account" class="account nav-link">
                    <div class="nav-list">
                        <i class="bi bi-person-circle" style="font-size: 150%; margin-inline-end: 1vh;"></i> ${('namaAdmin')}
                    </div>
                </a>
            </ul>
        </nav>
        `;

        this.addNavClickListeners();
    }

    addNavClickListeners() {
        const navItems = this.querySelectorAll('.nav-model .nav-link');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    highlightActiveNav() {
        const hash = window.location.hash || '#/';
        const navItems = this.querySelectorAll('.nav-model .nav-link');
        navItems.forEach(item => {
            if (item.getAttribute('href') === hash) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}

customElements.define('admin-header', AdminHeader);
