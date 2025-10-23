import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './middlewares/routes.js'
import { extractQueryParams } from './utils/extract-queryparams.js'

const server = http.createServer (async (req, res) => {
    const { method, url } = req // Pode ser const method = req.method e const url = req.url
    

    await json(req, res) // Chama o middleware para interpretar o JSON

    // Valida a rota e o método
    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    }) 

    if (route) {
        const routeParams = req.url.match(route.path);

        const { query, ...params } = routeParams.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}


        return route.handler(req, res); // Chama o handler da rota
    }

    return res.writeHead(404).end()
})

// Criando a porta que o servidor http vai escutar
server.listen(3333)