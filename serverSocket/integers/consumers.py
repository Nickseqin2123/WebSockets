import json

from channels.generic.websocket import AsyncWebsocketConsumer


class Consumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        self.client = self.scope['client']
        await self.channel_layer.group_add('chat', self.channel_name)
        print(self.channel_name)
        await self.accept()

    async def receive(self, text_data=None, bytes_data=None):
        data: dict = json.loads(text_data)
        await self.channel_layer.group_send('chat', {'type': 'chat.message', 'name': data['name'], 'message': data['message']})
    
    async def disconnect(self, code):
        await self.channel_layer.group_discard('chat', self.channel_name)

    async def chat_message(self, event: dict):
        message = event['message']
        name = event['name']
        print(f'''
Пользователь: {name} отправил сообщение в чат: {message}\n
''')
        if len(message) > 50 and 'Z' not in name.upper():
            await self.send(text_data=json.dumps({'name': name, 'message': 'Я дурак и у меня слишком много символов в сообщении!!!'}))
        else:
            await self.send(text_data=json.dumps({'name': name, 'message': message}))