import { Component, Input, transition } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Information } from '../services/information';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import * as $ from 'jquery';
import io from 'socket.io-client';
import { retry } from 'rxjs/operators/retry';

@Component({
  templateUrl: './controls.html',
  styleUrls: ['./controls.css']
})
export class ControlsCMP {
  constructor() {}

  ngOnInit(){
    this.seed = this.urlSeed;
    this.socket.on('data', function(data: Information){
      if(data.seed !== this.seed)
        return;

        if(this.updating)
          return;

      this.vm = data;


    }.bind(this));

    this.socket.on('timer', function(start: boolean, data: Information){
      if(data.seed !== this.seed)
        return;

      if(!start) {
        clearInterval(this.player1Interval);
        clearInterval(this.player2Interval);
        this.ticks1 = "0:00:00";
        this.ticks2 = "0:00:00";
      }
      else {
        if(this.timerStarted) return;

        this.timerStarted = true;
        var seconds = new Date().getTime(), last = seconds;
        this.player1Interval = setInterval(function(){
          if(this.timer1Paused)
            return;

          var now = new Date().getTime();
          last = now;
          this.ticks1 = moment().startOf('day').seconds((now - seconds) / 1000).format('H:mm:ss');
        }.bind(this), 100);

        this.player2Interval = setInterval(function(){
          if(this.timer2Paused)
            return;

          var now = new Date().getTime();
          last = now;
          this.ticks2 = moment().startOf('day').seconds((now - seconds) / 1000).format('H:mm:ss');
        }.bind(this), 100);
      }
    }.bind(this));

    this.socket.on('timer1', function(finished: boolean, data: Information) {
      if(data.seed !== this.seed)
        return;

      if(!finished) {
      }
      else {
        this._vm.player1_finishTime = this.ticks1;
        this.socket.emit('data', this.vm);
        clearInterval(this.player1Interval);
      }
    }.bind(this));

    this.socket.on('timer2', function(finished: boolean, data: Information) {
      if(data.seed !== this.seed)
        return;

      if(!finished) {
      }
      else {
        this._vm.player2_finishTime = this.ticks2;
        this.socket.emit('data', this.vm);
        clearInterval(this.player2Interval);
      }
    }.bind(this));

    console.log(this.players);
  }

  playersList: any;
  urlSeed: string = window.location.href.split('=')[1];
  timerStarted: boolean = false;
  timer1Paused: boolean = false;
  timer2Paused: boolean = false;
  hasPlayer1Finished: boolean = false;
  hasPlayer2Finished: boolean = false;

  canStartTimer: boolean = !this.timer1Paused && !this.timer2Paused && !this.timerStarted;

  ticks1: string = "0:00:00";
  ticks2: string = "0:00:00";
  player1Interval: any;
  player2Interval: any;
  public nameTimer: Observable<number> = Observable.timer(0, 1000);
  public timer2: Observable<number> = Observable.timer(0, 1000);
  private $timer2: Subscription;
  socket: any = io.connect(environment.socketPath);
  isLinked: boolean = false;
  linkedInterval: any;

  p1StatsSelectionId: number = 0;
  p2StatsSelectionId: number = 0;

