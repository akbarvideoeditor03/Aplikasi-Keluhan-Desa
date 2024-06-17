import Swal from 'sweetalert2';
import supabase from '../../global/config';

const kirimPengaduan = {
  async render() {
    const { data: kepalaDesa, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'kepala desa')
      .eq('verifikasi', 'true');

    const kepalaDesaOptions = kepalaDesa
      ? kepalaDesa.map((kd) => `<option value="${kd.id}">${kd.nama} | Kepala Desa ${kd.desa}</option>`).join('')
      : '';

    return `
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
                <option selected disabled>Pilih Kepala Desa Tujuan*</option>
                ${kepalaDesaOptions}
              </select>

              <input type="file" name="lampiran" id="lampiran" class="custom-file-input" required>
              <label for="lampiran" class="custom-file-label">Tambahkan Lampiran (max. 5MB)*</label>

              <div class="role-container">
                <input type="checkbox" name="pribadi" id="pribadi" required>
                <label for="pribadi">Pengaduan ini bukan bersifat pribadi</label>
              </div>

              <div class="role-container">
                <input type="checkbox" name="konfirmasi" id="konfirmasi" required>
                <label for="konfirmasi">Apakah informasi di atas sudah benar?</label>
              </div>

              <div class="container row-container">
                <button class="button button-remove" type="button" id="batalButton">Batal</button>
                <button class="button button-accept" type="submit">Kirim</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const form = document.getElementById('pengaduanForm');
    const batalButton = document.getElementById('batalButton');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const user = JSON.parse(localStorage.getItem('user'));
      const formData = new FormData(form);
      const file = formData.get('lampiran');

      // Menggunakan Supabase Storage untuk mengunggah file ke bucket khusus
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('lampiran_pengaduan') // Ganti dengan nama bucket yang sesuai
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

      const lampiranUrl = await supabase.storage
        .from('lampiran_pengaduan')
        .getPublicUrl(file.name);

      const pengaduanData = {
        id_pengguna_umum: user.id,
        judul: formData.get('judul-pengaduan'),
        isi: formData.get('isi-pengaduan'),
        tanggal: formData.get('tanggal-pengaduan'),
        lokasi: formData.get('patokan'),
        id_pengguna_kepala_desa: formData.get('kepala-desa'),
        lampiran: lampiranUrl.data.publicUrl, // Simpan URL lampiran di database
        created_at: new Date().toISOString(),
      };

      // Mengirim data pengaduan beserta lampiran ke backend
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

    const MAX_SIZE_MB = 5;
    const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

    const fileInput = document.getElementById('lampiran');
    const fileLabel = document.querySelector('.custom-file-label');

    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];

      // Reset label file setelah setiap perubahan
      fileLabel.textContent = 'Tambahkan Lampiran (max. 5MB)*';

      // Validasi jenis file
      if (!file || !ALLOWED_TYPES.includes(file.type)) {
        Swal.fire({
          icon: 'error',
          title: 'Maaf',
          text: 'File lampiran tidak valid. Hanya file .png dan .jpg yang diizinkan.',
        });
        fileInput.value = '';
        return;
      }

      // Validasi ukuran file
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'Maaf',
          text: `Ukuran file melebihi ${MAX_SIZE_MB} MB yang diizinkan.`,
        });
        fileInput.value = '';
        return;
      }

      // Menampilkan nama file yang dipilih pada label file
      fileLabel.textContent = file.name || 'Tambahkan Lampiran (max. 5MB)*';
    });
  },
};

export default kirimPengaduan;
