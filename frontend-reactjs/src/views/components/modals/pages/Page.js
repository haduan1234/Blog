import React from 'react'

const Page = ({ previous, totalPage, next, setCurrentPage, currentpage }) => {
    const pageList = []
    for (let i = 1; i <= totalPage; i++) {
        pageList.push(i)
    }

    return (
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end">
                <li class="page-item" onClick={() => {
                    if (currentpage > 1) {
                        setCurrentPage(currentpage - 1)
                    }
                }}>
                    <span aria-hidden="true">&laquo;</span>
                </li>
                {
                    pageList.map((p, index) => (
                        <li key={index} class="page-item" onClick={() => {
                            setCurrentPage(p)
                        }}>
                            {p}
                        </li>
                    ))
                }
                <li class="page-item" onClick={() => {
                    if (currentpage < totalPage) {
                        setCurrentPage(currentpage + 1)
                    }
                }}>
                    <span aria-hidden="true">&raquo;</span>
                </li>
            </ul>
        </nav>
    )
}

export default Page