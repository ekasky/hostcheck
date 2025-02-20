

class AppError extends Error {

    public status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;

        Object.setPrototypeOf(this, new.target.prototype);
    }

};

/* Bad Request */
class BadRequestError extends AppError {

    constructor(message: string = 'Bad request') {
        super(message, 400);
    }

};

/* Unauthorized Request */
class UnauthorizedError extends AppError {

    constructor(message: string = 'Unauthorized') {
        super(message, 401);
    }

};

/* Forbidden Request */
class ForbiddenError extends AppError {

    constructor(message: string = 'Forbidden') {
        super(message, 403);
    }

}

/* Not Found Request */
class NotFoundError extends AppError {

    constructor(message: string = 'Not Found') {
        super(message, 404);
    }

}

/* Conflict Request */
class ConflictError extends AppError {

    constructor(message: string = 'Conflict') {
        super(message, 409);
    }

}

/* Too Many Requests Request */
class TooManyRequestsError extends AppError {

    constructor(message: string = 'Too Many Requests') {
        super(message, 429);
    }

}

/* Internal Server Error */
class InternalServerError extends AppError {

    constructor(message: string = 'Internal Server Error') {
        super(message, 500);
    }

}

/* Not Implemented Error */
class NotImplemented extends AppError {

    constructor(message: string = 'Not Implemented Error') {
        super(message, 500);
    }

}

export { 
    AppError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    TooManyRequestsError,
    InternalServerError,
    NotImplemented
};