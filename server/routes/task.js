const schedulerController = require('../controllers/scheduler');
const { isAuth } = require('../middlewares/is-auth');
const express = require('express');
const {
  body
} = require('express-validator');
const router = express.Router();


router.get('/list', isAuth, schedulerController.getScheduler);

router.get('/get',  [
  body('name')
    .notEmpty()
    .trim()   
], isAuth, schedulerController.getScheduler);

router.post('/create',  [
  body('name')
    .notEmpty()
    .trim(),
  body('scheduleExpression')
    .notEmpty()
    .trim(),
  body('startDate')
    .notEmpty()
    .trim(),
  body('endDate')
    .notEmpty()
    .trim(),        
], isAuth, schedulerController.createScheduler);

router.delete('/delete',  [
  body('name')
    .notEmpty()
    .trim(),     
], isAuth, schedulerController.deleteScheduler);

router.patch('/update',  [
  body('name')
    .notEmpty()
    .trim(),
  body('scheduleExpression')
    .notEmpty()
    .trim(),
  body('startDate')
    .notEmpty()
    .trim(),
  body('endDate')
    .notEmpty()
    .trim(),        
], isAuth, schedulerController.updateScheduler);

module.exports = router;