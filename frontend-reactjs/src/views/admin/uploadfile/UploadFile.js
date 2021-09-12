import React,{useEffect, useCallback} from 'react'
import { useFileUpload } from 'use-file-upload'

const UploadFile = (props) => {
    const { selectFile, file } = props
    return (
        <div className="d-flex justify-content-start  align-items-center">
             <img src="http://localhost:8888/c5fe23fbf5c0641e61077e9f4e1d9c3f" alt='preview' width="50px" height="50px" style={{
                        borderRadius: 100,
                        border: '1px solid #0000001f'
                    }} />
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
                    <img src={file} alt='preview' width="50px" height="50px" style={{
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