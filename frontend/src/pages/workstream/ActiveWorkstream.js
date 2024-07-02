import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults'
import { Fieldset } from 'primereact/fieldset';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';

const ActiveWorkstream = () => {
    const { id }  = useParams()
    const [workstream , setWorkstream] = useState({results: []})
    const [category, setCategory] = useState({results: []})
    const [project, setProject] = useState({results: []})
    const [task, setTask] = useState({results: []})
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleMount = async () => {
          try {
            const [{ data: workstream }] = await Promise.all([
              axiosReq.get(`/api/workstream/${id}`),
            ]);
            setWorkstream({ results: [workstream] });
            console.log(workstream)
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
                    <h4>Categories:</h4>
                </div>
                <div>
                    <h4>Projects:</h4>
                </div>
                <div>
                    <h4>Tasks:</h4>
                </div>
            </Fieldset>
              ))
        ) : null
        }
        
        </>
    )
}

export default ActiveWorkstream
