from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# Cargar el modelo
modelo = tf.keras.models.load_model("model_38.h5")

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No se envió una imagen"}), 400

    file = request.files["file"]
    image = Image.open(io.BytesIO(file.read())).resize((64, 64))
    image_array = np.array(image) / 255.0  # Normalizar la imagen
    image_array = np.expand_dims(image_array, axis=0)  # Expandir dimensiones

    # Hacer la predicción
    prediction = modelo.predict(image_array)
    
    return jsonify({"prediction": prediction.tolist()})

if __name__ == "__main__":
    app.run(debug=True)
