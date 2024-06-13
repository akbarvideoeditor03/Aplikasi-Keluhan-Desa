import Swal from 'sweetalert2';

const Daftar = {
  async render() {
    const savedFormData = JSON.parse(localStorage.getItem('daftarFormData')) || {};

    return `
          <div class="content">
            <h2 class="content__heading">Buat Akun</h2>
            <div id="menu" class="menu">

              <div class="form">
                    <img src="./favicon.png" alt="">
                    <form id="registerForm" enctype="multipart/form-data" method="POST">
                      <h4 class="content__subheading">Form Buat Akun</h4>
                      
                      <input type="text" name="nama" id="nama" placeholder="Nama*" required value="${savedFormData.nama || ''}">
                      <input type="text" name="telp" id="telp" placeholder="No telp*" required value="${savedFormData.telp || ''}">
                      <input type="text" name="nama-jalan" id="nama-jalan" placeholder="Nama Jalan*" required value="${savedFormData['nama-jalan'] || ''}">
                      <select name="alamat" id="alamat" required>
                        <option selected>Alamat Lengkap*</option>
                        <option value="Dummy" ${savedFormData.alamat === 'Dummy' ? 'selected' : ''}>Dummy</option>
                        <option value="Dummy" ${savedFormData.alamat === 'Dummy' ? 'selected' : ''}>Dummy</option>
                        <option value="Dummy" ${savedFormData.alamat === 'Dummy' ? 'selected' : ''}>Dummy</option>
                        <option value="Dummy" ${savedFormData.alamat === 'Dummy' ? 'selected' : ''}>Dummy</option>
                      </select>
                      <input type="email" name="email" id="email" placeholder="Email*" required value="${savedFormData.email || ''}">
                      <input type="password" name="password" id="password" placeholder="Password*" required>
                      <input type="password" name="konfirmasiPassword" id="konfirmasiPassword" placeholder="Konfirmasi Password*" required>
                      <div class="role-container">
                        <input type="checkbox" name="role" id="role">
                        <label for="role">Apakah anda seorang kepala desa?</label>
                      </div>
                      <input type="file" name="berkas" id="berkas" style="display: none;">
                      <div class="aksi">
                        <a class="batal">BATAL</a>
                        <button class="btn-masuk" type="submit">DAFTAR</button>
                      </div>
                    </form>
                    <p>Sudah memiliki akun? <a href="#/masuk">Klik Disini</a></p>
                </div>
            </div>
          </div>
        `;
  },

  async afterRender() {
    const formInputs = document.querySelectorAll('input, select');
    formInputs.forEach((input) => {
      input.addEventListener('input', () => {
        const formData = {
          nama: document.getElementById('nama').value,
          telp: document.getElementById('telp').value,
          'nama-jalan': document.getElementById('nama-jalan').value,
          alamat: document.getElementById('alamat').value,
          email: document.getElementById('email').value,
        };
        localStorage.setItem('daftarFormData', JSON.stringify(formData));
      });

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
            localStorage.removeItem('daftarFormData');
            window.history.back();
          }
        });
      });
    });

    const registerForm = document.getElementById('registerForm');
    const roleCheckBox = document.getElementById('role');
    const berkasInput = document.getElementById('berkas');

    roleCheckBox.addEventListener('change', () => {
      if (roleCheckBox.checked) {
        // Jika checkbox dicentang, tampilkan input berkas
        berkasInput.style.display = 'block';
      } else {
        // Jika checkbox tidak dicentang, sembunyikan input berkas dan hapus nilai
        berkasInput.style.display = 'none';
        berkasInput.value = ''; // Kosongkan nilai input berkas
      }
    });

    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const nama = document.getElementById('nama').value;
      const telp = document.getElementById('telp').value;
      const namaJalan = document.getElementById('nama-jalan').value;
      const alamat = document.getElementById('alamat').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const konfirmasiPassword = document.getElementById('konfirmasiPassword').value;
      const role = roleCheckBox.checked ? 'true' : 'false';
      let pathBerkas = '';

      try {
        // Jika role kepala desa dicentang, unggah file
        if (roleCheckBox.checked) {
          const fileData = new FormData();
          fileData.append('berkas', document.getElementById('berkas').files[0]);

          if (fileData) {
            console.log('Tidak ada berkas');
          }

          const fileUploadResponse = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: fileData,
          });

          const fileUploadResult = await fileUploadResponse.json();

          if (!fileUploadResponse.ok) {
            throw new Error('Gagal mengunggah berkas atau berkas belum dipilih.');
          }

          pathBerkas = `public/uploads/${fileUploadResult.fileName}`;
        }

        // Kirim data ke MongoDB menggunakan API endpoint yang ada
        const response = await fetch(`https://ap-southeast-1.aws.data.mongodb-api.com/app/keluhandesa-gnkpeux/endpoint/create_user?nama=${nama}&no_telp=${telp}&nama_jalan=${namaJalan}&alamat=${alamat}&email=${email}&password=${password}&isKepalaDesa=${role}&berkas=${pathBerkas}`, {
          method: 'POST',
        });

        const result = await response.json();

        if (result.statusCode === 201) {
          Swal.fire({
            title: 'Sukses',
            text: result.body,
            icon: 'success',
          }).then(() => {
            window.location.href = '#/masuk'; // Redirect ke halaman login setelah pendaftaran sukses
            localStorage.removeItem('daftarFormData');
          });
        } else {
          Swal.fire({
            title: 'Gagal',
            text: result.body,
            icon: 'error',
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Gagal',
          text: error.message,
          icon: 'error',
        });
      }
    });
  },
};

export default Daftar;
