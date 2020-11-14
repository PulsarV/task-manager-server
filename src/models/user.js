const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Project, {
                foreignKey: 'ownerId',
                onDelete: 'CASCADE'
            })
            User.hasMany(models.Task, {
                foreignKey: 'ownerId',
                onDelete: 'CASCADE'
            })
        }
    }

    User.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            validate: {
                isUUID: 4
            }
        },
        firstName: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true,
                len: [2, 50]
            }
        },
        lastName: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true,
                len: [2, 50]
            }
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notNull: true,
                notEmpty: true
            }
        }
    }, {
        sequelize,
        modelName: 'User',
        underscored: true,
    })

    return User
}