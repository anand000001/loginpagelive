import { Component } from "react";
import {
  LineChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"

import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import DataPage from '../DataPage/index.js'

import './index.css'

class Home extends Component{

  

  state = {
    productsList: [],orderSummary:[],overallData:[],lastDays:[],chartData:[],searchInput:'',
  }

  


    componentDidMount() {
      this.getProducts();
      this.orderSummary();
      this.lastDays();
  
    }
  
    getProducts = async () => {
      const apiUrl = "http://13.76.214.165:8001/api/orders?page=1&limit=15&order_status=";
      const jwtToken = Cookies.get("jwt_token");
      //console.log(jwtToken)
      const options = {
        headers: {
          Authorization: jwtToken,
        },
        method: "GET",
      };
      const response = await fetch(apiUrl, options);
      if (response.ok === true) {
        const fetchedData = await response.json();
        let realData=fetchedData.data

        const updatedData = realData.map((item) => ({
          date: item.date,
          id: item.id,
          billingName: item.billing_name,
          amount: item.amount,
          orderStatus: item.order_status,
          
        }));
        this.setState({productsList:updatedData});
        
      }
    };


//last7days api

    lastDays = async () => {
      const apiUrl = "http://13.76.214.165:8001/api/analytics/last7Days";
      const jwtToken = Cookies.get("jwt_token");
      //console.log(jwtToken)
      const options = {
        headers: {
          Authorization: jwtToken,
        },
        method: "GET",
      };
      const response = await fetch(apiUrl, options);
      if (response.ok === true) {
        const fetchedData = await response.json();
        let realData=fetchedData.data.last7Days
        //console.log(realData)
        
        this.setState({chartData:realData});
        
      }
    };


//Overview shop data api

    orderSummary = async () => {
      const apiUrl = "http://13.76.214.165:8001/api/analytics/summary";
      const jwtToken = Cookies.get("jwt_token");
      //console.log(jwtToken)
      const options = {
        headers: {
          Authorization: jwtToken,
        },
        method: "GET",
      };
      const response = await fetch(apiUrl, options);
      if (response.ok === true) {
        const fetchedData = await response.json();
        //console.log(fetchedData)
        const realData=fetchedData.data.overview;
        const data_1=realData.average_sale
        const data_2=realData.new_orders
        const data_3=realData.total_earnings
        const act=data_1.map((data)=>({
          averageSale:data.average_sale
        }));
        console.log(act["average_sale"])
        //const averageSale=data_1["average_sale"]
        //console.log(averageSale)
        
        const newData={
          averageSale:act.average_sale,
          newOrders:data_2.new_orders,
          totalEarnings:data_3.total_earnings,
        };
        console.log(newData)
        const summaryData=fetchedData.data.summary;
        const newSummaryData=summaryData.map((data)=>({
          orderStatus:data.order_status,
          count:data.count
        }));
          
        //console.log(newSummaryData)
        this.setState({orderSummary:newData,overallData:newSummaryData});
        
      }
    };

    

    onChangeSearchInput=(event)=>{
      this.setState({searchInput:event.target.value})
      console.log(event.target.value)
    }

//Overview shop rendering

    renderOrderSummary=()=>{
      const{orderSummary,overallData,}=this.state
      const{averageSale,newOrders,totalEarnings}=orderSummary
      //console.log(orderSummary)
      
      return(
        <div className="data-container">
          <h1>Overview Shop</h1>
          <div>
            <h1>{averageSale}</h1>
          </div>
          <div>
            {overallData.map((data)=>(
              <div className="summary">
                <li  className='list-item' key={data.id}>
                <h1 className="head">{data.orderStatus} </h1>
                <h1 className="head">{data.count}</h1>
                </li>
              </div>
            ))}
          </div>
        </div>
      )
    }

   //Last 7 days rendering

    renderLastDays=()=>{
      const{chartData}=this.state
      let a=chartData.keys
      console.log(a)
      const styles = {
        fontFamily: "sans-serif",
        textAlign: "center"
      };

      const chartingData=[
        {
        key:"Sun Aug 21 2022 22:57:19 GMT+0000",
        value: 10000
      },
      {
        key:"Sat Aug 20 2022 22:57:19 GMT+0000",
        value: 16000
      },
      {  
        key:"Fri Aug 19 2022 22:57:19 GMT+0000",
         value: 20000,

      },
      {  key:"Thu Aug 18 2022 22:57:19 GMT+0000",
        value: 18000,
      },
      { 
          key:"Wed Aug 17 2022 22:57:19 GMT+0000",
           value: 9000
      },
      {
        key:"Tue Aug 16 2022 22:57:19 GMT+0000",
          value: 13000
      },
        {
          key:"Mon Aug 15 2022 22:57:19 GMT+0000",
        value: 11000
    }]
      return(
        <div className="chart-container">
        <h1 className="text-heading">Revenue</h1>
        
      <ResponsiveContainer width="100%" height={500}>
          <div style={styles}>
    <LineChart
      width={500}
      height={300}
      data={chartingData}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
      <XAxis dataKey="key" />
      <YAxis />
    </LineChart>
  </div>
    </ResponsiveContainer>

            </div>
      )
    }


//Order list rendering

    renderProductsList = () => {
      const { productsList,searchInput } = this.state;
      const searchResults=productsList.filter((eachList)=>(eachList.orderStatus.includes(searchInput)))
      //console.log(productsList)
      return (
        <div className="app-container">
          <h1 className="products-list-heading">Latest Orders</h1>
          <input type='search' className='input-element' onChange={this.onChangeSearchInput} value={searchInput}/>
          <ul>
          <li className='list-view'>
          <p className='heading'>Date</p>
          <p className='heading'>ID</p>
          <p className='heading'>Billing Name</p>
          <p className='heading'>Amount</p>
          <p className='heading'>Order Status</p>
          </li>
          {searchResults.map((each)=>(
          <DataPage  dataItem={each} key={each.id}/>
          ))};
            
          </ul>
        </div>
      );
    };



  
    render() {
      const jwtToken=Cookies.get("jwt_token")

    if (jwtToken===undefined){
        return <Redirect to='/login'/>
    }
      return (
      <div className="main-container">
        <div className="='sub-container">
        {this.renderOrderSummary()}
        {this.renderLastDays()}
        </div>
        {this.renderProductsList()}
      </div>);
    }
  }


export default Home