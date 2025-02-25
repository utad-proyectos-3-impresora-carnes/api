<?php
// Paso 1: Conexión a la base de datos
$host = "localhost"; // Cambia esto si es necesario
$usuario = "root"; // Tu usuario de MySQL
$contraseña = "1234"; // Tu contraseña de MySQL
$base_de_datos = "alumnos";

$conn = new mysqli($host, $usuario, $contraseña, $base_de_datos);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Paso 2: Leer la imagen desde una URL
$imagen_url = 'https://cdn.discordapp.com/attachments/1334909232117448785/1337048440760176690/Foto.png?ex=67be6aa5&is=67bd1925&hm=eb985878d7e904c35be4bee2a5c67421903955def75a220e16e19075d84d84e6&'; // Cambia esto con la URL de la imagen
$foto = file_get_contents($imagen_url); // Lee la imagen desde la URL como datos binarios

// Paso 3: Insertar los datos del alumno
$nombre = 'Sofia Sánchez Fernández';
$grado = 'GRADO INSO';
$dni = '22222222R';

// Consulta preparada para insertar los datos
$stmt = $conn->prepare("INSERT INTO alumnos (nombre, grado, dni, foto) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $nombre, $grado, $dni, $foto);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo "Alumno agregado con éxito";
} else {
    echo "Error al agregar el alumno: " . $stmt->error;
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>
