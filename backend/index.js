const express = require('express')
const axios = require('axios')
const cors = require('cors')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config()

const devAPI = process.env.DEV_TO_API
const BOT = process.env.BOT
const chatID = process.env.CHAT_ID


const app = express()


app.use(express.json())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(cors({
    origin: '*'
}))


let sendMessage = async (chat_id, text) => {
    // Function send Message to the chatid via Telegram

    var api_link = `https://api.telegram.org/bot${BOT}/sendMessage`

    await axios.get(
        api_link, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(
                {
                    chat_id: chat_id,
                    text: text
                }
            )
        }
    )
}


let sendMessageToDeveloper = async (text) => {
    // Function send Message to the developer via Telegram

    sendMessage(chatID, text)
}


let fetchBlogs = async () => {

    // Function fetch all the blogs from dev.to API
    
    const response = await axios.get('https://dev.to/api/articles/me', {
        headers: {
            'api-key': devAPI
        }
    })

    return JSON.parse(JSON.stringify(response.data))
}


app.get('/blogs', async (_, response) => {

    // Route for all blogs from dev.to
    
    let data = await fetchBlogs()
    response.json(data)
})

app.post('/contact', async (request, reponse) => {

    // Route triger the telegram bot send message of contact details

    let name = request.body.name
    let mail = request.body.mail
    let message = request.body.message

    let textString = `
    Name: ${name}
Mail: ${mail}
Message:
    ${message}
    `

    await sendMessageToDeveloper(textString)

    reponse.json({ 'msg': textString })
})

app.get('/visit', async (resquest, response) => {

    // Route triger the telegram bot send message somebody visted site

    sendMessageToDeveloper(JSON.stringify(resquest.headers['user-agent']))

    response.json({ 'msg': 'ok' })
})


app.post('/formBot', async (request, response) => {

    let text = request.body.text
    let chatid = request.body.chatid

    try {
        sendMessage(chatID, text)
        response.json({'msg': 'error'})
    } catch (e) {
        response.json({'msg': 'ok'})
    }

})


module.exports = app
