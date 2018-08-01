var fs = require('fs')
    , filename = './droneInput.txt';

fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    // getInput = '<vxx<vxx^vxx<>>>>>>x';
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
        positionDirect = '',
        beforePos = '';

    for (let i = 0; i < getInput.length; i++) {
        if (getInput[i] == 'x') {

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
            if (getInput[i] == '^' || getInput[i] == 'v') {
                getInput[i] == '^' ? kmsCovered['vertlD'] += 1 : kmsCovered['vertlD'] -= 1;
                (kmsCovered['vertlD'] > kmsCovered['Tonorth']) && (kmsCovered['Tonorth'] = kmsCovered['vertlD']);
                (kmsCovered['vertlD'] < kmsCovered['Tosouth']) && (kmsCovered['Tosouth'] = kmsCovered['vertlD']);
            }else{
                getInput[i] == '>' ? kmsCovered['horiD'] += 1 : kmsCovered['horiD'] -= 1;
                (kmsCovered['horiD'] > kmsCovered['Toeast']) && (kmsCovered['Toeast'] = kmsCovered['horiD']);
                (kmsCovered['horiD'] < kmsCovered['Towest']) && (kmsCovered['Towest'] = kmsCovered['horiD']);
            }

            positionDirect += getInput[i]
        }
    }

    verticalDistance = kmsCovered['Tonorth']+Math.abs(kmsCovered['Tosouth']);
    horizontalDistance = kmsCovered['Toeast']+Math.abs(kmsCovered['Towest']);
    
    console.log("Area which the drone covered is " + verticalDistance*horizontalDistance + " sq.kms");
    // console.log(Object.keys(repeatedShoot).length)
    console.log("Number of BiiBoard photographed : ", PhotoShoot);
});