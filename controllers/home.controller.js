function getHome(req, res, next) {
    res.json({
        message: "Hej, Hemming"
    })
}

module.exports = {
    getHome
};