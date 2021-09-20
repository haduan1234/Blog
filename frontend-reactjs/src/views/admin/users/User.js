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
  CFormInput,
  CToaster,

} from '@coreui/react'
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa"
import { IoWoman, IoManSharp } from "react-icons/io5"
import { useHistory, Link } from "react-router-dom"
import Moment from 'react-moment';

import { getUsers, createUser, deleteUser, getUserById, updateUser } from "../../../services/userService"

import DeleteModal from '../../components/modals/DeleteModal'
import ExampleToast from '../../components/modals/toasts/Toasts'
import Page from 'src/views/components/paginations/Pagination'

const Users = () => {
  const [visible, setVisible] = useState(false)
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState(undefined)
  const [id, setId] = useState(undefined)
  const [totalPage, setTotalPage] = useState(undefined)
  const [currentpage, setCurrentPage] = useState(1)
  const sizePage = 5
  let genderdefault = "Nam"

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
          <strong>Users</strong>
        </CCardHeader>
        <div className="d-flex justify-content-between " xd={12}>
          <Link to="/admin/createUser" className=" mx-3 mt-2 col-auto">
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
            className="col-6 mt-2 mx-3 border border-light px-2 rounded "
            type="text"
            id="validationServer01"
            placeholder="Search"
            onKeyDown={onSearchEnter}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <CCardBody xs={12} style={{ fontSize: 15 }}>
          <CTable className="table ">
            <CTableHead >
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Avartar</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Birthday</CTableHeaderCell>
                <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                <CTableHeaderCell scope="col">Position</CTableHeaderCell>
                <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {!!users && users.map((user, index) =>
                <CTableRow key={index} className="p-4">
                  <CTableHeaderCell scope="row">{index + 1}  </CTableHeaderCell>
                  <CTableHeaderCell scope="row">
                    <img src={"http://localhost:8888/" + user.avatar} alt='preview' width="40px" height="40px" style={{
                      borderRadius: 100,
                      border: '1px solid #0000001f'
                    }}
                    />
                  </CTableHeaderCell>
                  <CTableDataCell>{user.display_name} </CTableDataCell>
                  <CTableDataCell>{user.email} </CTableDataCell>
                  <CTableDataCell>
                    <Moment format="DD/MM/YYYY">
                      {new Date(user.birthday)}
                    </Moment>
                  </CTableDataCell>
                  <CTableDataCell >
                    {!!user.gender && user.gender.toLowerCase() == genderdefault.toLowerCase() ? (
                      <IoManSharp />
                    ) : (
                      <IoWoman />
                    )}
                  </CTableDataCell>
                  <CTableDataCell>{user.Role.name} </CTableDataCell>
                  <CTableDataCell >
                    <button onClick={() => {
                      setId(user.id),
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
                  </CTableDataCell>
                  <CTableDataCell >
                    <Link to={`/admin/createUser/${user.id}`} >
                      <FaPencilAlt className="d-flex align-items-center mt-1" />
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