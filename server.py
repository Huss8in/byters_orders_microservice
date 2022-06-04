import socket
import hashlib
#from threading import *

SERVER_IP = '192.168.0.102'
SERVER_PORT = 11027

# 1.Choose some dummy usernames and passwords.
username = "hussein"
password = "123456789"

#2. Hash each password and store the hash along side with its username as one record.
HashedPassword = hashlib.sha256(password.encode('utf-8')).hexdigest()
StringPassword = username + HashedPassword


with socket.socket(socket.AF_INET , socket.SOCK_STREAM) as s:
    s.bind((SERVER_IP, SERVER_PORT))
    print('Server is listening')
    s.listen(1)
    conn,addr = s.accept()
    print(f'Connection accepted from :{addr}')
    with conn:
        while(True):
            conn.send(b'Hello World')
            data =  conn.recv(1024)
            print(data)

            if(data.decode()==StringPassword):
                print('Authenticated')
            else: 
                print('Incorrect username or password')
            break
        