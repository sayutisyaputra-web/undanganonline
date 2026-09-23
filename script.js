// =====================================
// 1. FUNGSI BUKA UNDANGAN
// =====================================

function bukaUndangan() {

    const cover = document.getElementById("cover");
    const isiUndangan = document.getElementById("isiUndangan");

    if (cover && isiUndangan) {

        cover.style.display = "none";
        isiUndangan.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Coba putar musik
    const musik = document.getElementById("musikUndangan");
    const tombolMusik = document.getElementById("tombolMusik");

    if (musik) {

        musik.play()
            .then(() => {

                if (tombolMusik) {
                    tombolMusik.innerHTML = "♫ Matikan Musik";
                }

            })
            .catch(() => {

                if (tombolMusik) {
                    tombolMusik.innerHTML = "♫ Putar Musik";
                }

            });
    }
}


// =====================================
// 2. FUNGSI GOOGLE MAPS
// =====================================

function bukaMaps() {

    window.open(
        "https://maps.google.com",
        "_blank"
    );

}


// =====================================
// 3. FUNGSI MUSIK
// =====================================

function putarMusik() {

    const musik =
        document.getElementById("musikUndangan");

    const tombol =
        document.getElementById("tombolMusik");

    if (!musik) {

        alert("Elemen musik tidak ditemukan.");

        return;
    }


    if (musik.paused) {

        musik.play()
            .then(() => {

                if (tombol) {
                    tombol.innerHTML =
                        "♫ Matikan Musik";
                }

            })
            .catch(() => {

                alert(
                    "Musik tidak dapat diputar. " +
                    "Periksa file musik Anda."
                );

            });

    } else {

        musik.pause();

        if (tombol) {
            tombol.innerHTML =
                "♫ Putar Musik";
        }

    }
}


// =====================================
// 4. COUNTDOWN PERNIKAHAN
// =====================================

const tanggalPernikahan =
    new Date(
        "2026-10-10T09:00:00+07:00"
    ).getTime();

let intervalCountdown;


function updateCountdown() {

    const elemenHari =
        document.getElementById("hari");

    const elemenJam =
        document.getElementById("jam");

    const elemenMenit =
        document.getElementById("menit");

    const elemenDetik =
        document.getElementById("detik");

    const pesan =
        document.getElementById("pesanCountdown");


    if (
        !elemenHari ||
        !elemenJam ||
        !elemenMenit ||
        !elemenDetik
    ) {

        return;
    }


    const sekarang = Date.now();

    const selisih =
        tanggalPernikahan - sekarang;


    if (selisih <= 0) {

        elemenHari.textContent = "00";
        elemenJam.textContent = "00";
        elemenMenit.textContent = "00";
        elemenDetik.textContent = "00";

        if (pesan) {
            pesan.textContent =
                "Hari bahagia telah tiba!";
        }

        clearInterval(
            intervalCountdown
        );

        return;
    }


    const hari =
        Math.floor(
            selisih /
            (1000 * 60 * 60 * 24)
        );


    const jam =
        Math.floor(
            (selisih /
                (1000 * 60 * 60)) % 24
        );


    const menit =
        Math.floor(
            (selisih /
                (1000 * 60)) % 60
        );


    const detik =
        Math.floor(
            (selisih / 1000) % 60
        );


    elemenHari.textContent =
        String(hari);

    elemenJam.textContent =
        String(jam).padStart(2, "0");

    elemenMenit.textContent =
        String(menit).padStart(2, "0");

    elemenDetik.textContent =
        String(detik).padStart(2, "0");


    if (pesan) {

        pesan.textContent =
            "Kami menantikan kehadiran Anda.";

    }
}


// =====================================
// 5. JALANKAN COUNTDOWN
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCountdown();

        intervalCountdown =
            setInterval(
                updateCountdown,
                1000
            );

    }
);


// =====================================
// 6. LIGHTBOX FOTO
// =====================================

function bukaFoto(foto) {

    const lightbox =
        document.getElementById("lightbox");

    const fotoBesar =
        document.getElementById("fotoBesar");


    if (!lightbox || !fotoBesar) {
        return;
    }


    fotoBesar.src =
        foto.src;

    lightbox.style.display =
        "flex";
}


function tutupFoto() {

    const lightbox =
        document.getElementById("lightbox");

    if (!lightbox) {
        return;
    }

    lightbox.style.display =
        "none";
}


// =====================================
// 7. URL GOOGLE APPS SCRIPT
// =====================================
//
// PENTING:
// Gunakan /exec
// BUKAN /dev
//

const RSVP_URL =
    "https://script.google.com/macros/s/AKfycbyFxecJVvxeaT_uTG1nIJaIZTwuEdEsbdG9FtY9pNU/exec";


