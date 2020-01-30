const { getToken, checkToken } = require("../controllers/auth.controller")


module.exports = (router)=>{
    router.post("/auth/get-token", getToken);
    router.post("/auth/check-token", checkToken)
}