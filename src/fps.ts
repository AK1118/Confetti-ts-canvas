class FpsUtil {
    private sampleSize:number= 60;
    private value:number= 0;
    private _sample_:Array<number>=[];
    private _index_:number= 0;
    private _lastTick_:number= 0;
    public tick() {
        let _Date:any=Date;
        if(typeof(performance)!="undefined")_Date=performance;
        // if is first tick, just set tick timestamp and return
        if (!this._lastTick_) {
            this._lastTick_ = _Date.now();
            return 0;
        }
        // calculate necessary values to obtain current tick FPS
        let now = _Date.now();
        let delta = (now - this._lastTick_) * 0.001;
        let fps = 1 / delta;
        // add to fps samples, current tick fps value 
        this._sample_[this._index_] = fps >> 0;

        // iterate samples to obtain the average
        let average = 0;
        for (let i = 0; i < this._sample_.length; i++) average += this._sample_[i];

        average = Math.round(average / this._sample_.length);

        // set new FPS
        this.value = average;
        // store current timestamp
        this._lastTick_ = now;
        // increase sample index counter, and reset it
        // to 0 if exceded maximum sampleSize limit
        this._index_++;
        if (this._index_ === this.sampleSize) this._index_ = 0;
        return this.value;
    }
};

export default FpsUtil;