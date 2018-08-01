var fs = require('fs')
    , filename = './droneInput.txt';


fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    getInput = data;

    let directions = {
        '^': "north",
        'v': "south",
        '>': "east",
        '<': "west",
        'x': "photograph"
    }

    let reachedPos = [];

    let tookPhoto = 0,
        positionDirect = '';

    for (let i = 0; i < getInput.length; i++) {
        if (getInput[i] == 'x') {
            if (positionDirect) {
                if (reachedPos.indexOf(positionDirect) != -1) {
                    console.log('repeated')
                } else {
                    tookPhoto += 1;
                    reachedPos.push(positionDirect)
                }
            }
        } else {
            positionDirect += getInput[i]
        }
    }
    // console.log(tookPhoto);
});