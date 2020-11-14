const {Router} = require('express')
const router = Router()
const jwtProtect = require('../middlewares/jwtAuthMiddleware')
const {ProjectController, TaskController} = require('../controllers')

router.route('/').get(jwtProtect, ProjectController.getProjects)
router.route('/').post(jwtProtect, ProjectController.createProject)
router.route('/:projectId').get(jwtProtect, ProjectController.getProject)
router.route('/:projectId').put(jwtProtect, ProjectController.updateProject)
router.route('/:projectId').delete(jwtProtect, ProjectController.deleteProject)
router.route('/:projectId/tasks').get(jwtProtect, TaskController.getTasks)
router.route('/:projectId/tasks').post(jwtProtect, TaskController.createTask)
router.route('/:projectId/tasks/:taskId').get(jwtProtect, TaskController.getTask)
router.route('/:projectId/tasks/:taskId').put(jwtProtect, TaskController.updateTask)
router.route('/:projectId/tasks/:taskId').delete(jwtProtect, TaskController.deleteTask)

module.exports = router