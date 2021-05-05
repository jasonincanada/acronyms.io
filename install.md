
# Install development environment

Install a fresh [Ubuntu 20 Server](https://releases.ubuntu.com/20.04/) server (20GB disk, 2GB ram) and get the latest updates:

```bash
# update the OS
sudo apt update
sudo apt upgrade
```

Install docker using the [Ubuntu instructions](https://docs.docker.com/engine/install/ubuntu/), copied below:

```bash
# set up the repository
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
   | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# install the latest version of docker engine
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

# verify the install
sudo docker run hello-world

# Hello from Docker!
# This message shows that your installation appears to be working correctly.
```

Let's make it easier to call docker without `sudo`, using the [post-installation instructions](https://docs.docker.com/engine/install/linux-postinstall/):

```bash
sudo usermod -aG docker $USER
newgrp docker

# try again without sudo
docker run hello-world
```

Install Docker Compose with the [linux instructions](https://docs.docker.com/compose/install/):

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# set up the executable
sudo chmod +x /usr/local/bin/docker-compose
```

## Clone project

Download a copy of this repo:

```bash
git clone https://github.com/jasonincanada/acronyms.io.git
cd acronyms.io
```

Now for the magic! Run `docker-compose` to fetch and build the OS images according to the architecture specified in `docker-compose.yml`. Each component of the project runs in an isolated container: web UI, backend API, database server, and a web proxy to route traffic around. After building the containers, docker sets up an internal subnetwork, again according to our specification, and launches each container into the network

```bash
# hold on to your keyboards!
docker-compose up
```

### Django locally

After a few minutes, you should have a color-coded display of the output interleaved from the various containers. `docker-compose` stays in the foreground until you press `^C` to bring down the network, so leave it in that window for the duration of the dev session.

Our mini cloud infrastructure is ready!

In a new window, we'll set up a Python virtual environment on our local host so we can run `manage.py` for various API development tasks. The PostgreSQL server running right now at `172.16.1.3` is your local copy of the project data, but it starts empty, so let's set up the tables and the first users:

```bash
cd ~/acronyms.io/api

sudo apt install python3-venv
python3 -m venv env

# activate the virtual environment and install python modules
source env/bin/activate

pip install -r requirements.txt
```

Run the initial migrations:

```bash
python manage.py migrate
```

If you got a bunch of green OKs, the round trip to the database is working and the app's structure is set up!

Let's add two test users from the fixture data included in the repo:

```bash
python manage.py loaddata acro/fixtures/users.json

# Installed 2 object(s) from 1 fixture(s)
```

You should now be able to hit your server's IP in a web browser and see the dev home page. Click the login link and use `test`/`testtest123` to log in. You're in! You should be able to change code in `~/acronyms.io/web/src/App.js` (try changing the title) and see your changes reflect in the browser right away

