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
        ctx.font = "24px sans-serif";
        ctx.fillText("Press Space Key",400,300);
        

    }
}


class MemorizationScene extends SceneBase {
    Start(){
        console.log("暗記開始");
        this.timer=0;
    }
    Update(elapsed){
        this.timer+=elapsed;
        if(this.timer>5){
            SceneRequest = new AnswerScene();
        }
    }
    Render(ctx){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle="red";
        ctx.font = "32px sans-serif";
        ctx.fillText("5秒後　Anser",40,30);
    }
}


// class AnswerScene extends SceneBase {
//     Start(){
//         console.log("回答開始");
//     }
//     Update(elapsed){
//     }
// }

// class GameScene extends SceneBase {
//     constructor(){
//         super();
//         this.player=new this.player(320,240);
//         this.input={                                            //input初期化
//             left:false,
//             right:false,
//             up:false,
//             down:false,
//         };
//     }
//     Start(){
//         this.keyDownHandler = (e) =>{                           //押したとき
//             if(e.key == "ArrowLeft")this.input.left=true;
//             if(e.key == "ArrowRight")this.input.right=true;
//             if(e.key == "ArrowUp")this.input.Up=true;
//             if(e.key == "ArrowDown")this.input.Down=true;
//         };
//         this.keyUpHandler = (e) =>{                             //離したとき
//             if(e.key == "ArrowLeft")this.input.left=false;
//             if(e.key == "ArrowRight")this.input.right=false;
//             if(e.key == "ArrowUp")this.input.Up=false;
//             if(e.key == "ArrowDown")this.input.Down=false;
//         }
//         window.addEventListener("keydown",this.keyDownHandler); //keyDownが実行されたかときイベント登録
//         window.removeEventListener("keyup",this.keyUpHandler);  //keyUpが実行されたかときイベント消去
//     }
// }

// class Player {
//     constructor(_x,_y){
//         this.x=_x;
//         this.y=_y;
//         this.speed=4;
//     }
//     Start(){}
//     Update(elapsed){
//         if(elapsed.input.left)this.x -=this.speed;
//         if(elapsed.input.right)this.x +=this.speed;
//         if(elapsed.up)this.y -=this.speed;
//         if(elapsed.down)this.y +=this.speed;
//     }
//     Render(ctx){
//         ctx.fillStyle="Green";
//         ctx.fillRect(this.x,this.y,30,30);
//     }
// }

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