import { promises } from "fs";
import { resolve } from "path";

const __dirname = import.meta.dirname;
const targetFolderPath = resolve(__dirname, "files");
const newFolderPath = resolve(__dirname, "files-copy");

const copy = async () => {
  try {
    await promises.access(targetFolderPath);

    try {
      await promises.access(newFolderPath);
      throw new Error("FS operation failed");
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw new Error();
      }
    }

    const files = await promises.readdir(targetFolderPath);
    await promises.mkdir(newFolderPath, { recursive: true });

    for (const file of files) {
      const targetFile = resolve(targetFolderPath, file);
      const newFile = resolve(newFolderPath, file);

      await promises.copyFile(targetFile, newFile);
    }
  } catch {
    throw new Error("FS operation failed");
  }
};

await copy();
