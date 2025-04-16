const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const setupJobs = require('./utils/job');
const {createChannel , subscribeMessage} = require('./utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('./config/serverConfig');
const EmailService = require('./services/email-service')

const emailService = new EmailService();

const setupAndStartServer = async () =>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api', apiRoutes);

    const channel = await createChannel();
    subscribeMessage(channel , emailService.subscribeEvents.bind(emailService) , REMINDER_BINDING_KEY);

    app.listen(PORT , ()=>{
        console.log(`server is running at ${PORT}`);
        // setupJobs();
    });
}

setupAndStartServer();