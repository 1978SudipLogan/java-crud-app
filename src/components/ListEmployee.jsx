import { React, useEffect, useState } from "react";
import {
  deletedEmployee,
  getEmployee,
  listEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const ListEmployee = () => {
  const [employee, setEmployee] = useState([]);
  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getAllEmployee();
  }, []);

  function getAllEmployee() {
    listEmployee()
      .then((response) => {
        setEmployee(response.data);
        console.log("get the data successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addEmployee() {
    navigator("/add-employee");
  }

  function updateEmployee(id) {
    navigator(`/update-employee/${id}`);
  }
  function removeEmployee(id) {
    console.log(`${id} deleted successfully`);
    deletedEmployee(id)
      .then((response) => {
        console.log(response.data);
        getAllEmployee();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <h2 className="text-center mb-4 text-blue-600 mt-16 font-bold text-2xl">
        LIST OF EMPLOYEES
      </h2>

      <div className="">
        {/* Button positioned on the left side above the table */}
        <div className="flex justify-center ">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            onClick={addEmployee}
          >
            Add Employee
          </button>
        </div>
        <div className="flex justify-center mt-16">
          <table className="table-auto border-collapse border border-gray-300">
            <thead className="text-center text-red-600">
              <tr>
                <th className="border px-4 py-2">Employee Id</th>
                <th className="border px-4 py-2">Employee FirstName</th>
                <th className="border px-4 py-2">Employee LastName</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employee.map((employee) => (
                <tr key={employee.id} className="text-center">
                  <td className="border px-4 py-2">{employee.id}</td>
                  <td className="border px-4 py-2">{employee.firstName}</td>
                  <td className="border px-4 py-2">{employee.lastName}</td>
                  <td className="border px-4 py-2">{employee.email}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 text-sm p-1 rounded-md"
                      onClick={() => updateEmployee(employee.id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-sm p-1 rounded-md mx-4"
                      onClick={() => removeEmployee(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListEmployee;
