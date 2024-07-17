import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosReq } from '../../api/axiosDefaults';
import Spinner from '../../assets/Spinner';

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
              setLoaded(true)
              console.log(workstreamList)
            } catch (err) {
            }
          };
          handleMount();
    }, []);

    const pageContent = (
      <>
      </>
    )

    return (
      <div className="card h-screen">
        {loaded 
        ? pageContent
        : (
          <Spinner />
        )
        }
    </div>
    )
}

export default JoinPage