// =====================================
// 8. KIRIM RSVP
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const form =
            document.getElementById("rsvpForm");

        if (!form) {
            return;
        }


        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const nama =
                    document
                        .getElementById("nama")
                        .value
                        .trim();


                const kehadiran =
                    document
                        .getElementById("kehadiran")
                        .value;


                const jumlah =
                    document
                        .getElementById("jumlah")
                        .value;


                const ucapan =
                    document
                        .getElementById("ucapan")
                        .value
                        .trim();


                if (
                    !nama ||
                    !kehadiran ||
                    !ucapan
                ) {

                    alert(
                        "Mohon lengkapi data RSVP terlebih dahulu."
                    );

                    return;
                }


                const tombol =
                    document.querySelector(
                        ".btn-rsvp"
                    );


                if (tombol) {

                    tombol.disabled =
                        true;

                    tombol.textContent =
                        "Mengirim...";

                }


                try {

                    /*
                     * Gunakan URLSearchParams
                     * agar masuk ke e.parameter
                     * Apps Script.
                     */

                    const data =
                        new URLSearchParams();

                    data.append(
                        "nama",
                        nama
                    );

                    data.append(
                        "kehadiran",
                        kehadiran
                    );

                    data.append(
                        "jumlah",
                        jumlah
                    );

                    data.append(
                        "ucapan",
                        ucapan
                    );


                    await fetch(
                        RSVP_URL,
                        {
                            method: "POST",
                            mode: "no-cors",
                            body: data
                        }
                    );


                    alert(
                        "Terima kasih " +
                        nama +
                        ". RSVP Anda berhasil dikirim."
                    );


                    form.reset();


                    // Muat ulang ucapan
                    muatUcapan();


                } catch (error) {

                    console.error(
                        "Gagal mengirim RSVP:",
                        error
                    );


                    alert(
                        "Maaf, RSVP belum berhasil dikirim. " +
                        "Silakan coba lagi."
                    );

                } finally {

                    if (tombol) {

                        tombol.disabled =
                            false;

                        tombol.textContent =
                            "💌 Kirim RSVP";

                    }

                }

            }
        );

    }
);


// =====================================
// 9. CALLBACK DATA UCAPAN
// =====================================

window.rsvpCallback =
    function (response) {

        const daftarUcapan =
            document.getElementById(
                "daftarUcapan"
            );


        if (!daftarUcapan) {
            return;
        }


        if (
            !response ||
            response.status !== "success"
        ) {

            daftarUcapan.innerHTML = `
                <p class="memuat-ucapan">
                    Ucapan belum dapat dimuat.
                </p>
            `;

            return;
        }


        if (
            !response.data ||
            response.data.length === 0
        ) {

            daftarUcapan.innerHTML = `
                <p class="memuat-ucapan">
                    Belum ada ucapan.
                </p>
            `;

            return;
        }


        daftarUcapan.innerHTML = "";


        response.data.forEach(
            function (item) {

                const box =
                    document.createElement(
                        "div"
                    );

                box.className =
                    "ucapan-item";


                const nama =
                    document.createElement(
                        "strong"
                    );

                nama.textContent =
                    item.nama;


                const status =
                    document.createElement(
                        "span"
                    );


                if (
                    String(
                        item.kehadiran
                    ).toLowerCase()
                    === "hadir"
                ) {

                    status.className =
                        "status-hadir";

                    status.textContent =
                        "✓ Hadir";

                } else {

                    status.className =
                        "status-tidak-hadir";

                    status.textContent =
                        "Tidak Hadir";

                }


                const ucapan =
                    document.createElement(
                        "p"
                    );

                ucapan.textContent =
                    item.ucapan;


                box.appendChild(
                    nama
                );

                box.appendChild(
                    status
                );

                box.appendChild(
                    ucapan
                );


                daftarUcapan.appendChild(
                    box
                );

            }
        );

    };


// =====================================
// 10. MEMUAT UCAPAN DARI GOOGLE SHEETS
// =====================================

function muatUcapan() {

    const script =
        document.createElement(
            "script"
        );


    script.src =
        RSVP_URL +
        "?action=getUcapan" +
        "&prefix=rsvpCallback" +
        "&t=" +
        Date.now();


    script.onerror =
        function () {

            const daftarUcapan =
                document.getElementById(
                    "daftarUcapan"
                );


            if (daftarUcapan) {

                daftarUcapan.innerHTML = `
                    <p class="memuat-ucapan">
                        Ucapan belum dapat dimuat.
                    </p>
                `;

            }

        };


    document.body.appendChild(
        script
    );

}


// =====================================
// 11. MUAT UCAPAN SAAT HALAMAN DIBUKA
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        muatUcapan();

    }
);