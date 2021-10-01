from pushTemp import *
#from dht11 import *
#from neo6Mgps import *
from datetime import datetime
import sched
from cryptography.fernet import Fernet

from apscheduler.schedulers.background import BackgroundScheduler

from flask import Flask, render_template

# User defined things:
topic = "logu_blockchain_explorer_v4"

#temperature, humidity, temp_error = dht11.read_temp()
#lat, lon = getCoordinates()

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

message_id = ""
passphrase = Fernet.generate_key()

def pushMessage():
    global message_id
    print("Pushing a Message to the Tangle!")
    message_id = pushData(topic, payload, passphrase)

sched = BackgroundScheduler(daemon=True)
sched.add_job(pushMessage,'interval', seconds=30)
sched.start()

app = Flask('IOTA_Node', static_folder='static', template_folder='templates')

@app.route('/')

def index():
    global message_id
    return render_template('index.html', topic_name=topic, passphrase=passphrase.decode("utf-8") , container_id=payload["container"], departure=payload["departure"], arrival=payload["arrival"], contents=payload["content"], content_specifics=payload["content_specifics"], message_id = message_id )

if __name__ == '__main__':

    app.run()