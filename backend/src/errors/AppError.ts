interface IAppError {
    status: number;
    operational: boolean;
}

export default class AppError extends Error implements IAppError {
    public status: number;
    public operational: boolean;

    constructor(message: string, status: number, operational: boolean) {
        super(message);
        this.status = status;
        this.operational = operational;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class UndefinedValueError extends AppError {
    constructor(message: string, operational = false) {
        super(message, 400, operational);
    }
}

export class AppTypeError extends AppError {
    constructor(message: string, operational = false) {
        super(message, 400, operational);
    }
}
