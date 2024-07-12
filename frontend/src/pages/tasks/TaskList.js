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
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [rerun, setRerun] = useState(false)
  const [editID, setEditID] = useState()
  const [taskObj, setTaskObj] = useState({})

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: taskList }] =
          await Promise.all([
            axiosReq.get(`/api/tasklist/`),
            // axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setTaskList(taskList);
        console.log(taskList);
      } catch (err) {
        setErrors(err)
      }
    };
    fetchData();
  }, [rerun]);

  return (
    <div className="card">
      <Divider className='my-1' align="right">
        <Button label="Create Task" icon="pi pi-plus" className="p-button-outlined" size='small' onClick={() => setVisible(true)}></Button>
      </Divider>
      <ScrollPanel style={{ width: '100%', height: '90vh' }}>
      <ul className="card flex flex-column flex-wrap gap-2 list-none px-0">
        { taskList.results.length ? (
            taskList.results.map((object) => (
                <li className='flex flex-column gap-3 md:flex-row md:align-items-center p-2 border-bottom-1 surface-border' key={object.id}><WorkstreamTask props={object} setID={setEditID} setVisible={setVisibleEdit} setObject={setTaskObj}/></li>
            ))
            ) : (
            <span>No tasks</span>
        )}
    </ul>

      </ScrollPanel>
      <OptionsContext>
        <TaskForm url={`/api/task/create/`} visible={visible} setVisible={setVisible} setAttribute={setTaskList} refresh={rerun} setRefresh={setRerun} edit={false}/>
        <TaskForm url={`/api/task/${editID}/`} taskObj={taskObj} visible={visibleEdit} setVisible={setVisibleEdit} refresh={rerun} setRefresh={setRerun} edit={true}/>
      </OptionsContext>
    </div>
  )
}

export default TaskList
