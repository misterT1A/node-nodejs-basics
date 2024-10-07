import { spawn } from "child_process";
import { resolve } from "path";

const __dirname = import.meta.dirname;

const filesFolderPath = resolve(__dirname, "files");
const workerFile = resolve(filesFolderPath, "script.js");

const spawnChildProcess = async (args) => {
  const childProcess = spawn("node", [workerFile, ...args], {
    stdio: ["pipe", "pipe", "inherit"],
  });

  process.stdin.pipe(childProcess.stdin);

  childProcess.stdout.pipe(process.stdout);

  childProcess.on("close", (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

spawnChildProcess(["arg1", "arg2", "arg3"]);
