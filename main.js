const app = require ('./app')
const config = require('config')
const mongoose = require('mongoose')

const PORT = config.get("app.port") || process.exit(1);

async function start() {
    try {
        await mongoose.connect(
            config.get('mongo.uri'), config.get('mongo.connectOptions')
        );
        app.listen(PORT, () => console.log(`server is working on ${PORT}`))
    } catch (e) {
        console.log(e)
        console.error('Server Error: ', e.message);
        process.exit(1);
    }
}

start();
