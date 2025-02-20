import chai from 'chai';
import redisClient from '../utils/redis';

const expect = chai.expect;

describe('RedisClient', () => {
    before(async () => {
        await redisClient.set('aDelCheckerKey', '89', 10);
    });

    it('del(aDelCheckerKey) removes the key', async () => {
        await redisClient.del('aDelCheckerKey');
        const result = await redisClient.get('aDelCheckerKey');
        expect(result).to.equal(null);
    });
});
