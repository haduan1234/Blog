import React from 'react'

const Page = ({ totalPage, setCurrentPage, currentpage }) => {

    const styleLi = {
        border: '1px solid #0000001f',
        paddingRight: 10,
        paddingLeft: 10
    }

    const pageList = []
    for (let i = 1; i <= totalPage; i++) {
        pageList.push(i)
    }

    return (
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end align-items-center">
                <li class="page-item disabled "
                    style={styleLi}
                    onClick={() => {
                        if (currentpage > 1) {
                            setCurrentPage(currentpage - 1)
                        }
                    }}>
                    <span aria-hidden="true">&laquo;</span>
                </li>
                {
                    pageList.map((p, index) => (
                        <li key={index}
                            style={styleLi}
                            class={currentpage == p ? "active-page page-item" : "page-item"}
                            onClick={() => {
                                setCurrentPage(p)
                            }}>
                            {p}
                        </li>
                    ))
                }
                <li class="page-item"
                    style={styleLi}
                    onClick={() => {
                        if (currentpage < totalPage) {
                            setCurrentPage(currentpage + 1)
                        }
                    }}
                    >
                    <span aria-hidden="true">&raquo;</span>
                </li>
            </ul>
        </nav>
    )
}

export default Page