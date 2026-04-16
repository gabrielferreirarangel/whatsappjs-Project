# 🚀 CertiRecupera - API Backend

## 📌 5.1 Identificação

**Nome do projeto:**  
CertiRecupera API

**Descrição:**  
API REST desenvolvida para gerenciar o cruzamento de dados de certificação digital, corrigindo números de telefone mascarados através do confronto de CPFs/CNPJs com uma base de dados mestre.

---

## ⚙️ 5.2 Funcionalidades

- Importação e sanitização de dados da base geral de clientes (Planilha 2)
- Processamento de planilhas de vencimento mensais (Planilha 1)
- Cruzamento automático de dados para recuperação de contatos reais via CPF/CNPJ
- Persistência de dados em banco de dados NoSQL
- Integração com serviço de mensageria via WhatsApp

---

## 🛠️ 5.3 Tecnologias Utilizadas

- **Runtime:** Node.js  
- **Framework:** Express  
- **Banco de Dados:** MongoDB (via Mongoose)  
- **Manipulação de Excel:** xlsx  
- **Automação WhatsApp:** whatsapp-web.js  

---

## ▶️ 5.4 Instruções de Execução

```bash
# Instalar dependências
npm install

# Configurar variável de ambiente (.env)
URL_BD=seu_link_mongodb

# Popular base mestre (executar uma vez)
node src/scripts/addPlanilha.js

# Iniciar servidor
npm start