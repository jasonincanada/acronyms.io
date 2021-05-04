
# get a pre-built server from the docker hub with only python installed
FROM python:3.8

# open up the api port
EXPOSE 8000

# this is bind-mounted (in docker-compose.yml) to our local ~/acronyms.io/api
WORKDIR /app 

# set up django and install acro's dependencies
COPY requirements.txt /app
RUN pip3 install -r requirements.txt --no-cache-dir

# launch the api server and listen for connections
ENTRYPOINT ["python3"] 
CMD ["manage.py", "runserver", "0.0.0.0:8000"]

