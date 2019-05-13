import React from 'react';
import { connect } from 'react-redux';

import { updatePage } from '../store/ducks/employees';

function Paginator({ page, pages, updatePage }) {
  const handleClick = page => e => {
    e.preventDefault();
    updatePage(page);
    window.scrollTo(0, 0)
  }
  const pageLinks = getVisiblePages(window.screen.width)(page, pages).map(p => {
    const style = p === page ? { pointerEvents: 'none', color: 'inherit' } : {};
    return <button key={p} href="" onClick={handleClick(p)} className="btn btn-link" style={style}>{p}</button>
  });
  return (
    <div>
      {page > 1 && <button onClick={handleClick(page - 1)} className="btn btn-link m-1" type="button">Previous</button>}
      <span className="m-3">{pageLinks}</span>
      {page < pages && <button onClick={handleClick(page + 1)} className="btn btn-link m-1" type="button">Next</button>}
    </div>
  )
}

function getVisiblePages(width) {
  const limit = width < 400 ? 4 : 10;
  return function (currentPage, totalPages) {
    const offset = Math.ceil(limit / 2);
    let start = currentPage - offset;
    let end = currentPage + offset;
    
    if (totalPages <= limit) {
      start = 0;
      end = totalPages;
    } else if (currentPage <= offset) {
      start = 0;
      end = limit;
    } else if ((currentPage + offset) >= totalPages) {
      start = totalPages - limit;
      end = totalPages;
    }

    const range = (s, e) => [...Array(e - s).keys()].map(i => i + 1 + s);

    return range(start, end);
  }
}

function mapStateToProps({ employees: { page, pages } }) {
  return { page, pages };
}

export default connect(mapStateToProps, { updatePage })(Paginator);