import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv'
import axios from 'axios'
import cors from 'cors';

import bodyparser from 'body-parser'

dotenv.config()

const port = process.env.PORT
const devAPI = process.env.DEV_API || ""
const chatID = process.env.CHAT_ID || ""
const botAPI = process.env.BOT_API || ""

let fetchBlogs = async () => {

    const response = await axios.get('https://dev.to/api/articles/me', {
        headers: {
            'api-key': devAPI
        }
    })

    return JSON.parse(JSON.stringify(response.data))

}

let sendMessage = async (chat_id: string, text: string) => {

    var api_link = `https://api.telegram.org/bot${botAPI}/sendMessage`

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


let sendMessageToDeveloper = async (text: string) => {

    sendMessage(chatID, text)
}


const app: Express = express()


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(cors({
    origin: '*'
}))

app.get('/', (_: Request, res: Response) => {
    res.send('Hello World')
})

app.get('/api/blogs', async (_: Request, res: Response) => {
    let data = await fetchBlogs();
    res.json(data)
})

app.post('/api/contact', async (request: Request, reponse: Response) => {

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

app.get('/api/visit', async (request: Request, response: Response) => {

    sendMessageToDeveloper(JSON.stringify(request.headers['user-agent']))

    response.json({ 'msg': 'ok' })
})


app.post('/api/formBot', async (request, response) => {

    let text = request.body.text
    let chatid = request.body.chatid

    try {
        sendMessage(chatid, text)
        response.json({ 'msg': 'error' })
    } catch (e) {
        response.json({ 'msg': 'ok' })
    }

})


// app.listen(port, () => {
//     console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// })

module.exports = app
