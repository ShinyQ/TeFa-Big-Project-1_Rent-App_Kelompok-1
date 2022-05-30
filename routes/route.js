module.exports = (express) => {
    const route = express.Router()

    route.get('/health-check', (req, res) => {
        res.send('App Is Running Successfully')
    });
    
    return route;
}