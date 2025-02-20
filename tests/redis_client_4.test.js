import chai from 'chai';
import redisClient from '../utils/redis';

const expect = chai.expect;

describe('RedisClient', () => {
    it('set(setCheckerKey, 89) correctly saves the value', async () => {
        await redisClient.set('setCheckerKey', '89', 10);
        const result = await redisClient.get('setCheckerKey');
        expect(result).to.equal('89');
    });
});
