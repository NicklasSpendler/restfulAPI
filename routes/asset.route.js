const {
    uploadAsset,
    getAssets,
    deleteAsset,
    getSingleAsset
} = require('../controllers/asset.controller')

const {
    isAuthorized,
} = require('../middleware/authorize')


module.exports = (router)=> {
    // Husk at smide isAuthorized på til sidst
    router.get('/api/v1/assets', getAssets);
    router.get('/api/v1/assets:id', getSingleAsset)
    router.post('/api/v1/assets', uploadAsset);
    router.delete('/api/v1/assets/:id', deleteAsset)
}