const _ = require('lodash')
const catchAsync = require('../lib/catchAsync')
const GlobalResponse = require('../lib/globalReponse')
const GlobalError = require('../lib/globalError')
const {TaskService} = require('../services')

class TaskController {
    getTasks = catchAsync(async (req, res) => {
        const userId = req.user.id
        const projectId = req.params.projectId
        const tasks = await TaskService.getAll(userId, projectId)
        return new GlobalResponse(res,200,'done', tasks)
    })

    getTask = catchAsync(async (req, res, next) => {
        const userId = req.user.id
        const projectId = req.params.projectId
        const taskId = req.params.taskId
        const task = await TaskService.getOne(userId, projectId, taskId)

        return new GlobalResponse(res,200,'done', task)
    })

    createTask = catchAsync(async (req, res) => {
        const userId = req.user.id
        const projectId = req.params.projectId
        const data = {
            ... _.omit(req.body, ['ownerId', 'projectId', 'priority', 'done']),
            ownerId: userId,
            projectId: projectId
        }
        await TaskService.create(data)

        return new GlobalResponse(res, 201, 'created')
    })

    updateTask = catchAsync(async (req, res, next) => {
        const userId = req.user.id
        const projectId = req.params.projectId
        const taskId = req.params.taskId
        const data = {... _.omit(req.body, ['ownerId', 'projectId'])}
        const number = await TaskService.update(userId, projectId, taskId, data)

        if (number != 1) {
            return next(new GlobalError('updating error', 500))
        }

        return new GlobalResponse(res, 200, 'updated')
    })

    deleteTask = catchAsync(async (req, res, next) => {
        const userId = req.user.id
        const projectId = req.params.projectId
        const taskId = req.params.taskId
        const number = await TaskService.delete(userId, projectId, taskId)

        if (number != 1) {
            return next(new GlobalError('deleting error', 500))
        }

        return new GlobalResponse(res, 200, 'deleted')
    })
}

module.exports = new TaskController()