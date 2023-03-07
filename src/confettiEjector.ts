import { Shape } from "./base/shape";
import CanvasRender from "./renderer";
import { Styles } from "./material";
import CustomShape from "./shapes/customshape";
import Polygon from "./shapes/polygon";
import Size from "./size";
import Utils from "./utils";
import Vector from "./vector";
 /*形状类型枚举*/
class ConfettiShapes{
	static POLYGON='Polygon';
	static CUSTOM='CustomShape';
}
/*喷发类*/
class ConfettiEjector {
    /*彩纸片边角数量集合*/
    shapeTypes: Array<number|Shape> = [3, 4, 15];
    canvasRender: CanvasRender;

    PI: number = Math.PI / 180;
    /*每次爆炸彩纸数量*/
    count: number = 30;
    //限制喷射角度，顺时针
    limitAngle: [limitx: number, limity: number] = [90, 270]
    constructor(canvasRender:CanvasRender,params?:{
        limitAngle?:[limitx: number, limity: number],
        count?:number,
        shapeTypes?:Array<number|Shape>,
        colors?:Array<string|Array<number>>, //颜色自定义
    }) {
        const {limitAngle,count,shapeTypes,colors}=params||{};

        if (canvasRender == undefined) {
            console.error("CanvasRender不能为空");
            return;
        }
        this.canvasRender = canvasRender;
        this.limitAngle = limitAngle || [0, 360];
        this.count = count || 30;
        this.shapeTypes = shapeTypes || [3, 4, 5, 6, 15];
        if (colors) {
            Styles.setColors(colors)
        }
    }
    /*获取指定区间值*/
    getRandomClamp([min, max]) {
        const ran = Math.random() * (max - min + 1) + min;
        return ran;
    }
    async create(params:{
        /*喷发圆心点x*/
        x:number,
        /*喷发圆心点y*/
        y:number,
        /*喷发力度域值[min,max]*/
        clampforce:[min:number,max:number],
        /*纸屑半径*/
        radius:number,
    }) {
        const {x,y,clampforce,radius}=params;
        //喷射速度
        const spraySpeed = clampforce || [20, 40];
        const shapesCache:Array<Shape> = [];
        /*重新使用被回收的对象*/
        const recover = await this.canvasRender.recover(this.count);
        const len = recover.length;
        for (let i = 0; i < len; i++) {
            const shape = recover[i];
            const ranAngle = this.getRandomClamp(this.limitAngle) * this.PI;
            const speed = this.getRandomClamp(spraySpeed);
            const vx = Math.cos(ranAngle) * speed;
            const vy = Math.sin(ranAngle) * speed;
            shape.reset(
                {
                    position: new Vector(x, y),
                    vector: new Vector(vx, vy)

                }
            );
        }
        shapesCache.push(...recover);
        for (let i = 0; i < this.count - len; i++) {
            const shapeType = this.shapeTypes[(Math.random() * this.shapeTypes.length) >> 0];
            const ranAngle = this.getRandomClamp(this.limitAngle) * this.PI;
            const speed = this.getRandomClamp(spraySpeed);
            const vx = Math.cos(ranAngle) * speed;
            const vy = Math.sin(ranAngle) * speed;
            if (Utils.constructorIs(shapeType, ConfettiShapes.CUSTOM)) {
                const _:any=shapeType;
                const originCustomShape:CustomShape=_;
                const customShape:CustomShape = new CustomShape(
                    {
                        points: originCustomShape.originPoints,
                        position: new Vector(x, y),
                        vector: new Vector(vx, vy),
                        scale:originCustomShape.scale,
                    });
                shapesCache.push(customShape);
                continue;
            }
            const _:any=shapeType;
            const count:number=_;
            const shape = new Polygon({
                size:new Size(radius,radius),
                count: count,
                position: new Vector(x, y),
                vector: new Vector(vx, vy),
            });
            shapesCache.push(shape)
        }
        return Promise.resolve(shapesCache);
    }
    async fire(_shapes) {
        const shapes:Array<Shape> = await _shapes;
        
        this.canvasRender.add(shapes);
    }
}

export default ConfettiEjector;