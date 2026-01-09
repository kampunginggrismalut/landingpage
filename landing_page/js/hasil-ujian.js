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
    const tableWrapper = document.getElementById("hasilTableWrapper");

    const data = await fetchHasilUjian();

    const updateTableScroll = () => {
        if (!tableWrapper || !hasilContent) return;

        const rows = hasilContent.querySelectorAll("tr");
        if (rows.length <= 10) {
            tableWrapper.style.maxHeight = "";
            tableWrapper.scrollTop = 0;
            return;
        }

        const firstRow = rows[0];
        const rowHeight = firstRow.getBoundingClientRect().height;
        const table = tableWrapper.querySelector("table");
        const headerHeight = table?.tHead?.getBoundingClientRect().height ?? 0;

        if (rowHeight > 0) {
            tableWrapper.style.maxHeight = `${Math.ceil(headerHeight + rowHeight * 10)}px`;
        } else {
            tableWrapper.style.maxHeight = "60vh";
        }
        tableWrapper.scrollTop = 0;
    };

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

                const pgElement = document.getElementById("passingGrade");
                if (pgElement) {
                    pgElement.textContent = `Passing Grade : ${data[kelas].PassingGrade}`;
                }

                const hasilSorted = [...data[kelas].Hasil].sort((a, b) =>
                    String(a.Nama ?? "").localeCompare(String(b.Nama ?? ""), "id", { sensitivity: "base" })
                );

                hasilSorted.forEach(siswa => {
                    hasilContent.innerHTML += `
          <tr>
            <td class="px-4 py-2 border text-left">${siswa.Nama}</td>
            <td class="px-4 py-2 border text-left">${siswa.Nilai}</td>
            <td class="px-4 py-2 border text-left">${siswa.Kelas}</td>
            <td class="px-4 py-2 border text-left">${siswa.Keterangan}</td>
          </tr>`;
                });

                modal.classList.remove("hidden");
                updateTableScroll();
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
