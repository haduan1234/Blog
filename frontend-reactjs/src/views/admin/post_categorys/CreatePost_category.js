import React, { useState, useEffect, useCallback } from 'react'
import {
    CButton,
    CCard,
    CCardHeader,
    CForm,
    CFormInput,
    CCol,
    CCardBody,
    CFormLabel
} from '@coreui/react'

import { useParams } from "react-router-dom"

import { useHistory, Link } from "react-router-dom"

import { createPost_category, updatePost_category, getPost_categoryById } from '../../../services/post_categoryServices'

const CreatePost_category = () => {
    const [post_category, setPost_category] = useState({
        name: ""
    })

    const { id } = useParams() 
    const history = useHistory()   

    const save = async () => {
        const body ={
            ...post_category
        }
        try {
            if (!!id) {
                await updatePost_category(id, body)

            } else {
                await createPost_category(body)
            }
            history.push('/admin/post_categorys')
        }
        catch (err) {
            alert(err)
        }
    }

    const fetchGetPost_categoryById = useCallback(async () => {
        try {
            const res = await getPost_categoryById(id)
            if (!!res && res.data) {
                setPost_category({
                    name: res.data.name
                })
            }
        }
        catch (err) {
            alert(err)
        }
    }, [id])

    useEffect(() => {
        if (!!id) {
            fetchGetPost_categoryById()
        }
    },[id])

    return (
        <CForm>
            <CCol>
                <CCard>
                    <CCardHeader>
                        <strong>Create Post_category</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CCol className="col-4">
                            <CFormLabel htmlFor="validationServer01">Name</CFormLabel>
                            <CFormInput
                                type="text"
                                id="namePost_category"
                                placeholder="name"
                                value={post_category.name}
                                onChange={e => setPost_category({
                                    ...post_category,
                                    name: e.target.value
                                })}

                            />
                        </CCol>
                        <CButton color="primary"
                            className="my-3"
                            type="submit"
                            onClick={save}
                        >
                            Seve
                        </CButton>
                    </CCardBody>
                </CCard>
            </CCol>
        </CForm>
    )
}

export default CreatePost_category