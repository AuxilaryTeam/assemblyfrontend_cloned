import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Diplayprint = () => {
    const [attendanceCount, setAttendanceCount] = useState(0);
 
    const [sumvoting, setSumvoting] = useState(0);
    const [sharesSum, setSharesSum] = useState(0);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
  
    const fetchAttendanceCount = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}admin/countp `, {
                headers: {
                    Authorization: `Bearer ${token}`  // Include the Bearer token in the request headers
                }
            });
    
            setAttendanceCount(response.data);// Set result to display response data
            console.log(response.data)
        }catch (err) {
            setError('No results found or an error occurred');
            console.error("Error fetching data:", err);
        }
    };
    const fetchsumsubscription = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}admin/sumsub `, {
                headers: {
                    Authorization: `Bearer ${token}`  // Include the Bearer token in the request headers
                }
            });
    
            setSharesSum(response.data);// Set result to display response data
            console.log(response.data)
        }catch (err) {
            setError('No results found or an error occurred');
            console.error("Error fetching data:", err);
        }
    };

    

    const fetchvotingSum = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}admin/sumvoting `, {
                headers: {
                    Authorization: `Bearer ${token}`  // Include the Bearer token in the request headers
                }
            });
    
            setSumvoting(response.data);// Set result to display response data
            console.log(response.data)
        }catch (err) {
            setError('No results found or an error occurred');
            console.error("Error fetching data:", err);
        }
    };

    const fetchData = () => {
        fetchAttendanceCount();
     
        fetchsumsubscription();
        fetchvotingSum();

    };
    const printpdf=()=>{
            window.print()
    }

    useEffect(() => {
        fetchData(); // Fetch data on component mount

        const interval = setInterval(() => {
            fetchData(); // Fetch data every 30 seconds
        }, 4000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200"> {/* Full-screen background */}
        <div className="flex text-left flex-col items-start justify-center p-6 rounded-lg shadow-md w-full "> {/* Main container */}
      
            
            <p className="px-4 bg-gray-100 text-3xl font-semibold w-full">ለስብሰባ የተገኙ የባለአክሲዮኖች ብዛት:</p>
            <p className="px-10 bg-gray-100 text-3xl font-bold w-full"> {Intl.NumberFormat('en-US', ).format(attendanceCount)}</p>
            <p className="px-10  text-xl font-bold w-full"><span> &nbsp;</span></p>

            <p className="pt-4 pb-1 px-4 bg-gray-100 text-3xl w-full font-semibold">{`ለስብሰባ የተገኙ የባለአክሲዮኖች የተፈረመ አክሲዮን መጠን (በቁጥር):`}</p>
            <p className="px-10 bg-gray-100 text-3xl font-bold w-full"> {Intl.NumberFormat('en-US', ).format(sumvoting)}</p>
            <p className="px-10  text-xl font-bold w-full"><span> &nbsp;</span></p>

            <p className="pt-4 pb-1 px-4 bg-gray-100 text-3xl w-full font-semibold">{`አጠቃላይ የባንኩ የተፈረመ አክሲዮን ካፒታል (በቁጥር):`}</p>
            <p className="px-10 bg-gray-100 text-3xl font-bold w-full"> {Intl.NumberFormat('en-US', ).format(sharesSum)}</p>
            <p className="px-10  text-xl font-bold w-full"><span> &nbsp;</span></p>

            <p className="pt-4 pb-1 px-4 bg-gray-100 text-3xl w-full font-semibold">{`ለስብሰባ የተገኙ የባለአክሲዮኖች የተፈረመ አክሲዮን መጠን (በ%):`}</p>
            <p className="px-10 bg-gray-100 text-3xl font-bold w-full">{sharesSum > 0 ? ((sumvoting / sharesSum) * 100).toFixed(2) : 0.00}%</p>
            <button onClick={printpdf}>print</button>
               
        </div>
        
    </div>
    );
};


export default Diplayprint