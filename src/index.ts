import express from 'express';
import routes from './routes';
import cors from 'cors';
import 'express-async-errors';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use(routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
