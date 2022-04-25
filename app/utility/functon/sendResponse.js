
module.exports = {
    error: (error, status, next) => {
        let response = {
            status: status || 500,
            message: "Server Error " + error,
        };
        return response;

    }

}




