
const errorMiddleware = function (handler) {
    return async (req, res, next) => {
        try{
            await handler(req, res)
        }catch(err){
            console.log(err.message)
            res.status(500).send(err.message);
            next()
        }
    }
}

export default errorMiddleware