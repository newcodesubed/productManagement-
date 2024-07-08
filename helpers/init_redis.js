const redis = require('redis')


const client = redis.createClient({
    host: "127.0.0.1",
    port: 6379

})

client.on('connect',()=>{
    console.log('connected to redis')
})

client.on('error', (err)=>{
    console.log('Error ' + err)
})

client.on('end',()=>{
    console.log('disconnected from redis')
})

process.on('SIGINT',() =>{
    client.quit()
})

module.exports = client