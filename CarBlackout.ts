import * as alt from 'alt-client';
import * as game from 'natives';

export default async () => {

};

function blackout() {
    if (!isBlackedOutAlready) {
        isBlackedOutAlready = true;
        game.doScreenFadeOut(0);
        game.doScreenFadeIn(3000);
        isBlackedOutAlready = false;
    }
}



var isBlackedOutAlready = false;

function blackoutLogic(oldDamage) {
    const lPlayer = alt.Player.local;
    var vehicle = lPlayer.vehicle;

    if (lPlayer.vehicle !== null) {
        if (game.doesEntityExist(vehicle.scriptID)) {
            var currentDamage = game.getVehicleBodyHealth(vehicle);
            if (currentDamage !== oldDamage) {
                if (!isBlackedOutAlready && (currentDamage < oldDamage) && ((oldDamage - currentDamage) >= 25)) {
                    blackout();
                    game.setVehicleEngineHealth(vehicle, 0);
                    game.setVehicleEngineOn(vehicle, false, true, true);
                }
            }
        }
    }
}

function blackoutCrash() {
    const lPlayer = alt.Player.local;
    var vehicle = lPlayer.vehicle;

    if (vehicle !== null) {
        const oldDamage = game.getVehicleBodyHealth(alt.Player.local.vehicle);
        setTimeout(() => blackoutLogic(oldDamage), 100);
    }



}

alt.everyTick(blackoutCrash);
