import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create Schema
const movie = new Schema({
    name: { type: String, required: true },
    desc: { type: String, default: '' },
    label: { type: String, required: true },
    image: { type: String, default: '' },
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
