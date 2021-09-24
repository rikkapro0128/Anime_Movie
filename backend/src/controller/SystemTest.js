import fs from 'fs';
import uniqid from 'uniqid';

class SystemTest {
    uploadImage(req, res, next) {
        console.log(req)
        const storeImage = 'd:/test/upload-image';
        const checkStore = fs.existsSync(storeImage);
        if(!checkStore) {
            fs.mkdirSync(storeImage, { recursive: true });
        }
        const nameImage = uniqid.time('demo-', '-done');
        const extImage = req.header('Content-type').split('/')[1];
        const path = `${storeImage}/${nameImage}.${extImage}`; 
        const readable = fs.createWriteStream(path);
        req.on('data', function(chunk) {
            readable.write(chunk);
        }).on('error', function() {
            res.status(301).json({ message: 'SUCCESSFUL!' });
        })
        res.status(301).json({ message: 'SUCCESSFUL!' });
    }
}

export default new SystemTest;
