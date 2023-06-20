const sharp = require("sharp");
import { NextFunction, Request, Response } from "express";

function optimizeImage(req: Request, res: Response, next: NextFunction) {
  if (req.file) {
    const name =
      req.file.originalname.split(" ").join("_") + Date.now() + ".webp";
    sharp(req.file.buffer)
      .resize(500, 500, { fit: "inside" })
      .rotate()
      .toFormat("webp")
      .toFile("public/" + name);

    req.body.img = `${req.protocol}://${req.get("host")}/public/${name}`;
  }
  next();
}

module.exports = optimizeImage;
