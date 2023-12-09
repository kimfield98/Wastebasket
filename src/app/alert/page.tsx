"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const TestApiPage = () => {
    const [objectId, setObjectId] = useState('');
    const [alertData, setAlertData] = useState({
        alertCountryName: '',
        alertDistrictName: '',
        alertLatitude: '',
        alertLongitude: '',
        alertRadius: '',
        // fromDate: '',
        // toDate: '',
        alertLevelGreen: false,
        alertLevelOrange: false,
        alertLevelRed: false
    });
    const [displayData, setDisplayData] = useState(null);

    const token = Cookies.get('access-token');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAlertData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setAlertData((prevData) => ({
            ...prevData,
            [name]: checked
        }));
    };

    const fetchAlerts = async () => {
        try {
            const response = await axios.get('https://worldisaster.com/api/emailAlerts/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDisplayData(response.data);
        } catch (error) {
            console.error('Error fetching alerts:', error);
        }
    };

    const createAlert = async () => {
        try {
            // Prepare data with proper types
            const preparedData = {
                ...alertData,
                alertLatitude: parseFloat(alertData.alertLatitude),
                alertLongitude: parseFloat(alertData.alertLongitude),
                alertRadius: parseInt(alertData.alertRadius, 10),
                // fromDate: alertData.fromDate,
                // toDate: alertData.toDate,
                alertLevelGreen: typeof alertData.alertLevelGreen === 'string' ? alertData.alertLevelGreen === 'true' : alertData.alertLevelGreen,
                alertLevelOrange: typeof alertData.alertLevelOrange === 'string' ? alertData.alertLevelOrange === 'true' : alertData.alertLevelOrange,
                alertLevelRed: typeof alertData.alertLevelRed === 'string' ? alertData.alertLevelRed === 'true' : alertData.alertLevelRed,
            }; // type string이면 'true'와 비교해서 true/false 만들고, type string이 아니면 boolean으로 그대로 사용

            console.log(preparedData);
            const response = await axios.post('https://worldisaster.com/api/emailAlerts/', preparedData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data);
            setDisplayData(response.data);
        } catch (error) {
            console.error('Error creating alert:', error);
        }
    };


    const deleteAlert = async () => {
        try {
            await axios.delete(`https://worldisaster.com/api/emailAlerts/${objectId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Alert deleted successfully');
        } catch (error) {
            console.error('Error deleting alert:', error);
        }
    };

    const deleteAllAlerts = async () => {
        try {
            await axios.delete('https://worldisaster.com/api/emailAlerts/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('All alerts deleted successfully');
        } catch (error) {
            console.error('Error deleting all alerts:', error);
        }
    };

    const container: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: '100vh',
        paddingTop: '30px', // Add padding at the top of the container
        color: 'green'
    };

    const leftContainer: React.CSSProperties = {
        flex: '1',
        padding: '20px',
        borderRight: '1px solid #ccc',
        overflowY: 'auto',
        minWidth: '250px',
    };

    const rightContainer: React.CSSProperties = {
        flex: '1',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
    };

    const inputStyle: React.CSSProperties = {
        marginBottom: '5px', // Adds bottom margin to input for spacing
    };

    const buttonStyle = {
        paddingBottom: '10px',
        margin: '10px',
        backgroundColor: 'red',
        color: 'green'
    };


    return (
        <div style={container}>
            <div style={leftContainer}>
                {/* Display return values here */}
                {displayData && <pre>{JSON.stringify(displayData, null, 2)}</pre>}
            </div>
            <div style={rightContainer}>
                <button style={buttonStyle} onClick={fetchAlerts}>Fetch Alerts</button>
                <input style={inputStyle} type="text" name="alertCountryName" value={alertData.alertCountryName} onChange={handleInputChange} placeholder="Country Name" />
                <input style={inputStyle} type="text" name="alertDistrictName" value={alertData.alertDistrictName} onChange={handleInputChange} placeholder="District Name" />
                <input style={inputStyle} type="number" name="alertLatitude" value={alertData.alertLatitude} onChange={handleInputChange} placeholder="Latitude" />
                <input style={inputStyle} type="number" name="alertLongitude" value={alertData.alertLongitude} onChange={handleInputChange} placeholder="Longitude" />
                <input style={inputStyle} type="number" name="alertRadius" value={alertData.alertRadius} onChange={handleInputChange} placeholder="Radius (km)" />
                {/* <input style={inputStyle} type="date" name="fromDate" value={alertData.fromDate} onChange={handleInputChange} placeholder="From Date" />
                <input style={inputStyle} type="date" name="toDate" value={alertData.toDate} onChange={handleInputChange} placeholder="To Date" /> */}
                <label style={inputStyle}>
                    Green Alert
                    <input type="checkbox" name="alertLevelGreen" checked={alertData.alertLevelGreen} onChange={handleCheckboxChange} />
                </label>
                <label style={inputStyle}>
                    Orange Alert
                    <input type="checkbox" name="alertLevelOrange" checked={alertData.alertLevelOrange} onChange={handleCheckboxChange} />
                </label>
                <label style={inputStyle}>
                    Red Alert
                    <input type="checkbox" name="alertLevelRed" checked={alertData.alertLevelRed} onChange={handleCheckboxChange} />
                </label>
                <button style={buttonStyle} onClick={createAlert}>Create Alert</button>
                <input style={inputStyle} type="text" value={objectId} onChange={(e) => setObjectId(e.target.value)} placeholder="Object ID for Deletion" />
                <button style={buttonStyle} onClick={deleteAlert}>Delete Alert</button>
                <button style={buttonStyle} onClick={deleteAllAlerts}>Delete All Alerts</button>
            </div>
        </div>
    );
};

export default TestApiPage;