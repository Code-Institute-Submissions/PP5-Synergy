import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import TaskForm from '../tasks/TaskForm'
import { OptionsContext } from '../../contexts/OptionsContext';
import WorkstreamTask from '../../components/WorkstreamTask';
import Spinner from '../../components/Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from '../../utils/utils';

const TaskList = () => {
  const [errors, setErrors] = useState({});
  const [taskList , setTaskList] = useState({ results: [] })
  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [rerun, setRerun] = useState(false)
  const [editID, setEditID] = useState()
  const [taskObj, setTaskObj] = useState({})
  const [loaded, setLoaded] = useState(false)
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: taskList }] =
          await Promise.all([
            axiosReq.get(`/api/tasklist/`),
          ]);
        setTaskList(taskList);
        setLoaded(true)
      } catch (err) {
        setErrors(err)
      }
    };
    fetchData();
  }, [rerun]);

  const pageContent = (
    <>
      <Divider className='my-1' align="right">
          <Button label="Create Task" icon="pi pi-plus" className="p-button-outlined" size='small' onClick={() => setVisible(true)}></Button>
        </Divider>
        <ScrollPanel style={{ width: '100%', height: '90vh' }}>
        <Divider className='my-1' align="left">
            <div className="inline-flex align-items-center">
                <i className="pi pi-calendar-clock mr-2"></i>
                <b>Todo</b>
            </div>
        </Divider>
        <ul className="card flex flex-column flex-wrap gap-2 my-0 list-none px-0">
            { taskList.results.length ? (
              <InfiniteScroll
                children={taskList.results.map((object) => (
                  object.is_completed !== true &&
                    <li className='flex flex-column gap-3 md:flex-row md:align-items-center p-2 border-bottom-1 surface-border' key={object.id}><WorkstreamTask props={object} resource={taskList} setResource={setTaskList} setID={setEditID} setVisible={setVisibleEdit} setObject={setTaskObj} editList={true}/></li>
                ))}
                dataLength={taskList.results.length}
                loader={<Spinner />}
                hasMore={!!taskList.next}
                next={() => fetchMoreData(taskList, setTaskList)}
              />
              ) : (
                <span>No tasks</span>
            )}
        </ul>
        <Divider className='my-1' align="left">
            <div className="inline-flex align-items-center">
                <i className="pi pi-check-square mr-2"></i>
                <b>Completed</b>
            </div>
        </Divider>
        <ul className="card flex flex-column flex-wrap gap-2 my-0 list-none px-0">
            { taskList.results.length ? (
                <InfiniteScroll
                children={taskList.results.map((object) => (
                  object.is_completed &&
                    <li className='flex flex-column gap-3 md:flex-row md:align-items-center p-2 border-bottom-1 surface-border' key={object.id}><WorkstreamTask props={object} resource={taskList} setResource={setTaskList} setID={setEditID} setVisible={setVisibleEdit} setObject={setTaskObj} editList={true}/></li>
                ))}
                dataLength={taskList.results.length}
                loader={<Spinner />}
                hasMore={!!taskList.next}
                next={() => fetchMoreData(taskList, setTaskList)}
              />
                ) : (
                <span>No tasks</span>
            )}
        </ul>
        </ScrollPanel>
      </>
  )

  return (
    <div className="card">
      {loaded
      ? pageContent
      : <Spinner />
      }
      
      <OptionsContext>
        <TaskForm url={`/api/task/create/`} visible={visible} setVisible={setVisible} setAttribute={setTaskList} refresh={rerun} setRefresh={setRerun} edit={false}/>
        <TaskForm url={`/api/task/${editID}/`} taskObj={taskObj} visible={visibleEdit} setVisible={setVisibleEdit} refresh={rerun} setRefresh={setRerun} edit={true}/>
      </OptionsContext>
    </div>
  )
}

export default TaskList
