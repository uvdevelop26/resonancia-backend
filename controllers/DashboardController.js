
const { User, Rol, Examen, Persona } = require('../models');

const DashboardController = {
    start: async (req, res) => {

        try {
            //find paciente rol
            const roldPct = await Rol.findOne({ where: { nombre_rol: 'paciente' } });

            //find and count total pacientes
            const pacienteUsers = await User.count({ where: { rol_id: roldPct.id } });
            const lastPaciente = await User.findOne({
                where: { rol_id: roldPct.id },
                order: [['createdAt', 'DESC']],
            });

            //find an count examenes
            const examenes = await Examen.count();

            const lastExamenes = await Examen.findAll({
                include: [
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
                ],
                order: [['createdAt', 'DESC']], 
                limit: 2 
            });

            if (!pacienteUsers || !examenes) {
                return res.status(400).json({ msg: "Ha ocurrido un problema en el servidor" });
            }

            return res.status(200).json({ pacienteUsers, lastPaciente, examenes, lastExamenes });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Error en el servidor" });
        }
    }
}

module.exports = DashboardController;