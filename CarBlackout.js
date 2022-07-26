import * as alt from 'alt-client';
import * as game from 'natives';

export default async () => {

};

const lPlayer = alt.Player.local;
let isBlackedOutAlready = false;

function blackout() {
    if (!isBlackedOutAlready) {
        isBlackedOutAlready = true;
        game.doScreenFadeOut(100);
        setTimeout(() => screenFadeIn(), 1500);
        setTimeout(() => isBlackedOutAlready = false, 3000);
    }
}

function screenFadeIn() {
    game.doScreenFadeIn(700)
}

function vehicleSpeedCheck() {
    const vehicle = lPlayer.vehicle;

    let currentSpeedCurrent = (game.getEntitySpeed(vehicle) * 3.6)

    if (currentSpeedCurrent <= 15) {
        blackout();
        game.setVehicleEngineHealth(vehicle, 0);
        game.setVehicleEngineOn(vehicle, false, true, true);
    }
}

function blackoutLogic(oldSpeed) {
    const vehicle = lPlayer.vehicle;

    if (game.doesEntityExist(vehicle.scriptID)) {
        let currentSpeed = (game.getEntitySpeed(vehicle) * 3.6);
        if (currentSpeed >= 50) {
            setTimeout(() => vehicleSpeedCheck(), 50);
        }
    }

}

function blackoutCrash() {
    const vehicle = lPlayer.vehicle;

    if (vehicle !== null) {
        const oldSpeed = (game.getEntitySpeed(vehicle) * 3.6);  
        setTimeout(() => blackoutLogic(oldSpeed), 100);
    }

}

alt.everyTick(blackoutCrash);
