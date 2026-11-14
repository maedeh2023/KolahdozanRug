<?php
/**
 * Kolahdoozan Persian Rug Atelier — Isfahan
 * Standalone PHP Entrypoint
 */

declare(strict_types=1);

header('Content-Type: text/html; charset=utf-8');
header('X-Frame-Options: SAMEORIGIN');
header('X-Content-Type-Options: nosniff');

$htmlPath = __DIR__ . '/index.html';
if (file_exists($htmlPath)) {
    readfile($htmlPath);
    exit;
}

echo '<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><title>گالری فرش کلاهدوزان</title></head><body><h1>گالری فرش کلاهدوزان</h1><p>فایل index.html یافت نشد.</p></body></html>';