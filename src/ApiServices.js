import axios from "axios";
import constantObj from "./CommonConstant";


//get api response
const getResponse = (request) => {
    // Make a request for a user with a given ID
    return new Promise((resolve, reject)=>{
         axios.get(`${constantObj.API_URL}userList`)
        .then(function (response) {
            // handle success

            resolve(response.data)
        })
        .catch(function (error) {
            reject(error)
        })
    })
     
}
const sachinData = {
  name:Number
}
//get api response
const userList = (request) => {
  // Make a request for a user with a given ID
  return new Promise((resolve, reject)=>{
       axios.get(`${constantObj.API_URL}userList?user_id=${request.user_id}`)
      .then(function (response) {
          // handle success

          resolve(response.data)
      })
      .catch(function (error) {
          reject(error)
      })
  })
   
}

//get api response
const postRequest = (request,endPoint) => {
    console.log('request',request,'endPoint  ',constantObj.API_URL ,endPoint)
    // Make a request for a user with a given ID
    return new Promise((resolve, reject)=>{
         axios.post(`${constantObj.API_URL}${endPoint}`,request)
        .then(function (response) {
            console.log('res',response)
            // handle success
            // console.log('sachin',response.data)
            resolve(response.data)
        })
        .catch(function (error) {
            reject(error)
        })
    })
     
}


 const ApiServices = {getResponse,postRequest,userList}
export default ApiServices;