import Matrix3All from "../matrix3";
import Painter from "../painter";
import Material from "../material";
import Vector from "../vector";
import { RenderConfig } from "../renderer";

class Point extends Vector{
    x:number=0;
    y:number=0;
    z:number=0;
    constructor(x:number,y:number){
        super(x,y);
        this.x=x;
        this.y=y;
    }
    setPoint(point:[x:number,y:number,z:number]): void {
        const [x,y,z]=point;
        this.x=x;
        this.y=y;
        this.z=z;
    }
    toArray():Array<number>{
        return [this.x,this.y];
    }
}

/**
 * 纸屑类基类
 */
abstract class Shape{
    public points:Array<Point>=[];
    public material:Material;
    public position:Vector=new Vector(0,0);
    public vector:Vector=new Vector(0,0);
    private _alive:boolean=true;
    private gravity=RenderConfig.grivity;
    get alive():boolean{
        return this._alive;
    }
    relive():void{
        this._alive=true;
    }
    disable():void{
        this._alive=false;
    }
    public update(paint:Painter){
       this.move();
        this.material.update(paint, this.position, this);
		const speed = 20;
		const ran = () => Math.random() * speed;
		Matrix3All.rotateX(this, ran() - this.vector.y);
		Matrix3All.rotateY(this, ran() - this.vector.x);
		Matrix3All.rotateZ(this, ran() - this.vector.y);
    }
    abstract createPosints(value:any):void;
    public move(){
        if (Math.abs(this.vector.x) > .2) this.vector.x *= .9;
		if (Math.abs(this.vector.y) > 1) this.vector.y *= .9;
		this.vector.y += this.gravity;
		this.vector.x += Math.random() > .5 ? -.2 : .2;
		this.position.add(this.vector);
    }
    public reset(reset:{position:Vector,vector:Vector}){
        this.relive();
        this.material.opacity=1;
        this.position.setXY(reset.position.x,reset.position.y);
        this.vector.setXY(reset.vector.x,reset.vector.y);
    }
}

export {
    Shape,
    Point,
}