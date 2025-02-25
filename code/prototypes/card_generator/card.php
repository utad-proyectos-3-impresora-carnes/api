<?php
// Paso 1: Conexión a la base de datos
$host = "localhost"; // Cambia esto si es necesario
$usuario = "root"; // Tu usuario de MySQL0
$contraseña = "1234"; // Tu contraseña de MySQL
$base_de_datos = "alumnos";

$conn = new mysqli($host, $usuario, $contraseña, $base_de_datos);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Paso 2: Leer la imagen desde el ordenador
$imagen_path = 'C:\Users\Rafael\Desktop\Foto - copia - copia.png'; // Cambia esto con la ruta completa de la imagen en tu ordenador
$foto = file_get_contents($imagen_path); // Lee la imagen como datos binarios

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
