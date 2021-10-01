from cryptography.fernet import Fernet
from datetime import datetime
import json

payload = {
    "sensorResult": "LogU_Result",
    "temperature": "10",
    # "temperature": temperature,
    "humidity": "20",
    # "humidity": humidity,
    "timezone": "UTC",
    "dateTime": datetime.now(tz=None).__str__(),
    "container": "MWBNB564534884a",
    "departure": "HAM",
    "departure_time": datetime.now(tz=None).__str__(),
    "arrival": "ROT",
    "arrival_time": datetime.now(tz=None).__str__(),
    "content": "Lettuce",
    "content_specifics": "freeze",
    # "Latitude" : lat,
    # "Longitude" : lon,
    # "temperature_sensor_error": temp_error
}

key = Fernet.generate_key()

def encrypt(payload, key):
        f = Fernet(key)
        token = f.encrypt(bytes(payload, "utf-8"))
        print(token)
        decrypted = f.decrypt(token)
        print(decrypted)

def decrypt(payload, key):
        f = Fernet(key)
        decrypted = f.decrypt(payload)
        print(decrypted)

encrypt(json.dumps(payload), key)

test_payload = "gAAAAABhUGAeDsLeBGUTF260nZK2EdxP0ahNPC9or8r9Qn4ZpKRQ1fHVHq_KF2SjlihNjhbU2KwMb_mMtljbcl7P0bQqmpDz1CMpHx9RmMADejIoy5KJc44qflXRqlla0eLeShy2D7-u2C-nA3DjpBtS9mjk9skRk6WHkiKfNsA3GyMFsk-W4frCYe5MzZ5puyzWxPSPzSLdOhz4_x7eWoJxKWJYt56HswNQhnTu-jJCKIIhbNul85Y1Njlf5g_Dem6_COxxf0DYJY3h401F9lbRbd_gSBc6AsJm_AFKso5jm_CuLYSyFij5xHSfartlUBOR_97EaCRHY1bu7IIpQC6OGVlBgZY_-jrM3qgBMmEvVhkkr7sULfJyLRI7-3EB4eBQJzV96ja2xauIz55K999UZZFHkqSe-srxwNpZErPWEeOnuVfb_Ke-DmzsS7JNw7l3kGWrnKe2bjWqnH94KbHBpRGlIJTE3SdP44DOzhy792HrHWuq8gCK4NhZrQnIrgKbzpHUGNxRYhGQ-MbT3-4DcWjrZLI00w=="
test_key = "tWM2prhOj-rdkd5EW_8tAvAoxWgyJRpCb_e737FkEDI="

#decrypt(test_payload, bytes(key, 'UTF-8'))