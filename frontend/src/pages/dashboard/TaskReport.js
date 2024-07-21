import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import ProfileSkeleton from '../../components/ProfileSkeleton';
import { axiosReq } from '../../api/axiosDefaults';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';

const TaskReport = () => {
    const currentUser = useCurrentUser()
    const [loaded, setLoaded] = useState(false)
    const [profileData, setProfileData] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [{ data: profileData }] = await Promise.all([
                axiosReq.get(`/api/profiles/${currentUser.pk}/`),
            ]);
            setProfileData(profileData);
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
                    <span className="block text-500 font-medium mb-1">Tasks :</span>
                    <div className="text-900 font-medium text-xl">Pending : {profileData.pending}</div>
                    </div>
                    <div
                    className="flex align-items-center justify-content-center bg-primary-100 border-round"
                    style={{ width: "2.5rem", height: "2.5rem" }}
                    >
                    <Avatar icon='pi pi-list-check' />
                    </div>
                </div>
                <div className="flex justify-content-between">
                    <span className="text-primary-500 font-medium">Completed : {profileData.completed}</span>
                    <Tag
                        className="cursor-pointer"
                        severity="primary"
                        value='View'
                        onClick={() => {navigate('/task')}}
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

export default TaskReport
