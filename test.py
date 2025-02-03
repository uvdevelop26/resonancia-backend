import requests
import numpy as np

url = "http://127.0.0.1:5000/predict"
files = {"file": open("resonancia_prueba.jpg", "rb")}  
response = requests.post(url, files=files)
data = response.json()

# Obtener la clase con mayor probabilidad
prediction = np.array(data["prediction"])
class_index = np.argmax(prediction)
print(f"Clase predicha: {class_index}")
