import React from 'react';
import { connect } from 'react-redux';

const Paginator = ({ currentPage, goTo, numberOfPages }) => {
  const pages = Array.apply(null, Array(numberOfPages))
    .map((v, i) => i + 1)

  const onClickNext = () =>
    goTo(currentPage + 1)

  const onClickPrev = () =>
    goTo(currentPage - 1)

  return
    <nav>
      <ul className='pagination'>
        <li className={currentPage === 1 ? 'disabled' : ''}>
          <a href="#" onClick={onClickPrev}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Prev</span>
          </a>
        </li>
        {pages.map((page) =>
          <li key={page}
              onClick={goTo(page)}
              className={currentPage === page ? 'active' : ''}>
              <a href="#">{page}</a>
          </li>
        ) }
        <li className={currentPage === max ? 'disabled' : ''}>
            <a href="#" onClick={onClickNext}>
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
            </a>
        </li>
      </ul>
    </nav>
}

const mapDispatchToProps = (dispatch) => ({
  goTo(page){
    dispatch({
      type: 'GO_TO_PAGE',
      payload: page
    })
  }
})

const mapStateToProps = store => ({
  currentPage: store.common.pagination.currentPage,
  numberOfPages: store.common.pagination.numberOfPages
})

export default connect(mapStateToProps, mapDispatchToProps)(Paginator)
