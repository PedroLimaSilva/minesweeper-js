/**
 * @returns true if the interval [a,b] contains v
 * @param {Number} v 
 * @param {Number} a 
 * @param {Number} b 
 */
export function between(v,a,b) {
    return (v>=a) && (v<=b);
};

export function isCorner(x,y, width, height){
    if(x>0 && x<width-1){
        return false;
    }
    if(y>0 && y<height-1){
        return false;
    }
    return true;
}