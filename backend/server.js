require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 4005;
const app = require('./src/app');


mongoose.connect(
    process.env.MONGODB_URI,
    {}).then(result => {
        console.log("db conntected")
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }
    ).catch(err => console.log(err))
