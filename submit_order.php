<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data === null) {
        echo json_encode(['status' => 'error', 'message' => 'Невозможно разобрать JSON.']);
        exit;
    }

    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $note = htmlspecialchars($data['note']);
    $items = $data['items'];

    if (empty($items)) {
        echo json_encode(['status' => 'error', 'message' => 'Нет товаров в заказе.']);
        exit;
    }

    $subject = "Новый заказ с сайта Цветочное искушение";
    $message = "Заказ от: $email\n\nПримечание:\n$note\n\nТовары в заказе:\n";

    foreach ($items as $item) {
        $message .= "\n- {$item['name']}, Цена: {$item['price']} KZT\n";
    }

    $headers = "From: no-reply@flowertemptation.kz\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail('dimen2020.20@gmail.com', $subject, $message, $headers)) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Не удалось отправить письмо.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Неверный запрос.']);
}
?>
