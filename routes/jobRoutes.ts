import express, { Request, Response } from 'express';
const { getJobs, getJobById, addJobs, updateJob, deleteJob } = require('../controllers/JobController');

// router object
const router = express.Router();

// routes

// get all jobs list 
router.get('/jobs', getJobs)
router.get('/jobs/:id', getJobById);

//create job
router.post('/jobs', addJobs);

// update Job
router.put('/jobs/:id', updateJob);

//deleteJob
router.delete('/jobs/:id', deleteJob);

module.exports = router;