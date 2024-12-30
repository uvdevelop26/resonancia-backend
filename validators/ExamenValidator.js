const { check } = require('express-validator');

const ExameneValidator = {
    store: [
        /* fecha de examene */
        check('fecha', 'El campo fecha es obligatorio').notEmpty(),
        check('fecha', 'Inserta una fecha válida').isDate(),

        /* paciente */
        check('user_id', 'El campo paciente es obligatorio').notEmpty(),

        /* resultado */
        check('resultado', 'El campo resultado es obligatorio').notEmpty(),

        /* url */
        check('url', 'Debes enviar al menos un archivo').custom((value, { req }) => {
            if (!req.files || req.files.length === 0) {
                throw new Error('No se han subido archivos');
            }
            return true;
        }),
        check('url.*', 'El archivo debe ser de tipo imagen').custom((value, { req }) => {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

            const files = req.files;

            // Verifica que cada archivo sea de tipo imagen
            return files.every(file => allowedTypes.includes(file.mimetype));
        })


    ]
};

module.exports = ExameneValidator;