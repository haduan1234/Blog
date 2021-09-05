import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CRow,
  CFormSelect
} from '@coreui/react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi';
registerLocale('vi', vi)
import { registerLocale, setDefaultLocale } from "react-datepicker";


import { createUser, deleteUser, getUserById, updateUser } from "../../../services/userService"

const Users = () => {
  const [blogger, setBlogger] = useState({
    name: "",
    birthDay: new Date(),
    address: "",
    gender: "",
    position: "user",
    age: 0,
    avata: ""
  })

  const submitData = async () => {
    try {
      await createUser({
        name: blogger.name,
        address: blogger.address,
        gender: blogger.gender,
        position: blogger.position,
        age: parseInt(blogger.age),
        avatar: blogger.avata,
        birthDay: blogger.birthDay.getTime()
      })
    }
    catch (error) {
      alert(error)
    }
  }
  return (
    <CForm className="row g-3 needs-validation">
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Create user </strong>
          </CCardHeader>
          <CCardBody>
            <CCol className="d-flex justify-content-start">
              <CCol className="d-flex flex-column p-2">
                <CFormLabel htmlFor="validationServer01">User name</CFormLabel>
                <CFormInput
                  type="text"
                  id="validationServer01"
                  placeholder="User name"
                  onChange={e => setBlogger({
                    ...blogger,
                    name: e.target.value
                  })}
                />
              </CCol>
              <CCol className="d-flex flex-column p-2">
                <CFormLabel htmlFor="validationServer01">Birth Day </CFormLabel>
                <DatePicker
                  dateFormat="dd/MM/yyyy "
                  // showTimeSelect 
                  // locale="vi" 
                  selected={blogger.birthDay}
                  onChange={(date) => setBlogger({
                    ...blogger,
                    birthDay: date

                  })} />
              </CCol>
            </CCol>
            <div className="d-flex justify-content-start">
              <CCol className="p-2" md={6}>
                <CFormLabel htmlFor="validationServer01"> Address</CFormLabel>
                <CFormInput

                  type="text"
                  id="validationServer01"
                  placeholder="Address"
                  onChange={e => setBlogger({
                    ...blogger,
                    address: e.target.value
                  })}
                />
              </CCol>
              <CRow className=" p-2  px-4 ">
                <CFormLabel htmlFor="validationServer01"> Gender</CFormLabel>
                <CFormCheck
                  className="col-auto"
                  type="radio"
                  name="flexRadioDisabled"
                  id="flexRadioDisabled"
                  value="Nam"
                  label="Nam"
                  defaultChecked
                  onChange={e => setBlogger({
                    ...blogger,
                    gender: e.target.value
                  })}
                />
                <CFormCheck
                  className="col-auto"
                  type="radio"
                  name="flexRadioDisabled"
                  id="flexRadioCheckedDisabled"
                  value="Nữ"
                  label="Nữ"
                  onChange={e => setBlogger({
                    ...blogger,
                    gender: e.target.value
                  })}
                />
              </CRow>
            </div>
            <CCol md={12} className="d-flex justify-content-start">
              <CCol className="d-flex flex-column p-2">
                <CFormLabel htmlFor="validationServer01">Position</CFormLabel>
                <CFormSelect
                  placeholder="Please choose position"
                  onChange={e => {
                    setBlogger({
                      ...blogger,
                      position: e.target.value
                    })
                  }}
                  aria-label="Default select example">
                  <option value="user">User</option>
                  <option value="blogger">Blogger</option>
                </CFormSelect>
              </CCol>
              <CCol className="d-flex flex-column p-2">
                <CFormLabel htmlFor="validationServer01">age </CFormLabel>
                <CFormInput
                  type="text"
                  id="validationServer01"
                  placeholder="age"
                  onChange={e => setBlogger({
                    ...blogger,
                    age: e.target.value
                  })}
                />
              </CCol>
            </CCol>
            <CRow className="px-2">
              <CFormLabel htmlFor="validationServer01">Avatar</CFormLabel>
              <div className="d-flex align-items-center">
                <div className=" col-2 "  >
                  <CFormInput
                    type="file"
                    id="validationTextarea"
                    aria-label="file example"
                    required
                    onChange={e => setBlogger({
                      ...blogger,
                      avata: e.target.value
                    })}
                  />
                </div>
                <img scr={blogger.avata} alt="avtar" className="px-3"></img>
              </div>
            </CRow>
            <CFormFeedback invalid>Example invalid form file feedback</CFormFeedback>
            <div className="px-2 py-3">
              <CButton color="primary"
                type="submit"
                onClick={submitData}
              >
                Save
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CForm>
  )
}

export default Users