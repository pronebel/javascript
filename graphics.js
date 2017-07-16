/**
 * Created by ZWX on 2017/6/7.
 */
/************************************** 图形绘制库 **********************************************/

/**********************************  基本图形  ***********************************/
//五角星
/**
 * cxt:context上下文绘制环境
 * x,y:五角星中心位置
 * R:外层顶点所在圆的半径
 * r:内层顶点所在圆的半径
 * rot:按顺时针旋转的角度
 * center:内部填充的颜色
 * outer:边框颜色
 * w:边框线的宽度
 */
function drawStar(cxt,x,y,R,r,rot,center,outer,w) {
    rot = rot?rot:0;
    cxt.fillStyle = center?center:"white";
    cxt.strokeStyle = outer?outer:"black";
    cxt.lineWidth = w?w:5;
    cxt.beginPath();
    for(var i=0;i<5;i++){
        cxt.lineTo(x+Math.cos((18+i*72-rot)/180*Math.PI)*R,y-Math.sin((18+i*72-rot)/180*Math.PI)*R);
        cxt.lineTo(x+Math.cos((54+i*72-rot)/180*Math.PI)*r,y-Math.sin((54+i*72-rot)/180*Math.PI)*r);
    }
    cxt.closePath();
    cxt.fill();
    cxt.stroke();
}


