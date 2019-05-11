import React, { Component } from 'react';
import 'react-placeholder/lib/reactPlaceholder.css';

import { Search, Filter, EmployeeList, EmployeeItem, Paginator } from './components';
import { getEmployees } from './client';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      departments: [],
      locations: [],
      titles: [],
      department: '',
      location: '',
      title: '',
      searchQuery: '',
      pageSize: 0,
      pages: 0,
      page: 0,
    };
  }

  async componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const page = parseInt(params.get('page'), 0) || 1;
    const { result, pageSize, pages } = await getEmployees(page);
    if (page > pages || page < 1) this.props.history.push('/');
    const departments = [...new Set(result.map(e => e.department))];
    const locations = [...new Set(result.map(e => e.location))];
    const titles = [...new Set(result.map(e => e.jobTitle))];
    this.setState({ employees: result, departments, locations, titles, pageSize, pages, page });
  }
  
  handleSelect(e) {
    const { id, value } = e.target;
    const name = id.toLowerCase();
    if (name === 'department') this.setState({ title: '' });
    this.setState({ [name]: value });
  }
  
  handleSearch({ target: { value } }) {
    this.setState({ searchQuery: value });
  }
  
  searchFilter(employees) {
    const { searchQuery } = this.state;
    if (!searchQuery) return employees;
    const queryFilter = prop => employee => employee[prop].toLowerCase().startsWith(searchQuery.toLowerCase());
    const firstNameMatches = employees.filter(queryFilter('firstName'));
    const lastNameMatches = employees.filter(queryFilter('lastName'));
    return [...firstNameMatches, ...lastNameMatches].filter((v, i, s) => s.indexOf(v) === i);
  }
  
  getVisibleEmployees(employees) {
    const { department, location, title } = this.state;
    const departmentFilter = el => department ? el.department === department : true;
    const locationFilter = el => location ? el.location === location : true;
    const titleFilter = el => title ? el.jobTitle === title : true;
    const filtered = employees
      .filter(departmentFilter)
      .filter(locationFilter)
      .filter(titleFilter);
    return this.searchFilter(filtered);
  }
  
  getVisibleTitles(employees) {
    const { department, titles } = this.state;
    if (!department) return titles;
    return [...new Set(employees.map(e => e.jobTitle))];
  }
  
  render() {
    const { departments, locations, department, location, title, searchQuery, page, pages } = this.state;
    const visibleEmployees = this.getVisibleEmployees(this.state.employees);
    const employees = visibleEmployees.map(employee => <EmployeeItem key={employee._id} {...employee} />)
    const visibleTitles = this.getVisibleTitles(visibleEmployees).sort();
    return (
      <div className="container-fluid mb-5">
        <header className="d-flex justify-content-center">
          <h1>Employee Directory</h1>
        </header>
        <Search value={searchQuery} onChange={e => this.handleSearch(e)} />
        <section className="d-flex flex-sm-row flex-column">
          <Filter name="Department" options={departments} value={department} onSelect={e => this.handleSelect(e)} />
          <Filter name="Title" options={visibleTitles} value={title} onSelect={e => this.handleSelect(e)} />
          <Filter name="Location" options={locations} value={location} onSelect={e => this.handleSelect(e)} />
        </section>
        <section className="d-flex mb-5">
          <EmployeeList ready={!!this.state.employees.length} employees={employees} />
        </section>
        <footer className="d-flex justify-content-center align-items-center">
          <Paginator page={page} pages={pages} />
        </footer>
      </div>
    );
  }
}
