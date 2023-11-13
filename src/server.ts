import express from 'express';
import bodyParser from 'body-parser';
import tokenController from './controllers/tokenController';
import cardController from './controllers/cardController';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/token', tokenController.createToken);

app.get('/api/card', cardController.getCardDetails);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
