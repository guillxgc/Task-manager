const express = require('express');
const Task = require('../models/Task');
const router = new express.Router();

/*CREATE A NEW TASK*/
router.post('/', async (req, res) => {
    const task = new Task(req.body);

    try{
        await task.save();
        res.status(201).send(task);
    }catch (e){
        res.status(400).send(e);
    }
});

/*GET ALL TASKS*/
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
});

/*GET TASK BY ID*/
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);

        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

/*UPDATE TASK BY ID*/
router.put('/:id', async(req, res) => {
    const { id } = req.params;
    const updates = req.body;
    
    try {
        const task = await Task.findOneAndUpdate({_id: id}, 
            updates, 
            {
                new: true,
                runValidators: true
            }
        );

        if(!task){
            return res.status(404).send('Task not found.');
        }
        res.send(task);
    } catch (e) {
        res.status(400).send({e: 'Error updating task.'});
    }
});

/*DELETE A TASK*/
router.delete('/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if(!task){
            return res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;