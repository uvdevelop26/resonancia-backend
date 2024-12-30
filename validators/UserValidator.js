const { check, body } = require('express-validator');
const { User, Persona } = require('../models')

const UserValidator = {
    store: [
        // nombre 
        check('nombre', 'El campo nombre es obligatorio').notEmpty(),
        check('nombre', 'El campo nombre no puede tener más de 200 caracteres').isLength({ max: 200 }),
        // apellido 
        check('apellido', 'El campo apellido es obligatorio').notEmpty(),
        check('apellido', 'El campo apellido no debe tener más de 200 caracteres').isLength({ max: 200 }),
        // dni */
        check('dni', 'El campo dni es obligatorio').notEmpty(),
        check('dni', 'El campo dni no debe tener más de 20 caracteres').isLength({ max: 20 }),
        check('dni').custom(async (value) => {
            const existingDni = await Persona.findOne({ where: { dni: value } });
            if (existingDni) {
                throw new Error('El dni ya está registrado');
            }
            return true;
        }),
        // telefono 
        check('telefono', 'El campo nombre es obligatorio').notEmpty(),
        check('telefono', 'El campo teléfono no debe tener más de 20 caracteres').isLength({ max: 20 }),

        // fecha de nacimiento 
        check('fecha_nacimiento', 'El campo fecha de nacimiento es obligatorio').notEmpty(),
        check('fecha_nacimiento', 'Inserta una fecha válida').isDate(),

        // sexo 
        check('sexo', 'El campo sexo es obligatorio').notEmpty(),
        check('sexo', 'El campo sexo no debe tener más de 10 caracteres').isLength({ max: 10 }),

        // dirección 
        check('direccion', 'El campo dirección es obligatorio').notEmpty(),
        check('direccion', 'El campo dirección no debe tener más de 255 caracteres').isLength({ max: 255 }),

        // edad 
        check('edad', 'El campo edad es obligatorio').notEmpty(),
        check('edad', 'La edad debe ser un número').isNumeric(),
        check('edad', 'La edad debe ser un número entre 1 y 100').isInt({ min: 1, max: 100 }),

        // ciudad 
        check('ciudad_id', 'El campo ciudad es obligatorio').notEmpty(),

        // slug 
        check('slug', 'El campo slug es obligatorio').notEmpty(),

        // email 
        check('email', 'El email es obligatorio').notEmpty(),
        check('email', 'Introduce un email válido').isEmail(),
        check('email').custom(async (value) => {
            const existingEmail = await User.findOne({ where: { email: value } });
            if (existingEmail) {
                throw new Error('El email ya está registrado');
            }
            return true;
        }),

        // password 
        check('password', 'La contraseña es obligatoria').notEmpty(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
        body('confirmPassword')
            .notEmpty().withMessage('La confirmación de contraseña es obligatoria')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Las contraseñas no coinciden');
                }
                return true;
            }),

        // rol 
        check('rol_id', 'El campo rol es obligatorio').notEmpty(),
    ],

    update: [
        // nombre 
        check('nombre', 'El campo nombre no puede tener más de 200 caracteres').notEmpty().isLength({ max: 200 }),
        // apellido 
        check('apellido', 'El campo apellido no debe tener más de 200 caracteres').notEmpty().isLength({ max: 200 }),
        // dni 
        check('dni', 'El campo dni no debe tener más de 20 caracteres').optional().isLength({ max: 20 }),
        // telefono 
        check('telefono', 'El campo nombre es obligatorio').notEmpty(),
        check('telefono', 'El campo teléfono no debe tener más de 20 caracteres').isLength({ max: 20 }),

        // fecha de nacimiento 
        check('fecha_nacimiento', 'El campo fecha de nacimiento es obligatorio').notEmpty(),
        check('fecha_nacimiento', 'Inserta una fecha válida').optional().isDate(),

        // sexo 
        check('sexo', 'El campo sexo es obligatorio').notEmpty(),
        check('sexo', 'El campo sexo no debe tener más de 10 caracteres').isLength({ max: 10 }),

        // dirección 
        check('direccion', 'El campo dirección es obligatorio').notEmpty(),
        check('direccion', 'El campo dirección no debe tener más de 255 caracteres').optional().isLength({ max: 255 }),

        // edad 
        check('edad', 'El campo edad es obligatorio').notEmpty(),
        check('edad', 'La edad debe ser un número').optional().isNumeric(),
        check('edad', 'La edad debe ser un número entre 1 y 100').optional().isInt({ min: 1, max: 100 }),

        // ciudad 
        check('ciudad_id', 'El campo ciudad es obligatorio').notEmpty(),

        // slug 
        check('slug', 'El campo slug no debe tener más de 255 caracteres').optional().isLength({ max: 255 }),

        // email 
        check('email', 'El email es obligatorio').notEmpty(),
        check('email', 'Introduce un email válido').notEmpty().isEmail(),

        // password 
        check('password', 'La contraseña debe tener al menos 6 caracteres').optional({ checkFalsy: true }).isLength({ min: 6 }),
        body('confirmPassword')
            .optional().custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Las contraseñas no coinciden');
                }
                return true;
            }),

        // rol 
        check('rol_id', 'El campo rol es obligatorio').notEmpty(),
    ],
};

module.exports = UserValidator;
