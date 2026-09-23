// =====================================================
// SCRIPT.JS
// UNDANGAN PERNIKAHAN ANDI & SITI
// =====================================================


// =====================================================
// 1. KONFIGURASI
// =====================================================

// URL WEB APP GOOGLE APPS SCRIPT
// HARUS menggunakan /exec
const RSVP_URL =
    "https://script.google.com/macros/s/AKfycbymG-vxJCukXMD86nG4TSiBkmJryeojVEadrzV1eDqbT4E65fUQ6kyjM2oAMgptvzL6/exec";


// Tanggal dan waktu pernikahan
// 10 Oktober 2026 pukul 09.00 WIB
const TANGGAL_PERNIKAHAN =
    new Date("2026-10-10T09:00:00+07:00").getTime();


// =====================================================
// 2. FUNGSI BUKA UNDANGAN
// =====================================================

function bukaUndangan() {

    const cover =
        document.getElementById("cover");

    const isiUndangan =
        document.getElementById("isiUndangan");

    if (!cover || !isiUndangan) {
        return;
    }

    // Sembunyikan cover
    cover.style.display = "none";

    // Tampilkan isi undangan
    isiUndangan.style.display = "block";

    // Kembali ke bagian paling atas
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    // Coba memainkan musik
    const musik =
        document.getElementById("musikUndangan");

    const tombolMusik =
        document.getElementById("tombolMusik");


    if (!musik) {
        return;
    }


    musik.play()
        .then(function () {

            if (tombolMusik) {
                tombolMusik.textContent =
                    "♫ Matikan Musik";
            }

        })
        .catch(function () {

            if (tombolMusik) {
                tombolMusik.textContent =
                    "♫ Putar Musik";
            }

        });

}


// =====================================================
// 3. GOOGLE MAPS
// =====================================================

function bukaMaps() {

    window.open(
        "https://maps.google.com",
        "_blank",
        "noopener,noreferrer"
    );

}


// =====================================================
// 4. MUSIK
// =====================================================

function putarMusik() {

    const musik =
        document.getElementById("musikUndangan");

    const tombol =
        document.getElementById("tombolMusik");


    if (!musik) {

        alert(
            "File musik tidak ditemukan."
        );

        return;
    }


    // Jika musik sedang berhenti
    if (musik.paused) {

        musik.play()
            .then(function () {

                if (tombol) {

                    tombol.textContent =
                        "♫ Matikan Musik";

                }

            })
            .catch(function () {

                alert(
                    "Musik tidak dapat diputar. " +
                    "Pastikan file music/musik.mp3 tersedia."
                );

            });

    }

    // Jika musik sedang bermain
    else {

        musik.pause();

        if (tombol) {

            tombol.textContent =
                "♫ Putar Musik";

        }

    }

}


// =====================================================
// 5. COUNTDOWN
// =====================================================

let intervalCountdown = null;


function updateCountdown() {

    const hari =
        document.getElementById("hari");

    const jam =
        document.getElementById("jam");

    const menit =
        document.getElementById("menit");

    const detik =
        document.getElementById("detik");

    const pesan =
        document.getElementById("pesanCountdown");


    // Jika elemen belum tersedia
    if (
        !hari ||
        !jam ||
        !menit ||
        !detik
    ) {

        return;

    }


    const sekarang =
        Date.now();

    const selisih =
        TANGGAL_PERNIKAHAN -
        sekarang;


    // =================================================
    // ACARA SUDAH DIMULAI
    // =================================================

    if (selisih <= 0) {

        hari.textContent = "00";
        jam.textContent = "00";
        menit.textContent = "00";
        detik.textContent = "00";


        if (pesan) {

            pesan.textContent =
                "Hari bahagia telah tiba!";

        }


        if (intervalCountdown) {

            clearInterval(
                intervalCountdown
            );

            intervalCountdown = null;

        }


        return;

    }


    // =================================================
    // HITUNG WAKTU
    // =================================================

    const jumlahHari =
        Math.floor(
            selisih /
            (1000 * 60 * 60 * 24)
        );


    const jumlahJam =
        Math.floor(
            (selisih /
                (1000 * 60 * 60)) % 24
        );


    const jumlahMenit =
        Math.floor(
            (selisih /
                (1000 * 60)) % 60
        );


    const jumlahDetik =
        Math.floor(
            (selisih / 1000) % 60
        );


    // =================================================
    // TAMPILKAN
    // =================================================

    hari.textContent =
        String(jumlahHari);

    jam.textContent =
        String(jumlahJam)
            .padStart(2, "0");

    menit.textContent =
        String(jumlahMenit)
            .padStart(2, "0");

    detik.textContent =
        String(jumlahDetik)
            .padStart(2, "0");


    if (pesan) {

        pesan.textContent =
            "Kami menantikan kehadiran Anda.";

    }

}


