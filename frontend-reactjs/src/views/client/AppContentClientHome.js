import React, { useCallback, useEffect, useState } from "react"
import { getPost_category } from "src/services/post_categoryServices"
import { getIsHot } from "src/services/postService"
import { getPost } from "../../services/postService"
import { getfindInCategoryId } from "src/services/postService"
import { getPost_like } from "src/services/postLikeService"

import ComponentIsHot from "../../components/client/componentClients/ComponentIsHot"
import Especially from "../../components/client/componentClients/EspeciallyComponent"
import { number } from "prop-types"
import { Link } from "react-router-dom"

const AppContentClientHome = () => {
    const [postCategorys, setPostCategorys] = useState([])
    const [isHots, setIsHots] = useState([])
    const [hotEspeciallys, setHotEspeciallys] = useState()
    const [relatedNews, setRelatedNews] = useState([])
    const [postFindCategprys, setPostFindCategorys] = useState([])
    const [ postLikes, setPostLikes] = useState()

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

    const fetchGetIsHot = useCallback(async () => {
        try {

            const res = await getIsHot()

            if (!!res.data) {
                setIsHots([...res.data.hot.items])
                setHotEspeciallys(res.data.hotEspecially)
                const search = res.data.hotEspecially.postCategoryId
                const resFindCategory = await getPost(search)
                if (!!resFindCategory) {
                    setRelatedNews([...resFindCategory.data.items])
                }

            }
        }
        catch (err) {
            alert(err)
        }
    }, [hotEspeciallys])

    const fetchGetfindInCategoryId = async () => {
        try {
            const res = await getfindInCategoryId()
            if (!!res.data) {
                setPostFindCategorys([...res.data])
            }
        }
        catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        fetchGetPostCategory()
        fetchGetIsHot()
        fetchGetfindInCategoryId()
    }, [])
    return (
        <div className="style_content">
            <div className="d-flex name_category">
                {!!postCategorys && postCategorys.map((p, index) =>
                    <Link key={index} className="name-list-category" to={`/home/post/${p.id}`}>
                        <div className="px-2"
                        >
                            {p.name}
                        </div>
                    </Link>
                )}
            </div>
            <div className="content-center">
                <div className="d-flex justify-content-center pt-3 " >
                    <div className="style_div_content_hot">
                        {

                            !!hotEspeciallys ?
                                < Especially
                                    name={hotEspeciallys.name}
                                    image={hotEspeciallys.avatar}
                                    time={hotEspeciallys.created_at}
                                    width="660px"
                                    height="370px"
                                />
                                :
                                <div />

                        }
                        {
                            !!relatedNews && relatedNews.map((r, index) =>
                                <div key={index} className="my-2" style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}>
                                    <ComponentIsHot
                                        image={r.avatar}
                                        name={r.name}
                                        time={r.created_at}
                                    />
                                </div>
                            )
                        }
                    </div>
                    <div className="style_div_postHot">
                        {
                            !!isHots && isHots.map((isHot, index) =>
                                <div key={index}  className="style_div_post_hot">
                                    <ComponentIsHot
                                        name={isHot.name}
                                        image={isHot.avatar}
                                        time={isHot.created_at}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="mb-3">
                {
                    !!postFindCategprys && postFindCategprys.map((postFindCategory, index) =>
                        <div key={index}>
                            <h3
                                className="name-category-content"
                            >  * {postFindCategory.name}</h3>
                            <div className="d-flex component-content">
                                {

                                    !!postFindCategory.posts && postFindCategory.posts.filter((number) => {
                                        return number.isHot == true
                                    }).map((p, index) =>
                                        <div className="especially-pageHome">
                                            <Especially
                                                className="especially-pageHome"
                                                key={index}
                                                name={p.name}
                                                image={p.avatar}
                                                time={p.created_at}
                                                width="390px"
                                                height="245px"
                                            />
                                        </div>
                                    )

                                }
                                <div >
                                    {
                                        !!postFindCategory.posts && postFindCategory.posts.filter((number) => {
                                            return number.isHot == false
                                        }).map((p, index) =>
                                            <div key={index} className="component-ishot mx-3 mb-3">
                                                <ComponentIsHot
                                                    style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
                                                    name={p.name}
                                                    image={p.avatar}
                                                    time={p.created_at}
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default AppContentClientHome