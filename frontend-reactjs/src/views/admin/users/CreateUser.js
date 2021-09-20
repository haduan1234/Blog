import React, { useState, useEffect, useCallback } from 'react'
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
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import vi from 'date-fns/locale/vi'
registerLocale('vi', vi)
import { registerLocale, setDefaultLocale } from "react-datepicker"
import { useParams } from "react-router-dom"


import { useHistory, Link } from "react-router-dom"
import { useFileUpload } from 'use-file-upload'


import { createUser,  getUserById, updateUser } from "../../../services/userService"
import { uploadFile } from "../../../services/uploadFileService"
import UploadFile from '../uploadfile/UploadFile.js'
import { getRole } from 'src/services/roleService'

const CreateUser = () => {
  const [user, setUser] = useState({
    display_name: "",
    birthday: new Date(),
    email: "",
    phone: "",
    gender: "",
    address: "",
    RoleId: 0,
    avatar: "",
    password: ""
  })

  const [file, selectFile] = useFileUpload()
  const [roles, setRoles] = useState([])

  const { id } = useParams()
  const history = useHistory()

  const save = async () => {
    const body = {
      ...user,
      birthday: user.birthday.getTime(),
    }
    try {
      if (!!id) {
        await updateUser(id, body)
      }
      else {
        await createUser(body)
      }
      history.push('/admin/users')
    }
    catch (error) {
      alert(error)
    }
  }

  const fetchGetUserById = useCallback(async () => {
    try {
      const res = await getUserById(id)
      if (!!res && !!res.data) {
        setUser({
          display_name: res.data.display_name,
          birthday: new Date(res.data.birthday),
          email: res.data.email,
          phone: res.data.phone,
          gender: res.data.gender,
          address: res.data.address,
          avatar:  res.data.avatar,
          RoleId: res.data.RoleId
        })
      }
    } catch (error) {
      alert(error)
    }
  }, [id])

  const fetchGetRole = useCallback(async () => {
    try {
      const res = await getRole();
      if (!!res) {
        setRoles([...res.data.items])
      }
    }
    catch (error) {
      alert(error)
    }
  }, [])

  const uploadImage = useCallback(async () => {
    const formData = new FormData();
    formData.append("image", file?.file)
    try {
      const image = await uploadFile(formData)
      setUser({
        ...user,
        avatar: image.data.filename
      })
    } catch (error) {
      alert(error)
    }

  }, [file])

  useEffect(() => {
    if (!!id) {
      fetchGetUserById()
    }
  }, [id])

  useEffect(() => {
    if (!!file) {
      uploadImage()
    }
  }, [file])

  useEffect(() => {
      fetchGetRole()
  }, [])

  useEffect(() => {
    if(!!roles && roles.length > 0 && user.RoleId == 0) {
      setUser({
        ...user,
        RoleId: roles[0].id
      })
    }
  }, [roles, user])


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
                  value={user.display_name}
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
                  value={user.email}
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
                  value={user.phone}
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
                  value={user.address}
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
            <CRow >
              <div className="d-flex ">
                <CCol className=" col-6 px-2">
                  <CFormLabel htmlFor="validationServer01">Position</CFormLabel>
                  <CFormSelect
                    placeholder="Please choose position "
                    onChange={e => {
                      setUser({
                        ...user,
                        RoleId: e.target.value
                      })
                    }}
                    aria-label="Default select example">
                    {!!roles && roles.map((r, index) =>
                      <option selected={user.RoleId == r.id} key={index} value={r.id}>{r.name}</option>
                    )}
                  </CFormSelect>
                </CCol>
                <div className="px-2 col-6">
                  <CFormLabel htmlFor="validationServer08"> Gender</CFormLabel>
                  <div className="d-flex py-2">
                    <CFormCheck
                      className="col-2"
                      type="radio"
                      name="flexRadioDisabled"
                      id="flexRadioDisabled"
                      value="Nam"
                      label="Nam"
                      // defaultChecked
                      onChange={e => setUser({
                        ...user,
                        gender: e.target.value
                      })}
                    />
                    <CFormCheck
                      className="col-2   "
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
                </div>
              </div>
              <div className="mx-2 col-1">
                <CFormLabel htmlFor="validationServer07">Avatar</CFormLabel>
                <UploadFile
                  file={user.avatar}
                  selectFile={selectFile}
                />
              </div>
            </CRow>
            <div className="px-2 py-3">
              <CButton color="primary"
                type="submit"
                onClick={save}
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

export default CreateUser