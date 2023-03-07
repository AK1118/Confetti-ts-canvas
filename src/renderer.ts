import { Shape } from "./base/shape";
import Painter from "./painter";
import FpsUtil from "./fps";
import Size from "./size";

enum AnimationState {
    running,
    stop,
}

var CanvasSize: Size = new Size(0, 0);

type animationFinishedCallback = () => void;
class CanvasRender {
    //画笔代理
    private paint: Painter;
    //画布大小
    private canvasSize: Size = new Size(300, 300);
    //动画状态
    private animationState: AnimationState = AnimationState.stop;
    //动画完成回调
    private onFinished: animationFinishedCallback=()=>{};
    //图形
    private shapeList: Array<Shape> = [];
    //渲染器是否被销毁
    private hasBeenDispose: boolean = false;
    //回收栈
    private revoveryShape: Array<Shape> = [];
    //FPS工具
    private fpsUtil: FpsUtil = new FpsUtil();
    //显示FPS
    private displayFPS: boolean = false;

    constructor() {
        
    }
    init(paint: CanvasRenderingContext2D|UniNamespace.CanvasContext, size?: { width: number, height: number }, params?:{
        onFinished?: animationFinishedCallback,
        displayFps?:boolean,
    }){
        if (paint) this.paint = new Painter(paint);
       
        if (size) {
            this.canvasSize.width = size.width;
            this.canvasSize.height = size.height;
        }
        if(params){
            if (params.onFinished) this.onFinished = params.onFinished;
            if(params.displayFps)this.displayFPS=params.displayFps;
        }
       
        CanvasSize = this.canvasSize;
    }

    private update(animationEngine: any) {
        if (this.animationState === AnimationState.stop) return;
        this.paint.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
        if (this.shapeList.length == 0) return this.animationFinished();
        const hx = this.canvasSize.width >> 1, hy = this.canvasSize.height >> 1;
        this.shapeList.forEach((shape: Shape, ndx) => {
            if (!((shape.position.x < hx && shape.position.x > ~hx) && shape
                .position.y < hy)) {
                shape.disable();
            }
            shape.update(this.paint);
        });
        //回收对象
        this.recovery();

        //渲染FPS
        if (this.displayFPS) {
            const fps: number = this.fpsUtil.tick();
            this.paint.fillStyle = "black";
            this.paint.fillText("FPS:" + fps, 10, 20);
        }
        animationEngine(() => {
            this.update(animationEngine);
        });

    }
    private animationFinished(){
        this.animationState=AnimationState.stop;
        this.onFinished?.();
    }
    /**
      * @description 回收彩纸对象
      */
    public recovery() {
        this.shapeList = this.shapeList.filter((item, ndx) => {
            if (!item.alive) {
                this.revoveryShape.push(item);
            }
            return item.alive;
        });
    }
    /**
     * @description 在回收栈里面拿重复利用对象
     * @param {number} count //拿多少个
     */
    public async recover(count: number): Promise<Array<Shape>> {
        if (this.hasBeenDispose) {
            throw new Error('This CanvasRender has been destroyed!')
        }
        const len = this.revoveryShape.length;
        if (count > len) {
            const re = [];
            for (let i = 0; i < len; i++) {
                re.push(this.revoveryShape.pop());
            }
            return Promise.resolve(re);
        } else {
            const re = [];
            for (let i = 0; i < count; i++) {
                re.push(this.revoveryShape.pop());
            }
            return Promise.resolve(re);
        }
        return Promise.resolve([])
    }
    run() {
        if (this.hasBeenDispose) {
            return console.error("This CanvasRender has been destroyed!");
        }
        let animationEngine = function (callback) {
            setTimeout(callback, 1000 / 60);
        }
        if(typeof(requestIdleCallback)!="undefined"){
            animationEngine=requestAnimationFrame;
        }
        animationEngine(() => {
            if (this.shapeList.length != 0)
                this.update(animationEngine);
        });
    }
    add(shapes: Array<Shape>) {
        /*fire的时候继续开启动画状态*/
        if (this.animationState == AnimationState.stop) {
            this.animationState = AnimationState.running;
            this.run();
        }
        this.shapeList.push(...shapes);
    }
}

export {
    CanvasSize,
}
export default CanvasRender;