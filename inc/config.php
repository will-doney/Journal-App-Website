<?php
function url($path = '') {
    $subdirectory = 'journal-app-website';
    $path = ltrim($path, '/');
    return "/$subdirectory/$path";
}