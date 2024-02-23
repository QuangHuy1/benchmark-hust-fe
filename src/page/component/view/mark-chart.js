import ReactApexChart from 'react-apexcharts';
import {useEffect, useState} from "react";
import {serviceHust} from "../../../utils/service";
import {YEARS} from "../../../utils/const";

const MarkChart = ({facultyIds, typeTest, number}) => {
    const [data, setData] = useState([]);

    const customTooltip = ({series, dataPointIndex, w}) => {
        const xDateValue = w.config.xaxis.categories[dataPointIndex];
        const yMarkValue = series[0][dataPointIndex];

        // Tạo nội dung tooltip tùy chỉnh
        return `
            <div class="_tooltip_main_">
                <div class="_tooltip_date_">
                </div>
                <div class='_tooltip_value_'>
                    <div class="_tooltip_title_">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="2" y="2" width="8" height="8" rx="1" fill="#2939F5"/>
                        </svg>
                        <span>Điểm chuẩn</span>
                    </div>
                   
                    <div class="_tooltip_value_2_">
                        ${yMarkValue}
                    </div>
                </div>
                <div class='_tooltip_value_'>
                    <div class="_tooltip_title_">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="2" y="2" width="8" height="8" rx="1" fill="#58D764"/>
                        </svg>
                        <span>Năm</span>
                    </div>
                    
                    <div class="_tooltip_value_2_">
                        ${xDateValue}
                    </div>
                </div>
            </div>
        `;
    };

    const initialData = {
        series: [
            {
                name: 'Điểm chuẩn',
                data: data.map(item => item.score),
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'bar',
                // events: {
                //     beforeZoom: (e, {xaxis}) => {
                //         let maindifference = (new Date(maxDate)).valueOf() - new Date(minDate).valueOf();
                //         let zoomdifference = xaxis.max - xaxis.min;
                //         if (zoomdifference > maindifference)
                //             return {
                //                 xaxis: {
                //                     min: minDate,
                //                     max: maxDate
                //                 }
                //             };
                //         else {
                //             return {
                //                 // keep on zooming
                //                 xaxis: {
                //                     min: xaxis.min,
                //                     max: xaxis.max
                //                 }
                //             }
                //         }
                //     },
                // },
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
                categories: YEARS.map(item => item.value),
                // labels: {
                //     format: 'yyyy'
                // },
                // min: 2017,
                // max: 2018
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
        if (facultyIds === undefined) return;
        serviceHust.searchBenchmark({
            facultyIds: facultyIds,
            groupType: typeTest === 0 ? 'BASIC' : 'TSA',
            years: YEARS.map(item => item.value).join(",")
        }).then(data => {
            let content = data?.content;
            if (number) {
                content = data?.content.splice(0, number);
            }
            setData(content);
            const initialData = {
                series: [
                    {
                        name: 'MARK',
                        data: content.map(item => item.score),
                    },
                ],
                options: {
                    chart: {
                        height: 350,
                        type: 'bar',
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        width: 1,
                        curve: 'smooth',
                    },
                    xaxis: {
                        type: 'category',
                        categories: content.map(item => item?.year),
                        // labels: {
                        //     format: 'dd/MM/yyyy'
                        // },
                        // min: startTime,
                        // max: endTime
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
    }, [facultyIds, typeTest]);

    return (
        <div style={{width: '100%'}} id="chart">
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={350}
            />
        </div>
    );
}

export default MarkChart;