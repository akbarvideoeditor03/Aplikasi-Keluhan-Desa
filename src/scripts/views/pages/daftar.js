import Swal from 'sweetalert2';
import supabase from '../../global/config';

const Daftar = {
  async render() {
    const savedFormData = JSON.parse(localStorage.getItem('daftarFormData')) || {};

    return `
      <div class="content">
        <h2 class="content__heading">Buat Akun <i class="bi bi-person-fill-add"></i></h2>
        <div id="menu" class="menu">
            <div class="form">
                <img src="./icon-banner.svg" alt="">
                <form id="daftarForm">
                    <input type="text" name="nama" id="nama" placeholder="Nama*" required
                        value="${savedFormData.nama || ''}">
                    <input type="text" name="no_telp" id="no_telp" placeholder="Nomor Telepon*" required
                        value="${savedFormData.no_telp || ''}">
                    <input type="text" name="nama_jalan" id="nama_jalan" placeholder="Nama Jalan*" required
                        value="${savedFormData.nama_jalan || ''}">
                    <input type="text" name="desa" id="desa" placeholder="Desa*" required
                        value="${savedFormData.desa || ''}">
                    <input type="text" name="kecamatan" id="kecamatan" placeholder="Kecamatan*" required
                        value="${savedFormData.kecamatan || ''}">
                    <input type="text" name="kabupaten" id="kabupaten" placeholder="Kabupaten*" required
                        value="${savedFormData.kabupaten || ''}">
                    <input type="text" name="provinsi" id="provinsi" placeholder="Provinsi*" required
                        value="${savedFormData.provinsi || ''}">
                    <input type="email" name="email" id="email" placeholder="Email*" required
                        value="${savedFormData.email || ''}">
                    <input type="password" name="password" id="password" placeholder="Password*" required>

                    <div class="role-container">
                        <input type="checkbox" name="role" id="role-verifikasi" ${savedFormData.role==='kepala desa' &&
                            savedFormData.verifikasi===false ? 'checked' : '' }>
                        <label class="checkbox-text" for="role-verifikasi">Apakah anda seorang kepala desa?</label>
                    </div>

                    <div id="upload-container" style="display: none;">
                        <label for="lampiran">Upload Lampiran:</label>
                        <input class="input-file" type="file" id="lampiran" name="lampiran">
                    </div>

                    <div class="container row-container">
                        <button class="btn-group button button-remove" id="cancel">Batal</button>
                        <button class="btn-group button button-accept" id="submit" type="submit">Daftar</button>
                    </div>
                </form>

                <div class="text-link button-group login center">
                    <p class="text-login">Sudah memiliki akun?</p>
                    <div class="center">
                      <a href="#/masuk" class="button button-info">Klik Disini</a>
                    </div>
                </div>
            </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const form = document.getElementById('daftarForm');
    const roleCheckbox = document.getElementById('role-verifikasi');
    const uploadContainer = document.getElementById('upload-container');

    const toggleUploadContainer = () => {
      if (roleCheckbox.checked) {
        uploadContainer.style.display = 'block';
      } else {
        uploadContainer.style.display = 'none';
      }
    };

    // Initial check on page load
    toggleUploadContainer();

    roleCheckbox.addEventListener('change', toggleUploadContainer);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      const role = roleCheckbox.checked ? 'kepala desa' : 'pengguna';
      const verifikasi = !roleCheckbox.checked;

      const userData = {
        nama: formData.get('nama'),
        no_telp: formData.get('no_telp'),
        nama_jalan: formData.get('nama_jalan'),
        desa: formData.get('desa'),
        kecamatan: formData.get('kecamatan'),
        kabupaten: formData.get('kabupaten'),
        provinsi: formData.get('provinsi'),
        email: formData.get('email'),
        password: formData.get('password'),
        role,
        verifikasi,
      };

      if (role === 'kepala desa') {
        const fileInput = document.getElementById('lampiran');
        const file = fileInput.files[0];
        const fileName = new Date() + file.name;

        if (!file) {
          Swal.fire('Error', 'Berkas Wajib Diisi', 'error');
          return;
        }

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('surat_keterangan')
          .upload(`${fileName}`, file, {
            upsert: false,
          });

        if (uploadError) {
          Swal.fire('Error', `Upload failed: ${uploadError.message}`, 'error');
          return;
        }

        const publicURL = await supabase.storage.from('surat_keterangan').getPublicUrl(fileName);

        if (!publicURL) {
          Swal.fire('Error', 'Failed to get public URL:', 'error');
          return;
        }
        userData.gambar_lampiran = publicURL.data.publicUrl;
      }

      const { data, error } = await supabase
        .from('users')
        .insert([userData]);

      if (error) {
        Swal.fire('Error', error.message, 'error');
      } else {
        Swal.fire('Success', 'Registrasi berhasil', 'success');
        localStorage.removeItem('daftarFormData');
        window.location.hash = '#/masuk';
      }
    });

    const formInputs = document.querySelectorAll('input');
    formInputs.forEach((input) => {
      input.addEventListener('input', () => {
        const formData = {
          nama: document.getElementById('nama').value,
          no_telp: document.getElementById('no_telp').value,
          nama_jalan: document.getElementById('nama_jalan').value,
          desa: document.getElementById('desa').value,
          kecamatan: document.getElementById('kecamatan').value,
          kabupaten: document.getElementById('kabupaten').value,
          provinsi: document.getElementById('provinsi').value,
          email: document.getElementById('email').value,
          role: roleCheckbox.checked ? 'kepala desa' : 'pengguna',
          verifikasi: !roleCheckbox.checked,
        };
        localStorage.setItem('daftarFormData', JSON.stringify(formData));
      });
    });

    const cancelBtn = document.getElementById('cancel');
    cancelBtn.addEventListener('click', () => {
      Swal.fire({
        title: 'Sebentar...',
        text: 'Apakah Anda yakin ingin membatalkan isian?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Kembali',
        confirmButtonText: 'Ya, saya yakin',
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear();
          window.history.back();
        }
      });
    });
  },
};

export default Daftar;
