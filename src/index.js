const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

// const {sendBasicEmail} = require('./services/email-service')
const setupJobs = require('./utils/job');

const setupAndStartServer = async () =>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api', apiRoutes);

    app.listen(PORT , ()=>{
        console.log(`server is running at ${PORT}`);

        // sendBasicEmail(
        //     "'Airline Support' <krrishkumar218@gmail.com>" ,
        //     'krrishkumar000125@gmail.com',
        //     'This is a testing email',
        //     'Hey , how are you , I hope you like the support'
        // )

       setupJobs();
    });

}

setupAndStartServer();