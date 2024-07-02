import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ActiveWorkstream = () => {
    const { id }  = useParams()
    const [workstream , setWorkstream] = useState({ results: [] })
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
          } catch (err) {
          }
        };
    
        handleMount();
    }, [id]);
    
    return (
        <div>
        <p>{id}</p>
        </div>
    )
}

export default ActiveWorkstream
