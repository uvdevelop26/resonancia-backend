const { check } = require('express-validator');


const AuthValidator = () => {
  return [
    check('email', 'El email es obligatorio').notEmpty(),
    check('email', 'Introduce un email válido').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    check('password', 'La contraseña debe tener al menos 7 caracteres').isLength({ min: 7 })
  ];

};


module.exports = AuthValidator;
