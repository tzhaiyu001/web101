/**
 * Created by Administrator on 2018/4/2.
 */

/**-----------------------------创建Map实例----------------------- */
var map = new BMap.Map("allmap");

/**-----------------------------设置中心点坐标和地图级别----------------------- */
map.centerAndZoom(new BMap.Point(117.330108,34.811223), 12);

/**-----------------------------开启鼠标滚轮缩放----------------------- */
map.enableScrollWheelZoom(true);

/**-----------------------------设置鼠标样式----------------------- */
map.setDefaultCursor("url('bird.cur')");


/**-----------------------------添加带有定位的导航控件----------------------- */
var navigationControl = new BMap.NavigationControl({
    // 靠左上角位置
    anchor: BMAP_ANCHOR_TOP_LEFT,
    type: BMAP_NAVIGATION_CONTROL_LARGE,
    enableGeolocation: true
});
map.addControl(navigationControl);

/**-----------------------------添加覆盖物----------------------- */
var person, home, car, video;
$(".bill ul input").each(function () {
    $(this).change(function () {
        $(this).parent().siblings("li").find("input").attr("checked",null);
        if (this.checked) {
            map.clearOverlays();
            switch (this.name) {
                case "person":
                    personLoad();
                    break;
                case "home":
                    homeLoad();
                    break;
                case "car":
                    carLoad();
                    break;
                case "video":
                    videoLoad();
                    break;
                case "hot":
                    hotLoad();
                    break;
            }
        } else {
            map.clearOverlays();
        }

    })
});

/**-----------------------------坐标定位----------------------- */
function theLocation(){
    $(".bill ul input").each(function () {
            $(this).attr("checked", null);
        });
    var personPoints = [[117.330108,34.811223], [117.330108,34.811223], [117.330108,34.811223], [117.330108,34.811223], [117.330108,34.811223], [117.330108,34.811223], [117.330108,34.811223], [117.470514, 34.413687], [117.471233, 34.435984], [117.530593, 34.382412], [117.536342, 34.303877], [117.543528, 34.386275], [117.584779, 34.354743], [117.654343, 34.378175], [117.625598, 34.389889], [117.62301, 34.384406], [117.65923, 34.45043], [117.683377, 34.368205], [117.537348, 34.495002], [117.520675, 34.543037], [117.567244, 34.4711], [117.427252, 34.505707], [117.40253, 34.516907], [117.403303, 34.498230], [117.351938, 34.372691], [117.297321, 34.30836], [117.320892, 34.428012], [117.647444, 34.3333], [117.668716, 34.295888], [117.668141, 34.277925], [117.642845, 34.244485], [117.661242, 34.225015], [117.697462, 34.185563]];
        var new_point = new BMap.Point(personPoints[Math.ceil(Math.random()*20)][0],personPoints[Math.ceil(Math.random()*20)][1]);
        map.clearOverlays();
        var location = new BMap.Marker(new_point);  // 创建标注
        map.addOverlay(location);              // 将标注添加到地图中
        location.setAnimation(BMAP_ANIMATION_BOUNCE);
        addClickHandler(location);
        //map.panTo(new_point);
}
/**-----------------------------弹出监控信息----------------------- */
function addClickHandler(videoPoints){
    videoPoints.addEventListener("click",function(e){
            art.dialog.open("waterQuliyTail.html", {
                title: "测试详情",
                lock: true,
                width: 1050,
                height: 550
            },true);
    }
    );
}
var persons;
/**-----------------------------人员监控----------------------- */
function personLoad() {
    map.clearOverlays();
    var personPoints = [[117.53036, 34.436731], [117.530736, 34.421908], [117.545307, 34.406461],
        [117.562644, 34.306742], [117.569974, 34.382288], [117.498685, 34.305123], [117.470658, 34.304126],
        [117.470514, 34.413687], [117.471233, 34.435984], [117.530593, 34.382412], [117.536342, 34.303877],
        [117.543528, 34.386275], [117.584779, 34.354743], [117.654343, 34.378175], [117.625598, 34.389889],
        [117.62301, 34.384406], [117.65923, 34.45043], [117.683377, 34.368205], [117.537348, 34.495002],
        [117.520675, 34.543037], [117.567244, 34.4711], [117.427252, 34.505707], [117.40253, 34.516907],
        [117.403303, 34.498230], [117.351938, 34.372691], [117.297321, 34.30836], [117.320892, 34.428012],
        [117.647444, 34.3333], [117.668716, 34.295888], [117.668141, 34.277925], [117.642845, 34.244485],
        [117.661242, 34.225015], [117.697462, 34.185563]];
    persons = [];
    var sContent ='<div class="personMain"><div class="personLeft"><img src="./img/adminLogin.png"></div> <div class="personRight"><p><label>'+"姓名："+'</label><span>'+"李和平"
        +'</span></p><p><label>'+"性别："+'</label><span>'+"男"+'</span></p><p><label>'+"职务："+'</label><span>'+"村长"
        +'</span></p><p><label>'+"负责河道："+'</label><span>'+'沱江31-35段'+'</span></p><p><label>'+'联系电话：'
        +'</label><span>'+'13612302321'+'</span></p><p><label>'+'巡查次数：'+'</label><span>'+'254次'+'</span><label style="margin-left: 20px">'+'缺查次数：'
        +'</label><span>'+'32次'+'</span><label style="margin-left: 20px">'+'案件上报数：'+'</label><span>'+'65件'+'</span></p><div>'
        +'<button class="btn btn-sm btn-primary">'+'人员详情'+'</button><button class="btn btn-sm btn-primary" onclick="theLocation()">'+'人员定位'
        +'</button><button class="btn btn-sm btn-primary" onclick="personTrail()">'+'巡查轨迹'+'</button></div></div></div>'
    for (var i = 0; i < personPoints.length; i++) {
        var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
        var pt = new BMap.Point(personPoints[i][0], personPoints[i][1]);
        var myIcon = new BMap.Icon("./img/adminLogin.png", new BMap.Size(30, 30));
        person = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        persons.push(person);
        map.addOverlay(persons);

        person.addEventListener("click", function(){
            this.openInfoWindow(infoWindow);
            //图片加载完毕重绘infowindow
            //document.getElementById('imgDemo').onload = function (){


            //    infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
            //}
        });
    }
    var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:persons});
}

