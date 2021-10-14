import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import Moment from 'react-moment';

import { BiLike } from "react-icons/bi";

import { InlineInputEdit } from 'react-inline-input-edit';

import { getPost_category } from "src/services/post_categoryServices";
import { getPostById, getPost } from "src/services/postService";
import ComponentIsHot from "src/components/client/componentClients/ComponentIsHot";

const CilentPosts = () => {

    const [postCategorys, setPostCategorys] = useState([])
    const [post, setPost] = useState()
    const [postFindCategoryIds, setPostFindCategoryIds] = useState([])

    const { id } = useParams()

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
                console.log("data post", res.data)
                const search = res.data.postCategoryId
                const resPostFindCategoryId = await getPost(search)
                if (!!resPostFindCategoryId.data) {
                    setPostFindCategoryIds([...resPostFindCategoryId.data.items])
                }
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
                   <Link className="name-list-category"  to={`/home/postCategory/${p.id}`}>
                    <div key={index} className={!!id && id == p.id ? "px- 2 categoryTrue" : "px-2"}
                    >
                        {p.name}
                    </div>
                    </Link>
                )}
            </div>
            <div className="content-post" >
                <div className="content-post-center m-3" style={{ backgroundColor: "white" }}>
                    {!!post ?
                        <div>
                            <h3 className="p-3">{post.name}</h3>
                            <div className="d-flex align-self-end px-3 ">
                                <img className="image-user-blog " src={"http://localhost:8888/" + post.user.avatar} />
                                <div className=" px-3">
                                    <h5 >{post.user.display_name} </h5>
                                    <div> {post.user.email} </div>
                                </div>
                            </div>
                            <div className="post-like">
                                <button className="d-flex align-items-center mx-3 post-like-button ">
                                    <BiLike />
                                    <div className="px-2" >  like </div>
                                    <div >{post.post_likes.length}</div>

                                </button>

                                <div className="mx-3">
                                    <Moment format="H:mm DD/MM/YYYY ">
                                        {new Date(post.created_at)}
                                    </Moment>
                                </div>
                            </div>

                            <div>
                                <div>
                                    <img src={"http://localhost:8888/" + post.avatar} width="667px" height="478pxs" />
                                </div>
                                <div
                                    className="post-content-viwe px-3"
                                    dangerouslySetInnerHTML={{ __html: post.content }}>

                                </div>
                            </div>
                        </div>
                        :
                        <div />
                    }
                    <div className="Read-more px-3">
                        <h4>ĐỌC THÊM</h4>
                    </div>
                    <div className="p-3">
                        {!!postFindCategoryIds && postFindCategoryIds.map((p, index) =>
                            <div>
                                {
                                    p.id == id ?
                                        <div /> :
                                        <Link className="name-list-category"  to={`/home/post/${p.id}`}>
                                        < ComponentIsHot
                                            image={p.avatar}
                                            name={p.name}
                                            width="390px"
                                            height="245px"
                                            time={p.created_at}
                                        />
                                        </Link>
                                }

                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CilentPosts