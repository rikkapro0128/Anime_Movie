import formidable from 'formidable';
import os from 'os';
import fsPromises from 'promise-fs';
import uniqid from 'uniqid';

function transferCharacterSpecial(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
    str = str.replace(/\u02C6|\u0306|\u031B/g, "");
    str = str.replace(/\W/g, " ");
    str = str.replace(/\s+/g, " ");
    str = str.trim();
    return str;
}

function uploadFile(Request, dirSave = '', reName = '', field = '', option = {
    maxFields: 1000,
    maxFieldsSize: 20 * 1024 * 1024,
    maxFileSize: 1000 * 1024 * 1024,
    minFileSize: 1,
    allowEmptyFiles: true,
    keepExtensions: true,
    encoding: 'utf-8',
    hashAlgorithm: false,
    uploadDir: dirSave || os.tmpdir(),
    multiples: false,
    enabledPlugins: ['octetstream', 'querystring', 'multipart', 'json'],
    fileWriteStreamHandler: null,
    defaultInvalidName: 'invalid-name',
}) {
    return new Promise((resolve, reject) => {
        const setForm = formidable(option);
        setForm.parse(Request, async (err, fields, files) => {
            if (err) {
                reject(err);
            }
            const re_name = `${reName}.${files[`${field || 'image'}`].type.split('/')[1]}`;
            await fsPromises.rename(files[`${field || 'image'}`].path, `${dirSave}\\${reName}.${files[`${field || 'image'}`].type.split('/')[1]}`);
            resolve(re_name);
        });
    })
}

function generrateLink(name) {
    const label = transferCharacterSpecial(name);
    return label.split(' ').join('-') + uniqid.time('-', '-movie');
}

export {
    uploadFile,
    generrateLink,
    transferCharacterSpecial,
}
