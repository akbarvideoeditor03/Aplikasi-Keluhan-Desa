
import Swal from 'sweetalert2';

const statusPengaduan = {
  async render() {
    return `
          <div class="content">
            <h2 class="content__heading">Status Pengaduan</h2>
              <div id="menu" class="menu">
                <h4 class="content__subheading">Daftar Pengaduan</h4>
                <div class="daftar-pengaduan" id="daftar-pengaduan">
                  <img src="/pending.png"/>
                  <div class="text-status">
                    <p>Status : <span id="status">Menunggu Respon</span></p>
                    <p class="body-text-pengaduan">Pengaduan : <span id="judul">Jalan desa banyak yang berlubang</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
  },

  async afterRender() {
    // saasdsad
  },
};

export default statusPengaduan;

// import { status_pengaduan } from "../template/template-creator";

// const StatusPengaduan = {
//     async render() {
//         return `
//             <div id="status_pengaduan">
                
//             </div>
//         `;
//     },

//     async afterRender() {
//         const statusPengaduan = document.querySelector('#status_pengaduan');
//         statusPengaduan.innerHTML = status_pengaduan();
//     }
// }

// export default StatusPengaduan;

