import { Worker } from "worker_threads";
import os from "os";
import { resolve } from "path";

const __dirname = import.meta.dirname;
const workerFile = resolve(__dirname, "worker.js");

const cpuCount = os.cpus().length;

const worker = (n) => {
  return new Promise((resolve) => {
    const worker = new Worker(workerFile);

    worker.postMessage(n);

    worker.on("message", (result) => {
      resolve(result);
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        resolve({ status: "error", data: null });
      } else {
        console.error("Worker finished successfully");
      }
    });
  });
};

const performCalculations = async () => {
  const workers = new Array(cpuCount).fill(null).map((_, index) => {
    return worker(10 + index);
  });

  const result = (await Promise.allSettled(workers)).map((elem) => elem.value);

  console.log(result);
};

await performCalculations();
