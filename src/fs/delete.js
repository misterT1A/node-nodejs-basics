import { promises } from "fs";
import { resolve } from "path";

const __dirname = import.meta.dirname;
const filesFolderPath = resolve(__dirname, "files");
const deleteFile = resolve(filesFolderPath, "fileToRemove.txt");

const remove = async () => {
  try {
    await promises.access(deleteFile);

    await promises.unlink(deleteFile);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    } else {
      throw new Error();
    }
  }
};

await remove();
