const {sequelize, Op, Task} = require('../models')

class TaskService {
    getAll = async (userId, projectId) => {
        return await Task.findAll({
            where: {
                ownerId: userId,
                projectId: projectId
            },
            order: ['priority']
        })
    }

    getOne = async (userId, projectId, id) => {
        return await Task.findOne({
            where: {
                id: id,
                ownerId: userId,
                projectId: projectId
            }
        })
    }

    create = async data => {
        const maxPriority = await getMaxPriority(data.ownerId, data.projectId)

        data.priority = maxPriority !== null ? maxPriority + 1 : 0

        return await Task.create(data)
    }

    update = async (userId, projectId, id, data) => {
        const priority = await getPriority(userId, projectId, id)
        const maxPriority = await getMaxPriority(userId, projectId)

        if (data.priority < 0) {
            data.priority = 0
        } else if (data.priority > maxPriority) {
            data.priority = maxPriority
        }

        let decBetween
        let incBetween

        if (data.priority > priority) {
            decBetween = [priority + 1, data.priority]
        } else if (data.priority < priority) {
            incBetween = [data.priority, priority - 1]
        }

        const number = await Task.update(data, {
            where: {
                id: id,
                ownerId: userId,
                projectId: projectId
            }
        })

        if (decBetween) {
            await Task.update({
                    priority: sequelize.literal('priority - 1')
                },
                {
                    where: {
                        id: {
                            [Op.not]: id
                        },
                        ownerId: userId,
                        projectId: projectId,
                        priority: {
                            [Op.between]: decBetween
                        },
                    }
                })
        }

        if (incBetween) {
            await Task.update({
                    priority: sequelize.literal('priority + 1')
                },
                {
                    where: {
                        id: {
                            [Op.not]: id
                        },
                        ownerId: userId,
                        projectId: projectId,
                        priority: {
                            [Op.between]: incBetween
                        }
                    }
                })
        }

        return number
    }

    delete = async (userId, projectId, id) => {
        const priority = await getPriority(userId, projectId, id)

        const number = await Task.destroy({
            where: {
                id: id,
                ownerId: userId,
                projectId: projectId
            }
        })

        await Task.update({
                priority: sequelize.literal('priority - 1')
            },
            {
                where: {
                    ownerId: userId,
                    projectId: projectId,
                    priority: {
                        [Op.gt]: priority
                    },
                }
            })

        return number
    }
}

const getPriority = async (ownerId, projectId, taskId) => {
    const {priority} = await Task.findOne({
        where: {
            id: taskId,
            ownerId: ownerId,
            projectId: projectId
        },
        attributes: ['priority'],
        raw: true
    })

    return priority
}

const getMaxPriority = async (ownerId, projectId) => {
    const {maxPriority} = await Task.findOne({
        where: {
            ownerId: ownerId,
            projectId: projectId
        },
        attributes: [[sequelize.fn('max', sequelize.col('priority')), 'maxPriority']],
        raw: true
    })

    return maxPriority
}

module.exports = new TaskService()