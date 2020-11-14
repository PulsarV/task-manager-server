const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Task.belongsTo(models.User, {
                foreignKey: 'ownerId'
            })
            Task.belongsTo(models.Project, {
                foreignKey: 'projectId'
            })
        }
    }
    Task.init({
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
        projectId: {
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
        },
        deadline: {
            allowNull: true,
            type: DataTypes.DATE,
            validate: {
                isDate: true
            }
        },
        priority: {
            allowNull: false,
            type: DataTypes.INTEGER,
            validate: {
                notNull: true,
                notEmpty: true,
                isInt: true
            }
        },
        done: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            validate: {
                notNull: true
            }
        },
    }, {
        sequelize,
        modelName: 'Task',
        underscored: true,
    })
    return Task
}