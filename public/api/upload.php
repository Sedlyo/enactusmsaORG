<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$uploadsDir = __DIR__ . '/../assets/uploads';
if (!is_dir($uploadsDir)) {
    mkdir($uploadsDir, 0755, true);
}

$allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
$maxSize = 5 * 1024 * 1024; // 5MB

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['error' => 'No valid image file provided.']);
        exit;
    }

    $file = $_FILES['image'];

    if (!in_array($file['type'], $allowedTypes, true)) {
        http_response_code(400);
        echo json_encode(['error' => 'File type not allowed.']);
        exit;
    }

    if ($file['size'] > $maxSize) {
        http_response_code(400);
        echo json_encode(['error' => 'File too large. Max 5MB.']);
        exit;
    }

    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $name = preg_replace('/[^a-zA-Z0-9\-_]/', '-', pathinfo($file['name'], PATHINFO_FILENAME));
    $name = strtolower($name);
    $filename = $name . '-' . time() . '.' . $ext;
    $dest = $uploadsDir . '/' . $filename;

    if (!move_uploaded_file($file['tmp_name'], $dest)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save file.']);
        exit;
    }

    echo json_encode(['path' => '/assets/uploads/' . $filename]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $input = json_decode(file_get_contents('php://input'), true);
    $filePath = $input['path'] ?? '';

    if (empty($filePath) || strpos($filePath, '/assets/uploads/') !== 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid path.']);
        exit;
    }

    // Prevent directory traversal
    $realUploads = realpath($uploadsDir);
    $fullPath = realpath(__DIR__ . '/..' . $filePath);

    if ($fullPath === false || strpos($fullPath, $realUploads) !== 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid path.']);
        exit;
    }

    if (file_exists($fullPath)) {
        unlink($fullPath);
    }

    echo json_encode(['ok' => true]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed.']);
