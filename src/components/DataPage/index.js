import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'


const DataPage=(props)=>{
    const{dataItem}=props
    //console.log(ProductData)
    const{date,id,billingName,amount,orderStatus}=dataItem

    const jwtToken=Cookies.get("jwt_token")
    if (jwtToken===undefined){
        return <Redirect to='/login'/>
    }
    

    return(<>
        
            <div className='second-item'>
                <li className='list-card-container'>
                <div className='box-container'>
                    <p className='heading'>{date}</p>
                    <p className='heading'>{id}</p>
                    <p className='heading'>{billingName}</p>
                    <p className='heading'>{amount}</p>
                    <p className='heading'>{orderStatus}</p>
            
                    </div>
                <hr className='line'/>
                </li>
                
            </div>
            </> 

    )
}

export default DataPage
