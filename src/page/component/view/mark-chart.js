import ReactApexChart from 'react-apexcharts';
import {useEffect, useState} from "react";
import {serviceHust} from "../../../utils/service";

const MarkChart = () => {
    const [data, setData] = useState([]);

    const customTooltip = ({series, dataPointIndex, w}) => {
        const xDateValue = w.config.xaxis.categories[dataPointIndex];
        const yVnIndexValue = series[1][dataPointIndex];
        const yVnDafValue = series[0][dataPointIndex];

        // Tạo nội dung tooltip tùy chỉnh
        return `
            <div class="_tooltip_main_">
                <div class="_tooltip_date_">
                    ${xDateValue}
                </div>
                <div class='_tooltip_value_'>
                    <div class="_tooltip_title_">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="2" y="2" width="8" height="8" rx="1" fill="#2939F5"/>
                        </svg>
                        <span>VN-Index</span>
                    </div>
                   
                    <div class="_tooltip_value_2_">
                        ${yVnIndexValue}
                    </div>
                </div>
                <div class='_tooltip_value_'>
                    <div class="_tooltip_title_">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="2" y="2" width="8" height="8" rx="1" fill="#58D764"/>
                        </svg>
                        <span>VNDAF</span>
                    </div>
                    
                    <div class="_tooltip_value_2_">
                        ${yVnDafValue}
                    </div>
                </div>
            </div>
        `;
    };

    const initialData = {
        series: [
            {
                name: 'Điểm chuẩn',
                data: data.map(item => item.close),
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'area',
                events: {
                    beforeZoom: (e, {xaxis}) => {
                        let maindifference = (new Date(maxDate)).valueOf() - new Date(minDate).valueOf();
                        let zoomdifference = xaxis.max - xaxis.min;
                        if (zoomdifference > maindifference)
                            return {
                                xaxis: {
                                    min: minDate,
                                    max: maxDate
                                }
                            };
                        else {
                            return {
                                // keep on zooming
                                xaxis: {
                                    min: xaxis.min,
                                    max: xaxis.max
                                }
                            }
                        }
                    },
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 1,
                curve: 'smooth',
            },
            xaxis: {
                type: 'datetime',
                categories: data.map(item => item.date),
                labels: {
                    format: 'dd/MM/yyyy'
                },
                min: startTime,
                max: endTime
            },
            tooltip: {
                custom: customTooltip,
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                }
            },
            colors: ['#ff6d78'],
        },
    };

    const [chartData, setChartData] = useState(initialData);

    useEffect(() => {
        serviceHust.searchBenchmark(startTime, endTime).then(data => {
            setData(data);
            const initialData = {
                series: [
                    {
                        name: 'MARK',
                        data: data.map(item => item.close),
                    },
                ],
                options: {
                    chart: {
                        height: 350,
                        type: 'area',
                        events: {
                            beforeZoom: (e, {xaxis}) => {
                                let maindifference = (new Date(endTime)).valueOf() - new Date(startTime).valueOf();
                                let zoomdifference = xaxis.max - xaxis.min;
                                if (zoomdifference > maindifference)
                                    return {
                                        xaxis: {
                                            min: minDate,
                                            max: maxDate
                                        }
                                    };
                                else {
                                    return {
                                        // keep on zooming
                                        xaxis: {
                                            min: xaxis.min,
                                            max: xaxis.max
                                        }
                                    }
                                }
                            },
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        width: 1,
                        curve: 'smooth',
                    },
                    xaxis: {
                        type: 'datetime',
                        categories: data.map(item => item.date),
                        labels: {
                            format: 'dd/MM/yyyy'
                        },
                        min: startTime,
                        max: endTime
                    },
                    tooltip: {
                        custom: customTooltip,
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 1,
                        }
                    },
                    colors: ['#ff6d78'],
                },
            };
            setChartData(initialData)
        }).catch(e => {
            console.log(e)
        })
    }, [startTime, endTime]);


    console.log(chartData)


    return (
        <div id="chart">
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="area"
                height={350}
            />
        </div>
    );
}

export default MarkChart;