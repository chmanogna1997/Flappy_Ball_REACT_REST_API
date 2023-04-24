const { Fragment } = require("react");

function Bird({size, top}){

    const birdstyle = {
        backgroundColor: "red",
        borderRadius: '50%',
        height: size,
        top: top,
        width: size,
        position: 'absolute',
        left:20
      };
    return(
        <Fragment>

            <div style={birdstyle}></div>

        </Fragment>
    )
}

export default Bird;