const Koa = require('koa')
const Router = require('@koa/router')
const serve = require('koa-static')
const mount = require('koa-mount');
const ControllerApiDocs = require('./lib/controllers/api-docs')

const app = new Koa()
const router = new Router()
const controllerApiDocs = new ControllerApiDocs({file: 'swagger.yaml'})

const asciiText = `
   _____                                        ______                __    _               __  ______
  / ___/      ______ _____ _____ ____  _____   / ____/___  ____ ___  / /_  (_)___  ___     / / / /  _/
  \\__ \\ | /| / / __ \`/ __ \`/ __ \`/ _ \\/ ___/  / /   / __ \\/ __ \`__ \\/ __ \\/ / __ \\/ _ \\   / / / // /  
 ___/ / |/ |/ / /_/ / /_/ / /_/ /  __/ /     / /___/ /_/ / / / / / / /_/ / / / / /  __/  / /_/ // /   
/____/|__/|__/\\__,_/\\__, /\\__, /\\___/_/      \\____/\\____/_/ /_/ /_/_.___/_/_/ /_/\\___/   \\____/___/   
                   /____//____/                                                                       
`

// Force to exit in docker
process.on('SIGINT', process.exit)
process.on('SIGTERM', process.exit)

router.get('/ping', (ctx) => ctx.body = '')
    .get('/swagger.json', controllerApiDocs.getApiDocsHandle())

console.log(asciiText);
console.log(`UI: http://localhost:${process.env.EXTERNAL_HTTP_PORT}/swagger`)

app
    .use(mount('/swagger', serve('node_modules/swagger-ui-dist')))
    .use(router.routes())
    .listen(3000)
