import { React, useState, useEffect } from "react";
import { createEmployee, updatedEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployee } from "../services/EmployeeService";

const Employee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  // Custom validation function
  function validateForm() {
    if (firstName == "" || lastName == "" || email == "") {
      setError("All fields are required.");
      return false;
    }

    // Email validation regex pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    setError(""); // Clear any previous error
    return true;
  }

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    // Run validation before proceeding
    if (validateForm()) {
        const employee = { firstName, lastName, email };
        console.log(employee);  // Check if this is the correct data

        if (id) {
            // If an ID is present, update the employee
            updatedEmployee(id, employee)
                .then((response) => {
                    console.log(response.data); // Check the response
                    navigator("/employee");
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            // If no ID, create a new employee
            createEmployee(employee)
                .then((response) => {
                    console.log(response.data); // Check the response
                    navigator("/employee");
                })
                .catch((error) => {
                    console.error("Error creating employee:", error);
                });
        }
    }
  }




  function pageTitle() {
    if (id) {
      return (
        <h1 className="text-3xl font-semibold text-blue-600 mb-6">
          Update Employee
        </h1>
      );
    } else {
      return (
        <h1 className="text-3xl font-semibold text-blue-600 mb-6">
          Add Employee
        </h1>
      );
    }
  }

  return (
    <div className="flex flex-col items-center py-8 px-4 bg-gray-100 min-h-screen">
      {pageTitle()}

      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={saveOrUpdateEmployee}>
          {/* First Name Field */}
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-lg font-medium text-gray-700"
            >
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              required
              placeholder="Enter Your First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Last Name Field */}
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-lg font-medium text-gray-700"
            >
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter Your Last Name"
              name="lastName"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error Message */}
          {error && <div className="text-red-600 mb-4">{error}</div>}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Employee;
