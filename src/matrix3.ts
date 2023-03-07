import { Point, Shape } from "./base/shape";
import { CanvasSize } from "./renderer";
/*矩阵工具类*/
class Matrix3 {
	static transformTo2D(point:Point, A:Point, position) {
		return {
			x:  (CanvasSize.width *.5) + position.x+point.x,//+x,
			y: (CanvasSize.height *.5) + position.y+point.y//+y,
		};
	}
	static rotateX(point:Point, angle:number) :[x:number,y:number,z:number]{
		//const mp = point.toArray();
		const cos_ = Math.cos(angle),
			sin_ = Math.sin(angle);
		const y = point.y * cos_ - point.z * sin_;
		const z = point.z * cos_ + point.y * sin_;
		const result:[x:number,y:number,z:number] = [point.x, y, z];
		// const mf = [
		// 	[1, 0, 0],
		// 	[0, cos_, (sin_*-1)],
		// 	[0, sin_, cos_]
		// ];
		return result;
	}
	static rotateZ(point:Point, angle:number) :[x:number,y:number,z:number]{
		//const mp = point.toArray();
		const cos_ = Math.cos(angle),
			sin_ = Math.sin(angle);

		const x = point.x * cos_ - point.y * sin_;
		const y = point.x * sin_ + point.y * cos_;

		return [x, y, point.z];
		// const mf = [
		// 	[cos_, (sin_*-1) , 0],
		// 	[sin_, cos_, 0],
		// 	[0, 0, 1]
		// ];
	}
	static rotateY(point:Point, angle:number):[x:number,y:number,z:number]{
		const cos_ = Math.cos(angle),
			sin_ = Math.sin(angle);
		const x = point.x * cos_ - point.z * sin_;
		const z = point.z * cos_ + point.x * sin_;
		return [x, point.y, z];
	}

}
class Matrix3All{
    static PI:number = Math.PI / 180;
    static rotateX(shape:Shape,angle:number){
        shape.points.forEach((item:Point) => {
            const newPoint:[x:number,y:number,z:number]=Matrix3.rotateX(item, Matrix3All.PI * angle);
			item.setPoint(newPoint);
		});
    }
    static rotateY(shape:Shape,angle:number){
        shape.points.forEach((item:Point) => {
            const newPoint:[x:number,y:number,z:number]=Matrix3.rotateY(item, Matrix3All.PI * angle);
			item.setPoint(newPoint);
		});
    }
    static rotateZ(shape:Shape,angle:number){
        shape.points.forEach((item:Point) => {
            const newPoint:[x:number,y:number,z:number]=Matrix3.rotateZ(item, Matrix3All.PI * angle);
			item.setPoint(newPoint);
		});
    }
}

export default Matrix3All;
export {
    Matrix3
}