/**-----------------------------获取地图坐标----------------------- */
function showInfo(e){
    //alert(e.point.lng + ", " + e.point.lat);
}
map.addEventListener("click", showInfo);

/**-----------------------------人员轨迹----------------------- */
function personTrail(){

    map.clearOverlays();
    //var point = new BMap.Point(117.061128, 34.592602);
    var points = [
        new BMap.Point(117.483018, 34.487755),
        new BMap.Point(117.495667, 34.473065),
        new BMap.Point(117.491067, 34.430974),
        new BMap.Point(117.47037, 34.411043),
        new BMap.Point(117.464621, 34.398085),
        new BMap.Point(117.468071, 34.370171),
        new BMap.Point(117.462322, 34.355214),
        new BMap.Point(117.409429, 34.337262)
    ];
    var markers = [
        points[1],//西安北站
        points[2],//咸阳站
        points[3],//咸阳秦都站
        points[5]//兴平站
    ];
    //用站点画出路线，参数：站点、线路颜色、线路宽度、透明度
    var polyline = new BMap.Polyline(points, {strokeColor:"red", strokeWeight:6, strokeOpacity:0.8});

    map.addOverlay(polyline);//添加轨迹到地图

    var lushu = new BMapLib.LuShu(map, points, {
        //landmarkPois:此参数是路书移动的时候碰到这个点会触发pauseTime停留中设置的时间，单位为秒，经纬度误差超过十米不会停止
        landmarkPois:[
            {lng:markers[0].lng,lat:markers[0].lat,html:'西安北站到了',pauseTime:1},
            {lng:markers[1].lng,lat:markers[1].lat,html:'咸阳站到了',pauseTime:1},
            {lng:markers[2].lng,lat:markers[2].lat,html:'咸阳秦都站到了',pauseTime:1},
            {lng:markers[3].lng,lat:markers[3].lat,html:'兴平站到了',pauseTime:1}
        ],
        //defaultContent: '人员继续移动...',
        speed: 4000,//速度，单位米每秒
        /* 1、需要把图片和代码放在同一个文件夹下面
         * 2、size()是设置图片大小，图片过大可以截取
         * 3、anchor是设置偏移，默认是图片最中间，设置偏移目的是让图片底部中间与坐标重合
         */
        icon: new BMap.Icon('./img/station.png', new BMap.Size(32, 70), {anchor: new BMap.Size(27, 33)}),//声明高铁标注
        autoView:true,
        enableRotation: false
    });

    var icon1 = new BMap.Icon('./img/station.png', new BMap.Size(32,32),{anchor: new BMap.Size(16, 32)});//声明站点标注
    for (var i=0;i<markers.length;i++){
        map.addOverlay(new BMap.Marker(markers[i],{icon:icon1}));//添加站点marker
    }
    //map.centerAndZoom(point, 12 );//设置中心点和级别（级别是1-20）数字越大越是放大
    lushu.start();
}

