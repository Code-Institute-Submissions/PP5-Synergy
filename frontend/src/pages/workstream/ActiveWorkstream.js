import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults'
import { Fieldset } from 'primereact/fieldset';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import { TabView, TabPanel } from 'primereact/tabview';
import { Chip } from 'primereact/chip';
import { Message } from 'primereact/message';

const ActiveWorkstream = () => {
    const { id }  = useParams()
    const [workstream , setWorkstream] = useState({results: []})
    const [category, setCategory] = useState({results: []})
    const [project, setProject] = useState({results: []})
    const [task, setTask] = useState({results: []})
    const [errors, setErrors] = useState({});

    const newBtn = (
        <>
            <span className="bg-primary border-circle w-2rem h-2rem flex align-items-center justify-content-center pi pi-plus"></span>
            <span className="ml-2 font-medium">New</span>
        </>
    );

    useEffect(() => {
        const handleMount = async () => {
          try {
            const [{ data: workstream }, { data: category }] = await Promise.all([
              axiosReq.get(`/api/workstream/${id}`),
              axiosReq.get(`/api/category/`),
              axiosReq.get(`/api/project/`),
            ]);
            setWorkstream({ results: [workstream] });
            setCategory(category);
            setProject(project);
            console.log(workstream, category)
          } catch (err) {
            setErrors(err.response?.data);
            console.log(errors)
          }
        };
    
        handleMount();
    }, [id]);
    
    return (
        <>
        { workstream.results.length ? (
            workstream.results.map((object, idx) => (
                <Fieldset key={idx} legend={object.name}>
                <h4>Author:<span className='text-color-secondary px-2'>{object.owner.username}</span></h4>
                <div>
                    <h4>Users:</h4>
                    <div className="card flex justify-content-start">
                        <AvatarGroup>
                            {object.users?.map((user, idx) => (
                                <Avatar image={user?.profile_avatar} size="large" shape="circle" />
                            ))}
                            <Avatar label="+" shape="circle" size="large"/>
                        </AvatarGroup>
                    </div>
                </div>
                <div>
                    <TabView>
                        <TabPanel header="Categories">
                            <div className="card flex flex-wrap gap-2">
                                { category.results.length ? (
                                    category.results.map((object, idx) => (
                                        <Chip label={object.name} key={idx}/>
                                    ))
                                    ) : (
                                    <Message className='py-0 px-1' severity="warn" text="Category Required" />
                                )}
                                <Chip className="pl-0 pr-3" template={newBtn}/>
                            </div>
                        </TabPanel>
                        <TabPanel header="Projects">
                            <div className="card flex flex-wrap gap-2">
                                { project.results.length ? (
                                    project.results.map((object, idx) => (
                                        <Chip label={object.name} key={idx}/>
                                    ))
                                    ) : (
                                    null
                                )}
                                <Chip className="pl-0 pr-3" template={newBtn}/>
                            </div>
                        </TabPanel>
                    </TabView>
                </div>
                <div>
                    <TabView>
                        <TabPanel header="Available Tasks">
                            <p className="m-0">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </TabPanel>
                        <TabPanel header="Assigned Tasks">
                            <p className="m-0">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                                eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                                enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui 
                                ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                            </p>
                        </TabPanel>
                    </TabView>
                </div>
            </Fieldset>
              ))
        ) : null
        }
        
        </>
    )
}

export default ActiveWorkstream
