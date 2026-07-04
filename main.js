class SceneBase{
    Start(){}
    Update(elapsed){}
    Render(ctx){}
}

class TitleScene extends SceneBase{
    Start(){
        console.log("TitleScene Start");
    }
    Update(elapsed){}
    Render(ctx){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle ="black";
        ctx.font = "32px sans-serif";
        ctx.textAlign="center";
        ctx.textBaseline="top";
        ctx.fillText("Press Space Key",canvas.width/2,2);
        for(let i=0;i<10;i++){
            for(let j=0;j<10;j++){
                ctx.fillText("|",i*20+10,j*20+10);
                ctx.fillText("--------",i*20+10,j*20+10);
            }
        }
    }
}


class MemorizationScene extends SceneBase {
    Start(){
        console.log("暗記開始");
        this.timer=0;
    }
    Update(elapsed){
        this.timer+=elapsed;
        if(this.timer>1){
            SceneRequest = new GameScene();
        }
    }
    Render(ctx){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle="red";
        ctx.font = "32px sans-serif";
        ctx.textAlign="center";
        ctx.textBaseline="top";
        ctx.fillText("5秒後　Answer",canvas.width/2,2);

    }
}



class GameScene extends SceneBase {
    constructor(){
        super();
        this.player=new Player(320,240);
        this.input={                                            //input初期化
            left:false,
            right:false,
            up:false,
            down:false,
        };
        this.goal=new Goal(120,40);
    }
    Start(){
        

        this.keyDownHandler = (e) =>{                              //押したとき
            console.log("回答開始");
            if(e.key == "ArrowLeft")this.input.left=true;
            if(e.key == "ArrowRight")this.input.right=true;
            if(e.key == "ArrowUp")this.input.up=true;
            if(e.key == "ArrowDown")this.input.down=true;
        };
        this.keyUpHandler = (e) =>{                             //離したとき
            if(e.key == "ArrowLeft")this.input.left=false;
            if(e.key == "ArrowRight")this.input.right=false;
            if(e.key == "ArrowUp")this.input.up=false;
            if(e.key == "ArrowDown")this.input.down=false;
        }
        
        window.addEventListener("keydown",this.keyDownHandler); //keyDownが実行されたかときイベント登録
        window.addEventListener("keyup",this.keyUpHandler);  //keyUpが実行されたかときイベント消去
        
    }
    Update(elapsed){
        this.player.Update(this.input,elapsed);
        const playerLeft=this.player.x;
        const playerRight=this.player.x+this.player.width;
        const playerTop=this.player.y;
        const playerBottom=this.player.y+this.player.height;

        const goalLeft=this.goal.x;
        const goalRight=this.goal.x+this.goal.width;
        const goalTop=this.goal.y;
        const goalBottom=this.goal.y+this.goal.height;

        const Hit = playerRight > goalLeft &&
                    playerLeft < goalRight &&
                    playerBottom > goalTop &&
                    playerTop < goalBottom;

        if(Hit){
            console.log("goal");
        }
    }
    Render(ctx){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle="black";
        ctx.font="32px sans-serif";
        ctx.textAlign="center";
        ctx.textBaseline="top";
        ctx.fillText("回答開始",canvas.width/2,2);
        this.player.Render(ctx);
        this.goal.Render(ctx);
    }
}

class Player {
    constructor(_x,_y){
        this.x=_x;
        this.y=_y;
        this.width=30;
        this.height=30;
        this.speed=2;
        
    }
    Start(){}
    Update(elapsed){
        if(elapsed.left)this.x -=this.speed;
        if(elapsed.right)this.x +=this.speed;
        if(elapsed.up)this.y -=this.speed;
        if(elapsed.down)this.y +=this.speed;
    }
    Render(ctx){
        ctx.fillStyle="Green";
        ctx.fillRect(this.x,this.y,30,30);
    }
}

class Goal{
    constructor(_x,_y){
        this.x=_x;
        this.y=_y;
        this.width=30;
        this.height=30;
    }
    Start(){}
    Update(elapsed){
        if(goal(_x,_y)>player(_x,_y)){

        }
    }
Render(ctx){
        ctx.fillStyle="Red";
        ctx.fillRect(this.x,this.y,30,30);
    }
}

let SceneCurrent = null;
let SceneRequest = null;

function main(){
    SceneCurrent = new TitleScene;
    SceneCurrent.Start();
    let lastTime =0;

    function render(timestamp){
        let elapsed = (timestamp - lastTime) / 1000;
        lastTime = timestamp;
        if(SceneRequest != null){
            SceneCurrent = SceneRequest;
            SceneRequest = null;
            SceneCurrent.Start();
        }
    
        SceneCurrent.Update(elapsed);
        SceneCurrent.Render(ctx);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

window.addEventListener("keydown",(e) => {
    if(e.code =="Space"){
        SceneRequest = new MemorizationScene();
    }
});


const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


main();