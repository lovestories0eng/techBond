// axios.defaults.baseURL = 'http://localhost:5000';
// axios.defaults.baseURL = 'http://0.0.0.0:5000';





function request_sse_bond_day_data(date) {
    // post请求
    axios({
        // 请求方法
        method: 'POST',
        type: 'json',
        // url
        url: '/stockData/ssddd.json',
    }).then(response => {
        data = JSON.stringify(response.data)
        console.log(data);
        var sse_bond_day = document.getElementById("ssebond-day");
        sse_bond_day.removeChild(sse_bond_day.lastChild)
        var tab = document.createElement("table");
        sse_bond_day.appendChild(tab);
        var thead = document.createElement("thead");
        var field = [];
        for (i in response.data) {
            var td = document.createElement("td");
            td.innerHTML = i;
            thead.appendChild(td);
            field.push(i);
        }
        tab.appendChild(thead);
        var json_length = Object.keys(response.data[field[0]]).length;

        for (let i = 0; i < json_length; i++) {
            var tr = document.createElement("tr");
            for (let j = 0; j < field.length; j++) {
                var td = document.createElement("td");
                let td_data = response.data[field[j]][i];
                if (Object.is(td_data, null)) {
                    td.innerHTML = "暂无数据";
                } else {
                    td.innerHTML = td_data;
                }
                tr.appendChild(td);
            }
            tab.appendChild(tr);
        }
    })
}

function request_sse_deal_day_data(date) {
    // post请求
    axios({
        // 请求方法
        method: 'POST',
        // url
        url: '/stockData/bs.json',
        type: 'json,'
    }).then(response => {
        var sse_deal_day = document.getElementById("ssedeal-day");
        sse_deal_day.removeChild(sse_deal_day.lastChild)
        var tab = document.createElement("table");
        sse_deal_day.appendChild(tab);
        var thead = document.createElement("thead");
        var field = [];
        for (i in response.data) {
            var td = document.createElement("td");
            td.innerHTML = i;
            thead.appendChild(td);
            field.push(i);
        }
        tab.appendChild(thead);
        let json_length = Object.keys(response.data[field[0]]).length;

        for (let i = 0; i < json_length; i++) {
            var tr = document.createElement("tr");
            for (let j = 0; j < field.length; j++) {
                var td = document.createElement("td");
                let td_data = response.data[field[j]][i];
                if (Object.is(td_data, null)) {
                    td.innerHTML = "暂无数据";
                } else {
                    td.innerHTML = td_data;
                }
                tr.appendChild(td);
            }
            tab.appendChild(tr);
        }
    })
}

function request_general_picture_data(date) {
    axios({
        // 请求方法
        method: 'POST',
        // url
        url: '/stockData/indexDailybasic.json',
        type: 'json'
    }).then(response => {
        console.log(response.data);
        var general_picture = document.getElementById("general-picture");
        general_picture.removeChild(general_picture.lastChild)
        var tab = document.createElement("table");
        general_picture.appendChild(tab);
        var thead = document.createElement("thead");
        var field = [];
        for (i in response.data) {
            var td = document.createElement("td");
            td.innerHTML = i;
            thead.appendChild(td);
            field.push(i);
        }
        tab.appendChild(thead);
        let json_length = Object.keys(response.data[field[0]]).length;

        for (let i = 0; i < json_length; i++) {
            var tr = document.createElement("tr");
            for (let j = 0; j < field.length; j++) {
                var td = document.createElement("td");
                let td_data = response.data[field[j]][i];
                if (Object.is(td_data, null)) {
                    td.innerHTML = "暂无数据";
                } else {
                    td.innerHTML = td_data;
                }
                tr.appendChild(td);
            }
            tab.appendChild(tr);
        }
    })
}

function request_sse_index() {
    // post请求
    axios({
        // 请求方法
        method: 'POST',
        // url
        url: '/stockData/SZZS.json',
    }).then(response => {
        // console.log(response.data);
        let sse_index_data = [];
        let field = [];
        for (i in response.data) {
            field.push(i);
        }
        let json_length = Object.keys(response.data[field[0]]).length;
        for (let i = 0; i < json_length; i++) {
            let temp_array = [];
            for (let j = 0; j < field.length; j++) {
                temp_array.push(response.data[field[j]][i]);
            }
            sse_index_data.push(temp_array);
        }
        draw_k_line(sse_index_data);
        // console.log(sse_index_data);
        // console.log(sse_index_data[0][0])
    })
}

function request_motion_index(name) {
    // post请求
    axios({
        // 请求方法
        method: 'POST',
        // url
        url: '/stockData/motionIndex.json',
        // url参数
        params: {
            name: name,
        },
    }).then(response => {
        let motion_array = [];
        let keys = Object.keys(response.data);
        for (let i = 0; i < keys.length; i++) {
            let temp_array = [];
            let sub_keys = Object.keys(response.data[keys[i]]);
            for (let j = 0; j < sub_keys.length; j++) {
                temp_array.push(response.data[keys[i]][sub_keys[j]]);
            }
            motion_array.push(temp_array);
        }
        draw_situation(motion_array);
    })
}