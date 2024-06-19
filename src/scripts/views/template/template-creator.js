import Swal from "sweetalert2";

let logoutTimer;

const startLogoutTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
        localStorage.removeItem('user');
        Swal.fire({
            title: 'Session Expired',
            text: 'Sesi Anda telah habis. Silakan login kembali.',
            icon: 'warning',
            confirmButtonText: 'OK',
            willClose: () => {
                window.location.href = '#/masuk';
                window.location.reload();
            }
        });
    }, 600000);
};

const resetTimer = () => {
    startLogoutTimer();
    localStorage.setItem('lastActivity', Date.now());
};

const checkSession = () => {
    const lastActivity = localStorage.getItem('lastActivity');
    if (lastActivity) {
        const currentTime = Date.now();
        const elapsed = currentTime - lastActivity;
        if (elapsed > 600000) {
            localStorage.removeItem('user');
            Swal.fire({
                title: 'Session Expired',
                text: 'Sesi Anda telah habis. Silakan login kembali.',
                icon: 'warning',
                confirmButtonText: 'OK',
                willClose: () => {
                    window.location.href = '#/masuk';
                    window.location.reload();
                }
            });
        } else {
            startLogoutTimer();
        }
    } else {
        startLogoutTimer();
    }
};

document.addEventListener('mousemove', resetTimer);
document.addEventListener('keypress', resetTimer);
document.addEventListener('scroll', resetTimer);
document.addEventListener('click', resetTimer);

checkSession();

const user = JSON.parse(localStorage.getItem('user'));

const akun = () => `
    <a href="#/informasi_anda" class="container row-container ub-link">
        <div class="akun-item container row-container align-center">
            <div>
                <i class="bi bi-person-circle" style="font-size: 50px"></i>
            </div>
            <div>
                <h3>Informasi Anda</h3>
            </div>
        </div>
    </a>
    ${user && user.role === 'kepala desa' ? `
        <a href="#/status-verifikasi" class="container row-container ub-link">
        <div class="akun-item container row-container align-center">
            <div>
                <i class="bi bi-patch-check" style="font-size: 50px"></i>
            </div>
            <div>
                <h3>Status Verifikasi</h3>
            </div>
        </div>
    </a> 
    ` : ''}
`;

const statusverifikasiTemplate = (user) => `
    <div class="container col-container">
        <div class="container row-container">
            <div>
                <i class="bi bi-check-circle-fill text-green" style="font-size:50px; padding-left:3px;"></i>
            </div>
            <div class="container col-container-0">
                <p>Selamat, ${user.nama}!</p>
                <b>Akun Anda telah diverifikasi</b>
            </div>
        </div>
        <hr>
        <div>
            <p class="text">Keterangan: </p>
            <article class="text">${user.keterangan}</article>
        </div>
    </div>
`;

const edit_akun = (user) => `
    <form id="editForm" class="container col-container">
        <div class="container col-container">
            <label for="nama">Nama</label>
            <input class="form-field-bg" type="text" id="nama" name="nama" value="${user.nama}">
        </div>
        <div class="container col-container">
            <label for="no_telp">Nomor Telepon</label>
            <input class="form-field-bg" type="text" id="no_telp" name="no_telp" value="${user.no_telp}">
        </div>
        <div class="container col-container">
            <label for="nama_jalan">Nama Jalan</label>
            <input class="form-field-bg" type="text" id="nama_jalan" name="nama_jalan" value="${user.nama_jalan}">
        </div>
        <div class="container col-container">
            <label for="desa">Desa</label>
            <input class="form-field-bg" type="text" id="desa" name="desa" value="${user.desa}">
        </div>
        <div class="container col-container">
            <label for="kecamatan">Kecamatan</label>
            <input class="form-field-bg" type="text" id="kecamatan" name="kecamatan" value="${user.kecamatan}">
        </div>
        <div class="container col-container">
            <label for="kabupaten">Kabupaten</label>
            <input class="form-field-bg" type="text" id="kabupaten" name="kabupaten" value="${user.kabupaten}">
        </div>
        <div class="container col-container">
            <label for="provinsi">Provinsi</label>
            <input class="form-field-bg" type="text" id="provinsi" name="provinsi" value="${user.provinsi}">
        </div>
        <div class="container col-container">
            <label for="email">Email</label>
            <input class="form-field-bg" type="email" id="email" name="email" value="${user.email}">
        </div>
        <div class="container row-container">
            <button type="button" id="cancelButton" class="button button-remove">Batal</button>
            <button type="submit" class="button button-accept">Simpan</button>
        </div>
    </form>
`;


