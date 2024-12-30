const path = require('path');
const fs = require('fs');
const { Imagene } = require('../models');


const ImageneController = {

  getImagenes: async (req, res) => {

    try {

      const imagenes = await Imagene.findAll();

      if (!imagenes) {
        return res.status(400).json({ msg: "No existen Imágenes" });
      }

      return res.status(200).json(imagenes);

    } catch (error) {
      return res.status(500).json({ msg: "No hay Imágenes para mostrar" });
    }

  },


  storeImagene: async (req, res) => {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: 'No se ha subido ninguna imagen' });
      }

      const imageUrl = `/storage/analisis/${file.filename}`;

      const nuevaImagen = await Imagene.create({
        url: imageUrl,
      });

      return res.status(201).json({
        msg: 'Imagen capturada correctamente',
        imageUrl: nuevaImagen.url,
      });

    } catch (error) {
      console.error('Error al guardar la imagen:', error);
      return res.status(500).json({ error: 'Error al guardar la imagen en la base de datos' });
    }

  },
};

module.exports = { ImageneController };
