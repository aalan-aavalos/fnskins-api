import cron from 'node-cron';
import { NodemailerSender } from '../utils/NodemailerSender';

class SkinCron {
    public static start() {
        cron.schedule('* * * * *', async () => { // Cron ejecutado cada minuto
            console.log('Cron ejecutado cada minuto');
            const destiny = "avalosalan789@gmail.com"
            // Llamada para enviar un correo de prueba
            try {
                /* await NodemailerSender.sendMail(
                    destiny,
                    'Correo de prueba',
                    '<h1>¡Hola desde Nodemailer!</h1>',
                    'Hola desde Nodemailer'
                ); */
                /* await EmailSender.sendEmail(
                    'Prueba de cron', // Asunto
                    '<strong>Este es un correo de prueba enviado cada minuto.</strong>', // Contenido HTML
                    'Este es un correo de prueba enviado cada minuto.', // Contenido de texto
                    process.env.RECIPIENT_EMAIL as string // Correo del destinatario desde las variables de entorno
                ); */
            } catch (error) {
                console.log('Error al enviar correo:', error);
            }
        });
    }
}

export { SkinCron };
