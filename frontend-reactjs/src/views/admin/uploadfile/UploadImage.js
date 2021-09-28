import React, { useEffect, useCallback } from 'react'

const UploadImageTitle = (props) => {
    const { selectFile, file } = props
    return (
        <div >
            <div className="Image_Title_Coverv ">
                {!!file ? (
                    <div className="  manipulation " >
                        <img src={"http://localhost:8888/" + file}
                            onClick={() => {
                                selectFile()
                            }}
                            alt='preview'
                            className="Image_Title"
                        />
                    </div>
                ) : (
                    <div onClick={() => {
                        selectFile()

                    }}
                        className="Image_Title " />
                )}
            </div>
            <div
                className="selectFile my-2"
                onClick={() => {
                    selectFile()
                }}>
                Image
            </div>
        </div>
    )
}

export default UploadImageTitle