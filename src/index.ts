/* eslint-disable no-console */
import { config } from 'dotenv';
import app from './app/app';
import { requestValidationMiddleware } from './helpers/validation';

config();

const appPort = process.env.EXPRESS_PORT || 3000;

app.listen(appPort, async () => {
  console.log(`Listening on port ${appPort}`);
});
