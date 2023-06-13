import { Request, Response, NextFunction } from "express";
import transporter from "../config/nodemailer.config";
const logger = require("../config/logger.config");

export async function sendMessage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { nom, email, message } = req.body;
    await transporter.sendMail({
      from: email,
      sender: process.env.SENDING_EMAIL_USER,
      to: [process.env.DESTINATION_EMAIL],
      subject: "Message envoyé depuis le Portfolio par " + nom,
      text: message,
    });
    res.status(200).json({ message: "Votre message a bien été envoyé" });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    }
    res.status(500).json({
      message: "Une erreur est survenue, veuillez réessayer plus tard",
    });
  }
}
