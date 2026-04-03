-- Tabela de usuários do sistema
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    data_de_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP CONSTRAINT email_valido CHECK (
        email ~ * '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    )
);

-- Tabela de membros da organização
CREATE TABLE membros (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    endereco TEXT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    data_de_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Registro de dinheiro que entra
CREATE TABLE entradas (
    id SERIAL PRIMARY KEY, 
    descricao TEXT NOT NULL, 
    valor DECIMAL(10,2) NOT NULL, 
    data_de_entrada DATE DEFAULT  CURRENT_TIMESTAMP, 
    usuario_id INT NOT NULL, -- Quem registrou
    data_de_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

-- Relacionamento com usuário
FOREIGN KEY (usuario_id) REFERENCES usuarios(id) );

-- Registro de dinheiro que sai
CREATE TABLE saidas (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL, -- Ex: compra de material
    valor DECIMAL(10,2) NOT NULL,
    data_de_saida DATE NOT NULL,
    usuario_id INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

-- Relacionamento com usuário
FOREIGN KEY (usuario_id) REFERENCES usuarios(id) );

-- Relaciona membros com entradas (quem contribuiu)
CREATE TABLE contribuicoes (
    id SERIAL PRIMARY KEY,
    membro_id INT NOT NULL, -- Quem contribuiu
    entrada_id INT NOT NULL , -- Em qual entrada
    valor DECIMAL(10,2) NOT NULL, -- Quanto contribuiu
    data_de_contribuicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

-- Relações
FOREIGN KEY (membro_id) REFERENCES membros(id),
    FOREIGN KEY (entrada_id) REFERENCES entradas(id)
);

-- total de entradas
SELECT SUM(valor) AS total_entradas FROM entradas;

--Total de saída
SELECT SUM(valor) As total_saidas FROM saidas;

--Saldo actual
SELECT (
        SELECT COALESCE(SUM(valor), 0)
        FROM entradas
    ) - (
        SELECT COALESCE(SUM(valor), 0)
        FROM saidas
    ) AS saldo

-- Quem contribuiu
SELECT DISTINCT
    m.name
FROM membros m
    JOIN contribuicoes c ON m.id = c.membro_id;

-- Quem não Contribuiu
SELECT name
FROM membros
WHERE
    id NOT IN(
        SELECT membro_id
        FROM contribuicoes
    );

-- Listar todos os membros
SELECT * FROM membros;