  setBackground(background: string) {
    switch(background){
      case "swamp":
        this._vm.groupName = "Thornfelt Swamp";
        this._vm.matchType = this.setGroupName(this._vm.groupName);
        break;
      case "swallowsnest":
      this._vm.groupName = "Swallow's Nest";
      this._vm.matchType = this.setGroupName(this._vm.groupName);
        break;
      case "lostgrove":
      this._vm.groupName = "Lost Grove";
      this._vm.matchType = this.setGroupName(this._vm.groupName);
        break;
      case "misty":
      this._vm.groupName = "Misty Woods";
      this._vm.matchType = this.setGroupName(this._vm.groupName);
        break;
      case "spidercoves":
      this._vm.groupName = "Spider Coves";
      this._vm.matchType = this.setGroupName(this._vm.groupName);
        break;
      case "grove":
      this._vm.groupName = "Hollow Grove";
      this._vm.matchType = this.setGroupName(this._vm.groupName);
        break;
      case "forlorn":
      this._vm.groupName = "Forlorn Ruins";
      this._vm.matchType = this.setGroupName(this._vm.groupName);
        break;
      case "spiritcaverns":
      this._vm.groupName = "Spirit Caverns";
      this._vm.matchType = this.setGroupName(this._vm.groupName);
        break;
      case "ginso":
      this._vm.groupName = "Ginso Tree";
      this._vm.matchType = this.setGroupName(this._vm.groupName);
        break;
      case "horu":
      this._vm.groupName = "Mount Horu";
      this._vm.matchType = this.setGroupName(this._vm.groupName);
        break;
      case "glades":
      this._vm.groupName = "Sunken Glades";
      this._vm.matchType = this.setGroupName(this._vm.groupName);
        break;
      case "grotto":
      this._vm.groupName = "Gumo's Hideout";
      this._vm.matchType = this.setGroupName(this._vm.groupName);
        break;
      case "moongrotto":
      this._vm.groupName = "Moon Grotto";
      this._vm.matchType = this.setGroupName(this._vm.groupName);
        break;
      case "blackroot":
      this._vm.groupName = "Blackroot Burrows";
      this._vm.matchType = this.setGroupName(this._vm.groupName);
        break;
      case "valley":
      this._vm.groupName = "Valley of the Wind";
      this._vm.matchType = this.setGroupName(this._vm.groupName);
        break;
      case "sorrow":
      this._vm.groupName = "Sorrow Pass";
      this._vm.matchType = this.setGroupName(this._vm.groupName);
        break;
      case "kurosnest":
      this._vm.groupName = "Kuro's Nest";
      this._vm.matchType = this.setGroupName(this._vm.groupName);
        break;
      case "fil":
        this._vm.groupName = "Fil";
        this._vm.matchType = this.setDivisionName(this._vm.groupName);
      break;
      case "eki":
        this._vm.groupName = "Eki";
        this._vm.matchType = this.setDivisionName(this._vm.groupName);
      break;
      case "ano":
        this._vm.groupName = "Ano";
        this._vm.matchType = this.setDivisionName(this._vm.groupName);
      break;
      case "leru":
        this._vm.groupName = "Leru";
        this._vm.matchType = this.setDivisionName(this._vm.groupName);
      break;
      case "reem":
        this._vm.groupName = "Reem";
        this._vm.matchType = this.setDivisionName(this._vm.groupName);
      break;
      case "ilo":
        this._vm.groupName = "Ilo";
        this._vm.matchType = this.setDivisionName(this._vm.groupName);
      break;
      case "tatsu":
        this._vm.groupName = "Tatsu";
        this._vm.matchType = this.setDivisionName(this._vm.groupName);
      break;
      case "nir":
        this._vm.groupName = "Nir";
        this._vm.matchType = this.setDivisionName(this._vm.groupName);
      break;
    }
    this._vm.background = background;
  }

  private setDivisionName(name: string){
    return name + " Division";
  }

  private setGroupName(name: string){
    return "Group Stage - " + name;
  }

  updateInfo(){
    this.socket.emit('data', this.vm);
  }

  linkTracker() {
    if(this.isLinked)
      return;

    this.isLinked = true;

    this.linkedInterval = setInterval(function(){
      $.ajax({
        url: "https://www.meldontaragon.org/ori/tracker/allskills/server.php?match=" + this._vm.seed,
        dataType: "json",
        error: function(response) {
          console.log(response);
        },
        success: function( response: any ) {
            this._vm.tracker = JSON.parse(JSON.stringify(response));
            this.socket.emit('tracker', this.vm);
        }.bind(this)
      });
    }.bind(this), 1000);
  }

  unlink(){
    this.isLinked = false;
    clearInterval(this.linkedInterval);
  }

