const {createClient} = require('redis');
const redisClient = createClient({
    host: 'redis-server',
    port: 6379
});
redisClient.on('error', (err) => console.error('Redis Error:', err));

(async () => {
    await redisClient.connect();
    console.log('🚀 Connected to Redis');
})();

module.exports = redisClient;