const { Router } = require("express");
const {SignUp, getAdmin, loginAdmin} = require("../controllers/adminController");
const { upload, CreateCandidate, AllCandidate, DownloadResume } = require("../controllers/candidateController");
const {CreateEmployee, AllEmployee} = require("../controllers/employeeController");

const adminRoute = Router();

// admin
adminRoute.post('/signup',SignUp);
adminRoute.get('/adminDetails',getAdmin)
adminRoute.post('/login',loginAdmin)

// candidate 
adminRoute.post('/addcandidate',upload.single("resume"),CreateCandidate);
adminRoute.get('/allcandidate',AllCandidate);
adminRoute.get('/download/:id', DownloadResume)

// employee
adminRoute.post('/addemployee',CreateEmployee)   
adminRoute.get('/allemployee',AllEmployee)


module.exports = adminRoute; 