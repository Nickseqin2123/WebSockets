import { useState, useEffect } from 'react'


export default function App() {
    const [socket, setSocket] = useState(null)
    const [name, setName] = useState('')
    const [msg, setMsg] = useState('')

    useEffect(() => {
        const socket = new WebSocket('ws://127.0.0.1:8000/ws/chat/')
        
        socket.onopen = () => {
            setSocket(socket)
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data)
            const cls = document.getElementById('all_mess')
            cls.innerHTML += `<div className='alert alert-info'><b>${message.name}:</b> ${message.message}</div>`
        }
        return () => {
            socket.close()
        }
    }, [])

    function sendOnServer() {
        if (name && msg) {
            socket.send(JSON.stringify({name: name, message: msg}))
            setMsg('')
            setName('')
        }
    }
    
    return (
    <>
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
		<h5 class="my-0 mr-md-auto">zxc The Self</h5>
		<a class="btn btn-outline-primary" href="#">Регистрация</a>
	</div>
	<div class="container">
        <div class="py-5 text-center">
			<h2>Чат программа</h2>
			<p class="lead">Укажите ваше имя и начинайте переписку</p>
		</div>
		<div class="row">
        <div class="col-6">
				<h3>Форма сообщений</h3>
				<div id="messForm">

					<label for="name">Имя</label>
					<input value={name}
                     onChange={(event) => setName(event.target.value)}
                      type="text"
                       name="name"
                        id="name"
                         placeholder="Введите имя"
                          class="form-control"/>
					<br/>
					<label for="message">Сообщение</label>

					<textarea value={msg}
                     onChange={(event) => setMsg(event.target.value)}
                      name="message"
                       id="message"
                        class="form-control"
                         placeholder="Введите сообщение"
                         ></textarea>
					<br/>
					<button onClick={sendOnServer} class="btn btn-danger">
						Отправить
					</button>

				</div>

		</div>
            <div class="col-6">
                <h3>
                    Сообщения
                </h3>
                <div id="all_mess">
                    
                </div>
            </div>
		</div>
	</div>
    </>
    )
}