from PIL import Image, ImageDraw, ImageFont
import barcode
from barcode.writer import ImageWriter
import requests
from io import BytesIO

def cargar_imagen(foto_path):
    """Carga una imagen desde una URL o una ruta local con mejor calidad."""
    if foto_path.startswith("http"):
        response = requests.get(foto_path)
        if response.status_code == 200:
            img = Image.open(BytesIO(response.content)).convert("RGBA")
        else:
            raise Exception("No se pudo descargar la imagen desde la URL.")
    else:
        img = Image.open(foto_path).convert("RGBA")
    
    return img

def generar_tarjeta(nombre, grado, dni, foto_path):
    # Crear una imagen en blanco con mayor resolución (600x360)
    tarjeta = Image.new("RGB", (600, 360), "white")

    # Cargar y mejorar la imagen del alumno
    foto_alumno = cargar_imagen(foto_path).resize((140, 180), Image.LANCZOS)  # 2x tamaño original
    tarjeta.paste(foto_alumno, (44, 36))  # Duplicamos coordenadas (2x escala)

    # Generar código de barras con más resolución
    code128 = barcode.get("code128", dni, writer=ImageWriter())
    barcode_path = "barcode"
    code128.save(barcode_path, {"module_width": 0.8, "module_height": 40, "add_text": False})  # 2x tamaño original

    # Cargar y recortar el código de barras
    barcode_img = Image.open(barcode_path + ".png").convert("L")  # Escala de grises para calidad
    width, height = barcode_img.size
    barcode_img = barcode_img.crop((0, 0, width, int(height * 0.75)))  # Recortar parte inferior

    # Redimensionar y pegar código de barras
    barcode_img = barcode_img.resize((276, 44), Image.LANCZOS)  # 2x tamaño original
    tarjeta.paste(barcode_img, (278, 270))  # Duplicamos coordenadas (2x escala)

    # Dibujar texto con mayor tamaño
    draw = ImageDraw.Draw(tarjeta)
    font = ImageFont.truetype("arial.ttf", 12.1 * 2)  # 2x tamaño original

    draw.text((278, 136), nombre, font=font, fill="black")
    draw.text((278, 196), grado, font=font, fill="black")

    # Reducir a tamaño original (300x180) si es necesario
    tarjeta = tarjeta.resize((300, 180), Image.LANCZOS)

    # Guardar imagen final con alta calidad
    tarjeta.save("tarjeta_generada.png", dpi=(300, 300))
    print("Tarjeta generada con mejor resolución.")

# Ejemplo de uso
generar_tarjeta(
    "Rafael Sánchez Fernández",
    "Grado INSO",
    "12345678A",
    "https://cdn.discordapp.com/attachments/1334909232117448785/1337048440760176690/Foto.png?ex=67abf5a5&is=67aaa425&hm=4a4d96d953e2943a44473596219b7373f83f1113136a457ea3ca6873ef3e413a&"
)