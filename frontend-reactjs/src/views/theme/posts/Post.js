import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'

const Post =  () =>{
   const [Name, setName] = useState("")
   const [Content, setContent] = useState("")

   const submitValue = () =>{
       const data = {
           'namePost': Name,
           'Content': Content
       }
       console.log("Data la:" , data)
   }
    return (
        <CForm 
        className="row g-3 needs-validation"
        >
            <CCol xs={12}>
            <CCard className="mb-4">
            <CCardHeader> 
                <strong>Create post new</strong>
            </CCardHeader>
           <CCardBody>
           <CInputGroup className="mb-3">
                <CInputGroupText id="basic-addon1">@</CInputGroupText>
                <CFormInput
                  placeholder="Name post"
                  aria-label="NamePost"
                  aria-describedby="basic-addon1"
                  onChange={e => setName(e.target.value)}
                />
              </CInputGroup>
              <div className="mb-3">
                  <CFormLabel htmlFor="validationTextarea" className="form-label">
                    Content
                  </CFormLabel>
                  <CFormTextarea
                    id="validationTextarea"
                    placeholder="Content post new"
                    onChange={e => setContent(e.target.value)}
                  ></CFormTextarea>
                </div>
               <CButton color="primary"
                type="submit"
                onClick={submitValue}
                >
                Submit form
                </CButton>       
           </CCardBody>
            </CCard>
            </CCol>
       
       </CForm>
         )
}

export default Post;