const bcrypt = require('bcryptjs');

const saltRounds = 10;
const plainPassword = '123456'; 

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log('Contraseña encriptada:', hash);
});
