class Size{
    width:number=0;
    height:number=0;
    constructor(width:number,height:number){
        this.width=width;
        this.height=height;
    }
    toJson():{width:number,height:number}{
        return {
            width:this.width,
            height:this.height,
        }
    }
    toArray():Array<number>{
        return [this.width,this.height];
    }
}

export default Size;