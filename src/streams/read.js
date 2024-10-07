import { createReadStream } from "fs";
import { resolve } from "path";
const { stdout } = process;

const __dirname = import.meta.dirname;
const filesFolderPath = resolve(__dirname, "files");
const fileToRead = resolve(filesFolderPath, "fileToRead.txt");

const read = async () => {
  const stream = createReadStream(fileToRead);

  stream.on("data", (chunk) => {
    stdout.write(chunk);
  });

  stream.on("end", () => {
    console.log("\nFile reading completed");
  });

  stream.on("error", (err) => {
    console.error("Read operation failed", err.message);
  });
};

await read();
