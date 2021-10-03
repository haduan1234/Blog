import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { setUser, getUser, clearUser } from 'src/services/localStorageService'
import { signinUser } from 'src/services/authServices'

const Login = () => {
  const [userSigin, setUserSigin] = useState()

  const history = useHistory()

  const setUserInLocalStorage = async () => {
    try {
      const res = await signinUser(userSigin)
      const user = {
        id: res.data.user.id,
        name: res.data.user.name,
        phone: res.data.user.phone,
        RoleId: res.data.user.RoleId,
        RoleName: res.data.user.Role.name
      }
      setUser(user)
      history.push('/admin/users')
    }
    catch (err) {
      alert(err)
    }


  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        {/* <CButton color="primary" className="px-4" onClick={setUserInLocalStorage}>
          setUser
        </CButton>
        <CButton color="primary" className="px-4" onClick={() => {
        }}>
          getUser
        </CButton>
        <CButton color="primary" className="px-4" onClick={() => {
          clearUser()
        }}>
          clearUser
        </CButton> */}
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" autoComplete="username" onChange={e => setUserSigin({
                        ...userSigin,
                        email: e.target.value
                      })} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={e => setUserSigin({
                          ...userSigin,
                          password: e.target.value
                        })}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" onClick={setUserInLocalStorage} className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
