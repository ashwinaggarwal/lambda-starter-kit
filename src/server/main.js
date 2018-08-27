import express from 'express';
import authorizer from '../common/auth/local-authorize';
import { addFunctions } from './addFunctions';

const { PORT } = process.env;
const app = express();

app.use(authorizer);

app.get('/', (request, response) => {
  response.status(200).send('That\'s one small step for man, one giant leap for mankind - Neil Armstrong');
});

app.get('/health', (request, response) => {
  response.status(200).send('I\'m healthy!');
});

addFunctions(app).then(() => {
  app.listen(PORT, (err) => {
    if (err) {
      console.error(err);
    }
    console.info(`Listening on port ${PORT}. Open localhost:${PORT} in your browser`);
  });
});
