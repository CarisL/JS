var http = require("http");
var fs = require("fs");

function handle_request(req, res) {
  // 客户端对服务器的请求，说白了就是对相关文件内容的请求。
  // __dirname：当前运行文件的绝对路径
  var suffix = req.url.substr(req.url.length - 4, req.url.length);
  if (suffix === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(get_file_content(__dirname + "/html/index.html"));
  }
  if (suffix === ".css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    res.end(get_file_content(__dirname + req.url));
  } else if (suffix === ".gif") {
    res.writeHead(200, {
      "Content-Type": "image/gif",
      "Cache-Control": "max-age=100",
      Expires: "Sat, 23 Mar 2019 07:52:52 GMT"
    });

    res.end(get_file_content(__dirname + req.url));
  }
  // 如果没有任何返回的时候，http的状态的就pending。直到自己超时 lol
}

function get_file_content(filepath) {
  // filepath /Users/yiluo/work/github/noteBook/原理/浏览器缓存/demo/过期机制/html/index.html
  return fs.readFileSync(filepath);
}

var server = http.createServer(handle_request);
server.listen(8080);
