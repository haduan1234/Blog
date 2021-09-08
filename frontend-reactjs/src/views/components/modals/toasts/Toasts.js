import React from "react"
import {
  CToast,
  CToastBody,
  CToastHeader,
} from '@coreui/react'


const ExampleToast = ({ title, delay, nameToast, time, body }) => {
  return (
    <CToast title={title} delay={delay}>
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
        <strong className="me-auto">{nameToast}</strong>
        <small>{time}</small>
      </CToastHeader>
      <CToastBody>{body}</CToastBody>
    </CToast>
  )
}

export default ExampleToast