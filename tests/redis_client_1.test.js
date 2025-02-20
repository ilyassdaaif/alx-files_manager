import chai from 'chai';
import redisClient from '../utils/redis';

const expect = chai.expect;

describe('RedisClient', () => {
    it('isAlive() returns true when Redis is started', () => {
        expect(redisClient.isAlive()).to.equal(true);
    });
});
