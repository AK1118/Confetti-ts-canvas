class Utils{
	static constructorIs(obj,constructorName){
		if((typeof obj)=='object'){
			return obj.constructor.name===constructorName;
		}
		return false;
	}
}
export default Utils;