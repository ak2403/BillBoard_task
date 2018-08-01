var fs = require('fs')
    , filename = './droneInput.txt';

fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    // getInput = '<vxx<vxx^vxx<>>x';
    getInput = data;
    let directions = {
        '^': "north",
        'v': "south",
        '>': "east",
        '<': "west",
        'x': "photograph"
    }

    let reachedPos = [],
        repeatedShoot = {};

    var PhotoShoot = 0,
        positionDirect = '',
        beforePos = '';

    for (let i = 0; i < getInput.length; i++) {
        if (getInput[i] == 'x') {

            // console.log(positionDirect)
            if (positionDirect != '') {
                PhotoShoot += 1;
                reachedPos.push(positionDirect);
                beforePos = positionDirect;
                positionDirect = '';
            } else {
                if (reachedPos.indexOf(beforePos) != -1) {
                    repeatedShoot[beforePos] ? (repeatedShoot[beforePos] += 1) : (repeatedShoot[beforePos] = 2);
                }
            }
        } else {
            positionDirect += getInput[i]
        }
    }

    console.log(Object.keys(repeatedShoot).length)
    console.log("Number of BiiBoard photographed : ", PhotoShoot);
});