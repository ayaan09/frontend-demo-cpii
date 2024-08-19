import React, { useState, useRef, useEffect } from 'react';
import './buttoncomp.css'

function ButtonComponent({upPanel, downPanel}) {
  const [data, setData] = useState([]);
  const tableRef = useRef(null);
  const[fdata, setf]=useState([])
  const [loading, setLoading] = React.useState(false);


  const handleClick = async () => {
    // setf([[0,0,0,0],[1,0,0,0],[2,0,0,0],[0,2,2,0]])
    setLoading(true)
    console.log(upPanel, downPanel)
    try{
      // console.log(upPanel, downPanel)
    // Make the fetch request to your Django server
    await fetch('http://10.13.29.101:5000')
      .then(response => response.json())
      .then(data => setData(data))}

      catch(error){

      }finally{
        setLoading(false)
      }
  };
  

  useEffect(() => {
    scrollToBottom();
  }, [data]); //change to data

  const scrollToBottom = () => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Calculate OD Matrix</button>
      {loading && (
            <div className="loading-alert">
              <div className="loading-alert-content">
                <h2>Loading...</h2>
                <p>Please wait while the data is being retrieved.</p>
              </div>
            </div>
          )}
      {data.length > 0 && (
        <div>
          <table className='fancy-table'>
            <thead className='head-row'>
              <tr>
                <th className='first-header'>Ent/Ex</th>
              {data[0].map((_, columnIndex) => (
        <th key={columnIndex}>En{columnIndex + 1}</th>
      ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}> 
                <th>Ex{rowIndex+1}</th>
                  {row.map((cell, columnIndex) => (
                    <td key={columnIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div ref={tableRef} />
        </div>
      )}
    </div>
  );
}

export default ButtonComponent;