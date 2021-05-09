## PyGraphviz

To generate a .png image of the acronyms.io model, use PyGraphviz:

```bash
sudo apt install build-essential python3-dev graphviz graphviz-dev

# env up if you haven't yet
cd ~/acronyms.io/api
source env/bin/activate

pip install wheel
pip install pygraphviz
```

Generate the graphs:

```bash
# graph the whole model
python manage.py graph_models -a -g -o ~/acronyms.io/specs/model.png

# just the acro app, hiding AbstractUser
python manage.py graph_models acro -X AbstractUser -o ~/acronyms.io/specs/model-acro.png
```

Spin up a temp web server at port 8000 to browse the specs directory:

```bash
docker run -it --rm -p 8000:80 -v ~/acronyms.io/specs:/usr/share/nginx/html nginx
```

Now browse to `http://192.168.0.16:8000/model.png` or `model-acro.png`

If you're doing this on AWS EC2, don't forget to add an inbound rule to your instance's security group to allow traffic to port 8000

