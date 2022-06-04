from base64 import encode
import socket
import hashlib

SERVER_IP = '192.168.0.102'
SERVER_PORT = 11027

#1. Ask the user for its username and password.
username = ""
password = ""

username = input("Enter your name: ")
password = input("Enter your password: ")

#2. Hash the password the same way you did at the server side. https://datagy.io/python-sha256/
hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()

#3. Concatenate the hash and the username as one string.
hash = ""
hash = username + hashed_password

#4. Encode this string into bytes  
encodingString = hash.encode()

#5. finally send this string to the server

with socket.socket(socket.AF_INET , socket.SOCK_STREAM) as s:
    s.connect((SERVER_IP, SERVER_PORT))
    data = s.recv(1024)
    print(data)
    s.send(encodingString)