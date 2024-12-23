import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.isConnected = false;
    
    // Handle connection events
    this.client.on('connect', () => {
      this.isConnected = true;
    });

    this.client.on('error', (error) => {
      console.error(`Redis client error: ${error}`);
      this.isConnected = false;
    });

    // Promisify Redis methods
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.setexAsync = promisify(this.client.setex).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  /**
   * Checks if connection to Redis is alive
   * @returns {boolean} true if connection is successful, false otherwise
   */
  isAlive() {
    return this.isConnected;
  }

  /**
   * Gets value for given key from Redis
   * @param {string} key - Key to retrieve value for
   * @returns {Promise<string|null>} Value associated with key
   */
  async get(key) {
    try {
      const value = await this.getAsync(key);
      return value;
    } catch (error) {
      console.error(`Error getting key ${key}: ${error}`);
      return null;
    }
  }

  /**
   * Sets key-value pair in Redis with optional expiration
   * @param {string} key - Key to set
   * @param {*} value - Value to store
   * @param {number} duration - Time in seconds until expiration (optional)
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    try {
      if (duration) {
        await this.setexAsync(key, duration, value);
      } else {
        await this.setAsync(key, value);
      }
    } catch (error) {
      console.error(`Error setting key ${key}: ${error}`);
    }
  }

  /**
   * Deletes key-value pair from Redis
   * @param {string} key - Key to delete
   * @returns {Promise<void>}
   */
  async del(key) {
    try {
      await this.delAsync(key);
    } catch (error) {
      console.error(`Error deleting key ${key}: ${error}`);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
