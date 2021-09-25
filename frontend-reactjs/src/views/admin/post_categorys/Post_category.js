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
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa"
import { IoWoman, IoManSharp } from "react-icons/io5"
import { useHistory, Link } from "react-router-dom"
import Moment from 'react-moment';

import { getPost_category, deletePost_category } from '../../../services/post_categoryServices'

import DeleteModal from '../../components/modals/DeleteModal'
import ExampleToast from '../../components/modals/toasts/Toasts'
import Page from '../../components/paginations/Pagination'

import Auth from 'src/views/middlewares/auth'
import { getUser } from 'src/services/localStorageService'


const Post_categorys = () => {
    const [search, setSearch] = useState(undefined)
    const [totalPage, setTotalPage] = useState(undefined)
    const [currentpage, setCurrentPage] = useState(1)
    const [id, setId] = useState(undefined)
    const [visible, setVisible] = useState(false)
    const [post_categorys, setPost_categorys] = useState([])

    const sizePage = 5
    const history = useHistory()


    const [toast, addToast] = useState(false)
    const toaster = useRef()

    const fetchGetPost_category = useCallback(async (search = undefined) => {
        try {
            let res = await getPost_category(search, currentpage, sizePage)
            if (!!res.data) {
                setTotalPage(res.data.totalPages)
                setPost_categorys([...res.data.items])
            }

        }
        catch (err) {
            alert(err)
        }
    }, [search, currentpage])

    const fetchDelete = async () => {
        try {
            await deletePost_category(id)
            setVisible(false)
            addToast(
                <ExampleToast
                    title="Delete user"
                    delay={2000}
                    nameToast="Delete user"
                    time="closes in 7 seconds"
                    body="Delete successfuly"
                />)
            fetchGetPost_category()
        }
        catch (error) {
            alert(error)
        }
    }

    const onSearchEnter = (e) => {
        if (e.key == 'Enter') {
            fetchGetPost(search)
        }
    }

    useEffect(() => {
        fetchGetPost_category()
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
                    <strong>Post categorys</strong>
                </CCardHeader>
                <div className="d-flex justify-content-between " xd={12}>
                    <Link to="/admin/createPost_category" className=" mx-3 mt-2 col-auto">
                        <button type="button"
                            className="btn btn-success"
                            style={{
                                color: 'white ',
                            }}
                        >
                            Create
                        </button>
                    </Link>
                    <CFormInput
                        className="col-6 mt-2 mx-3 border border-light px-2 rounded search_input"
                        type="text"
                        id="validationServer01"
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
                                <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {!!post_categorys && post_categorys.map((p, index) =>
                                <CTableRow key={index} className="p-4">
                                    <CTableHeaderCell>{index + 1}</CTableHeaderCell>
                                    <CTableHeaderCell>{p.name}</CTableHeaderCell>
                                    <CTableHeaderCell>
                                        <Link to={`/admin/createPost_category/${p.id}`} >
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

export default Post_categorys