const informasi_anda = (user) => `
    <div>
        <caption>Nama</caption>
        <article class="text-bg">
            ${user.nama}
        </article>
    </div>
    <div>
        <caption>Nomor Telepon</caption>
        <article class="text-bg">
            ${user.no_telp}
        </article>
    </div>
    <div>
        <caption>Alamat</caption>
        <article class="text-bg">
            ${user.nama_jalan}, desa ${user.desa}, kec. ${user.kecamatan}, kab. ${user.kabupaten}, ${user.provinsi}
        </article>
    </div>
    <div>
        <caption>Email</caption>
        <article class="text-bg">
            ${user.email}
        </article>
    </div>
    <button id="editButton" class="button button-info"><i class="bi bi-pencil-square" style="font-size: 1em;"></i> Edit Akun</button>
`;

const bantuan__page = () => `
    <button type="button" class="collapsible">Cara Mengirimkan Pesan Pengaduan</button>
    <div class="content-collapsible">
        <ol type="1">
            <li>Buka situs Keluhan Desa di <a href="https://keluhandesa.000webhostapp.com/#/" target="_blank">keluhandesa.000webhostapp.com</a>.</li>
            <li>Masuk ke Menu Pengaduan: Di halaman utama, cari dan klik menu "Kirim Pengaduan".</li>
            <li>Isi Formulir Pengaduan dengan informasi berikut:
                <ol type="a">
                    <li><strong>Judul Pengaduan:</strong> Berikan judul yang jelas dan singkat untuk pengaduan Anda.</li>
                    <li><strong>Isi Pengaduan:</strong> Jelaskan secara rinci masalah atau keluhan yang Anda hadapi. Sertakan informasi yang relevan agar kepala desa dapat memahami situasi dengan baik.</li>
                    <li><strong>Pilih Tanggal:</strong> Tentukan tanggal pembuatan pengaduan Anda.</li>
                    <li><strong>Isi Alamat:</strong> Pilih alamat yang sesuai dengan tempat atau lokasi pengaduan yang Anda buat.</li>
                    <li><strong>Pilih Kepala Desa Tujuan:</strong> Pastikan memilih kepala desa yang terdaftar dan sesuai dengan alamat domisili Anda.</li>
                    <li><strong>Lampiran (Wajib):</strong> Unggah foto atau dokumen pendukung terkait pengaduan Anda.</li>
                    <li><strong>Centang Checkbox 'Pengaduan ini bukan bersifat pribadi':</strong> Pastikan pengaduan Anda bukan masalah pribadi, melainkan masalah bersama, seperti satu RT/RW atau masalah umum.</li>
                    <li><strong>Centang Checkbox 'Apakah informasi di atas sudah benar?':</strong> Konfirmasi bahwa form telah diisi dengan benar.</li>
                </ol>
            </li>
            <li>Klik tombol "Kirim" setelah semua informasi diisi dengan lengkap. Pengaduan Anda akan diteruskan kepada kepala desa yang bersangkutan.</li>
            <li>Untuk memeriksa status pengaduan, kunjungi menu <a href="#/status-pengaduan">Status Pengaduan</a> untuk mendapatkan update terkait tindak lanjut pengaduan Anda.</li>
            <li>Setelah kepala desa memberikan respon, Anda dapat memberikan tanggapan melalui fitur <a href="#/kritik-saran">Beri Tanggapan</a> untuk memberikan feedback atau informasi tambahan.</li>
        </ol>
    </div>


    <button type="button" class="collapsible">Cara Mendaftar Pengguna Umum</button>
    <div class="content-collapsible">
        <ol type="1">
            <li>Buka situs Keluhan Desa di <a href="https://keluhandesa.000webhostapp.com/#/" target="_blank">keluhandesa.000webhostapp.com</a>.</li>
            <li>Klik ikon 'Masuk' pada sudut kanan atas halaman.</li>
            <li>Klik tautan 'Klik Disini' pada kalimat 'Belum memiliki akun?'.</li>
            <li>Isi Formulir Pendaftaran dengan informasi berikut:
                <ol type="a">
                    <li><strong>Nama:</strong> Masukkan nama lengkap Anda.</li>
                    <li><strong>No Telp:</strong> Isi nomor telepon aktif yang Anda miliki.</li>
                    <li><strong>Nama Jalan:</strong> Masukkan alamat jalan tempat tinggal Anda.</li>
                    <li><strong>Alamat:</strong> Masukkan alamat lengkap Anda sesuai dengan nama desa, kecamatan, kabupaten, dan provinsi.</li>
                    <li><strong>Email:</strong> Masukkan alamat email yang valid.</li>
                    <li><strong>Password:</strong> Buat password yang kuat untuk menjaga kerahasiaan akun Anda.</li>
                </ol>
            </li>
            <li>Klik tombol "Daftar" setelah semua informasi diisi dengan benar.</li>
            <li>Anda akan diarahkan ke halaman 'Masuk' untuk memasukkan email dan password yang telah Anda daftarkan.</li>
        </ol>
    </div>

    <button type="button" class="collapsible">Cara Mendaftar Pengguna Kepala Desa</button>
    <div class="content-collapsible">
        <ol type="1">
            <li>Buka situs Keluhan Desa di <a href="http://www.keluhandesa.com">www.keluhandesa.com</a>.</li>
            <li>Klik ikon 'Masuk' pada sudut kanan atas halaman.</li>
            <li>Klik tautan 'Klik Disini' pada kalimat 'Belum memiliki akun?'.</li>
            <li>Isi Formulir Pendaftaran dengan informasi berikut:
                <ol type="a">
                    <li><strong>Nama:</strong> Masukkan nama lengkap Anda.</li>
                    <li><strong>No Telp:</strong> Isi nomor telepon yang aktif dan dapat dihubungi.</li>
                    <li><strong>Nama Jalan:</strong> Masukkan alamat jalan tempat tinggal Anda.</li>
                    <li><strong>Alamat:</strong> Masukkan alamat lengkap Anda, termasuk nama desa, kecamatan, kabupaten, dan provinsi.</li>
                    <li><strong>Email:</strong> Masukkan alamat email yang valid.</li>
                    <li><strong>Password:</strong> Buat password yang kuat dan aman untuk menjaga kerahasiaan akun Anda.</li>
                    <li><strong>Centang Checkbox:</strong> Tandai kotak ini untuk menyatakan bahwa Anda adalah seorang kepala desa.</li>
                    <li><strong>Kirim Lampiran:</strong> Unggah foto surat keterangan atau pelantikan sebagai kepala desa.</li>
                </ol>
            </li>
            <li>Klik tombol "Daftar" setelah semua informasi diisi dengan benar.</li>
            <li>Anda akan diarahkan ke halaman 'Masuk' untuk memasukkan email dan password yang telah Anda daftarkan. Harap dicatat bahwa Anda tidak dapat masuk untuk sementara waktu karena sistem sedang memeriksa lampiran keterangan Anda sebagai kepala desa.</li>
        </ol>
    </div>


`;

