export const errorHandler = (error, req, res, next) => {
    const error = new Error();
    error.status = error.statusCode;
    error.message = error.message;
    return error;
};