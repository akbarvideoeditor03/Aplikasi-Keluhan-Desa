class WebFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="container col-container content">
                <div class="container row-container flex-warp start-start">
                    <section class="b1 container col-container-0 center-start">
                        <img class="img img-footer" src="./banner-footer.svg" alt="" srcset="">
                        <p>Keluhan Desa © 2024</p>
                        <p>Grup Capstone C624-PS136</p>
                    </section>
                    <section class="b2 container col-container">
                        <h3>Fitur-Fitur</h3>
                        <a href="#/"><i class="bi bi-arrow-right-circle-fill" style="font-size: large; margin-right: 0.5rem;"></i> Beranda</a>
                        <a href="#/kirim-pengaduan" id="kirimPengaduanLink"><i class="bi bi-arrow-right-circle-fill" style="font-size: large; margin-right: 0.5rem;"></i> Kirim Pengaduan</a>
                        <a href="#/bantuan"><i class="bi bi-arrow-right-circle-fill" style="font-size: large; margin-right: 0.5rem;"></i> Bantuan</a>
                        <a href="#/kritik-saran"><i class="bi bi-arrow-right-circle-fill" style="font-size: large; margin-right: 0.5rem;"></i> Kritik Saran</a>
                        <a href="#/tentang-kami"><i class="bi bi-arrow-right-circle-fill" style="font-size: large; margin-right: 0.5rem;"></i> Tentang Kami</a>
                    </section>
                    <section class="b3 container col-container start-start">
                        <h3>Kontak Kami</h3>
                        <p class="text text-link">
                            <a href="https://wa.link/tsz972"><i class="bi bi-whatsapp" style="font-size: large; margin-right: 0.5rem;"></i>Admin 0831-7263-3234</a>
                        </p>
                        <p class="text text-link">
                            <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSMTtXtPvPXvpgRCqQlJPgnnLdSSMhQLkdwQLbzZqHJCzmVpghDHpwjrnNbrQBpnGPxKzljv"><i class="bi bi-envelope" style="font-size: large; margin-right: 0.5rem;"></i>C624-PS136@dicoding.org</a>
                        </p>
                        <p class="text text-link">
                            <i class="bi bi-pin-map" style="font-size: large; margin-right: 0.5rem;"></i> Jl. RB. Siagian, Kel. Jambi Selatan, Kota Jambi
                        </p>
                        <iframe class="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1916.2205840928766!2d103.62739667571306!3d-1.616013099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e2588b118406871%3A0xa7d3cb99bf4b5ded!2s9JMH%2BJ8M%2C%20Jl.%20Jend.%20Sudirman%2C%20The%20Hok%2C%20Kec.%20Jambi%20Sel.%2C%20Kota%20Jambi%2C%20Jambi%2036138!5e1!3m2!1sen!2sid!4v1718728297272!5m2!1sen!2sid" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </section>
                </div>
            </div>
        `;
    }
}

customElements.define('web-footer', WebFooter);
