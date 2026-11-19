let biodataList = [];
  let currentBase64Image = "";

  const form = document.getElementById('biodataForm');
  const fotoInput = document.getElementById('foto');
  const photoPreview = document.getElementById('photoPreview');
  const tableBody = document.getElementById('biodataTableBody');
  const editIndexInput = document.getElementById('editIndex');
  const btnSave = document.getElementById('btnSave');
  const btnCancel = document.getElementById('btnCancel');

  // Handle Preview Foto dan Konversi ke Base64
  fotoInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        currentBase64Image = event.target.result;
        photoPreview.innerHTML = `<img src="${currentBase64Image}" alt="Foto">`;
      };
      reader.readAsDataURL(file);
    }
  });

  // Handle Submit Form (Simpan / Edit)
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const data = {
      nama: document.getElementById('nama').value,
      nik: document.getElementById('nik').value,
      tmpLahir: document.getElementById('tmpLahir').value,
      tglLahir: document.getElementById('tglLahir').value,
      gender: document.getElementById('gender').value,
      agama: document.getElementById('agama').value,
      email: document.getElementById('email').value,
      telepon: document.getElementById('telepon').value,
      alamat: document.getElementById('alamat').value,
      foto: currentBase64Image
    };

    const editIndex = parseInt(editIndexInput.value);

    if (editIndex === -1) {
      // Tambah Data Baru
      biodataList.push(data);
    } else {
      // Update Data Yang Ada
      if (!currentBase64Image) {
        data.foto = biodataList[editIndex].foto;
      }
      biodataList[editIndex] = data;
    }

    resetForm();
    renderTable();
  });

  // Render Data ke Tabel
  function renderTable() {
    tableBody.innerHTML = "";

    if (biodataList.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center;">Belum ada data tersimpan.</td></tr>`;
      return;
    }

    biodataList.forEach((item, index) => {
      const row = document.createElement('tr');
      const photoSrc = item.foto ? item.foto : 'https://via.placeholder.com/50x65?text=No+Img';

      row.innerHTML = `
        <td><img src="${photoSrc}" class="table-photo" alt="Foto"></td>
        <td><strong>${item.nama}</strong></td>
        <td>${item.nik}</td>
        <td>${item.tmpLahir}, ${item.tglLahir}</td>
        <td>${item.gender}</td>
        <td>${item.telepon}<br><small>${item.email}</small></td>
        <td>
          <div class="action-btns">
            <button type="button" class="btn-edit" onclick="editData(${index})">Edit</button>
            <button type="button" class="btn-delete" onclick="deleteData(${index})">Hapus</button>
          </div>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Fungsi Edit Data
  function editData(index) {
    const item = biodataList[index];

    document.getElementById('nama').value = item.nama;
    document.getElementById('nik').value = item.nik;
    document.getElementById('tmpLahir').value = item.tmpLahir;
    document.getElementById('tglLahir').value = item.tglLahir;
    document.getElementById('gender').value = item.gender;
    document.getElementById('agama').value = item.agama;
    document.getElementById('email').value = item.email;
    document.getElementById('telepon').value = item.telepon;
    document.getElementById('alamat').value = item.alamat;
    
    currentBase64Image = item.foto;
    if (item.foto) {
      photoPreview.innerHTML = `<img src="${item.foto}" alt="Foto">`;
    } else {
      photoPreview.innerHTML = `<span style="font-size: 0.75rem; color: #888;">Preview</span>`;
    }

    editIndexInput.value = index;
    btnSave.innerText = "Perbarui Data";
    btnCancel.style.display = "block";
    document.getElementById('form-title').innerText = "Edit Biodata Diri";

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Fungsi Hapus Data
  function deleteData(index) {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      biodataList.splice(index, 1);
      resetForm();
      renderTable();
    }
  }

  // Reset Form ke Keadaan Semula
  function resetForm() {
    form.reset();
    editIndexInput.value = "-1";
    currentBase64Image = "";
    photoPreview.innerHTML = `<span style="font-size: 0.75rem; color: #888;">Preview</span>`;
    btnSave.innerText = "Simpan Data";
    btnCancel.style.display = "none";
    document.getElementById('form-title').innerText = "Formulir Biodata Diri";
  }

  // Inisialisasi Tabel Pertama Kali
  renderTable();