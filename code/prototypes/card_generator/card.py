from PIL import Image, ImageDraw, ImageFont
import barcode
from barcode.writer import ImageWriter
import requests
from io import BytesIO

def cargar_imagen(foto_path):
    """Carga una imagen desde una URL o una ruta local."""
    if foto_path.startswith("http"):
        response = requests.get(foto_path)
        if response.status_code == 200:
            return Image.open(BytesIO(response.content))
        else:
            raise Exception("No se pudo descargar la imagen desde la URL.")
    else:
        return Image.open(foto_path)

def generar_tarjeta(nombre, grado, dni, foto_path):
    # Crear una imagen en blanco con las dimensiones de la tarjeta
    tarjeta = Image.new("RGB", (300, 180), "white")

    # Cargar y pegar la imagen de la foto del alumno (desde URL o local)
    foto_alumno = cargar_imagen(foto_path).resize((70, 90))
    tarjeta.paste(foto_alumno, (22, 18))

    # Generar código de barras sin texto
    code128 = barcode.get("code128", dni, writer=ImageWriter())
    barcode_path = "barcode"  # Sin extensión, porque python-barcode añade .png automáticamente
    code128.save(barcode_path, {"module_width": 0.4, "module_height": 20, "add_text": False})

    # Cargar el código de barras
    barcode_img = Image.open(barcode_path + ".png")
    
    # Recortar la parte inferior (ajusta según el tamaño del texto generado)
    width, height = barcode_img.size
    barcode_img = barcode_img.crop((0, 0, width, int(height * 0.75)))  # Elimina el 25% inferior
    
    # Redimensionar al tamaño deseado y pegar en la tarjeta
    barcode_img = barcode_img.resize((138, 22))
    tarjeta.paste(barcode_img, (139, 135))

    # Dibujar texto (nombre y grado)
    draw = ImageDraw.Draw(tarjeta)
    font = ImageFont.truetype("arial.ttf", 9.1)  # Ajusta la fuente y tamaño si es necesario

    draw.text((139, 68), nombre, font=font, fill="black")
    draw.text((139, 98), grado, font=font, fill="black")

    # Guardar la imagen final
    tarjeta.save("tarjeta_generada.png")
    print("Tarjeta generada correctamente.")

# Ejemplo de uso con URL y ruta local
generar_tarjeta(
    "Rafael Sánchez Fernández", 
    "Grado INSO", 
    "12345678A", 
    "https://cdn.discordapp.com/attachments/1334909232117448785/1337048440760176690/Foto.png?ex=67a80125&is=67a6afa5&hm=77c5ae241cca3f7e79a8d1f9d79ba9e13d7876a4840bab3cbaf03d551b093d89&"
)

# También funcionaría con una imagen local:
# generar_tarjeta("Nombre", "Grado", "DNI", "foto_alumno.png")
