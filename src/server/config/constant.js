const path = require('path');

export default {
    localData: path.join(path.dirname(__dirname), 'localData'),
    localMetadata: path.join(
        path.dirname(__dirname),
        'localMetadata',
        'data.json',
    ),
};
