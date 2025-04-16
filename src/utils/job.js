const cron = require("node-cron");

const sender = require("../config/emailConfig");
const EmailService = require("../services/email-service");

const setupJobs = () => {
  cron.schedule("*/2 * * * *", async () => {
    const repo = new EmailService();
    const response = await repo.fetchPendingEmails();
    response.forEach((email) => {
      sender.sendMail({
        from: '"ReminderService"<krrishkumar218@gmail.com>',
        to: email.recipientEmail,
        subject: email.subject,
        text: email.content,
      }, async (err , data) =>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
            await repo.updateTicket(email.id , {status:"SUCCESS"})
        }
      });
    });
    console.log(response);
  });
};

module.exports = setupJobs;
