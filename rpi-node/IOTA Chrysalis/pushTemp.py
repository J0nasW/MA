import json
import iota_client
from cryptography.fernet import Fernet

NODE_URL = "https://chrysalis-nodes.iota.org"

def json_encrypt(payload, passphrase):
    jsonPayload = json.dumps(payload)
    jsonPayload = jsonPayload.encode()
    fernet = Fernet(passphrase)
    encrypted_json = fernet.encrypt(jsonPayload)
    return encrypted_json, passphrase

def send_message(topic, payload):
    # Chrysalis testnet node
    # client = iota_client.Client() # client will connect to testnet by default
    client = iota_client.Client(
        nodes_name_password=[[NODE_URL]], node_sync_disabled=True)
    if client.get_health():
        print("IOTA Chrysalis Network is up and running!")
    message_id_indexation = client.message(index=topic, data=payload)

    print(f"Message sent!\nhttps://explorer.iota.org/mainnet/indexed/{message_id_indexation['message_id']}")
    print("Copy the ID of your message. You'll need it in the next example.")
    print(f"Message ID: {message_id_indexation['message_id']}")
    return message_id_indexation['message_id']

def pushData(topic, payload, passphrase):
    global message_id
    jsonPayload, passphrase = json_encrypt(payload, passphrase)
    #jsonPayload = json.dumps(payload)
    print(payload)
    print("Passphrase: " + str(passphrase))
    print("Encrypted Payload: " + str(jsonPayload))
    message_id = send_message(topic, jsonPayload)
    return message_id

# Read messages with python:
# message = client.get_message_data(message_id_indexation['message_id'])
# message_index = message['payload']['indexation'][0]['index']
# message_content = message['payload']['indexation'][0]['data']
# print(f'Message data: {message}')
# print(f'Message index: {bytes.fromhex(message_index).decode("utf-8")}')
# print(f'Message content: {bytes(message_content).decode()}')