// =====================================================
// 6. LIGHTBOX GALERI
// =====================================================

function bukaFoto(foto) {

    const lightbox =
        document.getElementById("lightbox");

    const fotoBesar =
        document.getElementById("fotoBesar");


    if (
        !lightbox ||
        !fotoBesar ||
        !foto
    ) {

        return;

    }


    fotoBesar.src =
        foto.src;


    fotoBesar.alt =
        foto.alt || "Foto";


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


    const fotoBesar =
        document.getElementById("fotoBesar");


    if (fotoBesar) {

        fotoBesar.src = "";

    }

}


// =====================================================
// 7. CALLBACK UCAPAN
// =====================================================
//
// Google Apps Script akan mengirim:
//
// rsvpCallback_xxxxx({...});
//
// =====================================================

function tampilkanUcapan(response) {

    const daftarUcapan =
        document.getElementById(
            "daftarUcapan"
        );


    if (!daftarUcapan) {

        console.error(
            "Elemen #daftarUcapan tidak ditemukan."
        );

        return;

    }


    console.log(
        "Data ucapan:",
        response
    );


    // =================================================
    // RESPONSE ERROR
    // =================================================

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


    // =================================================
    // TIDAK ADA DATA
    // =================================================

    if (
        !Array.isArray(response.data) ||
        response.data.length === 0
    ) {

        daftarUcapan.innerHTML = `
            <p class="memuat-ucapan">
                Belum ada ucapan.
            </p>
        `;

        return;

    }


    // =================================================
    // HAPUS DATA LAMA
    // =================================================

    daftarUcapan.innerHTML =
        "";


    // =================================================
    // TAMPILKAN SETIAP UCAPAN
    // =================================================

    response.data.forEach(
        function (item) {


            // -----------------------------------------
            // BOX UCAPAN
            // -----------------------------------------

            const box =
                document.createElement(
                    "div"
                );

            box.className =
                "ucapan-item";


            // -----------------------------------------
            // NAMA
            // -----------------------------------------

            const nama =
                document.createElement(
                    "strong"
                );

            nama.textContent =
                item.nama ||
                "Tamu";


            // -----------------------------------------
            // STATUS KEHADIRAN
            // -----------------------------------------

            const status =
                document.createElement(
                    "span"
                );


            const statusText =
                String(
                    item.kehadiran || ""
                )
                .trim()
                .toLowerCase();


            if (
                statusText === "hadir"
            ) {

                status.className =
                    "status-hadir";

                status.textContent =
                    "✓ Hadir";

            }

            else {

                status.className =
                    "status-tidak-hadir";

                status.textContent =
                    "Tidak Hadir";

            }


            // -----------------------------------------
            // UCAPAN
            // -----------------------------------------

            const ucapan =
                document.createElement(
                    "p"
                );

            ucapan.textContent =
                item.ucapan ||
                "";


            // -----------------------------------------
            // GABUNGKAN
            // -----------------------------------------

            box.appendChild(
                nama
            );

            box.appendChild(
                status
            );

            box.appendChild(
                ucapan
            );


            // -----------------------------------------
            // MASUKKAN KE HALAMAN
            // -----------------------------------------

            daftarUcapan.appendChild(
                box
            );

        }
    );

}


// =====================================================
// 8. MEMUAT UCAPAN DARI GOOGLE SHEETS
// =====================================================

function muatUcapan() {

    const daftarUcapan =
        document.getElementById(
            "daftarUcapan"
        );


    if (!daftarUcapan) {

        console.warn(
            "Elemen #daftarUcapan tidak ditemukan."
        );

        return;

    }


    // Tampilkan loading
    daftarUcapan.innerHTML = `
        <p class="memuat-ucapan">
            Memuat ucapan...
        </p>
    `;


    // =================================================
    // BUAT NAMA CALLBACK UNIK
    // =================================================

    const namaCallback =
        "rsvpCallback_" +
        Date.now();


    // =================================================
    // DAFTARKAN CALLBACK KE WINDOW
    // =================================================

    window[namaCallback] =
        function (response) {

            tampilkanUcapan(
                response
            );


            // Hapus callback setelah dipakai
            try {

                delete window[
                    namaCallback
                ];

            }

            catch (error) {

                window[
                    namaCallback
                ] = null;

            }

        };


    // =================================================
    // BUAT ELEMENT SCRIPT
    // =================================================

    const script =
        document.createElement(
            "script"
        );


    script.src =
        RSVP_URL +
        "?action=getUcapan" +
        "&prefix=" +
        encodeURIComponent(
            namaCallback
        ) +
        "&t=" +
        Date.now();


    // =================================================
    // JIKA GAGAL
    // =================================================

    script.onerror =
        function () {

            console.error(
                "Tidak dapat mengambil data ucapan."
            );


            daftarUcapan.innerHTML = `
                <p class="memuat-ucapan">
                    Ucapan belum dapat dimuat.
                </p>
            `;


            try {

                delete window[
                    namaCallback
                ];

            }

            catch (error) {

                window[
                    namaCallback
                ] = null;

            }

        };


    // =================================================
    // MASUKKAN KE HALAMAN
    // =================================================

    document.body.appendChild(
        script
    );


    // =================================================
    // HAPUS ELEMENT SCRIPT
    // SETELAH SELESAI
    // =================================================

    script.onload =
        function () {

            setTimeout(
                function () {

                    if (
                        script.parentNode
                    ) {

                        script.parentNode.removeChild(
                            script
                        );

                    }

                },
                100
            );

        };

}


