import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

class EmailSender {
    private static mailerSend: MailerSend;

    static {
        this.mailerSend = new MailerSend({
            apiKey: process.env.API_KEY as string,
        });
    }

    // Método para enviar correos
    public static async sendEmail(
        subject: string,
        htmlContent: string,
        textContent: string,
        recipientEmail: string
    ): Promise<void> {
        try {
            const sentFrom = new Sender(
                process.env.SENDER_EMAIL as string,
                process.env.SENDER_NAME as string
            );

            const recipients = [
                new Recipient(recipientEmail)
            ];

            const emailParams = new EmailParams()
                .setFrom(sentFrom)
                .setTo(recipients)
                .setReplyTo(sentFrom)
                .setSubject(subject)
                .setHtml(htmlContent)
                .setText(textContent);
                
            await this.mailerSend.email.send(emailParams);
            console.log('Correo enviado con éxito');
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            throw new Error('No se pudo enviar el correo');
        }
    }
}

export { EmailSender };
