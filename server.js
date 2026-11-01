const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Тестовый API
  if (req.url === '/api/test') {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8'
    });

    res.end(JSON.stringify({
      ok: true,
      message: 'Posmertie Rinny Node.js работает'
    }));

    return;
  }

  // Главная страница
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = path.join(__dirname, 'index.html');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain; charset=utf-8'
        });

        res.end('Ошибка загрузки index.html');
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });

      res.end(data);
    });

    return;
  }

  // Всё остальное
  res.writeHead(404, {
    'Content-Type': 'text/plain; charset=utf-8'
  });

  res.end('Not found');
});

const port = process.env.PORT || 3000;

server.listen(port, '0.0.0.0', () => {
  console.log(`Posmertie Rinny server started on port ${port}`);
});
