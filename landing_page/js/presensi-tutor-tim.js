const scriptURL = "https://script.google.com/macros/s/AKfycby8f_hE1Bt3cYIp-8QbmHWiTWp5bAp3QPerZjZUsnt8eDAMqYenaHpwSGkR8t4rn7DT2g/exec";

// Ambil form berdasarkan ID
const form = document.getElementById("presensiForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Ambil nilai input dari form
    const nama = document.getElementById("nama").value.trim();
    const kelas = document.getElementById("kelas").value.trim();
    const kehadiran = document.querySelector('input[name="kehadiran"]:checked')?.value;

    if (!nama || !kelas || !kehadiran) {
        alert("Harap isi semua field sebelum submit!");
        return;
    }

    // Siapkan data dalam bentuk FormData
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("kelas", kelas);
    formData.append("kehadiran", kehadiran);

    // Kirim data ke Google Spreadsheet
    fetch(scriptURL, { method: "POST", body: formData })
        .then((response) => {
            if (response.ok) {
                // Tampilkan modal sukses
                document.getElementById("successModal").classList.remove("hidden");

                // Reset form setelah submit
                form.reset();
            } else {
                alert("Gagal mengirim data. Coba lagi nanti.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Terjadi kesalahan. Periksa koneksi internet atau URL Google Script.");
        });
});

// Tutup modal sukses
document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("successModal").classList.add("hidden");
});
