# marabuamt
The site of the mighty ancient marabuians
On RaspberryPi run `sudo docker run --name rpi3-mongodb3 --restart unless-stopped -v /data/db:/data/db -p 27017:27017 andresvidal/rpi3-mongodb3:latest -d` before you run `nodemon server.js`

Sometimes the ip address of the mongo container changes inside the docker network just do `docker inspect mongo` and change the address `server.js`
