const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Project.belongsTo(models.User, {
                foreignKey: 'ownerId'
            })
            Project.hasMany(models.Task, {
                foreignKey: 'projectId',
                onDelete: 'CASCADE'
            })
        }
    }

    Project.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            validate: {
                isUUID: 4
            }
        },
        ownerId: {
            allowNull: false,
            type: DataTypes.UUID,
            validate: {
                isUUID: 4
            }
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true,
                len: [3, 50]
            }
        }
    }, {
        sequelize,
        modelName: 'Project',
        underscored: true,
    })

    return Project
}