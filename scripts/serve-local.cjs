const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const port = Number(process.argv[2] || process.env.PORT || 4173);
const host = "127.0.0.1";

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png"
};

function getFilePath(urlPath) {
  const safePath = decodeURIComponent(urlPath.split("?")[0]);
  const relative = safePath === "/" ? "index.html" : safePath.replace(/^\/+/, "");
  return path.join(root, relative);
}

function sendFile(filePath, response) {
  const extension = path.extname(filePath).toLowerCase();
  const type = contentTypes[extension] ?? "application/octet-stream";

  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, { "Content-Type": type });
    response.end(file);
  });
}

http
  .createServer((request, response) => {
    const filePath = getFilePath(request.url || "/");
    if (!filePath.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    fs.stat(filePath, (error, stats) => {
      if (error) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      const resolved = stats.isDirectory() ? path.join(filePath, "index.html") : filePath;
      sendFile(resolved, response);
    });
  })
  .listen(port, host);