  start() {
    var changedTimer = false;
    if(this.timer1Paused){
      changedTimer = true;
      clearInterval(this.player1Interval);
      this.timer1Paused = false;

      var ticks1Array = this.ticks1.split(":");

      var newTicksSecondsHours = (parseInt(ticks1Array[0]) * 3600);
      var newTicksSecondsMinutes = (parseInt(ticks1Array[1]) * 60);
      var newTicksSeconds = parseInt(ticks1Array[2]) + newTicksSecondsHours + newTicksSecondsMinutes;
      var newP1TimerTicks = moment().startOf('day').seconds(newTicksSeconds).format('H:mm:ss');

      var p1seconds = new Date().getTime() - (newTicksSeconds * 1000);

      this.player1Interval = setInterval(function(){
        if(this.timer1Paused)
          return;

          var now = new Date().getTime();

        this.ticks1 = moment().startOf('day').seconds((now - p1seconds) / 1000).format('H:mm:ss');
      }.bind(this), 100);
    }

    if(this.timer2Paused){
      changedTimer = true;
      clearInterval(this.player2Interval);
      this.timer2Paused = false;

      var ticks2Array = this.ticks2.split(":");

      var newTicks2SecondsHours = (parseInt(ticks2Array[0]) * 3600);
      var newTicks2SecondsMinutes = (parseInt(ticks2Array[1]) * 60);
      var newTicks2Seconds = parseInt(ticks2Array[2]) + newTicks2SecondsHours + newTicks2SecondsMinutes;
      var newP2TimerTicks = moment().startOf('day').seconds(newTicks2Seconds).format('H:mm:ss');

      var p2seconds = new Date().getTime() - (newTicks2Seconds * 1000);

      this.player2Interval = setInterval(function(){
        if(this.timer2Paused)
          return;

          var now = new Date().getTime();

        this.ticks2 = moment().startOf('day').seconds((now - p2seconds) / 1000).format('H:mm:ss');
      }.bind(this), 100);

    }

    if(changedTimer){
      console.log(p2seconds);
      console.log(p1seconds);
      if(p2seconds > p1seconds){
        if(p1seconds !== undefined)
        this.socket.emit('timer-set', p1seconds, this.vm);
        else
        this.socket.emit('timer-set', p2seconds, this.vm);
      } else {
        if(p2seconds !== undefined)
          this.socket.emit('timer-set', p2seconds, this.vm);
          else
          this.socket.emit('timer-set', p1seconds, this.vm);
      }
      changedTimer = false;
    }

    if(this.timer2Paused){
      return;
    }

    if(this.hasPlayer1Finished && this.hasPlayer2Finished){
      return;
    }

    if(!this.timerStarted){
      this.socket.emit('timer', true, this.vm);
    }

    this.timer1Paused = false;
    this.timer2Paused = false;
  }

  player1Paused(){
    if(this.timerStarted)
      this.timer1Paused = true;

  }

  player2Paused(){
    if(this.timerStarted)
      this.timer2Paused = true;
  }

  reset() {
  if(!confirm("Reset?"))
  return;

    this.timerStarted = false;
    this.timer1Paused = false;
    this.timer2Paused = false;
    this.hasPlayer1Finished = false;
    this.hasPlayer2Finished = false;
    this._vm.player1_finishTime = "0:00:00";
    this._vm.player2_finishTime = "0:00:00";
    this.socket.emit('data', this.vm);
    this.socket.emit('timer', false, this.vm);
  }

  player1Finished() {
    if(this.hasPlayer1Finished){
      this._vm.player1_finishTime = this.ticks1;
      this.socket.emit('data', this.vm);
      return;
    }

    this.hasPlayer1Finished = true;
    this.socket.emit('timer1', true, this.vm);
  }

  player2Finished() {
    if(this.hasPlayer2Finished){
      this._vm.player2_finishTime = this.ticks2;
      this.socket.emit('data', this.vm);
      return;
    }

    this.hasPlayer2Finished = true;
    this.socket.emit('timer2', true, this.vm);
  }

  setP1Name(event: any){
    var runner = jQuery.grep(this.players, function(n: any, i) {
      return n.name == event;
    })[0];
    this.vm.player1 = runner.preferredName;
    this.vm.player1_seed = runner.seed;
  }

  setP2Name(event: any){
    var runner = jQuery.grep(this.players, function(n: any, i) {
      return n.name == event;
    })[0];
    this.vm.player2 = runner.preferredName;
    this.vm.player2_seed = runner.seed;
  }

  private _vm: Information = new Information();
  public get vm(): Information {
    return this._vm;
  }

  public set vm(info: Information) {
    this._vm = info;
  }

  public get hidePlayer1Timer(): boolean {
    return this._vm.player1_timerVisible;
  }

  public set hidePlayer1Timer(timerSelected: boolean) {
    this._vm.player1_timerVisible = timerSelected;
  }

  public get hidePlayer2Timer(): boolean {
    return this._vm.player2_timerVisible;
  }

  public set hidePlayer2Timer(timerSelected: boolean) {
    this._vm.player2_timerVisible = timerSelected;
  }

  public set matchType(matchType: string){
    this._vm.matchType = matchType;
  }

  public get matchType(): string {
    return this._vm.matchType;
  }

  public set commentators(commentators: string){
    this._vm.commentators = commentators;
  }

  public get commentators(): string {
    return this._vm.commentators;
  }

public get seed(): string {
  return this._vm.seed;
}

public set seed(seed: string){
  this._vm.seed = seed;
}

  public get p1_name(): string {
    return this._vm.player1;
  }

  public set p1_name(p1: string) {
    this._vm.player1 = p1;
  }

  public get p2_name(): string {
    return this._vm.player2;
  }

