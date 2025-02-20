import chai from 'chai';
import redisClient from '../utils/redis';

const expect = chai.expect;

describe('RedisClient', () => {
    it('get(myCheckerKey) returns null when key does not exist', async () => {
        const result = await redisClient.get('myCheckerKey');
        expect(result).to.equal(null);
    });
});
