import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton
} from '@coreui/react'
import { axiosInstance } from 'src/axiosinstance'

// import usersData from './UsersData'
const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
let i=-1;
let arr2=[]
const Users = () => {
  const [usersData,setUsersData]= useState([])
  const [hosts,setHosts]= useState([])
  const [reservations,setReservations]= useState([])

  const history = useHistory()
  // const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  // const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  // const [page, setPage] = useState(currentPage)

  // const pageChange = newPage => {
  //   currentPage !== newPage && newPage!==0 && history.push(`/users?page=${newPage}`)
  // }
  // function delay(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
  
  useEffect(() => {

    axiosInstance.get("/users/")
    .then( function(response){
      // console.log(response.data);
      setUsersData(response.data)
      let arr=[]
       for (let index = 0; index < response.data.length;index++) {
       
        //  dela
        //  setTimeout(() => {
          //  console.log('1');
          const element = response.data[index];
          axiosInstance.get(`/reservations/foruser/${element._id}`)
            .then(function(response){
             i++
              arr=[...arr,{i:response.data.length,j:element._id}];
            //  console.log(arr);
            //     (function (e){
            //       console.log(e)
            //      setReservations([...reservations,e])
            // })(response.data.length)

            //  func(response)
               // console.log(response.data.length);
               // console.log(reservations)
            //  console.log(reservations);

             
             // return true
            })
            
            .catch(function(err){
              console.log(err);
            })
            
          // }, 5000);
      }
      // console.log(arr);
      setTimeout(() => {  setReservations(arr); }, 3000);      // setReservations(arr)
      //  console.log(reservations);
      //  // setFormData(response.data);
    })
    .catch(function(err){
      console.log(err);
    })
    axiosInstance.get("/hosting/hosts")
    .then(function(response){
      // console.log(response.data);
      setHosts(response.data)
      
    })
    .catch(function(err){
      console.log(err);
    })

    // let arr=[1,2,3];
    // let arr2=[...arr,4]
    // console.log(arr2);
    // currentPage !== page && setPage(currentPage)
  }, [])
  

  const isHost=(userItem)=>{
    let ishost=false;
    for (let index = 1; index <= hosts.length; index++) {
      // console.log(response.data[index].user_id===userItem._id);
      if(hosts[index-1].user_id===userItem._id){
        ishost=index;
        // // console.log(hosts[1].listings.place_ids.length)
      }
    }
    return ishost;
  }
  const reservationsSetting=(userItemId)=>{
    let flag=false;
    // console.log(flag);
    const elem=reservations.length>0?Object.entries(reservations).map(([key,value],index)=>{
        if(key==='user_id'){
          console.log(key);
          return value;
        }
    }):flag=true;
    for (let index = 0; index < elem.length; index++) {
      
      if(elem[index]===userItemId){
        console.log(elem[index]);
         flag=false;
      }
    }
    console.log(flag);

    if(flag){
    axiosInstance.get(`/reservations/foruser/${userItemId}`)
    .then(function(response){
      console.log(response.data);
     setReservations(response.data)
     console.log(reservations);
      return true
    })
    .catch(function(err){
      console.log(err);
    })
  }
  }
  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
          <h3><strong>Users</strong></h3>

            {/* <small className="text-muted"> example</small> */}
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={usersData}
            fields={[
              { key: 'fname', _classes: 'font-weight-bold' },
              'lname','email', 'phone_number','status','placesHosted','placesReserved', {
                key: 'show_details',
                label: '',
                _style: { width: '1%' },
                sorter: false,
                filter: false
              }
            ]}
            // hover
            striped
            // itemsPerPage={5}
            // activePage={page}
            clickableRows
            columnFilter
            tableFilter
            footer
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            sorter
            pagination
            onRowClick={(item) => {
              // item.preventDefault()
              // if(item){console.log();}
              history.push(`/users/${item._id}`)
              // console.log('from main')
            }}

            scopedSlots = {
              {
              'status':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(isHost(item) ?'Active':'Banned')}>
                      {isHost(item)?'Host':'User'}
                   </CBadge> 
                 </td>
                ),
            
            'placesHosted':
            (item)=>(
                <td>
                   {isHost(item)?hosts[isHost(item)-1].listings.place_ids.length:'0'}
                </td>
            ),
            'placesReserved':
            (item)=>{
              // let n;
              let arr2Flag=false;
              let j=item._id;
              for(let n=0;n<arr2.length;n++){
                
                if(j===arr2[n].k){
                  // console.log(arr2[n].k);
                  arr2Flag=true;
                }
                
              }
              // if(n===0){ arr2Flag=false;}
              if(!arr2Flag){arr2=[...arr2,{k:j}]}
              // console.log(arr2);
              // console.log(item);
              return(
                <td>
                  {/* {reservations.length>0&&console.log(reservations.length)} */}
                  {/*  */}
                  {reservations.length>0?

                  reservations.find((reservation)=>
                  //  items.find((item) => item.name === 'b')
                  // return i+1
                  // if(item._id===arrInd.k){
                  //   console.log(arrInd);
                  //   // if(i>=usersData.length){i=-1;}
                  //   i++;
                  //   console.log(i);
                  //   // console.log(i);
                  //   return i
                  // }
                  reservation.j===item._id
                  ).i
                :''}
                   {/* { reservationsSetting(item._id)&&reservations} */}
                </td>
            )},
            'show_details':
          (item, index)=>{
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={(e)=>{

                    // console.log(e);
                    console.log(item._id);
                    axiosInstance.delete(`/users/delete/${item._id}`)
                    .then(function(response){
                      console.log(response);
                      history.go(0);


                      // setHosts(response.data)
                      
                    })
                    .catch(function(err){
                      console.log(err);
                    })
                    e.stopPropagation();
                    //
                  }
                  }
                >
                  Delete
                </CButton>
              </td>
              )
          },
            }
          }
          />
          {/* <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={Math.ceil(usersData.length/5)}
            doubleArrows={false} 
            align="center"
          /> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
