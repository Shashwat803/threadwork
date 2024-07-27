class ApiError extends Error {
    statusCode: Number
    data: null
    success: boolean
    errors: any
    constructor(statusCode: Number, message = "Something Went wrong", errors = [], stack = "") {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}