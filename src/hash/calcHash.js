import { createHash } from "crypto";
import { createReadStream } from "fs";
import { resolve } from "path";

const __dirname = import.meta.dirname;
const filesFolderPath = resolve(__dirname, "files");
const fileToRead = resolve(filesFolderPath, "fileToCalculateHashFor.txt");

const calculateHash = async () => {
  const hash = createHash("sha256");
  const stream = createReadStream(fileToRead);

  stream.on("data", (chunk) => {
    hash.update(chunk);
  });

  stream.on("end", () => {
    const hex = hash.digest("hex");
    console.log(hex);
  });

  stream.on("error", () => {
    console.error("Hash operation failed");
  });
};

await calculateHash();
