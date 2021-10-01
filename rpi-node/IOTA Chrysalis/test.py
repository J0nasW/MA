import iota_client
import os
import hashlib

# client will connect to testnet by default
client = iota_client.Client()
if client.get_health():
    print("IOTA Chrysalis Network is up and running!")

# Get the seed from environment variable
# IOTA_SEED_SECRET = os.getenv('IOTA_SEED_SECRET')
IOTA_SEED_SECRET = hashlib.sha256(os.urandom(256)).hexdigest()
INDEX = "Chrysalis LogU Temperature Tracking"
DATA = "Temperature: 20".encode()


if not IOTA_SEED_SECRET:
    raise Exception("Please define environment variable called `IOTA_SEED_SECRET`")

address_tuple = client.get_addresses(
    seed=IOTA_SEED_SECRET,
    account_index=0,
    input_range_begin=0,
    input_range_end=1,
    get_all=False # If true, it would generate two addresses, the first is the public address, the second is kept for change in case of transactions...
)

address = address_tuple[0][0]
if client.is_address_valid(address):
    print("The generated address " + address + " is valid!")

message_id_indexation = client.message(index=INDEX, data=DATA)
print(f"Message sent!\nhttps://explorer.iota.org/chrysalis/message/{message_id_indexation['message_id']}")
print("Copy the ID of your message. You'll need it in the next example.")
print(f"Message ID: {message_id_indexation['message_id']}")