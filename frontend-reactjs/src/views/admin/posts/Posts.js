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

} from '@coreui/react'

import { useHistory, Link } from "react-router-dom"

import { FaTrashAlt, FaPencilAlt } from "react-icons/fa"

import DeleteModal from '../../components/modals/DeleteModal'
import ExampleToast from '../../components/modals/toasts/Toasts'
import Page from '../../components/paginations/Pagination'

import { getPost, deletePost } from 'src/services/postService'
import { getUser } from 'src/services/localStorageService'

const Posts = () => {

    const [posts, setPosts] = useState([])
    const [id, setId] = useState(undefined)
    const [visible, setVisible] = useState(false)
    const [currentpage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(undefined)
    const [search, setSearch] = useState(undefined)

    const sizePage = 5

    const [toast, addToast] = useState(false)
    const toaster = useRef()

    const history = useHistory()

    const createPost = () => {
        try {
            let checklocalStorage = getUser();
            console.log("data: ", checklocalStorage)
            if (!checklocalStorage) {
                history.push("/login")
            } else {
                history.push("/admin/createPost")
            }

        }
        catch (err) {
            alert(err)
        }
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

    const onSearchEnter = (e) => {
        if (e.key == 'Enter') {
            fetchGetPost(search)
        }
    }

    const setLocale = () => {
        let localStorage = getUser()
        if (!localStorage) {
            history.push('/login')
        }
        else {
            history.push('/admin/posts')
        }
    }
    useEffect(() => {
        setLocale()
    }, [])

    useEffect(() => {
        fetchGetPost()
    }, [currentpage])

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
                    <CFormInput
                        className="mt-2 mx-3 border border-light px-2 rounded col-4 search_input"
                        type="text"
                        // id="validationServer01"
                        placeholder="Search"
                        onKeyDown={onSearchEnter}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <CCardBody xs={12} style={{ fontSize: 15 }}>
                    <CTable className="table" >
                        <CTableHead >
                            <CTableRow>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Post category</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {!!posts && posts.map((p, index) =>
                                <CTableRow key={index} className="p-4">
                                    <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                                    <CTableHeaderCell>{p.name}</CTableHeaderCell>
                                    <CTableHeaderCell>{p.post_category.name}</CTableHeaderCell>
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