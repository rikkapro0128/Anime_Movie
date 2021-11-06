import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create Schema
const movie = new Schema({
    name: { type: String, required: true },
    desc: { type: String, default: '' },
    label: { type: String, required: true },
    image: { type: String, default: '' },
    infomation: {
        'date': { type: String, default: '' },
        'loop': { type: String, default: '' },
        'state-movie': { type: String, default: '' },
        'time': { type: String, default: '' },
        'season': { type: String, default: '' },
        'translate': { type: String, default: '' },
        'quality': { type: String, default: '' },
        'nation': { type: String, default: '' },
        'genres': { type: Array, default: [] },
        'author': { type: String, default: '' },
        'studio': { type: String, default: '' },
    },
    videos: [{ type: Schema.Types.ObjectId, ref: 'videos' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }]
});

const videos = new Schema({
    label: { type: String, required: true },
    esp: { type: String, default: '' },
    path: { type: String, default: '' },
    createAt: { type: Date, default: Date.now() }
});

// create models
const VideoModel = mongoose.model('videos', videos);
const MovieModel = mongoose.model('movie', movie);

export { 
    MovieModel,
    VideoModel,
};
