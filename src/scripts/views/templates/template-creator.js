import ENDPOINT_OF_API from "../../globals/endpoint";

const akun = () => `
    <h2 class="profile-title">Profil Admin Sistem</h2>
    <div class="profile-container">
        <div class="box1">
            <h2>Foto Profil</h2>
            <div class="content image-container">
                <img src="https://cdn.idntimes.com/content-images/post/20230515/picprofilepintrest-b2134414d7608e67c18a883b34344c38.jpg" class="profile-image" alt="" srcset="">
            </div>
        </div>
        <div class="box2">
            <h2>Identitas Admin</h2>
            <table class="table">
                <tbody>
                    <tr>
                        <td>Nama Lengkap</td>
                        <td>:</td>
                        <td>Dany Amar</td>
                    </tr>
                    <tr>
                        <td>Alamat</td>
                        <td>:</td>
                        <td>Nama Jalan + Alamat</td>
                    </tr>
                    <tr>
                        <td>role</td>
                        <td>:</td>
                        <td>Admin Sistem</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>:</td>
                        <td>Terverifikasi</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="box3">
            <h2>Informasi Kontak</h2>
            <table class="table">
                <tbody>
                    <tr>
                        <td>Telepon</td>
                        <td>:</td>
                        <td>021-7654321</td>
                    </tr>
                    <tr>
                        <td>WhatsApp</td>
                        <td>:</td>
                        <td>083172633234</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td>danyamar@gmail.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
`;

const dashboard = () => `
    <div class="content">
        <div class="card">
            <h1>Selamat Datang Admin $nama</h1>
        </div>
    </div>
`;

const data_umum = (body, index) => `
    <tr>
        <td>${index}</td>
        <td>${body._id}</td>
        <td>${body.nama}</td>
        <td>${body.role}</td>
        <td>
            <button class="button button-info" 
                data-id="${body._id}" 
                data-nama="${body.nama}"
                data-no_telp="${body.no_telp}"
                data-nama_jalan="${body.nama_jalan}"
                data-alamat="${body.alamat}"
                data-email="${body.email}">
                Klik Disini
            </button>
        </td>
        <td>
            <button class="button button-remove" data-id="${body._id}" data-nama="${body.nama}">Hapus</button>
        </td>
    </tr>
`;

const data_kepaladesa = (body, index) => `
    <tr>
        <td>${index}</td>
        <td>${body._id}</td>
        <td>${body.nama}</td>
        <td>${body.role}</td>
        <td>
            <button class="button button-info" 
                data-id="${body._id}" 
                data-nama="${body.nama}"
                data-no_telp="${body.no_telp}"
                data-nama_jalan="${body.nama_jalan}"
                data-alamat="${body.alamat}"
                data-email="${body.email}">
                Klik Disini
            </button>
        </td>
        <td>
            <button class="button button-remove" data-id="${body._id}" data-nama="${body.nama}">Hapus</button>
        </td>
    </tr>
`;

const list_NewItem = (body) => `
    Konfirmasi Akun Kepala Desa ${body.alamat}
`;

const verifikasi_baru = (body) => `
    <div class="table">
        <table>
            <tbody>
                <tr>
                    <td>ID Akun</td>
                    <td>:</td>
                    <td>${body._id}</td>
                </tr>
                <tr>
                    <td>Nama</td>
                    <td>:</td>
                    <td>${body.nama}</td>
                </tr>
                <tr>
                    <td>Nomor Telepon</td>
                    <td>:</td>
                    <td>${body.no_telp}</td>
                </tr>
                <tr>
                    <td>Nama Jalan</td>
                    <td>:</td>
                    <td>${body.nama_jalan}</td>
                </tr>
                <tr>
                    <td>Alamat</td>
                    <td>:</td>
                    <td>${body.alamat}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td>${body.email}</td>
                </tr>
                <tr>
                    <td>Status Verifikasi</td>
                    <td>:</td>
                    <td>${body.isVerified ? 'Sudah Terverifikasi' : 'Belum Terverifikasi'}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="attach">
        <h3>Lampiran</h3>
        <img src="https://employers.glints.com/id-id/blog/wp-content/uploads/2023/06/Template_Contoh_Surat_Undangan_Dinas-791x1024.webp"
        class="img"
        alt="lampiran">
    </div>

    <div class="warning warn-text">
        <p>Perhatian! Sebelum respon, pastikan data lampiran telah dibaca dengan benar!</p>
    </div>

    <div class="button-group">
        <button data-id="${body._id}" class="button button-respon">Respon</button>
    </div>
`;

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('button-respon')) {
        const id = event.target.getAttribute('data-id');
        window.location.hash = `#/respon/${id}`;
    }
});

const responPage = (respon) => `
    <div class="r-card">
        <h2>Halaman Respon ${respon.nama}</h2>
        <hr>
        <h3>Lampiran</h3>
        <div class="content image-container">
            <img src="https://cdn-web.ruangguru.com/landing-pages/assets/hs/CONTOH-SURAT-DINAS-PEMBERITAHUAN-PTS.jpeg" class="attach-image" alt="" srcset="">
        </div>
        <h3>Informasi Rinci</h3>
        <table class="table">
            <tbody>
                <tr>
                    <td>ID</td>
                    <td>:</td>
                    <td>${respon._id}</td>
                </tr>
                <tr>
                    <td>Nama</td>
                    <td>:</td>
                    <td>${respon.nama}</td>
                </tr>
                <tr>
                    <td>Nama Jalan</td>
                    <td>:</td>
                    <td>${respon.nama_jalan}</td>
                </tr>
                <tr>
                    <td>Alamat</td>
                    <td>:</td>
                    <td>${respon.alamat}</td>
                </tr>
                <tr>
                    <td>Nomor Telepon</td>
                    <td>:</td>
                    <td>${respon.no_telp}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td>${respon.email}</td>
                </tr>
                <tr>
                    <td>Nomor Telepon</td>
                    <td>:</td>
                    <td>${respon.no_telp}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td>${respon.email}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="r-card">
        <h3>Keterangan</h3>
        <form>
            <div class="form-group">
                <textarea class="textarea" name="keterangan" id="keterangan" placeholder="Ketik keterangan minimal 20 kata..." required></textarea>
            </div>
            <div class="form-group warning warn-text">
                <p>Pastikan teks keterangan telah benar-benar lengkap dan jelas.</p>
            </div>
            <div>
                <button class="button button-accept">Kirim</button>
            </div>
        </form>
    </div>
`;

const verifikasi_riwayat = () => `
    <table>
        <tbody>
            
        </tbody>
    </table>
`;

const deleteData = async (id) => {
    const url = ENDPOINT_OF_API.deleteData(id);
    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Gagal menghapus data');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export {
    dashboard,
    data_umum,
    deleteData,
    data_kepaladesa,
    list_NewItem,
    verifikasi_baru,
    responPage,
    verifikasi_riwayat,
    akun,
}