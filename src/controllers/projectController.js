const _ = require('lodash')
const catchAsync = require('../lib/catchAsync')
const GlobalResponse = require('../lib/globalReponse')
const GlobalError = require('../lib/globalError')
const {ProjectService} = require('../services')

class ProjectController {
    getProjects = catchAsync(async (req, res) => {
        const userId = req.user.id
        const projects = await ProjectService.getAll(userId)
        return new GlobalResponse(res,200,'done', projects)
    })

    getProject = catchAsync(async (req, res, next) => {
        const userId = req.user.id
        const projectId = req.params.projectId
        const project = await ProjectService.getOne(userId, projectId)

        return new GlobalResponse(res,200,'done', project)
    })

    createProject = catchAsync(async (req, res) => {
        const userId = req.user.id
        const data = {
            ... req.body,
            ownerId: userId
        }
        await ProjectService.create(data)

        return new GlobalResponse(res, 201, 'created')
    })

    updateProject = catchAsync(async (req, res, next) => {
        const userId = req.user.id
        const projectId = req.params.projectId
        const data = {... _.omit(req.body, ['ownerId'])}
        const number = await ProjectService.update(userId, projectId, data)

        if (number != 1) {
            return next(new GlobalError('updating error', 500))
        }

        return new GlobalResponse(res, 200, 'updated')
    })

    deleteProject = catchAsync(async (req, res, next) => {
        const userId = req.user.id
        const projectId = req.params.projectId
        const number = await ProjectService.delete(userId, projectId)

        if (number != 1) {
            return next(new GlobalError('deleting error', 500))
        }

        return new GlobalResponse(res, 200, 'deleted')
    })
}

module.exports = new ProjectController()