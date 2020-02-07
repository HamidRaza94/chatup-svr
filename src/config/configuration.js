import { config } from 'dotenv';

config();

const envVars = process.env;

const configuration = Object.freeze({
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  secretKey: envVars.SECRET_KEY,
});

export default configuration;
