const {Project, Task} = require('../models')

class ProjectService {
    getAll = async (userId) => {
        return await Project.findAll({
            where: {ownerId: userId},
            include: [{
                model: Task,
            }],
            order: [
                'createdAt',
                [Task, 'priority']
            ]
        })
    }

    getOne = async (userId, id) => {
        return await Project.findOne({
            where: {
                id: id,
                ownerId: userId
            },
            include: [{
                model: Task,
            }],
            order: [[Task, 'priority']]
        })
    }

    create = async data => {
        return await Project.create(data);
    }

    update = async (userId, id, data) => {
        return await Project.update(data, {
            where: {
                id: id,
                ownerId: userId
            }
        })
    }

    delete = async (userId, id) => {
        return await Project.destroy({
            where: {
                id: id,
                ownerId: userId
            }
        })
    }
}

module.exports = new ProjectService()