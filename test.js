// test.js — deliberately vulnerable example
import http from 'http';
import url from 'url';
import { exec } from 'child_process';
import fs from 'fs';

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === '/eval') {
    // 🔴 Unsafe eval: executes whatever code is passed in
    const code = query.code || '';
    let result;
    try {
      result = eval(code);
    } catch (e) {
      result = `Error: ${e.message}`;
    }
    res.end(`Eval result: ${result}`);

  } else if (pathname === '/exec') {
    // 🔴 Command injection: runs arbitrary shell commands
    const cmd = query.cmd || '';
    exec(cmd, (err, stdout, stderr) => {
      if (err) return res.end(`Error: ${stderr}`);
      res.end(`Output: ${stdout}`);
    });

  } else if (pathname === '/read') {
    // 🔴 Path traversal: reads any file under ./public
    const file = query.file || '';
    try {
      const data = fs.readFileSync(`./public/${file}`, 'utf8');
      res.end(data);
    } catch (e) {
      res.end(`Read error: ${e.message}`);
    }

  } else {
    res.end('Test server is up. Use /eval, /exec or /read.');
  }
});

server.listen(3000, () => {
  console.log('Test server listening on http://localhost:3000');
});
