import React, { useState, useEffect } from "react";
import { axiosInstance } from 'src/axiosinstance'
// import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
// import { axiosInstance } from "src/axiosinstance";
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


let counter=0;
const UserPlaces = ({match}) => {
  const history = useHistory()
  const [userPlace, setUerPlace] = useState([]);
  const [placeTitle, setPlaceTitle] = useState([]);

  // const user = usersData.find( user => user.id.toString() === match.params.id)
  // const userDetails = userPlace ? Object.entries(userPlace) : 
  // [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
  
  useEffect(() => {  
    axiosInstance
      .get(`/hosting/hosts`)
      .then(function (response) {
        // console.log(response)
        for (let index = 0; index < response.data.length; index++) {
          if (response.data[index].user_id === match.params.id) {
            // console.log(response.data[index].listings.place_ids);
            setUerPlace(response.data[index].listings.place_ids);
            // console.log(response.data[index].listings.place_ids.length);
            // for (let i = 0; i < response.data[index].listings.place_ids.length; i++) {
              // const element = array[i];
              
            
          //   const elem=(response.data[index].listings.place_ids[i].place_id);
          //  console.log(elem);
            
            }
            // console.log(response.data);
          }
          // setFormData(response.data);
        }
     
      // }
      )
      .catch(function (err) {
        console.log(err);
      });
    

      // axiosInstance
      // .get(`/places/${placeId}`)
      // .then(function (response) {
      //   // console.log(response)
      //   for (let index = 0; index < response.data.length; index++) {
      //     if (response.data[index].user_id === match.params.id) {
      //       // console.log(response.data[index].listings.place_ids);
      //       setUerPlace(response.data[1].listings.place_ids);
      //   //    // console.log(response.data);
      //     }
      //    // setFormData(response.data);
      //   }
      // })
      // .catch(function (err) {
      //   console.log(err);
      // });

      // currentPage !== page && setPage(currentPage)
  }, [placeTitle])

  useEffect( () => () => counter=0, [] );

   const title=(myId,i)=>{
     if(counter===i ){

      axiosInstance.get(`/places/${myId}`)
      .then(function(response){
        // console.log(placeDetails);
        // console.log(place==true);

        //  if(response.data!==null){
        counter++;
        // console.log(response.data);        
        setPlaceTitle(...placeTitle,response.data.title)
            // return(response.data.title)
            // setPlace(
            //   [...place,response.data]
            //   )
        //  }
        // setFormData(response.data);
        })
      .catch(function(err){
        console.log(err);
        })
  }
}
//   const history = useHistory();
  return (
    <CRow>
    <CCol lg={12}>
      <CCard>
        <CCardHeader>
          User id: {match.params.id}
        </CCardHeader>
        <CCardBody>
        <CDataTable
          items={userPlace}
          fields={[
            { key:'place_id', _classes: 'font-weight-bold' },
            'start_date','end_date',{
              key: 'show_details',
              label: '',
              _style: { width: '1%' },
              sorter: false,
              filter: false
            }
          ]}
        
          striped
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
            // console.log(placeTitle);
            history.push(`/places/${item.place_id}`)
          }}
          scopedSlots = {
            {
            // 'title':
            //   (item)=>{
            //     let i=placeTitle.length;
            //      if(counter===i){
            //     title(item.place_id,i)
            //       }                // counter=0;
            //     return(
            //     <td>
            //       {/* <CBadge color={getBadge(isHost(item) ?'Active':'Banned')}> */}
            //         {placeTitle.length>0?placeTitle:'batee5'}
            //      {/* </CBadge>  */}
            //    </td>
            //   )},
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
                            console.log(item.place_id);
                        axiosInstance.delete(`/hosting/deletePlace/admin/${item.place_id}`)
                        .then(function(response){
                          history.go(0);
                          console.log(response);
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
          pages={Math.ceil(userPlace.length/5)}
          doubleArrows={false} 
          align="center"
        /> */}
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
)
}
    

export default UserPlaces
