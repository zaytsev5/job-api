import cors from 'cors';
import express from 'express';

import { RegisterRoutes } from './routes/routes';
import { ValidateError } from 'tsoa';


class App {
  public readonly app: express.Express;
  public readonly port: string | number;
  // public readonly env: boolean;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    this.middleware();
    this.routes();
    this.handleError();
  }

  public async start() {
    // start server
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  private middleware(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  public express(): express.Express {
    return this.app;
  }

  private routes(): void {
    RegisterRoutes(this.app);
  }

  private handleError(): void {
    this.app.use(function errorHandler(
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) {
      if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);

        return res.status(422).json({
          status: false,
          message: 'Validation Failed',
          details: Object.values(err?.fields)[0],
        });
      }

      if (err instanceof Error) {
        // return status and message for error API
        return res.status(500).json({
          message: err.message,
          status: false,
          stack: err.stack,
        });
      }

      next();
    });
  }
}

export default App;
