<?php
/**
 * Kolahdoozan Atelier — Private Viewing Inquiry Handler
 * Handles private concierge viewing requests from the gallery catalog.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'ok' => false,
        'error' => 'Method Not Allowed'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Read raw JSON body
$rawInput = file_get_contents('php://input');
if (!$rawInput) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'error' => 'Empty request body'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$data = json_decode($rawInput, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'error' => 'Invalid JSON'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Sanitize fields
$name      = trim(htmlspecialchars($data['name'] ?? '', ENT_QUOTES, 'UTF-8'));
$contact   = trim(htmlspecialchars($data['contact'] ?? '', ENT_QUOTES, 'UTF-8'));
$note      = trim(htmlspecialchars($data['note'] ?? '', ENT_QUOTES, 'UTF-8'));
$pieceCode = trim(htmlspecialchars($data['pieceCode'] ?? 'GENERAL', ENT_QUOTES, 'UTF-8'));
$visitType = trim(htmlspecialchars($data['visitType'] ?? 'in-person', ENT_QUOTES, 'UTF-8'));
$lang      = trim(htmlspecialchars($data['lang'] ?? 'fa', ENT_QUOTES, 'UTF-8'));

if ($contact === '') {
    http_response_code(422);
    echo json_encode([
        'ok' => false,
        'error' => 'شماره تماس یا واتساپ الزامی است.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Record structure
$record = [
    'id'          => uniqid('kld_', true),
    'pieceCode'   => $pieceCode,
    'visitType'   => $visitType,
    'name'        => $name,
    'contact'     => $contact,
    'note'        => $note,
    'lang'        => $lang,
    'createdAt'   => date('c'),
    'clientIp'    => $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN'
];

// 1. Save to private data directory
$dataDir = __DIR__ . '/../data';
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}

$jsonFile = $dataDir . '/inquiries.json';
$existing = [];
if (file_exists($jsonFile)) {
    $content = @file_get_contents($jsonFile);
    if ($content) {
        $decoded = json_decode($content, true);
        if (is_array($decoded)) {
            $existing = $decoded;
        }
    }
}

$existing[] = $record;
@file_put_contents($jsonFile, json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// 2. Email notification (Optional, runs if configured)
$galleryEmail = 'info@kolahdoozancarpet.com'; // Adjust to gallery owner's email
$subject = "درخواست بازدید اختصاصی: {$pieceCode} — {$name}";
$message = "درخواست جدید برای بازدید فرش نفیس:\n\n"
         . "کد اثر: {$pieceCode}\n"
         . "نوع بازدید: " . ($visitType === 'in-person' ? 'حضوری در اصفهان' : 'تماس زنده / ویدیو') . "\n"
         . "نام مخاطب: {$name}\n"
         . "شماره تماس: {$contact}\n"
         . "یادداشت ویژه: {$note}\n"
         . "تاریخ: " . date('Y-m-d H:i:s') . "\n";

$headers = "From: atelier@kolahdoozancarpet.com\r\n"
         . "Reply-To: {$contact}\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n";

@mail($galleryEmail, '=?UTF-8?B?'.base64_encode($subject).'?=', $message, $headers);

// Success response
echo json_encode([
    'ok' => true,
    'message' => $lang === 'fa' 
        ? 'درخواست شما با موفقیت ثبت شد. کارشناس گالری جهت هماهنگی با شما تماس خواهد گرفت.'
        : 'Your viewing inquiry has been received. Our curator will contact you shortly.',
    'refId' => $record['id']
], JSON_UNESCAPED_UNICODE);
