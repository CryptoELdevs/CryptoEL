<?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = trim(filter_input(INPUT_POST, 'input', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
        echo !empty($input) ? $input : "Invalid input";
    }
?>