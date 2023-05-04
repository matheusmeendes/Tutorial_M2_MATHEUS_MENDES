const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const port = 3000
const app = express();
app.use(express.json());

const dbPath = 'C:\Users\Inteli\Documents\GitHub\Tutorial_M2_MATHEUS_MENDES\SEMANA_02\02_AUT_EST_ENTREGA\curriculo.db';

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the database.');
    }
});

const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
});

// Rota para criar novo registro na tabela

app.post('/pessoal', (req, res) => {
    const { nome, cargo, formacao_id } = req.body;
    db.run('INSERT INTO PESSOAL (NOME, CARGO, FORMACAO_ID) VALUES (?, ?, ?)', [nome, cargo, formacao_id], function(err) {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      res.send(`Novo registro adicionado com o ID: ${this.lastID}`);
    });
  });

// Rota para ler um registro específico

  app.get('/pessoal/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM PESSOAL WHERE ID_PESSOAL = ?', [id], function(err, row) {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      res.send(row);
    });
  });

// Rota para atualizar um registro existente na tabela

  app.put('/pessoal/:id', (req, res) => {
    const id = req.params.id;
    const { nome, cargo, formacao_id } = req.body;
    db.run('UPDATE PESSOAL SET NOME = ?, CARGO = ?, FORMACAO_ID = ? WHERE ID_PESSOAL = ?', [nome, cargo, formacao_id, id], function(err) {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      res.send(`Registro com o ID ${id} foi atualizado com sucesso`);
    });
  });

// Rota para deletar um registro da tabela

  app.delete('/pessoal/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM PESSOAL WHERE ID_PESSOAL = ?', [id], function(err) {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      res.send(`Registro com o ID ${id} foi deletado com sucesso`);
    });
  });

  // Rota para listar todos os registros da tabela

  app.get('/pessoal', (req, res) => {
    db.all('SELECT * FROM PESSOAL', function(err, rows) {
      if (err) {
        res.status(500).send({ error: err.message });
      }
      res.send(rows);
    });
  });