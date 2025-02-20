import chai from 'chai';
import redisClient from '../utils/redis';

const expect = chai.expect;

describe('RedisClient', () => {
    it('isAlive() returns false when Redis is not started', () => {
        expect(redisClient.isAlive()).to.equal(false);
    });
});
