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
    }, 10000);
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
        if (elapsed > 10000) {
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

const statusverifikasiTemplate = (name, keterangan) => `
    <div class="container col-container">
        <div class="container row-container">
            <div>
                <i class="bi bi-check-circle"></i>
            </div>
            <div class="container col-container-0">
                <p>Selamat, ${name}!</p>
                <p>Akun Anda telah diverifikasi</p>
            </div>
        </div>
        <hr>
        <div>
            <p>Keterangan: ${keterangan}</p>
        </div>
    </div>
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
    <button type="button" class="collapsible">Cara mengirimkan pesan pengaduan</button>
    <div class="content-collapsible">
        <ol type="1">
            <li>Buka situs Keluhan Desa di <a href="www.keluhandesa.com">www.keluhandesa.com</a></li>
            <li>Masuk ke Menu Pengaduan: Di halaman utama, cari dan klik menu "Kirim Pengaduan".</li>
            <li>Isi Formulir Pengaduan:
                <ol type="a">
                    <li>Judul Pengaduan: Berikan judul yang jelas dan singkat untuk pengaduan Anda.</li>
                    <li>Isi Pengaduan: Jelaskan secara rinci masalah atau keluhan yang Anda hadapi. Sertakan informasi yang relevan agar kepala desa dapat memahami situasi dengan baik.</li>
                    <li>Pilih Tanggal: Pilihlah tanggal pengaduan Anda dibuat</li>
                    <li>Isi Alamat: Pilih alamat yang menjadi tempat atau lokasi pengaduan yang Anda buat</li>
                    <li>Pilih Kepala Desa Tujuan: Pastikan memilih kepala desa yang terdaftar dan sesuai dengan alamat domisili Anda</li>
                    <li>Lampiran (Wajib) unggah foto atau dokumen pendukung yang terkait dengan pengaduan Anda.</li>
                    <li>Centang CheckBox 'Pengaduan ini bukan bersifat pribadi': Anda akan diminta untuk memastikan bahwa pengaduan yang Anda ajukan bukanlah masalah pribadi Anda. Melainkan masalah bersama. Misalnya satu RT/RW, ataupun orang-orang banyak</li>
                    <li>Centang CheckBox 'Apakah informasi di atas sudah benar?': Anda akan diminta untuk memastikan kembali bahwa form telah terisi dengan benar.</li>
                </ol>
            </li>
            <li>Kirim Pengaduan: Setelah semua informasi diisi, klik tombol "Kirim". Pengaduan Anda akan diteruskan ke kepala desa yang bersangkutan.</li>
            <li>Cek Status Pengaduan: Anda dapat memeriksa status pengaduan Anda di menu <a href="#/status-pengaduan">Status Pengaduan</a>. Di sini, Anda akan mendapatkan update mengenai tindak lanjut dari pengaduan yang telah Anda kirimkan.</li>
            <li>Beri Tanggapan: Setelah kepala desa memberikan respon, Anda dapat memberikan tanggapan melalui fitur <a href="#/kritik-saran">Beri Tanggapan</a> untuk memberikan feedback atau informasi tambahan.</li>
        </ol>
    </div>

    <button type="button" class="collapsible">Cara mendaftar pengguna umum</button>
    <div class="content-collapsible">
        <ol type="1">
            <li>Buka situs Keluhan Desa di <a href="www.keluhandesa.com">www.keluhandesa.com</a>.</li>
            <li>Klik ikon 'Masuk' pada sudut kanan atas halaman.</li>
            <li>Klik kata 'Klik Disini' pada kalimat 'Belum memiliki akun?'</li>
            <li>Isi Formulir Pendaftaran:
                <ol type="a">
                    <li>Nama: Masukkan nama lengkap Anda.</li>
                    <li>No telp: Isi nomor telepon aktif yang Anda miliki</li>
                    <li>Nama Jalan: Masukkan alamat jalan tempat tinggal Anda</li>
                    <li>Alamat: Masukkan alamat lengkap Anda sesuai dengan nama desa, nama kecamatan, nama kabupaten, dan nama provinsi.</li>
                    <li>Email: Masukkan alamat email yang valid.</li>
                    <li>Password: Masukkan password atau kata sandi yang rumit. Ini penting untuk menjaga kerahasiaan akun Anda.</li>
                    <li>Konfirmasi Password: Masukkan kembali password atau kata sandi yang sudah Anda masukkan sebelumnya.</li>
                </ol>
            </li>
            <li>Daftar: Setelah semua informasi diisi, klik tombol "Daftar".</li>
            <li>Anda akan diarahkan ke halaman 'Masuk' untuk mengisi email dan password dari akun yang telah Anda daftarkan.</li>
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
        <h4>Tanggal Pengaduan</h4>
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
            <div class="form-group btn-group">
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
        </div>
        <form id="myForm" action="" method="post" class="form-group main-form">
            <div class="form-group form-fields">
                <textarea name="complain-toSystem" id="complain-toSystem" placeholder="Ketik kritik atau saran Anda..." class="textarea" required></textarea>
            </div>
            <div class="form-group btn-group">
                <button type="button" class="button button-remove" id="cancel">Batal</button>
                <button type="submit" class="button button-accept" id="sentButton">Kirim</button>
            </div>
        </form>
    </div>
`;

const umpan_balik_template = (item) => `
    <a href="#/umpan-balik/${item.id}" class="container col-container ub-link">
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

const rincian_umpanbalik = () => `
    <div>
        <h4>Judul Pengajuan</h4>
        <div class="text text-bg">
            <p>Jalan desa banyak berlubang</p>
        </div>
    </div>
    <div>
        <h4>Isi Pengaduan</h4>
        <div class="text text-bg">
            <p>Pengguna kendaraan roda 2 sangat tidak nyaman dengan kondisi jalan. Dan minta diperbaiki secepatnya.</p>
        </div>
    </div>
    <div>
        <h4>Tanggal Pengaduan</h4>
        <div class="text text-bg">
            <p>15 Mei 2024</p>
        </div>
    </div>
    <div>
        <h4>Lokasi Pengaduan</h4>
        <div class="text text-bg">
            <p>Desa Tebo Jaya, Kec. Limbur Lubuk Mengkuang, Kab. Bungo, Jambi</p>
        </div>
    </div>
    <div>
        <h4>Patokan Pengaduan</h4>
        <div class="text text-bg">
            <p>Jalan Poros Sunan Sari (Dekat Gindo Tailor)</p>
        </div>
    </div>
    <div>
        <h4>Kepala Desa Tujuan</h4>
        <div class="text text-bg">
            <p>Kepala Desa Tebo Jaya</p>
        </div>
    </div>
    <div>
        <button id="lihat-lampiran" class="ub-link button button-info"><i class="bi bi-image-fill"> </i>Lihat Lampiran</button>
    </div>

    <hr>

    <div>
        <h4>Respon dari Kepala Desa ${('nama desa')}</h4>
        <div class="text text-bg-respon">
            <p>Kepada saudara/i yang terhormat, laporan pengaduan Anda telah kami terima.
            Dan saat ini kami sedang merencanakan upaya perbaikan dalam 5 hari mendatang.
            Mohon bersabar dan selalu berhati-hati dalam berkendara 🙏.</p>
        </div>
    </div>
`;

const tentang_kami = () => `
<h2>Tentang <i class="bi bi-info-square-fill"></i></h2>
<div class="card content">
        <div class="container col-container center">
            <div>
                <img class="img" src="./banner.png" alt="gambar-banner" srcset="">
            </div>
            <div class="container col-container text">
                <p>
                    Aplikasi Keluhan Desa merupakan aplikasi publik yang dapat digunakan oleh masyarakat untuk dapat menyampaikan keluhan/pengaduan ke pemerintah desa setempat.
                </p>
                <p>
                    Aplikasi ini dirilis sebagai wujud dari pengerjaan proyek captone (proyek akhir), yang dilakukan oleh tim ID C624-PS136, untuk memenuhi syarat kelulusan pembelajaran selama 6 bulan di Dicoding Indonesia tahun 2024, di bawah sistem pembelajaran MSIB Kampus Merdeka.
                </p>
                <p>
                    <i>(akan diisi lagi oleh paragraf lain...)</i>
                </p>

                <div class="container col-container tentang-kami">
                    <h3>Anggota Tim</h3>
                    <article class="tentang-kami">
                        <div class="tentang-tim tim-item">
                            <div class="item-card team-img-1 container col-container">
                                <article class="id-team-bg container col-container-0 center">
                                    <p>NIM?</p>
                                    <h3>Dany Fadhilah</h3>
                                    <a href="" target="_blank">Institut Pertanian Bogor</a>
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
                                    <p>NIM?</p>
                                    <h3>Amarsyah Susanto Putra</h3>
                                    <a href="" target="_blank">Universitas Gunadarma</a>
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