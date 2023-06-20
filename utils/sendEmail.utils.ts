import transporter from "../config/nodemailer.config";
import { MessageFormContent } from "../models/MessageFormContent";

export default async function sendEmail(
  messageFormContent: MessageFormContent
) {
  const { email, nom, message } = messageFormContent;
  await transporter.sendMail(
    {
      subject: "Message envoyé depuis le Portfolio par " + nom,
      text: `Ce message a été envoyé par ${nom} qui est joignable à l'adresse: ${email}
          Message: ${message}`,
    },
    (error: Error, info: any) => {
      if (error) {
        throw error;
      } else {
        if (info.rejected.length > 0) {
          throw new Error(
            `Message from ${email} rejected from the destination Email`
          );
        }
      }
    }
  );
}
