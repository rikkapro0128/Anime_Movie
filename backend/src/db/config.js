export default async function(mongoose) {
    try {
        await mongoose.connect('mongodb://localhost:27017/anime-movies')
        console.log('Connect to Database successful!');
    } catch (error) {
        console.log('Connect to Database error!');
    }
}
