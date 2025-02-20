import chai from 'chai';
import redisClient from '../utils/redis';

const expect = chai.expect;

describe('RedisClient', () => {
    before(async () => {
        await redisClient.set('myCheckerKey', '89', 10);
    });

    it('get(myCheckerKey) returns 89 when key exists', async () => {
        const result = await redisClient.get('myCheckerKey');
        expect(result).to.equal('89');
    });
});
