module.exports = (express) => {
    const route = express.Router()

    route.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )

        next()
    })

    route.get('/health-check', (req, res) => {
        res.status(200).send({ message: "App Is Running Successfully!" });
    });
    
    require('../routes/auth')(route);
    require('../routes/user')(route);
    require('../routes/item')(route);
    require('../routes/category')(route);

    return route;
}