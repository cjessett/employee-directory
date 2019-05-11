import React from 'react';

export default function Paginator({ page, pages }) {
  const pageLink = pageNo => `?page=${pageNo}`;
  const lastPageLink = pageLink(page - 1);
  const nextPageLink = pageLink(page + 1);
  const pageLinks = getVisiblePages(page, pages).map(p => {
    const style = p === page ? { pointerEvent: 'none', color: 'inherit' } : {};
    return <a key={p} className="m-1" href={pageLink(p)} style={style}>{p}</a>
  });
  return (
    <div>
      {page > 1 && <a href={lastPageLink} className="m-1" type="button">Previous</a>}
      <span className="m-3">{pageLinks}</span>
      {page < pages && <a href={nextPageLink} className="m-1" type="button">Next</a>}
    </div>
  )
}

function getVisiblePages(currentPage, totalPages) {
  const limit = 10;
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