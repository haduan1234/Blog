import React from "react"
import Moment from 'react-moment';

const ComponentIsHot = ({ name, image , time}) => {
    return (
        <div className="d-flex" style={{backgroundColor:"white"}}>
            <div >
                <img src={"http://localhost:8888/" + image} width="150px" height="100px" />
            </div>
            <div className="d-flex align-items-start flex-column bd-highlight">
            <div className=" px-2 mb-auto bd-highlight">
                {name}
            </div>
            <div className="p-2 " style={{fontSize: 10}}> 
            <Moment format="H:mm DD/MM/YYYY ">
                      {new Date(time)}
                    </Moment>
                    <div>{} </div>
            </div>
            </div>
        </div>
    )
}

export default ComponentIsHot