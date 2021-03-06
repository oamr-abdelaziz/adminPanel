import React, { useState, useEffect } from "react";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "src/axiosinstance";

// import user from './user'

const User = ({ match }) => {
  const [user, setUser] = useState([]);
  const [host, setHost] = useState([]);
  const [reservations,setReservations]= useState([])

  // const user = user.find( user => user.id.toString() === match.params.id)
  const userDetails = user._id? Object.entries(user)  : [
        [
          "id",
          <span>
            <CIcon className="text-muted" name="cui-icon-ban" /> Not found
          </span>,
        ],
      ];
  useEffect(() => {
    axiosInstance
      .get(`/users/${match.params.id}`)
      .then(function (response) {
        // console.log(response);
        // if(user){
        //   // console.log('hey');
        // }
        setUser(response.data);
        // setFormData(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
    axiosInstance
      .get(`/hosting/hosts`)
      .then(function (response) {
        // console.log(response)
        for (let index = 0; index < response.data.length; index++) {
          if (response.data[index].user_id === match.params.id) {
            // console.log(response.data[index]);
            setHost(response.data[index]);
            // console.log(response.data[index]);
          }

          // setFormData(response.data);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
      axiosInstance.get(`/reservations/foruser/${match.params.id}`)
      .then(function(response){
        setReservations(response.data);
        //  i++
        // arr=[...arr,{i:response.data.length,j:element._id}];
     
      })
      
      .catch(function(err){
        console.log(err);
      })
  }, []);
  const history = useHistory();
  return (
    <>
    {/* <CRow>
     
    </CRow> */}

    <CRow>
      <CCol lg={10} className='pr-1'>
        <CCard>
          <CCardHeader style={{display:'flex' , justifyContent:'space-between'}}>
            User id: {match.params.id}
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
                {userDetails.map(([key, value], index) => {
                  return (
                    <tr
                      key={index.toString()} className={ `${user._id && key==='_id'?'d-none':key==='profile_img'&&'d-none'}` } 
                      
                    >
                      <td>{`${key}:`}</td>
                      <td>
                        <strong>{value}</strong>
                      </td>
                    </tr>
                  );
                })}
                <tr style={{display:`${ user._id?'table-row':'none'}`}}>
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
                 onClick={(item) => {
                    history.push(`/users/${match.params.id}/placesReserved`)
                  }
                }
                >
                  <td >places Reserved</td>
                  <td>
                    <strong>{reservations ? reservations.length : 0}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol lg={2} style={{padding:'0px'}}>
      <img  className="d-block w-100" src={user.profile_img} alt="slide 1"/>    </CCol>
    </CRow>
  </>
  );
};

export default User;
