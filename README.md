# 🧩 Task Manager API

Uma API RESTful desenvolvida em **Node.js** para o gerenciamento completo de tarefas (**CRUD**), com suporte à importação em massa via arquivo **CSV**.  
O projeto foi desenvolvido **sem o uso de frameworks** como Express, implementando manualmente o roteamento, middlewares e persistência de dados em arquivo JSON.

---

## 🚀 Funcionalidades

- **Criar tarefas** (`POST /tasks`)
- **Listar tarefas** com filtros por título e descrição (`GET /tasks`)
- **Atualizar tarefas** (`PUT /tasks/:id`)
- **Excluir tarefas** (`DELETE /tasks/:id`)
- **Marcar tarefas como concluídas** (`PUT /tasks/:id/complete`)
- **Importar tarefas em massa** via arquivo CSV, usando o script `csv-importer.js`

---

## 🧱 Estrutura de uma Tarefa

Cada tarefa contém as seguintes propriedades:

| Propriedade   | Tipo          | Descrição |
|---------------|---------------|------------|
| `id`          | string        | Identificador único gerado automaticamente |
| `title`       | string        | Título da tarefa |
| `description` | string        | Descrição detalhada da tarefa |
| `complete_at` | boolean/null  | Define se a tarefa foi concluída |
| `created_at`  | date          | Data de criação da tarefa |
| `updated_at`  | date          | Data da última atualização |