const status_pengaduan = (item) => `
    <a href="#/status-pengaduan/${item.id}" class="container col-container ub-link">
        <div class="st-item container row-container">
            <div class="text-yellow">
                <i class="bi bi-clock-fill" style="font-size: 50px"></i>
            </div>
            <div class="container col-container-0 text-black">
                <p>${item.judul}</p>
                <p>${item.tanggal}</p>
                <p>${item.status_pengaduan ? 'Sudah direspon' : 'Menunggu respon'}</p>
            </div>
        </div>
    </a>
`;

const rincian_status_pengaduan = (item, namaKepalaDesa) => `
    <div>
        <h4>Judul Pengaduan</h4>
        <div class="text text-bg">
            <p>${item.judul}</p>
        </div>
    </div>
    <div>
        <h4>Isi Pengaduan</h4>
        <div class="text text-bg">
            <p>${item.isi}</p>
        </div>
    </div>
    <div>
        <h4>Tanggal Pengaduan</h4>
        <div class="text text-bg">
            <p>${item.tanggal}</p>
        </div>
    </div>
    <div>
        <h4>Lokasi Pengaduan</h4>
        <div class="text text-bg">
            <p>${item.lokasi}</p>
        </div>
    </div>
    <div>
        <h4>Nama Kepala Desa</h4>
        <div class="text text-bg">
            <p>${namaKepalaDesa}</p>
        </div>
    </div>
    <div>
        <h4>Lampiran</h4>
        <button id="lihat-lampiran" class="ub-link button button-info"><i class="bi bi-image-fill"> </i>Lihat Lampiran</button>
    </div>
`;

