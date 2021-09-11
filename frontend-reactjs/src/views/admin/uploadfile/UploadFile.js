import React,{useEffect, useCallback} from 'react'
import { useFileUpload } from 'use-file-upload'

const UploadFile = (props) => {
    const { selectFile, file } = props
    return (
        <div className="d-flex justify-content-start  align-items-center">
            <div>
                <button
                    class="btn btn-secondary "
                    onClick={() => {
                        selectFile()
                    }}
                >
                    Upload Avatar
                </button>
            </div>
            {!!file ? (
                <div className=" px-3 manipulation " >
                    <img src={file.source} alt='preview' width="50px" height="50px" style={{
                        borderRadius: 100,
                        border: '1px solid #0000001f'
                    }} 
                    />
                </div>
            ) : (
                <span>No file selected</span>
            )}
        </div>
    )
}

export default UploadFile