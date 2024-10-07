import { createWriteStream } from "fs";
import { resolve } from "path";

const __dirname = import.meta.dirname;
const filesFolderPath = resolve(__dirname, "files");
const fileToRead = resolve(filesFolderPath, "fileToWrite.txt");

const write = async () => {
  const stream = createWriteStream(fileToRead);
  process.stdout.write("Write some text \n");

  process.stdin.on("data", (chunk) => {
    stream.write(chunk);
  });

  process.on("SIGINT", () => {
    stream.end();
    console.log("Data recorded");
  });
};

await write();
