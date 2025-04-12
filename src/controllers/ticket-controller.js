const EmailService = require('../services/email-service');

const ticketService = new EmailService();

const create = async (req , res) => {
    try {
        const response = await ticketService.createNotification(req.body);
        return res.status(201).json({
            data: response,
            success:true,
            err:{},
            message: 'Successfully registered an email reminder'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            message:'Could not create the ticket',
            err:error,
            success:false
        })
    }
}

module.exports = {
    create
}