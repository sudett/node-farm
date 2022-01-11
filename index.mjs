import { readFileSync } from "fs";
import { fileURLToPath, parse } from "url";
import path, { dirname } from "path";
import { createServer } from "http";
import { replaceTemplate } from "./modules/replaceTemplate.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tempCard = readFileSync(`${__dirname}/templates/card.html`, "utf-8");
const tempOverview = readFileSync(`${__dirname}/templates/overview.html`, "utf-8");
const tempProduct = readFileSync(`${__dirname}/templates/product.html`, "utf-8");

const data = readFileSync(`${__dirname}/dev-data/data.json`);
const dataObj = JSON.parse(data);

// Create server
const server = createServer((req, res) => {
  const { pathname, query } = parse(req.url, true);

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    const cards = dataObj.map((product) => replaceTemplate(tempCard, product)).join("");
    const overview = tempOverview.replaceAll("{%PRODUCT_CARDS%}", cards);

    res.writeHead(200, { "Content-type": "text/html" });
    res.end(overview);

    // Product page
  } else if (pathname === "/product") {
    const productObj = dataObj[query.id];
    const product = replaceTemplate(tempProduct, productObj);

    res.writeHead(200, { "Content-type": "text/html" });
    res.end(product);

    // API page
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // Error page
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("<h1>Page not Found</h1>");
  }
});

// Start server
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
