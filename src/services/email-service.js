const sender = require("../config/emailConfig");
const TicketRepository = require("../repository/ticket-repository");

class EmailService {
  constructor() {
    this.ticketRepository = new TicketRepository();
  }

  async sendBasicEmail(mailFrom, mailTo, mailSubject, mailBody) {
    try {
      const response = await sender.sendMail({
        from: mailFrom,
        to: mailTo,
        subject: mailSubject,
        text: mailBody,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async fetchPendingEmails(timestamp) {
    try {
      const response = await this.ticketRepository.get({status:"PENDING"});
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createNotification(data){
    try {
        const response = await this.ticketRepository.create(data);
        return response;
      } catch (error) {
        console.log(error);
      }
  }

  async updateTicket(ticketId , data){
    try {
      const response = await this.ticketRepository.update(ticketId ,data);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = EmailService;
