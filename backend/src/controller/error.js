exports.errorController = (req, res, next) => {
    res.status(404).json({mesasge: 'page not found'})
}