/**
 * @returns true if the interval [a,b] contains v
 * @param {Number} v 
 * @param {Number} a 
 * @param {Number} b 
 */
export function between(v,a,b) {
    return (v>=a) && (v<=b);
};

export function noCorners(x,y, width, height){
    if(x>0 && x<width-1){
        return true;
    }
    if(y>0 && y<height-1){
        return true;
    }
    return false;
}