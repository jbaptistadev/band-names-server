import express, { Application } from 'express';

class ExpressServer {
  public app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Serve running on port', this.port);
    });
  }
}

export default ExpressServer;
