class Registry {
  constructor() {
    this.services = [];
    this.timeout = 15;
  }

  // eslint-disable-next-line class-methods-use-this
  getKey(name, version, ip, port) {
    return name + version + ip + port;
  }

  register(name, version, ip, port) {
    const key = this.getKey(name, version, ip, port);
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

  unregister(name, version, ip, port) {
    const key = this.getKey(name, version, ip, port);
    delete this.services[key];
    console.log(`Deleted service ${name}, version${version} at ${ip}:${port}`);

    return key;
  }
}

module.exports = Registry;
