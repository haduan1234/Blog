import react, { useCallback, useEffect, useState } from "react"
import { getPost_category } from "src/services/post_categoryServices"
import { getIsHot } from "src/services/postService"
import { getPost } from "../../../services/postService"

import ComponentIsHot from "../componentClients/ComponentIsHot"
import Especially from "../componentClients/EspeciallyComponent"

const AppContentClient = () => {
    const [postCategorys, setPostCategorys] = useState([])
    const [isHots, setIsHots] = useState([])
    const [hotEspeciallys, setHotEspeciallys] = useState()
    const [relatedNews, setRelatedNews] = useState([])


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

            console.log("data  post hot :", res.data.hotEspecially)
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

    useEffect(() => {
        fetchGetPostCategory()
        fetchGetIsHot()
    }, [])
    return (
        <div className="style_content">
            <div className="d-flex name_category">
                {!!postCategorys && postCategorys.map((p, index) =>
                    <div key={index} className="px-2"
                    >
                        {p.name}
                    </div>
                )}
            </div>
            <div className="d-flex justify-content-center pt-3 " style={{ backgroundColor: "#f7f7f7" }}>
                <div className="style_div_content_hot">
                    {

                        !!hotEspeciallys ?
                            < Especially
                                name={hotEspeciallys.name}
                                image={hotEspeciallys.avatar}
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

                                />
                            </div>
                        )
                    }



                </div>

                <div className="style_div_postHot">
                    {
                        !!isHots && isHots.map((isHot, index) =>
                        <div   className="style_div_post_hot">
                            <ComponentIsHot
                                key={index}
                                name={isHot.name}
                                image={isHot.avatar}
                              
                            />
                        </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default AppContentClient