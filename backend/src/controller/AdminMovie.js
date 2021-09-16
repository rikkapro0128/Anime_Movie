import { MovieModel, VideoModel } from '../model/movie.js';
import { transferCharacterSpecial, uploadFile } from '../utils/helper.js';
import uniqid from 'uniqid';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

class Admin {
    async createMovie(req, res, next) {
        const { name, desc } = req.body;
        const label = transferCharacterSpecial(name);
        const Movie = new MovieModel({
            name,
            desc,
            label: label.split(' ').join('-') + uniqid.time('-', '-movie'),
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
                await MovieModel.findOneAndUpdate({ label: label_ani}, { name: data.value }).exec();
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
        const ext = path.extname(`${process.env.PATH_MOVIE}\\${pathVideo}`);
        const check = fs.existsSync(`${process.env.PATH_MOVIE}\\${label_ani}`);
        if(!check) { fs.mkdirSync(`${process.env.PATH_MOVIE}\\${label_ani}`, { recursive: true }); }
        fs.renameSync(`${process.env.PATH_UPLOAD_MOVIE}\\${pathVideo}`, `${process.env.PATH_MOVIE}\\${label_ani}\\esp-${Movie.videos.length + 1}${ext}`, (err) => new Error(err));
        const Video = new VideoModel({
            label: label_ani,
            esp: Movie.videos.length + 1,
            path: `\\video\\${label_ani}\\esp-${Movie.videos.length + 1}${ext}`,
        });
        Movie.videos.push(Video._id);
        await Movie.save();
        await Video.save();
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
}

export default new Admin;
