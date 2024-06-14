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

const umpan_balik = () => `
    <a href="#/rincian-umpanbalik" class="container row-container ub-link">
        <div class="ub-item container row-container">
            <div>
                <i class="bi bi-file-earmark-text" style="font-size: 50px"></i>
            </div>
            <div>
                <h3>Judul Item</h3>
                <p>Isi Item</p>
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

const kotak_pengaduan = () => `
    <a href="#/rincian-pengaduan" class="container row-container ub-link">
        <div class="ub-item container row-container">
            <div>
                <i class="bi bi-envelope-fill" style="font-size: 50px"></i>
            </div>
            <div>
                <h3>Judul Item</h3>
                <p>Isi Item</p>
            </div>
        </div>
    </a>
`;

const rincianPengaduan = () => `
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

    <div class="form-group main-form">
        <div>
            <h2>Respon Anda</h2>
        </div>
        <form id="myForm" action="" method="post" class="form-group main-form">
            <div class="form-group form-fields">
                <textarea name="sentComplaintRespon" id="sentComplaintRespon" placeholder="Ketik keterangan respon Anda..." class="textarea" required></textarea>
            </div>
            <div class="form-group btn-group">
                <button type="button" class="button button-remove" id="cancel">Batal</button>
                <button type="submit" class="button button-accept" id="sentButton">Kirim</button>
            </div>
        </form>
    </div>
`;

const kritiksaran = () => `
    <div class="form-group main-form">
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
                                    <a href="">Institut Pertanian Bogor</a>
                                </article>
                            </div>
    
                            <div class="item-card team-img-2 container col-container">
                                <article class="id-team-bg container col-container-0 center">
                                    <p>8040210091</p>
                                    <h3>Ahmad Akbar</h3>
                                    <a href="https://unama.ac.id/">Universitas Dinamika Bangsa</a>
                                </article>
                            </div>
                            <div class="item-card team-img-3 container col-container">
                                <article class="id-team-bg container col-container-0 center">
                                    <p>NIM?</p>
                                    <h3>Amarsyah Susanto Putra</h3>
                                    <a href="">Universitas Gunadarma</a>
                                </article>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </div>
`;

export {
    rincian_umpanbalik,
    bantuan__page,
    umpan_balik,
    kotak_pengaduan,
    rincianPengaduan,
    kritiksaran,
    tentang_kami,
}