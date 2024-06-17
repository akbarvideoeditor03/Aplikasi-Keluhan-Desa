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
      ? kepalaDesa.map(kd => `<option value="${kd.id}">${kd.nama} | Kepala Desa ${kd.desa}</option>`).join('')
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
                        
                        <textarea name="isi-pengaduan" id="isi-pengaduan" class="textarea" placeholder="Isi Pengaduan*"
                            required></textarea>
                        
                            <input type="date" name="tanggal-pengaduan" id="tanggal-pengaduan" required>
                        
                        <input type="text" name="patokan" id="patokan" placeholder="Patokan (misalnya Balai Desa)*" required>
                        
                        <select name="kepala-desa" id="kepala-desa" required>
                            <option selected>Pilih Kepala Desa Tujuan*</option>
                            ${kepalaDesaOptions}
                        </select>

                        <input type="file" name="lampiran" id="lampiran" class="custom-file-input" multiple required>
                        <label for="lampiran" class="custom-file-label">Tambahkan Lampiran
                            (max. 5MB)*</label>

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

      const pengaduanData = {
        id_pengguna_umum: user.id,
        judul: formData.get('judul-pengaduan'),
        isi: formData.get('isi-pengaduan'),
        tanggal: formData.get('tanggal-pengaduan'),
        lokasi: formData.get('patokan'),
        id_pengguna_kepala_desa: formData.get('kepala-desa'),
        lampiran: formData.get('lampiran').toString(), // Mengubah file list ke string jika perlu
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('usersActivity')
        .insert([pengaduanData]);

      if (error) {
        Swal.fire({
          icon: 'error',
          title: 'Maaf',
          text: `Gagal mengirim pengaduan: ${error.message}`,
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

    const MAX_FILES = 5;
    const MAX_SIZE_MB = 5;
    const ALLOWED_TYPES = ['image/png', 'image/jpeg'];

    const fileInput = document.getElementById('lampiran');
    const fileLabel = document.querySelector('.custom-file-label');

    fileInput.addEventListener('change', () => {
      const { files } = fileInput;
      let totalSize = 0;

      if (files.length > MAX_FILES) {
        Swal.fire({
          icon: 'error',
          title: 'Maaf',
          text: `Ukuran file yang diizinkan ${MAX_FILES}`,
        });
        fileInput.value = '';
        fileLabel.textContent = 'Tambahkan Lampiran (max.5MB)*';
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!ALLOWED_TYPES.includes(file.type)) {
          Swal.fire({
            icon: 'error',
            title: 'Maaf',
            text: `File ${file.name} tidak didukung. Sistem hanya mendukung file .png dan .jpg saja.`,
          });
          fileInput.value = '';
          fileLabel.textContent = 'Tambahkan Lampiran (max.5MB)*';
          fileLabel.insertAdjacentHTML('afterbegin', '<img src="input-file.png" alt="file icon">');
          return;
        }
        totalSize += file.size;
        if (totalSize > MAX_SIZE_MB * 1024 * 1024) {
          Swal.fire({
            icon: 'error',
            title: 'Maaf',
            text: `Ukuran file dibawah ${MAX_SIZE_MB} MB yang diizinkan `,
          });
          fileInput.value = '';
          fileLabel.textContent = 'Tambahkan Lampiran (max.5MB)*';
          fileLabel.insertAdjacentHTML('afterbegin', '<img src="input-file.png" alt="file icon">');
          return;
        }
      }

      let fileNames = '';
      for (let i = 0; i < files.length; i++) {
        fileNames += files[i].name;
        fileLabel.insertAdjacentHTML('afterbegin', '<img src="input-file.png" alt="file icon">');
        if (i < files.length - 1) {
          fileNames += ', ';
          fileLabel.insertAdjacentHTML('afterbegin', '<img src="input-file.png" alt="file icon">');
        }
      }
      fileLabel.textContent = fileNames || 'Tambahkan Lampiran (max.5MB)*';
      fileLabel.insertAdjacentHTML('afterbegin', '<img src="input-file.png" alt="file icon">');
    });
  },
};

export default kirimPengaduan;
