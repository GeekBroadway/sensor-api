Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/trusty64"
  config.vm.box_check_update = false
  # Network
  config.vm.network "private_network", ip: "192.168.56.6"
  config.vm.hostname = "sensorbackend.localdev"

  #Filesystem
  config.vm.synced_folder '.', '/vagrant', disabled: true
  config.vm.synced_folder '.', '/home/vagrant/sensor_backend'

  #VB Specifics
  config.vm.provider "virtualbox" do |vb|
      vb.gui = false
      vb.name = "sensorbackend_7i8yhd2"
      vb.memory = "1024"
  end

  #Provisioning
  config.vm.provision :shell, path: "vagrant/scripts/base.sh", name: "Configuring Base System"
  config.vm.provision :shell, path: "vagrant/scripts/project.sh", name: "Configuring Project Specifics"
end
