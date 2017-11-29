function map() {
    var myOptions = {
      zoom: 12,
	  //draggable:false,//禁止拖动
	  mapTypeId:sogou.maps.MapTypeId.ROADMAP,//显示三维地图
	  mapControl:false,//缩放、漫游控件的初始启用/停用状态。
	  //mapControlType:5,//缩放、漫游控件的样式类型
	  scaleControl:false,//比例尺控件的初始启用/停用状态。
	  //scrollwheel:false,//如果为 False，则停用通过滚轮缩放地图的功能。默认情况下启用滚轮功能。
	  //dblclickable:false,//如果为 false，则禁止双击放大地图。默认为true。
      center: new sogou.maps.Point(12956000,4824875)
    }
    var map = new sogou.maps.Map(document.getElementById("container"),myOptions);
	//console.log(map.getCenter());
	var datas = [{
		name: '精图小区锅炉房',
		position: new sogou.maps.Point(12947490.234375,4820044.921875),
		content: "<div class='boxsg'><p>地址：北京市丰台区精图小区55号院</p><p>供热区域为精图小区55号院、56号院，合计供热面积约7.5W平米</p><p><a href='area2.html'>详细信息</a></p></div>"
	},  
	{
		name: '金宸国际公寓锅炉房',
		position: new sogou.maps.Point(12952816.40625,4825449.21875),
		content: "<div class='boxsg'><p>地址：北京市西城区广成街4号院</p><p>供热区域共3栋公寓楼，供热面积约3.5W平米</p><p><a href='area1.html'>详细信息</a></p></div>"
	},
	{
		name: '虎城供热厂大盟换热站',
		position: new sogou.maps.Point(12964300.78125,4820783.203125),
		content: "<div class='boxsg'><p>地址：北京市朝阳区农光里中社区</p><p>供热区域为农光里中社区，供热面积约22.6W平米</p><p><a href='area.html'>详细信息</a></p></div>"
	}];
	
	var infowindow = new sogou.maps.InfoWindow({
		maxWidth: 300
	});
	
	for(var i=0;i<datas.length;i++){
        createMarker(map,infowindow,datas[i])
    }
	
	 //创建标记
	function createMarker(map,infowindow,data)
	{
	  var marker = new sogou.maps.Marker({
			position: data.position,
			map: map,
			//设置信息窗上方标题栏的文字
			title: data.name,
			//icon: 'common/images/icon.gif'
		});
		sogou.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(data.content);
			infowindow.setOptions({disableAutoPan:false});
			infowindow.open(map,marker); 
		});
//		infowindow.setContent(data.content);
//		infowindow.setOptions({disableAutoPan:false});
//		infowindow.open(map,marker); 
	}
}
map();
//$(".sidebar-toggle").click(function(){
//	map();
//})

//中间内容全屏
resizefun();

//window.addEventListener('resize', function() {
//	resizefun();
//})

function resizefun() {
	
	pingHeight = document.documentElement.clientHeight;
	pingWidth = document.documentElement.clientWidth;
	if(pingWidth <　767){
		$(".content-wrapper").css({
			"height": pingHeight - 151
		})
	}else{
		$(".content-wrapper").css({
			"height": pingHeight - 101
		});
	}
	
}
//console.log(document.documentElement.clientHeight);

//resizefun();
//
//window.addEventListener('resize', function() {
//	resizefun();
//})
//
//function resizefun() {
//	
//	pingHeight = document.documentElement.clientHeight;
//	pingWidth = document.documentElement.clientWidth;
//	
//	$(".content-wrapper").css({
//		"height": pingHeight - 101
//	})
	
	//add_lin();
//	$(".qqq").css({
//		"height": pingHeight - 142
//	})
//	$(".requtu").css({
//		"maxHeight": pingHeight - 298
//	})
	
