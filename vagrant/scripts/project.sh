#Project Specific Config
cd /home/vagrant/sensor_backend
dos2unix scripts/*
chmod +x scripts/*
npm install --no-bin-links

#Install CLI tools
sudo npm install -g nodemon
