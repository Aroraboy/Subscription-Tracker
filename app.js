import express from 'express';

import { PORT } from './config/env.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Subscription Tracker!');
});

app.listen( PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;