const kotak_pengaduan = (item) => `
    <a href="#/rincian-pengaduan/${item.id}" class="container col-container ub-link">
        <div class="ub-item container row-container">
            <div>
                <i class="bi bi-envelope-fill" style="font-size: 50px"></i>
            </div>
            <div class="container col-container-0">
                <p>${item.judul}</p>
                <p>${item.tanggal}</p>
                <p>${item.status_pengaduan ? 'Sudah direspon' : 'Belum direspon'}</p>
            </div>
        </div>
    </a>
`;

const rincianPengaduan = (item) => `

    <div>
        <h4>Judul Pengaduan</h4>
        <div class="text text-bg">
            <p>${item.judul}</p>
        </div>
    </div>
    <div>
        <h4>Isi Pengaduan</h4>
        <div class="text text-bg">
            <p>${item.isi}</p>
        </div>
    </div>
    <div>
        <h4>Tanggal Pengaduan</h4>
        <div class="text text-bg">
            <p>${item.tanggal}</p>
        </div>
    </div>
    <div>
        <h4>Lokasi Pengaduan</h4>
        <div class="text text-bg">
            <p>${item.lokasi}</p>
        </div>
    </div>
    <div>
        <h4>Lampiran</h4>
        <button id="lihat-lampiran" class="ub-link button button-info"><i class="bi bi-image-fill"> </i>Lihat Lampiran</button>
    </div>

    <hr>

    <div class="form-group main-form">
        <div>
            <h2>Respon Anda</h2>
        </div>
        <form id="responForm" class="form-group main-form">
            <div class="form-group form-fields">
                <textarea name="respon_pengaduan" id="respon_pengaduan" placeholder="Ketik keterangan respon Anda..." class="textarea" required></textarea>
            </div>
            <div class="form-group container row-container">
                <button type="button" class="button button-remove" id="cancel">Batal</button>
                <button type="submit" class="button button-accept" id="sentButton">Kirim</button>
            </div>
        </form>
    </div>
`;

const kritiksaran = () => `
    <div class="form-group main-form content">
        <div>
            <h2>Kritik Saran</h2>
            <p>Mohon ceritakan keluhan Anda</p>
            <i>*Anda diwajibkan masuk terlebih dahulu</i>
        </div>
        <form id="myForm" class="form-group main-form">
            <div class="form-group form-fields">
                <textarea name="complain-toSystem" id="complain-toSystem" placeholder="Ketik kritik atau saran Anda minimal 20 kata..." class="textarea" required></textarea>
            </div>
            <div class="form-group row-container">
                <button type="button" class="button button-remove" id="cancel">Batal</button>
                <button type="submit" class="button button-accept" id="sentButton" disabled>Kirim</button>
            </div>
        </form>
    </div>
`;

const umpan_balik_template = (item) => `
    <a href="#/rincian-umpanbalik/${item.id}" class="container col-container ub-link">
        <div class="st-item container row-container">
        <div class="text-green">
            <i class="bi bi-check-circle-fill" style="font-size: 50px"></i>
        </div>
        <div class="container col-container-0 text-black">
            <p><span class="judul">${item.judul}</span></p>
            <p><span class="tanggal">${item.tanggal}</span></p>
            <p><span class="status">${item.status_pengaduan ? 'Sudah direspon' : 'Menunggu respon'}</span></p>
        </div>
        </div>
    </a>
`;

