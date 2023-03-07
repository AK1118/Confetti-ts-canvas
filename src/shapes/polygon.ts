import Material from "../material";
import { Point, Shape } from "../base/shape";
import Vector from "../vector";

class Polygon extends Shape{
    private size:Size;
    constructor(params:{
        size:Size,
        position:Vector,
        count:number,
        vector:Vector,
    }){
        super();
        this.size=params.size;
        this.createPosints(params.count);
        this.material=new Material(this.points);
        this.vector=params.vector;
        this.position=params.position;
    }
    createPosints(count: number): void {
        const PI = Math.PI * 2;
		const half_w = this.size.width >> 1;
		const avg = PI / count;
		for (let i = 0; i < count; i++) {
            const point=new Point(
				 Math.cos(i * avg) * half_w,
			     Math.sin(i * avg) * half_w,
			);
			this.points.push(point);
		}
    }   
}

export default Polygon;