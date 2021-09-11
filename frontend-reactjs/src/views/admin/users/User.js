import React, { useState, useEffect, useRef, useCallback } from 'react'
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
  CToaster,

} from '@coreui/react'
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa"
import { useHistory, Link } from "react-router-dom"
import Moment from 'react-moment';

import { getUsers, createUser, deleteUser, getUserById, updateUser } from "../../../services/userService"

import DeleteModal from '../../components/modals/DeleteModal'
import ExampleToast from '../../components/modals/toasts/Toasts'
import Page from 'src/views/components/modals/pages/Page'

const Users = () => {
  const [visible, setVisible] = useState(false)
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState(undefined)
  const [id, setId] = useState(undefined)
  const [totalPage, setTotalPage] = useState(undefined)
  const [currentpage, setCurrentPage] = useState(1)
  const sizePage = 5

  const history = useHistory()

  const [toast, addToast] = useState(false)
  const toaster = useRef()

  const fetchUsers = useCallback(async (search = undefined) => {
    try {
      let res = await getUsers(search, currentpage, sizePage)
      if (!!res.data) {
        setTotalPage(res.data.totalPages)
        setUsers([...res.data.items])
      }

    }
    catch (error) {
      alert(error)
    }
  }, [search, currentpage])

  const fetchDelete = async () => {
    try {
      await deleteUser(id)
      setVisible(false)
      addToast(
        <ExampleToast
          title="Delete user"
          delay={2000}
          nameToast="Delete user"
          time="closes in 7 seconds"
          body="Delete successfuly"
        />)
      fetchUsers()
    }
    catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [currentpage])

  const onSearchEnter = (e) => {
    if (e.key == 'Enter') {
      fetchUsers(search)
    }
  }

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
          <Link to="/admin/createUser" class=" mx-3 my-2 col-auto">
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
          <CTable class="table ">
            <CTableHead >
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Birthday</CTableHeaderCell>
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
                  <CTableDataCell>
                    <Moment format="DD/MM/YYYY">
                      {new Date(user.birthday)}
                    </Moment>
                  </CTableDataCell>
                  <CTableDataCell>{user.gender} </CTableDataCell>
                  <CTableDataCell >
                    <CButton onClick={() => {
                      setId(user.id),
                        setVisible(!visible)
                    }}
                      style={{
                        color: 'red',
                        backgroundColor:"white",
                        border:'none'
                      }}
                    >
                      < FaTrashAlt />
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <Link to={`/admin/createUser/${user.id}`} class=" mx-3 my-2 col-auto">
                      <FaPencilAlt />
                    </Link>
                  </CTableDataCell>
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

export default Users