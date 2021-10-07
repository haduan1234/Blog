import React from "react";

const Especially = ({image, name}) => {
    return (
        <div style={{
            backgroundColor: "white",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
        }}>
            <div>
                <img src={"http://localhost:8888/" + image} width="660px" height="370px" />
            </div>
            <div className="style_hot_name px-2">
                {name}
            </div>
            <div className="p-2">Comment</div>
        </div>
    )
}

export default Especially