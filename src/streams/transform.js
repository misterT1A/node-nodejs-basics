import { Transform, pipeline } from "stream";

const reverseTransform = new Transform({
  transform(chunk, _, callback) {
    const reversed = chunk.toString().split("").reverse().join("");
    callback(null, reversed);
  },
});

const transform = async () => {
  process.stdout.write("Write some text \n");
  pipeline(process.stdin, reverseTransform, process.stdout, (err) => {
    if (err) {
      throw err;
    }
  });
};

await transform();
