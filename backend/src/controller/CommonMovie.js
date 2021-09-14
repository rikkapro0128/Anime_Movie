import { MovieModel } from '../model/movie.js';
import uniqid from 'uniqid';

class Admin {
    async getMovies(req, res, next) {
        const Movie = await MovieModel.find({}).exec();
        res.status(301).json(Movie);
    }
    async getMovieByLabel(req, res, next) {
        const optionQuery = Object.keys(req.query);
        const label_ani = req.params.label;
        let Movie;
        if(!optionQuery.length) { Movie = await MovieModel.findOne({ label: label_ani }).exec(); }
        else if(optionQuery.includes('esp')) { 
            if(req.query.esp === 'all') {
                Movie = await MovieModel.findOne({ label: label_ani }).populate('videos').exec();
            }else if(typeof parseInt(req.query.esp)) {
                Movie = await MovieModel.findOne({ label: label_ani }).populate({ path: 'videos', match: { esp: parseInt(req.query.esp) }}).exec();
            }
        };
        res.status(301).json(Movie);
    }
}

export default new Admin;
