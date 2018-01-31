import { Tracker } from './tracker';

export class Information {
    seed: string = 'testmatch';

    player1: string = 'TheRooseIsLoose89';
    player2: string = 'Shedd';
    player1_twitch: string = 'TheRooseIsLoose89';
    player2_twitch: string = 'Shedd_';
    player1_timerVisible: boolean = false;
    player2_timerVisible: boolean = false;
    player1_finishTime: string = '0:00:00';
    player2_finishTime: string = '0:00:00';
    currentAudioOnPlayer: number = 1;
    commentators: string = 'MeldonTaragon, CovertMuffin';
    matchType: string = 'Exhibition';
    background: string = 'ginso'
    tracker: Tracker = new Tracker();
}