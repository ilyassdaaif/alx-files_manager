import chai from 'chai';
import redisClient from '../utils/redis';

const expect = chai.expect;

describe('RedisClient', () => {
    it('set(setCheckerKey, 89, 3) correctly saves with expiration', async () => {
        await redisClient.set('setCheckerKey', '89', 3);
        const result = await redisClient.get('setCheckerKey');
        expect(result).to.equal('89');
        
        // Wait for expiration
        await new Promise(resolve => setTimeout(resolve, 4000));
        const expiredResult = await redisClient.get('setCheckerKey');
        expect(expiredResult).to.equal(null);
    });
});
