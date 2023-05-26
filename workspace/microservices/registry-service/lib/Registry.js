class Registry {
  constructor() {
    this.services = [];
    this.timeout = 15;
  }

  register(name, version, ip, port) {
    const key = name + version + ip + port; // This will be the key that we will use to store the service

    if (!this.services[key]) {
      this.services[key] = {};
      this.services[key].timestamp = Math.floor(new Date() / 1000);

      this.services[key].ip = ip;
      this.services[key].port = port;
      this.services[key].name = name;
      this.services[key].version = version;
      console.log(`Added service ${name}, version ${version} at ${ip}:${port}`);
      return key;
    }
    this.services[key].timestamp = Math.floor(new Date() / 1000);
    console.log(`Updated service ${name}, version${version} at ${ip}:${port}`);
    return key;
  }
}

module.exports = Registry;
