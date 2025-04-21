import nodemailer, { Transporter } from 'nodemailer';

class NodemailerSender {
    private static transporter: Transporter;

    static {
        this.transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    public static async sendMail(to: string, subject: string, html: string, text?: string): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to,
                subject,
                html,
                text,
                headers: {
                    'X-Priority': '1',
                    'X-MSMail-Priority': 'High',
                    'Importance': 'high'
                },
            });
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            throw error;
        }
    }
}

export { NodemailerSender }