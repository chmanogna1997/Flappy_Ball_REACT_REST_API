import { Fragment } from "react";

function Gamebox({height, width, children}){

    const boxstyle = {
        backgroundColor: "deepskyblue",
        height: height,
        width: width,
        position:'relative',
        // marginLeft: '70px',
        border: '3px solid dodgerblue',
      };

    return(
        <Fragment>
            <div style={boxstyle}>
                {children}
            </div>
        </Fragment>
    )
}

export default Gamebox;