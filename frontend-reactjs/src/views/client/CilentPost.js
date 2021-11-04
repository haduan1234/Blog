import React, { useCallback, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import Moment from 'react-moment';

import { BiLike } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";

import { InlineInputEdit } from 'react-inline-input-edit';

import { getPost_category } from "src/services/post_categoryServices";
import { getPostById, getPost } from "src/services/postService";
import ComponentIsHot from "src/components/client/componentClients/ComponentIsHot";
import { getUser } from "src/services/localStorageService";
import { createPost_like, getPost_like, deletePost_like } from "src/services/postLikeService";
import { number } from "prop-types";

import { useDispatch } from "react-redux";

import action from '../../reducer/action'

const CilentPosts = () => {
    const dispatch = useDispatch()

    const [postCategorys, setPostCategorys] = useState([])
    const [post, setPost] = useState()
    const [postFindCategoryIds, setPostFindCategoryIds] = useState([])
    const [like, setLike] = useState(false)
    const [post_like, setPost_like] = useState()
    const [user_like, setUser_like] = useState([])

    const { id } = useParams();

    const userLocal = getUser();

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
            if (!!id) {
                const res = await getPostById(id)
                if (!!res.data) {
                    setPost(res.data)
                    setPost_like(res.data.post_likes.length)
                    var postLikes = res.data.post_likes.filter((number) => {
                        return number.userId == userLocal?.id
                    })
                    if (postLikes.length > 0) {
                        setLike(true)
                        setUser_like([...postLikes])
                    }
                    const search = res.data.postCategoryId
                    const resPostFindCategoryId = await getPost(search)
                    if (!!resPostFindCategoryId.data) {
                        setPostFindCategoryIds([...resPostFindCategoryId.data.items])
                    }
                }
            }
        }
        catch (err) {
            alert(err)
        }
    }

    const fetchLike = useCallback(async () => {
        try {
            const body = {
                postId: post?.id,
                userId: userLocal?.id
            }
            if (!!user_like) {
                if (!like) {
                    setPost_like(post_like - 1)
                    // try{
                    //      await deletePost_like(userLocal.id)
                    // }
                    // catch(err){
                    //     alert(err)
                    // }

                }

                else {
                    if (!!like) {
                        await createPost_like(body)
                        const res = await getPostById(id)
                        if (!!res.data) {
                            setPost_like(res.data.post_likes.length)
                        }
                    }
                }
            }

        }
        catch (err) {
            alert(err)
        }

    }, [like])

    useEffect(() => {
        fetchGetPostCategory()
        fetchGetPostById()
    }, [id])

    useEffect(() => {
        fetchLike()
    }, [like])

    return (
        <div className="style_content">
            <div className="d-flex name_category ">
                {!!postCategorys && postCategorys.map((p, index) =>
                    <Link key={index} className="name-list-category" to={`/home/postCategory/${p.id}`}
                        onClick={() => {
                            dispatch(action.removeCart())
                            dispatch(action.addCategory(p.name))
                        }}
                    >
                        <div className={!!id && id == p.id ? "px- 2 categoryTrue" : "px-2"}
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
                                <button
                                    onClick={() => {
                                        setLike(!like)
                                    }}
                                    className="d-flex align-items-center mx-3 post-like-button ">
                                    {like ? <BsCheck /> : <BiLike />}

                                    <div className="px-2" >  like </div>
                                    <div >{post_like}</div>
                                </button>
                                <div className="mx-3">
                                    <Moment format="H:mm DD/MM/YYYY ">
                                        {new Date(post.created_at)}
                                    </Moment>
                                </div>
                            </div>

                            <div className="post-content-viwe px-3">
                                <div>
                                    <img src={"http://localhost:8888/" + post.avatar} width="667px" height="478pxs" />
                                </div>
                                <div
                                    dangerouslySetInnerHTML={{ __html: post.content }}>

                                </div>
                                <div className="post-like">
                                    <button
                                        onClick={() => {
                                            setLike(!like)
                                        }}
                                        className="d-flex align-items-center mx-3 post-like-button ">
                                        <BiLike />
                                        <div className="px-2" >  like </div>
                                        <div >{post_like}</div>

                                    </button>

                                    <div className="mx-3">
                                        <Moment format="H:mm DD/MM/YYYY ">
                                            {new Date(post.created_at)}
                                        </Moment>
                                    </div>
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
                            <div key={index}>
                                {
                                    !!id && p.id == id ?
                                        <div /> :
                                        <Link className="name-list-category" to={`/home/post/${p.id}`}
                                            onClick={() => {
                                                dispatch(action.removeCart())
                                                dispatch(action.addCategory(p.post_category.name))
                                            }}
                                        >
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