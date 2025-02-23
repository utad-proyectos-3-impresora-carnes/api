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
    # Crear una imagen en blanco con la nueva resolución (1013x642)
    tarjeta = Image.new("RGB", (1013, 642), "white")

    # Cargar y mejorar la imagen del alumno
    foto_alumno = cargar_imagen(foto_path).resize((236, 303), Image.LANCZOS)  # Escalado proporcional
    tarjeta.paste(foto_alumno, (74, 60))  # Ajustado a nueva resolución

    # Generar código de barras con más resolución
    code128 = barcode.get("code128", dni, writer=ImageWriter())
    barcode_path = "barcode"
    code128.save(barcode_path, {"module_width": 1.35, "module_height": 67, "add_text": False})  # Ajuste de tamaño

    # Cargar y recortar el código de barras
    barcode_img = Image.open(barcode_path + ".png").convert("L")  # Escala de grises para calidad
    width, height = barcode_img.size
    barcode_img = barcode_img.crop((0, 0, width, int(height * 0.75)))  # Recortar parte inferior

    # Redimensionar y pegar código de barras
    barcode_img = barcode_img.resize((420, 53), Image.LANCZOS)  # Ajuste proporcional
    tarjeta.paste(barcode_img, (464, 500))  # Ajustado a nueva resolución

    # Dibujar texto con mayor tamaño
    draw = ImageDraw.Draw(tarjeta)
    font = ImageFont.truetype("arial.ttf", int(30.2))  # Ajuste proporcional de fuente

    draw.text((464, 202), nombre, font=font, fill="black")
    draw.text((464, 302), grado, font=font, fill="black")

    # Guardar imagen final con alta calidad
    tarjeta.save("tarjeta_generada.png", dpi=(300, 300))
    print("Tarjeta generada con mejor resolución.")

# Ejemplo de uso
generar_tarjeta(
    "Rafael Sánchez Fernández",
    "GRADO INSO",
    "05942309Y",
    "https://cdn.discordapp.com/attachments/1334909232117448785/1337048440760176690/Foto.png?ex=67bbc7a5&is=67ba7625&hm=de8a35cee13c8d511a8930727c32fa5a238f68eede6c40c7895db7b7555c915a&"
)