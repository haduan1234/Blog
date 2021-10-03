import React, { useState } from "react"

import Logo from "../../assets/images/avatars/Logo.jpg"

import { GrSearch } from "react-icons/gr";
import { ImUser } from "react-icons/im";


const AppHeaderClient = () => {
    const [classSearch, setClassSearch] = useState(false)
    return (
        <div>
            <div className="header_cleint d-flex justify-content-between ">
                <div className="d-flex align-items-center px-2">
                    <img src={Logo} width=" 100px" height="70px" />
                    <h5 className="headerName_client">BÁO MỚI </h5>
                </div>
                <div>Name category </div>
                <div className="d-flex align-items-center px-3">
                    <div className={!!classSearch && classSearch == true ? 'style_divSearch_true' : 'style_divSearch_false'}>
                        <div className="Search_icon d-flex align-items-center"
                            onClick={() => {
                                { classSearch == false ? setClassSearch(true) : setClassSearch(false) }
                            }}
                        >
                            <p className="pt-3 mx-1">Tìm kiếm</p>
                            < GrSearch className="style_icon  " />
                        </div>
                    </div>
                    <div className="px-3" style={{ textAlign: "center" }}>
                        <ImUser className="icon_user" />
                        <p style={{
                            color: "white",
                            cursor: "pointer"
                        }}>Đăng nhập</p>

                    </div>
                </div>
            </div>
            <div className="content_input">
                {
                    !!classSearch && classSearch == true ?
                        <div className="py-2 px-3"> <input placeholder="Tìm kiếm"
                            type="text"
                            class="form-control" /></div>
                        :
                        <div />


                }
            </div>
        </div>
    )
}

export default AppHeaderClient