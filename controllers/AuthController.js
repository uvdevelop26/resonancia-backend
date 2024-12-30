const { User, Persona, Rol } = require('../models');
const bcrypt = require('bcryptjs');
const Settings = require('../config/Settings');
const jwt = require('jsonwebtoken');

const AuthController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({
                where: { email: email },
                include: [
                    {
                        model: Persona,
                        as: 'persona',
                    },
                    {
                        model: Rol,
                        as: 'rol'
                    }
                ]
            });

            if (!user) {
                return res.status(400).json({ msg: "Usuario no encontrado" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.dataValues.password);

            if (!isPasswordValid) {
                return res.status(400).json({ msg: "Contraseña incorrecta" });
            }

            // Crear el JWT
            const token = Settings.createWebToken(user.id, user.email, user.persona.nombre, user.persona.apellido, user.rol.nombre_rol);

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 3 * 24 * 60 * 60 * 1000,
            });

            return res.status(200).json({ user });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Error en el servidor" });

        }
    },

    logout: (req, res) => {
        res.cookie('jwt', '', {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 1, // Elimina la cookie
        });

        // Enviar una respuesta al cliente
        return res.status(200).json({ msg: "Logout exitoso" });
    },

    verify: (req, res) => {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ msg: "No autorizado" });
        }

        jwt.verify(token, 'secret webtoken user resonancia', (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ msg: "Token inválido" });
            }

            res.status(200).json({ msg: "Token válido", decodedToken });
        });
    },

    getUserInfo: (req, res) => {

        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        jwt.verify(token, 'secret webtoken user resonancia', (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Token inválido' });
            }

            // Devuelve la información del usuario
            const user = {
                id: decodedToken.id,
                email: decodedToken.email,
                nombre: decodedToken.nombre,
                apellido: decodedToken.apellido,
                rol: decodedToken.rol,
            };

            res.status(200).json({ user });
        });

    }
};

module.exports = AuthController;
