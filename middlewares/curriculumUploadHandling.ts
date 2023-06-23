const handleCurriculumUpload = require("multer");
import { Request } from "express";
import { Multer } from "multer";
const storage = handleCurriculumUpload.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: CallableFunction
  ) => {
    callback(null, "public");
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: CallableFunction
  ) {
    const name = file.originalname.split(" ").join("_");
    cb(null, name + Date.now() + ".pdf");
  },
});

const formatAccepted = "application/pdf";

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: CallableFunction
) => {
  if (formatAccepted == file.mimetype) {
    cb(null, true);
  } else {
    return cb(new Error("Ce type de fichier n'est pas accepté"), false);
  }
};

const limits = { fileSize: 10000000 };
module.exports = handleCurriculumUpload({
  storage,
  fileFilter,
  limits,
}).single("file");
