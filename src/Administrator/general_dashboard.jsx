import React, { useEffect, useState } from 'react';
import { DashboardContent } from './data';
import { Link } from 'react-router-dom';
import Card from '../components/card';

function GeneralDashboard() {
    const [stats, setStats] = useState()
    const [tabIndex, setTabIndex] = useState(0);
    const fetchStats = async (params) => {
        const url = `http://127.0.0.1:8000/api/get_stats`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setStats(data.data);
                console.log(data.data);
            } else {
                console.log('Data could not be fetched.');
                return false;
            }
        } catch (error) {
            console.log('Error:', error);
            return false;
        }
    };

    const [currentTime, setCurrentTime] = useState(null);

    function getCurrentDateTimeWithTimeNotion() {
        const options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        };

        const dateTimeFormatter = new Intl.DateTimeFormat('en-US', options);
        const currentDateTime = dateTimeFormatter.format(new Date());

        const currentHour = new Date().getHours();
        const currentMinute = new Date().getMinutes();
        const currentTimeStamp = `${currentHour < 10 ? '0' : ''}${currentHour}:${currentMinute < 10 ? '0' : ''}${currentMinute}`;

        let timeNotion;

        if (currentHour >= 5 && currentHour < 12) {
            timeNotion = 'morning';
        } else if (currentHour >= 12 && currentHour < 17) {
            timeNotion = 'afternoon';
        } else {
            timeNotion = 'evening';
        }

        setCurrentTime([currentDateTime, timeNotion, currentTimeStamp]);
    }

    // Example usage
    // getCurrentDateTimeWithTimeNotion();


    useEffect(() => {

        fetchStats();
        getCurrentDateTimeWithTimeNotion()
    }, []);

    const DashCard = (props) => {
        return (
            <div
                className={`w-100 gap-3 btn btn-light rounded-2 border-secondary d-flex flex-column pt-2 px-4 tas ais ${tabIndex == props.index ? 'bg-dark' : ''}`}
                onClick={props.method}
            >
                <h3 className='fs-3 w-100 text-secondary'>{props.title}</h3>
                <h1 className={`display-5 font-mono ${tabIndex == props.index ? 'text-light' : 'text-dark'} text-bold`}>{stats ? (stats[props.index] < 10) ? '0' : null : null}{stats ? stats[props.index] : null}</h1>
            </div>
        );
    };


    return (
        <div className='w-75 d-flex flex-column py-4'>

            <div className="w-100 d-flex flex-row aic jsb">
                <h2 className="display-3 pt-3 text-bold">The Dawa Overview</h2>
            </div>

            <div className='p-4 w-100 d-flex flex-row-reverse jsb gap-4 rounded border'>
                <Card />
                <div className="d-flex flex-column w-50">
                    <h3 className='fs-3'>Good {currentTime ? currentTime[1] : null}, Administrator</h3>
                    <p className='text-secondary font-primary pb-4'>
                        Please operate carefully, data is pretty sensitive
                    </p>
                </div>


            </div>

            <div className='d-flex flex-row py-4 gap-4'>
                {DashboardContent.map((category, index) => {
                    return (
                        <DashCard
                            key={index}
                            title={category}
                            method={() => {
                                setTabIndex(index);
                            }}
                            index={index}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default GeneralDashboard;