/**-----------------------------显示建筑物----------------------- */
function homeLoad() {
    map.clearOverlays();
    var homePoints = [
        [117.465591, 34.385528], [117.530844, 34.305496], [117.543205, 34.436606], 
        [117.661063, 34.484173], [117.6602, 34.447068], [117.685209, 34.464501], [117.629442, 34.385029],
        [117.593798, 34.334921], [117.572526, 34.381789]];
    for (var i = 0; i < homePoints.length; i++) {
        var pt = new BMap.Point(homePoints[i][0], homePoints[i][1]);
        var myIcon = new BMap.Icon("./img/adminLogin.png", new BMap.Size(30, 30));
        var marker2 = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        map.addOverlay(marker2);
        marker2.addEventListener("click", homeInfo);
    }
}
function homeInfo() {
}

/**-----------------------------显示车辆----------------------- */
function carLoad() {
    map.clearOverlays();
    var sContent ='<div class="personMain"><div class="personLeft"><img src="./img/adminLogin.png"></div> <div class="personRight"><p><label>'+"姓名："+'</label><span>'+"李和平"
        +'</span></p><p><label>'+"性别："+'</label><span>'+"男"+'</span></p><p><label>'+"职务："+'</label><span>'+"村长"
        +'</span></p><p><label>'+"负责河道："+'</label><span>'+'沱江31-35段'+'</span></p><p><label>'+'联系电话：'
        +'</label><span>'+'13612302321'+'</span></p><p><label>'+'巡查次数：'+'</label><span>'+'254次'+'</span><label style="margin-left: 20px">'+'缺查次数：'
        +'</label><span>'+'32次'+'</span><label style="margin-left: 20px">'+'案件上报数：'+'</label><span>'+'65件'+'</span></p><div>'
        +'<button class="btn btn-sm btn-primary">'+'人员详情'+'</button><button class="btn btn-sm btn-primary">'+'人员定位'
        +'</button><button class="btn btn-sm btn-primary">'+'巡查轨迹'+'</button></div></div></div>'
    var carPoints = [[117.465591, 34.385528], [117.530844, 34.305496], [117.543205, 34.436606], [117.661063, 34.484173], [117.6602, 34.447068], [117.685209, 34.464501], [117.629442, 34.385029], [117.593798, 34.334921], [117.572526, 34.381789]];
    var cars = [];
    var pt = null;
    for (var i = 0; i < carPoints.length; i++) {
        var infoWindow = new BMap.InfoWindow(sContent);
        pt = new BMap.Point(carPoints[i][0], carPoints[i][1]);
        var myIcon = new BMap.Icon("./img/adminLogin.png", new BMap.Size(30, 30));
        marker2 = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        cars.push(marker2);
        map.addOverlay(cars);

        marker2.addEventListener("click", function(){
            this.openInfoWindow(infoWindow);
        });
    }
    var markerClusterer = new BMapLib.MarkerClusterer(map, {markers:cars});
}


