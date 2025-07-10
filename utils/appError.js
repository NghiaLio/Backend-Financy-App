class AppError extends Error{
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${this.statusCode}`.startsWith('4') ? 'fail': 'error';
        this.isOperational = true; // operational error, true for all errors that are not programming errors
        Error.captureStackTrace(this, this.constructor); // this will not work in the constructor
    }
}

module.exports = AppError;