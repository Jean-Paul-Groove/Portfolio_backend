import fs, { constants } from "fs";

export default function checkIfFileExists(filePath: string): boolean {
  let fileExistence = false;
  try {
    fs.accessSync(filePath);
    fileExistence = true;
  } catch {
    fileExistence = false;
  } finally {
    return fileExistence;
  }
}