const rincian_umpanbalik = (item, namaKepalaDesa, namaDesa) => `
    <div>
        <h4>Judul Pengajuan</h4>
        <div class="text text-bg">
            <p>${item.judul}</p>
        </div>
    </div>
    <div>
        <h4>Isi Pengaduan</h4>
        <div class="text text-bg">
            <p>${item.isi}</p>
        </div>
    </div>
    <div>
        <h4>Tanggal Pengaduan</h4>
        <div class="text text-bg">
            <p>${item.tanggal}</p>
        </div>
    </div>
    <div>
        <h4>Lokasi Pengaduan</h4>
        <div class="text text-bg">
            <p>${item.lokasi}</p>
        </div>
    </div>
    <div>
        <h4>Patokan Pengaduan</h4>
        <div class="text text-bg">
            <p>${item.lokasi}</p>
        </div>
    </div>
    <div>
        <h4>Kepala Desa Tujuan</h4>
        <div class="text text-bg">
            <p>${namaKepalaDesa}</p>
        </div>
    </div>
    <div>
        <button id="lihat-lampiran" class="ub-link button button-info"><i class="bi bi-image-fill"> </i>Lihat Lampiran</button>
    </div>

    <hr>

    <div>
        <h4>Respon dari Kepala Desa ${namaDesa}</h4>
        <div class="text text-bg-respon">
            <p>${item.respon_pengaduan}</p>
        </div>
    </div>
`;

const tentang_kami = () => `
<h2>Tentang <i class="bi bi-info-square-fill"></i></h2>
<div class="card content">
        <div class="container col-container center">
            <div>
                <img class="img" src="./banner.svg" alt="gambar-banner" srcset="">
            </div>
            <div class="container col-container text">
                <p>
                    Aplikasi Keluhan Desa merupakan aplikasi publik yang dapat digunakan oleh masyarakat untuk dapat menyampaikan keluhan/pengaduan ke pemerintah desa setempat.
                </p>
                <p>
                    Aplikasi ini dirilis sebagai wujud pengerjaan proyek captone (proyek akhir), yang dilakukan oleh tim ID C624-PS136, untuk memenuhi syarat kelulusan pembelajaran selama 6 bulan di Dicoding Indonesia tahun 2024, di bawah sistem pembelajaran MSIB Kampus Merdeka.
                </p>
                <p>
                    Aplikasi ini dirancang untuk menyediakan sarana komunikasi yang mudah digunakan, memungkinkan masyarakat mengirimkan keluhan atau saran langsung ke kepala desa tanpa prosedur yang rumit, meningkatkan keterlibatan aktif dalam pembangunan desa.
                </p>

                <div class="container col-container tentang-kami">
                    <h3>Anggota Tim</h3>
                    <article class="tentang-kami">
                        <div class="tentang-tim tim-item">
                            <div class="item-card team-img-1 container col-container">
                                <article class="id-team-bg container col-container-0 center">
                                    <p>J0303211037</p>
                                    <h3>Dany Fadhilah</h3>
                                    <a href="https://www.ipb.ac.id/beranda-id/" target="_blank">Institut Pertanian Bogor</a>
                                </article>
                            </div>
    
                            <div class="item-card team-img-2 container col-container">
                                <article class="id-team-bg container col-container-0 center">
                                    <p>8040210091</p>
                                    <h3>Ahmad Akbar</h3>
                                    <a href="https://unama.ac.id/" target="_blank">Universitas Dinamika Bangsa</a>
                                </article>
                            </div>
                            <div class="item-card team-img-3 container col-container">
                                <article class="id-team-bg container col-container-0 center">
                                    <p>11121461</p>
                                    <h3>Amarsyah Susanto Putra</h3>
                                    <a href="https://pendaftaran.gunadarma.ac.id/" target="_blank">Universitas Gunadarma</a>
                                </article>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </div>
`;

const akun_admin = (user) => `
    <h2>Profil Admin ${user.nama}</h2>
    <div class="profile-container admin-container">
        <div class="box1">
            <h2>Foto Profil</h2>
            <div class="content image-container">
                <img src="${user.profile_image || 'https://cdn.idntimes.com/content-images/post/20230515/picprofilepintrest-b2134414d7608e67c18a883b34344c38.jpg'}" class="profile-image" alt="" srcset="">
            </div>
        </div>
        <div class="box2">
            <h2>Identitas Admin</h2>
            <table class="table">
                <tbody>
                    <tr>
                        <td>Nama Lengkap</td>
                        <td>:</td>
                        <td>${user.nama}</td>
                    </tr>
                    <tr>
                        <td>Alamat</td>
                        <td>:</td>
                        <td>${user.admin ? 'Admin Sistem' : 'Admin'}</td>
                    </tr>
                    <tr>
                        <td>Role</td>
                        <td>:</td>
                        <td>Admin Sistem</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>:</td>
                        <td>${user.verifikasi ? 'Terverifikasi' : 'Belum Terverifikasi'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="box3">
            <h2>Informasi Kontak</h2>
            <table class="table">
                <tbody>
                    <tr>
                        <td>Telepon/WhatsApp</td>
                        <td>:</td>
                        <td>${user.no_telp}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td>${user.email}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="box4">
            <h2>Keluar</h2>
        </div>
    </div>
`;

