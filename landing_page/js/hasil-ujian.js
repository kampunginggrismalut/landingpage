async function fetchHasilUjian() {
    const response = await fetch("landing_page/data/hasilUjian.json");
    return await response.json();
}

document.addEventListener("DOMContentLoaded", async () => {
    const btnCek = document.getElementById("cekHasilBtn");
    const kodeInput = document.getElementById("kodeKelas");
    const modal = document.getElementById("hasilModal");
    const closeBtn = document.getElementById("closeModalBtn");
    const hasilContent = document.getElementById("hasilContent");
    const modalTitle = document.getElementById("modalTitle");

    const data = await fetchHasilUjian();

    btnCek.addEventListener("click", () => {
        const kode = kodeInput.value.trim().toLowerCase();
        let found = false;

        // reset error message setiap kali klik cek
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.classList.add("hidden");
        errorMessage.textContent = "";

        for (const kelas of Object.keys(data)) {
            if (data[kelas].Kode.toLowerCase() === kode) {
                found = true;
                modalTitle.textContent = `Hasil Ujian - ${kelas}`;
                hasilContent.innerHTML = "";

                data[kelas].Hasil.forEach(siswa => {
                    hasilContent.innerHTML += `
          <tr>
            <td class="px-4 py-2 border text-left">${siswa.Nama}</td>
            <td class="px-4 py-2 border text-left">${siswa.Nilai}</td>
            <td class="px-4 py-2 border text-left">${siswa.Keterangan}</td>
          </tr>`;
                });

                modal.classList.remove("hidden");
                break; // stop loop kalau sudah ketemu
            }
        }

        if (!found) {
            errorMessage.textContent = "Kode kelas tidak ditemukan!";
            errorMessage.classList.remove("hidden");
        }
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
});
