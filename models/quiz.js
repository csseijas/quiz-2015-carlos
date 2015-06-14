module.exports = function(sequelize, DataTypes) {
	var tematicas = ["otro", "humanidades", "ocio", "ciencia", "tecnologia"];
	return sequelize.define('Quiz',
			{ pregunta: {
					type: DataTypes.STRING,
					validate: {notEmpty: {msg: "Falta pregunta"}}
				},
			  respuesta: {
					type: DataTypes.STRING,
					validate: {notEmpty: {msg: "Falta respuesta"}}
				},
			  tematica: {
				    type: DataTypes.STRING,
					validate: {notEmpty: {msg: "Marca una opción"},
								isIn: {args: [tematicas], msg: "Opción no válida"}
								}
			  }
			});
};