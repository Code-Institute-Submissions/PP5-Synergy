import React, { useRef, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from 'primereact/dropdown';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Sidebar } from 'primereact/sidebar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
import { StyleClass } from 'primereact/styleclass';

const TaskForm = ({ url, visible, setVisible, setAttribute, edit}) => {
    const currentUser = useCurrentUser()
    const [errors, setErrors] = useState({})
    const stepperRef = useRef(null);

    const btnRef1 = useRef(null);
    const btnRef2 = useRef(null);
    const btnRef3 = useRef(null);
    const btnRef4 = useRef(null);

    const [selectedPriority, setSelectedPriority] = useState(null);
    const priorityOption = [
        { name: 'No-priority', code: 1 },
        { name: 'Low-priority', code: 2 },
        { name: 'Medium-priority', code: 3 },
        { name: 'High-priority', code: 4 },
    ];

    const [inputData, setInputData] = useState({
        name: '',
        detail: '',
        priority: 1,
        deadline: '',
        category: null,
        project: null,
        owner: null,
      });
      const { 
        name,
        detail,
        priority,
        deadline,
        category,
        project,
        owner,
      } = inputData;


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(edit) {
                const { data } = await axiosReq.put(url, inputData);
                setAttribute(data.name);
                console.log('edit')
                
            }
            else {
                const { data } = await axiosReq.post(url, inputData);
                setAttribute((prevState) => ({
                    ...prevState,
                    results: [data, ...prevState.results],
                }));
                console.log('create')
            }
            
            
        } catch (err) {
            setErrors(err.response?.data);
        }
        setVisible(false)
    }

    const handleChange = (event) => {
        setInputData({
            ...inputData,
            [event.target.name]: event.target.value,
            })
    };

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
                                        <InputText value={name} onChange={handleChange} id='name' label='name' name='name'/>
                                        <label htmlFor="name">Task Name</label>
                                     </FloatLabel>
                                    <FloatLabel className='mt-4 mx-1'>
                                        <InputTextarea autoResize id='detail' name='detail' value={detail} onChange={handleChange} rows={5} cols={30}/>
                                        <label htmlFor="detail" >Detail</label>
                                    </FloatLabel>
                                    <Dropdown value={selectedPriority} onChange={(e) => setSelectedPriority(e.value)} options={priorityOption} optionLabel="name" 
                                    showClear placeholder="Task Priority" className="w-full" />
                                    <ul className="list-none p-3 m-0">
                                        <li>
                                            <StyleClass nodeRef={btnRef4} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                <div ref={btnRef4} className="p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer">
                                                    <span className="font-medium">APPLICATION</span>
                                                    <i className="pi pi-chevron-down"></i>
                                                    <Ripple />
                                                </div>
                                            </StyleClass>
                                            <ul className="list-none p-0 m-0 overflow-hidden">
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-folder mr-2"></i>
                                                        <span className="font-medium">Projects</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-chart-bar mr-2"></i>
                                                        <span className="font-medium">Performance</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
                                                        <i className="pi pi-cog mr-2"></i>
                                                        <span className="font-medium">Settings</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-auto">
                                    <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
                                    <a v-ripple className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
                                        <span className="font-bold">Amy Elsner</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            ></Sidebar>
        // <Dialog
        //         visible={visible}x
        //         modal
        //         onHide={() => {if (!visible) return; setVisible(false); 
        //             setInputData(inputData); }}
        //         content={({ hide }) => (
        //             <div className="flex flex-column px-8 py-3 gap-2" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
        //                 <div className="inline-flex flex-column gap-1">
        //                     <h3 className="text-primary-50 font-semibold my-2">{edit ? 'Edit Task' : 'Create Task'}</h3>
        //                     <Stepper ref={stepperRef} pt={{panelContainer: {style: {background: 'transparent'}}}}>
        //                         <StepperPanel header="Step 1">
        //                             <FloatLabel className='mt-4'>
        //                                 <InputText value={name} onChange={handleChange} id='name' label='name' name='name' className="bg-white-alpha-20 border-none p-1 text-primary-50"/>
        //                                 <label htmlFor="name" className="text-primary-50 font-semibold">Task Name</label>
        //                             </FloatLabel>
        //                             <FloatLabel className='mt-4'>
        //                                 <InputTextarea autoResize id='detail' name='detail' value={detail} onChange={handleChange} rows={5} cols={30} className="bg-white-alpha-20 border-none p-1 text-primary-50"/>
        //                                 <label htmlFor="detail" className="text-primary-50 font-semibold">Detail</label>
        //                             </FloatLabel>
        //                         </StepperPanel>
        //                         <StepperPanel header="Step 2">
        //                             <FloatLabel className='mt-4'>
        //                                 <InputText value={name} onChange={handleChange} id='name' label='name' name='name' className="bg-white-alpha-20 border-none p-1 text-primary-50"/>
        //                                 <label htmlFor="name" className="text-primary-50 font-semibold">Task Name</label>
        //                             </FloatLabel>
        //                             <FloatLabel className='mt-4'>
        //                                 <InputTextarea id='detail' name='detail' value={detail} onChange={handleChange} rows={5} cols={30} className="bg-white-alpha-20 border-none p-1 text-primary-50"/>
        //                                 <label htmlFor="detail" className="text-primary-50 font-semibold">Detail</label>
        //                             </FloatLabel>
        //                         </StepperPanel>
        //                         <StepperPanel header="Header III">
        //                             <FloatLabel className='mt-4'>
        //                                 <InputText value={name} onChange={handleChange} id='name' label='name' name='name' className="bg-white-alpha-20 border-none p-1 text-primary-50"/>
        //                                 <label htmlFor="name" className="text-primary-50 font-semibold">Task Name</label>
        //                             </FloatLabel>
        //                             <FloatLabel className='mt-4'>
        //                                 <InputTextarea id='detail' name='detail' value={detail} onChange={handleChange} rows={5} cols={30} className="bg-white-alpha-20 border-none p-1 text-primary-50"/>
        //                                 <label htmlFor="detail" className="text-primary-50 font-semibold">Detail</label>
        //                             </FloatLabel>
        //                         </StepperPanel>
        //                     </Stepper>
        //                 </div>
        //                 <div className="flex align-items-center gap-2">
        //                     <Button label="Submit" onClick={handleSubmit} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
        //                     <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
        //                 </div>
        //             </div>
        //         )}
        //     ></Dialog>
    )
}

export default TaskForm
