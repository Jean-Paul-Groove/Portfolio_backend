const handleImageUpload = require("multer");
const storage = handleImageUpload.memoryStorage();
const sharp = require("sharp");
import { NextFunction, Request, Response } from "express";

const extensionsSupported: { [key: string]: string } = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/tiff": "tiff",
};

const fileFilter = (req: Request, file: any, cb: CallableFunction) => {
  if (extensionsSupported[file.mimetype]) {
    cb(null, true);
  } else {
    return cb(new Error("Ce type de fichier n'est pas accepté"), false);
  }
};

const limits = { fileSize: 10000000 };
module.exports = handleImageUpload({ storage, fileFilter, limits }).single(
  "file"
);
