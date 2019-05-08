import React from 'react';

function Search() {
  return (
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Search for Employee" />
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
      </div>
    </div>
  )
}

function Filter({ name }) {
  return (
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect01">{name}</label>
      </div>
      <select class="custom-select" id={name}>
        <option selected>Choose...</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
  )
}

function Employee({ name }) {
  return <a href={`#${name}`} className="list-group-item list-group-item-action">{name}</a>
}

export default function App() {
  return (
    <div className="container-fluid">
      <header className="d-flex justify-content-center">
        <h1>Employee Directory</h1>
      </header>
      <Search />
      <section className="d-flex">
        <Filter name="Department" />
        <Filter name="Title" />
        <Filter name="Location" />
      </section>
      <section className="d-flex">
        <ul className="list-group flex-grow-1">
          <Employee name="bob smith" />
          <Employee name="jill smith" />
          <Employee name="alice smith" />
        </ul>
      </section>
    </div>
  );
}
