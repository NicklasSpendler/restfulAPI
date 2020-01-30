const { createUser } = require('../controllers/user.controller.js')


module.exports = (router)=>{
    router.post("/api/v1/users", createUser);
}