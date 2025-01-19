import axios from "axios";

const REST_API_BASE_URL="http://localhost:8080/api/create";

export const listEmployee=()=>axios.get(REST_API_BASE_URL);
export const createEmployee=(employee)=>axios.post(REST_API_BASE_URL,employee);
export const getEmployee=(employeeId)=>axios.get(REST_API_BASE_URL+"/"+employeeId);
// export const updatedEmployee = (employeeId, employee) => 
//     axios.put(`${REST_API_BASE_URL}/${employeeId}`, employee);
 export const updatedEmployee=(employeeId,employee)=>axios.put(REST_API_BASE_URL+"/"+employeeId,employee);
 export const deletedEmployee=(employeeId)=>axios.delete(REST_API_BASE_URL+"/"+employeeId);