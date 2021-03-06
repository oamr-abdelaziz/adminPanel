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

// import PlacesData from './PlacesData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const Places = () => {
  const history = useHistory()
  // const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  // const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  // const [page, setPage] = useState(currentPage)
  const [placesData,setPlacesData]= useState([])

  // const pageChange = newPage => {
  //   currentPage !== newPage && newPage!==0  && history.push(`/Places?page=${newPage}`)
  // }

  useEffect(() => {
       axiosInstance.get("/places/")
    .then(function(response){
      // console.log(response)
      setPlacesData(response.data)
      // setFormData(response.data);
    })
    .catch(function(err){
      console.log(err);
    })
    // currentPage !== page && setPage(currentPage)
  }, [])

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
          <h3><strong>Places</strong></h3>

            {/* <small className="text-muted"> example</small> */}
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={placesData}
            fields={[
              { key: 'title', _classes: 'font-weight-bold' },
              'summary','num_guests', 'total_bedrooms',{
                key: 'show_details',
                label: '',
                _style: { width: '1%' },
                sorter: false,
                filter: false
              }
            ]}
            
            striped
            columnFilter
            tableFilter
            footer
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            sorter
            pagination
            // itemsPerPage={5}
            // activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/places/${item._id}`)}
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

                    // console.log(e);
                    console.log(item._id);
                    axiosInstance.delete(`/places/delete/${item._id}`)
                    .then(function(response){
                      // console.log(response);
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
            }}
          />
          {/* <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={Math.ceil(placesData.length/5)}
            doubleArrows={false} 
            align="center"
          /> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Places
