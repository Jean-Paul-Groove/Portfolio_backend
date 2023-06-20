import { Request, Response, NextFunction } from "express";
import transporter from "../config/nodemailer.config";
import { MessageFormContent } from "../models/MessageFormContent";
import sendEmail from "../utils/sendEmail.utils";
const logger = require("../config/logger.config");

export async function sendMessage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const messageFormContent: MessageFormContent = req.body;
    if (messageFormContent) {
      const { nom, email, message } = messageFormContent;
      sendEmail(messageFormContent);
      res.status(200).json({ message: "Votre message a bien été envoyé" });
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    }
    res.status(500).json({
      message: "Une erreur est survenue, veuillez réessayer plus tard",
    });
  }
}
