import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom"
import Moment from 'react-moment';

import { BiLike } from "react-icons/bi";

import { InlineInputEdit } from 'react-inline-input-edit';

import { getPost_category } from "src/services/post_categoryServices";
import { getPostById } from "src/services/postService";

const CilentPosts = () => {

    const [postCategorys, setPostCategorys] = useState([])
    const [post, setPost] = useState()

    // const { id } = useParams()
    const id = "39c992f3-7b29-422a-b4b9-111f8e010315"

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

    const fetchGetPostById = async () => {
        try {
            const res = await getPostById(id)
            if (!!res.data) {
                setPost(res.data)
            }
        }
        catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        fetchGetPostCategory()
        fetchGetPostById()
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
                <div className="content-post-center m-3" style={{ backgroundColor: "white" }}>
                    {!!post ?
                        <div>
                            <h3>{post.name}</h3>
                            <div className="d-flex align-self-end px-3 ">
                                <img className="image-user-blog " src={"http://localhost:8888/" + post.user.avatar} />
                                <div className="-flex align-self-center px-3">{post.user.display_name} </div>
                            </div>
                            <div>
                                <button>
                                    <BiLike /> like
                                    <div>{post.post_likes.length}</div>

                                </button>

                                <div>
                                    <Moment format="H:mm DD/MM/YYYY ">
                                        {new Date(post.created_at)}
                                    </Moment>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <img src={"http://localhost:8888/" + post.avatar} />
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: post.content }}>
                                    
                                </div>
                            </div>
                        </div>

                        :
                        <div />
                    }

                </div>
            </div>
        </div>
    )
}

export default CilentPosts