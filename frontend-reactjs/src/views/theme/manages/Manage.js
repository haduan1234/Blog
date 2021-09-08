import React, { useState, useEffect, useRef } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CFormInput,
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa"
import { useHistory, Link } from "react-router-dom"

import { getUsers, createUser, deleteUser, getUserById, updateUser } from "../../../services/userService"

import DeleteModal from '../../components/modals/DeleteModal'

const Manages = () => {
  const [visible, setVisible] = useState(false)
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState(undefined)
  const [id, setId] = useState(undefined)

  const [totalPages, setTotalPages] = useState(0)

  const history = useHistory()

  const [toast, addToast] = useState(0)
  const toaster = useRef()

  const fetchUsers = async (search = undefined) => {
    try {
      let res = await getUsers(search)
      if (!!res.data) {
        setUsers([...res.data.items])
        setTotalPages(res.data?.totalPages)
      }
    }
    catch (error) {
      alert(error)
    }
  }

  const fetchDelete = async () => {
    try {
      await deleteUser(id)
      setVisible(false)
      addToast(exampleToast)
      fetchUsers()
    }
    catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const onSearchEnter = (e) => {
    if (e.key == 'Enter') {
      fetchUsers(search)
    }
  }

  const handlePageChange = (pageNumber) => {
    this.setState({activePage: pageNumber});
  }


  const exampleToast = (
    <CToast title="CoreUI for React.js" delay={2000}>
      <CToastHeader close>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <strong className="me-auto">CoreUI for React.js</strong>
        <small>7 min ago</small>
      </CToastHeader>
      <CToastBody>You already delete successfully .</CToastBody>
    </CToast>
  )

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
          <strong>Manages</strong>
        </CCardHeader>
        <div className="d-flex justify-content-between " xd={12}>
          <Link to="/admin/users" class=" mx-3 my-2 col-auto">
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
            class="col-6 my-2 mx-3 border border-light px-2 rounded "
            type="text"
            id="validationServer01"
            placeholder="Search"
            onKeyDown={onSearchEnter}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <CCardBody xs={12} style={{ fontSize: 15 }}>
          <CTable class="table table-success table-striped table table-hover">
            <CTableHead >
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {!!users && users.map((user, index) =>
                <CTableRow key={index}>
                  <CTableHeaderCell scope="row">{index + 1}  </CTableHeaderCell>
                  <CTableDataCell>{user.display_name} </CTableDataCell>
                  <CTableDataCell>{user.email} </CTableDataCell>
                  <CTableDataCell>{user.gender} </CTableDataCell>
                  <CTableDataCell >
                    <CButton onClick={() => {
                      setId(user.id),
                        setVisible(!visible)
                    }}
                      class="border border-none"
                      style={{
                        color: 'red',
                      }}
                    >
                      < FaTrashAlt />
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <Link to={`/admin/users/${user.id}`} class=" mx-3 my-2 col-auto">
                      <FaPencilAlt />
                    </Link>
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
          <CPagination aria-label="Page navigation example" className="d-flex justify-content-end">
            <CPaginationItem aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
            {
              totalPages.map((page, index) => 
                <CPaginationItem key={index}>1</CPaginationItem>
              )
            }
            <CPaginationItem aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </CPagination>
        </CCardBody>
      </CCard>
    </CCol>

  )
}

export default Manages