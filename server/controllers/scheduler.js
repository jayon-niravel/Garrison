const { SchedulerClient, CreateScheduleCommand,
        DeleteScheduleCommand, ListSchedulesCommand,
        UpdateScheduleCommand, GetScheduleCommand,
    } = require("@aws-sdk/client-scheduler");


const client = new SchedulerClient();
const {
  validationResult
} = require('express-validator');

/*
* Create AWS Scheduler
* @param req.body.name: name of the task
* @param req.body.scheduleExpression: must be of type cron | at | rate 
* @param req.body.startDate: start timestamp
* @param req.body.endDate: end timestamp
*/
exports.createScheduler = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array().map(e => `Error in ${e.param}: ${e.msg}`).join('\n');
        throw error;
        }    
        const input = { 
            Name: req.body.name,
            ScheduleExpression: req.body.scheduleExpression,
            StartDate: new Date(req.body.startDate),
            EndDate: new Date(req.body.endDate),
            Description: req.body.description,
            ScheduleExpressionTimezone: process.env.AWS_SCHEDULE_TIMEZONE,
            State: "ENABLED",
            Target: { 
                Arn: process.env.AWS_SCHEDULE_TARGET_ARN,
                RoleArn: process.env.AWS_SCHEDULE_ROLEARN,
                RetryPolicy: {
                MaximumRetryAttempts: Number("5")
                },
            },
            FlexibleTimeWindow: { 
                Mode: "OFF"
            }
        };
        // create new AWS scheduler
        const command = new CreateScheduleCommand(input);
        const response = await client.send(command);
        console.log("response", response);
        res.status(200).json({
            message: 'Success!',
            data: response
          });
    } catch(err) {
         if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

/*
* Delete AWS Scheduler
* @param req.body.name: name of the task
*/
exports.deleteScheduler = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array().map(e => `Error in ${e.param}: ${e.msg}`).join('\n');
            throw error;
        }    
        const input = { 
            Name: req.body.name,
        };
        // Delete AWS scheduler
        const command = new DeleteScheduleCommand(input);
        const response = await client.send(command);
        res.status(200).json({
            message: 'Success!',
            data: response
          });
    } catch(err) {
         if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

/*
* List AWS Scheduler
*/
exports.getScheduler = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array().map(e => `Error in ${e.param}: ${e.msg}`).join('\n');
            throw error;
        }    
        const input = { };
        // list AWS scheduler
        const command = new ListSchedulesCommand(input);
        const response = await client.send(command);
        res.status(200).json({
            message: 'Success!',
            data: response
          });
    } catch(err) {
         if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

/*
* update AWS Scheduler
* @param req.body.name: name of the task
* @param req.body.scheduleExpression: must be of type cron | at | rate 
* @param req.body.startDate: start timestamp
* @param req.body.endDate: end timestamp
*/
exports.updateScheduler = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array().map(e => `Error in ${e.param}: ${e.msg}`).join('\n');
        throw error;
        }    
        const input = { 
            Name: req.body.name,
            ScheduleExpression: req.body.scheduleExpression,
            StartDate: new Date(req.body.startDate),
            EndDate: new Date(req.body.endDate),
            Description: req.body.description,
            ScheduleExpressionTimezone: process.env.AWS_SCHEDULE_TIMEZONE,
            State: "ENABLED",
            Target: { 
                Arn: process.env.AWS_SCHEDULE_TARGET_ARN,
                RoleArn: process.env.AWS_SCHEDULE_ROLEARN,
                RetryPolicy: {
                MaximumRetryAttempts: Number("5")
                },
            },
            FlexibleTimeWindow: { 
                Mode: "OFF"
            }
        };
        // create new AWS scheduler
        const command = new UpdateScheduleCommand(input);
        const response = await client.send(command);
        console.log("response", response);
        res.status(200).json({
            message: 'Success!',
            data: response
          });
    } catch(err) {
         if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

/*
* Get AWS Scheduler
* @param req.body.name: name of the task
*/
exports.getScheduler = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array().map(e => `Error in ${e.param}: ${e.msg}`).join('\n');
        throw error;
        }    
        const input = { 
            Name: req.body.name
        };
        // create new AWS scheduler
        const command = new GetScheduleCommand(input);
        const response = await client.send(command);
        console.log("response", response);
        res.status(200).json({
            message: 'Success!',
            data: response
          });
    } catch(err) {
         if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}