  public set p2_name(p2: string) {
    this._vm.player2 = p2;
  }

  public get p1_twitch(): string {
    return this._vm.player1_twitch;
  }

  public set p1_twitch(p1: string){
    this._vm.player1_twitch = p1;
  }

  public get p2_twitch(): string {
    return this._vm.player2_twitch;
  }

  public set p2_twitch(p2: string){
    this._vm.player2_twitch = p2;
  }

  public get p1_seed(): string {
    return this._vm.player1_seed;
  }

  public set p1_seed(p1: string){
    this._vm.player1_seed = (p1 !== "" || undefined || null) ? p1 : null;
  }

  public get p2_seed(): string {
    return this._vm.player2_seed;
  }

  public set p2_seed(p2: string){
    this._vm.player2_seed = (p2 !== "" || undefined || null) ? p2 : null;
  }

  public get p1_audio(): boolean {
    return this._vm.currentAudioOnPlayer == 1;
  }

  public set p1_audio(audioSelected: boolean) {
    this._vm.currentAudioOnPlayer = audioSelected ? 1 : this._vm.currentAudioOnPlayer;
  }

  public get p2_audio(): boolean {
    return this._vm.currentAudioOnPlayer == 2;
  }

  public set p2_audio(audioSelected: boolean) {
    this._vm.currentAudioOnPlayer = audioSelected ? 2 : this._vm.currentAudioOnPlayer;
  }

  setP1Stats() {
    this._vm.player1_stats = this.p1StatsSelectionId;

    var title = jQuery.grep(this.stats, function(n: any, i) {
      return n.index == this.p1StatsSelectionId;
    }.bind(this))[0];

    this.socket.emit('p1Stats', this._vm, title.name);
  }

  setP2Stats() {
    this._vm.player2_stats = this.p2StatsSelectionId;

    var title = jQuery.grep(this.stats, function(n: any, i) {
      return n.index == this.p2StatsSelectionId;
    }.bind(this))[0];

    this.socket.emit('p2Stats', this._vm, title.name);
  }

  stats = [{
    index: 0,
    name: "Average Race Time"
  },
  {
    index: 1,
    name: "Best Race Time"
  },
  {
    index: 2,
    name: "Worst Race Time"
  },
  {
    index: 12,
    name: "Grotto God Cycle (Success %)"
  },
  {
    index: 19,
    name: "Grotto Skip (Success %)"
  },
  {
    index: 34,
    name: "Swamp Entry (Success %)"
  },
  {
    index: 43,
    name: "Kuro CS Skip (Success %)"
  },
  {
    index: 50,
    name: "Stompless (Success %)"
  },
  {
    index: 59,
    name: "Sorrow Bash (Success %)"
  },
  {
    index: 86,
    name: "Door Warp (Success %)"
  },
  {
    index: 87,
    name: "Grenade Jump (Success %)"
  },
  {
    index: 3,
    name: "Wall Jump (Average)"
  },
  {
    index: 4,
    name: "Wall Jump (Best)"
  },
  {
    index: 5,
    name: "Wall Jump (Worst)"
  },
  {
    index: 6,
    name: "Dash (Average)"
  },
  {
    index: 7,
    name: "Dash (Best)"
  },
  {
    index: 8,
    name: "Dash (Worst)"
  },
  {
    index: 13,
    name: "Double Jump (Average)"
  },
  {
    index: 14,
    name: "Double Jump (Best)"
  },
  {
    index: 15,
    name: "Double Jump (Worst)"
  },
  {
    index: 22,
    name: "Enter Ginso (Average)"
  },
  {
    index: 23,
    name: "Enter Ginso (Best)"
  },
  {
    index: 24,
    name: "Enter Ginso (Worst)"
  },
  {
    index: 28,
    name: "Bash (Average)"
  },
  {
    index: 29,
    name: "Bash (Best)"
  },
  {
    index: 30,
    name: "Bash (Worst)"
  },
  {
    index: 37,
    name: "Stomp (Average)"
  },
  {
    index: 38,
    name: "Stomp (Best)"
  },
  {
    index: 39,
    name: "Stomp (Worst)"
  },
  {
    index: 44,
    name: "Charge Flame (Average)"
  },
  {
    index: 45,
    name: "Charge Flame (Best)"
  },
  {
    index: 46,
    name: "Charge Flame (Worst)"
  },
  {
    index: 51,
    name: "Feather (Average)"
  },
  {
    index: 52,
    name: "Feather (Best)"
  },
  {
    index: 53,
    name: "Feather (Worst)"
  },
  {
    index: 60,
    name: "Charge Jump (Average)"
  },
  {
    index: 61,
    name: "Charge Jump (Best)"
  },
  {
    index: 62,
    name: "Charge Jump (Worst)"
  },
  {
    index: 66,
    name: "Climb (Average)"
  },
  {
    index: 67,
    name: "Climb (Best)"
  },
  {
    index: 68,
    name: "Climb (Worst)"
  },
  {
    index: 72,
    name: "Grenade (Average)"
  },
  {
    index: 73,
    name: "Grenade (Best)"
  },
  {
    index: 74,
    name: "Grenade (Worst)"
  },
  {
    index: 78,
    name: "Enter Horu (Average)"
  },
  {
    index: 79,
    name: "Enter Horu (Best)"
  },
  {
    index: 80,
    name: "Enter Horu (Worst)"
  }
]

