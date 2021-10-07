import React from "react"

const ComponentIsHot = ({ name, image }) => {
    return (
        <div className="d-flex" style={{backgroundColor:"white"}}>
            <div >
                <img src={"http://localhost:8888/" + image} width="150px" height="100px" />
            </div>
            <div className="px-3">
                <div>{name}</div>
                <div>Comment</div>
            </div>
        </div>
    )
}

export default ComponentIsHot