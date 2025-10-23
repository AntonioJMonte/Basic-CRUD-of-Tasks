export async function json (req, res) {
    const buffers = [] //Array de buffers/pedaços de informação
    
    for await (const chunk of req) {
        buffers.push(chunk) //Adiciona cada pedaço no array 
    }

    //Junta todos os pedaços em um buffer completo e dps transforma em string
    try {
        // Cria uma nova priopriedade body no req e atribui o valor do JSON parseado
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } 
    catch (error) {
        req.body = null;
    } 
    
    res.setHeader('Content-type', 'application/json') //Envia headers de volta para o front-end
}
