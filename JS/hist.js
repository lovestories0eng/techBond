function renderChart(data) {
    var cw = document.getElementById("hist");
    cw.innerHTML = "";
    var max = 0;
    for (var index in data) {
        if (data[index] > max)
            max = data[index];
    }
    var percent = 180 / max;
    var i = 0;
    for (var index in data) {
        var bar = document.createElement("div");
        bar.id = index + "_" + data[index];
        bar.style.height = Math.round(percent * data[index]) + "px";
        bar.style.width = "15px";
        bar.style.left = (i * 40) + 25 + "px";
        bar.style.marginLeft = (i * 20) + "px";
        bar.style.position = "absolute";
        bar.style.background = "none repeat scroll 0 0 rgb(47, 62, 89)";
        bar.style.overflow = "hidden";
        bar.setAttribute("title", index + "：" + data[index]);
        bar.style.display = "block";
        bar.style.top = 200 - Math.round(percent * data[index]) + "px";
        cw.appendChild(bar);
        var axis = document.createElement("div");
        axis.id = "axis_" + i;
        axis.style.width = "40px";
        axis.style.left = 12 + (i * 40) + "px";
        axis.style.marginLeft = (i * 20) + "px";
        axis.style.textAlign = "center";
        axis.style.position = "absolute";
        axis.style.top = "205px";
        axis.innerHTML = '<span style="font-size:12px; color:grey;"> ' + (i + 1) + '</span>';
        cw.appendChild(axis);
        i++;
    }
    for (var i = 0; i < 5; i++) {
        var ayis = document.createElement("div");
        // y轴的样式
        ayis.style.width = "30px";
        ayis.style.position = "absolute";
        ayis.style.top = (36 * i) + (20 - 6) + "px";
        ayis.style.left = "2px";
        ayis.innerHTML = '<span style="font-size:12px; color:grey;"> ' + Math.round(max - (max / 5) * i) + '</span>';
        cw.appendChild(ayis);
        var line = document.createElement("div");
        // 线条的样式。
        line.setAttribute("style", "width:550px; left:25px; border-top:1px dotted grey; height:1px; line-height:1px; display:block; overflow:hidden; position:absolute;");
        line.style.top = (36 * i) + 20 + "px";
        cw.appendChild(line);
    }
}
var data = [10, 60, 50, 30, 40, 80, 20, 70, 100];
renderChart(data);