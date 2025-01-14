import express, { Request, Response } from 'express';
const db = require('../config/db')
//Get all Jobs list
const getJobs = async (req: Request, res: Response) => {
    try {
        const data = await db.query('SELECT * FROM jobs');
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "not found"
            });
        }
        const records = data[0];
        res.status(200).send({
            success: true,
            message: 'all job got',
            records
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'error in get all jobs api',
            err
        })
    }
}

// get job by id
const getJobById = async (req: Request, res: Response) => {
    try {
        const jobId = req.params.id;
        const data = await db.query(`SELECT * FROM jobs WHERE id=?`, [jobId]);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: "Invalid or Provide job id"
            });
        }
        const records = data[0];
        res.status(200).send({
            success: true,
            message: 'all job got',
            records
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'error in get job by Id',
            err
        })
    }
}

// get job by id
const addJobs = async (req: Request, res: Response) => {
    try {
        const { title, company, location, salary, description } = req.body;
        if (!title || !company || !location || !salary || !description) {
            return res.status(500).send({
                success: false,
                message: "Please Provide all keys"
            });

        }

        const data = await db.query(`INSERT INTO jobs (title,company,location,salary,description) VALUES (?,?,?,?,?)`, [
            title, company, location, salary, description
        ])

        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Invalid or Provide job id"
            });
        }
        const records = data[0];
        res.status(201).send({
            success: true,
            message: 'New Job created',
            records
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'error in get job by Id',
            err
        })
    }
}

const updateJob = async (req: Request, res: Response) => {
    try {
        const jobID = req.params.id;
        if (!jobID) {
            return res.status(404).send({
                success: false,
                message: "Invalid or Provide job id"
            });
        }

        const { title, company, location, salary, description } = req.body;
        const data = await db.query(`UPDATE jobs SET title = ?, company=?,location=?,salary=?,description=? WHERE jobs.id=?`, [title, company, location, salary, description, jobID]);
        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in Update Job data"
            });
        }
        res.status(200).send({
            success: true,
            message: "update done in jobs"
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "error in upating job",
            err
        })
    }
}


const deleteJob = async (req: Request, res: Response) => {
    try {
        const jobID = req.params.id;
        if (!jobID) {
            return res.status(404).send({
                success: false,
                message: "Invalid Job id"
            });
        }

        const data = await db.query('DELETE FROM jobs WHERE jobs.id=?', [jobID]);
        if (!data) {
            return res.status(500).send({
                success: false,
                message: "Error in Update Job data"
            });
        }
        res.status(200).send({
            success: true,
            message: "update done in jobs"
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "error in upating job",
            err
        })
    }
}



module.exports = { getJobs, getJobById, addJobs, updateJob, deleteJob };