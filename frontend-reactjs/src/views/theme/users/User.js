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
  const [user, setUser] = useState({
    display_name: "",
    birthday: new Date(),
    email: "",
    phone: "",
    gender: "",
    address: "",
    // position: "user",
    avata: "",
    password: ""
  })

  const submitData = async () => {
    try {
      await createUser({
        display_name: user. display_name  ,
        email: user.email,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
        // position: user.position,
        avatar: user.avata,
        birthday: user.birthday.getTime(),
        password: user.password
      })
      console.log("data:", user)
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
                <CFormLabel htmlFor="validationServer01">Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="validationServer01"
                  placeholder="Name"
                  onChange={e => setUser({
                    ...user,
                    display_name: e.target.value
                  })}
                />
              </CCol>
              
              <CCol className="d-flex flex-column p-2">
                <CFormLabel htmlFor="validationServer02">Email</CFormLabel>
                <CFormInput
                  type="text"
                  id="validationServer02"
                  placeholder="Email"
                  onChange={e => setUser({
                    ...user,
                    email: e.target.value
                  })}
                />
              </CCol>
            </CCol>
            <CCol className="d-flex justify-content-start">
              <CCol className="d-flex flex-column p-2">
                <CFormLabel htmlFor="validationServer03">Phone number</CFormLabel>
                <CFormInput
                  type="text"
                  id="validationServer03"
                  placeholder="Phone number"
                  onChange={e => setUser({
                    ...user,
                    phone: e.target.value
                  })}
                />
              </CCol>
              <CCol className="d-flex flex-column p-2">
                <CFormLabel htmlFor="validationServer04">Password</CFormLabel>
                <CFormInput
                  type="Password"
                  id="validationServer04"
                  placeholder="Password"
                  onChange={e => setUser({
                    ...user,
                    password: e.target.value
                  })}
                />
              </CCol>
            </CCol>
            <CCol className="d-flex justify-content-start">
              <CCol className="d-flex flex-column p-2">
                <CFormLabel htmlFor="validationServer05">Address</CFormLabel>
                <CFormInput
                  type="text"
                  id="validationServer05"
                  placeholder="Address"
                  onChange={e => setUser({
                    ...user,
                    address: e.target.value
                  })}
                />
              </CCol>
              <CCol className="d-flex flex-column p-2">
                <CFormLabel htmlFor="validationServer06">Birth Day </CFormLabel>
                <DatePicker
                  placeholder="Birth Day"
                  dateFormat="dd/MM/yyyy "
                  // showTimeSelect 
                  // locale="vi" 
                  selected={user.birthday}
                  onChange={(date) => setUser({
                    ...user,
                    birthday: date
                  })} />
              </CCol>
            </CCol>
            <CRow className="px-2">
              <CFormLabel htmlFor="validationServer07">Avatar</CFormLabel>
              <div className="d-flex align-items-center">
                <div className=" col-2 "  >
                  <CFormInput
                    type="file"
                    id="validationTextarea"
                    aria-label="file example"
                    required
                    onChange={e => setUser({
                      ...user,
                      avata: e.target.value
                    })}
                  />
                </div>
                {/* <img scr={user.avata} alt="avtar" className="px-3"></img> */}
              </div>
              <CCol className="py-2">
                <CFormLabel htmlFor="validationServer08"> Gender</CFormLabel>
                <div className="d-flex">
                <CFormCheck
                  className="col-1"
                  type="radio"
                  name="flexRadioDisabled"
                  id="flexRadioDisabled"
                  value="Nam"
                  label="Nam"
                  defaultChecked
                  onChange={e => setUser({
                    ...user,
                    gender: e.target.value
                  })}
                />
                <CFormCheck
                  className="col-1"
                  type="radio"
                  name="flexRadioDisabled"
                  id="flexRadioCheckedDisabled"
                  value="Nữ"
                  label="Nữ"
                  onChange={e => setUser({
                    ...user,
                    gender: e.target.value
                  })}
                />
                </div>
              </CCol>
            </CRow>
            {/* <CCol className="d-flex flex-column p-2">
                <CFormLabel htmlFor="validationServer01">Position</CFormLabel>
                <CFormSelect
                  placeholder="Please choose position"
                  onChange={e => {
                    setUser({
                      ...user,
                      position: e.target.value
                    })
                  }}
                  aria-label="Default select example">
                  <option value="user">User</option>
                  <option value="blogger">Blogger</option>
                </CFormSelect>
              </CCol>
             */}
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