const { User, Persona, Rol, Departamento, Ciudad } = require('../models');
const bcrypt = require('bcryptjs');

const UserController = {

    getUsers: async (req, res) => {
        try {
            const { type } = req.params;

            const rol = await Rol.findOne({ where: { nombre_rol: type } });

            const users = await User.findAll({
                where: { rol_id: rol.id },
                include: [
                    {
                        model: Persona,
                        as: 'persona',
                        include: [
                            {
                                model: Ciudad,
                                as: 'ciudad',
                            },
                        ],
                    },
                ],
            });

            if (!users || !rol) {
                return res.status(404).json({ msg: "Datos No Encontrados" });
            }

            return res.status(200).json(users);

        } catch (error) {
            return res.status(500).json({ msg: "Error al buscar usuarios" });
        }
    },

    createUser: async (req, res) => {
        try {

            /* encuentra rol */
            const { type } = req.params;
            const rol = await Rol.findOne({ where: { nombre_rol: type } });

            /* encuentra departamentos y ciudades */
            const departamentos = await Departamento.findAll({
                include: [
                    {
                        model: Ciudad,
                        as: 'ciudades',

                    }
                ]
            });

            if (!rol || !departamentos) {
                return res.status(400).json({ msg: "Error al Buscar los datos" });
            }

            return res.status(200).json({ rol, departamentos });

        } catch (error) {
            return res.status(500).json({ msg: "Error en el servidor" });
        }
    },

    storeUser: async (req, res) => {
        try {

            const { nombre, apellido, slug, dni, telefono, fecha_nacimiento, sexo, direccion, edad, ciudad_id, email, password, profile_photo_path, rol_id } = req.body;

            /* encrypting password */
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const persona = await Persona.create({
                nombre,
                apellido,
                dni,
                telefono,
                fecha_nacimiento,
                sexo,
                direccion,
                edad,
                ciudad_id
            });

            await User.create({
                email,
                password: hashedPassword,
                slug,
                profile_photo_path,
                rol_id,
                persona_id: persona.id
            });

            res.status(200).json({ msg: "Usuario creado exitosamente" });

        } catch (error) {
            return res.status(500).json({ msg: "Error en el servidor" });
        }

    },


    editUser: async (req, res) => {
        try {

            const { slug } = req.params;

            const user = await User.findOne({
                where: { slug: slug },
                include: [
                    {
                        model: Persona,
                        as: 'persona',
                        include: [
                            {
                                model: Ciudad,
                                as: 'ciudad'
                            }
                        ]
                    },
                    {
                        model: Rol,
                        as: 'rol'
                    }
                ]
            });

            const departamentos = await Departamento.findAll({
                include: [
                    {
                        model: Ciudad,
                        as: 'ciudades',

                    }
                ]
            });

            if (!departamentos || !user) {
                return res.status(400).json({ msg: "Datos no Encontrados" });
            }

            return res.status(200).json({ user, departamentos });

        } catch (error) {
            return res.status(500).json({ msg: "Error en el servidor" });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { slug: slugParam } = req.params;

            const { nombre, apellido, slug, dni, telefono, fecha_nacimiento, sexo, direccion, edad, ciudad_id, email, password, profile_photo_path, rol_id, persona_id } = req.body;

            let hashedPassword = null;

            if (password) {
                const salt = bcrypt.genSaltSync(10);
                hashedPassword = bcrypt.hashSync(password, salt);
            }

            const user = await User.findOne({ where: { slug: slugParam } });
            const persona = await Persona.findOne({ where: { id: persona_id } });

            if (!user || !persona) {
                return res.status(404).json({ msg: "Error al encontrar los Datos" });
            }

            await user.update({
                email,
                password: password ? hashedPassword : user.password,
                slug,
                profile_photo_path,
                rol_id,
                persona_id
            });

            await persona.update({
                nombre,
                apellido,
                dni,
                telefono,
                fecha_nacimiento,
                sexo,
                direccion,
                edad,
                ciudad_id,
            });

            res.status(200).json({ msg: "Usuario actualizado exitosamente" });

        } catch (error) {

            return res.status(500).json({ msg: "Error en el servidor" });
        }
    },

    deleteUser: async (req, res) => {

        try {
            const { slug } = req.params;

            const user = await User.findOne({ where: { slug: slug } });

            await user.destroy();

            res.status(200).json({ msg: "Usuario eliminado exitosamente" });

        } catch (error) {

            return res.status(500).json({ msg: "Error en el servidor" });
        }

    }

}

module.exports = UserController;

