const https = require('https')
const url = 'https://yandex.ru'

const request = https.request(url, (response) => {

    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        console.log(data)
    })
})

request.on('error', (error) => {
    console.log('An error', error)
})

request.end()