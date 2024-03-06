export const asyncErrorHandling = (the_func) => {
    return (req, res, next) => {
        Promise.resolve(the_func(req, res, next)).catch(next)
    }
}