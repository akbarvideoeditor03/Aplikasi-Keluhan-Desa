import swal from 'sweetalert';

const dashboard = () => `
    <div class="content">
        <div class="card">
            <h1>Selamat Datang Admin $nama</h1>
        </div>
    </div>
`;

const data_umum = (data, index) => `
    <tr>
        <td>${index}</td>
        <td>${data.id}</td>
        <td>${data.title}</td>
        <td>
            <a href="#" class="button button-info">Klik Disini</a>
        </td>
        <td>
            <a href="#" class="button button-remove">Hapus</a>
        </td>
    </tr>
`;


const data_kepaladesa = () => `
    <table class="table-line">
        <tr>
            <th>No.</th>
            <th>ID</th>
            <th>Nama</th>
            <th>Informasi Rinci</th>
        </tr>
        <tr>
            <td>1</td>
            <td>00001</td>
            <td>Bill Gates</td>
            <td>
                <a href="#/datapengguna/{id}">Klik Disini</a>
            </td>
        </tr>
    </table>
`;

const verifikasi_baru = () => `
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ex nostrum, consectetur voluptate mollitia praesentium culpa aperiam minima dignissimos quo, impedit quasi debitis et illum. Rem porro voluptatem sint maxime?</p>    
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ex nostrum, consectetur voluptate mollitia praesentium culpa aperiam minima dignissimos quo, impedit quasi debitis et illum. Rem porro voluptatem sint maxime?</p>
`;  

const verifikasi_riwayat = () => `
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ex nostrum, consectetur voluptate mollitia praesentium culpa aperiam minima dignissimos quo, impedit quasi debitis et illum. Rem porro voluptatem sint maxime?</p>
`;

const akun = () => `
    <div class="content">
        <div class="card">
            <h1>Halaman Akun Admin</h1>
        </div>
    </div>
`;

export {
    dashboard,
    data_umum,
    data_kepaladesa,
    verifikasi_baru,
    verifikasi_riwayat,
    akun,
}