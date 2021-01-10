var ctx = canvas.getContext("2d");

function positionCanvas(){
  canvas.width = (innerHeight * 1.5)|0;
  canvas.height = innerHeight;
  page.style.minHeight = innerHeight + "px";
  const canvasLeft = ((innerWidth - canvas.width) / 2) | 0;
  canvas.style.left = canvasLeft+"px";  
}
function mainLoop(time){
  if(canvas.height !== innerHeight){
    positionCanvas();
  }
    game.time = time;
    game.update();
    requestAnimationFrame(mainLoop);
}

window.focus();
positionCanvas();
function log(...data){  console.log(...data) }
const doFor = (count, callback) => {var i = 0; while (i < count && callback(i ++) !== true ); };
const setOf = (count, callback) => {var a = [],i = 0; while (i < count) { a.push(callback(i ++)) } return a };
const levels = [{
    name : "Da Start!",
    layout : [
        "ffffffff#f#ffffffff",
        "fccc#####f#####dddf",
        "f####         ####f",
        "f#3   #######   3#f",
        "f# ##         ## #f",
        "f# #  ## # ##  # #f",
        "f# # ##  #  ## # #f",
        "f#    # ### #    #f",
        "#####         #####",
        "ff    H##B###    ff",
        "##### #49B97# #####",
        "f#    #95869#    #f",
        "f# # #######I# # #f",
        "f# #     2     # #f",
        "f# ### ## ## ### #f",
        "f#     #   #     #f",
        "f# ##### # ##### #f",
        "f#3             3#f",
        "f########f########f",
        "ffffffff#f#ffffffff"
    ],
    ghostLeave : [ // travel directions out of home
        [0,0,3,3,2],
        [2,3,0,0,3,3,2],
        [2,2,2,3,0,0,3,3,0],
        [1,2,2,2,2,3,0,0,3,3,0],
    ],
    ghostToHomePos : [ [2,2,3], [2],[0], [0,0,3] ], // traveldirection from home point(8 on map) to home start pos

},{
   name : "Test ya bitmap map.",
   layout : [
        "fffffffffffffffffffffff",
        "f#####################f",
        "f#3                 3#f",
        "f# ## ### ### ### ## #f",
        "f# ##      #      ## #f",
        "f#    # ## # ## #    #f",
        "f# ####         #### #f",
        "f#      #######      #f",
        "f#### #    B    # ####f",
        "f     # H##B### #     f",
        "f#### # #45867# # ####f",
        "fccc# # ######I # #dddf",
        "ff### #         # ###ff",
        "ff#     #######     #ff",
        "f## ###    2    ### ##f",
        "f#      ##### #      #f",
        "f# # ## #     # ## # #f",
        "f# #    # #####    # #f",
        "f#3#### #     # ####3#f",
        "f#        ###        #f",
        "f##########f##########f",
        "fffffffffffffffffffffff" ,
    ] ,
    ghostLeave : [
        [0,0,3,3],
        [0,3,3,0,0,0,0],
        [-1,-1,2,3,3,2,2,2],
        [-1,-1,2,2,3,3],
    ],
    ghostToHomePos : [ [2,2], [2],[0], [0,0] ],
},{
    name : "BOOO ya!",
    layout : [
        "fffffff#f#fffffff",
        "fccc####f####dddf",
        "f####       ####f",
        "f#3   #####   3#f",
        "####         ####",
        "ff   H##B###   ff",
        "#### #49B97# ####",
        "f#   #95869#   #f",
        "f# # ######I # #f",
        "f# #    2    # #f",
        "f# #### # #### #f",
        "f#3           3#f",
        "f#######f#######f",
        "fffffff#f#fffffff"
    ],
    ghostLeave : [
        [0,0,3,3,2],
        [2,3,0,0,3,3,2],
        [2,2,2,3,0,0,3,3,0],
        [1,2,2,2,2,3,0,0,3,3,0],
    ],
    ghostToHomePos : [ [2,2,3], [2],[0], [0,0,3] ],
},{
    name : "MegaMap",
    layout : [
        "ffffffffffffff#f#ffffffffffffff",
        "ffccc#####ffff# #ffff#####dddff",
        "f#########ffff# #ffff#########f",
        "f#   #   ###### ######   #   #f",
        "f# #   #               #   # #f",
        "f# ######## # ### # ######## #f",
        "f#    #     #     #     #    #f",
        "f# ## # ### # ### # ### # ## #f",
        "f#3     #      3      #     3#f",
        "####### # ### ### ### # #######",
        "f       #                     f",
        "####### # # H##B### # # #######",
        "f#      # # #45867# # #      #f",
        "f# ## # # # ######I # # # ## #f",
        "f# #  # #             # #  # #f",
        "f# # ## ### ####### ### ## # #f",
        "f# #           2           # #f",
        "f# # ## ### ### ### ### ## # #f",
        "f#3#  # #             # #  #3#f",
        "f# ## # # ## ##### ## # # ## #f",
        "f#         #       #         #f",
        "f#### ## # ### # ### # ## ####f",
        "f#     # #           # #     #f",
        "f# # ### # #### #### # ### # #f",
        "f# #     # #ff# #ff# #     # #f",
        "f# ##### # #ff# #ff# # ##### #f",
        "f#        3#ff# #ff#3        #f",
        "f###########ff# #ff###########f",
        "ffffffffffffff#f#ffffffffffffff",
    ],
    ghostLeave : [
        [0,0,3,3],
        [0,3,3,0,0,0,0],
        [-1,-1,2,3,3,2,2,2],
        [-1,-1,2,2,3,3],
    ],
    ghostToHomePos : [ [2,2], [2],[0], [0,0] ],    
    
}];
doFor(levels.length,i=>{
    levels[i].layout = levels[i].layout.map(row => row.split("").map(c => c === "#" ? 1 : c === " " ? 0 : parseInt(c,36)));
});
const easeInOut = (time, amount = 2) => { 
    time = time < 0 ? 0 : time > 1 ? 1 : time;
    var t2 = Math.pow(time, amount);
    return t2 / (t2 + Math.pow(1 - time,amount)) 
}
const ease = (time, amount = 2) =>  Math.pow(time < 0 ? 0 : time > 1 ? 1 : time, amount); 
// simple circular buffer with no bounds checking
const createCircleBuf = (size) => {
    var tw = 0;
    var tr = 0;
    const path = new Uint8Array(size);
    return {
        empty () { tw = tr = 0 },
        write (val) { path[(tw++) % size] = val },
        read () { if(tr < tw) { return path[(tr++) % size] } },
        writeBuf (array) {
            for(var i = 0; i < array.length; i++){
                path[(tw++) % size] = array[i];
            }
        },
        getAt (pos) { if(tr + pos < tw){ return path[(tr+pos) % size] } },
        length () { return tw - tr },
    }
};
const keyboard = (() => {
    const keys = {
        ArrowUp : false,
        ArrowDown : false,
        ArrowLeft : false,
        ArrowRight : false,
        anyKey : false,
    };
    const callbacks = {};
    function keyEvents(e){
        const isDown = e.type === "keydown";
        if(keys[e.code] !== undefined){
            keys[e.code] = isDown;
            e.preventDefault();
        }
        keys.anyKey = isDown;
        if(callbacks[e.code] && isDown){
          callbacks[e.code](e);
        }
    }
    const API = {
        start(){
            addEventListener("keyup", keyEvents);
            addEventListener("keydown", keyEvents);
            if (window.keys === undefined) { window.keys = keys }
            return keys;
        },
        stop(){
            removeEventListener("keyup", keyEvents);
            removeEventListener("keydown", keyEvents);
        },
        addCallback(keyName,callback){
          callbacks[keyName] = callback;
        },
    }
    return API;
})();
var imageTools = {
    canvas(width, height) {  // create a blank image (canvas)
        var c = document.createElement("canvas");
        c.width = width;
        c.height = height;
        return c;
    },
    createImage (width, height) {
        var i = this.canvas(width, height);
        i.ctx = i.getContext("2d");
        return i;
    },
}
function createMap(){
    const map = {
        map : null,
        ghostExitInstructions : null,
        styles : {
            stdCellSize : 32,
            background : "black",
            walls : "blue",
            dot : "yellow",
            dotRad : 5,
            pill : "#D8F",
            pillRad : 8,
            textCol : "red",
            font : "32px arial black",
            levelCompleteFont : "32px arial black",
            levelCompleteCol : "yellow",
            levelCompleteMessage : "Level cleared.",
            levelCompleteTime : 4000,
            gameOverFont : "48px arial black",
            gameOverCol : "yellow",
            gameOverMessage : "Game Over",
            nextLifeFont : "32px arial black",
            nextLifeCol : "cyan",
            nextLifeMessage : "Next up.",
            nextLifeTime : 5000, // time to wait for next life;
            textScoreCol : "yellow",
            fontScore : "18px arial black",
            fontLives : "18px arial black",
            fontSmall : "12px arial black",
            playerColor : "yellow",
            ghostColors : ["Red","#0D0","Blue","Cyan"],
            ghostBrowColors : ["#D00","#0C0","#00D","#0DD"],
            ghostRunCol : "purple",
            ghostEyeWhite : "white",
            ghostEye : "black",
            ghostMouth : "black",
            ghostSway : 0.5,
            ghostSwayPissedOff : 1,
            scoreFloatCol : "Cyan",
            browMorphRate : 0.06, // perFrame unit change 
            mouthMorphRate : 0.01, // perFrame unit change 
            blinkRate : 1/200, // odds per frame of blinking
            blinkTime : 7, // number of frames
            lookRate : 1/500, // odds per frame of blinking
            lookTime : 100, // number of frames
            mouthChangeRate : 1/100,//1/1000,
            powerUpTime : 1000, // in frames
            cellSize : 24,
        },
        playerInfo : {
            startX : 0,
            startY : 0,
            lives : 3,
        },
        mapping : (()=>{
            const swayAmount = 0.1;
            const dirs = [[1,0,0,swayAmount],[0,1,Math.PI * (1/2),-swayAmount],[-1,0,Math.PI,swayAmount / 4],[0,-1,Math.PI *(3/2),-swayAmount/4]];
            const isOpen = (x,y,dir) => {
                var d = dirs[dir % 4];
                x = ((x + m.width) + d[0]) % m.width;
                y = ((y + m.height) + d[1]) % m.height;
                var l =  mapRaw[x+y*m.width];
                return (l !== 1 && l !== 11);
            }
            const isOpenG = (id,x,y,dir) => {
                var d = dirs[dir % 4];
                x = ((x + m.width) + d[0]) % m.width;
                y = ((y + m.height) + d[1]) % m.height;
                var ghostAtPos = false;
                doFor(id,i=>{
                    if(Math.abs(ghostPos[i][0] - x) < 2 && Math.abs(ghostPos[i][1]- y) < 2){
                        ghostAtPos = true;
                    }
                });
                if(ghostAtPos) {return false }
                var l =  mapRaw[x+y*m.width];
                return (l !== 1 && l !== 11);
            }
            const isWall = (x,y,dir) => {
                var d = dirs[dir % 4];
                x = ((x + m.width) + d[0]) % m.width;
                y = ((y + m.height) + d[1]) % m.height;
                var l =  mapRaw[x+y*m.width];
                return (l === 1);
            };
            const ghostPos = [[0,0],[0,0],[0,0],[0,0]];
            var mapRaw;
            var homingMap;
            var mapSource; 
            //               [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
            var mapConvert = [2,1,0,3,4,5,6,7,8,9,10,11,12,13,14,15,16,1 ,1 ,19,20,21];
            
            const m = {
                length : 0,
                width : 0,
                height : 0,
                getHomingMap(){ return homingMap },
                getPlayMap(){ return mapRaw },
                directions : dirs,
                setGhostPos(id,x,y){
                      ghostPos[id][0] = x;
                      ghostPos[id][1] = y;
                },
                getMapSize(){
                    m.height = map.map.length;
                    m.width = map.map[0].length;
                    m.length = m.width *  m.height;
                },
                getCount(type){
                    var count = 0;
                    doFor(mapRaw.length,i=>count += mapRaw[i] === type ? 1: 0);
                    return count;
                },
                getAt(x,y){ return mapRaw[x + y * m.width] },
                setAt(x,y,c) { mapRaw[x + y * m.width] = c },
                getGOptionsAt(id,x,y,dir,array = []){
                    var c = 0;
                    if( isOpenG(id,x, y, dir) ) { array[(c++) + 1] = dir % 4 }
                    if( isOpenG(id,x, y, dir+1) ) { array[(c++) + 1] = (dir + 1) % 4 }
                    if( isOpenG(id,x, y, dir+3) ) { array[(c++) + 1] = (dir + 3) % 4 }
                    if( isOpenG(id,x, y, dir+2) ) { array[(c++) + 1] = (dir + 2) % 4 }
                    array[0] = c;
                    while(c < 4){ array[(c++)+1] = -1 }
                    return array;
                },
                getOptionsAt(x,y,dir,array = []){
                    var c = 0;
                    if( isOpen(x, y, dir) ) { array[(c++) + 1] = dir % 4 }
                    if( isOpen(x, y, dir+1) ) { array[(c++) + 1] = (dir + 1) % 4 }
                    if( isOpen(x, y, dir+3) ) { array[(c++) + 1] = (dir + 3) % 4 }
                    if( isOpen(x, y, dir+2) ) { array[(c++) + 1] = (dir + 2) % 4 }
                    array[0] = c;
                    while(c < 4){ array[(c++)+1] = -1 }
                    return array;
                },
                getWalledAt(x,y,dir,array = []){
                    var c = 0;
                    if( isWall(x, y, dir) ) { array[(c++) + 1] = dir % 4 }
                    if( isWall(x, y, dir+1) ) { array[(c++) + 1] = (dir + 1) % 4 }
                    if( isWall(x, y, dir+3) ) { array[(c++) + 1] = (dir + 3) % 4 }
                    if( isWall(x, y, dir+2) ) { array[(c++) + 1] = (dir + 2) % 4 }
                    array[0] = c;
                    return array;
                },
                findMapCoordOf(id, coord = {}, index = 0){
                    index = mapRaw.indexOf(id,index);
                    if(index > -1){
                        coord.x = index % this.width;
                        coord.y = (index / this.width) | 0;
                        coord.index = index;
                    }else{
                        coord.index = -1;
                    }
                    return coord;
                },     
                findMapSCoordOf(id, coord = {}, index = 0){
                    index = mapSource.indexOf(id,index);
                    if(index > -1){
                        coord.x = index % this.width;
                        coord.y = (index / this.width) | 0;
                        coord.index = index;
                    }else{
                        coord.index = -1;
                    }
                    return coord;
                },                 
                getHomeDirection(x,y){
                    return homingMap[x + y * this.width];
                },
                createHoming(){
                    function setM(ind,dir){
                        if(homingMap[ind] === 2 || homingMap[ind] === 3 ){
                            workMap[ind] = dir + 10;
                        }
                    }
                    const w = this.width;
                    homingMap = new Uint8Array(mapRaw);
                    var workMap = Uint8Array.from(homingMap);
                    var working = true;
                    const negDir = [-1,-w,1,w];
                    const codes = [8,10,11,12,13];
                    const checks = [ [0,2,1,3],[0,1,3],[0,2,1],[2,1,3],[0,2,3]];
                    while(working){
                        working = false;
                        for(var y = 1; y < this.height-1; y ++){
                            for(var x = 1; x < w-1; x ++){
                                var ind = x + y *  w;
                                var c = homingMap[ind];
                                if(c === 2 || c === 3){ working = true }
                                else {
                                    var ind1 = codes.indexOf(c);
                                    if(ind1 > -1){
                                        var cc = checks[ind1];
                                        doFor(cc.length,j => { setM(ind + negDir[cc[j]], cc[j]) })
                                    }
                                }
                            }
                        }
                        homingMap.set(workMap);
                    }   
                    for(var i = 0; i < this.length; i++){
                        if(homingMap[i] >= 10){  homingMap[i] -= 10 }
                        else{ homingMap[i] = 5 }
                    }
                },
                getRunningMaps(){
                    m.getMapSize();
                    mapRaw = new Uint8Array(m.length);
                    mapSource = new Uint8Array(m.length);
                    var i = 0;
                    map.map.forEach(row => {
                        row.forEach(cell => {
                            mapSource[i] =cell;
                            mapRaw[i++] = mapConvert[cell];
                        })
                    });
                    this.createHoming();
                }
            }
            return m;
        })(),
        cellsX : null,
        cellsY : null,
        gridX : 0,
        gridY : 0,
        scaleX : 1, // rendering canvas scale
        scaleY : 1,
        scoreX : null,
        scoreY : 0,
        livesX : null,
        livesY : 0,
        newMap : false,
        image : imageTools.createImage(300,150), // default canvas size
        // LOOKOUT Y,X reversed in arg list (so I dont have to put in Undefined when setting Y)
        drawText(text, font = map.styles.font, col = map.styles.textCol,y = map.image.height / 4, x =map.image.width / 2){
            ctx.font = font;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "black";
            ctx.fillText(text, x,y+5);
            ctx.fillStyle = col;
            ctx.fillText(text, x,y);
        },
        showMap(){
            const gx = map.gridX;
            const gy = map.gridY;
            const scaleX = (canvas.width + gx) / map.image.width;
            const scaleY = (canvas.height + gy) / map.image.height;
            const gsx = gx * map.scaleX;
            const gsy = gy * map.scaleY;
            ctx.setTransform(1,0,0,1,0,0);
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(map.image,-((gsx/2)|0),-((gsy/2)|0),canvas.width+gsx,canvas.height+gsy);
            ctx.imageSmoothingEnabled = true;
            map.scaleX = (canvas.width + gsx) / map.image.width;
            map.scaleY = (canvas.height + gsy) / map.image.height;            

            ctx.setTransform(map.scaleX,0,0,map.scaleY,-((gsx/2)|0),-((gsy/2)|0));
        },   
        createGhost(ctx,id){
            function getDistToPlayer(player,x,y,d){
                x =  player.x - (((x + m.width) + dirs[d][0]) %  m.width) * gx;
                y =  player.y - (((y +  m.height) + dirs[d][1]) %  m.height) * gy;
                return x * x + y * y;
            }
            const gx = map.gridX;
            const gy = map.gridY;             
            const shape = [
                [0.5,0, 0.75,0.1, 0.8,0.3, 0.8,0.9, 0.7,1, 0.6,0.9, 0.5,1, 0.4,0.9, 0.3,1, 0.2,0.9, 0.2,0.3, 0.25,0.1],
                [0.5,0, 0.75,0.1, 0.8,0.3, 0.8,1, 0.7,0.9, 0.6,1, 0.5,0.9, 0.4,1, 0.3,0.9, 0.2,1, 0.2,0.3, 0.25,0.1]
            ].map(s=>s.map((v,i)=>{
                v = (v - 0.5) * 1.4 + 0.5;
                v = i % 2 === 0 ? v * gx : v * gy;
                return v;   
            }));
            const scaleShape = (v, i) => i % 2 === 0? v * gx : v * gy;
            const eyes = [0.3,0.3,0.2,0.7,0.3,0.2].map(scaleShape);
            const m = map.mapping;

            const speed = 1;
            const runSpeed = 0.8;
            const deadSpeed = 2;
            var currentSpeed = speed;
            const dirs = m.directions;
            var animCount = id * 16;
            var frameCount = 0;
            var hunting = false; // hunting pac man
            var running = false; // running away from pac man
            var flash = false;   // flashing that about to change back to hunting
            var flashRate = 32;
            var dead = false;  // ghost is dead and heading home
            var inForTheKill = false; // if true ghost improves its pac man hunting
            var pissedOff = 0;
            var planTravelAt = 0;  // when to recaculate path
            const maxDist = m.width * m.width + m.height * m.height;
            var destX = 0;
            var destY = 0;
            const travelOptions = [0,0,0,0,0]; // first item is number of option
            const tOp = travelOptions;
            const travel = createCircleBuf(20); // holds future moves
            var wait = false;
            var waitHere = false;
            var waitAtX = 0;
            var waitAtY = 0;
            // ghost extras for cute factor
            var blink = 0;
            var looking = 0;
            var changeBrow = false;
            var lookDir = 0;
            var moveDir = 0;
            const brow = [-8,2,0,0,8,2];
            const browFrom = [-8,2,0,0,8,2];
            const browM = [-8,2,0,0,8,2];
            var browMorph = 0
            const brows = {
                setMorphSource(){
                    doFor(6,i=>browFrom[i]=brow[i]);
                    browMorph = 1;
                },
                norm(){
                    brows.setMorphSource();
                    brow[1] = brow[5] = 2;
                    brow[0] = -8;
                    brow[4] = 8;
                    brow[3] = 0;
                },
                mad(){
                    brows.setMorphSource();
                    brow[1] = brow[5] = -2;
                    brow[3] = 2;
                    brow[0] = -7;
                    brow[4] = 7;
                },
                happy(){
                    brows.setMorphSource();
                    brow[1] = brow[5] = -2;
                    brow[0] = -7;
                    brow[4] = 7;
                    brow[3] = -2;
                },
                dumb(){
                    brows.setMorphSource();
                    brow[1] = brow[5] = 2;
                    brow[0] = -8;
                    brow[4] = 8;
                    brow[3] = 2;                    
                },
                strange(){
                    brows.setMorphSource();
                    brow[1] = 0.5;
                    brow[5] = 2;
                    brow[3] = 0.0;                    
                }
            }
            brows.types = [brows.norm,brows.mad,brows.happy,brows.dumb,brows.strange];
            function setBrow(){
                if(inForTheKill){
                    brows.mad();
                }else{
                    brows.types[(Math.random() * brows.types.length) | 0]();                
                }
            }
            const mouth =     [-4,0,0,0,0,0,4,0,2]; // last val is line width
            const mouthFrom = [-4,0,0,0,0,0,4,0,2]; 
            const mouthM = [-4,0,0,0,0,0,4,0,2]; 
            var mouthMorph = 0;
            var mouthMorphSpeed = 0;
            var mouthChangeRate = 1 / 100;
            const mouthRunning = [-4,2,-2,0,2,0,4,2];
            const mouthPissed = [-4,-1,4,0,-4,1,4,0]; 
            var sway = 0;
            var swayTime = 0;
            var swayAng = 0;
            var swayAngChase = 0;
            const changeMouth = ()=>{
                doFor(9,i=>mouthFrom[i]=mouth[i]);
                mouthMorph = 1;
                mouthMorphSpeed = Math.random()*0.2 + 0.05;
                if(Math.random()< 0.33){
                    mouth[0] = -(Math.random() * 2 + 2);
                    mouth[1] = Math.random() * 2 - 1;
                    mouth[6] = Math.random() * 2 + 2;
                    mouth[7] = Math.random() *2 - 1;
                    if(Math.random() < 0.5){
                        mouth[4] = mouth[2] = Math.random() * 2 - 1;
                        mouth[5] = mouth[3] = Math.random() * 2;
                    }else{
                        mouth[4] = mouth[2] = (mouth[0] + mouth[6]) /2;
                        mouth[5] = mouth[3] = (mouth[1] + mouth[7]) /2
                    }
                    mouth[8] = Math.random()*2 + 2;
                    mouthChangeRate = 1 / (Math.random() * 100 + 100);
                }else if(Math.random() < 0.5){
                    mouth[0] = -(Math.random() * 2 + 2);
                    mouth[1] = Math.random() * 2 - 1;
                    mouth[2] = -(Math.random() * 2 + 2);
                    mouth[3] = Math.random() *2 + 1;

                    var r = Math.random();
                    mouth[4] = (mouth[2] - mouth[0]) * r + mouth[0];
                    mouth[5] = (mouth[3] - mouth[1]) * r + mouth[1];
                    mouth[6] = Math.random() * 2 + 2;
                    mouth[7] = Math.random() * 4 - 2;

                    mouth[8] = Math.random()*4 + 1;
                    mouthChangeRate = 1 / (Math.random() * 30 + 10);
                    
                }else{
                    mouth[0] = -(Math.random() * 2 +0.1);
                    mouth[1] = Math.random() * 1;
                    mouth[2] = Math.random() * 2 +0.1;
                    mouth[3] = Math.random() *1;

                    var r = Math.random() * 0.5;
                    mouth[4] = (mouth[2] - mouth[0]) * (0.5-r) + mouth[0];
                    mouth[5] = (mouth[2] - mouth[0]) * (0.5+r) + mouth[0];
                    mouth[6] = (mouth[3] - mouth[1]) * (0.5-r) + mouth[1];
                    mouth[7] = (mouth[3] - mouth[1]) * (0.5+r) + mouth[1];

                    mouth[8] = Math.random() *2 + 3;
                    mouthChangeRate = 1 / (Math.random() * 100 + 50);
                    
                    
                }
                setBrow();
            }
            const drawBody = (showSkin) => {
                var i = 0;
                const s = shape[(animCount>>3)%2];
                ctx.lineCap = "round";
                if (showSkin) { ctx.fillStyle = map.styles.ghostRunCol }
                else{ctx.fillStyle = g.color}
                ctx.beginPath();
                while (i < s.length) { ctx.lineTo(s[i++], s[i++]) }
                ctx.fill();                        
            }
            const drawEyeBalls = () => {
                var i = 0;
                ctx.fillStyle = map.styles.ghostEyeWhite;
                ctx.beginPath();
                ctx.arc(eyes[i++], eyes[i++] ,eyes[i++] ,0, Math.PI * 2);
                ctx.moveTo((eyes[i] + eyes[i + 2]) ,eyes[i + 1] );
                ctx.arc(eyes[i++], eyes[i++] ,eyes[i++] ,0, Math.PI * 2);
                ctx.fill();
            }
            const drawEye = (lookAt) => {
                var i = 0;
                const lx = Math.cos(lookDir) * lookAt;
                const ly = Math.sin(lookDir) * lookAt;
                ctx.fillStyle = map.styles.ghostEye;
                ctx.fillRect((eyes[i++] - 2 + lx) ,(eyes[i++] - 2 + ly) ,4, 4);
                i ++;
                ctx.fillRect((eyes[i++] - 2 + lx) ,(eyes[i++] - 2 + ly) ,4, 4);                        
            }
            const drawBlink = () => {
                var i = 0;
                ctx.fillStyle = map.styles.ghostEyeWhite;
                ctx.fillRect((eyes[i++] - eyes[i+1] * 0.8),(eyes[i++]), eyes[i]  * 1.6, 1.5);
                i ++;
                ctx.fillRect((eyes[i++] - eyes[i+1] * 0.8),(eyes[i++]), eyes[i] * 1.6, 1.5);
            }
            const drawBrow = () => {
                var i = 0;
                ctx.strokeStyle = map.styles.ghostBrowColors[id];
                ctx.lineWidth = Math.max(2,4);
                ctx.beginPath();
                if(browMorph > 0){
                    browMorph -= map.styles.browMorphRate;
                    const mv = ease(browMorph);
                    doFor(6,i=>browM[i] = (browFrom[i]-brow[i]) * mv + brow[i]);
                    while(i < browM.length){
                        ctx.lineTo(
                            12 + browM[i++] ,
                            eyes[1]-eyes[2] + browM[i++] 
                        )
                    }
                }else{
                    while(i < brow.length){ctx.lineTo((12 + brow[i++]) ,(eyes[1]-eyes[2] + brow[i++]) )}
                }
                ctx.stroke();                        
            }
            const drawMouth = (showSkin) => {
                var i = 0;
                ctx.strokeStyle = map.styles.ghostMouth;
                ctx.beginPath();
                if(showSkin){
                    ctx.lineWidth = inForTheKill ? 4 : 1;
                    while (i < mouthRunning.length) {ctx.lineTo((12 + mouthRunning[i++]),(17 + mouthRunning[i++])) }
                }else{
                    if(pissedOff){
                        ctx.lineWidth = 3;
                        while (i < mouthRunning.length) {ctx.lineTo((12 + mouthPissed[i++]),(17 + mouthPissed[i++])) }
                    }else{
                        if(mouthMorph > 0){
                            mouthMorph -= mouthMorphSpeed;
                            const mv = Math.max(0,ease(mouthMorph));
                            doFor(6,i=>mouthM[i] = (mouthFrom[i]-mouth[i]) * mv + mouth[i]);  
                            ctx.lineWidth = mouthM[8];
                            while (i < mouth.length-1) { 
                                ctx.moveTo((12.5 + mouthM[i++]) ,(18 + mouthM[i++])); 
                                ctx.lineTo((12.5 + mouthM[i++]) ,(18 + mouthM[i++])); 
                            }
                        }else{
                            ctx.lineWidth = mouth[8];
                            while (i < mouth.length-1) { 
                                ctx.moveTo((12.5 + mouth[i++]) ,(18 + mouth[i++])); 
                                ctx.lineTo((12.5 + mouth[i++]) ,(18 + mouth[i++])); 
                            }
                        }
                    }
                }
                ctx.stroke();
            }
            
            
            var home = {x :0, y : 0, index : 0};
            var safeZone ={
                topLeft : {x :0, y : 0, index : 0},
                botRight : {x :0, y : 0, index : 0},
                x :0,
                y : 0,
                w : 0,
                h : 0,
                setup(){
                    m.findMapSCoordOf(17,safeZone.topLeft);
                    safeZone.x = safeZone.topLeft.x;
                    safeZone.y = safeZone.topLeft.y;
                    m.findMapSCoordOf(18,safeZone.botRight);                    
                    safeZone.x1 = safeZone.botRight.x;
                    safeZone.y1 = safeZone.botRight.y;
                },
                isSafe(x,y){
                    if(x < safeZone.x || x > safeZone.x1 || y < safeZone.y || y > safeZone.y1){
                        return false;
                    }
                    return true;
                }
            }
            const g = {//g for ghost
                x : 0,
                y : 0,
                waiting : false, 
                color : map.styles.ghostColors[id],
                draw(){
                        
                    var i = 0;
                    var ggx, ggy, showSkin, extra, xdx, xdy;
                    if(waitHere){
                        ggx = g.x;
                        ggy = g.y;
                        g.x = waitAtX;
                        g.y = waitAtY;
                    }
                        
                    // make ghost bob up and down
                    const oy = Math.cos((animCount / 64) * Math.PI * 2) * 2;
                    showSkin = false;
                    if(running){
                        showSkin = true
                        if(flash){ showSkin = ((frameCount / flashRate)|0) % 4 > 0 }
                    }
                    sway = Math.sin(swayTime + animCount /95) * 0.1 * Math.sin((swayTime + animCount /95) /1000);
                    swayTime += 0.1 + (id / 50);
                    
                    
                    extra = pissedOff ? map.styles.ghostSwayPissedOff:map.styles.ghostSway;
                    if(running){ sway -= dirs[moveDir][3] * extra }
                    else if(hunting){ sway += dirs[moveDir][3] * extra }
                    swayAngChase += (sway - swayAng) *0.75;
                    swayAngChase *= 0.045;
                    swayAng += swayAngChase;
                    xdx = Math.cos(swayAng);
                    xdy = Math.sin(swayAng);
                    
                    ctx.save();
                    ctx.transform(xdx,xdy,-xdy,xdx,g.x + gx / 2,g.y + gy );
                    ctx.transform(1,0,0,1,-gx/2,-gy + oy);
                    if(!dead){ drawBody(showSkin) }// draw ghost main shape
                    if(blink){ blink -= 1; drawBlink() }
                    else{
                        if(Math.random() < map.styles.blinkRate){
                            blink = map.styles.blinkTime;
                            if(Math.random() < map.styles.lookRate / 10){
                                looking = map.styles.lookTime;
                                lookDir = Math.random() * Math.PI * 2;
                            }                            
                        }
                        if(looking){
                            looking -= 1;
                            if(looking === 0){
                                if(changeBrow) { changeBrow = false; setBrow() }
                            }
                        }else{
                            if(Math.random() < map.styles.lookRate){
                                looking = map.styles.lookTime;
                                if (hunting) { lookDir = dirs[moveDir][2] }
                                else { lookDir = Math.random() * Math.PI * 2 }
                                if(lookDir > Math.PI * 1.2 && lookDir < Math.PI * 1.8){
                                    brows.happy();
                                    changeBrow = true;
                                }
                            }
                        }                        
                        drawEyeBalls();
                        drawEye(looking > 0 ? 2 : 0);
                        if(!dead && !running){ drawBrow() }
                    }
                    if(!dead){ 
                        drawMouth(showSkin);
                        if(Math.random() < mouthChangeRate){ changeMouth() }
                    }    
                    ctx.restore();
                    if(waitHere){
                        g.x = ggx;
                        g.y = ggy;
                    }                    
                },
                move(game){ // does simple ai for ghosts
                    const p = game.player;
                    var px,py,x,y,d,c
                    px = (g.x / gx) | 0;
                    py = (g.y / gy) | 0;
                    var nearG = null;
                    var distG = 100000; 
                    if(!safeZone.isSafe(px,py)){
                        // if ghosts are close then empty the travel plans
                        game.ghosts.eachItem((gg,i)=>{
                            if(i !== id){
                                var x = g.x - gg.x;
                                var y = g.y - gg.y;
                                var dist = Math.sqrt(x*x+y*y);
                                if(dist < distG){
                                    distG = dist;
                                    nearG = gg;
                                }
                            }
                        })             
                        if(distG < gx * 3){
                            travel.empty();
                        }
                    }
                    
                    // Adds position of ghost to mapping so that travel plans can include not
                    // running into each other too much
                    m.setGhostPos(id,px,py);
                    // Ghost is at nest way point
                    if( Math.abs(destX - g.x) <= currentSpeed && Math.abs(destY - g.y) <= currentSpeed){
                        // wait is a cludge I did not think of before hand
                        if(waitHere){
                            waitHere = false;
                            g.x = waitAtX;
                            g.y = waitAtY;
                        }else{
                            g.x = destX;
                            g.y = destY;
                        }
                        px = (g.x / gx) | 0;
                        py = (g.y / gy) | 0;
                         
                        // should this ghost redo its tranvel plans?
                        // the more often they do the better at hunting you down
                        if(travel.length() <= planTravelAt){
                            planTravelAt = 10;
                            travel.empty();
                            if(g.waiting){
                                travel.write(-1);
                            }else if(dead){ // if dead find shortes root to home
                                d = m.getHomeDirection(px,py);
                                if(d > 3){
                                    
                                    travel.empty();
                                    travel.writeBuf(map.ghostToHomePos[id]);
                                    travel.write(-2);
                                    planTravelAt = 0;
                                    
                                }else{
                                    travel.write(d);
                                }
                            }else{
                                x = px;
                                y = py;
                                d = moveDir;
                               // inForTheKill = true;

                                var movesToPlan = 19;
                                while(travel.length() < movesToPlan){
                                    m.getGOptionsAt(id,x,y,d,tOp);
                                    c = tOp[0];
                                    if(c === 0){
                                        m.getOptionsAt(x,y,d,tOp);
                                        c = tOp[0];
                                        d = tOp[c];
                                        movesToPlan = Math.min(19,travel.length() + 1);
                                    }else{
                                        if(c <= 2 /*&& !inForTheKill*/){ d = tOp[1] }
                                        else {
                                            if(inForTheKill || Math.random() < 0.1){
                                                var closest = Infinity;
                                                for(var i = 0; i < c-1; i++){
                                                    var dist = getDistToPlayer(p,x,y,tOp[i + 1]);
                                                    if(running){ dist = maxDist - dist }
                                                    if(dist < closest){
                                                        d = tOp[i + 1];
                                                        closest = dist;
                                                    }
                                                }
                                            }else{
                                                d = tOp[1 + ((Math.random() * c-1) | 0)];
                                            }
                                        }  
                                    }
                                    travel.write(d);
                                    x =  ((x + m.width) + dirs[d][0]) %  m.width;
                                    y =  ((y +  m.height) + dirs[d][1]) %  m.height;
                                }
                            }
                        }
                        
                        moveDir = travel.read();
                        if(moveDir > 128){
                            if(moveDir === 254){
                                g.wait();
                            }
                            moveDir = 0;
                            waitHere = true;
                            waitAtX = g.x;
                            waitAtY = g.y;
                        }
                        destX = ((px +  m.width) + dirs[moveDir][0]) %  m.width;
                        destY = ((py +  m.height) + dirs[moveDir][1]) %  m.height;
                        destX *= gx;
                        destY *= gy;
                    }else{
                        g.x += dirs[moveDir][0] * currentSpeed;
                        g.y += dirs[moveDir][1] * currentSpeed;
                    }
                    var ggx,ggy;
                    if(waitHere){
                        ggx = g.x;
                        ggy = g.y;
                        g.x = waitAtX;
                        g.y = waitAtY;
                    }
                    if(g.x < 0){  g.x +=  m.width * gx }
                    if(g.y < 0){ g.y +=  m.height * gy }
                    if(g.x >=  m.width  * gx){  g.x -=  m.width  * gx }
                    if(g.y >=  m.height  * gy){ g.y -=  m.height  * gy }
                    if(game.debug){
                        px = (destX / gx) | 0;
                        py = (destY / gy) | 0;
                        ctx.beginPath();
                        ctx.lineWidth = 2.5;
                        ctx.strokeStyle = g.color;
                        ctx.lineTo(g.x + gx/2 - 4 + id*2,g.y + gx/2 - 4 + id*2);
                        var gai = 0;
                        var nt = moveDir;
                        var lx,ly; // last pos
                        lx = px;
                        ly = py;
                        while(nt !== undefined){
                            if(gai > 0){
                                px = ((px +  m.width) + dirs[nt][0]) %  m.width;
                                py = ((py +  m.height) + dirs[nt][1]) %  m.height;
                            }
                            if(Math.abs(lx-px) > 1 || Math.abs(ly-py) > 1){
                                ctx.moveTo((px + 0.5)*gx - 4 + id*2,(py + 0.5)*gy - 4 + id*2);
                            }else{
                                ctx.lineTo((px + 0.5)*gx - 4 + id*2,(py + 0.5)*gy - 4 + id*2);
                            }
                            lx = px;
                            ly = py;
                            nt = travel.getAt(gai++);
                        }
                        ctx.stroke();
                    }
                    x = p.x - g.x;
                    y = p.y - g.y;
                    dist = Math.sqrt(x * x + y * y);
                    if(running || hunting){
                        if(dist < Math.min(gx,gy)){
                            if(hunting){
                                p.touchedGhost = 1;
                            }else{
                                g.kill();
                                p.gotGhost += 1;
                            }
                        }else if(dist < gx * 5){
                            inForTheKill = true;
                            looking = 20;
                            lookDir = Math.atan2(y,x);
                            mouthChangeRate = 1/20;
                            if(lookDir > Math.PI * 1.2 && lookDir < Math.PI * 1.8){
                                brows.happy();
                                changeBrow = true;
                            }else{
                                brows.mad();
                            }
                            if(running){
                                pissedOff += 8;
                            }
                        }else{
                            if(pissedOff){
                                brows.mad();
                                lookDir = Math.atan2(y,x);
                                looking = 20;
                                pissedOff -= 1;
                            }
                            inForTheKill = false;
                        }
                    }
                    if(waitHere){
                        g.x = ggx;
                        g.y = ggy;
                    }
                },
                flash(rate){
                   flash = true;  
                   flashRate = rate;
                },
                hunt(){
                    if(dead){
                        destX = g.x = (g.mx = home.x) * gx;
                        destY = g.y = (g.my = home.y) * gy;                        
                        g.waiting = true;
                        
                    }
                    
                    if(g.waiting){
                        g.waiting = false;
                        travel.empty();
                        wait = false;
                        travel.writeBuf(map.ghostExitInstructions[id]);
                    }
                    hunting = true;
                    running = false;
                    dead = false;    
                    currentSpeed = speed;
                },
                kill(){
                    hunting = false;
                    running = false;
                    dead = true;
                    g.waiting = false;
                    game.ghostKilled += 1;  // bad this must be fixed as game should not be global

                    travel.empty();
                    currentSpeed = deadSpeed;
                    pissedOf = 0;
                },
                run(){
                    hunting = false;
                    running = true;
                    dead = false;
                    flash = false;
                    g.waiting = false;
                    currentSpeed = runSpeed;
                },
                wait(){
                    hunting = false;
                    running = false;
                    dead = false;
                    flash = false;
                    g.waiting = true;
                    if(game.ghostKilled === 4){
                        var wc = 0; // get number waiting
                        doFor(4,i=>wc += game.ghosts.items[i].waiting ? 1 : 0);
                        if(wc === 4){
                            game.powerUp = 1;
                        }
                        
                    }
                },
                update(game){
                    animCount += 1;
                    frameCount += 1;
                    if(hunting || running || dead){
                        g.move(game);
                    }
                    g.draw();  
                },
                restart(){
                    m.findMapCoordOf(id + 4,home);
                    safeZone.setup();
                    hunting = false;
                    running = false;
                    dead = false;                    
                    g.waiting = false;
                    frameCount = 0;
                    pissedOff = 0;
                    destX = g.x = (g.mx = home.x) * gx;
                    destY = g.y = (g.my = home.y) * gy;                        
                    travel.empty();
                    travel.writeBuf(map.ghostExitInstructions[id]);
                    planTravelAt = 0;
                    game.ghostKilled = 0;
                    waitHere = false;
                    game.powerUp = 0;
                },
            }

            g.restart();
            return g
            
        },
        createPlayer(ctx){
            var fruitBonus = false;
            var currentBonus = 0;
            var fruitBonusTime = 0;
            const fruits = [cherry,banana,berry,waterMellon];
            var dotCount = 0;
            var powerUpCount = 0;
            const i = map.image;
            const m = map.mapping;
            const gx = map.gridX;
            const gy = map.gridY;       
            const ghx = gx / 2;
            const ghy = gy / 2;
            const speed = 12; // as a fraction of a cell 1/speed * cell
            const col = map.styles.playerColor;
            const radius = ((gx + 2) / 2) | 0;
            const dir = [
                { ang : 0, x : -radius / 3, y : 0},
                { ang : Math.PI * (1/2), x : 0, y : -radius / 3},
                { ang : Math.PI, x : radius / 3, y : 0},
                { ang : Math.PI * (3/2), x : 0, y : radius / 3},
            ];
            const dirs = m.directions;
            const scoreAdd = {
                text : "0",
                x : 0,
                y : 0,
                show : false,
                count : 0,
            };
            var nextScore = 0;
            var showScores = false;
            var ghostScores = [100,200,400,800,1600,3200];
            function addScore(value,x= p.x + gx / 2,y = p.y){
                var d = scoreDisplays[nextScore%5];
                if(value !== undefined){
                    p.scoreAdd += value;
                    d.text = value;
                }else{
                    p.scoreAdd += ghostScores[nextScore];
                    d.text = ghostScores[nextScore++];
                }
                d.x = x;
                d.y = y;
                d.count = 120;
                d.show = true;
                showScores = true;
            }
            const scoreDisplays = [];
            doFor(5,i=>scoreDisplays[i] = Object.assign({},scoreAdd));
            
            const dirLookup = {d01 : 2, d21 : 0, d10 : 3, d12 : 1};
            var dieMouth;

            const moveOpt = [0,1,2,3,4]; // current move options
            const nextMoveOpt = [0,1,2,3,4]; // move options for next cell in direction of movement
            var moveDist = 0; // distance moved from current pos;
            const controls = {
                up : {name : "ArrowUp", dir : 3, on : false},
                down : {name : "ArrowDown", dir : 1, on : false },
                right : {name : "ArrowRight", dir : 0, on : false },
                left : {name : "ArrowLeft", dir : 2, on : false },
                mostResent : [-1,-1,-1,-1],
            }
            // p is player and used to reference the player in this code section
            const p = {
                time : 0,
                x : map.playerInfo.startX * gx,
                y : map.playerInfo.startY * gy,
                mx : map.playerInfo.startX,  // map position
                my : map.playerInfo.startY,
                moveX : 0,
                moveY : 0,
                lives : map.playerInfo.lives,
                score : 0,
                scoreAdd : 0,
                gotGhost : 0,
                touchedGhost : 0,
                mouth : 0,
                mouthPos : 0.05,
                lifeStartTime : 0,
                alive : true,
                playing : false,
                show : true,
                readyForNextLife : false,
                direction : 0,
                drawAlive(){
                    if(!p.show){ return }
                    const open = p.mouthPos;
                    const d = dirs[p.direction];
                    const d1 = dirs[(p.direction + 1) % 4];
                    ctx.fillStyle = col;
                    ctx.miterLimit = 1;
                    ctx.beginPath();
                    ctx.moveTo(p.x + ghx - d[0] * radius * (1/3), p.y + ghy - d[1] * radius * (1/3));
                    ctx.lineTo(p.x + ghx - d[0] * radius * (1/3) + d1[0] * 0.2, p.y + ghy - d[1] * radius * (1/3)+ d1[1] * 0.2);
                    ctx.arc(p.x + ghx, p.y + ghy, radius, d[2] + open, d[2] + Math.PI * 2 - open );
                    ctx.fill();
                },
                drawDead(){
                    if(!p.show){ return }
                    const d = dirs[3];
                    dieMouth += 1 / 70; 
                    const open = Math.max(0.1,ease(dieMouth) * Math.PI);
                    if(dieMouth < Math.PI){
                        ctx.fillStyle = col;
                        ctx.miterLimit = 1;
                        ctx.beginPath();
                        ctx.moveTo(p.x + ghx - d[0] * radius * (1/3), p.y + ghy - d[1] * radius * (1/3));
                        ctx.arc(p.x + ghx, p.y + ghy, radius, d[2] + open, d[2] + Math.PI * 2 - open );
                        ctx.fill();
                    }
                    const lines = Math.max(0,(dieMouth - 0.5) * 6);
                    if(lines > 0){
                        var a,x,y,d1,d2,al;
                        d1 = ease(Math.min(1,lines / 2));
                        d2 = ease(Math.min(1,Math.max(0,(lines - 1) / 1)));
                        al = ease(1 - Math.min(1,Math.max(0,(lines - 2) / 1)));
                        ctx.lineWidth = gx * 0.2 * d1;
                        d1 *= radius * 1.5;
                        d2 *= radius * 1.5;
                        ctx.strokeStyle = col;
                        ctx.lineCap = "round";
                        ctx.globalAlpha = al;
                        ctx.beginPath();
                        doFor(8,i =>{
                            a = (i / 8) * Math.PI * 2;
                            
                            x = Math.cos(a);
                            y = Math.sin(a);
                            ctx.moveTo(p.x + ghx + x * d2, p.y + ghy + y * d2);
                            ctx.lineTo(p.x + ghx + x * d1, p.y + ghy + y * d1);
                        })
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                    if(dieMouth >= 1){
                        p.readyForNextLife = true;
                        p.playing = false;
                    }
                },
                move(keys){
                    var mDir = -1;
                    const checkKey = (key) => {
                        if(keys[key.name]){
                            if(!key.on){
                                doFor(3,i=>controls.mostResent[3-i] = controls.mostResent[2-i]);
                                controls.mostResent[0] = key.dir;
                            }
                            key.on = true;
                        }else{
                            var pos=0
                            if(key.on){
                                doFor(4,i=>{
                                    if(controls.mostResent[i] === key.dir){ pos += 1 }
                                    if(i + pos >= 4){ controls.mostResent[i] = -1 }
                                    else{ controls.mostResent[i] = controls.mostResent[i + pos] }
                                })
                                key.on = false;
                                
                            }
                        }
                    }
                    checkKey(controls.up);
                    checkKey(controls.down);
                    checkKey(controls.left);
                    checkKey(controls.right);
                    
                    const d = p.direction;
                    const px = p.mx;
                    const py = p.my;
                    m.getOptionsAt(px,py,d,moveOpt);
                    m.getOptionsAt(px + dirs[d][0],py + dirs[d][1],d,nextMoveOpt);
                    

                    var moveOption = 0;
                    var doSame = true;
                    while(moveOption < 4 && controls.mostResent[moveOption] > -1){
                        const move = controls.mostResent[moveOption];
                        // reverse direction
                        if(move === ((p.direction + 2) % 4) && moveDist > 0){
                            p.direction = move;
                            moveDist = 1 - moveDist;
                            moveDist += 1 / speed;
                            p.mx += dirs[(p.direction + 2) % 4][0];
                            p.my += dirs[(p.direction + 2) % 4][1];
                            doSame = false;
                            break;
                        // continue or change direction if can fit    
                        }else if(moveOpt.indexOf(move,1) > -1 && (move === p.direction || moveDist <= 1/speed)){
                            p.direction = move;
                            moveDist += 1 / speed;
                            doSame = false;
                            break;
                        // if can change direction at next cell move in direction
                        }else if(move !== p.direction && moveOpt.indexOf(p.direction,1) > -1 && nextMoveOpt.indexOf(move,1) > -1){
                            moveDist += 1 / speed;
                            doSame = false;
                            break;
                        // if can change direction behind then turn around
                        }else if(move !== p.direction && moveOpt.indexOf(move,1) > -1 ){
                            p.direction = (p.direction + 2) % 4;
                            moveDist = 1 - moveDist;
                            moveDist += 1 / speed;
                            p.mx += dirs[(p.direction + 2) % 4][0];
                            p.my += dirs[(p.direction + 2) % 4][1];
                            doSame = false;
                            break;
                        } else{
                            moveOption += 1;
                        }
                    }
                    if(doSame){
                        if(moveOpt.indexOf(p.direction,1) > -1){
                           // moveDist += 1 / speed;
                        }
                    }
                    if(moveDist >= 1){
                        moveDist = 0;
                        p.mx += dirs[p.direction][0];
                        p.my += dirs[p.direction][1];
                        
                    }
                    if(p.mx < 0){ p.mx = m.width - 1 }
                    if(p.mx >= m.width){ p.mx = 0 }
                    if(p.my < 0){ p.my = m.height - 1 }
                    if(p.my >= m.height){ p.my = 0 }
                    p.x = p.mx * gx + moveDist * dirs[p.direction][0] * gx;
                    p.y = p.my * gy + moveDist * dirs[p.direction][1] * gy;

                    p.x = p.x | 0;
                    p.y = p.y | 0;
                    p.mouthPos = Math.max(0.05,Math.abs(Math.sin(moveDist * Math.PI) * Math.PI/3));
                    //var dd = dirLookup["d" + (p.moveX  + 1) + "" + (p.moveY + 1)];
                    //if(dd !== undefined){ p.direction = dd }
                },
                update(game){

                    p.time = game.time;
                    if(p.playing){
                        if(!fruitBonus && p.time  > fruitBonusTime){
                            if(Math.abs(p.mx - map.playerInfo.startX) > 3 && Math.abs(p.my - map.playerInfo.startY) > 2 ){
                                fruitBonus = true;
                                fruits[(currentBonus++) % fruits.length](
                                    map.image.ctx,
                                    map.playerInfo.startX * gx,
                                    map.playerInfo.startY * gy,
                                    gx,gy
                                ); 
                                m.setAt(map.playerInfo.startX,map.playerInfo.startY,4);
                            }
                        }                        
                        if(game.powerUp > 0){
                            game.powerUp -= 1;
                            while(p.gotGhost){
                                p.gotGhost --;
                                addScore();
                            }
                            if(game.powerUp === 400){ game.ghosts.call("flash",32) }
                            else if(game.powerUp === 200){ game.ghosts.call("flash",16) }
                            else if(game.powerUp === 100){ game.ghosts.call("flash",8) }
                            if(game.powerUp === 0){
                                game.ghosts.call("hunt");
                                nextScore = 0;
                                game.ghostKilled = 0;
                            }
                        }
                        if(p.alive && p.touchedGhost && !game.noKill){
                            p.touchedGhost = 0;
                            p.alive = false;
                            dieMouth = 0;
                            p.lives -= 1;
                            game.currentState = game.lostLife;
      
                        }
                        if(p.alive){
                            p.move(game.keys);
                            if((p.x % gx) === 0 && (p.y % gy) === 0){
                                const px = (p.x / gx) | 0;
                                const py = (p.y / gy) | 0;
                                var c= m.getAt(px,py);
                                if(c === 2 || c === 3 || c === 4){
                                    p.scoreAdd += c === 2 ? 2 : 25;
                                    m.setAt(px,py,0);
                                    if(c === 3){
                                        game.ghosts.call("run");
                                        game.powerUp = map.styles.powerUpTime;
                                        powerUpCount -= 1;
                                    }else if(c === 4){
                                        fruitBonusTime = game.time + 4000;
                                        addScore(1000,(px+0.5) * gx,py * gy );
                                        fruitBonus = false;
                                    }else if(c === 2){
                                        dotCount -= 1;
                                    }
                                    map.image.ctx.fillStyle  = map.styles.background;
                                    map.image.ctx.fillRect(px * gx-4, py * gy-4, gx+8, gy+8);
                                }
                            }
                            if(dotCount === 0 && powerUpCount === 0 && game.powerUp === 0){
                              p.levelComplete();

                            }
                            

                            p.drawAlive();
                        }else{
                            p.drawDead();
                        }
                    }else{
                        if(p.alive){
                            p.drawAlive();
                        }
                    }
                    p.stats();
                },
                levelComplete(){
                    dotCount = 0;
                    powerUpCount = 0;
                    game.powerUp = 0;
                    p.playing = false;
                    game.currentState = game.levelComplete;
                    p.show = false;                  
                },
                startLevel(game){
                    dotCount = m.getCount(2);
                    powerUpCount = m.getCount(3);
                },
                nextLife(game) {
                    if(map.newMap){
                        map.newMap = false;
                        p.startLevel(game);
                    }
                    p.alive = true;
                    p.show = true;
                    p.x = (p.mx = map.playerInfo.startX) * gx;
                    p.y = (p.my = map.playerInfo.startY) * gy;
                    p.direction = 0;
                    moveDist = 0;
                    game.powerUp = 0;
                    p.gotGhost = 0;
                    p.touchedGhost = 0;                    
                    p.lifeStartTime = game.time;
                    fruitBonusTime = game.time + 4000;
                    fruitBonus = false;
                    m.setAt(p.mx,p.my,0);
                    map.image.ctx.fillStyle  = map.styles.background;
                    map.image.ctx.fillRect(p.mx * gx-4, p.my * gy-4, gx+8, gy+8);                    

                },
                stats(){
                    if(p.scoreAdd > 0){
                        const add = Math.max(1,(p.scoreAdd / 8) | 0);
                        p.score += add;
                        p.scoreAdd -= add;
                    }
                    
                    ctx.font = map.styles.fontLives;
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "left";
                    if(map.livesX !== null){
                        ctx.fillText("Life "+p.lives, (map.livesX) * gx,(map.livesY +1.1) * gy); 
                    }
                    ctx.font = map.styles.fontScore;
                    ctx.fillStyle = map.styles.textScoreCol;
                    if(map.scoreX !== null){
                        ctx.textAlign = "right";
                        ctx.fillText(""+ p.score, (map.scoreX + 3.4) * gx, (map.scoreY + 1.1) * gy );                    
                    }
                    
                    if(showScores > 0){
                        var showing = false;
                        ctx.font = map.styles.fontSmall;
                        ctx.fillStyle == map.styles.scoreFloatCol;
                        ctx.textAlign = "center";
                        doFor(4,i=>{
                            var d = scoreDisplays[i];
                            if(d.show){
                                ctx.fillText(d.text, d.x, d.y);
                                d.y -= 0.25;
                                d.count -= 1;
                                if(d.count === 0){
                                    d.show = false;
                                }else{
                                    showing = true;
                                }
                            }
                        });
                        if(!showing){
                            showScores = false;
                        }
                    }
                }
            }
            return p;
        },
        init( level ){
            map.map =  level.layout.map(row=>row.map(cell=>cell));
            map.ghostExitInstructions = level.ghostLeave;
            map.ghostToHomePos = level.ghostToHomePos;
            map.cellsX = map.map[0].length-2;
            map.cellsY = map.map.length-2;   
            const can = map.image;
            const ctx = can.ctx;
            const gx = map.gridX = map.styles.cellSize;
            const gy = map.gridY = map.styles.cellSize;
            // c for cut from walls
            const cX = (((gx / 2-4) | 0) / 2) | 0; // amount to trim from walls
            const cY = (((gy / 2-4) | 0) / 2) | 0; // amount to trim from walls
            if(game.resizeCanvasToGame){
                canvas.width = map.styles.cellSize * (map.cellsX-1);
                canvas.height = map.styles.cellSize * (map.cellsY-1);
            }
            can.width = (map.cellsX ) * gx;
            can.height = (map.cellsY) * gy;
            map.scoreX = null;
            map.livesX = null;
            
          
            ctx.fillStyle = map.styles.walls;
            ctx.fillRect(0,0,can.width,can.height);
            map.map.forEach((row,y) => {
                y-= 1;
                row.forEach((c,x) => {
                    x -= 1;
                    if(c !== 1 && c < 17){ // if not a wall
                        ctx.fillStyle = map.styles.background;
                        ctx.fillRect(x * gx - cX - 2, y * gy - cY , gx + cX * 2 + 4, gy + cY * 2);
                        ctx.fillRect(x * gx - cX , y * gy - cY - 2 , gx + cX * 2 , gy + cY * 2 + 4);
                    }
                    if(c === 0){
                        ctx.fillStyle = map.styles.dot;
                        ctx.beginPath();
                        ctx.arc((x + 0.5) * gx, (y + 0.5) * gy, gx * (map.styles.dotRad/ map.styles.stdCellSize), 0, Math.PI * 2);
                        ctx.fill();
                    }else if(c === 3){
                        ctx.fillStyle = map.styles.pill;
                        ctx.beginPath();
                        ctx.arc((x + 0.5) * gx, (y + 0.5) * gy, gx * (map.styles.pillRad / map.styles.stdCellSize), 0, Math.PI * 2);
                        ctx.fill();
                    }else if(c === 2){
                        map.playerInfo.startX = x;
                        map.playerInfo.startY = y;
                    }else if(c === 12 || c === 13){
                        if(map.scoreX === null && c === 12){
                            map.scoreX = x;
                            map.scoreY = y;
                        }
                        if(map.livesX === null && c === 13){
                            map.livesX = x;
                            map.livesY = y;
                        }
                        ctx.fillStyle = map.styles.background;
                        ctx.fillRect(x * gx - gx / 2, y * gy - gy / 2, gx + gx , gy + gy );
                        
                    }
                })
            });
            map.map.splice(0,1);
            map.map.splice(map.map.length - 1,1);
            map.map.forEach(row => {row.pop(); row.shift()})
            map.mapping.getRunningMaps();
            if(game.debug){
                var h = map.mapping.getHomingMap();
    
                ctx.beginPath();
                ctx.fillStyle = "rgba(255,0,0,0.5)"
                for(var y = 0; y < map.mapping.height; y ++){
                    for(var x = 0; x < map.mapping.width; x ++){
                        var c= h[x + y * map.mapping.width];
                        ctx.setTransform(1,0,0,1,x * gx,y * gy)
                        if(c === 0){
                            ctx.moveTo(0.9 * gx,0.5 * gy);
                            ctx.lineTo(0.1 * gx,0.7 * gy);
                            ctx.lineTo(0.1 * gx,0.3 * gy);
                        }else if(c === 2){
                            ctx.moveTo(0.1 * gx,0.5 * gy);
                            ctx.lineTo(0.9 * gx,0.7 * gy);
                            ctx.lineTo(0.9 * gx,0.3 * gy);   
                        }else if(c === 1){
                            ctx.moveTo(0.5 * gx,0.9 * gy);
                            ctx.lineTo(0.7 * gx,0.1 * gy);
                            ctx.lineTo(0.3 * gx,0.1 * gy);   
                        }else if(c === 3){
                            ctx.moveTo(0.5 * gx,0.1 * gy);
                            ctx.lineTo(0.7 * gx,0.9 * gy);
                            ctx.lineTo(0.3 * gx,0.9 * gy);   
                        }
                    }
                }
                ctx.fill();
            }
            var mp = map.mapping.getPlayMap()
            ctx.fillStyle = "#000";
            var opt;
            var w = gx / 4;
            var h = gy / 4;
            var ox = (gx-w) / 2;
            var oy = (gy-h) / 2;
            for(var y = 0; y < map.mapping.height; y ++){
                for(var x = 0; x < map.mapping.width; x ++){
                    var c= mp[x + y * map.mapping.width];
                    ctx.setTransform(1,0,0,1,x * gx,y * gy)
                    if(c === 1){
                        opt = map.mapping.getWalledAt(x,y,0,opt);
                        doFor(opt[0],i=>{
                            if(opt[i+1] === 0){ ctx.fillRect(ox,oy,gx-ox,h) }
                            if(opt[i+1] === 1){ ctx.fillRect(ox,oy,w,gy-oy) }
                            if(opt[i+1] === 2){ ctx.fillRect(0,oy,gx-ox,h) }
                            if(opt[i+1] === 3){ ctx.fillRect(ox,0,w,gy-oy) }
                        })
                        if(opt[0] === 0){
                            ctx.fillRect(ox-1,oy-1,w+2,h+2)
                        }
                    }

                }
            }
            ctx.setTransform(1,0,0,1,0,0);
            map.newMap = true;

     
            return map;
            
        }
    }
    return map;
}
const game = {
    time : 0,
    resizeCanvasToGame : false,
    currentState : null,
    timer : 0,
    stateTimer : 0,
    debug : false,
    noKill : false,
    runSlow : false,
    frameCount : 0,
    map : null,
    level : 0,
    keys : null,
    powerUp : 0,
    ghostKilled : 0,
    player : null,
    ghosts : {
        items : [],
        call (name,...args){
            for(var i = 0; i < game.ghosts.items.length; i++){
                game.ghosts.items[i][name](...args);
            }
        },
        eachItem (callback){
            for(var i = 0; i < game.ghosts.items.length; i++){
                callback(game.ghosts.items[i],i);
            }
        }
    },
    setTimer(){game.timer = game.time},
    
    update(){
        game.frameCount += 1;
        if(!game.runSlow || (game.runSlow && game.frameCount % 4 === 0)){
            if(game.runSlow) { game.time /= 4 }
            if(game.currentState !== null){
                if(game.previouseState !==  game.currentState){
                    game.stateTimer = game.time;            
                    game.previouseState = game.currentState;
                }
                game.currentState();
            }
        }
    },
    pressToStart(){
        if(game.keys.anyKey){
            game.keys.anyKey = false;
            game.currentState = game.play;
        }
        if(game.player === null){
            game.player = game.map.createPlayer(ctx);
            game.ghosts.items.length = 0;
            game.ghosts.items.push(game.map.createGhost(ctx,0));
            game.ghosts.items.push(game.map.createGhost(ctx,1));
            game.ghosts.items.push(game.map.createGhost(ctx,2));
            game.ghosts.items.push(game.map.createGhost(ctx,3));
        }
        game.map.showMap();
        if(((game.time / 500) | 0) % 2){
            game.map.drawText("Any key to Start!");
        }
        game.player.update(game);
        game.ghosts.eachItem(g => { g.update(game) });
    },
    play(){ 
        game.map.showMap();
        if(game.player.alive && ! game.player.playing){
            game.player.playing = true;
            game.ghosts.eachItem(g => { g.hunt() });
            game.player.nextLife(game);

            
        }
        game.ghosts.eachItem(g => { g.update(game) });
        game.player.update(game);

    },
    levelComplete(){
        game.map.showMap();
        game.player.update(game);        
        game.map.drawText(game.map.styles.levelCompleteMessage,game.map.styles.levelCompleteFont,game.map.styles.levelCompleteCol);
        var nlb = ease(1-(game.time - game.stateTimer) / game.map.styles.levelCompleteTime);
        if(game.time - game.stateTimer > game.map.styles.levelCompleteTime){
            game.level += 1;
            if(game.level < levels.length){
              game.map.init(levels[game.level]);
              game.currentState = game.pressToStart;
              game.keys.anyKey = false;
              game.player.nextLife(game);
              game.ghosts.eachItem(g => { g.restart(game) });
            }else{
              game.currentState = game.gameOver;
            }
            
        }
        
    },
    lostLife(){
        game.map.showMap();
        game.player.update(game);
        if(game.player.readyForNextLife){
            game.player.readyForNextLife = false;
            if(game.player.lives){
                game.timer = game.time;
                game.currentState = game.nextLife;
                game.ghosts.eachItem(g => { g.restart(game) });
                game.player.nextLife(game);
            }else{
                game.currentState = game.gameOver;
            }
        }
    },
    nextLife(){
        game.map.showMap();
        game.ghosts.eachItem(g => { g.update(game) });
        game.player.update(game);
        game.map.drawText(game.map.styles.nextLifeMessage,game.map.styles.nextLifeFont,game.map.styles.nextLifeCol);
        var nlb = ease(1-(game.time - game.timer) / game.map.styles.nextLifeTime);
        ctx.fillRect(game.map.image.width / 2 - nlb * (game.map.image.width / 3),game.map.image.height -10,nlb * (game.map.image.width / 3) * 2,5);
        if(game.time - game.timer > game.map.styles.nextLifeTime){
            game.currentState = game.play;
            
        }
    },
    gameOver(){
        game.map.showMap();
        game.player.update(game);
        game.map.drawText(game.map.styles.gameOverMessage,game.map.styles.gameOverFont,game.map.styles.gameOverCol);
        game.map.drawText("Any key to restart","26px arial",game.map.styles.gameOverCol,game.map.image.height *0.8);
        if(game.keys.anyKey){
            game.keys.anyKey = false;
            game.level = 0;
            game.map.init(levels[game.level]);
            game.currentState = game.pressToStart;
            game.keys.anyKey = false;
            game.player.nextLife(game);
            game.ghosts.eachItem(g => { g.restart(game) });
        }
    },    
    
    start(){
        if(game.keys === null) { game.keys = keyboard.start() }
        if(game.map === null) { 
            game.map = createMap().init(levels[game.level]);
        }
        game.keys.anyKey = false;
        game.currentState = game.pressToStart;
        
        
    }
}

var cheats = 0;
keyboard.addCallback("KeyD",()=>{
    cheats += 1;
    if(cheats === 4){
        log("Cheats on.");
        log(`
K: No get killed.
R: Turn on debug info.
Q: Run at 1/4th speed.
T: kill all ghosts.
E: Trigger end of level.
L: Goto next level.
Esc : restart.
        `);
        function gotoLevel(lev){
          game.player = null;
          game.level = lev % levels.length;
          game.map = null;
          game.ghosts.items.length = 0;
          game.currentState = game.start;
          console.log("Forced restart");
        }
        keyboard.addCallback("KeyK",()=> game.noKill = !game.noKill);
        keyboard.addCallback("KeyR",()=> game.debug = !game.debug);
        keyboard.addCallback("KeyE",()=> game.player.levelComplete());
        keyboard.addCallback("KeyQ",()=> game.runSlow = !game.runSlow);
        keyboard.addCallback("KeyT",()=> game.ghosts.call("kill"));
        keyboard.addCallback("KeyL",()=> gotoLevel(game.level + 1));
        keyboard.addCallback("Escape",()=> gotoLevel(0) );
    }
})

positionCanvas();
game.start();
game.time = 0;
game.update();
requestAnimationFrame(mainLoop);



/* the following are bitmaps converted to javascript by Groover */
function cherry(ctx,x,y,w,h){

    function A(x,y,r){ctx.arc(x,y,r,0,Math.PI*2)};
    function M(x,y){ctx.moveTo(x,y)};
    function L(x,y){ctx.lineTo(x,y)};
    function Q(x,y,x1,y1){ctx.quadraticCurveTo(x,y,x1,y1)};
    function C(x,y,x1,y1,x2,y2){ctx.bezierCurveTo(x,y,x1,y1,x2,y2)};
  
    var fillRule='evenodd';
    var fill='rgba(139,0,0,1.000)';
    var scx = w / 235;
    var scy = h / 240.51374573479714;
    ctx.globalAlpha = 1;
    ctx.setTransform(scx,0,0,scy,x,y);
    ctx.fillStyle=fill;
    ctx.beginPath();
    M(94.5,6);Q(108.9,9,123.5,18);Q(143.3,34.2,144.5,53);Q(155.8,37.7,176.5,22);Q(188.4,24.4,195.5,38);Q(205.3,31.8,231.5,28);Q(262.6,26.3,269,34.5);Q(260.5,67.9,230.5,82);Q(219.6,85.8,200.5,85);Q(193.5,83.2,174,69.5);Q(176.2,72.6,190.5,100);Q(212.7,97.8,230.5,110);Q(247,123.2,253,141.5);Q(258.5,163.5,250,185.5);Q(240.3,202.7,221.5,214);Q(199.4,222.6,179.5,217);Q(169.9,230.3,152.5,239);Q(138.5,245.6,115.5,244);Q(83,238.2,67,210.5);Q(51,180.6,65,147.5);Q(72.6,132.5,86.5,122);Q(96,114.7,118,108.5);Q(122.6,90.4,129,79.5);Q(107.9,85.7,84.5,73);Q(50.3,53,34,26.5);Q(35.3,17.7,58.5,9);Q(71.4,5,94.5,6);
    M(154,100.5);Q(145.6,114.6,153.5,116);Q(164.9,109.1,154,100.5);
    ctx.fill(fillRule); ctx.fillStyle="#C00";
    ctx.beginPath();
    M(208.5,100);Q(232.9,107.6,246,126.5);Q(256.9,142.9,255,168.5);Q(249.6,194.1,230.5,208);Q(210.6,223.2,181.5,218);Q(176.9,216.5,185.5,205);Q(205.9,207,221.5,197);Q(233.9,186.3,241,172.5);Q(248.1,144,233,125.5);Q(224.7,113.7,190,100.5);L(208.5,100);
    M(194.5,108);Q(206.5,117.9,190.5,129);Q(176.3,135.1,168,126.5);Q(186,124.3,189.5,122);Q(192.2,120.9,194.5,108);
    M(159.5,110);Q(166.3,114.5,157.5,119);Q(149.9,117.1,159.5,110);
    M(111.5,114);Q(114.5,125.7,123.5,129);Q(128.5,130.9,148,130.5);Q(142.3,136.6,122.5,135);Q(103.6,128.9,111.5,114);
    ctx.fill(fillRule); ctx.fillStyle="#D00";
    ctx.beginPath();
    M(194.5,108);Q(202.6,109.3,198,121.5);Q(190.9,132.6,174,131.5);Q(194.1,153.1,192,183.5);Q(188.1,212.8,168.5,229);Q(148.2,247.1,115.5,244);Q(89.3,239.4,73,219.5);Q(55.9,199.3,59,166.5);Q(63.8,140.3,82.5,125);Q(97.5,112.7,116.5,110);Q(109,124.6,123.5,129);Q(135.5,134.1,149,125.5);Q(147.6,138.5,122.5,135);Q(108.6,130.5,109,119);L(93.5,124);Q(70.4,137.8,65,165.5);Q(62.6,194.6,81.5,213);Q(101.1,231.4,129.5,229);Q(148.7,224.9,161.5,214);Q(175.1,200.2,179,180.5);Q(180.3,160.6,171,143.5);Q(142.4,118.9,148,114.5);Q(168.7,126.4,182.5,125);Q(193.6,123,194.5,108);
    ctx.fill(fillRule); ctx.fillStyle="#F75";
    ctx.beginPath();
    M(103.2,129.5);Q(127.1,131.3,129.5,154.5);Q(127.1,176.7,104.8,179.5);Q(81.1,177.8,78.5,154.5);Q(81.2,132,103.2,129.5);
    M(174.9,129.6);Q(191.8,127.1,185.2,143.4);Q(177,141.7,174.9,129.6);
    M(99.1,141.5);Q(90.4,144.7,91.6,155.3);Q(94.1,164.6,105.3,163.4);Q(114.9,160.5,113.4,149.7);Q(110.3,140.1,99.1,141.5);
    ctx.fill(fillRule);ctx.fillStyle="#F00";
    ctx.beginPath();
    M(194.5,106);Q(214.2,108.5,225.5,118);Q(240.7,131.8,243,152.5);Q(243.3,173.4,232,187.5);Q(218.6,200,202.5,205);L(186,204.5);Q(188.8,158,194.5,106);
    M(106.5,119);Q(111.8,130.1,122.5,135);Q(142.9,137.7,153.5,126);Q(171.2,138.8,177,157.5);Q(183,180.3,172,200.5);Q(160,219.8,138.5,227);Q(111.5,233.7,90.5,220);Q(73.2,207.4,67,188.5);Q(61.4,167,71,147.5);Q(83.3,125.3,106.5,119);
    M(97.2,131.7);Q(86.7,134.1,81,145.5);Q(79.8,157.2,83,167.5);Q(94.5,183.3,115.5,176);Q(124.4,170.2,128,160.5);Q(128.8,149.1,125,141.5);Q(114.9,128.1,97.2,131.7);
    ctx.fill(fillRule); ctx.fillStyle="#FAA"
    ctx.beginPath();
    M(105.5,140);Q(117.4,142.8,115,156.7);Q(110.1,168.2,97.1,164.9);Q(88.6,159.5,90,148.3);Q(94,138.5,105.5,140);
    ctx.fill(fillRule); fill='rgba(255,100,0,1.000)'; ctx.fillStyle=fill;
    ctx.beginPath();
    M(192.5,126);Q(205.1,142.4,189.5,156);Q(182.8,150.6,183,131.5);Q(192.5,126.6,192.5,126);
    ctx.fill(fillRule); ctx.fillStyle="#A83";
    ctx.beginPath();
    M(174.5,25);Q(175.7,34.3,184,41.5);Q(169.5,52.8,152,74.5);Q(130,115.7,131,130.5);Q(125.6,130.1,117.5,126);Q(111.4,118.2,128,80.5);Q(140.2,79.5,149,70.5);Q(142.4,68.2,144,53.5);Q(158.6,33.8,174.5,25);
    M(189.5,45);Q(171.9,67.4,172,67.5);Q(195.3,100.2,192,119.5);Q(181.5,130.9,174,119.5);Q(158.7,87.9,169.5,81);Q(170.8,79.9,191,106.5);Q(175.7,71,170.5,71);Q(162.7,78.1,157,91.5);Q(159,93.4,171,122.5);Q(163.3,124.2,154.5,97);Q(141.1,134.1,135.5,131);Q(142,108.1,159,77.5);Q(171.7,59.9,189.5,45);
    ctx.fill(fillRule);var fill='#6c3f00';ctx.fillStyle=fill;
    ctx.beginPath();
    M(181.5,23);Q(196.1,32.4,196,42.5);Q(179.9,49.9,162,73.5);Q(160.5,74.2,131.5,131);Q(129.1,114.9,152,74.5);Q(168.2,53.6,184,41.5);Q(166.8,27.4,181.5,23);
    M(170.5,71);Q(175.7,69.3,191,105.5);Q(170.7,79.9,169.5,81);Q(159,92.2,177.5,124);Q(170.8,128,157,91.5);Q(161.1,79.2,170.5,71);
    ctx.fill(fillRule);fill='#00a100';ctx.fillStyle=fill;
    ctx.beginPath();
    M(75.9,14.6);Q(90,25.7,104,42);Q(93.2,20.2,101.1,16.6);Q(113.4,48.5,126.7,56.3);Q(117.4,35.2,124,25.7);Q(136.6,64.5,143.2,73.4);Q(114.6,74.1,78.6,64.2);Q(78.4,59.4,121.2,62.9);Q(119.2,56,62.9,50.4);Q(62.3,44.7,97.5,46.8);Q(81.3,33.2,54.9,39.4);Q(52.9,30.7,68.3,31.1);Q(56.6,31.2,42.5,25.5);Q(60.9,13.8,80.1,27.7);Q(75.2,19.9,75.9,14.6);
    M(236.2,32.5);Q(240.6,36.2,218.4,53.8);Q(235.7,50.5,247,34.6);Q(255.1,38.5,243.8,46.8);Q(257.8,33.5,262.5,37.8);Q(255.6,54.3,239.5,55.5);Q(250.1,55.9,245.5,63.5);Q(233.4,59.1,216.6,61.1);Q(233.8,65.4,231.8,74.5);Q(208.7,63.8,197,64.6);Q(217,75.7,211.2,81.5);Q(187.7,67.3,175.5,64.5);Q(174.7,63.6,207.6,38.8);Q(215.1,33.5,221.4,34.9);Q(202,50.8,196.4,57.9);Q(235.6,31.7,236.2,32.5);
    ctx.fill(fillRule); ctx.fillStyle="#0C0";
    ctx.beginPath();
    M(70.5,6);Q(105.1,4.4,123.5,18);Q(143.8,31.9,148,70.5);Q(140.7,78.4,113.5,82);Q(88.6,78.6,63.5,59);Q(41.9,40.5,34,26.5);Q(39.7,13.5,70.5,6);
    M(77,15.5);Q(74.9,16.1,80.5,28);Q(60.8,21,43,25.5);Q(69.5,29.7,99,46);Q(99.3,47.8,66.5,51);Q(118.8,53.8,122,62.5);Q(122,62.9,84.5,66);Q(138.1,76.1,142,73.5);Q(133,61.8,123.5,26);Q(120.3,26.2,125.5,56);Q(109.9,48.2,100.5,17);Q(96.5,17.5,103.5,40);Q(93.7,38.3,77,15.5);
    M(231.5,28);Q(262.7,26.4,269,34.5);Q(261.3,62.3,240.5,76);Q(225.5,87,200.5,85);Q(192.7,82.3,174,68.5);Q(185.6,59.5,212.5,81);Q(214.6,79.2,197.5,64);Q(209.1,61.4,231.5,73);Q(233.8,70,217,61.7);Q(227.4,56.6,245.5,62);Q(247.5,60,239,55.7);Q(256.8,50.1,261.5,36);Q(244.3,49,217.5,55);Q(216.9,52.4,237.5,33);Q(200.2,62.5,196,57.5);Q(199,51.4,219.5,35);Q(208.7,37.9,183,59.5);Q(196,46.5,199.5,36);Q(206.4,32.1,231.5,28);
    ctx.stroke(); ctx.fill(fillRule);
    ctx.setTransform(1,0,0,1,0,0);
}
function banana(ctx,x,y,w,h){
    function A(x,y,r){ctx.arc(x,y,r,0,Math.PI*2)};
    function M(x,y){ctx.moveTo(x,y)};
    function L(x,y){ctx.lineTo(x,y)};
    function Q(x,y,x1,y1){ctx.quadraticCurveTo(x,y,x1,y1)};
    function C(x,y,x1,y1,x2,y2){ctx.bezierCurveTo(x,y,x1,y1,x2,y2)};
    var fillRule='evenodd';
    ctx.globalAlpha = 1;
    var scx = w / 219.49720370268392;
    var scy = h / 212.2161133182695;
    ctx.setTransform(scx,0,0,scy,x,y);
    ctx.fillStyle='rgba(241,233,0,1.000)';
    ctx.beginPath();
    M(214.5,37);Q(239.3,39,240,51.5);Q(233.8,59.6,227,76.5);Q(234.8,96.1,222,140.5);Q(214.2,164.4,197,186.5);Q(164.9,223.1,120.5,234);Q(77.1,242.2,33.5,230);Q(20.5,217.3,36,196.5);Q(45.4,182.3,130.5,126);Q(208.2,53.4,214.5,37);
    ctx.fill(fillRule);
    ctx.fillStyle='rgba(196,196,0,1.000)';
    ctx.beginPath();
    M(213.5,44);Q(221.4,55.9,202.5,72);Q(194.5,67.5,213.5,44);
    M(199.5,77);Q(204.4,92.8,189,135.5);Q(177.6,160.6,158.5,179);Q(141.9,192,128.5,198);Q(81.3,214.1,39,221);Q(160,168.1,157.5,163);Q(183.7,136.4,199.5,77);
    M(216.5,81);L(225,81.5);L(225,101);Q(223.8,86,223.5,86);Q(219.8,84.9,207,143.5);Q(191.1,180.2,157.5,206);Q(123,219.6,95.5,225);Q(58.2,224.7,41,227);Q(127.4,214.7,161.5,195);Q(183.6,172.1,200,144.5);Q(212.1,113.2,216.5,81);
    M(188.5,185);L(182.5,192);L(188.5,185);
    ctx.fill(fillRule);
    ctx.fillStyle='rgba(149,152,0,1.000)';
    ctx.beginPath();
    M(211.1,39.1);Q(213.2,38.9,226,50.5);Q(223.4,50.1,209.5,77);Q(202.5,76.1,213.6,45.1);Q(192.2,75.4,197.1,77.9);Q(191.5,73.7,191.1,69.1);Q(197.3,63.2,211.1,39.1);
    M(230.1,49.1);Q(238.8,60.6,218.1,76.9);Q(215.7,75.9,230.1,49.1);
    M(227.5,73);Q(230.9,80.1,223.1,81.9);Q(223.2,77.9,227.5,73);
    M(202.5,77);Q(207.1,79.4,217,81.5);Q(214.1,103,209,123.7);Q(194,169.4,164.7,193.2);Q(136,209.9,109.7,216);Q(33.9,229.1,31.2,226.1);Q(25.1,218.4,30.1,213.1);Q(30.6,212.3,43.2,220.9);Q(43.9,217,89.3,210);Q(136.6,196.6,156.2,179.9);Q(173.4,163.8,186.9,138.2);Q(197,113.1,202.5,77);
    ctx.fill(fillRule);
    ctx.fillStyle='rgba(121,111,0,1.000)';
    ctx.beginPath();
    M(214.5,37);Q(236.2,39.7,240,48.5);Q(231.8,68.1,222.5,81);Q(200,83.7,194,69.5);Q(196.1,63.8,210,75.5);Q(217.7,55.1,225,50.5);Q(210.3,43.3,214.5,37);
    M(227.5,78);Q(234.2,103.8,219,149.5);Q(205,183.9,176.5,206);Q(151.5,227.6,115.5,235);Q(76,240.7,41,231.5);Q(87.1,233.2,116.5,228);Q(152.1,218.6,178.5,196);Q(200.3,176.7,216,143.5);Q(223.7,123.1,227.5,78);
    ctx.fill(fillRule);
    ctx.fillStyle='rgba(255,255,0,1.000)';
    ctx.beginPath();
    M(188.5,71);L(196,77.5);Q(165.2,125.5,153.5,135);Q(92.8,180.2,36,212.5);Q(41.8,199.6,61.5,180);Q(122.7,142.6,140.5,128);Q(161.4,109.6,188.5,71);
    ctx.fill(fillRule);
    ctx.setTransform(1,0,0,1,0,0);
}
function berry(ctx,x=0,y=0,w=325.39317809721524,h=468.5){
    function A(x,y,r){ctx.arc(x,y,r,0,Math.PI*2)};
    function M(x,y){ctx.moveTo(x,y)};
    function L(x,y){ctx.lineTo(x,y)};
    function Q(x,y,x1,y1){ctx.quadraticCurveTo(x,y,x1,y1)};
    function C(x,y,x1,y1,x2,y2){ctx.bezierCurveTo(x,y,x1,y1,x2,y2)};
    var scx = w / 325.39317809721524;
    var scy = h / 468.5;

    ctx.setTransform(scx,0,0,scy,x,y);
    ctx.fillStyle='rgba(171,0,255,1.000)';
    ctx.beginPath();
    M(185.5,60);L(200,63.5);L(208,79.5);L(208,84.5);L(217,99.5);L(218,108.5);L(220.5,112);L(223,112.5);L(222,113.5);L(225,116.5);L(224,120);L(226.5,120);L(238.5,110);L(239.5,111);L(241.5,108);L(242.5,109);L(246.5,105);L(247.5,106);L(249.5,103);L(252,104.5);L(251,109.5);L(249,110.5);L(249,113.5);L(244,122.5);L(242,122.5);L(242,126.5);L(240,127.5);L(237,134.5);L(241,143.5);L(240,144.5);L(243,147.5);L(242,148.5);L(247,159.5);L(246,161.5);L(249,168.5);L(248,170.5);L(250,171.5);L(249,172.5);Q(252.7,179.8,253,182.5);Q(253.3,184.5,252,190.5);L(254,191.5);L(253,198.5);L(255,199.5);L(255,205.5);L(256.5,207);Q(264.7,205.8,267.5,206);Q(269.9,206.2,277,208.5);Q(274.6,212.1,273.5,213);Q(272,214.3,266.5,217);L(264,221.5);Q(269.7,223.9,271.5,225);Q(273,225.9,277,229.5);L(278.5,233);Q(286.5,228.6,289.5,228);Q(292.9,227.3,303.5,228);L(311.5,230);L(323.5,238);Q(324.4,240.8,325,241.5);Q(325.6,242.2,328,243.5);Q(332.4,251.5,333,254.5);Q(333.8,258.4,333,270.5);L(337.5,272);L(338.5,274);Q(342.4,274.4,343.5,275);C(345.1,275.8,347,279,348.5,280);Q(349.6,280.7,353.5,282);L(362,291.5);L(361,292.5);L(368,301.5);L(368,305.5);L(370,306.5);L(369,308.5);L(372,311.5);L(372,322.5);L(374,323.5);L(372,329.5);L(374,331.5);L(369,352.5);L(365,359.5);L(363,360.5);L(363,363.5);L(348,378.5);Q(349.3,389.8,349,393.5);C(348.7,396.8,347.1,403.3,346,406.5);C(345.2,408.8,343.2,413.4,342,415.5);C(340.9,417.4,338.4,420.9,337,422.5);Q(335.3,424.5,329.5,430);L(328,429.5);L(327.5,432);Q(320.1,436.7,317.5,438);Q(315.6,438.9,309.5,441);L(307,440.5);L(307,449.5);L(303,465.5);Q(298.7,472.4,297,474.5);C(295.1,476.8,290.8,481.1,288.5,483);Q(286.4,484.7,279.5,489);L(277.5,488);L(275.5,490);L(269,491.5);Q(268,499.9,267,502.5);C(265.8,505.8,262.4,512,260,514.5);Q(256.8,517.9,244.5,525);L(243.5,524);L(240.5,526);L(239.5,525);L(231.5,527);L(218.5,524);L(214.5,521);L(206.5,523);L(194.5,523);Q(188.3,521.9,186.5,521);Q(185.1,520.3,181.5,517);L(177.5,516);L(171.5,509);Q(164.1,512.5,161.5,513);C(158.8,513.5,153.2,513.3,150.5,513);Q(148.2,512.7,141.5,511);L(129.5,503);L(124.5,496);Q(116.1,495,113.5,494);C(111,493,106.5,489.8,104.5,488);Q(102.4,486.1,97,479.5);L(95,472.5);L(93,470.5);L(93,450);L(85.5,448);L(85.5,446);Q(80.8,444,79.5,443);Q(77.8,441.7,74,436.5);L(75,435.5);L(72,433.5);L(71,428.5);L(69,426.5);L(66,417.5);Q(65.4,407,66,403.5);Q(66.6,399.6,71,388.5);L(66.5,386);L(61,377.5);L(58,375.5);L(59,374.5);L(56,371.5);L(57,369.5);L(54,367.5);L(55,366.5);Q(51.4,359.2,51,356.5);Q(50.7,354.3,52,347.5);L(50,346.5);L(54,327.5);L(57,324.5);L(57,320.5);L(62,314.5);L(52,290.5);L(53,286.5);L(51,284.5);L(51,275.5);L(56,254.5);L(58,253.5);Q(58.4,249.6,59,248.5);C(59.8,246.9,63,245,64,243.5);Q(64.9,242.3,66.5,238);L(69.5,237);L(80.5,226);L(81.5,227);L(84.5,224);L(86.5,225);Q(90.1,221.7,91.5,221);Q(93.1,220.2,98.5,219);L(101.5,220);L(102.5,218);L(119.5,218);L(126.5,220);L(130,211.5);Q(136.5,202.2,139.5,200);C(143,197.4,151.2,193.9,155.5,193);C(158.7,192.3,165.3,192.5,168.5,193);C(171.6,193.5,177.8,195.3,180.5,197);Q(183.8,199,191.5,208);L(196.5,205);L(198,205.5);L(197,184.5);Q(192,183.7,190.5,183);C(189.4,182.5,187.7,180.5,186.5,180);Q(184.9,179.3,179.5,179);L(178.5,177);L(169.5,174);L(170,172.5);L(168,171.5);L(183.5,167);L(192.5,167);L(194,163.5);L(190,153.5);L(191,151.5);L(189,146.5);L(180,130.5);L(181,128.5);L(177,124.5);L(177,120.5);L(157,86.5);L(159,75.5);L(164.5,70);L(167.5,69);L(169.5,66);L(170.5,67);L(173.5,65);L(174.5,63);L(175.5,64);L(177.5,61);L(178.5,62);L(185.5,60);
    M(261.5,221);L(263,220);L(261.5,221);
    ctx.fill('evenodd');
    ctx.fillStyle='rgba(96,0,194,1.000)';
    ctx.beginPath();
    M(259.5,219.5);L(263.8,219.5);Q(270.3,222.2,272.1,223.6);Q(274.2,225.2,279.1,231.5);L(285.5,227.5);L(304.1,226.6);L(312.1,228.6);L(325.2,237.6);L(326.3,240.7);L(329.2,242.6);Q(333.6,250.9,334.4,253.9);Q(335.3,257.5,335.5,268.5);L(333.7,270.7);L(336.8,270);L(354.1,280.6);L(362.4,289.8);L(362.5,292.1);L(364.2,292.6);L(369.5,301.5);L(369.3,304.7);L(371.5,306.5);L(370.4,307.9);L(373.5,311.5);L(372.5,313.1);Q(374.4,316.8,374.5,318.2);Q(374.5,319.2,373.5,322.2);L(375.4,322.9);L(373.5,329.2);L(375.4,329.9);L(375.4,332.1);Q(374,339.6,373.4,342.1);C(372.7,344.8,371.7,350.3,370.5,352.8);Q(369.3,355.2,364.4,361.4);L(364.4,364.1);L(349.5,379.3);Q(350.7,390.4,350.4,394.1);C(350.1,397.4,348.4,403.9,347.4,407.1);Q(346.6,409.4,343.4,416.1);L(331.6,430.1);L(329.4,431.5);L(329,430.5);L(328.4,433.2);L(312.8,441.5);L(307.8,442.3);L(307.3,440.7);L(308.5,441.3);L(308.4,450.1);L(304.4,466.1);Q(300,473.2,298.2,475.4);C(296.2,477.9,291.6,482.4,289.1,484.4);Q(286.9,486.2,279.5,490.5);L(278,489.5);L(276.1,491.4);L(270.4,492.4);Q(269.4,500.3,268.5,502.8);C(267.2,506.2,263.6,512.7,261.2,515.4);Q(258.7,518.2,249.1,524.4);Q(242.7,527,240.4,527.5);Q(238.3,528,231.5,528.5);L(217.9,525.4);L(214,522.5);L(206.8,524.5);L(193.9,524.4);Q(187.8,523.1,185.9,522.4);Q(183.5,521.4,176.6,517.2);L(171.8,512.4);L(170.6,507.9);L(177.5,503.5);L(180.1,503.6);Q(185.2,508.5,187.3,509.5);C(189.3,510.5,193.8,511.3,196,511.5);Q(199.1,511.7,208.3,510.4);L(215.9,507.4);L(224.6,498.6);L(228.5,480.9);L(226.4,474.8);L(222.8,476.5);Q(211,476.3,207.2,475.5);Q(203.7,474.7,193.9,470.4);Q(188.8,466.8,187.6,465.1);Q(186.3,463.2,184.5,456.5);Q(186.6,453.4,187.6,452.8);Q(188.6,452.2,192.1,451.6);L(193.5,453.5);L(192.5,454);L(194.1,453.6);L(195.3,455.7);L(202.3,459.5);L(220.4,462.3);L(224.2,460.5);L(227.4,461.3);Q(231.4,458.3,232.9,457.6);Q(234.2,457,238.4,456.1);L(238.6,453.9);L(243.7,451.7);L(246.6,445.9);L(248.5,444.5);L(249,445.5);L(248.6,441.9);L(250.6,440.6);L(253.5,429);L(252.6,423.9);L(254.7,422.9);L(249.8,425.5);L(246.2,424.7);L(240.8,426.5);L(232.9,424.5);L(228.9,425.4);Q(225.1,423,223.7,422.5);Q(221.9,421.9,215.9,421.4);L(205.6,414.2);L(200.6,407.4);L(197.6,406.1);L(192.7,397.3);L(189.5,395.5);L(190.3,394.3);Q(186,382.1,185.5,377.8);Q(185,373.1,186.6,358.9);L(188.5,356.7);L(189.6,349.9);L(191.6,348.6);L(196.6,337.9);L(198.5,336.5);L(199,337.5);L(198.6,335.9);L(205.5,328.7);Q(202,319.9,201.5,316.8);C(201.2,314.6,201.3,310.1,201.6,307.9);Q(201.9,306.4,203.5,301.9);L(202.6,297.9);L(204.5,296);Q(205.1,290.6,205.6,288.9);C(206.3,286.6,208.3,282,209.6,279.9);Q(211.1,277.6,216.6,271.6);L(218.6,266.9);L(220.5,265.5);L(221.1,266.5);L(227.9,259.6);L(231.2,260.5);L(238.9,253.6);L(241.9,254.6);L(243.5,252.5);L(244.9,253.6);L(246.5,251.5);L(247.1,252.5);L(247.9,250.6);L(250.9,251.6);L(252.5,249.5);L(260.9,250.6);L(262.5,248.5);L(272.8,251.3);L(278.1,250.6);L(279.5,252.5);L(278.5,253);Q(278.1,245.9,277.4,243.7);C(276.8,241.7,274.8,238.1,273.6,236.4);C(272.1,234.4,268.8,230.6,266.7,229.3);Q(265,228.1,258.9,226.4);L(256.6,224);L(256.6,222);L(259.5,219.5);
    M(80.5,224.5);L(83.5,227.5);L(79.5,231.5);L(76.5,228.5);L(80.5,224.5);
    M(293.8,233);L(282.9,235.6);L(287.5,247.5);L(287.5,254);L(295.4,259.6);L(298.1,259.6);L(305,266.5);L(324.7,267.7);L(324.3,252.6);Q(321,246.2,319.5,244.3);C(317.6,242,313.2,237.9,310.6,236.4);Q(307.8,234.8,298.2,232.7);L(293.8,233);
    M(255.1,255.4);L(255.4,257.1);L(253.5,258.5);L(248.7,258.6);L(234.3,263.3);L(233.1,266.4);L(229.8,266.3);L(229.3,264.7);L(230.4,267.1);L(226.5,270.5);L(225.9,269.5);L(224.4,273.1);L(222.5,274.5);L(222,273.5);L(219.4,280.1);L(217.5,281.5);L(217,280.5);L(217.4,283.1);L(214.4,285.4);L(210.5,304.1);L(211.5,308.5);L(210.4,310.9);L(212.5,312.5);L(211.5,314.1);L(214.5,324.2);L(222.2,320.5);L(224.2,321.5);L(226,318.6);L(241.5,317.5);L(248.4,319.3);L(252.1,318.6);L(253.4,320.6);Q(259,321,260.8,321.5);Q(262.5,322,267.1,324.6);L(268.5,326.5);L(267.5,327);L(271.1,326.6);L(272.5,328.5);L(271.5,329);L(273.1,328.6);Q(274.5,331.9,275.3,332.7);Q(276.3,333.8,280.4,335.9);L(287.4,347.5);L(291.6,345.6);L(292.6,342.8);L(297.5,339.5);L(298,340.5);L(297.6,338.9);Q(301.6,336,302.6,334.6);Q(303.8,332.9,305.8,326.6);L(307.6,325.6);L(311.5,307.5);L(310.5,303.5);L(311.5,300.9);L(308.5,289.3);L(305.5,284.8);L(305.7,282.3);L(302.6,281.1);L(301.7,276.3);L(295.6,270.4);Q(291.9,269.1,290.9,268.4);Q(289.6,267.4,286.6,263.4);L(282.9,263.4);L(280.6,260.4);Q(270.5,257.9,267,257.5);Q(264.2,257.2,255.9,257.4);L(255.1,255.4);
    M(312.8,275);L(311.4,275);L(317.5,280.5);L(316.4,281.9);L(319.2,284.6);L(319.9,289.4);L(322.4,291.9);L(321.5,295.2);L(323.4,295.9);L(323.4,301.9);L(325.5,303.5);L(323.5,308.2);L(325.4,308.9);L(325.4,311.1);L(323.5,317);L(323.4,326.1);L(321.5,328);L(319.4,338.1);L(317.5,339.5);L(317,338.5);L(316.4,343.1);L(307.4,353.4);L(307.4,355.1);L(303.5,357.5);L(302.9,356.5);L(298.1,362.4);L(295.8,361.5);L(292.8,364.6);L(293.3,368.7);Q(302.8,371.1,306,371.5);Q(309.3,371.8,319.2,371.5);L(323.5,368.5);L(325.7,369.5);L(332.7,366.7);L(334.5,364.5);L(335.1,365.5);L(335.6,363.8);Q(342.2,360.9,343.9,359.4);Q(345.2,358.2,347.6,353.8);L(350.6,352.6);L(353.6,344.9);L(356.6,342.6);L(360.6,326.1);L(358.5,324.5);L(360.5,319.8);L(358.6,319.1);L(359.3,316.2);L(356.4,306.7);L(348.6,292.4);L(345.8,291.4);L(344.6,288.4);L(342.9,288.4);L(338.7,283.5);L(329.9,280.4);L(328.5,278.5);L(329.5,277.9);L(312.8,275);
    M(232.8,325);Q(223.3,326.4,220.3,327.5);C(217.8,328.4,213.2,331,211,332.5);C(208.9,334,205,337.3,203.3,339.3);Q(202.1,340.7,199.4,345.4);L(199.4,348.1);L(196.5,351);L(193.5,365.1);Q(193.4,370.1,193.7,371.8);Q(194.1,373.7,196.5,379.2);L(195.5,381.2);L(199.4,385);L(198.7,387.1);L(201.4,388.9);L(200.5,391.2);L(205.2,394.6);L(206.4,397.6);L(212.1,399.6);L(213.5,401.5);L(212.5,402);L(214.1,401.6);L(221.3,406.5);Q(230.8,409.1,234,409.5);Q(237,409.8,246.2,409.5);L(247.5,407.5);L(249.1,408.5);L(252.3,407.4);Q(261.9,403.7,264.7,401.7);Q(267.3,399.9,273.6,392.6);L(276.8,385.6);L(278.6,384.6);Q(281.1,374.5,281.5,371);Q(281.8,368,281.5,358.8);L(279.5,357.5);L(279.4,353.7);Q(276.2,345.7,274.5,343.3);Q(273.1,341.3,267.6,336.4);L(265.9,336.4);L(264.5,334.5);L(265.5,334);L(260.9,332.4);L(259.5,330.5);L(260.5,330);L(258.2,330.5);L(253.7,327.5);L(241,324.5);L(232.8,325);
    M(335.8,385);L(332.5,387.5);Q(316.8,390.5,311.5,390.5);Q(307.6,390.5,295.9,388.4);L(292,386.6);L(291.5,384.6);L(292.4,386);L(290.4,387.4);L(289.4,395.1);L(287.3,396.3);L(284.4,403.1);L(277.1,411.4);Q(273.9,412.7,273,413.5);Q(272.4,414.1,271.2,416.4);L(267.4,417.6);L(275.4,422.6);L(291.1,426.5);L(296.2,426.5);L(297.5,424.5);L(299.5,425.5);L(305.5,423.5);L(307,424.5);L(322.7,415.7);L(328.6,409.6);Q(333.4,401.1,334.5,398);Q(335.3,395.8,336.5,389);L(335.5,385.5);L(336.5,384.2);L(335.8,385);
    M(264.2,432.1);L(263.5,439.8);Q(260.2,450.8,258.4,454.1);C(256.8,457,252.6,462.3,250.1,464.4);Q(247.2,466.8,236.6,471.5);L(238,470.6);L(245.3,475.5);Q(254.6,478.1,257.8,478.3);Q(260.4,478.5,268.4,477.3);L(284.7,468.7);L(291.5,459.7);L(291.6,456.9);L(293.5,455.5);L(294,456.5);L(295.6,443.4);L(280.9,441.4);Q(277.1,439,275.7,438.5);Q(274.1,437.9,268.9,437.4);L(267.5,435.5);L(268.5,435);L(266.9,435.4);L(263.5,433.1);L(264.2,432.1);
    M(237.2,485.3);L(234.4,502.1);Q(232.2,507,231.2,508.4);Q(229.9,510.1,225.1,514.4);L(222.7,514.7);L(226.1,513.6);L(230.4,515.3);L(245.7,511.5);Q(251.9,506.7,253.6,504.8);Q(255.1,503.2,258.6,497.6);L(259.7,492.3);L(244.9,490.4);L(236.5,486.2);L(237.2,485.3);
    ctx.fill('evenodd');
    ctx.fillStyle='rgba(140,0,221,1.000)';
    ctx.beginPath();
    M(155.5,193);C(158.7,192.3,165.3,192.5,168.5,193);C(171.6,193.5,177.8,195.3,180.5,197);Q(183.8,199,191.5,208);L(196.5,205);L(198,206.5);L(196.5,209);L(188.5,212);Q(180.7,218.6,179,221.5);Q(177.7,223.7,176,231.5);L(183.5,234);L(188.5,233);L(189.5,235);L(200.5,237);L(203.5,240);L(205.5,240);L(213.5,247);L(215.5,247);L(217.5,251);L(220,251.5);L(222,256.5);L(224,257.5);L(223,258.5);L(227.5,261);L(227.5,263);L(229.5,263);L(230.5,261);L(231.5,262);L(237.5,257);L(242.5,256);L(243.5,254);L(245.5,255);L(248.5,252);L(251.5,253);L(252.5,251);L(255.5,252);L(262.5,250);L(280,252.5);L(279,243.5);L(277,241.5);L(278,240.5);Q(273.5,233.8,271.5,232);Q(268.8,229.6,259,224.5);L(260.5,222);L(263.5,221);Q(269.6,223.8,271.5,225);C(273,226,275.8,228.2,277,229.5);Q(278.1,230.7,280.5,235);L(285.5,232);L(289,232);L(281,236.5);L(286,247.5);L(286,253.5);Q(289.2,257.1,290.5,258);Q(291.4,258.7,294.5,260);L(295.5,259);L(295.5,261);L(302.5,264);L(304.5,268);L(307.5,268);L(310,270.5);L(309.5,272);L(315,273.7);L(312,274.5);L(314,279.5);L(316,280.5);L(315,281.5);L(318,284.5);L(323,298.5);L(322,302.5);L(324,303.5);L(323,322.5);L(321,330.5);L(319,331.5);Q(318.1,333.7,318,334.5);Q(317.8,335.5,318,338.5);L(315,340.5);L(313,346.5);L(306,352.5);L(306,354.5);L(304.5,354);L(303.5,356);L(302.5,355);L(302,358.5);L(300.5,358);L(299.5,360);Q(295.6,361.2,294.5,362);Q(293.7,362.7,292,365.5);L(292,383.5);L(297,386.5);L(291.5,385);L(290,389.5);L(288,390.5);L(288,394.5);Q(284,398.8,283,400.5);Q(282.2,401.9,281,406.5);L(279.5,406);L(271.5,415);L(270.5,414);L(267,417.5);L(267.5,419);L(263,419.5);L(262,421.5);L(264,430.5);L(262,432.5);L(263,436.5);L(261,444.5);L(259,446.5);L(259,450.5);L(255,454.5);L(255,456.5);L(250,460.5);L(250,462.5);L(247,463);L(246.5,466);L(245.5,465);L(234,473.5);Q(236.8,481.7,237,484.5);C(237.2,487.8,236,494.4,235,497.5);Q(234.2,500.2,230,507.5);L(218.5,519);L(217.5,518);L(213.5,521);L(206.5,523);L(194.5,523);Q(188.3,521.9,186.5,521);Q(185.1,520.3,181.5,517);L(177.5,516);L(171.5,509);Q(164.1,512.5,161.5,513);C(158.8,513.5,153.2,513.3,150.5,513);Q(148.2,512.7,141.5,511);L(129.5,503);L(124.5,496);L(113.5,494);Q(101.8,486.2,99,482.5);C(96.3,479,92.8,470.8,92,466.5);Q(91.3,462.4,93,450);L(85.5,448);L(85.5,446);Q(80.8,444,79.5,443);Q(77.8,441.7,74,436.5);L(75,435.5);L(72,433.5);L(71,428.5);L(69,426.5);L(66,417.5);Q(65.4,407,66,403.5);Q(66.6,399.6,71,388.5);L(66.5,386);L(61,377.5);L(58,375.5);L(59,374.5);L(56,371.5);L(57,369.5);L(54,367.5);L(55,366.5);Q(51.4,359.2,51,356.5);Q(50.7,354.3,52,347.5);L(50,346.5);L(54,327.5);L(57,324.5);L(57,320.5);L(62,314.5);L(54,297.5);L(52,290.5);L(53,286.5);L(51,284.5);Q(51.5,274,52,270.5);Q(52.5,267.2,55,257.5);L(59,251.5);L(59,248.5);Q(63,245,64,243.5);Q(64.7,242.4,66,238.5);L(69.5,237);L(75.5,230);L(80.5,226);L(81.5,227);L(84.5,224);L(86.5,225);Q(90.1,221.7,91.5,221);Q(93.1,220.2,98.5,219);L(101.5,220);L(102.5,218);L(119.5,218);L(126.5,220);L(130,211.5);Q(136.5,202.2,139.5,200);Q(143,197.4,155.5,193);
    M(161.2,196.7);L(154.5,198);L(153.5,197);L(139.5,204);L(134,211.5);L(134,213.5);L(132,214.5);L(131,219.5);L(131.5,222);L(137.5,224);L(140.5,227);L(144.5,227);Q(147.3,231,148.5,232);Q(150,233.3,155.5,236);L(159.5,235);L(160.5,233);L(171.5,233);L(174,229.5);L(174,226.5);L(176,225.5);L(176,222.5);L(187,210.5);Q(183.1,205.4,181.5,204);C(179.3,202.1,174.3,199,171.5,198);Q(169,197.1,161.2,196.7);
    M(110,223.5);L(109.5,225);L(100.5,224);L(99.5,226);L(97.5,225);L(96.5,227);L(93.5,226);L(90.5,229);L(88.5,228);L(87.5,230);L(86.5,229);L(85.5,231);Q(77.8,235.2,75.5,237);Q(73.4,238.6,68,244.5);L(68,247.5);L(66,248.5);Q(65.6,252.4,65,253.5);Q(64.5,254.4,62,256.5);L(59,270.5);L(59,278.5);L(61,279.5);L(60,282.5);Q(63.8,294.8,66,298.5);Q(68.4,302.6,78.5,313);L(80.5,313);L(86.5,318);L(89.5,318);L(89,319.5);L(92.5,321);L(106.5,324);Q(112.5,324.3,114.5,324);Q(116.1,323.7,120.5,322);L(122,318.5);L(119,315.5);L(119,311.5);L(117,310.5);L(118,307.5);L(116,306.5);L(117,303.5);L(115,298.5);Q(114.6,291.7,115,289.5);Q(115.3,287.9,117,283.5);L(116,279.5);L(118,277.5);L(120,267.5);L(122,266.5);L(123,261.5);L(125,260.5);L(125.5,258);L(127,258.5);L(130,251.5);L(131.5,252);L(132.5,250);L(135.5,249);L(136,246.5);L(139.5,245);L(140.5,242);L(143.5,243);L(147,239.5);Q(144.6,235.9,143.5,235);Q(142,233.8,136.5,232);L(135.5,230);L(132.5,230);L(129.5,227);L(110,223.5);
    M(166,236.5);L(165.5,238);L(163.5,237);L(161.5,239);L(155.5,239);L(145.5,243);L(144.5,245);L(143.5,244);L(141,248.5);L(139.5,248);L(138.5,250);L(135.5,251);L(135,253.5);L(128,259.5);L(128,263.5);L(125,265.5);L(121,284.5);L(121,291.5);L(128,312.5);L(130.5,311);L(132.5,312);L(133.5,310);L(134.5,311);L(135.5,309);L(136.5,310);L(138.5,307);L(140.5,308);L(143.5,305);L(144.5,306);L(155.5,302);Q(160.8,301.7,162.5,302);Q(164.1,302.3,168.5,304);L(171.5,303);L(173.5,305);L(183.5,307);L(184.5,309);L(187.5,309);L(188.5,311);L(193.5,313);L(195,316.5);L(197.5,317);L(202.5,324);L(204,322.5);L(204,314.5);L(202,312.5);Q(203.9,308.8,204,307.5);Q(204.1,306.2,203,302.5);L(205,293.5);L(207,291.5);L(209,283.5);L(211,282.5);L(211,279.5);L(220,269.5);L(219,262.5);L(204.5,246);L(201.5,246);L(192.5,240);L(174.5,236);L(166,236.5);
    M(252,256.5);L(251.5,258);L(248.5,257);L(245.5,258);L(244.5,260);L(240.5,260);L(239.5,262);L(236.5,261);Q(233.7,264.2,232.5,265);Q(231.4,265.7,227.5,267);L(227,269.5);L(223.5,271);L(218,277.5);L(218,280.5);L(216,281.5);Q(215.6,285.4,215,286.5);Q(214.5,287.4,212,289.5);L(210,298.5);L(210,313.5);L(212,314.5);L(212,320.5);L(215.5,325);Q(223.5,320.6,226.5,320);Q(228.9,319.5,236.5,320);L(237.5,318);Q(251.2,319.6,255.5,321);Q(260.3,322.6,273.5,330);L(275,333.5);L(277.5,334);Q(278.4,336.8,279,337.5);Q(279.6,338.2,282,339.5);L(285,345.5);L(287,346.5);L(286,347.5);L(288.5,348);Q(299.2,339.9,302,336.5);C(304.6,333.4,308.6,326.3,310,322.5);Q(311.3,319.2,313,308.5);L(311,301.5);L(312,297.5);L(310,296.5);L(311,295.5);L(307,283.5);L(305,282.5);L(306,281.5);L(304,280.5);L(301,273.5);L(298.5,273);L(297,269.5);L(294.5,269);L(293.5,267);L(289.5,266);L(290,264.5);L(287.5,264);L(286.5,262);L(279.5,261);L(276.5,258);L(267.5,256);L(252,256.5);
    M(153.2,306.7);C(150.5,306.9,145.1,307.2,142.5,308);Q(140.4,308.6,134.5,312);L(120,326.5);L(117,331.5);L(113,349.5);L(115,356.5);L(114,358.5);L(116,359.5);L(116,363.5);L(122,376.5);L(127,380.5);L(126.5,382);L(131.5,384);L(131.5,386);L(134.5,386);L(140.5,391);Q(153.9,395,158.5,395);Q(162.3,395,173.5,392);L(175.5,393);L(177.5,390);L(179.5,391);L(182.5,388);L(183.5,389);L(188,383.5);L(188,379.5);L(186,378.5);L(188,358.5);L(191,353.5);L(191,349.5);L(194,346.5);L(194,343.5);L(198,340.5);L(198.5,338);L(200,338.5);L(201,335.5);Q(197.2,325.3,195,322.5);Q(192.5,319.3,182.5,312);L(178.5,312);L(175.5,309);L(161.5,306);L(153.2,306.7);
    M(65,318.5);L(64.5,320);L(63,319.5);L(63,323.5);L(60,326.5);L(57,340.5);L(59,347.5);L(58,349.5);Q(60.7,357.9,62,360.5);Q(63.3,363.1,68,370.5);L(70.5,371);L(73.5,375);L(81.5,381);L(83.5,381);L(84.5,383);L(102.5,387);L(103.5,385);Q(108.7,386.2,110.5,386);Q(112.1,385.9,116.5,384);L(110,370.5);L(111,368.5);L(109,367.5);L(110,365.5);L(108,360.5);L(108,352.5);Q(109.9,348.8,110,347.5);Q(110.1,346.5,109,343.5);L(111,342.5);L(111,339);L(97.5,338);L(96.5,336);L(86.5,334);L(86.5,332);L(83.5,332);L(77.5,327);L(75.5,327);L(71.5,322);L(69.5,322);L(70,320.5);L(67.5,318);L(65,318.5);
    M(233.2,323.7);L(229.5,325);L(226.5,324);L(223.5,327);L(222.5,326);L(214.5,329);Q(204.5,336.2,202,339.5);Q(200.2,341.9,197,350.5);L(195,351.5);Q(193.3,358.2,193,360.5);Q(192.6,363.7,193,373.5);L(195,380.5);L(202,393.5);L(207,397.5);L(206.5,399);L(211.5,401);L(211.5,403);L(224.5,409);Q(231.2,410.7,233.5,411);Q(236.7,411.4,246.5,411);L(247.5,409);L(248.5,410);Q(255.3,408,257.5,407);Q(260.1,405.8,267.5,401);L(268,398.5);L(276,390.5);L(276,388.5);L(280,384.5);L(283,371.5);L(283,364.5);L(281,363.5);L(281,354.5);L(278,351.5);L(279,350.5);L(277,345.5);L(274,343.5);L(275,342.5);L(269,335.5);L(266,334.5);L(266.5,333);L(263.5,333);Q(260.7,329.7,259.5,329);Q(258.4,328.4,254.5,328);L(253.5,326);L(250.5,325);Q(243.8,323.2,241.5,323);Q(239.4,322.9,233.2,323.7);
    M(74,391.5);L(71,404.5);L(73,409.5);L(72,412.5);L(75,417.5);L(74,419.5);L(81,429.5);L(97.5,441);L(110.5,443);L(113,439.5);L(111,437.5);Q(111.3,433.7,111,432.5);Q(110.7,431.4,109,428.5);Q(109.1,417.1,110,413.5);Q(110.9,410,116,400.5);L(114.5,399);L(102.5,400);L(97.5,398);L(88.5,398);L(87.5,396);L(80.5,395);L(79.5,393);L(74,391.5);
    M(124,393.5);Q(118.3,400.7,117,403.5);Q(115.3,407.3,113,419.5);L(115,425.5);L(114,426.5);Q(117.2,436.5,119,439.5);Q(121,442.8,129.5,451);Q(134.6,454.3,136.5,455);Q(138.6,455.8,145.5,457);L(161.5,458);L(168.5,454);L(170.5,455);L(185,442.5);L(189,435.5);L(192,421.5);Q(192.3,417,192,415.5);Q(191.6,413.9,189,409.5);L(190,407.5);L(185.5,401);L(181.5,404);L(177.5,404);L(176.5,406);L(175.5,405);Q(168.8,407.6,166.5,408);C(164.8,408.3,161.2,408.3,159.5,408);Q(157.9,407.7,153.5,406);L(150.5,407);L(144.5,404);L(140.5,404);L(137.5,401);L(134.5,401);L(133.5,399);L(131.5,399);L(124,393.5);
    M(192,397.5);L(191,398.5);L(194,401.5);L(193,402.5);L(198,410.5);L(197,411.5);Q(200,421.2,200,424.5);Q(200,429.1,196,442.5);L(192,449.5);L(190,450.5);L(192,453.5);L(191,454.5);L(200.5,459);L(201.5,461);Q(208.2,462.7,210.5,463);Q(213.5,463.3,222.5,463);L(227.5,461);L(228.5,462);L(240.5,454);L(241.5,455);L(242.5,452);L(245,452);L(245,449.5);L(247,448.5);Q(251.9,441.2,253,438.5);Q(253.9,436.4,255,429.5);L(254,424.5);L(252.5,423);L(246.5,425);Q(236.7,425.5,233.5,425);Q(229.1,424.4,216.5,420);L(215.5,418);L(206.5,413);L(202.5,408);L(200.5,408);L(194,397.5);L(192,397.5);
    M(97,452.5);L(97,461.5);L(102,473.5);L(106,476.5);L(106.5,479);L(120.5,486);L(120,472.5);L(122,463.5);L(124,461.5);L(123,455.5);L(117.5,453);L(111.5,455);L(97,452.5);
    M(126,460.5);L(123,472.5);Q(122.7,475.5,123,476.5);Q(123.3,477.4,125,479.5);L(124,480.5);L(131,493.5);L(136.5,498);L(140.5,499);L(141.5,501);L(150.5,503);L(168.5,501);Q(175.2,496.5,177,494.5);Q(178.8,492.5,183,485.5);L(185,467.5);L(181.5,461);L(178.5,461);Q(175,464.3,173.5,465);Q(172.3,465.5,168.5,466);L(167.5,468);L(166.5,467);L(154.5,470);L(136.5,466);L(127.5,460);L(126,460.5);
    M(190,466.5);L(190,485.5);Q(187.4,493.2,186,495.5);Q(184.4,498.1,178,504.5);Q(184.9,509.8,187.5,511);C(189.4,511.8,193.5,512.7,195.5,513);C(197.5,513.2,201.5,513.3,203.5,513);C(206.1,512.6,211.2,511.2,213.5,510);Q(215.6,509,221,504.5);L(225,499.5);L(226,495.5);L(228,494.5);Q(230,487.8,230,485.5);Q(230,483.4,228,477.5);L(229,476.5);L(225.5,474);L(219.5,476);L(214.5,474);Q(207.7,474.5,205.5,474);Q(202.5,473.4,194.5,469);L(193.5,467);L(190,466.5);
    ctx.fill('evenodd');
    ctx.fillStyle='rgba(214,0,255,1.000)';
    ctx.beginPath();
    M(157.5,197);Q(159.7,196.8,166.5,197);L(168.5,199);L(176.5,201);L(187,210.5);L(175,222.5);L(175,225.5);L(171.5,231);L(169.5,230);L(168.5,232);L(165.5,231);L(162.5,232);L(161.5,234);L(160.5,233);L(154.5,235);L(150.5,230);L(148,229.5);L(148.5,228);L(145.5,228);L(142.5,225);L(138.5,225);L(136.5,222);L(133.5,222);L(131,219.5);L(133,218.5);L(133,214.5);L(135,213.5);L(136,209.5);L(140.5,204);L(142.5,204);Q(146.7,199.9,148.5,199);Q(150.6,198,157.5,197);
    M(153.2,201.7);L(150.5,203);L(149.5,202);Q(146.8,203.7,146,204.5);C(145.1,205.4,143.5,207.4,143,208.5);Q(142.5,209.7,142,213.5);L(144,221.5);Q(148,224.4,149.5,225);C(150.7,225.5,153.2,226.1,154.5,226);C(156.3,225.9,160,225,161.5,224);C(163,223,165.2,220.1,166,218.5);Q(166.5,217.3,167,213.5);L(163.5,205);Q(159.9,202.4,158.5,202);Q(157.2,201.6,153.2,201.7);
    M(196.5,209);L(198,212.5);Q(193.7,213.2,192.5,214);C(191,215,188.7,217.9,188,219.5);Q(187.1,221.6,187,228.5);L(190,232.5);L(181.5,231);L(176.5,232);L(178,225.5);Q(182,218.4,184,216.5);Q(186.6,214,196.5,209);
    M(104.5,225);Q(110.5,224.7,112.5,225);Q(114.1,225.3,118.5,227);L(120.5,225);L(123.5,228);L(130.5,229);L(133.5,232);L(137.5,232);L(143,237.5);L(143,239.5);L(139.5,243);L(137.5,243);L(130,250.5);L(129.5,253);L(126,254.5);L(124,259.5);L(121,261.5);L(121,265.5);L(117,271.5);L(113,291.5);L(115,292.5);Q(114.5,302.3,115,305.5);Q(115.4,308.1,118,315.5);L(120,317.5);L(120,321.5);L(118.5,321);L(117.5,323);L(101.5,323);Q(98.4,322.5,97.5,322);Q(96.6,321.5,94.5,319);L(88.5,318);L(87.5,316);L(82.5,315);L(83,313.5);L(77.5,311);L(71,304.5);L(71,301.5);L(68,300.5);L(66,293.5);L(64,292.5);L(65,290.5);L(62,287.5);L(62,281.5);L(60,280.5);L(62,275.5);L(60,273.5);Q(61.9,269.1,62,267.5);Q(62.1,266.2,61,262.5);L(63,261.5);L(64,254.5);L(67,252.5);L(67,248.5);L(70,246.5);L(72,241.5);L(75.5,240);L(76,237.5);L(81.5,235);L(82.5,233);L(83.5,234);L(84.5,232);L(90.5,229);L(104.5,225);
    M(97.2,232.7);Q(94.2,233,86,236.5);L(86,238.5);Q(81.8,242.7,81,244.5);C(79.9,246.8,78.9,252,79,254.5);C(79,256.6,80.1,260.7,81,262.5);C(82,264.4,84.8,267.7,86.5,269);Q(87.8,270,92.5,272);L(102.5,274);L(103.5,272);L(105.5,273);L(106.5,271);L(111.5,271);Q(115.1,267.8,116,266.5);Q(117,265.1,119,260.5);L(121,250.5);L(119,249.5);L(120,247.5);L(116.5,239);L(111.5,237);L(109.5,234);L(97.2,232.7);
    M(169.5,237);L(176.5,239);L(177.5,237);L(187.5,239);L(190.5,242);L(194.5,242);L(197.5,245);L(200.5,245);Q(203.2,249,204.5,250);Q(205.7,250.9,210,252.5);L(212,257.5);L(214,258.5);L(213,259.5);L(215.5,260);L(219,264.5);L(218,271.5);L(216.5,271);L(214,273.5);L(214,276.5);L(209,280.5);L(209,284.5);L(205,290.5);Q(202.3,300.9,202,304.5);Q(201.7,308.2,203,319.5);L(201.5,321);L(202,319.5);L(199.5,319);L(190.5,310);L(185.5,307);L(182.5,307);L(181.5,305);Q(173.3,302.5,170.5,302);C(167.5,301.5,161.5,300.7,158.5,301);Q(155.9,301.3,148.5,304);L(147.5,303);L(130.5,311);L(127,308.5);L(128,306.5);L(125,303.5);L(126,301.5);L(124,300.5);L(125,298.5);L(122,288.5);L(124,281.5);L(122,279.5);L(124,271.5);L(126,270.5);L(127,264.5);L(129,263.5);L(130,259.5);L(132,259.5);L(134,254.5);L(141.5,247);L(143.5,248);L(145.5,245);L(151.5,243);L(152.5,241);L(153.5,242);L(154.5,240);L(156.5,241);L(157.5,239);L(159.5,240);L(169.5,237);
    M(159.2,245.7);Q(158.2,245.9,155.5,247);L(152.5,246);L(146,252.5);L(146,254.5);L(144,254.5);L(141,267.5);L(143,269.5);L(142,271.5);L(144,272.5);L(144,276.5);L(146,277.5);L(145,278.5);L(151.5,284);L(164.5,287);L(165.5,285);L(167.5,286);L(171.5,283);L(173.5,284);L(176,279.5);L(178,279.5);L(178,277.5);L(181,274.5);Q(183.1,267,183,264.5);C(182.9,261.9,181.3,256.7,180,254.5);C(178.6,252.2,174.8,248.3,172.5,247);Q(170.5,245.9,163.5,245);L(159.2,245.7);
    M(151.5,307);L(170.5,308);L(173.5,309);L(174.5,311);L(183.5,314);L(194,323.5);L(194,326.5);L(197,327.5);L(200,333.5);L(200,336.5);L(192,345.5);L(192,348.5);L(188,355.5);L(185,376.5);L(187,377.5);L(187,384.5);L(175.5,391);L(170.5,391);L(169.5,393);L(168.5,392);Q(158,394.1,154.5,394);Q(152,393.9,144.5,392);L(144.5,390);L(138.5,389);L(137.5,387);Q(133.7,385.7,132.5,385);C(131,384.1,128.1,381.9,127,380.5);Q(126,379.2,124,374.5);L(121,373.5);L(117,365.5);L(118,363.5);L(115,356.5);L(115,340.5);L(116,337.5);L(118,336.5);L(121,326.5);L(123,326.5);L(123,324.5);L(125,323.5);L(125.5,321);L(127,321.5);L(127.5,319);L(131.5,316);L(134,316);L(134.5,313);L(138.5,313);L(142.5,309);L(143.5,310);L(151.5,307);
    M(147,313.5);L(146.5,315);L(145.5,314);L(139.5,316);Q(134.1,321.3,133,323.5);Q(132,325.6,131,332.5);Q(132.5,337,133,338.5);C(133.5,339.8,134.2,342.4,135,343.5);C(136.1,344.9,138.9,347.2,140.5,348);C(142.6,349,147.2,350.2,149.5,350);Q(151.6,349.9,157.5,347);L(159.5,348);Q(164.9,342.7,166,340.5);C(167.1,338.2,168.2,333,168,330.5);C(167.9,328.1,166.4,323.4,165,321.5);C(163.4,319.3,159,316.1,156.5,315);Q(154.3,314.1,147,313.5);
    M(66.5,319);Q(68.4,323,69.5,324);Q(70.6,325,75,326.5);L(79,335.5);L(83.5,338);L(83.5,340);L(94.5,342);L(99.5,340);L(101.5,341);L(102.5,339);L(109,341.5);L(107,349.5);L(107,363.5);L(115,382.5);L(113.5,385);L(93.5,385);L(89.5,382);L(85.5,382);L(82.5,379);L(78.5,379);L(75.5,375);L(73.5,375);L(69,370.5);L(70,369.5);L(65,365.5);Q(60.6,357.5,60,354.5);Q(59.4,351.8,60,343.5);L(58,342.5);Q(59.9,338.1,60,336.5);Q(60.1,335.2,59,331.5);L(61,331.5);Q(61.3,326.1,62,324.5);Q(62.7,322.9,66.5,319);
    M(202.5,322);L(204,323);L(202.5,322);
    M(75.7,392);L(85.5,398);L(88.5,398);Q(92.8,402.1,94.5,403);C(96.1,403.9,99.7,405,101.5,405);Q(103.1,405,107.5,403);L(109.5,404);L(115,400.5);L(111,406.5);Q(108.4,416.2,108,419.5);C(107.7,422.5,107.3,428.6,108,431.5);Q(108.5,433.7,112,439.5);L(110.5,442);Q(104.4,442.5,102.5,442);Q(101.1,441.6,97.5,439);L(94.5,439);L(93.5,437);L(90.5,437);L(78,424.5);L(78,421.5);L(73,412.5);L(74,406.5);L(72,405.5);Q(73.9,401.8,74,400.5);Q(74.1,399.5,73,396.5);L(75,395.5);L(75.7,392);
    M(124.5,395);L(130,398.5);L(130,411.5);Q(134.5,416.9,136.5,418);C(138.5,419.1,143.2,420.1,145.5,420);Q(147.9,419.9,154.5,417);L(159.5,408);L(163.5,409);L(173.5,406);L(174.5,407);L(186.5,403);L(190,412.5);L(189,414.5);Q(190.7,418.2,191,419.5);Q(191.3,421.2,191,426.5);L(185,438.5);L(185,441.5);L(172.5,453);L(170.5,452);L(164.5,456);L(162.5,455);L(158.5,457);Q(145.6,457.2,141.5,456);C(137.6,454.9,130.6,450.5,127.5,448);C(125,446,120.6,441.3,119,438.5);Q(116.8,434.6,114,421.5);L(115,410.5);L(118,406.5);L(118,403.5);L(124.5,395);
    M(98.5,453);Q(106.7,455.6,109.5,456);Q(112.2,456.4,120.5,456);L(123,458.5);Q(119.4,468.1,119,471.5);Q(118.6,474.8,119.5,485);Q(110.1,481.1,107.5,479);C(105.2,477.1,101.4,472.2,100,469.5);C(98.9,467.4,97.1,462.9,97,460.5);Q(96.9,458.6,98.5,453);
    M(127.5,461);L(132.5,465);L(135.5,465);L(141.5,472);Q(145.2,472.9,146.5,473);Q(147.5,473.1,150.5,473);Q(156.3,469.5,158.5,469);C(160.4,468.5,164.6,469.5,166.5,469);Q(169,468.4,175.5,464);L(178.5,464);L(180.5,461);L(183,463.5);L(182,464.5);L(184,467.5);L(183,468.5);L(185,476.5);L(180,487.5);L(180,490.5);L(177.5,491);Q(174,495.8,172.5,497);Q(170.5,498.6,163.5,502);L(162.5,501);Q(153.5,503.3,150.5,503);Q(147,502.6,137.5,498);Q(136.2,495.6,135.5,495);Q(134.8,494.4,132,493.5);Q(126,484.8,125,481.5);Q(124,478.1,124,467.5);L(127.5,461);
    ctx.fill('evenodd');
    ctx.fillStyle='rgba(221,122,255,1.000)';
    ctx.beginPath();
    M(153.5,201);L(162.5,204);L(167,212.5);L(164,221.5);L(161.5,224);Q(157.1,225.9,155.5,226);C(154,226.1,150.9,225.5,149.5,225);Q(148.1,224.5,144.5,222);L(142,214.5);L(145,205.5);L(147.5,203);L(153.5,201);
    M(196.5,213);L(199,215.5);L(199,234.5);L(197.5,237);Q(192.8,235,191.5,234);Q(190.1,232.9,187,228.5);Q(187.1,221.6,188,219.5);Q(188.7,217.9,192.5,214);L(196.5,213);
    M(97.5,232);Q(100.5,231.7,109.5,234);L(111.5,237);L(116.5,239);L(120,246.5);L(119,249.5);L(121,250.5);L(119,260.5);Q(117,265.1,116,266.5);Q(115.1,267.8,111.5,271);L(106.5,271);L(105.5,273);L(103.5,272);L(102.5,274);L(92.5,272);Q(87.8,270,86.5,269);C(84.8,267.7,82,264.4,81,262.5);Q(80.1,260.9,79,255.5);L(81,244.5);L(86,238.5);L(86,236.5);L(97.5,232);
    M(286.5,236);Q(292.7,236.2,294.5,237);Q(296.4,237.9,301,242.5);L(301,254.5);L(296.5,259);L(292.5,259);L(286,253.5);L(287,252.5);L(283,238.5);L(286.5,236);
    M(159.5,245);L(172.5,247);L(176.5,252);L(179,252.5);Q(182.8,260.6,183,263.5);Q(183.2,266.3,181,274.5);L(178,277.5);L(178,279.5);L(176.5,279);L(173.5,284);L(172.5,283);L(171.5,285);L(169.5,284);L(167.5,286);L(165.5,285);L(164.5,287);L(151.5,284);L(145,278.5);L(146,277.5);L(144,276.5);L(144,272.5);L(142,271.5);L(143,269.5);L(141,267.5);L(144,254.5);L(145.5,255);L(146,252.5);L(152.5,246);L(154.5,247);L(159.5,245);
    M(247.5,263);L(260.5,266);Q(265.8,269.8,267,271.5);C(268.7,273.9,270.8,279.6,271,282.5);Q(271.2,285.8,268,295.5);L(264,298.5);L(263.5,301);L(260.5,302);L(259.5,304);L(258.5,303);L(257.5,305);L(240.5,303);L(235.5,298);L(233,297.5);L(234,296.5);L(231,293.5);L(232,291.5);L(230,290.5);L(231,287.5);L(229,286.5);L(232,273.5);L(238.5,267);L(241.5,265);L(243.5,266);L(244.5,264);L(246.5,265);L(247.5,263);
    M(147.5,313);L(156.5,315);Q(160.4,317.1,161.5,318);Q(162.5,318.8,165,321.5);Q(167.8,327.4,168,329.5);C(168.2,332.3,167.3,338,166,340.5);Q(164.6,343.2,157.5,349);L(156.5,348);Q(151.3,349.9,149.5,350);C(147.2,350.1,142.6,349,140.5,348);Q(138.9,347.2,135,343.5);Q(131.2,336.2,131,333.5);Q(130.8,331,133,323.5);Q(135.9,319.6,137,318.5);Q(138,317.5,141.5,315);L(146.5,315);L(147.5,313);
    M(76.7,327);Q(82.9,332.9,85.5,334);Q(87.4,334.8,93.5,335);L(94.5,337);L(100.5,338);L(102,340.5);Q(95.7,342,93.5,342);Q(91,342,83.5,340);L(84,338.5);Q(80,336.6,79,335.5);Q(77.7,334.1,76,328.5);L(76.7,327);
    M(226.5,330);Q(229,329.8,236.5,332);L(239.5,334);Q(243.1,337.2,244,338.5);Q(244.7,339.6,246,343.5);L(245,345.5);L(247,346.5);L(245,355.5);L(242,358.5);L(242,360.5);Q(238.1,364.1,236.5,365);Q(235.1,365.8,230.5,367);Q(222.9,366,220.5,365);C(218.8,364.3,215.8,362.2,214.5,361);Q(213.5,360,211,356.5);L(212,355.5);L(210,350.5);L(212,339.5);L(214,338.5);L(214,336.5);L(216.5,334);L(226.5,330);
    M(90.5,398);L(98.5,400);L(114,399.5);L(109.5,404);L(107.5,403);Q(103.1,405,101.5,405);C(99.7,405,96.1,403.8,94.5,403);Q(93.2,402.4,90,399.5);L(90.5,398);
    M(130.5,398);L(133.5,399);L(134.5,401);L(137.5,401);L(140.5,404);L(144.5,404);L(149.5,407);L(158.5,407);L(158,412.5);L(151.5,419);L(150.5,418);L(145.5,420);Q(138.5,419.1,136.5,418);Q(134.5,416.9,130,411.5);L(129,408.5);L(130.5,398);
    M(194.5,401);L(199,404.5);L(200.5,408);L(218,421.5);L(209.5,426);L(200.5,424);L(194.5,401);
    M(263.5,431);L(265,433.5);L(262.5,435);L(262,432.5);L(263.5,431);
    M(115.5,454);L(120.5,454);L(123,456.5);L(116.5,456);L(115.5,454);
    M(189.5,465);L(196.5,469);L(196.5,471);Q(199.5,470.7,200.5,471);Q(201.5,471.3,204,473.5);L(200.5,481);Q(197.6,482.8,196.5,483);Q(195.1,483.3,191,482.5);L(191,470.5);L(189.5,465);
    M(136.5,466);L(156,470.5);L(150.5,473);L(141.5,472);L(136.5,466);
    ctx.fill('evenodd');
    ctx.fillStyle='rgba(221,208,255,1.000)';
    ctx.beginPath();
    M(149.5,205);L(154.5,205);L(158,208.5);L(156.5,215);L(152.5,216);L(147,213.5);Q(146.6,209.7,147,208.5);Q(147.3,207.5,149.5,205);
    M(195.5,216);L(198,217.5);L(198,226.5);L(196.5,228);L(191,223.5);L(191,219.5);L(195.5,216);
    M(94.5,238);L(102.5,239);L(106,243.5);Q(106.3,248,106,249.5);C(105.7,250.6,104.7,252.6,104,253.5);Q(103.1,254.6,99.5,257);L(89.5,255);L(87,250.5);L(88,242.5);L(94.5,238);
    M(155.5,250);L(162.5,250);L(163.5,252);L(165.5,252);L(168,256.5);L(167,260.5);L(169,261.7);L(165.5,267);L(162.5,268);L(161.5,270);L(159.5,269);L(158.5,271);L(154.5,270);Q(150.8,266.9,150,265.5);Q(149.2,264.2,148,259.5);L(149,255.5);L(150.5,256);L(151,253.5);L(155.5,250);
    M(143.5,318);Q(144.9,317.5,149.5,318);L(150.5,320);L(153,320.5);L(152,321.5);L(155,324.5);L(153,332.5);L(146.5,336);Q(143.4,335.5,142.5,335);C(141.4,334.4,139.7,332.5,139,331.5);Q(138.3,330.4,137,326.5);L(140,320.5);L(143.5,318);
    M(134.5,402);L(145,407);L(140.5,408);L(134.5,402);
    ctx.fill('evenodd');
    ctx.fillStyle='rgba(155,78,0,1.000)';
    ctx.beginPath();
    M(183.5,60);L(200,63.5);L(208,79.5);L(208,84.5);L(217,99.5);L(218,108.5);L(220.5,112);L(223,112.5);L(222,113.5);L(225,116.5);L(224,120);L(226.5,120);L(238.5,110);L(239.5,111);L(241.5,108);L(242.5,109);L(246.5,105);L(247.5,106);L(249.5,103);L(252,104.5);L(251,109.5);L(249,110.5);L(249,113.5);L(244,122.5);L(242,122.5);L(242,126.5);L(240,127.5);L(237,134.5);L(241,143.5);L(240,144.5);L(243,147.5);L(242,148.5);L(247,159.5);L(246,161.5);L(249,168.5);L(248,170.5);L(250,171.5);L(249,172.5);Q(252.7,179.8,253,182.5);Q(253.3,184.5,252,190.5);L(254,191.5);L(253,198.5);L(255,199.5);L(255,205.5);L(256.5,207);Q(264.7,205.8,267.5,206);Q(269.9,206.2,277,208.5);L(263.5,221);L(258.5,221);L(256,223.5);L(257,246.5);L(255.5,250);L(243,252.5);L(245,244.5);L(244,226.5);L(245.5,224);L(247.5,227);L(249.5,227);L(250.5,225);L(264.5,217);L(266.5,214);L(267.5,215);L(268,212);L(263.5,212);L(247.5,217);L(244,215.5);L(247,210.5);Q(246.6,198.5,246,194.5);Q(245.5,191.4,243,182.5);L(244,180.5);L(242,179.5);L(243,177.5);L(240,175.5);L(241,174.5);L(234,153.5);L(227,142.5);L(227.5,141);L(229,141.5);L(228.5,143);L(230,142.5);L(230,139.5);L(235,133.5);L(235,129.5);L(242,120.5);L(243.5,114);L(241.5,114);L(237.5,119);L(236.5,118);L(236,120.5);L(231,124.5);L(231,126.5);L(229.5,126);L(223.5,133);L(221.5,133);L(219,129.5);L(220,126.5);L(218.5,124);L(216,123.5);L(216,119.5);L(214,118.5);L(215,116.5);L(206,100.5);L(206,95.5);L(204.5,93);L(202,92.5);L(202,89.5);L(199,86.5);L(200,85.5);L(196.5,83);L(193.5,88);L(190.5,89);L(186.5,94);L(185,93.5);L(186,97.5);Q(191.4,104.9,193,107.5);Q(195,110.9,200,121.5);L(201,128.5);Q(208.2,134.9,210,137.5);Q(211.7,140,215,148.5);L(214,150.5);L(218,154.5);L(217,156.5);L(222,166.5);L(221,168.5);L(223,169.5);L(222,170.5);L(226,183.5);L(225,187.5);L(227,188.5);L(226,195.5);L(228,196.5);L(228,215.5);Q(225.4,222.9,225,225.5);Q(224.6,228,225,235.5);L(222,249.5);L(220.5,251);L(215.5,245);L(213,244.5);L(213.5,243);L(206.5,240);L(205.5,238);L(201.5,238);L(199,234.5);L(200,230.5);L(198,229.5);L(198,216.5);L(200,211.5);L(198,210.5);L(199,207.5);L(197,202.5);L(197,184.5);Q(192,183.7,190.5,183);C(189.4,182.5,187.7,180.5,186.5,180);Q(184.9,179.3,179.5,179);L(178.5,177);L(169.5,174);L(170,172.5);L(168,171.5);L(183.5,167);L(192.5,167);L(194,163.5);L(190,153.5);L(191,151.5);L(189,146.5);L(180,130.5);L(181,128.5);L(177,124.5);L(177,120.5);L(157,86.5);L(159,75.5);L(169.5,66);L(170.5,67);L(174.5,63);L(175.5,64);L(177.5,61);L(178.5,62);L(183.5,60);
    M(187.2,66.7);Q(177.4,67.5,174.5,69);Q(171.5,70.6,165,78.5);L(162,85.5);Q(165.6,87.1,166.5,88);Q(167.5,89,169.5,93);L(179.5,89);L(180.5,90);L(195,77.5);L(195,68.5);L(187.2,66.7);
    M(183.2,173.7);L(181,174.5);L(188.5,178);L(189.5,180);L(199.5,183);L(200.5,185);L(204.5,186);L(206,183.5);L(207,175);Q(200.6,175.3,198.5,175);Q(196.9,174.7,192.5,173);L(183.2,173.7);
    ctx.fill('evenodd');
    ctx.fillStyle='rgba(118,62,0,1.000)';
    ctx.beginPath();
    M(187.5,66);L(195,68.5);L(195,77.5);L(180.5,90);L(179.5,89);L(169.5,93);L(168,89.5);L(162,85.5);L(164,79.5);Q(171.3,70.8,174.5,69);Q(177.4,67.4,187.5,66);
    M(196.5,83);L(200,85.5);L(200,89.5);L(206,98.5);L(207,103.5);L(221.5,133);L(228.5,129);L(229,126.5);L(230.5,127);L(234,121.5);L(237.5,120);L(241.5,114);L(243,114.5);L(242,118.5);L(240,119.5);L(240,123.5);L(235,129.5);L(235,132.5);L(233,133.5);L(233,136.5);L(231,137.5);L(230,141.5);L(226,140.5);L(237,161.5);L(237,166.5);L(239,168.5);L(241,174.5);L(240,175.5);L(242,176.5);L(241,177.5);L(245,188.5);L(244,190.5);L(246,195.5);L(245,197.5);Q(246.7,201.9,247,203.5);Q(247.3,205.2,247,210.5);L(245,211.5);L(244,215.5);L(246.5,217);L(260.5,213);L(267,213.5);L(265,214.5);L(264.5,217);L(248.5,227);L(246,224.5);L(247,222.5);L(244,221.5);L(245,238.5);L(243,243.5);L(245,244.5);L(243,252.5);L(239.5,255);L(236.5,254);L(228.5,261);L(221,251.5);L(227,226.5);Q(225.8,222,226,220.5);Q(226.1,219.2,228,215.5);Q(228.5,201.2,228,196.5);Q(227.6,192.9,225,182.5);L(226,180.5);L(218,154.5);L(216,153.5);L(217,151.5);Q(212.3,140.7,210,137.5);Q(208.1,134.9,201,128.5);L(202,126.5);L(190,103.5);L(191,101.5);L(185,94.5);L(190.5,89);L(193.5,88);L(196.5,83);
    M(186.5,173);L(191.5,175);L(206.5,175);L(207,178.5);L(205,179.5);L(203.5,185);Q(201.4,183.3,200.5,183);Q(199.5,182.7,196.5,183);L(190.5,178);L(186.5,178);L(186.5,176);L(181,174.5);L(185.5,175);L(186.5,173);
    ctx.stroke();
    ctx.fill('evenodd');

    ctx.setTransform(1,0,0,1,0,0)
}
function waterMellon(ctx,x=0,y=0,w=239.837464916885,h=127.95622239892359){
    function A(x,y,r){ctx.arc(x,y,r,0,Math.PI*2)};
    function M(x,y){ctx.moveTo(x,y)};
    function L(x,y){ctx.lineTo(x,y)};
    function Q(x,y,x1,y1){ctx.quadraticCurveTo(x,y,x1,y1)};
    function C(x,y,x1,y1,x2,y2){ctx.bezierCurveTo(x,y,x1,y1,x2,y2)};
    
    var scx = w / 239.837464916885;
    var scy = h / 127.95622239892359;
    ctx.setTransform(scx,0,0,scy,x,y);
    ctx.fillStyle='rgba(255,0,0,1.000)';
    ctx.beginPath();
    M(178.5,24);L(260.5,24);L(261,48.5);Q(255.4,82.7,236,105.5);Q(222,120.6,206.5,131);Q(190.5,140.6,168.5,146);L(121.5,147);Q(96.2,141.6,78.5,131);Q(58.4,118.1,42,96.5);Q(31,78.6,26,59.5);Q(22.6,44.2,25.5,24);L(178.5,24);
    ctx.fill('evenodd');
    ctx.fillStyle='rgba(0,184,0,1.000)';
    ctx.beginPath();
    M(256.9,22.6);L(262.4,23.9);L(261.4,55.1);Q(250.7,88,244.2,97.4);C(237.1,107.8,218.1,125.5,207.4,132.2);C(197.5,138.4,175.3,146.5,163.8,148.5);C(152,150.5,127.6,149.9,115.9,147.4);C(104.1,144.8,81.6,135,71.6,128.2);C(62.6,122.1,46.7,106.6,40.8,97.4);Q(33.7,86.3,22.5,47.8);L(24,22.9);L(27.7,35.7);L(27.6,23.9);L(38.1,22.6);L(39.4,37.1);L(30.3,38.3);L(32.6,56.3);Q(46.9,93.2,55.5,103);C(65.1,114,90.3,130.4,104,135.5);C(115.4,139.7,140.2,142.5,152.3,141.4);C(164.4,140.4,188.2,133.1,199,127.5);Q(207.4,123.1,228.6,103.8);L(253.5,53);L(254.7,38.3);L(243.6,37.1);L(243.6,23.9);L(256.1,22.6);L(257.1,36.7);L(256.9,22.6);
    ctx.fill('evenodd');
    ctx.fillStyle='rgba(0,255,0,1.000)';
    ctx.beginPath();
    M(37.5,37);Q(38.3,53.2,44,69.5);Q(51.1,85.7,63,99.5);Q(75.9,113.1,100.5,125);Q(114.2,129.4,127.5,132);Q(153,132.7,165.5,130);Q(185.7,124.6,204.5,113);Q(226,98.2,239,70.5);Q(245.7,51.3,245,37.5);L(255.5,37);L(256,44.5);Q(253.3,64.4,245,82.5);Q(233.3,104.1,214.5,119);Q(196.8,132,174.5,139);Q(155,143.9,132.5,143);Q(115.2,140.5,98.5,135);Q(72.9,123.9,56,105.5);Q(37.8,85.2,31,57.5);L(29,37.5);L(37.5,37);
    ctx.fill('evenodd');
    ctx.fillStyle='rgba(235,255,237,1.000)';
    ctx.beginPath();
    M(235.9,35.6);Q(242.4,34.6,246.4,36.9);L(244.4,55.1);Q(237.8,80.8,224.2,95.4);Q(209.4,112.1,190.8,122);Q(171.3,131.5,145.8,133.5);Q(128.1,133.5,107.9,128.4);Q(90.1,122.1,77.6,113.2);Q(63.1,101.3,51.8,86.4);Q(41,69.3,37.5,48.8);L(37.6,36.9);Q(39.7,34.7,48.1,35.6);Q(51.9,59.3,60.5,75);Q(70.5,90,84.8,101);Q(100.1,110.8,115,115.5);Q(129.7,119.4,153.5,118.5);Q(183.9,113.6,204,97.5);Q(217.4,85.4,226.5,69.7);Q(233,54.6,235.9,35.6);
    ctx.fill('evenodd');
    ctx.fillStyle='rgba(198,187,199,1.000)';
    ctx.beginPath();
    M(43.5,22.5);Q(45,22.5,49.4,23.9);L(48.1,38.4);L(37.6,37.1);L(36.6,23.9);L(43.5,22.5);
    M(235.9,22.6);L(246.4,23.9);L(245.1,38.4);L(234.6,37.1);L(235.9,22.6);
    ctx.fill('evenodd');
    ctx.fillStyle='rgba(198,1,0,1.000)';
    ctx.beginPath();
    M(102.5,24);L(234.5,24);L(235,36.5);L(49,36.5);L(49.5,24);L(102.5,24);
    ctx.fill('evenodd');
    ctx.fillStyle='rgba(0,1,0,1.000)';
    ctx.beginPath();
    M(80.5,41);Q(86.8,41.1,88,42.5);Q(91.2,49.1,86.5,53);Q(80.2,52.9,79,51.5);Q(76.2,45.7,80.5,41);
    M(200.5,43);Q(206.1,42.5,208,45.5);Q(208.5,51.1,205.5,53);Q(199.9,53.5,198,50.5);Q(197.5,44.9,200.5,43);
    M(161.5,63);Q(167.9,61.9,169,66.5);Q(168.7,72.5,166.5,75);Q(160.1,76.1,159,71.5);Q(159.3,65.5,161.5,63);
    M(122.5,99);Q(129.2,98.3,131,101.5);Q(133.1,108,126.5,111);Q(121.9,110.2,120,107.5);Q(119.3,100.8,122.5,99);
    ctx.fill('evenodd');
    ctx.setTransform(1,0,0,1,0,0)
}