/**-----------------------------车辆轨迹----------------------- */
function carTrail(){
    map.clearOverlays();
    $(".carSearch").fadeIn();
}
function carInfo() {
    var speed = $("#carSelect").val();
    carMove();
    map.clearOverlays();
    //var point = new BMap.Point(117.061128, 34.592602);
    var points = [
        new BMap.Point(117.575005, 34.457127),
        new BMap.Point(117.633646, 34.490991),
        new BMap.Point(117.643995, 34.486012),
        new BMap.Point(117.691138, 34.455135),
        new BMap.Point(117.698612, 34.39036),
        new BMap.Point(117.630197, 34.337012),
        new BMap.Point(117.568106, 34.387369),
        new BMap.Point(117.575005, 34.457127)
    ];
    var markers = [
        points[1],//西安北站
        points[2],//咸阳站
        points[3],//咸阳秦都站
        points[5]//兴平站
    ];
    //用站点画出路线，参数：站点、线路颜色、线路宽度、透明度
    var polyline = new BMap.Polyline(points, {strokeColor:"red", strokeWeight:6, strokeOpacity:0.8});
    map.addOverlay(polyline);//添加轨迹到地图
    var lushu = new BMapLib.LuShu(map, points, {
        //landmarkPois:此参数是路书移动的时候碰到这个点会触发pauseTime停留中设置的时间，单位为秒，经纬度误差超过十米不会停止
        landmarkPois:[
            {lng:markers[0].lng,lat:markers[0].lat,html:'西安北站到了',pauseTime:1},
            {lng:markers[1].lng,lat:markers[1].lat,html:'咸阳站到了',pauseTime:1},
            {lng:markers[2].lng,lat:markers[2].lat,html:'咸阳秦都站到了',pauseTime:1},
            {lng:markers[3].lng,lat:markers[3].lat,html:'兴平站到了',pauseTime:1}
        ],
        defaultContent: '车辆继续移动...',
        speed: speed,//速度，单位米每秒
        /* 1、需要把图片和代码放在同一个文件夹下面
         * 2、size()是设置图片大小，图片过大可以截取
         * 3、anchor是设置偏移，默认是图片最中间，设置偏移目的是让图片底部中间与坐标重合
         */
        icon: new BMap.Icon('./img/camera.png', new BMap.Size(52, 26), {anchor: new BMap.Size(27, 13)}),//声明高铁标注
        autoView:true,
        enableRotation: true
    });
    var icon1 = new BMap.Icon('./img/station.png', new BMap.Size(32,32),{anchor: new BMap.Size(16, 32)});//声明站点标注
    for (var i=0;i<markers.length;i++){
        map.addOverlay(new BMap.Marker(markers[i],{icon:icon1}));//添加站点marker
    }
    //map.centerAndZoom(point, 12 );//设置中心点和级别（级别是1-20）数字越大越是放大
    lushu.start();
}
function carMove(){
    $(".carSearch").hide();
}
/**-----------------------------显示监控设备----------------------- */
function videoLoad() {
    map.clearOverlays();
    var videoPoints = [[117.330108,34.811223], [117.296171, 34.274307], [117.554308, 34.482679], [117.574143, 34.430845], [117.545109, 34.408703], [117.490492, 34.306992], [117.452548, 34.38478], [117.447661, 34.372068], [117.625598, 34.385278], [117.656643, 34.451551], [117.661817, 34.480687], [117.683051, 34.466743], [117.65693, 34.377552], [117.583054, 34.358108], [117.514926, 34.509316]];

    for (var i = 0; i < videoPoints.length; i++) {
        var pt = new BMap.Point(videoPoints[i][0], videoPoints[i][1]);
        var myIcon = new BMap.Icon("./img/camera.png", new BMap.Size(30, 30));
        var marker2 = new BMap.Marker(pt, {icon: myIcon});  // 创建标注
        map.addOverlay(marker2);
        marker2.addEventListener("click", videoInfo);
    }

}


