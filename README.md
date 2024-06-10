# Garrison Design Document


## Introduction:


Garrison is a task scheduler application in which a client can register a task. The task will be picked up and executed within 10 seconds of its scheduled time


## Proposal:


Approach 1: Implement Airflow where the workflow can be scheduled via REST API.
Approach 2: Integrate AWS EventBridge Scheduler and create the task using available SDK.

Verdict: Comparing above line of actions, approach 2 was selected which is more suitable for the given use case. It is difficult to link Airflow using the REST API which might take longer duration for implementation. Approach 2 is cost effective as well.

## Technology:

Frontend: React
Backend Server: NodeJs + ExpressJs
Scheduler: AWS EventBridge



## User Workflow

Below are the sequence where user can schedule a task:


- Sign up by navigation to the home page
- Log in to the portal using email and password
- Navigate to the dashboard where the view of existing task will be displayed
- Click on create link to schedule a new task
- Provide the task details and hit submit and the user will be redirected to the view page
- Users can also edit or delete any existing task.





## Task Scheduling
There are certain criteria for successfully creating new tasks. Below mentioned parameters should be provided in their expected format.

Parameter | Format | Example

name | string | sampleTask 

scheduleExpression | string | The expression that defines when the schedule runs. The following formats are supported.
at expression - at(yyyy-mm-ddThh:mm:ss)
rate expression - rate(value unit)
cron expression - cron(fields)
Eg: For every 5 min; "rate(5 minutes)"
OR cron(*/5 * ? * * *)
Note: The ‘at’ expression can be used for one time, while ‘rate’ and ‘cron’ are for recurring tasks.


startDate | Date | June 10, 2024 18:30:00

endDate | Date | June 10, 2024 18:30:00




## Testing
Below steps should be followed to test the Garrison project locally.
Git clone the project in your local machine. The link is provided towards the end of the document.
### Setup Frontend
Run npm install under the /dashboard folder
npm start command for development server
Frontend server runs at http://localhost:3000/

### Setup Backend
Set the .env variable under /server folder
Add below variables

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION='us-east-2'
AWS_SCHEDULE_TIMEZONE='America/Chicago'
AWS_SCHEDULE_TARGET_ARN=''
AWS_SCHEDULE_ROLEARN=''

Run docker compose up under /server folder
Backend server runs at http://localhost:5000/
