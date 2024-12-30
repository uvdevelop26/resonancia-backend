const { User, Rol, Persona, Examen, Imagen, ExamenImagen } = require('../models');
const fs = require('fs');
const path = require('path');

const ExamenController = {
    getExamenes: async (req, res) => {

        try {

            const examenes = await Examen.findAll({
                include: [
                    {
                        model: Imagen,
                        as: 'imagenes'
                    },
                    {
                        model: User,
                        as: 'user',
                        include: [
                            {
                                model: Persona,
                                as: 'persona'
                            }
                        ]
                    }
                ]
            });

            if (!examenes) {
                return res.status(400).json({ msg: "Todavía no has Realizado Exámenes" });
            }

            return res.status(200).json(examenes);

        } catch (error) {
            return res.status(500).json({ msg: "Error en el servidor" });
        }

    },
    createExamen: async (req, res) => {
        try {

            /* encontrar los usuarios "pacientes" mediante el rol */
            const rolPaciente = await Rol.findOne({ where: { nombre_rol: "paciente" } });

            const rolId = rolPaciente.id;

            /* encontrar pacientes */

            const pacientes = await User.findAll({
                where: { rol_id: rolId },
                include: [
                    {
                        model: Persona,
                        as: 'persona',
                    },
                ]
            });

            if (!pacientes) {
                return res.status(404).json({ msg: "Datos no encontrados" });
            }

            return res.status(200).json(pacientes);

        } catch (error) {
            console.error("Error al buscar pacientes:", error);
            return res.status(500).json({ msg: "Error en el servidor" });
        }
    },

    storeExamen: async (req, res) => {
        try {

            const { fecha, resultado, user_id } = req.body;

            const nuevoExamen = await Examen.create({
                fecha,
                resultado,
                user_id
            });

            if (req.files && req.files.length > 0) {
                const imageIds = [];

                for (const file of req.files) {
                    const newImage = await Imagen.create({
                        url: `/storage/analisis/${file.filename}`
                    });
                    imageIds.push(newImage.id);
                }

                for (const imageId of imageIds) {
                    await ExamenImagen.create({
                        examen_id: nuevoExamen.id,
                        imagen_id: imageId
                    });
                }
            }

            return res.status(201).json({
                msg: 'Examen creado con éxito',
                examen: nuevoExamen
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al crear el examen' });
        }
    },

    showExamen: async (req, res) => {

        try {
            const { id } = req.params;
            const examen = await Examen.findOne({
                where: { id: id },
                include: [
                    {
                        model: Imagen,
                        as: 'imagenes'
                    },
                    {
                        model: User,
                        as: 'user',
                        include: [
                            {
                                model: Persona,
                                as: 'persona'
                            }
                        ]
                    }
                ]
            });



            if (!examen) {
                return res.status(404).json({ msg: "Examen no Encontrado" });
            }

            return res.status(200).json(examen);


        } catch (error) {
            return res.status(500).json({ msg: "Error en el servidor" });
        }

    },

    deleteExamene: async (req, res) => {
        try {
            const { id } = req.params;

            const examen = await Examen.findOne({
                where: { id: id },
                include: [
                    {
                        model: Imagen,
                        as: 'imagenes'
                    }
                ]
            });

            if (!examen) {
                return res.status(404).json({ msg: "Examen no encontrado" });
            }

            for (const imagen of examen.imagenes) {
                const imagePath = path.join(__dirname, '..', 'storage', 'analisis', path.basename(imagen.url));
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            // Eliminar los registros de las imágenes asociadas
            await Imagen.destroy({
                where: { id: examen.imagenes.map(img => img.id) }
            });


            await examen.destroy();

            return res.status(200).json({ msg: "Examen eliminado con éxito" });

        } catch (error) {
            console.error('Error al eliminar el examen:', error);
            return res.status(500).json({ msg: "Error en el servidor" });
        }
    }
}

module.exports = ExamenController;