// =====================================================
// 9. KIRIM RSVP
// =====================================================

function pasangFormRSVP() {

    const form =
        document.getElementById(
            "rsvpForm"
        );


    if (!form) {

        console.warn(
            "Form RSVP tidak ditemukan."
        );

        return;

    }


    // Jangan pasang listener dua kali
    if (
        form.dataset.rsvpAktif ===
        "true"
    ) {

        return;

    }


    form.dataset.rsvpAktif =
        "true";


    // =================================================
    // EVENT SUBMIT
    // =================================================

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // -----------------------------------------
            // AMBIL DATA
            // -----------------------------------------

            const inputNama =
                document.getElementById(
                    "nama"
                );

            const inputKehadiran =
                document.getElementById(
                    "kehadiran"
                );

            const inputJumlah =
                document.getElementById(
                    "jumlah"
                );

            const inputUcapan =
                document.getElementById(
                    "ucapan"
                );


            if (
                !inputNama ||
                !inputKehadiran ||
                !inputJumlah ||
                !inputUcapan
            ) {

                alert(
                    "Form RSVP tidak lengkap."
                );

                return;

            }


            const nama =
                inputNama.value.trim();


            const kehadiran =
                inputKehadiran.value.trim();


            const jumlah =
                inputJumlah.value.trim();


            const ucapan =
                inputUcapan.value.trim();


            // -----------------------------------------
            // VALIDASI
            // -----------------------------------------

            if (!nama) {

                alert(
                    "Silakan masukkan nama."
                );

                inputNama.focus();

                return;

            }


            if (!kehadiran) {

                alert(
                    "Silakan pilih konfirmasi kehadiran."
                );

                inputKehadiran.focus();

                return;

            }


            if (!ucapan) {

                alert(
                    "Silakan tuliskan ucapan dan doa."
                );

                inputUcapan.focus();

                return;

            }


            // -----------------------------------------
            // TOMBOL
            // -----------------------------------------

            const tombol =
                form.querySelector(
                    ".btn-rsvp"
                );


            if (tombol) {

                tombol.disabled =
                    true;

                tombol.textContent =
                    "Mengirim...";

            }


            // -----------------------------------------
            // DATA FORM
            // -----------------------------------------

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


            // -----------------------------------------
            // KIRIM KE APPS SCRIPT
            // -----------------------------------------

            try {

                await fetch(
                    RSVP_URL,
                    {

                        method: "POST",

                        mode: "no-cors",

                        body: data

                    }
                );


                /*
                 * mode no-cors membuat browser
                 * tidak bisa membaca response server.
                 *
                 * Namun request tetap dikirim.
                 */


                alert(
                    "Terima kasih " +
                    nama +
                    ". RSVP Anda berhasil dikirim."
                );


                // Reset form
                form.reset();


                /*
                 * Tunggu sebentar agar data Apps Script
                 * selesai ditulis ke spreadsheet.
                 * Kemudian ambil ucapan terbaru.
                 */

                setTimeout(
                    function () {

                        muatUcapan();

                    },
                    1500
                );


            }

            catch (error) {

                console.error(
                    "Gagal mengirim RSVP:",
                    error
                );


                alert(
                    "RSVP gagal dikirim. " +
                    "Silakan coba lagi."
                );

            }


            // -----------------------------------------
            // AKTIFKAN KEMBALI TOMBOL
            // -----------------------------------------

            finally {

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


// =====================================================
// 10. INISIALISASI WEBSITE
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // ---------------------------------------------
        // Countdown
        // ---------------------------------------------

        updateCountdown();


        intervalCountdown =
            setInterval(
                updateCountdown,
                1000
            );


        // ---------------------------------------------
        // Form RSVP
        // ---------------------------------------------

        pasangFormRSVP();


        // ---------------------------------------------
        // Ucapan Google Sheets
        // ---------------------------------------------

        muatUcapan();

    }
);
