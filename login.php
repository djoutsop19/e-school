<?php
header("Access-Control-Allow-Origin: *"); // Permettre les requêtes depuis React
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $pdo = new PDO("mysql:host=localhost;dbname=school", "root", "", [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Erreur de connexion à la base de données"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    $email = $data->email;
    $password = $data->password;

    $stmt = $pdo->prepare("SELECT * FROM students WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        echo json_encode(["success" => true, "message" => "Connexion réussie"]);
    } else {
        echo json_encode(["success" => false, "message" => "Email ou mot de passe incorrect"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Veuillez remplir tous les champs"]);
}
?>
