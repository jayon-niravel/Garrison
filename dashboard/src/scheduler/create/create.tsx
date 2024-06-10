import { Header } from '../../layout';
import React, { useState, useEffect } from 'react';
import SchedulerAPIService from "../../api/scheduler.api";
import { useNavigate, useLocation } from 'react-router-dom';
import './create.css';

export default function Create() {

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [scheduleExpression, setScheduleExpression] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNavigated, setIsNavigated] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location?.state?.name) {
      setIsNavigated(location.state.name);
      getTasks(location.state.name)
    }
 	}, [setIsSubmitting]);

	const getTasks = async (name: string) => {
		const payload = {
			"name": name
		}    
		const [response, error] = await SchedulerAPIService.get(payload);
		if(error) {
			alert('unable to fetch the task')
		} else {
      setName(response?.data?.Name)
      setScheduleExpression(response?.data?.ScheduleExpression)
      setStartDate(response?.data?.StartDate)
      setEndDate(response?.data?.EndDate)
		}
	}	 

  const onSubmit =  async () => {
      setIsSubmitting(true);
    // submit the data
    const payload = {
      name: name,
      startDate: startDate,
      endDate: endDate,
      scheduleExpression: scheduleExpression,
    }
    if(isNavigated) {
      const [data, error] = await SchedulerAPIService.edit(payload);
      setIsSubmitting(false);
      if(error) {
      } else {
        navigate('/dashboard/list');
      }           
    } else {
      const [data, error] = await SchedulerAPIService.create(payload);
      setIsSubmitting(false);
      if(error) {
      } else {
        navigate('/dashboard/list');
      }      
    }
  }


  return (
    <>
      <Header />
        <div className="login-container task-margin">
          <div className="flex-item">
            <h2 className='text-center'>{isNavigated ? 'Edit Task': 'Create Task'}</h2>
            <form role="form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input disabled={(isNavigated?.trim()?.length || 0) > 0} type="text" className="form-control" id="name" value={name}
                onChange={(ev) => setName(ev.target.value)} placeholder="Enter name"></input>
              </div>
              <div className="form-group">
                <label htmlFor="expression">Expression</label>
                <input type="text" className="form-control" id="expression" value={scheduleExpression}
                onChange={(ev) => setScheduleExpression(ev.target.value)} placeholder="Enter expression"></input>
              </div>
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input type="text" className="form-control" id="startDate" value={startDate}
                onChange={(ev) => setStartDate(ev.target.value)} placeholder="Enter start date"></input>
              </div>       
              <div className="form-group">
                <label htmlFor="endDate">Start Date</label>
                <input type="text" className="form-control" id="endDate" value={endDate}
                onChange={(ev) => setEndDate(ev.target.value)} placeholder="Enter end date"></input>
              </div>                            
              <div className='text-center'>
                <button disabled={isSubmitting}  type="submit" className="btn btn-primary " onClick={onSubmit}>
                  Submit
                  {isSubmitting && <span>...</span>} 
                  </button>
              </div>
            </form>
          </div>
        </div> 
    </>
  );
    

}
