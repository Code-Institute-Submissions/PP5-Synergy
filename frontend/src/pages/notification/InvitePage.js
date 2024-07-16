import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';

const InvitePage = () => {
    const [loaded, setLoaded] = useState(false)
    const [userList, setUserList] = useState({ results: [] });
    const navigate = useNavigate()
    

    useEffect(() => {
        const handleMount = async () => {
          try {
            const [{ data: userList }] = await Promise.all([
              axiosReq.get(`/api/workstream/join/`),
            ]);
            setUserList(userList)
          } catch (err) {
          }
        };
        handleMount();
    }, []);
    
    return (
        <div>
            invite
        </div>
    )
}

export default InvitePage
