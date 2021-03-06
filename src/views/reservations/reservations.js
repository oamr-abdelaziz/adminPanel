import React, { useState, useEffect } from 'react'
import { axiosInstance } from 'src/axiosinstance'
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

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const Reservations = () => {
  const history = useHistory()

  const [reservationsData,setReservationsData]= useState([])

  

  useEffect(() => {
       axiosInstance.get("/reservations/")
    .then(function(response){
      setReservationsData(response.data)
    })
    .catch(function(err){
      console.log(err);
    })
  }, [])

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <h3><strong>Reservations</strong></h3>
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
            // hover
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
            onRowClick={(item) => history.push(`/reservations/${item._id}`)}
            scopedSlots = {{
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
                            console.log(item._id);
                        axiosInstance.delete(`/reservations/deleteres/${item._id}`)
                        .then(function(response){
                          history.go(0);
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
            }}
          />
       
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Reservations
