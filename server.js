
const express = require('express');
const morgan = require('morgan')
const router = express.Router();
const app = express();

const bodyParser = require('body-parser');
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config()
const cors = require('cors');
app.options('*', cors())
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles : true,
  }));
// Routes
app.use('/cir/api/v1/cms', require('./app/routes/cms/cms'));
app.use('/cir/api/v1/mobile', require('./app/routes/mobile/mobile'));

router.get('/test', (req, res, err)=>{
    res.render('hello world.')
})

app.use((req, res) => {
    return res.status(404).send({
        code: 404,
        message: 'requested route is not available',
    });
});

const sequelize = require('./database/sequelize/sequelize');

const server = app.listen(process.env.PORT|| 3000,  async (error) => {
    if(error){console.log("App Error", error);}
    {
    console.log(`server is running on http://localhost:${process.env.PORT}`);
    sequelize.instance.authenticate().then(function(){
        console.log("DB Connection Successful");
    }).catch(function(error){
        console.log("Unable to connect to database", error);
    });
}

});

/*******************************************************/
server.timeout = 80 * 1000;
/*******************************************************/
module.exports = server;



// https://documenter.getpostman.com/view/14064210/Uyr7Gdrt