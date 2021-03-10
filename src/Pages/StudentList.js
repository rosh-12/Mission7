import React, { useState, useEffect } from "react";
import VerticalNavbar from "../Components/VerticalNavbar";
import TopBar from "../Components/Topbar2";
import { makeStyles } from "@material-ui/core/styles";
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import {Link} from "react-router-dom";

{/* <Link to="/teacher">
 <Button>LOGIN</Button>
</Link>  */}

const useStyles = makeStyles(() => ({
  detailContainer: {},
}));

const Student = () => {
  useEffect(() => {
    fetchItems();
  }, []);

  const [students, setStudents] = useState([]);

  const fetchItems = async () => {
    const response = await fetch("http://localhost:4000/students/", {
      method: "GET",
      headers: { "Content-type": "application/json;charset=UTF-8" },
    });
    const data = await response.json();

    setStudents(data);
    console.log(students);
  };

  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
    }
    return age;
  };

  const classes = useStyles();
  return (
    <div>
      <VerticalNavbar />
      <TopBar />
      <div className={classes.detailContainer}></div>
      <input type="text" id="searchBar" title="Type in a name"  />
      <FontAwesomeIcon icon={faSearch} size='3x' id='searchIcon'/>
      <input type="text" id="filterBar" title="Filter" />
      <FontAwesomeIcon icon={faChevronDown} size='3x' id='downIcon'/>
      <table id="studentTable">
        <tbody>
          {students.map((student, index) => {
            return (
              <tr key={index}>
                <td id="picStyle">
                  <FontAwesomeIcon icon={faUserCircle} size='3x' />
                </td>
                <td id="nameStyle">
                  {student.firstname} {student.surname} 
                </td>
                <td id="ageStyle">
                  {getAge(student.dob)} years old
                  {/* {student.dob.replace('T00:00:00.000Z','')} */}
                </td>
                <td id="schoolStyle">
                  {student.school}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table> 
    </div>
  );
}; 


export default Student;
