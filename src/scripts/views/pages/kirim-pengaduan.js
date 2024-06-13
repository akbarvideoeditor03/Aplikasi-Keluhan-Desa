import Swal from 'sweetalert2';

const kirimPengaduan = {
  async render() {
    return `
          <div class="content">
            <h2 class="content__heading">Kirim Pengaduan</h2>
            <div id="menu" class="menu">
            <div class="form">
            <form action="">
                      <h4 class="content__subheading">Form Pengaduan</h4>
                      <p class="text-warning">*mohon isi form dengan benar dan dapat dipertanggung jawabkan</p>
                      <input type="text" name="judul-pengaduan" id="judul-pengaduan" placeholder="Judul Pengaduan*" required>
                      <textarea name="isi-pengaduan" id="isi-pengaduan" class="resize-textarea" placeholder="Isi Pengaduan*" required></textarea>
                      <input type="date" name="tanggal-pengaduan" id="tanggal-pengaduan*" required></input>
                      <select name="alamat" id="alamat" required>
                        <option selected>Lokasi Pengaduan*</option>
                        <option value="Dummy" >Dummy</option>
                        <option value="Dummy" >Dummy</option>
                        <option value="Dummy" >Dummy</option>
                        <option value="Dummy" >Dummy</option>
                      </select>
                      <input type="text" name="patokan" id="patokan" placeholder="Patokan (misalnya Balai Desa)*" required>
                      <select name="kepala-desa" id="kepala-desa" required>
                        <option selected>Pilih Kepala Desa Tujuan*</option>
                        <option value="Dummy">Dummy</option>
                        <option value="Dummy">Dummy</option>
                        <option value="Dummy">Dummy</option>
                        <option value="Dummy">Dummy</option>
                      </select>
                      <input type="file" name="lampiran" id="lampiran" class="custom-file-input" multiple required>
                      <label for="lampiran" class="custom-file-label"><img src="input-file.png">Tambahkan Lampiran (max.5MB)*</label>
                      <input type="email" name="email" id="email" placeholder="Email*" required>
                      <div class="role-container">
                        <input type="checkbox" name="pribadi" id="pribadi" required>
                        <label for="pribadi">Pengaduan ini bukan bersifat pribadi</label>
                      </div>
                      <div class="role-container">
                        <input type="checkbox" name="konfirmasi" id="konfirmasi" required>
                        <label for="konfirmasi">Apakah informasi di atas sudah benar?</label>
                      </div>
                      <div class="aksi">
                        <a class="batal">BATAL</a>
                        <button class="btn-masuk" type="submit">DAFTAR</button>
                      </div>
                    </form>
                </div>
            </div>
          </div>
        `;
  },

  async afterRender() {
    const menuLinks = document.querySelector('.batal');

    menuLinks.addEventListener('click', () => {
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
          title: 'Oops...',
          text: `Maximum ${MAX_FILES} files allowed.`,
        });
        fileInput.value = '';
        fileLabel.textContent = 'Tambahkan Lampiran (max.5MB)*';
        fileLabel.insertAdjacentHTML('afterbegin', '<img src="input-file.png" alt="file icon">');
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!ALLOWED_TYPES.includes(file.type)) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `File ${file.name} has an unsupported file type. Only PNG and JPEG files are allowed.`,
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
            title: 'Oops...',
            text: `Maximum total size ${MAX_SIZE_MB} MB allowed.`,
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
