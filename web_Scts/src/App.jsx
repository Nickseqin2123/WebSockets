import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'


export default function App() {
    const [text, setText] = useState('')
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const webSocket = new WebSocket('ws://127.0.0.1:8000/ws/integers/')

        webSocket.onopen = () => {
            setSocket(webSocket)
        }

        return () => {
            webSocket.close()
        }
    }, [])
    
    function send_on_server() {
        if (text) {
            socket.send(JSON.stringify({'message': text}))
            setText('')
        }
    }

    return (
        <div className="text">
            <h1>
                Введите сообщение для сервера:
            </h1>
            <input type="text"
             value={text}
              onChange={(event) => setText(event.target.value)}
               style={{ fontSize: '2rem' }}/>
            <button onClick={send_on_server}>
                Отправить
            </button>
        </div>
  )
}
