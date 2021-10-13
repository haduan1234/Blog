import React, { useEffect, useState } from "react";
import {
    CAvatar,
} from '@coreui/react'

import { useParams } from "react-router-dom"
import { GiArchiveRegister } from "react-icons/gi";
import { BsPencilSquare } from "react-icons/bs";


import { getPost_category } from "src/services/post_categoryServices";
import { getPost } from "src/services/postService";
import { getUser } from "src/services/localStorageService";
import { getUserById  } from "src/services/userService";

import Especially from "src/components/client/componentClients/EspeciallyComponent";
import ComponentIsHot from "../../components/client/componentClients/ComponentIsHot"

import { Editor } from '@tinymce/tinymce-react';

const ClientPostCategory = () => {
    const [postCategorys, setPostCategorys] = useState([])
    const [posts, setPosts] = useState([])
    const [ user , setUser ]=  useState()

    // const { id } = useParams()
    const id = "58567756-d85c-4fb7-afc1-5177b387629e"

    const fetchGetPostCategory = async () => {
        try {
            const res = await getPost_category()
            if (!!res.data) {
                setPostCategorys([...res.data.items])

            }
        }
        catch (err) {
            alert(err)
        }
    }

    const fetchGetPost = async () => {
        try {
            const search = id
            const res = await getPost(search)
            console.log("data res :", res.data.items)
            if (!!res.data) {
                setPosts([...res.data.items])
            }
        }
        catch (err) {
            alert(err)
        }
    }

    const fetchGetUser = async() =>{
        try{
            const user =  getUser()
            const id = user.id

            const res =  await getUserById(id)
            if(!! res.data) {
                setUser(res.data)
            }
        }
        catch(err) {
            alert(err)
        }
    }



    useEffect(() => {
        fetchGetPostCategory()
        fetchGetUser()
        if (!!id) {
            fetchGetPost()
        }
    }, [])

    return (
        <div className="style_content">
            <div className="d-flex name_category ">
                {!!postCategorys && postCategorys.map((p, index) =>
                    <div key={index} className={!!id && id == p.id ? "px- 2 categoryTrue" : "px-2"}
                    >
                        {p.name}
                    </div>
                )}
            </div>
            <div className="content-post" >
                <div className="content-post-center m-3">
                    <div>
                        {!!posts && posts.filter((number) => {
                            return number.isHot == true;
                        }).map((p, index) =>
                            <div key={index} className="d-flex">
                                <div className="style_div_content_hot">
                                    <Especially
                                        name={p.name}
                                        image={p.avatar}
                                        time={p.created_at}
                                        width="660px"
                                        height="370px"
                                    />

                                </div>
                                <div className="information-blog">
                                    <div className="d-flex align-items-center p-3">
                                        <BsPencilSquare style={{
                                            fontSize: 25,
                                            color: "#009cd7",
                                            marginRight: 5
                                        }} />
                                        <h3 style={{ marginBottom: 1 }}>BLOG PHÓNG VIÊN </h3>
                                    </div>
                                    <div>
                                        {
                                            !!user ? 
                                            <div className="d-flex align-self-end px-3 ">
                                            <img className="image-user-blog " src={"http://localhost:8888/" + user.avatar} size="md" />
                                            <div className="-flex align-self-end px-3">{user.display_name} </div>
                                            </div>
                                            : <div />
                                        }

                                    </div>

                                </div>
                            </div>
                        )}

                    </div>
                    <div>
                        {
                            !!posts && posts.filter((number) => {
                                return number.isHot == false;
                            }).map((p, index) =>
                                <div key={index} className="my-2 style_div_content_hot" style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
                                    <ComponentIsHot
                                        image={p.avatar}
                                        name={p.name}
                                        time={p.created_at} />
                                </div>

                            )}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ClientPostCategory