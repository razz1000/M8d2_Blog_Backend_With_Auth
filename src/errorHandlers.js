export const badRequestErrorHandler = (error, request, response, next) => {
if(error.status === 400) {
    response.status(400).send({status: "error happened", message: error.message, errorList: error.errorList})
}
}
export const unathorizedErrorHandler = (error, request, response, next) => {
if (error.status === 401) {
    response.status(401).send({ status: "error", message: error.message })
}
}
export const notFoundErrorHandler = (error, request, response, next) => {
if(error.status === 404) {
    response.status(404).send({ status: "error", message: error.message })
}
}
export const genericErrorHandler = (error, request, response, next) => {
    console.log("500 ERROR", error)
    response.status(500).send({message: "A generic server Error has happened. We are working on fixing it. Sorry."})
}