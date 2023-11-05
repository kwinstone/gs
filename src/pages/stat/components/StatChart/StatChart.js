import './StatChart.scss';
import { Row, Col } from 'antd';
import DropDown from '../DropDown/DropDown';
import checkDomain from '../../../../funcs/checkDomain';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    
  );

const StatChart = ({
    data, 
    type,
    chartTypes,
    setChartType,
    
}) => {
    
    const onChange = (e) => {
        if(e == '1') {
            setChartType(`Продажи (${checkDomain('₽', '₸')})`)
        }
        if(e == '2') {
            setChartType('Продажи (шт)')
        }
    }

   
   

    return (
        <div className="StatChart">
            <Row gutter={[20,20]}>
                <Col span={24}>
                    <div className="StatChart__top">
                        <Row gutter={[20,20]}>
                            <Col span={12}>
                                <DropDown
                                    onChange={onChange}
                                    value={type}
                                    shadow={true}
                                    list={chartTypes}
                                    />
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={24}>
                    <div className="StatChart__chart gs-scroll">
                        {
                            data ? (
                                <Line
                                    height={400}
                                    width={1100}
                                    className='StatChart__chart_el'
                                    options={{  
                                        scales: {
                                            y: {
                                                min: 0,
                                            }
                                        },
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                display: false,
                                            },
                                            title: {
                                                display: false
                                            },
                                            tooltip: {
                                                position: 'nearest',
                                                backgroundColor:  type == `Продажи (${checkDomain('₽', '₸')})` ? '#7B99FF' : '#32CD32',
                                                bodyColor: '#fff',
                                                titleColor: '#fff',
                                                displayColors: false,
                                                borderColor: type == `Продажи (${checkDomain('₽', '₸')})` ? '#7B99FF' : '#32CD32',
                                                borderWidth: 1, 
                                                titleFont: {
                                                    size: 16,
                                                    weight: 600,
                                                    family: 'Montserrat',
                                                },
                                                
                                                bodyFont: {
                                                    size: 20,
                                                    weight: 600,
                                                    family: 'Montserrat',
                                                },
                                            },
                                            
                                        
                                        },
                                        
                                    }}
                                    data={{ 
                                        
                                        labels: data.dates,
                                        datasets: [
                                            {
                                                label: type,
                                                data: type == `Продажи (${checkDomain('₽', '₸')})` ? data?.costs : data?.counts,
                                                borderColor: type == `Продажи (${checkDomain('₽', '₸')})` ? '#7B99FF' : '#32CD32',
                                                pointBackgroundColor: type == `Продажи (${checkDomain('₽', '₸')})` ? '#7B99FF' : '#32CD32',
                                                fill: true,
                                                backgroundColor: type == `Продажи (${checkDomain('₽', '₸')})` ? 'rgb(123,153,255, 0.3)' : 'rgb(50,205,50, 0.3)'
                                            }
                                        ],
                                        
                                    }}
                                    />
                            ) : null
                        }
                    </div>
                </Col>
            </Row>
            
            
        </div>
    )
}

export default StatChart;