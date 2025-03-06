<?php
$pdo = new PDO("mysql:host=localhost;dbname=school", "root", ""); 

$email = "student@gmail.com";
$password = "student123"; 
$hashedPassword = password_hash($password, PASSWORD_BCRYPT); 

$query = $pdo->prepare("INSERT INTO students (email, password) VALUES (?, ?)");
$query->execute([$email, $hashedPassword]);

echo "Utilisateur ajouté avec succès !";
?>
