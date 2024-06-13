const express = require('express');
const router = express.Router();
const Job = require('../models/JobModel');

// Add a job
router.post('/add', async (req, res) => {
  try {
    const { title, company, description } = req.body;
    if (!title || !company || !description) {
      return res.status(400).json({ error: "Please provide all the job details." });
    }

    const newJob = new Job({
      title,
      company,
      description
    });

    await newJob.save();
    res.status(201).json({ message: "Job added successfully.", job: newJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// List all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
