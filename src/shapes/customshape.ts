import { Point, Shape } from "../base/shape";
import Material from "../material";
import Vector from "../vector";

class CustomShape extends Shape {
    private _originPoints: Array<[x: number, y: number]> = [];
    public scale: number = 1;
    constructor(params: {
        points: Array<[x: number, y: number]>,
        scale?: number,
        position?: Vector,
        vector?: Vector,
    }) {
        super();
        this._originPoints = params.points;
        this.scale = params.scale || 1;
        this.createPosints(params.points);
        this.material = new Material(this.points);
        if (params.position) this.position = params.position;
        if (params.vector) this.vector = params.vector;
    }
    get originPoints() {
        return this._originPoints;
    }
    createPosints(points: Array<[x: number, y: number]> = []): void {
        const len = points.length;
        for (let i = 0; i < len; i++) {
            let [x, y] = points[i];
            if (this.scale != 1) {
                x *= this.scale;
                y *= this.scale;
            }
            this.points.push(new Point(x, y));
        }
    }
}


export default CustomShape;