  players = [
    {
        "name": "acridstingray3",
        "preferredName": "Acrid",
        "startColumn": "B3",
        "endColumn": "J3",
        "statsStartColumn": "B3",
        "statsEndColumn": "CP3",
        "seed": ""
    },
    {
        "name": "AHuntersPixxel",
        "preferredName": "Pixxel",
        "startColumn": "B4",
        "endColumn": "J4",
        "statsStartColumn": "B4",
        "statsEndColumn": "CP4",
        "seed": ""
    },
    {
        "name": "Axetox",
        "preferredName": "Noxitu",
        "startColumn": "B5",
        "endColumn": "J5",
        "statsStartColumn": "B5",
        "statsEndColumn": "CP5",
        "seed": ""
    },
    {
      "name": "bdbrufus",
      "preferredName": "Rufus",
      "startColumn": "B6",
      "endColumn": "J6",
      "statsStartColumn": "B6",
      "statsEndColumn": "CP6",
      "seed": ""
    },
    {
      "name": "Brynhold2",
      "preferredName": "Brynhold",
      "startColumn": "B7",
      "endColumn": "J7",
      "statsStartColumn": "B7",
      "statsEndColumn": "CP7",
      "seed": ""
    },
    {
      "name": "Cereberon",
      "preferredName": "Cereberon",
      "startColumn": "B8",
      "endColumn": "J8",
      "statsStartColumn": "B8",
      "statsEndColumn": "CP8",
      "seed": ""
    },
    {
      "name": "CheeseLover",
      "preferredName": "Cheese Lover",
      "startColumn": "B9",
      "endColumn": "J9",
      "statsStartColumn": "B9",
      "statsEndColumn": "CP9",
      "seed": ""
    },
    {
      "name": "chicken_supreme",
      "preferredName": "Chicken Supreme",
      "startColumn": "B10",
      "endColumn": "J10",
      "statsStartColumn": "B10",
      "statsEndColumn": "CP10",
      "seed": ""
    },
    {
      "name": "Cleanfel",
      "preferredName": "Clean",
      "startColumn": "B11",
      "endColumn": "J11",
      "statsStartColumn": "B11",
      "statsEndColumn": "CP11",
      "seed": ""
    },
    {
      "name": "Covert_Muffin",
      "preferredName": "CovertCupcake",
      "startColumn": "B12",
      "endColumn": "J12",
      "statsStartColumn": "B12",
      "statsEndColumn": "CP12",
      "seed": ""
    },
    {
      "name": "Cubby131313",
      "preferredName": "Cubby",
      "startColumn": "B13",
      "endColumn": "J13",
      "statsStartColumn": "B13",
      "statsEndColumn": "CP13",
      "seed": ""
    },
    {
      "name": "cutieroo1",
      "preferredName": "Cutieroo",
      "startColumn": "B14",
      "endColumn": "J14",
      "statsStartColumn": "B14",
      "statsEndColumn": "CP14",
      "seed": ""
    },
    {
      "name": "Dileira",
      "preferredName": "Dileira",
      "startColumn": "B15",
      "endColumn": "J15",
      "statsStartColumn": "B15",
      "statsEndColumn": "CP15",
      "seed": ""
    },
    {
      "name": "elojimmini",
      "preferredName": "Elojimmini",
      "startColumn": "B16",
      "endColumn": "J16",
      "statsStartColumn": "B16",
      "statsEndColumn": "CP16",
      "seed": ""
    },
    {
      "name": "ephpls",
      "preferredName": "Eph",
      "startColumn": "B17",
      "endColumn": "J17",
      "statsStartColumn": "B17",
      "statsEndColumn": "CP17",
      "seed": ""
    },
    {
      "name": "Eviona2",
      "preferredName": "Eviona",
      "startColumn": "B18",
      "endColumn": "J18",
      "statsStartColumn": "B18",
      "statsEndColumn": "CP18",
      "seed": ""
    },
    {
      "name": "Evooki",
      "preferredName": "Evooki",
      "startColumn": "B19",
      "endColumn": "J19",
      "statsStartColumn": "B19",
      "statsEndColumn": "CP19",
      "seed": ""
    },
    {
      "name": "FluffyPrower",
      "preferredName": "Fluffy",
      "startColumn": "B20",
      "endColumn": "J20",
      "statsStartColumn": "B20",
      "statsEndColumn": "CP20",
      "seed": ""
    },
    {
      "name": "Grifs99",
      "preferredName": "Grifs",
      "startColumn": "B21",
      "endColumn": "J21",
      "statsStartColumn": "B21",
      "statsEndColumn": "CP21",
      "seed": ""
    },
    {
      "name": "Grimelios",
      "preferredName": "Grimelios",
      "startColumn": "B22",
      "endColumn": "J22",
      "statsStartColumn": "B22",
      "statsEndColumn": "CP22",
      "seed": ""
    },
    {
      "name": "Hedidiit",
      "preferredName": "Hedidit",
      "startColumn": "B23",
      "endColumn": "J23",
      "statsStartColumn": "B23",
      "statsEndColumn": "CP23",
      "seed": ""
    },
    {
      "name": "HydraSR",
      "preferredName": "Hydra",
      "startColumn": "B24",
      "endColumn": "J24",
      "statsStartColumn": "B24",
      "statsEndColumn": "CP24",
      "seed": ""
    },
    {
      "name": "ICED37",
      "preferredName": "ICED",
      "startColumn": "B25",
      "endColumn": "J25",
      "statsStartColumn": "B25",
      "statsEndColumn": "CP25",
      "seed": ""
    },
    {
      "name": "IMRaziel",
      "preferredName": "Raziel",
      "startColumn": "B26",
      "endColumn": "J26",
      "statsStartColumn": "B26",
      "statsEndColumn": "CP26",
      "seed": ""
    },
    {
      "name": "j_halcyon",
      "preferredName": "J Halcyon",
      "startColumn": "B27",
      "endColumn": "J27",
      "statsStartColumn": "B27",
      "statsEndColumn": "CP27",
      "seed": ""
    },
    {
      "name": "jhobz296",
      "preferredName": "JHobz Numbers",
      "startColumn": "B28",
      "endColumn": "J28",
      "statsStartColumn": "B28",
      "statsEndColumn": "CP28",
      "seed": ""
    },
    {
      "name": "kirefel",
      "preferredName": "Kirefel",
      "startColumn": "B29",
      "endColumn": "J29",
      "statsStartColumn": "B29",
      "statsEndColumn": "CP29",
      "seed": ""
    },
    {
      "name": "LostDedew",
      "preferredName": "LostDedew",
      "startColumn": "B30",
      "endColumn": "J30",
      "statsStartColumn": "B30",
      "statsEndColumn": "CP30",
      "seed": ""
    },
    {
      "name": "Lucidus16",
      "preferredName": "Lucidus",
      "startColumn": "B31",
      "endColumn": "J31",
      "statsStartColumn": "B31",
      "statsEndColumn": "CP31",
      "seed": ""
    },
    {
      "name": "LurkingAssassin",
      "preferredName": "Lurking Assassin",
      "startColumn": "B32",
      "endColumn": "J32",
      "statsStartColumn": "B32",
      "statsEndColumn": "CP32",
      "seed": ""
    },
    {
      "name": "madinsane_",
      "preferredName": "madinsane",
      "startColumn": "B33",
      "endColumn": "J33",
      "statsStartColumn": "B33",
      "statsEndColumn": "CP33",
      "seed": ""
    },
    {
      "name": "mathluco",
      "preferredName": "mathluco",
      "startColumn": "B34",
      "endColumn": "J34",
      "statsStartColumn": "B34",
      "statsEndColumn": "CP34",
      "seed": ""
    },
    {
      "name": "MeldonTaragon",
      "preferredName": "Meldon Taragon",
      "startColumn": "B35",
      "endColumn": "J35",
      "statsStartColumn": "B35",
      "statsEndColumn": "CP35",
      "seed": ""
    },
    {
      "name": "millsmess123",
      "preferredName": "millsmess",
      "startColumn": "B36",
      "endColumn": "J36",
      "statsStartColumn": "B36",
      "statsEndColumn": "CP36",
      "seed": ""
    },
    {
      "name": "monkley6",
      "preferredName": "Monkley",
      "startColumn": "B37",
      "endColumn": "J37",
      "statsStartColumn": "B37",
      "statsEndColumn": "CP37",
      "seed": ""
    },
    {
      "name": "MrGreeZ",
      "preferredName": "MrGreeZ",
      "startColumn": "B38",
      "endColumn": "J38",
      "statsStartColumn": "B38",
      "statsEndColumn": "CP38",
      "seed": ""
    },
    {
      "name": "MrRandomson",
      "preferredName": "MrRandomson",
      "startColumn": "B39",
      "endColumn": "J39",
      "statsStartColumn": "B39",
      "statsEndColumn": "CP39",
      "seed": ""
    },
    {
      "name": "ogndrahcir",
      "preferredName": "ogndrahcir",
      "startColumn": "B40",
      "endColumn": "J40",
      "statsStartColumn": "B40",
      "statsEndColumn": "CP40",
      "seed": ""
    },
    {
      "name": "oshiimine",
      "preferredName": "oshiimine",
      "startColumn": "B41",
      "endColumn": "J41",
      "statsStartColumn": "B41",
      "statsEndColumn": "CP41",
      "seed": ""
    },
    {
      "name": "Phant_TV",
      "preferredName": "Phant",
      "startColumn": "B42",
      "endColumn": "J42",
      "statsStartColumn": "B42",
      "statsEndColumn": "CP42",
      "seed": ""
    },
    {
      "name": "qqstafoo",
      "preferredName": "Stafoo",
      "startColumn": "B43",
      "endColumn": "J43",
      "statsStartColumn": "B43",
      "statsEndColumn": "CP43",
      "seed": ""
    },
    {
      "name": "rainbowpoogle",
      "preferredName": "Rainbow Poogle",
      "startColumn": "B44",
      "endColumn": "J44",
      "statsStartColumn": "B44",
      "statsEndColumn": "CP44",
      "seed": ""
    },
    {
      "name": "RedR3dRum",
      "preferredName": "RedR3dRum",
      "startColumn": "B45",
      "endColumn": "J45",
      "statsStartColumn": "B45",
      "statsEndColumn": "CP45",
      "seed": ""
    },
    {
      "name": "Roryrai",
      "preferredName": "Roryrai",
      "startColumn": "B46",
      "endColumn": "J46",
      "statsStartColumn": "B46",
      "statsEndColumn": "CP46",
      "seed": ""
    },
    {
      "name": "shedd_",
      "preferredName": "shedd",
      "startColumn": "B47",
      "endColumn": "J47",
      "statsStartColumn": "B47",
      "statsEndColumn": "CP47",
      "seed": ""
    },
    {
      "name": "sickynar",
      "preferredName": "Sickynar",
      "startColumn": "B48",
      "endColumn": "J48",
      "statsStartColumn": "B38",
      "statsEndColumn": "CP48",
      "seed": ""
    },
    {
      "name": "sigmasin",
      "preferredName": "sigma",
      "startColumn": "B49",
      "endColumn": "J49",
      "statsStartColumn": "B49",
      "statsEndColumn": "CP49",
      "seed": ""
    },
    {
      "name": "Skulblaka17",
      "preferredName": "Skulblaka",
      "startColumn": "B50",
      "endColumn": "J50",
      "statsStartColumn": "B50",
      "statsEndColumn": "CP50",
      "seed": ""
    },
    {
      "name": "SkyFouxx",
      "preferredName": "SkyFouxx",
      "startColumn": "B51",
      "endColumn": "J51",
      "statsStartColumn": "B51",
      "statsEndColumn": "CP51",
      "seed": ""
    },
    {
      "name": "sloaters27",
      "preferredName": "sloaters",
      "startColumn": "B52",
      "endColumn": "J52",
      "statsStartColumn": "B52",
      "statsEndColumn": "CP52",
      "seed": ""
    },
    {
      "name": "SmashyLe",
      "preferredName": "Smashy",
      "startColumn": "B53",
      "endColumn": "J53",
      "statsStartColumn": "B53",
      "statsEndColumn": "CP53",
      "seed": ""
    },
    {
      "name": "SomniRespiratoryFlux",
      "preferredName": "Flux",
      "startColumn": "B54",
      "endColumn": "J54",
      "statsStartColumn": "B54",
      "statsEndColumn": "CP54",
      "seed": ""
    },
    {
      "name": "SonikBuster",
      "preferredName": "SonikBuster",
      "startColumn": "B55",
      "endColumn": "J55",
      "statsStartColumn": "B55",
      "statsEndColumn": "CP55",
      "seed": ""
    },
    {
      "name": "TAS_Snoop",
      "preferredName": "Snoopy",
      "startColumn": "B56",
      "endColumn": "J56",
      "statsStartColumn": "B56",
      "statsEndColumn": "CP56",
      "seed": ""
    },
    {
      "name": "Terra21",
      "preferredName": "Terra",
      "startColumn": "B57",
      "endColumn": "J57",
      "statsStartColumn": "B57",
      "statsEndColumn": "CP57",
      "seed": ""
    },
    {
      "name": "TheRooseIsLoose89",
      "preferredName": "TheRooseIsLoose",
      "startColumn": "B58",
      "endColumn": "J58",
      "statsStartColumn": "B58",
      "statsEndColumn": "CP58",
      "seed": ""
    },
    {
      "name": "thesparik",
      "preferredName": "Sparik",
      "startColumn": "B59",
      "endColumn": "J59",
      "statsStartColumn": "B59",
      "statsEndColumn": "CP59",
      "seed": ""
    },
    {
      "name": "TheStimon456",
      "preferredName": "Stimon",
      "startColumn": "B60",
      "endColumn": "J60",
      "statsStartColumn": "B60",
      "statsEndColumn": "CP60",
      "seed": ""
    },
    {
      "name": "ThisIsNotSully",
      "preferredName": "ThisIsNotSully",
      "startColumn": "B61",
      "endColumn": "J61",
      "statsStartColumn": "B61",
      "statsEndColumn": "CP61",
      "seed": ""
    },
    {
      "name": "Tritonite_",
      "preferredName": "Tritonite",
      "startColumn": "B62",
      "endColumn": "J62",
      "statsStartColumn": "B62",
      "statsEndColumn": "CP62",
      "seed": ""
    },
    {
      "name": "trojandude12",
      "preferredName": "Trojandude",
      "startColumn": "B63",
      "endColumn": "J63",
      "statsStartColumn": "B63",
      "statsEndColumn": "CP63",
      "seed": ""
    },
    {
      "name": "uncleronny",
      "preferredName": "Ronny",
      "startColumn": "B64",
      "endColumn": "J64",
      "statsStartColumn": "B64",
      "statsEndColumn": "CP64",
      "seed": ""
    },
    {
      "name": "Vennguard",
      "preferredName": "Vennguard",
      "startColumn": "B65",
      "endColumn": "J65",
      "statsStartColumn": "B65",
      "statsEndColumn": "CP65",
      "seed": ""
    },
    {
      "name": "Vulajin",
      "preferredName": "Vulajin",
      "startColumn": "B66",
      "endColumn": "J66",
      "statsStartColumn": "B66",
      "statsEndColumn": "CP66",
      "seed": ""
    },
    {
      "name": "Willson",
      "preferredName": "Willson",
      "startColumn": "B67",
      "endColumn": "J67",
      "statsStartColumn": "B67",
      "statsEndColumn": "CP67",
      "seed": ""
    },
    {
      "name": "xaviershay",
      "preferredName": "Xavier",
      "startColumn": "B68",
      "endColumn": "J68",
      "statsStartColumn": "B68",
      "statsEndColumn": "CP68",
      "seed": ""
    },
    {
      "name": "Xeirla",
      "preferredName": "Xeirla",
      "startColumn": "B69",
      "endColumn": "J69",
      "statsStartColumn": "B69",
      "statsEndColumn": "CP69",
      "seed": ""
    },
    {
      "name": "xephros",
      "preferredName": "Xeph",
      "startColumn": "B70",
      "endColumn": "J70",
      "statsStartColumn": "B70",
      "statsEndColumn": "CP70",
      "seed": ""
    },
    {
      "name": "Yoco21",
      "preferredName": "Yoco",
      "startColumn": "B71",
      "endColumn": "J71",
      "statsStartColumn": "B71",
      "statsEndColumn": "CP71",
      "seed": ""
    },
    {
      "name": "Zacknir",
      "preferredName": "Zacknir",
      "startColumn": "B72",
      "endColumn": "J72",
      "statsStartColumn": "B72",
      "statsEndColumn": "CP72",
      "seed": ""
    },
    {
      "name": "Zic3",
      "preferredName": "Zic",
      "startColumn": "B73",
      "endColumn": "J73",
      "statsStartColumn": "B73",
      "statsEndColumn": "CP73",
      "seed": ""
    }
  ]
}