import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Init the Server');
});

app.listen(3000, () => {
  console.log('started');
});
