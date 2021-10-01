# The Raspberry Pi Prototype

The Raspberry Pi represents a edge-computing entity to collect sensor data and is capable of pushing data to the IOTA Tangle. Each Raspberry Pi can be installed inside a temperature-controlled container in order to collect sensor data and alert the clients.

## Prequisites:
- Raspberry Pi 4  Model B (4GB RAM)
- Raspberry Pi Official Power Brick
- 32GB microSD Card
- DHT11 Temperature & Humidity Sensor
- Working Internet Connection

# Getting Started

To get the Raspberry Pi up and running, follow the steps.
1. Copy Noobs on the 32GB microSD Card.
2. Select Raspbian Lite on the Pi and install it.
3. Let the Rasperry Pi boot up and activate SSL access in order to use PuTTY.
4. Run `sudo apt update`
4. Connect the DHT11 Sensor as shown in Figure 01.

![DHT11_GPIO](img/DHT11_GPIO.png)
</br>Figure 01: Connection of DHT11 Sensor with RaspberryPi


| DHT11 Sensor  | GPIO Raspberry Pi |
| ------------- |-------------------| 
| GND           | GND               | 
| DATA          | GPIO 4 - DATA     | 
| VCC           | VCC (5V)          | 

5. Install NodeJS:</br>
Run the command `curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -` to get the latest NodeJS Package.</br>
Then run `sudo apt-get install -y nodejs` to install it.</br>
Check your installed NodeJS version with `node -v`. If you get a valid version number, continue to Installation.

# Installation

In order to push sensor-data onto the tangle, you'll need some apps and dependencies.

1. Install Git on the Raspberry Pi:</br>
Type: `sudo apt install git`
2. Navigate to a suitable workplace (e.g. `\home\iota`).
3. Use `git clone https://github.com/J0nasW/logu-iota.git` to get the IOTA Code.
4. Navigate into `logu-iota\prototype`.
5. Run `npm-install`. It will install all necessary dependencies and set up the environment.

# Usage

After launching the script, the RaspberryPi will open up a simple Web server which you can access using the raspi's IP Address. After setting up all variables, it will output a valid IOTA Address with accompanying Seed on the Web Server and console. Keep that Root in mind, as we need it later to fetch our temperature data.</br>

The RaspberryPi will push temperature and humidity data as well as a current timestamp from the DHT11 sensor right onto the tangle, referencing the Root address mentioned before. If you analyze the tangle, you can determine the current temperature easily with the online tool. If you are pushing data onto the IOTA Comnet (or Testnet), you can validate the process using the [TangleExplorer](https://comnet.thetangle.org/) and the generated address.

# On Start-Up

To get this script running when booting the Raspberry Pi Up as a service, follow these instructions:

1. Create a script in the init.d folder:</br>
`sudo nano /etc/init.d/IOTAService`
2. Copy the template for a INIT Script from this [GitHub Page](https://raw.githubusercontent.com/fhd/init-script-template/master/template) and paste it into your IOTAService Script.
3. Open IOTAService by typing `sudo nano /etc/init.d/IOTAService` into the terminal.
4. Change the following variables:</br>
Providers: IOTAService</br>
dir="/home/pi/github/logu-iota/prototype/ZVT"</br>
cmd="node zerovalue_public.js"</br>
user="root"
5. Change the permissions `sudo chmod 755 /etc/init.d/IOTAService`
6. Activate your Service `sudo update-rc.d IOTAService defaults`

Now, the IOTA Service consisting of your JS-File will start with the raspberry pi. To start or stop it manually, use the following commands:

* `sudo /etc/init.d/IOTAService start`
* `sudo /etc/init.d/IOTAService stop`
* `sudo /etc/init.d/IOTAService restart`

To get the status of your service, use:

* `/etc/init.d/IOTAService status`

To access the logs, type:

* `tail -f /var/log/IOTAService.log`
* `tail -f /var/log/IOTAService.err`