from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from datetime import datetime

#Define default arguments
default_args = {
 'owner': 'jayon',
 'start_date': datetime (2024, 6, 5),
 'retries': 1,
}

# Instantiate your DAG
dag = DAG ('dummy_dag', default_args=default_args, schedule_interval='@daily')

# Define tasks
def task1():
 print ("Executing Task 1")

def task2():
 print ("Executing Task 2")

task_1 = PythonOperator(
 task_id='task_1',
 python_callable=task1,
 dag=dag,
)
task_2 = PythonOperator(
 task_id='task_2',
 python_callable=task2,
 dag=dag,
)

# Set task dependencies
task_1 >> task_2