import app from "./app";
import http from "http"

const PORT = 3000;


try {
  const httpServer = http.createServer(app);
  httpServer.listen(PORT, () => {
  console.log(`HTTP Server running on port ${PORT}`);
});
  }
catch (e) {
  console.log("HTTP server start failed " + e);
}
