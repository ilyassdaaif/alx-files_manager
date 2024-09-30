// utils/redis.js
const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => console.error('Redis Client Error', err));
  }

  isAlive() {
    return this.client.connected;
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;