//	$(".sidebar-menu").css({
//		"height": pingHeight - 98
//	})
//	$(".login").css({
//		"left": (pingWidth - 537) / 2
//	})
//	$(".login").css({
//		"top": (pingHeight - 458) / 2
//	})
//
//	var linyi = $(".xg_right").height();
//	var liner = $(".ssjc_right").height();
//	if(linyi < pingHeight - 166) {
//		linyi = pingHeight - 166
//	}
//	if(liner < pingHeight - 166) {
//		liner = pingHeight - 166
//	}
//	if(pingWidth > 990) {
//		$(".ssjc_left").css({
//			"minHeight": liner
//		})
//	} else {
//		$(".ssjc_left").css({
//			"minHeight": 'auto'
//		})
//	}
//	if(pingWidth > 1200) {
//		$(".xj_left").css({
//			"height": linyi
//		})
//	} else {
//		$(".xj_left").css({
//			"height": 'auto'
//		})
//	}
//	$(".sidebar-menu").css({
//		"overflow": 'hidden'
//	})
//	$(".yxjc_info_right").css({
//		"width": ($(".yxjc").width() - 145)
//	})
//}
//
//// 为适应屏幕高度过高加入的兼容代码
//add_lin();
//
//function add_lin() {
//	if(pingHeight < 750) {
//		$(".gao").addClass("xian")
//		$(".lin_kongxian").css({
//			"display": "none"
//		})
//		$(".xtjc .row").css({
//			"paddingTop": 0
//		})
//		$(".yxjc img").css({
//			"paddingTop": 0
//		})
//	}
//	if(pingHeight > 750) {
//		$(".gao").removeClass("xian")
//		$(".lin_kongxian").css({
//			"display": "block"
//		})
//		$(".xtjc .row").css({
//			"paddingTop": "7%"
//		})
//		$(".yxjc img").css({
//			"paddingTop": "7%"
//		})
//	}
//}


//	$(".qqq").niceScroll({
//		touchbehavior: false,
//		cursorcolor: "#000", //内侧滚动条的颜色
//		cursoropacitymax: 0.7, //滚动条的透明度
//		cursorwidth: 5, //滚动条的宽度
//		horizrailenabled: false,
//		cursorborderradius: 1, //滚动轴的圆角
//		autohidemode: true, //自动隐藏滚动条
//		background: '#333', //滚动条的背景色
//		cursorborder: 'solid 1px #fff' //滚动条的边框样式
//	})
//	$(".sidebar-menu").niceScroll({
//		touchbehavior: false,
//		cursorcolor: "#000", //内侧滚动条的颜色
//		cursoropacitymax: 0.7, //滚动条的透明度
//		cursorwidth: 5, //滚动条的宽度
//		horizrailenabled: false,
//		cursorborderradius: 1, //滚动轴的圆角
//		autohidemode: true, //自动隐藏滚动条
//		background: '#333', //滚动条的背景色
//		cursorborder: 'solid 1px #fff' //滚动条的边框样式
//	})
//var map = new AMap.Map('container', {
//  resizeEnable: true,
//  center: [116.391552,39.882072],
//  zoom: 12
//});    
//map.clearMap();  // 清除地图覆盖物
//var markers = [{
//  icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b1.png',
//  position: [116.313395,39.877123],
//	content: "<div class='name'>精图小区锅炉房</div><div class='address'>地址：北京市丰台区精图小区55号院</div><div class='detail'>供热区域为精图小区55号院、56号院，合计供热面积约7.5W平米</div><div class='link'><a href='https:baidu.com'>详细信息</a></div>"
//},  
//{
//  icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b2.png',
//  position: [116.362088,39.913013],
//	content: "<div class='name'>金宸国际公寓锅炉房</div><div class='address'>地址：北京市西城区广成街4号院</div><div class='detail'>供热区域共3栋公寓楼，供热面积约3.5W平米</div><div class='link'><a href='https:baidu.com'>详细信息</a></div>"
//},
//{
//  icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
//  position: [116.465177,39.881906],
//	content: "<div class='name'>虎城供热厂大盟换热站</div><div class='address'>地址：北京市朝阳区农光里中社区</div><div class='detail'>供热区域为农光里中社区，供热面积约22.6W平米</div><div class='link'><a href='area.html'>详细信息</a></div>"
//}];
//var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(7, 2)});
//// 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
//markers.forEach(function(marker) {
//  var mark = new AMap.Marker({
//      map: map,
//      icon: marker.icon,
//      position: [marker.position[0], marker.position[1]],
//      offset: new AMap.Pixel(0, 0)
//  });
//	mark.content = marker.content;
//	mark.on('click', markerClick);
// 	mark.emit('click', {target: mark});
//	
//});
//function markerClick(e) {
//  infoWindow.setContent(e.target.content);
//  infoWindow.open(map, e.target.getPosition());
//}
////自动适配多个点标记的中心位置以及缩放级别
////map.setFitView();

