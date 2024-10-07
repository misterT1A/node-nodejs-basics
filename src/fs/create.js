import { promises } from "fs";
import { join } from "path";

const __dirname = import.meta.dirname;
const dirfile = join(__dirname, "files", "fresh.txt");
const content = "I am fresh and young";

const create = async () => {
  try {
    await promises.writeFile(dirfile, content, { flag: "wx" });
  } catch {
    throw new Error("FS operation failed");
  }
};

await create();
