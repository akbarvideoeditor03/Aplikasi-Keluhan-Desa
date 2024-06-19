import Swal from 'sweetalert2';
import supabase from '../../global/config';

const kirimPengaduan = {
  async render() {
    const user = JSON.parse(localStorage.getItem('user'));

    const { data: kepalaDesa, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'kepala desa')
      .eq('verifikasi', 'true');

    if (error) {
      console.error('Error fetching kepala desa data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Maaf',
        text: 'Terjadi kesalahan saat memuat data kepala desa.',
      });
      return;
    }

    const kepalaDesaOptions = kepalaDesa.length > 0
      ? kepalaDesa.map((kd) => `<option value="${kd.id}">${kd.nama} | Kepala Desa ${kd.desa}</option>`).join('')
      : '<option disabled>Tidak ada kepala desa yang tersedia</option>';

    return `
      ${user ? `
        <div class="content">
          <h2 class="content__heading">Kirim Pengaduan</h2>
          <div id="menu" class="menu">
            <div class="form">
              <form id="pengaduanForm">
                <h4 class="content__subheading">Form Pengaduan</h4>
                <p class="text-warning">*mohon isi form dengan benar dan dapat dipertanggung jawabkan</p>
                
                <input type="text" name="judul-pengaduan" id="judul-pengaduan" placeholder="Judul Pengaduan*" required>
                
                <textarea name="isi-pengaduan" id="isi-pengaduan" class="textarea" placeholder="Isi Pengaduan*" required></textarea>
                
                <input type="date" name="tanggal-pengaduan" id="tanggal-pengaduan" required>
                
                <input type="text" name="patokan" id="patokan" placeholder="Patokan (misalnya Balai Desa)*" required>
                
                <select name="kepala-desa" id="kepala-desa" required>
                  <option selected disabled>Pilih Kepala Desa Tujuan yang sesuai dengan domisili Anda sekarang*</option>
                  ${kepalaDesaOptions}
                </select>

                <input type="file" name="lampiran" id="lampiran" class="custom-file-input" required>
                <label for="lampiran" class="custom-file-label">Tambahkan Lampiran (max. 5MB)*</label>

                <div class="role-container">
                  <input type="checkbox" name="pribadi" id="pribadi" required>
                  <label for="pribadi" class="checkbox-text">Pengaduan ini bukan bersifat pribadi</label>
                </div>

                <div class="role-container">
                  <input type="checkbox" name="konfirmasi" id="konfirmasi" required>
                  <label for="konfirmasi" class="checkbox-text">Apakah informasi di atas sudah benar?</label>
                </div>

                <div class="container row-container">
                  <button class="btn-group button button-remove" type="button" id="batalButton">Batal</button>
                  <button class="btn-group button button-accept" type="submit">Kirim</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      ` : `
        <div class="container col-container center">
          <p style="font-size: large;"><i class="bi bi-emoji-frown-fill"></i> Ups... Sepertinya Anda belum masuk?</p>
          <div class="container row-container text-link">
            <a href="#/masuk" class="button button-info">Masuk</a>
            <a href="#/daftar" class="button button-info">Daftar</a>
          </div>
        </div>
      `}
    `;
  },

  async afterRender() {
    const form = document.getElementById('pengaduanForm');
    const batalButton = document.getElementById('batalButton');

    if (form) {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        const formData = new FormData(form);
        const file = formData.get('lampiran');

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('lampiran_pengaduan')
          .upload(file.name, file, {
            upsert: false,
          });

        if (uploadError) {
          Swal.fire({
            icon: 'error',
            title: 'Maaf',
            text: `Gagal mengunggah lampiran: ${uploadError.message}`,
          });
          return;
        }

        const { data: publicUrlData, error: publicUrlError } = await supabase
          .storage
          .from('lampiran_pengaduan')
          .getPublicUrl(file.name);

        if (publicUrlError) {
          Swal.fire({
            icon: 'error',
            title: 'Maaf',
            text: `Gagal mendapatkan URL lampiran: ${publicUrlError.message}`,
          });
          return;
        }

        const pengaduanData = {
          id_pengguna_umum: user.id,
          judul: formData.get('judul-pengaduan'),
          isi: formData.get('isi-pengaduan'),
          tanggal: formData.get('tanggal-pengaduan'),
          lokasi: formData.get('patokan'),
          id_pengguna_kepala_desa: formData.get('kepala-desa'),
          lampiran: publicUrlData.publicUrl,
          created_at: new Date().toISOString(),
        };

        const { data: insertData, error: insertError } = await supabase
          .from('usersActivity')
          .insert([pengaduanData]);

        if (insertError) {
          Swal.fire({
            icon: 'error',
            title: 'Maaf',
            text: `Gagal mengirim pengaduan: ${insertError.message}`,
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Pengaduan berhasil terkirim.',
          }).then(() => {
            window.location.href = '#/status-pengaduan';
          });
        }
      });
    }

    if (batalButton) {
      batalButton.addEventListener('click', () => {
        Swal.fire({
          title: 'Sebentar...',
          text: 'Apakah Anda yakin ingin membatalkan isian?',
          icon: 'question',
          showCancelButton: true,
          cancelButtonText: 'Kembali',
          confirmButtonText: 'Ya, saya yakin',
        }).then((result) => {
          if (result.isConfirmed) {
            window.history.back();
          }
        });
      });
    }

    const fileInput = document.getElementById('lampiran');
    const fileLabel = document.querySelector('.custom-file-label');
    const MAX_SIZE_MB = 5;
    const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

    if (fileInput && fileLabel) {
      fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];

        fileLabel.textContent = 'Tambahkan Lampiran (max. 5MB)*';

        if (!file || !ALLOWED_TYPES.includes(file.type)) {
          Swal.fire({
            icon: 'error',
            title: 'Maaf',
            text: 'File lampiran tidak valid. Hanya file .png dan .jpg yang diizinkan.',
          });
          fileInput.value = '';
          return;
        }

        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
          Swal.fire({
            icon: 'error',
            title: 'Maaf',
            text: `Ukuran file melebihi ${MAX_SIZE_MB} MB yang diizinkan.`,
          });
          fileInput.value = '';
          return;
        }

        fileLabel.textContent = file.name || 'Tambahkan Lampiran (max. 5MB)*';
      });
    }
  },
};

export default kirimPengaduan;
