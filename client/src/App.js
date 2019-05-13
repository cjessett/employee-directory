import React from 'react';

import { Search, FilterList, EmployeeList, Paginator } from './components';

export default function App({ location, history }) {
  return (
    <div className="container-fluid mb-5">
      <header className="d-flex justify-content-center">
        <a href="/" style={{ color: 'inherit' }}><h1>Employee Directory</h1></a>
      </header>
      <section className="input-group mb-3">
        <Search />
      </section>
      <section>
        <FilterList />
      </section>
      <section className="d-flex mb-5">
        <EmployeeList />
      </section>
      <footer className="d-flex justify-content-center align-items-center">
        <Paginator />
      </footer>
    </div>
  );
}
