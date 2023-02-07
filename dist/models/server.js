import express from 'express';
class Server {
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
export default Server;
//# sourceMappingURL=server.js.map