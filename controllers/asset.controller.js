const Asset = require('../models/asset.model');
const path = require('path');
const fs = require('fs');

function uploadAsset(req, res, next) {
    if(!req.files){
        res.status(400).end();
        return
    }
    try {
        // Skal tjekke OS med modulet OS
        Asset.create({
            name: req.files.files.name,
            url: "//localhost:3000/file-bucket/" + req.files.files.path.split("\\").pop()
        })
    } catch (error) {
        console.error(error);
        res.status(400).end();
    }
    res.send("Files uploaded.")
}
async function getAssets(req, res, next){
    try {
        let asset = await Asset.findAll();
        res.json(asset)

    } catch (error) {
        console.error()
    }
}

async function deleteAsset(req, res, next){
    try {
        let asset = await Asset.findByPk(req.params.id);
        let fileName = asset.url.split("/").pop();
        console.log('', fileName)
        console.log(path.join(__dirname, "..", "assets", fileName))
        fs.unlinkSync(path.join(__dirname, "..", "assets", fileName));

        let result = await Asset.destroy({
            where: {
                id: req.params.id
            }
        });
        if(!result){
            res.status(404).end();
            return;
        }
        res.status(204).end();
    } catch (error) {
        
    }
}

async function getSingleAsset(){
    if(!req.params.id){
        res.status(400).end();
        return
    }
    let asset = await Asset.findByPk(req.params.id);
    if(!asset){
        res.status(404).end();
    }

    res.send(asset).end();
}

module.exports = {
    uploadAsset,
    getAssets,
    deleteAsset,
    getSingleAsset
}   