import { promises } from "fs";
import { resolve } from "path";

const __dirname = import.meta.dirname;
const filesFolderPath = resolve(__dirname, "files");
const wrongFile = resolve(filesFolderPath, "wrongFilename.txt");
const properFile = resolve(filesFolderPath, "properFilename.md");

const rename = async () => {
  try {
    await promises.access(wrongFile);

    try {
      await promises.access(properFile);
      throw new Error("FS operation failed");
    } catch (err) {
      if (err.code !== "ENOENT") throw new Error();
    }

    await promises.rename(wrongFile, properFile);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    } else {
      throw new Error();
    }
  }
};

await rename();
