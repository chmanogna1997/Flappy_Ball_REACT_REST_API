import { Fragment } from "react";

function Obstacle({top, height, width, left, position}){
    const obstacleStyle = {
        // position:'relative',
        position:position,
        top: top,
        backgroundColor: "sandybrown",
        height: height,
        width: width,
        left:left,
        borderRadius:5
        
      };

    return(
        <Fragment>
            <div style={obstacleStyle}></div>
        </Fragment>
    )
}

export default Obstacle;