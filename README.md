#mainpage

requires docker.. 

To build:
docker build . -t containerName

to run: 
docker run -p 8000:80 containerName

8000 is system's port
80 is docker's port 