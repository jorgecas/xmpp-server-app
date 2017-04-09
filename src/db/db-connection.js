var mongoose = require('mongoose');

mongoose.Promise = global.Promise;


class DbConnection {
    constructor() {
        const clusters = function() {
            const clusters = [
                'cluster0-shard-00-00-xlqth.mongodb.net:27017',
                'cluster0-shard-00-01-xlqth.mongodb.net:27017',
                'cluster0-shard-00-02-xlqth.mongodb.net:27017'
            ];
            return clusters.join(',')
        };
        const user = 'language-web';
        const password = 'A1Ba67ei02y3pbZh',
        const schema = 'language-app';
        const uri = `mongodb://${user}:${password}@${clusters()}/${schema}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`;

        this.connection = mongoose.connect(uri).then(
            () => {
                console.info('connection succeded');
            },
            err => {
                console.error(err);
            }
        );
    }
}

module.exports = new DbConnection();