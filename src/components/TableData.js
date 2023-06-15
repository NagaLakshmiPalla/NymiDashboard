import { useEffect,useState } from "react"
import { Table } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import React  from 'react'
import './TableStyle.css'
const { Column, HeaderCell, Cell } = Table;

const TableData = () =>{
    const [data ,setData] =useState()
    let token='';
    const username = 'chshiva';
    const password = '123456aA';
    const encodedCredentials = btoa(username + ':' + password);
    const basicToken = 'Basic ' + encodedCredentials;
    const url = "https://nesnymi.gsk.nymi.com/nes/api/NymiBands/";
    const obj = {
      method: "GET",
      headers: {
       Authorization : `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
    const replaceObj = {
      proximity: '-',
      state:'Absent'
    }
    const frequency=process.env.REACT_APP_FREQUENCY || 60000
    function generateData(data1,data2){
      let tempData=[];
      let length1=data1.length
      let length2=data2.length
      for(let i=0;i<length1;i++){
        let flag=false;
        let j=0
        for(j;j<length2;j++){
          if(data1[i].NymiBandID===data2[j].BandId){
            flag=true;
            break
          }
        }   
        if(flag){
          let merged={...data1[i],...data2[j]}
          tempData.push(merged)
        } 
        else{
          tempData.push({...data1[i],...replaceObj})
        }    
      }
      return tempData;
    }
   useEffect(() => {
     fetchData();
     const interval = setInterval(() => {
      fetchData();
    }, frequency);
    return () => clearInterval(interval);
    // eslint-disable-next-line
   }, []);

  const generateToken= async ()=>{
    await fetch('https://nesnymi.gsk.nymi.com/nes_AS/api/BasicLoginWithToken', {
      method: 'GET',
      headers: {
        'Authorization': basicToken,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => 
      response.json()
    )
    .then(res =>{
      let apiToken=res.Token
      obj.headers.Authorization=`Bearer ${apiToken}`
    })
  }
    const fetchData = async () => {
    await generateToken()
    const response1 = await fetch(`${url}`, obj);
    const data1 = await response1.json();
    //const response2 = await fetch('https://635f660fca0fe3c21a9b2d07.mockapi.io/nymi');
    const response2 = await fetch(process.env.REACT_APP_API_URL);
    const data2 = await response2.json();
    const combinedData = generateData(data1, data2);
    setData(combinedData);
    setLoading(false)
  };
  const [sortColumn, setSortColumn] = useState('state');
  const [sortType, setSortType] = useState('desc');
  const [loading, setLoading] = useState(true);

    const sortFunction =  (data) => {
       if (sortColumn && data) {
         return (data.sort((a, b) => {
          let x = a[sortColumn];
          let y = b[sortColumn];
          if (typeof x === 'string') {
            x = x.charCodeAt();
          }
          if (typeof y === 'string') {
            y = y.charCodeAt();
          }
          if (sortType === 'asc') {
            return x - y;
          } else {
            return y - x;
          }
        }))
      }
      return (data);
    };
    const handleSortColumn = (sortColumn, sortType) => {
      //setLoading(true);
      setSortColumn(sortColumn)
      setSortType(sortType)
      // setTimeout(() => {  //to set loading while sorting uncomment the commented code
      //   setLoading(false);
      // }, 500);
    };
    const getClassName=(rowData)=>{
      if(rowData){
        if(rowData.state==='Weak'){
          return 'green-table-row'
        }
        else{
          return 'dark-table-row'
        }
      }
    }
    return (
      <div style={{overflowX:'auto'}}>
      <Table  height={250} width={965}  bordered={false} autoHeight={false} hover={false}
        loading={loading}
        data={sortFunction(data)}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        rowClassName={getClassName} 
      >
      <Column width={100}  sortable>
        <HeaderCell >User Id</HeaderCell>
        <Cell dataKey="ID" />
      </Column>

      <Column width={130} sortable resizable>
        <HeaderCell>User Name</HeaderCell>
        <Cell dataKey="BandLabel" />
      </Column>

      <Column width={160} sortable resizable>
        <HeaderCell>Band ID</HeaderCell>
        <Cell dataKey="NymiBandID" />
      </Column>

      <Column width={160}  >
        <HeaderCell>Domain Name</HeaderCell>
        <Cell dataKey="UserCore.Domain" />
      </Column>

      <Column width={115}   resizable>
        <HeaderCell>Serial No</HeaderCell>
        <Cell dataKey="HardwareID" />
      </Column>

      <Column width={120}  sortable>
        <HeaderCell>Proximity</HeaderCell>
        <Cell dataKey="proximity" />
      </Column>

      <Column width={180} sortable>
        <HeaderCell>State</HeaderCell>
        <Cell dataKey="state" />
      </Column>
    </Table>

    </div>
  )
}
export default TableData;
