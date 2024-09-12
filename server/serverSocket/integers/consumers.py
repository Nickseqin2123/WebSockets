import json

from random import randint
from channels.generic.websocket import WebsocketConsumer
from time import sleep


class Consumer(WebsocketConsumer):
    
    def connect(self):
        self.accept()

    def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        
        print(f'Сообщение от клиента {data['message']}')
    
    def disconnect(self, code):
        pass    