import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from 'primereact/dropdown';
import { Sidebar } from 'primereact/sidebar';
import { Calendar } from 'primereact/calendar';
import { ToggleButton } from 'primereact/togglebutton';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { useOptions } from '../../contexts/OptionsContext';
import { Message } from 'primereact/message';


const TaskForm = ({ url, visible, setVisible, setAttribute, refresh, setRefresh, edit, taskObj}) => {
    const currentUser = useCurrentUser()
    const [errors, setErrors] = useState({})
    const optionsDropdown = useOptions()
    const [checked, setChecked] = useState(false);
    const [date, setDate] = useState(Date())
    const [inputData, setInputData] = useState({
        name: '',
        detail: '',
        priority: 1,
        deadline: null,
        category: null,
        project: null,
        owner: null,
        is_completed: false,
    });
    const { 
    name,
    detail,
    priority,
    deadline,
    category,
    project,
    owner,
    is_completed
    } = inputData;
    
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedPriority, setSelectedPriority] = useState(null);
    const priorityOption = [
        { name: 'No-priority', id: 1 },
        { name: 'Low-priority', id: 2 },
        { name: 'Medium-priority', id: 3 },
        { name: 'High-priority', id: 4 },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(edit) {
                const { data } = await axiosReq.put(url, inputData);
                setRefresh(!refresh)
            }
            else {
                const { data } = await axiosReq.post(url, inputData);
                {data.is_owner && setRefresh(!refresh)}
            }
            setVisible(false)
            
        } catch (err) {
            console.log(err)
            setErrors(err.response?.data);
        }
    }

    const handleChange = (event) => {
        setInputData({
            ...inputData,
            [event.target.name]: event.target.value,
            })
    };

    const handleDateFormat = () => {
        let newDate = new Date(date).toLocaleDateString();
        let dateArray = newDate.split("/");
        let dateFormat = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0]
        setInputData({
            ...inputData,
            deadline: dateFormat,
            })
    };

    const changeInput = () => {
        let newDate = new Date(taskObj.deadline)
        
        {taskObj.project ? setInputData({
            ...inputData,
            name: taskObj.name,
            detail: taskObj.detail,
            priority: taskObj.priority,
            category: taskObj.category?.id,
            deadline: taskObj.deadline,
            owner: taskObj.owner?.pk,
            project: taskObj.project.id
        })
        :
        setInputData({
            ...inputData,
            name: taskObj.name,
            detail: taskObj.detail,
            priority: taskObj.priority,
            category: taskObj.category?.id,
            deadline: taskObj.deadline,
            owner: taskObj.owner?.pk
            })
        }
        setSelectedPriority(priorityOption[taskObj.priority - 1])
        setSelectedProject(taskObj.project)
        setSelectedCategory(taskObj.category)
        setDate(newDate)
        {taskObj.is_owner && setChecked(true)}
    }

    useEffect(() => {
        const handleMount = () => {
            {taskObj && changeInput()}
        };
        handleMount();
    }, [taskObj]);

    return (
        <Sidebar
                visible={visible}
                position="right"
                onHide={() => setVisible(false)}
                content={({ closeIconRef, hide }) => (
                    <div className="min-h-screen flex relative lg:static surface-ground">
                        <div id="app-sidebar-2" className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none" style={{ width: '100%' }}>
                            <div className="flex flex-column h-full">
                                <div className="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                                    <span className="inline-flex align-items-center gap-2">
                                        <span className="font-semibold text-2xl text-primary">Create Task</span>
                                    </span>
                                    <span>
                                        <Button type="button" ref={closeIconRef} onClick={(e) => hide(e)} icon="pi pi-times" rounded outlined className="h-2rem w-2rem"></Button>
                                    </span>
                                </div>
                                <div className="overflow-y-auto">
                                    <FloatLabel className='mt-4 mx-1'>
                                        {errors.name 
                                        ? <InputText invalid className='w-10' value={name} onChange={handleChange} id='name' label='name' name='name'/>
                                        : <InputText className='w-10' value={name} onChange={handleChange} id='name' label='name' name='name'/>
                                        }
                                        <label htmlFor="name">Task Name</label>
                                     </FloatLabel>
                                    {errors.name?.map((message, idx) => (
                                        <Message className="w-11 m-1" severity="error" text={message} key={idx}/>
                                    ))}
                                    <FloatLabel className='mt-4 mx-1'>
                                        <InputTextarea autoResize id='detail' name='detail' value={detail} onChange={handleChange} rows={4} cols={30}/>
                                        <label htmlFor="detail" >Detail</label>
                                    </FloatLabel>
                                    <Dropdown value={selectedPriority} onChange={(e) => {setSelectedPriority(e.value); setInputData({...inputData,priority: e.value?.id});}} options={priorityOption} optionLabel="name" 
                                    showClear placeholder="Task Priority" className="w-10 m-1" />
                                    {errors.category 
                                    ? <Dropdown invalid value={selectedCategory} onChange={(e) => {setSelectedCategory(e.value); {e.value !== undefined ? setInputData({...inputData,category: e.value.id}) : setInputData({...inputData,category: null})};}} options={optionsDropdown[0]} optionLabel="name" 
                                    showClear placeholder="Categories" className="w-10 m-1" />
                                    : <Dropdown value={selectedCategory} onChange={(e) => {setSelectedCategory(e.value); {e.value !== undefined ? setInputData({...inputData,category: e.value.id}) : setInputData({...inputData,category: null})};}} options={optionsDropdown[0]} optionLabel="name" 
                                    showClear placeholder="Categories" className="w-10 m-1" />
                                    }
                                    {errors.category?.map((message, idx) => (
                                        <Message className="w-11 m-1" severity="error" text={message} key={idx}/>
                                    ))}
                                    <Dropdown value={selectedProject} onChange={(e) => {setSelectedProject(e.value); {e.value !== undefined ? setInputData({...inputData,project: e.value.id}) : setInputData({...inputData,project: null})};}} options={optionsDropdown[1]} optionLabel="title" 
                                    showClear placeholder="Projects" className="w-10 m-1" />
                                    {errors.deadline 
                                    ? <Calendar invalid className='w-10 m-1' dateFormat="yy/mm/dd" value={date} name='deadline' onChange={(e) => {setDate(e.value); handleDateFormat()}} showButtonBar placeholder="Deadline" touchUI/>
                                    : <Calendar className='w-10 m-1' dateFormat="yy/mm/dd" value={date} name='deadline' onChange={(e) => {setDate(e.value); handleDateFormat()}} showButtonBar placeholder="Deadline" touchUI/>
                                    }
                                    {errors.deadline?.map((message, idx) => (
                                        <Message className="w-11 m-1" severity="error" text={message} key={idx}/>
                                    ))}
                                    <ToggleButton onLabel="Self Assigned" offLabel="Unassigned Task" onIcon="pi pi-check" offIcon="pi pi-times" 
                                    checked={checked} onChange={(e) => {setChecked(e.value); {e.value ? setInputData({...inputData,owner: currentUser.pk}) : setInputData({...inputData,owner: null})}}} className="w-10 m-1" />
                                </div>
                                <div className="mt-auto">
                                    <hr className="mb-1 mx-3 border-top-1 border-none surface-border" />
                                    <Button className='mx-2 my-1 w-11' label='Submit' onClick={handleSubmit} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            ></Sidebar>
    )
}

export default TaskForm
