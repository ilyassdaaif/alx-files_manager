import dbClient from './utils/db';

const waitConnection = () => {
    return new Promise((resolve, reject) => {
        let i = 0;
        const repeatFct = async () => {
            setTimeout(() => {
                i += 1;
                if (i >= 10) {
                    reject(new Error('Could not connect to MongoDB after 10 attempts'));
                } else if (!dbClient.isAlive()) {
                    console.log('Trying to connect...');
                    repeatFct();
                } else {
                    resolve();
                }
            }, 1000);
        };
        repeatFct();
    });
};

(async () => {
    try {
        console.log(dbClient.isAlive()); // Should initially be false
        await waitConnection(); // Wait for the connection to establish
        console.log(dbClient.isAlive()); // Should be true once connected
        console.log(await dbClient.nbUsers()); // Get the number of users
        console.log(await dbClient.nbFiles()); // Get the number of files
    } catch (err) {
        console.error('An error occurred:', err.message);
    }
})();