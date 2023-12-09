// Fungsi untuk menyimpan data ke local storage
function saveToLocalStorage() {
    localStorage.setItem('data', JSON.stringify(data));
  }
  
  // Fungsi untuk mendapatkan data dari local storage
  function loadFromLocalStorage() {
    const storedData = localStorage.getItem('data');
    return storedData ? JSON.parse(storedData) : [];
  }
  
  // Mengganti penggunaan data lokal dengan data dari local storage
  let data = loadFromLocalStorage();
  
  // Fungsi untuk menampilkan data
  function displayData() {
    const tableBody = document.getElementById('dataTable');
    // Menghapus semua baris
    tableBody.innerHTML = '';
  
    // Menampilkan data dalam tabel
    data.forEach((item) => {
      const row = tableBody.insertRow(-1);
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);
      const cell6 = row.insertCell(5);
  
      cell1.textContent = item.nama;
      cell2.textContent = item.email;
      cell3.textContent = item.alamat;
      cell4.textContent = item.HP;
      cell5.textContent = item.gender;
      cell6.innerHTML = `<button type="button" class="btn btn-warning" onclick="updateData(${item.id})">Update</button> 
                         <button type="button" class="btn btn-danger" onclick="deleteData(${item.id})">Delete</button>`;
    });
  }
  
  // Fungsi untuk menambahkan data baru
  function createData() {
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const alamat = document.getElementById('alamat').value;
    const HP = document.getElementById('HP').value;
  
    // Menentukan nilai gender berdasarkan checkbox yang terpilih
    const genderCheckboxes = document.getElementsByName('gender');
    const gender = Array.from(genderCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
  
    if (nama && email) {
      const newData = {
        id: data.length + 1,
        nama: nama,
        email: email,
        alamat: alamat,
        HP: HP,
        gender: gender.join(', ') // Menyimpan multiple values jika ada
      };
  
      data.push(newData);
      saveToLocalStorage(); // Menyimpan ke local storage
      displayData();
      // Bersihkan input setelah data ditambahkan
      document.getElementById('nama').value = '';
      document.getElementById('email').value = '';
      document.getElementById('alamat').value = '';
      document.getElementById('HP').value = '';
      genderCheckboxes.forEach(checkbox => checkbox.checked = false); // Reset checkbox
    } else {
      alert('Name and Email are required');
    }
  }
  
  // Fungsi untuk mengupdate data
  // Fungsi untuk mengupdate data
function updateData(id) {
  const index = data.findIndex(item => item.id === id);

  if (index !== -1) {
    const newNama = prompt('Enter Nama Baru:', data[index].nama);
    const newEmail = prompt('Enter Email Baru:', data[index].email);
    const newAlamat = prompt('Enter Alamat Baru:', data[index].alamat);
    const newHP = prompt('Enter Nomor HP baru:', data[index].HP);
    const newGender = prompt('Enter gender baru:', data[index].gender);

    if (newNama !== null && newEmail !== null) {
      data[index].nama = newNama;
      data[index].email = newEmail;
      data[index].alamat = newAlamat;
      data[index].HP = newHP;
      data[index].gender = newGender; // Update gender dengan nilai baru

      saveToLocalStorage(); // Menyimpan ke local storage
      displayData();
    }
  }
}
  
  // Fungsi untuk menghapus data
  function deleteData(id) {
    const confirmDelete = confirm('Kamu yakin ingin menghapus data ini?');
  
    if (confirmDelete) {
      data = data.filter(item => item.id !== id);
      saveToLocalStorage(); // Menyimpan ke local storage
      displayData();
    }
  }
  
  // Tampilkan data awal
  displayData();
  