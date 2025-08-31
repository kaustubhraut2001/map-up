import { useState, useEffect } from 'react';
import Papa from 'papaparse';

const useEVData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataSource, setDataSource] = useState('csv');

    useEffect(() => {
        const fetchCSV = async() => {
            try {
                // Load the CSV file from the root directory
                const response = await fetch('/Electric_Vehicle_Population_Data.csv');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const csvText = await response.text();

                Papa.parse(csvText, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        // Clean and filter the data with proper column mapping
                        const cleanedData = results.data
                            .filter(item =>
                                item['Make'] &&
                                item['Model'] &&
                                item['Model Year'] &&
                                item['Electric Vehicle Type']
                            )
                            .map(item => ({
                                // Core vehicle information
                                'Make': item['Make'] || '',
                                'Model': item['Model'] || '',
                                'Model Year': parseInt(item['Model Year'], 10) || 0,
                                'Electric Vehicle Type': item['Electric Vehicle Type'] || '',
                                'Electric Range': parseInt(item['Electric Range'], 10) || 0,
                                'Base MSRP': parseInt(item['Base MSRP'], 10) || 0,

                                // Location information
                                'VIN': item['VIN (1-10)'] || '',
                                'County': item['County'] || '',
                                'City': item['City'] || '',
                                'State': item['State'] || '',
                                'Postal Code': item['Postal Cod'] || '',

                                // Additional vehicle details
                                'Clean Alternative Fuel': item['Clean Alter'] || '',
                                'Legislative District': item['Legislative'] || '',
                                'DOL Vehicle ID': item['DOL Vehic'] || '',
                                'Vehicle Location': item['Vehicle Lo'] || '',
                                'Electric Utility': item['Electric Ut'] || '',
                                'Census Tract': item['2020 Census Tract'] || ''
                            }));

                        setData(cleanedData);
                        setDataSource('csv');
                        setLoading(false);
                        console.log(`Loaded ${cleanedData.length} EV records from CSV`);
                        console.log('Sample record:', cleanedData[0]);
                    },
                    error: (err) => {
                        console.error('CSV parsing error:', err);
                        setError(err);
                        setLoading(false);
                    }
                });

            } catch (err) {
                console.error('CSV fetch error:', err);
                setError(err);
                setLoading(false);
            }
        };

        fetchCSV();
    }, []);

    return {
        data,
        loading,
        error,
        dataSource,
        isSampleData: false
    };
};

export default useEVData;