import { takeCoverage } from 'node:v8'
import { buildRoutePath } from '../utils/build-route-path.js'
import { Database } from './database.js'
import { randomUUID } from 'node:crypto'

const database = new Database()
const now = new Date()
export const routes = [

    { //create
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body
            const tasks = {
                id: randomUUID(),
                title,
                description,
                complete_at: null,
                created_at: now,
                updated_at: now,
            }
            database.insert('tasks', tasks)
            return res.writeHead(201).end()
        }
    },

    { //list
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query
            let tasks
            if (search) {
                tasks = database.select('tasks', {
                    title: search,
                    description: search,
                })
            }
            else {
                tasks = database.select('tasks')
            } 
            return res.end(JSON.stringify(tasks))
        }
    },
    
    { //delete
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const idIndex = database.verifyID('tasks', id)
            if(idIndex > -1) {
                database.delete('tasks', idIndex)
            }
            else {
                return res.writeHead(404).end(JSON.stringify({ message: "ID inválido ou não existe" }))
            }
            return res.writeHead(201).end()
        }
    },

    { //update
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params    
            const { title, description } = req.body

            const idIndex = database.verifyID('tasks', id)
            if(idIndex > -1) {
                database.update('tasks', id, idIndex, {
                title,
                description,
                complete_at: null,
                updated_at: now,
                })
            }   
            else {
                return res.writeHead(404).end(JSON.stringify({ message: "ID inválido ou não existe" }))
            }
            return res.writeHead(201).end()
        }
    },

    { //complete tasks
        method: 'PUT',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params
            const { complete_at } = req.body

            const idIndex = database.verifyID('tasks', id)
            if (idIndex > -1 && complete_at != null) {
                database.complete('tasks', id, idIndex, {
                    complete_at: true,
                })
            }
            else {
                res.writeHead(404).end(JSON.stringify({ message: "Erro ao marcar tarefa como completa" }))
            }
            res.writeHead(201).end()
        }
    }
]