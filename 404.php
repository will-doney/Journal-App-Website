<?php
header("HTTP/1.1 404 Not Found");

$pageTitle = "Page Not Found";

$root = $_SERVER['DOCUMENT_ROOT'].'/journal-app-website';
include $root.'/inc/header.php';
include $root.'/inc/nav.php';
?>

<main>
    <section class="not-found" style="padding: 2rem; text-align: center;">
        <h2 style="color: #d9534f;">404 - Page Not Found</h2>
        <p style="font-size: 1.2rem;">The page you're looking for doesn't exist.</p>
        <a href="/journal-app-website/" 
           style="display: inline-block; margin-top: 1rem; padding: 0.5rem 1rem; background: #337ab7; color: white; text-decoration: none;">
           Return to Home Page
        </a>
    </section>
</main>

<?php include $root.'/inc/footer.php'; ?>