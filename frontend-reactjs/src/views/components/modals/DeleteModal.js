import React from 'react'
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
  } from '@coreui/react'

const DeleteModal = ({ subTitle, title, visible, setVisible,onDelete}) => {
    return (
        <CModal visible={visible} onDismiss={() => setVisible(false)}>
            <CModalHeader onDismiss={() => setVisible(false)}>
                <CModalTitle>{title}</CModalTitle>
            </CModalHeader>
            <CModalBody>{subTitle}</CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                    Close
                </CButton>
                <div>
                    <CButton className="btn btn-danger" onClick={onDelete}>Delete</CButton>
                </div>
            </CModalFooter>
        </CModal>
    )
}

export default DeleteModal