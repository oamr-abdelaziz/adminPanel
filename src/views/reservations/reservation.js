import React, { useState, useEffect } from "react";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "src/axiosinstance";

// import user from './user'

const Reservation = ({ match }) => {
//   const [user, setUser] = useState([]);
//   const [host, setHost] = useState([]);
  const [reservation,setReservation]= useState([])

  // const user = user.find( user => user.id.toString() === match.params.id)
  const reservationDetails = reservation._id? Object.entries(reservation)  : [
        [
          "id",
          <span>
            <CIcon className="text-muted" name="cui-icon-ban" /> Not found
          </span>,
        ],
      ];
  useEffect(() => {
    // axiosInstance
    //   .get(`/users/${match.params.id}`)
    //   .then(function (response) {
    //     // console.log(response);
    //     // if(user){
    //     //   // console.log('hey');
    //     // }
    //     setUser(response.data);
    //     // setFormData(response.data);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });
    // axiosInstance
    //   .get(`/hosting/hosts`)
    //   .then(function (response) {
    //     // console.log(response)
    //     for (let index = 0; index < response.data.length; index++) {
    //       if (response.data[index].user_id === match.params.id) {
    //         // console.log(response.data[index]);
    //         setHost(response.data[index]);
    //         // console.log(response.data[index]);
    //       }

    //       // setFormData(response.data);
    //     }
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });
      axiosInstance.get(`/reservations/res/${match.params.id}`)
      .then(function(response){

        console.log(response.data);        
        setReservation(response.data);
        //  i++
        // arr=[...arr,{i:response.data.length,j:element._id}];
     
      })
      
      .catch(function(err){
        console.log(err);
      })
  }, []);
  const objectRender=(value)=>{
    console.log(value);

    let newVal=Object.entries(value);
    // console.log(newVal);
       return newVal= newVal.map(([key, values], index) => {
        
        //  if(key==='coordinates' || key==='other_imgs'){

        //      console.log(values);
        //  }
         if(typeof(values)==='object'){
             return objectRender(values);
           }
        else{
        return (
            <tr key={index.toString()}>
              <td>{`${key}:`}</td>
              <td><strong>{typeof(values)==='boolean'?(values===true)?'true':'false':values}</strong></td>
            </tr>
          )
    }})


}
  const history = useHistory();
  return (
    <>
    {/* <CRow>
     
    </CRow> */}

    <CRow>
      <CCol lg={12} className='pr-1'>
        <CCard>
          <CCardHeader  style={{display:'flex' , justifyContent:'space-between'}}>
            reservation id: {match.params.id}
            <CButton style={{width:'fit-content'}}
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={(e)=>{

                    axiosInstance.delete(`/users/delete/${match.params.id}`)
                    .then(function(response){
                      history.push(`/users/`)
                    })
                    .catch(function(err){
                      console.log(err);
                    })
                    // e.stopPropagation();
                    //
                  }
                  }
                >
                  Delete
                </CButton>
          </CCardHeader>
          <CCardBody>
            <table className="table table-striped table-hover">
              <tbody>
                {reservationDetails.length>1&&reservationDetails.map(([key, value], index) => {
                   if(typeof(value)==='object' ){
                       console.log(value);
                    return objectRender(value);
                   }
                   else{

                 return (
                    <tr
                      key={index.toString()} onClick={(item) => {
                        // console.log(item.target.parentElement.firstElementChild.innerText);
                        if(item.target.parentElement.firstElementChild.innerText=='place_id:'){
                            // console.log(item.target.parentElement.lastChild.innerText);
                            history.push(`/places/${item.target.parentElement.lastChild.innerText}`)
                        }
                        else if(item.target.parentElement.firstElementChild.innerText=='user_id:'){           
                            history.push(`/users/${item.target.parentElement.lastChild.innerText}`)
                        }
                        else if(item.target.parentElement.firstElementChild.innerText=='host_id:'){
                            history.push(`/users/${item.target.parentElement.lastChild.innerText}`)
                        }
                      }} className={ `${reservation._id && key==='_id'?'d-none':key==='profile_img'&&'d-none'}` } 
                      
                    >
                      <td>{`${key}:`}</td>
                      <td>
                        <strong>{value}</strong>
                      </td>
                    </tr>
                  );}
                })}
                {/* <tr style={{display:`${ user._id?'table-row':'none'}`}}>
                  <td>status</td>
                  <td>
                    <strong>{host.user_id ? "Host" : "User"}</strong>
                  </td>
                </tr>
                <tr style={{display:`${ user._id?'table-row':'none'}`}}
                 onClick={(item) => {
                  // console.log(item.target);

                  // if (item.target.childNodes[0].data === "placesHosted:") {
                    // console.log('hi');
                    history.push(`/users/${match.params.id}/places`)
                  // }
                }}
                >
                  <td >placesHosted</td>
                  <td>
                    <strong>{host.listings ? host.listings.place_ids.length : 0}</strong>
                  </td>
                </tr>
                <tr style={{display:`${ user._id?'table-row':'none'}`}}
                //  onClick={(item) => {
                    // history.push(`/reservation/${match.params.id}/places`)
                  // }
                // }}
                >
                  <td >places Reserved</td>
                  <td>
                    <strong>{reservation ? reservation.length : 0}</strong>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol lg={2} style={{padding:'0px'}}>
      {/* <img  className="d-block w-100" src={user.profile_img} alt="slide 1"/>    */}
       </CCol>
    </CRow>
  </>
  );
};

export default Reservation;
