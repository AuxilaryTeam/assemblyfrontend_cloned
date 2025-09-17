import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Report = () => {
    const [shareholders, setShareholders] = useState([]);
    const token = localStorage.getItem('token');
    const [search, setSearch] = useState("")
   
    useEffect(() => {
        // Fetch the data from the API
        const fetchShareholders = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}admin/present`, {
                    headers: {
                        Authorization: `Bearer ${token}`  // Include the Bearer token in the request headers
                    }
                });
    
                setShareholders(response.data); // Set result to display response data
                console.log(response.data)
            }catch (err) {
                setError('No results found or an error occurred');
                console.error("Error fetching data:", err);
            }
        };

        fetchShareholders();
    }, []);

    const handleClickp=async()=>{
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}admin/present`, {
            headers: {
                Authorization: `Bearer ${token}`  // Include the Bearer token in the request headers
            }
        });
        setShareholders(response.data); //
       
      }
      const handleClickabsent=async()=>{
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}admin/absent`, {
            headers: {
                Authorization: `Bearer ${token}`  // Include the Bearer token in the request headers
            }
        });
        setShareholders(response.data); //
      }
      
      const handleClickall=async()=>{
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}admin/present`, {
            headers: {
                Authorization: `Bearer ${token}`  // Include the Bearer token in the request headers
            }
        });
        setShareholders(response.data); //
       
      }

    return (
        <div className="container mx-auto ">
            <h1 className="text-2xl font-bold mb-4">Shareholder List</h1>

            <div className='flex justify-end'>
                <button className='p-2 mx-2 text-white hover:text-black bg-custom-yellow rounded hover:bg-amber-500' onClick={handleClickp}>Present</button>
                <button className='p-2 mx-2 text-white hover:text-black bg-custom-yellow rounded hover:bg-amber-500'onClick={handleClickabsent}>Absent</button>
                <button className='px-4 mx-2 text-white hover:text-black bg-custom-yellow rounded hover:bg-amber-500'onClick={handleClickall}>Total</button>
            
            </div>
           

            <div className='py-2'>
       
        <input type="text" id="search" placeholder='search' name="search" onChange={(e)=>setSearch(e.target.value)} className='border rounded-lg border-gray-600 px-2'/>
        </div>

            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 border-b">ID</th>
                        <th className="py-2 border-b">Name (Amharic)</th>
                        <th className="py-2 border-b">Name (English)</th>
                        <th className="py-2 border-b">Phone</th>
                        <th className="py-2 border-b">Shareholder ID</th>
                        <th className="py-2 border-b">Paid Capital</th>
                        <th className="py-2 border-b">Total Capital</th>
                        <th className="py-2 border-b">Share Subscription</th>
                        <th className="py-2 px-2 border-b">Voting Subscription</th>
                        <th className="py-2 border-b">Dividend</th>
                        <th className="py-2 border-b">Attendance</th>
                        <th className="py-2 border-b">Fiscal Year</th>
                    </tr>
                </thead>
                <tbody>
                    { shareholders?.filter((item)=>{
                    return search==''?item:item.nameeng.includes(search.toUpperCase())
                }).map((shareholder,index) => (
                        <tr key={index} className="border-t">
                            <td className="py-2 px-4">{shareholder.id}</td>
                            <td className="py-2 px-4">{shareholder.nameamh}</td>

                            {/* {Intl.NumberFormat('en-US').format(person.totalcapital)} */}

                            <td className="py-2 px-4">{shareholder.nameeng}</td>
                            <td className="py-2 px-4">{shareholder.phone}</td>
                            <td className="py-2 px-4">{shareholder.shareholderid}</td>
                            <td className="py-2 px-4">{Intl.NumberFormat('en-US', ).format(shareholder.paidcapital)}</td>
                            <td className="py-2 px-4">{Intl.NumberFormat('en-US', ).format(shareholder.totalcapital)}</td>
                            <td className="py-2 px-4">{shareholder.sharesubsription}</td>
                            <td className="py-2 px-4">{shareholder.votingsubscription}</td>
                            <td className="py-2 px-4">{Intl.NumberFormat('en-US', ).format(shareholder.devidend)}</td>
                            <td className="py-2 px-4">{shareholder.attendance === 1 ? 'Present' : 'Absent'}</td>
                            <td className="py-2 px-4">{shareholder.fiscalyear}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default Report;
