import DataTable from 'react-data-table-component';
import React, { useState, useEffect } from 'react';
import { Header } from '../../layout';
import SchedulerAPIService from "../../api/scheduler.api";
import { useNavigate } from 'react-router-dom';
import './list.css';

export default function List() {
	
  const [content, setcontent] = useState([]);

  	useEffect(() => {
        getListOfTasks();
 	}, [setcontent]);
	const navigate = useNavigate();	

	const getListOfTasks = async () => {
		const [response, error] = await SchedulerAPIService.list();
		if(error) {
			alert('unable to fetch the data')
		} else {
			console.log("response",response);
			setcontent(response?.data?.Schedules)
		}
	}	

	const deleteTask = async (e: any, row: any) => {
		if(!row) {
			return;
		}
		const payload = {
			"name": row
		}
		const [response, error] = await SchedulerAPIService.delete(payload);
		if(error) {
			alert('unable to delete the task')
		} else {
			getListOfTasks();
		}		

	}

	const editTask = async (e: any, row: any) => {
		if(!row) {
			return;
		}
		const payload = {
			"name": row
		}
		navigate('/dashboard/create', {
          state: {
            name: row,
          },
        })		

	}	

	const columns = [
		{
			name: 'Name',
			selector: (row: any) => row.Name,
		},
		{
			name: 'State',
			selector: (row: any) => row.State,
		},
		{
			name: 'Creation Date',
			selector: (row: any) => row.CreationDate,
		},
		{
			name: 'Modified Date',
			selector: (row: any) => row.LastModificationDate,
		},		
		{
			name: "Actions",
			button: true,
			cell: (row:any) => (
				<button
					className="btn btn-outline btn-xs"
					onClick={(e) => deleteTask(e, row.Name)}
				>
					delete
				</button>
			),
		},
		{
			name: "Actions",
			button: true,
			cell: (row:any) => (
				<button
					className="btn btn-outline btn-xs"
					onClick={(e) => editTask(e, row.Name)}
				>
					edit
				</button>
			),
		}							
];



  return (
	<>
	 <Header />
	 <div className="list">
		<header className="list-header">
			<DataTable
			columns={columns}
			data={content}
			pagination
			/>
	 </header>
	 </div>	
	</>
  );
}