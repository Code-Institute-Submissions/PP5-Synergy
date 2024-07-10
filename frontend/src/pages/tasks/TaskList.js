import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import TaskForm from '../tasks/TaskForm'
import { OptionsContext } from '../../contexts/OptionsContext';
import WorkstreamTask from '../../components/WorkstreamTask';

const TaskList = () => {
  const [errors, setErrors] = useState({});
  const [taskList , setTaskList] = useState({ results: [] })
  const [visible, setVisible] = useState(false)

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: taskList }] =
          await Promise.all([
            axiosReq.get(`/api/task/`),
            // axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setTaskList(taskList);
        console.log(taskList);
      } catch (err) {
        setErrors(err)
      }
    };
    fetchData();
  }, []);

  return (
    <div className="card">
      <Divider className='my-1' align="right">
        <Button label="Create Task" icon="pi pi-plus" className="p-button-outlined" size='small' onClick={() => setVisible(true)}></Button>
      </Divider>
      <ScrollPanel style={{ width: '100%', height: '90vh' }}>
      <ul className="card flex flex-column flex-wrap gap-2 list-none px-0">
        { taskList.results.length ? (
            taskList.results.map((object, idx) => (
                <li key={idx}><WorkstreamTask {...object}/></li>
            ))
            ) : (
            null
        )}
    </ul>

      </ScrollPanel>
      <OptionsContext>
        <TaskForm url={`/api/task/`} visible={visible} setVisible={setVisible} setAttribute={setTaskList} edit={false}/>
      </OptionsContext>
    </div>
  )
}

export default TaskList
