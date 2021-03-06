import React, { useState, useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCarousel, CCarouselCaption, CCarouselControl, CCarouselIndicators, CCarouselInner, CCarouselItem, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { axiosInstance } from 'src/axiosinstance'
import { useHistory } from 'react-router-dom'

// import placeData from './placeData.js'

const Place = ({match}) => {
  const [place,setPlace] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

//   const place = placeData.find( place => place.id.toString() === match.params.id)
  const placeDetails = place ? Object.entries(place) : 
  [['_id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
  // console.log(place);
  const history = useHistory();
useEffect(() => {
  // console.log(match);
  axiosInstance.get(`/places/${match.params.id}`)
 .then(function(response){
  // console.log(placeDetails);
  // console.log(place==true);

  //  if(response.data!==null){
  //  console.log(response);
   setPlace(response.data)
  //  }
   // setFormData(response.data);
 })
 .catch(function(err){
   console.log(err);
 })
}, [])

const objectRender=(value)=>{
    // console.log(value);

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

        //  console.log(values);
          
        return (
            <tr key={index.toString()} className={ `${values===false&&'d-none'}` } >
              <td>{`${key}:`}</td>
              <td><strong>{typeof(values)==='boolean'?(values===true)?  <i style={{color:'#28acde',fontSize:'1.5em'}} className="fas fa-check-square"></i>:'false':(values==='true')? <i style={{color:'#28acde',fontSize:'1.5em'}} className="fas fa-check-square"></i>:values}</strong></td>
            </tr>
          )
        
    }})


}
const renderMe=()=>{
  // console.log((<CCarouselInner/>)._owner.child.tag);
  return  Object.entries(place&&place.length!==0?place.images.other_imgs:0).map(([key, value], index) => {
      // console.log(index+1);
          return (
        <CCarouselItem  key={(index+1).toString()}>
          <img key={(index+2).toString()} className="d-block w-100" 
         src={place.length!==0?value:''}
          alt="slide 2"/>
          <CCarouselCaption  key={(index+1).toString()}><h3>Slide {index+1}</h3>
          </CCarouselCaption>
        </CCarouselItem>
          )
      
  })
}
// const activeRender=()=>{
//   // place.length!==0&& console.log(document.getElementsByTagName(CCarousel));
// //  place.length!==0&& (<CCarouselInner/>)._owner.child.tag===place.images.other_imgs.length && document.getElementsByTagName(CCarousel)[0].setAttribute('activeIndex','activeIndex')
// }
  return (
    <>
    <div>
    <CRow>
      <CCol sm={12}>
   {place.length!==0&&place.images.other_imgs&&
        <CCarousel activeIndex={activeIndex} >
          <CCarouselIndicators/>

          
          <CCarouselInner>

            <CCarouselItem>
              <img  className="d-block w-100" src={place&&place.length!==0?place.images.main_img:''} alt="slide 1"/>
              <CCarouselCaption ><h3>Main Image</h3></CCarouselCaption>
            </CCarouselItem>
            {
             
                    // place.length!==0?
                    renderMe()
                    // :()=>{console.log(place);
            //          return( <CCarouselItem>
            //   <img className="d-block w-100" src={place.length!==0?place.images.other_imgs[1]:'place.js:78 https://a0.muscache.com/im/pictures/e1cd5386-74a9-4c58-9b6c-df08fbd8efcc.jpg?im_w=720'} alt="slide 2"/>
            //   <CCarouselCaption><h3>Slide 2</h3></CCarouselCaption>
            // </CCarouselItem>
                    //  )}
                    
                    }
                 
            {/* {placeDetails.images.other_imgs.map()} */}
             {/* <CCarouselItem>
              <img className="d-block w-100" src={place.length!==0?place.images.other_imgs[0]&&place.images.other_imgs[0]:''} alt="slide 2"/>
              <CCarouselCaption><h3>Slide 2</h3></CCarouselCaption>
            </CCarouselItem>
            <CCarouselItem>
              <img className="d-block w-100" src={place.length!==0?place.images.other_imgs[1]&&place.images.other_imgs[1]:''} alt="slide 3"/>
              <CCarouselCaption><h3>Slide 3</h3></CCarouselCaption>
            </CCarouselItem>
            <CCarouselItem>
              <img className="d-block w-100" src={place.length!==0?place.images.other_imgs[2]&&place.images.other_imgs[2]:''} alt="slide 4"/>
              <CCarouselCaption><h3>Slide 4</h3></CCarouselCaption>
            </CCarouselItem>
            <CCarouselItem >
              <img className="d-block w-100" src={place.length!==0?place.images.other_imgs[3]&&place.images.other_imgs[3]:''} alt="slide 6"/>
              <CCarouselCaption><h3>Slide 5</h3></CCarouselCaption>
            </CCarouselItem>

            
           */}
            {/* <CCarouselItem>
              <img className="d-block w-100" src={place.length!==0?place.images.other_imgs[3]&&place.images.other_imgs[3]:''} alt="slide 5"/>
              <CCarouselCaption><h3>Slide 5</h3></CCarouselCaption>
            </CCarouselItem> */}
            {/* {place.length!==0&&place.images.other_imgs[4]&& */}

            {/* {place.length!==0&&place.images.other_imgs[6]&&

<CCarouselItem>
  <img className="d-block w-100" src={place.length!==0?place.images.other_imgs[5]:''} alt="slide 3"/>
  <CCarouselCaption><h3>Slide 3</h3><p>Slide 3</p></CCarouselCaption>
</CCarouselItem> 
}
              {place.length!==0&&place.images.other_imgs[6]&&

            <CCarouselItem>
              <img className="d-block w-100" src={place.length!==0?place.images.other_imgs[5]:''} alt="slide 3"/>
              <CCarouselCaption><h3>Slide 3</h3><p>Slide 3</p></CCarouselCaption>
            </CCarouselItem> 
} */}
          </CCarouselInner>
          <CCarouselControl direction="prev"/>
          <CCarouselControl direction="next"/>
        </CCarousel>
}
      </CCol>
    </CRow>
    {/* {activeRender()} */}
  </div>
      <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader style={{display:'flex' , justifyContent:'space-between'}}>
            Place id: {match.params.id}
             <CButton style={{width:'fit-content'}}
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={(e)=>{

                    axiosInstance.delete(`/places/delete/${match.params.id}`)
                    .then(function(response){
                      history.push(`/places/`)
                    })
                    .catch(function(err){
                      console.log(err);
                    })
                    
                  }
                  }
                >
                  Delete
                </CButton>
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    placeDetails.map(([key, value], index) => {
                        // console.log(key)
                        // let arr=[];
                        if(typeof(value)==='object'){
                          if(key!=='images'){
                            return objectRender(value);
                          };
                        }
                        else{
                            return (
                              <tr key={index.toString()} className={ `${value===false&&'d-none'}` } >
                                <td>{`${key}:`}</td>
                                <td><strong>{typeof(value)==='boolean'?(value===true)?  <i style={{color:'#28acde',fontSize:'1.5em'}} className="fas fa-check-square"></i>:'false':(value==='true')? <i   style={{color:'#28acde',fontSize:'1.5em'}} className="fas fa-check-square"></i>:value}</strong></td>
                              </tr>
                            )
                        }
                    })}
                </tbody>
              </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </>
  )
}

export default Place
