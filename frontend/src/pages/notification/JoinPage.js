import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';

const JoinPage = () => {
    const [loaded, setLoaded] = useState(false)
    const [workstreamList, setWorkstreamList] = useState({ results: [] });
    const navigate = useNavigate()
    

    useEffect(() => {
        const handleMount = async () => {
            try {
              const [{ data: workstreamList }] = await Promise.all([
                axiosReq.get(`/api/workstream/join/`),
              ]);
              setWorkstreamList(workstreamList)
              console.log(workstreamList)
            } catch (err) {
            }
          };
          handleMount();
    }, []);

    return (
        <div>
            join
        </div>
    )
}

export default JoinPage
