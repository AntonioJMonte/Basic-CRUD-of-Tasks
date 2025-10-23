import fs from 'node:fs'
import { parse } from 'csv-parse'

const csvPath = new URL('../tasks.csv', import.meta.url)    

async function importTasks() {
  const parser = fs
    .createReadStream(csvPath)
    .pipe(parse({
      delimiter: ',',
      skip_empty_lines: true,
      from_line: 2, 
      columns: ['title', 'description'],
    }))

  for await (const record of parser) {
    const { title, description } = record

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    })

    console.log(`Tarefa importada: ${title}`)
  }

  console.log('Importação concluída!')
}

importTasks()


