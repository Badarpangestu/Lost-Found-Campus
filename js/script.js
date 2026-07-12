// ======================================
// LOST & FOUND CAMPUS
// ======================================

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwR7mEBO5sSIcYrom2SmD0uWUtdU6hYGuslTeXx9CgbCrnZxCJXS6GOe568PBJP0cpDXQ/exec";

let dataBarang = [];
let editId = "";

// =============================
// LOAD DATA
// =============================

window.onload = function () {
    loadData();
};

// =============================
// AMBIL DATA
// =============================

async function loadData() {

    try {

        const response = await fetch(WEB_APP_URL);
        dataBarang = await response.json();

        tampilData(dataBarang);

    } catch (err) {

        console.log(err);
        alert("Gagal mengambil data.");

    }

}

// =============================
// TAMPILKAN DATA
// =============================

function tampilData(data) {

    const tbody = document.getElementById("dataBarang");

    tbody.innerHTML = "";

    data.forEach(item => {

        tbody.innerHTML += `
        <tr>
            <td>${item.nama}</td>
            <td>${item.kategori}</td>
            <td>${item.status}</td>
            <td>${item.lokasi}</td>
            <td>${item.tanggal}</td>

            <td>

                <button class="edit-btn"
                onclick="editBarang('${item.id}')">

                    Edit

                </button>

                <button class="delete-btn"
                onclick="hapusBarang('${item.id}')">

                    Hapus

                </button>

            </td>

        </tr>
        `;

    });

}

// =============================
// SIMPAN / UPDATE DATA
// =============================

document.getElementById("formBarang").addEventListener("submit", async function(e){

    e.preventDefault();

    const data = {

        action: editId == "" ? "tambah" : "edit",

        id: editId,

        nama: document.getElementById("nama").value,

        kategori: document.getElementById("kategori").value,

        status: document.getElementById("status").value,

        lokasi: document.getElementById("lokasi").value,

        deskripsi: document.getElementById("deskripsi").value,

        tanggal: document.getElementById("tanggal").value

    };

    try{

        await fetch(WEB_APP_URL,{

            method:"POST",

            body:JSON.stringify(data)

        });

        alert(editId=="" ? "Data berhasil ditambahkan" : "Data berhasil diupdate");

        editId="";

        document.getElementById("formBarang").reset();

        loadData();

    }catch(err){

        console.log(err);

        alert("Gagal menyimpan data.");

    }

});
// =============================
// EDIT DATA
// =============================

function editBarang(id){

    const barang = dataBarang.find(item => String(item.id) === String(id));

    if(!barang){
        alert("Data tidak ditemukan.");
        return;
    }

    editId = id;

    document.getElementById("nama").value = barang.nama;
    document.getElementById("kategori").value = barang.kategori;
    document.getElementById("status").value = barang.status;
    document.getElementById("lokasi").value = barang.lokasi;
    document.getElementById("deskripsi").value = barang.deskripsi;
    document.getElementById("tanggal").value = barang.tanggal;

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

// =============================
// HAPUS DATA
// =============================

async function hapusBarang(id){

    if(!confirm("Yakin ingin menghapus data ini?")){
        return;
    }

    try{

        await fetch(WEB_APP_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"hapus",

                id:id

            })

        });

        alert("Data berhasil dihapus");

        loadData();

    }catch(err){

        console.log(err);

        alert("Gagal menghapus data.");

    }

}

// =============================
// PENCARIAN
// =============================

document.getElementById("search").addEventListener("keyup",function(){

    const keyword = this.value.toLowerCase();

    const hasil = dataBarang.filter(item =>

        item.nama.toLowerCase().includes(keyword)

    );

    tampilData(hasil);

});