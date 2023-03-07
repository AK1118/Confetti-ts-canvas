import { Shape } from "./base/shape";
import ConfettiEjector from "./confettiEjector";
import CanvasRender, { CanvasSize } from "./renderer";
import CustomShape from "./shapes/customshape";
import Polygon from "./shapes/polygon";


export {
    CanvasSize,
    ConfettiEjector,
    Polygon,
    CanvasRender,
    CustomShape
}

const canvas: HTMLCanvasElement = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const g: CanvasRenderingContext2D = canvas.getContext("2d");
const img: HTMLImageElement = document.querySelector("#dog");


const render: CanvasRender = new CanvasRender();
render.init(g, {
    width: canvas.width,
    height: canvas.height,
}, {

});

const customShape: CustomShape = new CustomShape({
    points: [[-100, -100],
    [20, -20],
    [100, 100],
    [-20, 20],],
    scale: .1,
});

const pao = new ConfettiEjector(render, { count: 60, limitAngle: [225, 310], shapeTypes: [customShape, 3] });


window.addEventListener('click', (e) => {
    const boom: Promise<Array<Shape>> = pao.create({ x: 0, y: 0, radius: 10, clampforce: [30, 60] });
    pao.fire(boom);
});