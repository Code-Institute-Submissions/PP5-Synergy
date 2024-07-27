import React, { useEffect, useState } from 'react';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import ProfileSkeleton from '../../components/ProfileSkeleton';
import { axiosReq } from '../../api/axiosDefaults';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';

const WorkstreamReport = () => {
    const currentUser = useCurrentUser();
    const [loaded, setLoaded] = useState(false);
    const [workstream, setWorkstream] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [{ data: workstream }] = await Promise.all([
                axiosReq.get(`api/workstream/active/`),
            ]);
            if(workstream.results.length > 0) {
                setWorkstream(workstream.results[0]?.workstream);
            }
            setLoaded(true);
          } catch (err) {}
        };
        fetchData();
    }, [currentUser]);
    
    const pageContent = (
        <>
            <div className={"col-12 md:col-6 lg:col-3"}>
                <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                <div className="flex justify-content-between mb-1">
                    <div>
                    <span className="block text-500 font-medium mb-1">Workstream :</span>
                    <div className="text-900 font-medium text-xl">{workstream.name}</div>
                    </div>
                    <div
                    className="flex align-items-center justify-content-center bg-primary-100 border-round"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                    >
                    <Avatar icon='pi pi-folder' />
                    </div>
                </div>
                <div className="flex justify-content-between">
                    <span className="text-primary-500 font-medium">{workstream.users?.length} {workstream.users?.length >= 2 ? 'Users' : 'User'}</span>
                    <Tag
                        className="cursor-pointer"
                        severity="primary"
                        value='View'
                        onClick={() => {navigate('/workstream/active')}}
                        ></Tag>
                </div>
                </div>
            </div>
        </>

    )

    return (
        <>
            {loaded
            ? pageContent
            : <ProfileSkeleton />
            }
        </>
    )
}

export default WorkstreamReport
