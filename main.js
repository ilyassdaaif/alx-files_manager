import redisClient from './utils/redis.js';

(async () => {
  // Wait for the Redis client to connect
  await new Promise((resolve) => {
    redisClient.client.on('ready', resolve);
  });

  console.log(redisClient.isAlive()); // Should now print `true`
  console.log(await redisClient.get('myKey')); // Should print `null`
  await redisClient.set('myKey', 12, 5); // Set 'myKey' to 12 with a 5-second expiration
  console.log(await redisClient.get('myKey')); // Should print `12`

  setTimeout(async () => {
    console.log(await redisClient.get('myKey')); // Should print `null` after 10 seconds
  }, 1000 * 10);
})();
