import Painter from "./painter";
import { Point, Shape } from "./base/shape";
import { Matrix3 } from "./matrix3";
import Vector from "./vector";

 class Material{
    A:Point = new Point(
		0,0);
    points:Array<Point>=[];
	_color:Array<number>;
	_color_key:number;
    opacity:number=1;
	constructor(points:Array<Point>) {
		this.points = points;
		const colorAndKey = Styles.RandomColor;
		this._color = colorAndKey.color;
		this._color_key = colorAndKey.key;

	}
	update(paint:Painter, position:Vector, shape:Shape):void{
		if (this.opacity <= .05) {
			return shape.disable();
		}
		this.opacity -= .004;
		this.draw(paint, position);
	}
	draw(paint:Painter, position:Vector) {
		//paint.fillRect(position.x,position.y,10,10)
		paint.beginPath();
		//if(!this._color)return;
		this._color[3] = this.opacity;
		/*判断上次颜色是否和这次一样*/
		paint.fillStyle = Styles.rgba(this._color);
		this.points.forEach((point:Point) => {
			const dp = Matrix3.transformTo2D(point, this.A, position);
			paint.lineTo(dp.x, dp.y);
		})
		paint.closePath();
		paint.fill();
	}
}



class Styles {
	static _colors:Array<Array<number>> = [
		[253, 101, 255],
		[163, 253, 130],
		[183, 128, 253],
		[89, 214, 255],
		[253, 186, 96],
		[251, 253, 113],
	];
	/**
	 * @param {Array<String|Array>} colors
	 * @description 自定义颜色转换
	 */
	static setColors(colors:Array<Array<number>|string>) {
		if (colors.length == 0) return;
		Styles._colors = [];
		colors.forEach((item:any) => {
			if (item instanceof Array) {
				Styles._colors.push(item)
			} else if (typeof(item) === 'string') {
				Styles._colors.push(ColorUtil.transformHexToRGB(item))
			}
		});
	}
	static get RandomColor() {
		const colors = Styles._colors;
		const ran = (Math.random() * colors.length) >> 0;
		const color = colors[ran];
		return {
			key: ran,
			color: [...color],
		};
	}
	static rgba(color:Array<number>) {
        const [r, g, b, a]=color;
		return `rgba(${r},${g},${b},${a})`;
	}
}

class ColorUtil {
	/**
	 * @param {Sting} hex
	 * @description 将十六进制转换成rgb数组形式
	 */
	static transformHexToRGB(hex) {
		const len = hex.length;
		let newHex = hex;
		/*不足六位补齐*/
		if (len < 6) {
			for (let i = 0; i < 6 - len; i++) {
				newHex += "0";
			}
		}
		const rgbArr = [];
		for (let i = 0; i <= 2; i++) {
			const hex_2 = newHex.substr(i * 2, 2);
			rgbArr[i] = parseInt(hex_2, 16);
		}
		return rgbArr;
	}
}

export {
	Styles,
}
export default Material;