# Install development environment

### Database

With a fresh Ubuntu 20 Server server (20GB disk, 2GB ram), install postgres:

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib libpq-dev

# create the postgresql dev user, asking for the password
sudo -u postgres createuser acro_dev --createdb -P
```

Password: `acro_dev`

```bash
# create the database
sudo -u postgres createdb acro_dev
```


### Clone project, install NPM

Clone this repo locally:

```bash
git clone https://github.com/jasonincanada/acronyms.io.git
```

Install npm and packages:

```bash
cd ~/acronyms.io

sudo apt install npm

# that installed npm itself, now install acro's dependencies
cd web
npm install
```


### Django backend

Set up a Python virtual environment for the django server:

```bash
cd ~/acronyms.io

sudo apt install python3-venv
python3 -m venv env

# activate the virtual environment and install python modules:
source env/bin/activate

pip install -r requirements.txt
```

Run the initial migrations:

```bash
python manage.py migrate
```

If you got a bunch of green OKs, the round trip to the database is working and the app's structure is set up!

Update the `ALLOWED_HOSTS IP` to your server's address, `192.168.0.18` for this example.  It should show it when you log in to the server console

```
(env) ubuntu20s:~/acronyms.io$ sed -i 's/192.168.0.16/192.168.0.18/' acronyms/settings.py 
```

Start the API server and verify you can hit the acro app homepage at `http://192.168.0.18:8000/acro/`

```bash
python manage.py runserver 192.168.0.18:8000
```

If you get an error make sure you added the `acro/` to the end of the address in your browser


### React/Redux frontend

In a new server terminal load the React UI:

```bash
cd ~/acronyms.io/web

npm start
```

You should be able to hit the main frontend UI at `http://192.168.0.18:3000/`. This will replace what we've done so far with the view layer in the original django project

