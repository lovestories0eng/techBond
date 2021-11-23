function draw_situation(data_info) {
    let chartDom_info = document.getElementById('situation');
    let myChart_info = echarts.init(chartDom_info);
    let option_info;
    const valueList = data_info[0];
    const ar = data_info[1];
    const br = data_info[2];
    const dateList = data_info[3];
    option_info = {
        // Make gradient line here
        visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
        }, {
            show: false,
            type: 'continuous',
            seriesIndex: 1,
            dimension: 0,
            min: 0,
            max: dateList.length - 1
        }],
        title: [{
            left: 'center',
            text: '价格趋势'
        }, {
            top: '55%',
            left: 'center',
            text: '情绪指数'
        }],
        tooltip: {
            trigger: 'axis'
        },
        xAxis: [{
            data: dateList
        }, {
            data: dateList,
            gridIndex: 1
        }],
        yAxis: [{
            min: Math.floor(Math.min.apply(null, valueList) - (Math.max.apply(null, valueList) - Math.min.apply(null, valueList)) * 0.2),
            max: Math.ceil(Math.max.apply(null, valueList) + (Math.max.apply(null, valueList) - Math.min.apply(null, valueList)) * 0.2)
        }, {
            gridIndex: 1
        }],
        grid: [{
            bottom: '60%'
        }, {
            top: '60%'
        }],
        series: [{
                name: '价格趋势',
                type: 'line',
                showSymbol: false,
                data: valueList,
            }, {
                name: 'AR',
                type: 'line',
                showSymbol: false,
                data: ar,
                xAxisIndex: 1,
                yAxisIndex: 1
            },
            {
                name: 'BR',
                type: 'line',
                showSymbol: false,
                data: br,
                xAxisIndex: 1,
                yAxisIndex: 1
            },
        ]
    };

    option_info && myChart_info.setOption(option_info);
}