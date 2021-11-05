import { MovieModel, VideoModel } from '../model/movie.js';
import { generrateLink, uploadFile } from '../utils/commom.js';
// import uniqid from 'uniqid';
import path from 'path';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
import fs from 'fs';

class Admin {
    getPathDir(req, res, next) {
        res.status(301).json({ path: process.env.PATH_UPLOAD_MOVIE });
    }
    async createMovie(req, res, next) {
        const { name, desc } = req.body;
        const nameParse = String(name).toLowerCase();
        const label = generrateLink(nameParse);
        const Movie = new MovieModel({
            name: nameParse,
            desc,
            label,
        });
        await Movie.save();
        res.status(301).json({ message: 'SUCCESSFUL!' });
    }
    async updateMovie(req, res, next) {
        const { label_ani } = req.params;
        const { data } = req.body;
        let newLabel;
        if(label_ani) {
            if(data.type === 'desc') {
                await MovieModel.findOneAndUpdate({ label: label_ani}, { desc: data.value }).exec();
            }else if(data.type === 'name') {
                const movie = await MovieModel.findOne({ label: label_ani });
                    if(movie.name !== data.value) {
                        newLabel = generrateLink(data.value);
                        await MovieModel.findOneAndUpdate({ label: label_ani }, { label: newLabel, name: data.value, }).populate('videos')
                        .exec(async function(err, result) {
                            if(String(result?.image).length > 0) {
                                const extImage = result?.image.split('/')[2].split('.')[1];
                                const imageOldPath = result?.image.split('/')[2];
                                const imageNewPath = `${newLabel}.${extImage}`;
                                // change fields
                                result.image = `/img-mv/${imageNewPath}`;
                                fs.renameSync(`${process.env.PATH_MOVIES_IMAGE}\\${imageOldPath}`, `${process.env.PATH_MOVIES_IMAGE}\\${imageNewPath}`);
                                //change path directory
                                await result.save();
                            }
                            if(result?.videos.length > 0) {
                                const pathOldVideo = result.videos[0].path.split('\\')[2];
                                for(let index in result.videos) {
                                    const nameVideo = result.videos[index].path.split('\\')[3];
                                    await VideoModel.updateOne({ _id: result.videos[index]._id }, { label: newLabel, path: `\\video\\${newLabel}\\${nameVideo}` });
                                }
                                fs.renameSync(`${process.env.PATH_MOVIE}\\${pathOldVideo}`, `${process.env.PATH_MOVIE}\\${newLabel}`);
                            }
                    });
                }
            }
        }
        res.status(301).json({ message: 'SUCCESSFUL', newLabel: newLabel ?? null });
    }
    async imageMovie(req, res, next) {
        const { label_ani } = req.query;
        const nameImage = await uploadFile(req, process.env.PATH_MOVIES_IMAGE, label_ani, 'image');
        await MovieModel.findOneAndUpdate({ label: label_ani }, { image: `/img-mv/${nameImage}` });
        res.status(301).json({ message: 'SUCCESSFUL!' });
    }
    async postVideoByLabel(req, res, next) {
        const { label_ani } = req.query;
        const { pathVideo } = req.body;
        // const unid = (/-S+-movie/g.exec(label_ani))[0].split('-')[1];
        const Movie = await MovieModel.findOne({ label: label_ani })
        .populate('videos')
        .exec();
        let ext;
        const check = fs.existsSync(`${process.env.PATH_MOVIE}\\${label_ani}`);
        if(!check) { fs.mkdirSync(`${process.env.PATH_MOVIE}\\${label_ani}`, { recursive: true }); }
        if(pathVideo.length) {
            const dirNeedRemove = [];
            for(let pathItem of pathVideo) {
                if(String(pathItem).length > 0) {
                    // handle storage single or muti files
                    ext = path.extname(`${process.env.PATH_MOVIE}\\${pathItem}`);
                    // new RegExp(`esp-\\d+${ext}`, 'g')
                    const pathArr = String(pathItem).split('/');
                    const checkFileOrDir = pathArr.length === 1 ? { type: 'file', path: pathArr[0] } : { type: 'dir', path: pathArr[0] };
                    if(checkFileOrDir.type === "file") {
                        // handle single file
                        await storage(String(checkFileOrDir.path).replace('/', '\\'));
                    }else if(checkFileOrDir.type === "dir") {
                        // handle muti file
                        await storage(String(pathItem).replace('/', '\\'));
                        if(!dirNeedRemove.includes(checkFileOrDir.path)) {
                            dirNeedRemove.push(checkFileOrDir.path);
                        }
                    }
                    async function storage(path) {
                        if(String(path).length > 0) {
                            const newPath = `${process.env.PATH_MOVIE}\\${label_ani}\\esp-${Movie.videos.length + 1}${ext}`;
                            fs.renameSync(`${process.env.PATH_UPLOAD_MOVIE}\\${path}`, newPath, (err) => new Error(err));
                            const Video = new VideoModel({
                                label: label_ani,
                                esp: Movie.videos.length + 1,
                                path: `\\video\\${label_ani}\\esp-${Movie.videos.length + 1}${ext}`,
                            });
                            Movie.videos.push(Video._id);
                            await Movie.save();
                            await Video.save();
                        }
                    }
                }
            }
            for(let item of dirNeedRemove) {
                const checkPathDirDone = `${process.env.PATH_UPLOAD_MOVIE}\\${item}`;
                if(fs.existsSync(checkPathDirDone)) {
                    fs.rmSync(checkPathDirDone, { recursive: true, force: true });
                }
            }
        }
        res.status(301).json({ message: 'SUCCESSFUL!' });
    }
    async removeVideoByLabel(req, res, next) {
        const { label_ani } = req.params;
        const { esp, id_esp } = req.query;
        if(label_ani) {
            if(esp && id_esp) {
                if(esp === 'all') {
                    const path = `${process.env.PATH_MOVIE}\\${label_ani}`;
                    await VideoModel.deleteMany({ label: label_ani }).exec();
                    await MovieModel.findOneAndUpdate({ label: label_ani }, { $set: { videos: [] }}).exec();
                    const check = fs.existsSync(path);
                    if(!check) {
                        fs.rmSync(path, { recursive: true, force: true });
                    }
                }else if(typeof parseInt(esp) === 'number') {
                    await VideoModel.findOneAndDelete({ label: label_ani, esp: esp, _id: id_esp })
                        .exec(async function(err, data) {
                            const movie = await MovieModel.findOneAndUpdate({ label: label_ani }, { $pull: { videos: { $eq: data._id }} });
                            if(movie.videos.length <= 1) {
                                const path = `${process.env.PATH_MOVIE}\\${data.path.replace(/\\esp-\d+.mp4/g, '').replace('\\video', '')}`;
                                const check = fs.existsSync(path);
                                if(check) {
                                    fs.rmSync(path, { recursive: true, force: true });
                                }
                            }else {
                                const path = `${process.env.PATH_MOVIE}\\${data.path.replace('\\video', '').replace('\'', '\\')}`;
                                const check = fs.existsSync(path);
                                if(check) {
                                    fs.rmSync(path, { recursive: true, force: true });
                                }
                            }
                        })
                }
            }
        }
        res.status(301).json({ message: 'SUCCESSFUL!' });
    }
    async removeMovieByLabel(req, res, next) {
        const { label_ani } = req.params;
        const { select } = req.query;
        try {
            if(label_ani) {
                if(select === 'all') {
    
                }else {
                    await MovieModel.findOneAndDelete({ label: label_ani }).populate('videos').exec(async function(err, result) {
                        await VideoModel.deleteMany({ label: label_ani });
                        const pathVideo = `${process.env.PATH_MOVIE}\\${result.label}`;
                        const pathImage = `${process.env.PATH_MOVIES_IMAGE}\\${String(result.image).split('/img-mv')[1]}`;
                        const checkPathVideo = fs.existsSync(pathVideo);
                        const checkPathImage = fs.existsSync(pathImage);
                        if(checkPathVideo) {
                            fs.rmSync(pathVideo, { recursive: true, force: true });
                        }
                        if(checkPathImage) {
                            fs.rmSync(pathImage, { recursive: true, force: true });
                        }
                    });
                }
            }
            res.status(301).json({ message: 'SUCCESSFUL!' });
        } catch (error) {
            res.status(401).json({ message: error });
        }
    }
}

export default new Admin;
