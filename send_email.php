<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ambil data dari formulir
    $name = $_POST['name'];
    $email = $_POST['email'];
    $comment = $_POST['comment'];

    // Alamat email tujuan
    $to = "anjasaprilianto848@gmail.com"; // Ganti dengan email Gmail Anda

    // Subjek email
    $subject = "Pesan Baru dari Formulir Kontak";

    // Isi email
    $body = "Nama: $name\nEmail: $email\nKomentar:\n$comment";

    // Header email
    $headers = "From:anjasaprilianto848@gmail.com";

    // Kirim email
    if (mail($to, $subject, $body, $headers)) {
        echo "
            <div id='popup' style='position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background-color: #f9f9f9; border: 1px solid #ccc; text-align: center;'>
                <p>Pesan berhasil dikirim.</p>
            </div>
            <script>
                setTimeout(function() {
                    window.location.href = 'index.html'; // Ganti dengan URL halaman utama website Anda
                }, 2000);
            </script>
        ";
    } else {
        echo "
            <div id='popup' style='position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background-color: #f9f9f9; border: 1px solid #ccc; text-align: center;'>
                <p>Pesan gagal dikirim. Silakan coba lagi.</p>
                <button onclick='closePopup()'>Tutup</button>
            </div>
            <script>
                function closePopup() {
                    document.getElementById('popup').style.display = 'none';
                    window.location.href = 'index.html'; // Ganti dengan URL halaman website Anda
                }
            </script>
        ";
    }
}
?>
