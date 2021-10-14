import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CTable,
    CTableBody,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CFormInput,
    CToaster,
    CFormSelect

} from '@coreui/react'

import { useHistory, Link } from "react-router-dom"

import { FaTrashAlt, FaPencilAlt } from "react-icons/fa"
import { BsCheck, BsX } from "react-icons/bs"

import DeleteModal from '../../components/modals/DeleteModal'
import ExampleToast from '../../components/modals/toasts/Toasts'
import Page from '../../components/paginations/Pagination'

import { getPost, deletePost } from 'src/services/postService'

import { getPost_category } from 'src/services/post_categoryServices'

const Posts = () => {

    const [posts, setPosts] = useState([])
    const [id, setId] = useState(undefined)
    const [visible, setVisible] = useState(false)
    const [currentpage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(undefined)
    const [search, setSearch] = useState(undefined)
    const [ postCategorys, setPostCategorys ] = useState([])

    const sizePage = 5

    const [toast, addToast] = useState(false)
    const toaster = useRef()

    const history = useHistory()

    const createPost = () => {
        history.push("/admin/createPost")
    }

    const fetchGetPost = useCallback(async () => {
        try {
            let res = await getPost(search, currentpage, sizePage)
            if (!!res.data) {
                setPosts([...res.data.items])
                setTotalPage(res.data.totalPages)
            }
        }
        catch (err) {
            alert(err)
        }
    }, [search, currentpage])

    const fetchDelete = async () => {
        try {
            if (!!id) {
                await deletePost(id)
                setVisible(false)
                addToast(
                    <ExampleToast
                        title="Delete user"
                        delay={2000}
                        nameToast="Delete user"
                        time="closes in 7 seconds"
                        body="Delete successfuly"
                    />)
                fetchGetPost()
            }
        }
        catch (err) {
            alert(err)
        }
    }

    const fetchPostCategory = async () => {
        try {
            const res = await getPost_category()
            if (!!res.data) {
                setSearch(res.data.items[0].id)
                setPostCategorys([ ...res.data.items])
            }

        }
        catch (err) {
            alert(err)
        }
    }

    const onSearchEnter = (e) => {
        if (e.key == 'Enter') {
            fetchGetPost(search)
        }
    }

    useEffect(() => {
        fetchGetPost()
    }, [currentpage, search])

    useEffect(() => {
        fetchPostCategory()
    }, [])

    return (
        <CCol>
            <CToaster ref={toaster} push={toast} placement="top-end" />
            <DeleteModal
                subTitle="Are you sure you want to delete this account ?"
                title="Delete User"
                visible={visible}
                setVisible={setVisible}
                onDelete={fetchDelete}
            />

            <CCard className="m-1">
                <CCardHeader>
                    <strong>Posts</strong>
                </CCardHeader>
                <div className="d-flex justify-content-between " md={12} >
                    <button type="button"
                        className="btn btn-success  mx-3 mt-2 col-auto"
                        style={{
                            color: 'white ',
                        }}
                        onClick={createPost}
                    >
                        Create
                    </button>
                    <div className="d-flex justify-content-between">
                        <CFormSelect
                            className="mt-2"
                            placeholder="Please choose position "
                            onChange={e => {
                              setSearch(e.target.value)
                            }}
                            aria-label="Default select example">
                            {!!postCategorys && postCategorys.map((p, index) =>
                                <option  key={index} value={p.id}>{p.name}</option>
                            )}
                        </CFormSelect>
                        <CFormInput
                            className="mt-2 mx-3 border border-light px-2 rounded col-4 search_input"
                            type="text"
                            // id="validationServer01"
                            placeholder="Search"
                            onKeyDown={onSearchEnter}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <CCardBody xs={12} style={{ fontSize: 15 }}>
                    <CTable className="table" >
                        <CTableHead >
                            <CTableRow>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Post category</CTableHeaderCell>
                                <CTableHeaderCell scope="col" className="isHot">Post especially</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {console.log("data podt :", posts[0])}
                            {!!posts && posts.map((p, index) =>
                                <CTableRow key={index} className="p-4">
                                    <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                                    <CTableHeaderCell>{p.name}</CTableHeaderCell>
                                    <CTableHeaderCell>{p.post_category.name} </CTableHeaderCell>
                                    <CTableHeaderCell className="isHot">
                                        {p.isHot ? <BsCheck /> : <BsX />}
                                    </CTableHeaderCell>
                                    <CTableHeaderCell>
                                        <Link to={`/admin/createPost/${p.id}`} >
                                            <FaPencilAlt className="d-flex align-items-center mt-1" />
                                        </Link>
                                    </CTableHeaderCell>
                                    <CTableHeaderCell>
                                        <button onClick={() => {
                                            setId(p.id)
                                            setVisible(!visible)
                                        }}
                                            className="d-flex align-items-center mt-1"
                                            style={{
                                                color: 'red',
                                                backgroundColor: "white",
                                                border: 'none'
                                            }}
                                        >
                                            < FaTrashAlt />
                                        </button>
                                    </CTableHeaderCell>
                                </CTableRow>
                            )}
                        </CTableBody>
                    </CTable>
                    {
                        <Page
                            totalPage={totalPage}
                            setCurrentPage={setCurrentPage}
                            currentpage={currentpage}
                        />
                    }
                </CCardBody>
            </CCard>

        </CCol>
    )
}

export default Posts