const data_umum = (body, index) => `
    <tr>
        <td>${index}</td>
        <td>${body.id}</td>
        <td>${body.nama}</td>
        <td>${body.role}</td>
        <td>
            <button class="button button-info" 
                data-id="${body.id}" 
                data-nama="${body.nama}"
                data-no_telp="${body.no_telp}"
                data-nama_jalan="${body.nama_jalan}"
                data-alamat="${body.desa}, ${body.kecamatan}, ${body.kabupaten}, ${body.provinsi}"
                data-email="${body.email}">
                Klik Disini
            </button>
        </td>
        <td>
            <button class="button button-remove" data-id="${body.id}" data-nama="${body.nama}">Hapus</button>
        </td>
    </tr>
`;

const data_kepaladesa = (body, index) => `
    <tr>
        <td>${index}</td>
        <td>${body.id}</td>
        <td>${body.nama}</td>
        <td>${body.role}</td>
        <td>
            <button class="button button-info" 
                data-id="${body.id}" 
                data-nama="${body.nama}"
                data-no_telp="${body.no_telp}"
                data-nama_jalan="${body.nama_jalan}"
                data-alamat="${body.desa}, ${body.kecamatan}, ${body.kabupaten}, ${body.provinsi}"
                data-email="${body.email}">
                Klik Disini
            </button>
        </td>
        <td>
            <button class="button button-remove" data-id="${body.id}" data-nama="${body.nama}">Hapus</button>
        </td>
    </tr>
`;

const list_NewItem = (body) => `
    Konfirmasi Akun Kepala Desa ${body.desa}
`;

const verifikasi_baru = (body) => `
    <div class="table">
        <table>
            <tbody>
                <tr>
                    <td>ID Akun</td>
                    <td>:</td>
                    <td>${body.id}</td>
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
                    <td>${body.desa}, ${body.kecamatan}, ${body.kabupaten}, ${body.provinsi}</td>
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
        <img src="${body.gambar_lampiran}"
        class="img-preview"
        alt="lampiran">
    </div>

    <div class="warning warn-text">
        <p>Perhatian! Sebelum respon, pastikan data lampiran telah dibaca dengan benar!</p>
    </div>

    <div>
        <button type="submit" class="button button-info" id="responButton">Respon</button>
    </div>
`;

const responPage = (respon) => `
    <div class="content">
        <div class="r-card">
            <h2>Halaman Respon ${respon.nama}</h2>
            <hr>
            <h3>Lampiran</h3>
            <div class="content image-container">
                <img src="${respon.gambar_lampiran}" class="attach-image" alt="" srcset="">
            </div>
            <h3>Informasi Rinci</h3>
            <table class="table">
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td>:</td>
                        <td>${respon.id}</td>
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
                        <td>${respon.desa}, ${respon.kecamatan}, ${respon.kabupaten}, ${respon.provinsi}</td>
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
        <div class="r-card container col-container">
            <h3>Keterangan</h3>

            <form id="myForm" class="container col-container">
                <div class="form-group">
                    <textarea class="textarea" name="keterangan" id="keterangan" placeholder="Ketik keterangan minimal 20 kata..." required></textarea>
                </div>
                <div class="form-group warning warn-text">
                    <p>Pastikan teks keterangan telah benar-benar lengkap dan jelas.</p>
                </div>
                <div>
                    <button type="submit" class="button button-accept" id="sentButton">Kirim</button>
                </div>
            </form>
        </div>
    </div>
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
    akun,
    edit_akun,
    statusverifikasiTemplate,
    informasi_anda,
    rincian_umpanbalik,
    bantuan__page,
    umpan_balik_template,
    kotak_pengaduan,
    rincianPengaduan,
    kritiksaran,
    tentang_kami,
    akun_admin,
    data_umum,
    data_kepaladesa,
    list_NewItem,
    verifikasi_baru,
    responPage,
    deleteData,
    status_pengaduan,
    rincian_status_pengaduan,
}