import React, { useState } from 'react'
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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormInput,
} from '@coreui/react'

import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";


import avatar1 from '../manages/avatar/anh.jpg'
import avatar2 from './../../../assets/images/avatars/1.jpg'
import Delete from './delete/delete';
import { Link } from 'react-router-dom';
import { red } from '@material-ui/core/colors';


const Manages = () => {
  const [visible, setVisible] = useState(false)
  return (
    <CCol>
      <CCard className="m-1">
        <CCardHeader>
          <strong>Manages</strong>
        </CCardHeader>
        <div className="d-flex justify-content-between " xd={12}>
          <button type="button"
            class="btn btn-success mx-3 my-2 col-1"
            style={{
              color:'white  '
            }}
          >
            Create
          </button>
          <CFormInput
          class="col-6 my-2 mx-3 border border-light px-2 rounded "
            type="text"
            id="validationServer01"
            placeholder="Search"
          />
        </div>
        <CCardBody  xs={12} style={{fontSize: 10}}>
          <img src={avatar2} alt="anh " style={{
            width: 30,
            height: 30
          }} />
          <CTable class="table table-success table-striped table table-hover">
            <CTableHead >
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Age</CTableHeaderCell>
                <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                <CTableHeaderCell scope="col">Avatar</CTableHeaderCell>
                <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
                <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell scope="row">1</CTableHeaderCell>
                <CTableDataCell>Ha Duan</CTableDataCell>
                <CTableDataCell>23</CTableDataCell>
                <CTableDataCell>Phu Tho</CTableDataCell>
                <CTableDataCell>Nam</CTableDataCell>
                <CTableDataCell>
                  <img scr={avatar2} alt="avata" style={{
                    width: 30,
                    height: 30
                  }} />

                </CTableDataCell >
                <CTableDataCell >
                  <CButton onClick={() => setVisible(!visible)}
                  class="border border-none"
                  style={{
                  color:'red',
                
                }}
                  >
                    < FaTrashAlt />
                  </CButton>
                  <CModal visible={visible} onDismiss={() => setVisible(false)}>
                    <CModalHeader onDismiss={() => setVisible(false)}>
                      <CModalTitle>Delete User</CModalTitle>
                    </CModalHeader>
                    <CModalBody>Are you sure you want to delete this account ?</CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                      </CButton>
                      <CButton className="bg-danger border border-none">Dlete</CButton>
                    </CModalFooter>
                  </CModal>
                </CTableDataCell>
                <CTableDataCell>
                  <FaPencilAlt />
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>

  )
}

export default Manages