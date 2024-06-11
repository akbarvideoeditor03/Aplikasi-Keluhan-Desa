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
                    <form action="">
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
                        <input type="checkbox" name="role" id="role" required>
                        <label for="role">Apakah anda seorang kepala desa?</label>
                      </div>
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
            localStorage.clear();
            window.history.back();
          }
        });
      });
    });
  },
};

export default Daftar;
