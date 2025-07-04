export function deleteAccountConfirmationTemplate(
  name: string,
  code: string
): string {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #333;">Hola ${name ?? "usuario"} 👋</h2>
        <p style="font-size: 16px; color: #555;">
          Has solicitado eliminar tu cuenta de <strong>Fortnite Skins</strong>. Para confirmar esta acción, por favor utiliza el siguiente código:
        </p>
        <div style="margin: 20px 0; padding: 15px; background-color: #fff3f3; border-left: 4px solid #f44336; font-size: 20px; font-weight: bold; letter-spacing: 2px; color: #333;">
          <code style="font-family: 'Courier New', monospace;">${code}</code>
        </div>
        <p style="font-size: 14px; color: #888;">
          Este código es válido por solo unos minutos. Si tú no solicitaste eliminar tu cuenta, ignora este mensaje y no compartas el código con nadie.
        </p>
        <p style="font-size: 14px; color: #aaa; margin-top: 30px;">
          — Tu equipo de FN Skins
        </p>
      </div>
    </div>
  `;
}
