const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {

    //grab the token from the cookies
    const token = req.cookies.jwt;

    //check if the jwt exists and is verified
    if (token) {
        jwt.verify(token, 'secret webtoken user resonancia', (err, decodedToken) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ msg: "Token inválido. Por favor, inicie sesión nuevamente." });
            } else {
                console.log(decodedToken);
                next();
            }
        });

    } else {
        return res.status(401).json({ msg: "No autorizado. Inicie sesión." });
    }
};

/* const checkUser = (req, res, next) => {

    const token = req.cookies.jwt;

    if (token) {

        jwt.verify(token, 'secret webtoken user resonancia', (err, decodedToken) => {
            if (err) {
                console.log(err);
                //res.locals.user = null
                next();
            } else {
                const user = {
                    id: decodedToken.id,
                    email: decodedToken.email,
                    nombre: decodedToken.nombre,
                    apellido: decodedToken.apellido,
                    rol: decodedToken.rol
                }

                //res.locals.user = user

                //inject the info in our views
            }
        });

    } else {
        //res.locals.user = null
        next()
    }

} */

module.exports = requireAuth;