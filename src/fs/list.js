import { promises } from "fs";
import { resolve } from "path";
const { stdout } = process;

const __dirname = import.meta.dirname;
const filesFolderPath = resolve(__dirname, "files");

const list = async () => {
  try {
    await promises.access(filesFolderPath);

    const files = await promises.readdir(filesFolderPath);
    console.log(files);
    files.forEach((file) => stdout.write(file + "\n"));
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    } else {
      throw new Error(err.message);
    }
  }
};

await list();
