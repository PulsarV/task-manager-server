class GlobalResponse {
    constructor(res, statusCode, message, data = null) {
        let payload = {
            status: 'success',
            message
        }
        if (data) {
            payload.data = data
        }

        return res.status(statusCode).json(payload)
    }
}

module.exports = GlobalResponse