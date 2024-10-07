const parseEnv = () => {
  const env = process.env;
  const prefix = "RSS_";
  const rssEnvVars = Object.entries(env)
    .filter(([key]) => key.startsWith(prefix))
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");

  console.log(rssEnvVars);
};

parseEnv();
