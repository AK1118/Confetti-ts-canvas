# :zap:Confetti-ts-canvas
## canvas中奖庆祝礼花喷发/五彩纸屑/🎉/特效

### 请在运行Demo之前 npm i confetti-ts-canvas 安装该库

# 效果图

<img src="https://new.ivypha.com/static/uploads/2023/1/10//6707826f5e104ea34b7b3069e2d2ed28.gif"/>

 ![Github stars](https://img.shields.io/github/stars/AK1118/Confetti-js-canvas.svg) 如果有帮到您,给个小星星,我会把它做得更好。 <a>https://github.com/AK1118/Confetti-js-canvas/</a>

# 安装 

	npm i confetti-ts-canvas
	
#引入

	import {
		ConfettiEjector,
		CanvasRender,
		CustomShape
	} from 'confetti-ts-canvas';
	
#初始化

	const g=uni.createCanvasContext("myCanvas");
	const canvasRender=new CanvasRender();
	canvasRender.init(
			//必填 CanvasContext
			g,
			//可选填入
			{
				width:canvas.width,
				height:canvas.height,
			},
			//以下参数全部可选填入
			{
				onFinished(){
					console.log("完成")
				},
				displayFps:true,
				grivaty:.5,
			}
		);
		
# 使用 
	
	const pao = new ConfettiEjector(canvasRender, {
		limitAngle: [225, 315],//喷发角度区间[-∞,+∞]
		count: 100,//喷发纸片数量
	});
	const boom = pao.create({
		x: Math.random()*(this.canvasSize.width*.5),
		y:Math.random()*(this.canvasSize.height*.5),//喷发位置
		clampforce: [20, 60],//喷发力度
		radius: 10,//纸片大小
	});
	pao.fire(boom);
  
  
  
