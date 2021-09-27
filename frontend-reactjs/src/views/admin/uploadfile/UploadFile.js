import React, { useEffect, useCallback } from 'react'

const UploadFile = (props) => {
    const { selectFile, file } = props
    return (
        <div className="uploadFile">
            {!!file ? (
                <div className="  manipulation " >
                    <img src={"http://localhost:8888/" + file}
                        onClick={() => {
                            selectFile()
                        }}
                        alt='preview' width="60px" height="60px" style={{
                            borderRadius: 100,
                            border: '1px solid #0000001f'
                        }}
                    />
                </div>
            ) : (
                <div onClick={() => {
                    selectFile()
                    
                }}
                    className="uploadFile-image " />
            )}

            <div
                className="selectFile my-2"
                onClick={() => {
                    selectFile()
                }}>
                Avatar
            </div>
        </div>
    )
}

export default UploadFile