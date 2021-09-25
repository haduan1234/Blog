import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect
} from '@coreui/react'

import { useHistory, Link } from "react-router-dom"

import { useParams } from "react-router-dom"

import { getPost_category } from '../../../services/post_categoryServices'
import { createPost, getPostById, updatePost } from 'src/services/postService';
import { getUser } from 'src/services/localStorageService';

const Post = () => {

  const [posts, setPosts] = useState({
    name: "",
    postCategoryId: "",
    userId: 0,
    content: "",
  })
  const [post_categorys, setPost_categorys] = useState([])

  const { id } = useParams()
  const history = useHistory()

  const editorRef = useRef(null);

  const submitValue = async () => {
    const content = editorRef.current.getContent()
    try {
      const localStorage = getUser()
      const body = {
        ...posts,
        userId: localStorage.id,
        content: content
      }
      if (!!id) {
        await updatePost(id, body)
      } else {
        await createPost(body)
      }
      history.push('/admin/posts')
    }
    catch (err) {
      alert(err)
    }
  }

  const fetchGetPost_category = async () => {
    try {
      let res = await getPost_category()

      if (!!res.data) {
        setPost_categorys([
          ...res.data.items
        ])
        if(!id && res.data.items.length > 0) {
          setPosts({
            ...posts,
            postCategoryId: res.data.items[0].id
          })
        }
      }
    }
    catch (err) {
      alert(err)
    }
  }

  const fetchGetPostByID = useCallback(async () => {
    try {

      const res = await getPostById(id)
      if (!!res.data) {
        setPosts({
          name: res.data.name,
          postCategoryId: res.data.postCategoryId,
          content: res.data.content,
        })
      }
    }
    catch (err) {
      alert(err)
    }
  }, [id])

  useEffect(() => {
    if (!!id) {
      fetchGetPostByID()
    }
  }, [id])

  useEffect(() => {
    fetchGetPost_category()
  }, [])

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
            <div className="d-flex justify-content">
              <CCol className=" col-3 ">
                <CFormLabel htmlFor="validationServer01">Post category</CFormLabel>
                <CFormSelect
                  onChange={e => {
                    setPosts({
                      ...posts,
                      postCategoryId: e.target.value
                    })
                  }}
                  aria-label="Default select example">
                  {!!post_categorys && post_categorys.map((p, index) =>
                    <option selected={posts.postCategoryId == p.id} key={index} value={p.id}>{p.name}</option>
                  )}
                </CFormSelect>
              </CCol>
              <CCol className="col-3 mx-2">
                <CFormLabel htmlFor="validationServer01">Post name </CFormLabel>
                <CFormInput
                  placeholder="Post name"
                  aria-label="NamePost"
                  aria-describedby="basic-addon1"
                  value={posts.name}
                  onChange={e => setPosts({
                    ...posts,
                    name: e.target.value
                  })}
                />
              </CCol>
              <CCol className="d-flex align-items-end col-3 ">
                <Link to="/admin/createPost_category" >
                  <button type="button"
                    className="btn btn-success"
                    style={{
                      color: 'white ',
                    }}
                  >
                    Create post category
                  </button>
                </Link>
              </CCol>

            </div>
            <div className="m -3">
              <CFormLabel htmlFor="validationTextarea" className="form-label">
                Content
              </CFormLabel>
              <Editor
                apiKey="imp2xxk2wifk9wqlrdgck460lvlks9vm8xp6ik19degckh01"
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={!!id ? posts.content : null}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor | codesample',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor link image | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
              />
            </div>
            <CButton color="primary"
              className="my-3"
              type="submit"
              onClick={submitValue}
            >
              Save
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>

    </CForm>
  )
}

export default Post;