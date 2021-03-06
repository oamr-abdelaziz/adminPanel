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


// let counter=0;
const ReservationsForUser = ({match}) => {
  const history = useHistory()
  // const [reservationsData, setUerPlace] = useState([]);
  const [reservationsData,setReservationsData]= useState([])


  // const user = usersData.find( user => user.id.toString() === match.params.id)
  // const userDetails = reservationsData ? Object.entries(reservationsData) : 
  // [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
  
  useEffect(() => {  
    axiosInstance.get(`/reservations/foruser/${match.params.id}`)
    .then(function(response){
      // console.log(placeDetails);
      // console.log(place==true);

      //  if(response.data!==null){
      // counter++;
      console.log(response);
      setReservationsData(response.data)        
      // setreservationsData(...reservationsData,response.data)
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
  }, [])

  // useEffect( () => () => counter=0, [] );

  //  const title=(myId,i)=>{
  //    if(counter===i ){

  //     axiosInstance.get(`/places/${myId}`)
  //     .then(function(response){
  //       // console.log(placeDetails);
  //       // console.log(place==true);

  //       //  if(response.data!==null){
  //       counter++;
  //       // console.log(response.data);        
  //       setreservationsData(...reservationsData,response.data.title)
  //           // return(response.data.title)
  //           // setPlace(
  //           //   [...place,response.data]
  //           //   )
  //       //  }
  //       // setFormData(response.data);
  //       })
  //     .catch(function(err){
  //       console.log(err);
  //       })
  // }
// }
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
          items={reservationsData}
          fields={[
            { key: 'place_id', _classes: 'font-weight-bold' },
            'number_of_nights','price', 'start_date', 'user_id',{
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
            // console.log(reservationsData);
            history.push(`/places/${item.place_id}`)
          }}
          scopedSlots = {
            {
            // 'title':
            //   (item)=>{
            //     let i=reservationsData.length;
            //      if(counter===i){
            //     title(item.place_id,i)
            //       }                // counter=0;
            //     return(
            //     <td>
            //       {/* <CBadge color={getBadge(isHost(item) ?'Active':'Banned')}> */}
            //         {reservationsData.length>0?reservationsData:'batee5'}
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
                        axiosInstance.delete(`/places/delete/${item.place_id}`)
                        .then(function(response){
                          // history.go(0);
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
          pages={Math.ceil(reservationsData.length/5)}
          doubleArrows={false} 
          align="center"
        /> */}
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
)
}
    

export default ReservationsForUser
