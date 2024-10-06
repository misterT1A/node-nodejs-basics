import { promises } from "fs";
import { resolve } from "path";
const { stdout } = process;

const __dirname = import.meta.dirname;
const filesFolderPath = resolve(__dirname, "files");
const fileToRead = resolve(filesFolderPath, "fileToRead.txt");

const read = async () => {
  try {
    await promises.access(fileToRead);

    const files = await promises.readFile(fileToRead, "utf-8");

    stdout.write(files);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    } else {
      throw new Error(err.message);
    }
  }
};

await read();
