import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults';
import Spinner from '../../assets/Spinner';
import { Divider } from "primereact/divider";
import { ScrollPanel } from "primereact/scrollpanel";
import InviteCard from './InviteCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchMoreData } from '../../utils/utils';

const InvitePage = () => {
    const [loaded, setLoaded] = useState(false)
    const [userList, setUserList] = useState({ results: [] });

    useEffect(() => {
      const handleMount = async () => {
          try {
            const [{ data: userList }] = await Promise.all([
              axiosReq.get(`/api/profiles/invite/`),
            ]);
            setUserList(userList)
            setLoaded(true)
          } catch (err) {
          }
        };
        handleMount();
  }, []);

    const pageContent = (
      <>
      <Divider align="left">
        <div className="inline-flex align-items-center">
          <i className="pi pi-envelope mr-2"></i>
          <b>Invite Users</b>
        </div>
      </Divider>
      <ScrollPanel style={{ width: "100%", height: "40vh" }}>
        <div>
          {userList.results.length ? (
            <InfiniteScroll
            className="flex justify-content-start flex-wrap"
            children={userList.results.map((object) => (
              <InviteCard key={object.id} url='/api/invite/' id={object.id} title={'User:'} count={object.owner} message={''} icon={object.avatar} display={true}/>
            ))}
            dataLength={userList.results.length}
            loader={<Spinner />}
            hasMore={!!userList.next}
            next={() => fetchMoreData(userList, setUserList)}
            />
          )
          : <InviteCard title='0' count='Workstreams' message='Available' icon='pi pi-folder' display={true}/>
          }
          
        </div>
      </ScrollPanel>
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

export default InvitePage
