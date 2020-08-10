const fastify = require('fastify')({ logger: true })
fastify.register(require('fastify-routes'))

const itemValidation = { // Define validation
    schema: {
        body: {
            type: 'object',
            additionalProperties: false,
            required: [
                'item'
            ],
            properties: {
                item: { type: 'string' }
            }
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    item: { type: 'string' }
                }
            }
        }
    }
}

const stack = []

//@Routes
fastify.get('/getStack', (request, reply) => {
    reply.send(stack)
})

fastify.post('/addItem', itemValidation, (request, reply) => { // Add validation options to POST route
    const item = request.body.item
    stack.push(item)
    reply.send(stack)
})

//@Server
fastify.listen(5000, (err) => {
    console.log(fastify.routes)
    if (err) {
        console.log(err)
        process.exit(1)
    } else {
        console.log(`Server running, navigate to  https://localhost:5000`)
    }
})
