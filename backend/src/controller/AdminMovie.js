import { MovieModel, VideoModel } from '../model/movie.js';
import { generrateLink, uploadFile } from '../utils/helper.js';
import uniqid from 'uniqid';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

class Admin {
    async createMovie(req, res, next) {
        const { name, desc } = req.body;
        const label = generrateLink(name);
        const Movie = new MovieModel({
            name,
            desc,
            label,
        });
        await Movie.save();
        res.status(301).json({ message: 'success!' });
    }
    async updateMovie(req, res, next) {
        const { label_ani } = req.params;
        const { data } = req.body;
        if(label_ani) {
            if(data.type === 'desc') {
                await MovieModel.findOneAndUpdate({ label: label_ani}, { desc: data.value }).exec();
            }else if(data.type === 'name') {
                const labelNew = generrateLink(data.value);
                await MovieModel.findOneAndUpdate({ label: label_ani }, { label: labelNew, name: data.value, }).populate('videos').exec(async function(err, result) {
                    const extImage = result.image.split('/')[2].split('.')[1];
                    const imageOldPath = result.image.split('/')[2];
                    const imageNewPath = `${labelNew}.${extImage}`;
                    // variables
                    result.image = `/img-mv/${imageNewPath}`;
                    // change fields
                    fs.renameSync(`${process.env.PATH_MOVIES_IMAGE}\\${imageOldPath}`, `${process.env.PATH_MOVIES_IMAGE}\\${imageNewPath}`);
                    //change path directory
                    await result.save();
                    if(result.videos.length) {
                        const pathOldVideo = result.videos[0].path.split('\\')[2];
                        for(let index in result.videos) {
                            const nameVideo = result.videos[index].path.split('\\')[3];
                            await VideoModel.updateOne({ _id: result.videos[index]._id }, { label: labelNew, path: `\\video\\${labelNew}\\${nameVideo}` });
                        }
                        fs.renameSync(`${process.env.PATH_MOVIE}\\${pathOldVideo}`, `${process.env.PATH_MOVIE}\\${labelNew}`);
                    }
                    // save mongoose
                });
            }
        }
        res.status(301).json({ message: 'success!' });
    }
    async imageMovie(req, res, next) {
        const { label_ani } = req.query;
        const nameImage = await uploadFile(req, process.env.PATH_MOVIES_IMAGE, label_ani, 'image');
        await MovieModel.findOneAndUpdate({ label: label_ani }, { image: `/img-mv/${nameImage}` });
        res.status(301).json({ message: 'success!' });
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
        for(let index in pathVideo) {
            ext = path.extname(`${process.env.PATH_MOVIE}\\${pathVideo[index]}`);
            fs.renameSync(`${process.env.PATH_UPLOAD_MOVIE}\\${pathVideo[index]}`, `${process.env.PATH_MOVIE}\\${label_ani}\\esp-${Movie.videos.length + 1}${ext}`, (err) => new Error(err));
            const Video = new VideoModel({
                label: label_ani,
                esp: Movie.videos.length + 1,
                path: `\\video\\${label_ani}\\esp-${Movie.videos.length + 1}${ext}`,
            });
            Movie.videos.push(Video._id);
            await Movie.save();
            await Video.save();
        }
        res.status(301).json({ message: 'success!' });
    }
    async removeVideoByLabel(req, res, next) {
        const { label_ani } = req.params;
        const { esp, id_esp } = req.query;
        console.log(id_esp)
        if(label_ani) {
            if(esp === 'all') {
                await VideoModel.deleteMany({ label: label_ani }).exec();
                await MovieModel.findOneAndUpdate({ label: label_ani }, { $set: { videos: [] }}).exec();
                fs.rmdirSync(`${process.env.PATH_MOVIE}\\${label_ani}`, { recursive: true });
            }else if(typeof parseInt(esp) === 'number') {
                await VideoModel.findOneAndDelete({ label: label_ani, esp: esp, _id: id_esp })
                .exec(async function(err, data) {
                    const movie = await MovieModel.findOneAndUpdate({ label: label_ani }, { $pull: { videos: { $eq: data._id }} });
                    if(movie.videos.length === 1) {
                        fs.rmdirSync(`${process.env.PATH_MOVIE}\\${data.path.replace(/\\esp-\d.mp4/g, '').replace('\\video', '')}`, { recursive: true });
                    }else {
                        fs.rmSync(`${process.env.PATH_MOVIE}\\${data.path.replace('\\video', '')}`);
                    }
                })
            }
        }
        res.status(301).json({ message: 'success!' });
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
                    });
                    fs.rmSync(`${process.env.PATH_MOVIE}\\${label_ani}`, { recursive: true, force: true });
                }
            }
            res.status(301).json({ message: 'success!' });
        } catch (error) {
            console.log(error)
            res.status(401).json({ message: error });
        }
    }
}

export default new Admin;
