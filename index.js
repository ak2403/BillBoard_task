var fs = require('fs')
    , filename = './droneInput.txt';

fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    // getInput = '^<xv>xv>x^<x^<x^<xv>x';
    getInput = data;
    let directions = {
        '^': "north",
        'v': "south",
        '>': "east",
        '<': "west",
        'x': "photograph"
    }

    let kmsCovered = {
        'Tonorth': 0,
        'Tosouth': 0,
        'Towest': 0,
        'Toeast': 0,
        'vertlD': 0,
        'horiD': 0
    }

    let reachedPos = [],
        repeatedShoot = {};

    var PhotoShoot = 0,
        positionDirect = { North: 0, East: '' },
        beforePos = '';

    for (let i = 0; i < getInput.length; i++) {
        if (getInput[i] == 'x') {
            let getPos = 'N' + positionDirect['North'] + 'E' + positionDirect['East'];
            if (reachedPos.indexOf(getPos) == -1) {
                PhotoShoot += 1;
                reachedPos.push(getPos);
                beforePos = getPos;
            } else {
                if (reachedPos.indexOf(beforePos) != -1) {
                    repeatedShoot[beforePos] ? (repeatedShoot[beforePos] += 1) : (repeatedShoot[beforePos] = 2);
                }
            }
        } else {
            if (getInput[i] == '^' || getInput[i] == 'v') {
                getInput[i] == '^' ? positionDirect['North'] += 1 : positionDirect['North'] -= 1;
                getInput[i] == '^' ? kmsCovered['vertlD'] += 1 : kmsCovered['vertlD'] -= 1;
                (kmsCovered['vertlD'] > kmsCovered['Tonorth']) && (kmsCovered['Tonorth'] = kmsCovered['vertlD']);
                (kmsCovered['vertlD'] < kmsCovered['Tosouth']) && (kmsCovered['Tosouth'] = kmsCovered['vertlD']);
            } else {
                getInput[i] == '>' ? positionDirect['East'] += 1 : positionDirect['East'] -= 1;
                getInput[i] == '>' ? kmsCovered['horiD'] += 1 : kmsCovered['horiD'] -= 1;
                (kmsCovered['horiD'] > kmsCovered['Toeast']) && (kmsCovered['Toeast'] = kmsCovered['horiD']);
                (kmsCovered['horiD'] < kmsCovered['Towest']) && (kmsCovered['Towest'] = kmsCovered['horiD']);
            }
        }
    }

    verticalDistance = kmsCovered['Tonorth'] + Math.abs(kmsCovered['Tosouth']);
    horizontalDistance = kmsCovered['Toeast'] + Math.abs(kmsCovered['Towest']);

    console.log("Area covered by drone " + verticalDistance * horizontalDistance + " sq.kms");
    console.log("Number of BillBoard photographed more than one : ", Object.keys(repeatedShoot).length)
    console.log("Number of BillBoard photographed : ", PhotoShoot);
});