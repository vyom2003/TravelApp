from locust import HttpUser, task, between
from random import choice
from string import ascii_lowercase


class MyUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def login(self):
        payload = {
            "email": "jpzpuepyjprg@gmail.com",
            "password": "newpassword123"
        }
        response = self.client.post("http://127.0.0.1:5000/login", data=payload)
        if response.status_code == 200:
            print("Login successful")
        else:
            print("Login failed")

    @task
    def register(self):
        email = "".join(choice(ascii_lowercase) for i in range(12))  + "@gmail.com"
        payload = {
            "email": email,
            "password": "newpassword123",
            "name": "New User",
            "phone_no": "1234567890",
        }
        response = self.client.post("http://127.0.0.1:5000/register", data=payload)
        if response.status_code == 200:
            print("Registration successful")
        else:
            print("Registration failed")
