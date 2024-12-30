import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';
import '../cssFiles/employee.css';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import AddEmployee from './AddEmployee';

const Employee = () => {
  const [employees, setEmployee] = useState([]);
  const [showModel, setShowModel] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [FilteredEmployee, setFilteredEmployee] = useState([]);

  const BackendUrl = process.env.REACT_APP_BACKEND_URL;

  const AllEmployee = async() =>{
    try {
      const response = await axios.get(`${BackendUrl}/allemployee`);
      setEmployee(response.data.All_Employee)
      setFilteredEmployee(response.data.All_Employee)
      console.log("response",response)
      console.log("all employee:",response.data.All_Employee)
      
    } catch (error) {
      console.log("Error fetching candidate :", error);
      setEmployee([]);
      setFilteredEmployee([]);
    }
  }

  useEffect(()=>{
    AllEmployee()
  },[]);

  const handleSearch = (e) =>{
     const query = e.target.value.toLowerCase();
     setSearchQuery(query);
     console.log("query :",query)

     const filter = employees.filter((person)=> person.name.toLowerCase().includes(query) || person.email.toLowerCase().includes(query) || person.position.toLowerCase().includes(query) || person.department.toLowerCase().includes(query) || person.dateofJoining.toLowerCase().includes(query)|| String(person.phone).includes(query));  
     setFilteredEmployee(filter)                                           
  }          
    
  return (
    <div><div className="candidates">
    <div className="filters">
      <h2>Employee</h2>
      <button className='btn-addEmployee' onClick={()=>setShowModel(true)}>Add Employee</button>
      <div className="nav-end">
      <input className="employee-search" type="text" placeholder="Search" value={searchQuery} onChange={handleSearch} /> 
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Sr. no.</th>
          <th>Employee Name</th>
          <th>Email Address</th>
          <th>Phone Number</th>
          <th>Position</th>
          <th>Department</th>
          <th>Date of Joining</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {FilteredEmployee && FilteredEmployee.map((employee, index) => (
          <tr key={employee._id}>
            <td>{index + 1}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td>{employee.position}</td>
            <td>{employee.department}</td>
            <td>{new Date(employee.dateofJoining).toISOString().split("T")[0]}</td>
            <td className='editdelete-btn'>
                <button className='editEmployee-btn'>Edit</button>
                <button className='deleteEmployee-btn'>Delete</button>
            </td>   
        </tr>
        ))}
      </tbody>
    </table>
    <Modal
        show={showModel}
        onHide={() => setShowModel(false)}
        centered
        style={{}}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body
          style={{
            padding: "20px",
            maxHeight: "90%",
            height: "600px",
            maxWidth: "100%",
            width: "900px",
            borderRadius: "10px",
          }}
        >
          <AddEmployee />
        </Modal.Body>
      </Modal>

    <Outlet/>
  </div>
  </div>
  )
}

export default Employee;