/**-----------------------------显示热力图----------------------- */
function hotLoad() {
    map.clearOverlays();
    var hotPoints =
        [
        {"lng":117.647409,"lat":34.903069,"count":50},
        {"lng":117.547409,"lat":34.916532,"count":51},
        {"lng":117.419787,"lat":34.930658,"count":15},
        {"lng":117.418455,"lat":34.920921,"count":40},
        {"lng":117.418843,"lat":34.915516,"count":100},
        {"lng":117.42546,"lat":34.918503,"count":6},
        {"lng":117.423289,"lat":34.919989,"count":18},
        {"lng":117.418162,"lat":34.915051,"count":80},
        {"lng":117.422030,"lat":34.91782,"count":11},
        {"lng":117.41387,"lat":34.917253,"count":7},
        {"lng":117.41773,"lat":34.919426,"count":42},
        {"lng":117.421107,"lat":34.916445,"count":4},
        {"lng":117.417521,"lat":34.917943,"count":27},
        {"lng":117.419812,"lat":34.920836,"count":23},
        {"lng":117.420682,"lat":34.91463,"count":60},
        {"lng":117.415424,"lat":34.924675,"count":8},
        {"lng":117.419242,"lat":34.914509,"count":15},
        {"lng":117.422766,"lat":34.921408,"count":25},
        {"lng":117.421674,"lat":34.924306,"count":21},
        {"lng":117.427268,"lat":34.92267,"count":1},
        {"lng":117.417721,"lat":34.920034,"count":51},
        {"lng":117.412456,"lat":34.92667,"count":7},
        {"lng":117.420432,"lat":34.919114,"count":11},
        {"lng":117.425013,"lat":34.921611,"count":35},
        {"lng":117.418733,"lat":34.931037,"count":22},
        {"lng":117.419336,"lat":34.931134,"count":4},
        {"lng":117.413557,"lat":34.923254,"count":5},
        {"lng":117.418367,"lat":34.92943,"count":3},
        {"lng":117.424312,"lat":34.919621,"count":100},
        {"lng":117.423874,"lat":34.919447,"count":87},
        {"lng":117.424225,"lat":34.923091,"count":32},
        {"lng":117.417801,"lat":34.921854,"count":44},
        {"lng":117.417129,"lat":34.928227,"count":21},
        {"lng":117.426426,"lat":34.922286,"count":80},
        {"lng":117.421597,"lat":34.91948,"count":32},
        {"lng":117.423895,"lat":34.920787,"count":26},
        {"lng":117.423563,"lat":34.921197,"count":17},
        {"lng":117.417982,"lat":34.922547,"count":17},
        {"lng":117.426126,"lat":34.921938,"count":25},
        {"lng":117.42326,"lat":34.915782,"count":100},
        {"lng":117.419230,"lat":34.916759,"count":30},
        {"lng":117.417185,"lat":34.929123,"count":11},
        {"lng":117.417237,"lat":34.927518,"count":9},
        {"lng":117.417784,"lat":34.915754,"count":47},
        {"lng":117.420193,"lat":34.917061,"count":52},
        {"lng":117.422735,"lat":34.915619,"count":100},
        {"lng":117.418495,"lat":34.915958,"count":46},
        {"lng":117.416292,"lat":34.931046,"count":9},
        {"lng":117.419916,"lat":34.924055,"count":8},
        {"lng":117.42189,"lat":34.921308,"count":11},
        {"lng":117.413765,"lat":34.929376,"count":3},
        {"lng":117.418232,"lat":34.920348,"count":50},
        {"lng":117.417554,"lat":34.930511,"count":15},
        {"lng":117.418568,"lat":34.918161,"count":23},
        {"lng":117.413461,"lat":34.926306,"count":3},
        {"lng":117.42232,"lat":34.92161,"count":13},
        {"lng":117.4174,"lat":34.928616,"count":6},
        {"lng":117.424679,"lat":34.915499,"count":21},
        {"lng":117.42171,"lat":34.915738,"count":29},
        {"lng":117.417836,"lat":34.916998,"count":99},
        {"lng":117.420755,"lat":34.928001,"count":10},
        {"lng":117.414077,"lat":34.930655,"count":14},
        {"lng":117.426092,"lat":34.922995,"count":16},
        {"lng":117.41535,"lat":34.931054,"count":15},
        {"lng":117.413022,"lat":34.921895,"count":13},
        {"lng":117.415551,"lat":34.913373,"count":17},
        {"lng":117.421191,"lat":34.926572,"count":1},
        {"lng":117.419612,"lat":34.917119,"count":9},
        {"lng":117.418237,"lat":34.921337,"count":54},
        {"lng":117.423776,"lat":34.921919,"count":26},
        {"lng":117.417694,"lat":34.92536,"count":17},
        {"lng":117.415377,"lat":34.914137,"count":19},
        {"lng":117.417434,"lat":34.914304,"count":43},
        {"lng":117.42588,"lat":34.922622,"count":27},
        {"lng":117.418345,"lat":34.919467,"count":8},
        {"lng":117.426883,"lat":34.917171,"count":3},
        {"lng":117.423877,"lat":34.916659,"count":34},
        {"lng":117.415712,"lat":34.915613,"count":14},
        {"lng":117.419869,"lat":34.931416,"count":12},
        {"lng":117.416956,"lat":34.925377,"count":11},
        {"lng":117.42066,"lat":34.925017,"count":38},
        {"lng":117.416244,"lat":34.920215,"count":91},
        {"lng":117.41929,"lat":34.915908,"count":54},
        {"lng":117.422104,"lat":34.919658,"count":21},
        {"lng":117.4183,"lat":34.925015,"count":15},
        {"lng":117.421969,"lat":34.913527,"count":3},
        {"lng":117.422936,"lat":34.921854,"count":24},
        {"lng":117.41905,"lat":34.929217,"count":12},
        {"lng":117.424579,"lat":34.914987,"count":57},
        {"lng":117.42076,"lat":34.915251,"count":70},
        {"lng":117.425867,"lat":34.918989,"count":8}];
    heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
    map.addOverlay(heatmapOverlay);
    heatmapOverlay.setDataSet({data:hotPoints,max:100});
    closeHeatmap();
    function setGradient(){
        var gradient = {};
        var colors = document.querySelectorAll("input[type='color']");
        colors = [].slice.call(colors,0);
        colors.forEach(function(ele){
            gradient[ele.getAttribute("data-key")] = ele.value;
        });
        heatmapOverlay.setOptions({"gradient":gradient});
    }
    setTimeout(function(){
        heatmapOverlay.show();
    },1500);
}

/**-----------------------------显示视频监控----------------------- */
function videoInfo(){
    art.dialog.open('playback.html',
        {title: '视频监控', width: '900px', height: '600px',shade: 0.5,mask:true});
}