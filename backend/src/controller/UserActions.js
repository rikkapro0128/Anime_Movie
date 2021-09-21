class User {
    test(req, res, next) {
        res.status(301).json({ message: 'test user done!'});
    }
}

export default new User;
