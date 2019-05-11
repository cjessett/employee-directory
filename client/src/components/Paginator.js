import React from 'react';

export default function Paginator({ page, pages }) {
  const pageLink = pageNo => `?page=${pageNo}`;
  const lastPageLink = pageLink(page - 1);
  const nextPageLink = pageLink(page + 1);
  const pageLinks = [...Array(pages).keys()].map(p => {
    const style = p + 1 === page ? { pointerEvent: 'none', color: 'inherit' } : {};
    return <a key={p} className="m-1" href={pageLink(p + 1)} style={style}>{p + 1}</a>
  });
  return (
    <div>
      {page > 1 && <a href={lastPageLink} className="btn btn-outline-primary m-1" type="button">Previous</a>}
      <span className="m-3">{pageLinks}</span>
      {page < pages && <a href={nextPageLink} className="btn btn-outline-primary m-1" type="button">Next</a>}
    </div>
  )
}