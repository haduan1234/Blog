import React from "react";
import Moment from 'react-moment';

const Especially = ({image, name , width, height , time}) => {
    return (
        <div style={{
            backgroundColor: "white",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
        }}>
            <div>
                <img src={"http://localhost:8888/" + image} width={width} height={height} />
            </div>
            <div className="style_hot_name px-2">
                {name}
            </div>
            <div className="p-2" style={{fontSize:10}}>
            <Moment format="H:mm DD/MM/YYYY ">
                      {new Date(time)}
                    </Moment>
                    <div>{} </div>
            </div>
        </div>
    )
}

export default Especially