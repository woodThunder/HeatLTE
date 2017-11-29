var arr = [];
for(var i=0;i<16;i++){
	arr.push(i+2035);
}
//设备id列表
var str = arr.join(',');
//实时数据列表
$.ajax({
	//要用post方式
	type: "post",
	//方法所在页面和方法名
	url: 'http://123.56.156.91:8089/getBzRecordList?params={%22deviceIds%22:%22' + str + '%22}',
	dataType: "jsonp",
	jsonp: "jsonpCallback",
	success: function (data) {
		console.log(data);
	    if(data.data) {
		    var datas = data.data;
		    //console.log(datas);
		    var a = [];
		    for (var i = 0; i < datas.length; i++) {
		    	if(datas[i].bzRecord){
		    		var tem = datas[i].bzRecord.data.split(',')[0];
		        	var devname = datas[i].deviceInfo.deviceName;
			        var id = datas[i].bzRecord.devId;
			        var sync = datas[i].bzRecord.syncTime;
			        a[i] = {
			            'num': i+1,
			            'name': devname,
			            'id': id,
			            'tem': tem,
			            'deviceTime': sync,
			            'people':'徐卫国',
			            'number':'15223772896'
			        }
			        //console.log(a[i].tem);
			        if(a[i].tem < 18){
			        	a[i].tem = "<span style='color:rgb(247, 163, 92); font-weight: bold;'>"+tem+"</span>"
			        }
			        if(a[i].tem > 22){
			        	a[i].tem = "<span style='color:rgb(241, 92, 128); font-weight: bold;'>"+tem+"</span>"
			        }	
		    	}
		    }
			$('#example1').DataTable({
		      "paging": false,//是否显示分页,默认为true
		      "lengthChange": false,//是否显示数据显示条数,默认为true,当数据小于每页的条数时也不显示
		      "searching": false,//是否显示搜索,默认为true
		      "ordering": false,//是否显示列的排序，默认为true
		      "info": false,//是否显示表的信息，默认为true
		      "autoWidth": true,//是否启动计算列宽
	//	      "scrollX": "100%",
	//	      "scrollCollapse": true,
		      //"scrollXInner": "100%",
		      //"retrieve":true,
		      "destroy":true,
		      "language": {
			        lengthMenu: '<select class="form-control input-xsmall">' + '<option value="1">1</option>' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '</select>条记录',//左上角的分页大小显示。
			        search: '<span class="label label-success">搜索：</span>',//右上角的搜索文本，可以写html标签
			
			        paginate: {//分页的样式内容。
			            previous: "上一页",
			            next: "下一页",
			            first: "第一页",
			            last: "最后"
			        },
			        zeroRecords: "没有内容",//table tbody内容为空时，tbody的内容。
			        //下面三者构成了总体的左下角的内容。
			        info: "总共_PAGES_ 页_TOTAL_ 条，显示第_START_ 到第 _END_ ",//，筛选之后得到 _TOTAL_ 条，初始_MAX_ 条 ,左下角的信息显示，大写的词为关键字。
			        infoEmpty: "0条记录",//筛选为空时左下角的显示。
			        infoFiltered: ""//筛选之后的左下角筛选提示，
			    },
			    "data": a,
			    "columns": [
			    	{"data": "num"},
			    	{"data": "name"},
			    	{"data": "id"},
			    	{"data": "tem"},
			    	{"data": "deviceTime"},
			    	{"data": "people"},
			    	{"data": "number"},
			    ]
		    });
				//$.fn.dataTable().fnReloadAjax();
	    }
	    else{
		    alert('数据错误！');
		}
	},
	error: function (err) {
	    //alert(err);
	}
});	

var second = new Date().getTime();
//var _startTime = formatDateTime(new Date(second-(10*24*60*60*1000)));
var now = formatDateTime(new Date());
//动态设置最终时间
var theDate = new Date();
var _hour = theDate.getHours();
var _minute = theDate.getMinutes();
var _second = theDate.getSeconds();
var _year = theDate.getFullYear();
var _month = theDate.getMonth();
var _date = theDate.getDate();
if(_hour < 10) {_hour = "0" + _hour}
if(_minute < 10) {_minute = "0" + _minute}
if(_second < 10) {_second = "0" + _second}
_month = _month +1;
if(_month < 10) {_month = "0" + _month;}
if(_date < 10) {_date = "0" + _date}

//默认今天2017-11-02
var _end = _year + "-" + _month + "-" + _date;

$(function() {
	var id = GetQueryString("id");
	$("#devid option[value='" + id + "']").attr("selected", "selected");

	//alarm
	$('#start1').datetimepicker({
		autoclose: true,
		format: 'yyyy-mm-dd',
		todayHighlight: true,
		language: 'zh-CN',
		minView: 2
	});
	$('#start1').val(_end);
	$('#end1').datetimepicker({
		autoclose: true,
		format: 'yyyy-mm-dd',
		todayHighlight: true,
		language: 'zh-CN',
		minView: 2
	});
	$('#end1').val(_end);
	$("#fenxi1").hide();
	
	var _startTime1 = $("#start1").val();
	_startTime1 = _startTime1 + " 00:00:00";
	
	var _endTime1 = $("#end1").val();
	_endTime1 = _endTime1 + " 23:59:59";
	alarmlist(_startTime1, _endTime1);
	//温度报警按钮
	$("#alarm_btn").click(function() {

		var _startTime = $("#start1").val();
		_startTime = _startTime + " 00:00:00";
		
		var _endTime = $("#end1").val();
		_endTime = _endTime + " 23:59:59";
		
		var _devid = $("#devid1").val();
		var _devname = $("#devid1").find("option:selected").text();
		var _type = $("#devid1").find("option:selected").attr("type");
		
		if(_startTime == "" || _endTime == "") {
			alert('开始日期或结束日期不能为空！');
			return;
		}
		
		if(_endTime < _startTime) {
			alert('结束日期不能小于开始日期！');
			return;
		}

		$("#fenxi1").hide();
		$("#example3_wrapper").show();
		alarmlist(_startTime, _endTime);
	})
});


//----------------------------------历史数据列表
$('#start').datetimepicker({
	autoclose: true,
	format: 'yyyy-mm-dd',
	todayHighlight: true,
	language: 'zh-CN',
	minView: 2
});
$('#start').val(_end);
$('#end').datetimepicker({
	autoclose: true,
	format: 'yyyy-mm-dd',
	todayHighlight: true,
	language: 'zh-CN',
	minView: 2
});
$('#end').val(_end);
$("#fenxi").hide();
$("#example2").hide();
$("#result").hide();

$("#seaInp").focus(function(e){
	$("#seaList").show();
})

$(document).click(function(e){
	if( $(e.target).closest('.bulist').length == 0 ){
	    var length = $(".select").length;
		var strSum = "";
		var strId = "";
		for(var i=0; i<length; i++){
			if($(".select").eq(i).prop("checked") === true){
				strSum += $(".select").eq(i).siblings("label").html() + ",";
				strId += $(".select").eq(i).val() + ",";
				//console.log($(".select").eq(i).siblings(".proid").html());
			}
		}
		strSum = strSum.substring(0,strSum.length-1);
		strId = strId.substring(0,strId.length-1);
//		console.log(strSum);
//		console.log(strId);
		$("#seaInp").val(strSum);
		$("#seaList").hide();
    }
});
	
//数据按钮
$("#historydata_btn").click(function() {

	var _startTime = $("#start").val();
	_startTime = _startTime + " 00:00:00";
	
	var _endTime = $("#end").val();
	_endTime = _endTime + " 23:59:59";
	
	if(_startTime == "" || _endTime == "") {
		alert('开始日期或结束日期不能为空！');
		return;
	}
	
	if(_endTime < _startTime) {
		alert('结束日期不能小于开始日期！');
		return;
	}	

//	$("#fenxi").hide();
//	$("#example2").show();
//	$("#example2_wrapper").show();
	
	//获取多个楼宇设备列表
	var length = $(".select").length;
	var strSum = "";
	var strId = "";
	for(var i=0; i<length; i++){
		if($(".select").eq(i).prop("checked") === true){
			strSum += $(".select").eq(i).siblings("label").html() + ",";
			strId += $(".select").eq(i).val() + ",";
			//console.log($(".select").eq(i).siblings(".proid").html());
		}
	}
	strSum = strSum.substring(0,strSum.length-1);
	strId = strId.substring(0,strId.length-1);
//	console.log(strSum);
//	console.log(strId);
	$("#seaInp").val(strSum);
	$("#seaList").hide();
	
	devicehistorysdata(strId, _startTime, _endTime);
})

function devicehistorysdata(ids, starttime, endtime) {
	$.ajax({
		//要用post方式
		type: "post",
		//方法所在页面和方法名
		url: 'http://123.57.162.77:8083//WlcsInterface/queryDataByIds?params={%22ids%22:%22'+ ids +'%22,%22startTime%22:%22'+ starttime +'%22,%22endTime%22:%22'+ endtime +'%22}',
		dataType: "jsonp",
		jsonp: "jsonpCallback",
		success: function(data) {
			//console.log(data);
			var datas = data.data;
			if(datas) {
				//查看返回的数据data
				$("#fenxi").hide();
				$("#example2_wrapper").show();
				$("#example2").show();
				$("#result").hide();
				//console.log(datas);
				var idary = ids.split(",");
				//console.log(idary);
				var a = [],b = [];
				for(var i = 0; i < datas.length; i++) {
					var devdata = datas[i][idary[i]];
					var devname = datas[i].devidName;
					if(devdata){
						for(var j = 0; j < devdata.length; j++){
							var tem = devdata[j].data.split(",")[0];
							var devid = devdata[j].devId;
							var sync = devdata[j].syncTime;
							var obj = {
								'name': devname,
					            'id': devid,
					            'tem': tem,
					            'deviceTime': sync
							}
							a.push(obj);
						}
					}
				}
				for(var k = 0; k < a.length; k++){
					b[k] = {
			            'num': k+1,
			            'name': a[k].name,
			            'id': a[k].id,
			            'tem': a[k].tem,
			            'deviceTime': a[k].deviceTime
			        }
				}
				console.log(a);
//				var a = [];
//				for(var i = 0; i < datas.length; i++) {
//					var tem = datas[i].data.split(',')[0] + '℃';
//			        var sync = datas[i].syncTime;
//			        a[i] = {
//			            'num': i+1,
//			            'name': devname,
//			            'id': devid,
//			            'tem': tem,
//			            'deviceTime': sync
//			        }
//				}
				$('#example2').DataTable({
					"paging": true, //是否显示分页,默认为true
					"lengthChange": false, //是否显示数据显示条数,默认为true,当数据小于每页的条数时也不显示
					"searching": false, //是否显示搜索,默认为true
					"ordering": false, //是否显示列的排序，默认为true
					"info": true, //是否显示表的信息，默认为true
					"autoWidth": true, //是否启动计算列宽
//									"scrollX": true,
	//	      "scrollCollapse": true,
		      //"scrollXInner": "100%",
					//"retrieve":true,
					"destroy": true,
					"language": {
						lengthMenu: '<select class="form-control input-xsmall">' + '<option value="1">1</option>' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '</select>条记录', //左上角的分页大小显示。
						search: '<span class="label label-success">搜索：</span>', //右上角的搜索文本，可以写html标签

						paginate: { //分页的样式内容。
							previous: "上一页",
							next: "下一页",
							first: "第一页",
							last: "最后"
						},

						zeroRecords: "没有内容", //table tbody内容为空时，tbody的内容。
						//下面三者构成了总体的左下角的内容。
						info: "总共_PAGES_ 页_TOTAL_ 条，显示第_START_ 到第 _END_ ", //，筛选之后得到 _TOTAL_ 条，初始_MAX_ 条 ,左下角的信息显示，大写的词为关键字。
						infoEmpty: "0条记录", //筛选为空时左下角的显示。
						infoFiltered: "" //筛选之后的左下角筛选提示，
					},
					"data": b,
					"columns": [
						{"data": "num"},
				    	{"data": "name"},
				    	{"data": "id"},
				    	{"data": "tem"},
				    	{"data": "deviceTime"}
					]
				});
				//$.fn.dataTable().fnReloadAjax();

			} else {
				$("#fenxi").hide();
				$("#example2").hide();
				$("#example2_wrapper").hide();
				$("#result").show();
				//alert('该设备没有数据。');
			}
		},
		error: function(err) {
			alert('系统连接错误，请重试！');
		}
	});
}

//----------------------------------历史数据曲线
//分析按钮
$("#historylist_btn").click(function() {
	
	var _startTime = $("#start").val();
	_startTime = _startTime + " 00:00:00";
	
	var _endTime = $("#end").val();
	_endTime = _endTime + " 23:59:59";
	
	var _devid = $("#devid").val();
	var _devname = $("#devid").find("option:selected").text();
	
	if(_startTime == "" || _endTime == "") {
		alert('开始日期或结束日期不能为空！');
		return;
	}
	
	if(_endTime < _startTime) {
		alert('结束日期不能小于开始日期！');
		return;
	}

	$("#fenxi").show();
	$("#example2").hide();
	$("#example2_wrapper").hide();
	$("#result").hide();
	
	//获取多个楼宇设备列表
	var length = $(".select").length;
	var strSum = "";
	var strId = "";
	for(var i=0; i<length; i++){
		if($(".select").eq(i).prop("checked") === true){
			strSum += $(".select").eq(i).siblings("label").html() + ",";
			strId += $(".select").eq(i).val() + ",";
			//console.log($(".select").eq(i).siblings(".proid").html());
		}
	}
	strSum = strSum.substring(0,strSum.length-1);
	strId = strId.substring(0,strId.length-1);
//	console.log(strSum);
//	console.log(strId);
	$("#seaInp").val(strSum);
	$("#seaList").hide();
	devicehistoryslist(strId, _startTime, _endTime);
})


function devicehistoryslist(ids, starttime, endtime) {
	//加载历史数据列表
	$.ajax({
		//要用post方式
		type: "post",
		//方法所在页面和方法名
		url: 'http://123.57.162.77:8083//WlcsInterface/queryDataByIds?params={%22ids%22:%22'+ ids +'%22,%22startTime%22:%22'+ starttime +'%22,%22endTime%22:%22'+ endtime +'%22}',
		//contentType: "application/json; charset=utf-8",
		dataType: "jsonp",
		jsonp: "jsonpCallback",
		success: function(data) {
			var idary = ids.split(",");
			var datas = data.data;
			console.log(datas);
			console.log(idary);
			if(datas) {
				var a=[];
				for(var i = 0; i < datas.length; i++) {
					var devdata = datas[i][idary[i]].reverse();
					var devname = datas[i].devidName;
					if(devdata && i==0){
						var xlist = [];
						for(var j = 0; j < devdata.length; j++){
							var sync = devdata[j].syncTime;
							sync = sync.substring(0,sync.length-6);
							xlist.push(sync);
						}
					}
					if(devdata){
						var b = [];
						for(var j = 0; j < devdata.length; j++){
							var tem = devdata[j].data.split(",")[0];
							var devid = devdata[j].devId;
							b.push(parseFloat(tem));
						}
					}
					//console.log(b);
					var obj = {
						'name':devname,
						'data':b,
						'lineWidth':1
					}
					a.push(obj);
				}
				console.log(xlist);
				console.log(a);
				line(xlist,a);
				

//				var xlist = new Array();
//
//				var ary0 = new Array();
//
//				for(var i = 0; i < datas.length; i++) {
//					var datasAry = datas[i].data.split(",");
//					xlist[i] = datas[i].syncTime;
//					ary0[i] = datasAry[0];
//				};
				
			} else {
				alert('此时间段没有数据');
			}
			
		},
		error: function(err) {
			alert('系统连接错误，请重试！');
		}
	});
}

function line(xlist,ydata){
	var chart = Highcharts.chart('tem', {
	    title: {
	        text: '温度趋势图'
	    },
		ceiling: 150,
		floor: 14,
		xAxis: {
	        crosshair: true,//准星线
			categories: xlist,
	    },
	    yAxis: {
	        title: {
	            text: '温度（℃）'
	        },
			crosshair: true,//准星线
			gridLineColor: '#197F07',//网格线颜色
			gridLineDashStyle: 'longdash',//网格线样式 虚线
	    },
	    legend: {
	        //layout: 'vertical',
	        align: 'center',
	        verticalAlign: 'top'
	    },
	    plotOptions: {
	        //series: {
	//            label: {
	//                connectorAllowed: false
	//            },
	//            pointStart: 2010
	//        }
	    },
	    series: ydata,
	    responsive: {
	        rules: [{
	            condition: {
	                maxWidth: 500
	            },
	            chartOptions: {
	                legend: {
	                    layout: 'horizontal',
	                    align: 'center',
	                    verticalAlign: 'bottom'
	                }
	            }
	        }]
	    }
	});
}

//导出按钮
$("#out_btn").click(function() {
	
	var _startTime = $("#start").val();
	_startTime = _startTime + " 00:00:00";
	
	var _endTime = $("#end").val();
	_endTime = _endTime + " 23:59:59";
	
	var _devid = $("#devid").val();
	var _devname = $("#devid").find("option:selected").text();
	
	if(_startTime == "" || _endTime == "") {
		alert('开始日期或结束日期不能为空！');
		return;
	}
	
	if(_endTime < _startTime) {
		alert('结束日期不能小于开始日期！');
		return;
	}
	
	//console.log(_devid, _startTime, _endTime, _devname);
	window.open('http://123.56.156.91:8082/WlcsInterface/getMonthBzRecordList?params={%22deviceId%22:' + _devid + ',%22beginTime%22:%22' + _startTime + '%22,%22endTime%22:%22' + _endTime + '%22,%22type%22:%224%22,%22begin%22:0,%22end%22:1}');
})

//----------------------------------温度报警列表
function alarmlist(startdate, enddate) {
	$.ajax({
		//要用post方式
		type: "post",
		//方法所在页面和方法名
		url:'http://123.57.162.77:8083/WlcsInterface/ queryPoliceById?params={%22id%22:109,%22type%22:2,%22startTime%22:%22'+ startdate +'%22,%22endTime%22:%22'+ enddate +'%22,%22errData%22:%221%22}',
		dataType: "jsonp",
		jsonp: "jsonpCallback",
		success: function(data) {
			//console.log(data);
			if(data.data) {
				$("#fenxi1").hide();
				$("#example3_wrapper").show();
				$("#example3").show();
				//查看返回的数据data

				var datas = data.data.reverse();
				//console.log(datas);
				var a = [];
				for(var i = 0; i < datas.length; i++) {
					
			        a[i] = {
			            'num': i+1,
			            'name': datas[i].devidName,
			            'id': datas[i].deviceId,
			            'settem': datas[i].setValue,
			            'alarmtem': datas[i].errorValue,
			            'alarmtime': datas[i].errorTime,
			            'recoverytime': datas[i].recoveryTime,
			            'alarminfo': datas[i].errorData
			        }
				}
				$('#example3').DataTable({
					"paging": true, //是否显示分页,默认为true
					"lengthChange": false, //是否显示数据显示条数,默认为true,当数据小于每页的条数时也不显示
					"searching": false, //是否显示搜索,默认为true
					"ordering": false, //是否显示列的排序，默认为true
					"info": true, //是否显示表的信息，默认为true
					"autoWidth": true, //是否启动计算列宽
					"scrollX": true,
					//"retrieve":true,
					"destroy": true,
					"language": {
						lengthMenu: '<select class="form-control input-xsmall">' + '<option value="1">1</option>' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '</select>条记录', //左上角的分页大小显示。
						search: '<span class="label label-success">搜索：</span>', //右上角的搜索文本，可以写html标签

						paginate: { //分页的样式内容。
							previous: "上一页",
							next: "下一页",
							first: "第一页",
							last: "最后"
						},

						zeroRecords: "没有内容", //table tbody内容为空时，tbody的内容。
						//下面三者构成了总体的左下角的内容。
						info: "总共_PAGES_ 页_TOTAL_ 条，显示第_START_ 到第 _END_ ", //，筛选之后得到 _TOTAL_ 条，初始_MAX_ 条 ,左下角的信息显示，大写的词为关键字。
						infoEmpty: "0条记录", //筛选为空时左下角的显示。
						infoFiltered: "" //筛选之后的左下角筛选提示，
					},
					"data": a,
					"columns": [
						{"data": "num"},
				    	{"data": "name"},
				    	{"data": "id"},
				    	{"data": "settem"},
				    	{"data": "alarmtem"},
				    	{"data": "alarmtime"},
				    	{"data": "recoverytime"},
				    	{"data": "alarminfo"}
					]
				});
				//$.fn.dataTable().fnReloadAjax();

			} else {
				$("#fenxi1").show();
				$("#example3_wrapper").hide();
				$("#example3").hide();
			}
		},
		error: function(err) {
			console.log('系统连接错误，请重试！');
		}
	});
}



//----------------------------------tab切换
$(".ele-count button").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(".tabs-content .tabs").hide();
		$(".tabs-content .tabs").eq($(".ele-count button").index(this)).show().siblings().hide();	
})


//----------------------------------点击区域图显示信息
$(".build").click(function(e){
//	var xx=e.pageX;
//	var yy=e.pageY;
//	console.log(xx,yy);
	$(".con ul").empty();
	$(".con").show();
	var title = $(this).attr("title");
	$(".name").html(title);
	var idlist = $(this).attr("ids");
	devlist(idlist);
})
function devlist(idlist){
	$.ajax({
		//要用post方式
		type: "post",
		//方法所在页面和方法名
		url: 'http://123.56.156.91:8089/getBzRecordList?params={%22deviceIds%22:%22' + idlist + '%22}',
		dataType: "jsonp",
		jsonp: "jsonpCallback",
		success: function (data) {
			//console.log(data);
	    if(data.data) {
		    var datas = data.data;
		    console.log(datas);
		    var a = [];
		    for (var i = 0; i < datas.length; i++) {
		        var tem = datas[i].bzRecord.data.split(',')[0] + '℃';
		        var devname = datas[i].deviceInfo.deviceName;
		        var id = datas[i].bzRecord.devId;
		        var sync = datas[i].bzRecord.syncTime;
		        var str = '<li>' + devname + '：' + tem + '</li>';
		        $(".con ul").append(str);
		    }
		  }
	    else{
		    alert('数据错误！');
		  }
		},
		error: function (err) {
		    //alert(err);
		}
	});	
}


//----------------------------------数据统计3D饼形图方法
$('#start2').datetimepicker({
	autoclose: true,
	format: 'yyyy-mm-dd',
	todayHighlight: true,
	language: 'zh-CN',
	minView: 2
});
$('#start2').val(_end);
$('#end2').datetimepicker({
	autoclose: true,
	format: 'yyyy-mm-dd',
	todayHighlight: true,
	language: 'zh-CN',
	minView: 2
});
$('#end2').val(_end);

var _startTime2 = $("#start2").val();
_startTime2 = _startTime2 + " 00:00:00";

var _endTime2 = $("#end2").val();
_endTime2 = _endTime2 + " 23:59:59";

dataNum(str,_startTime2,_endTime2);

$("#pie_btn").click(function() {
	var _startTime2 = $("#start2").val();
	_startTime2 = _startTime2 + " 00:00:00";
	
	var _endTime2 = $("#end2").val();
	_endTime2 = _endTime2 + " 23:59:59";
	
	if(_startTime2 == "" || _endTime2 == "") {
		alert('开始日期或结束日期不能为空！');
		return;
	}
	
	if(_endTime2 < _startTime2) {
		alert('结束日期不能小于开始日期！');
		return;
	}

	dataNum(str,_startTime2,_endTime2)
})

function dataNum(ids,starttime,endtime){
	$.ajax({
		//要用post方式
		type: "post",
		//方法所在页面和方法名
		url: 'http://123.57.162.77:8083//WlcsInterface/queErrNumberByIds?params={%22ids%22:%22'+ ids +'%22,%22startTime%22:%22'+ starttime +'%22,%22endTime%22:%22'+ endtime +'%22,%22num%22:0,%22high%22:22,%22low%22:18}',
		dataType: "jsonp",
		jsonp: "jsonpCallback",
		success: function (data) {
			//console.log(data);
			var datas = data.data;
			var high = 0,low = 0,correct = 0,all = 0;
		    var idary = ids.split(",");
		    //console.log(datas[2035]);
		    for(var i=0;i<idary.length;i++){
		    	
		    	if(datas[idary[i]].high){
		    		high += datas[idary[i]].high;
		    	}
		    	if(datas[idary[i]].low){
		    		low += datas[idary[i]].low;
		    	}
		    	if(datas[idary[i]].Correct){
		    		correct += datas[idary[i]].Correct;
		    	}
		    }
		    all = high + low + correct;
		    console.log(high,low,correct);
		    pie(all,high,low,correct)
		},
		error: function (err) {
		    console.log('数据调取失败！');
		}
	});	
}
function pie(all,high,low,correct){
	$('.pie').highcharts({
	    chart: {
	        type: 'pie',
	        options3d: {
	            enabled: true,
	            alpha: 45
	        }
	    },
			colors: [ 'rgb(247, 163, 92)', 'rgb(144, 237, 125)', 'rgb(241, 92, 128)'],
	    title: {
	        text: '数据统计'
	    },
	    subtitle: {
	        text: ''
	    },
			tooltip: {
	        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	    },
	    plotOptions: {
	        pie: {
	            allowPointSelect: true,
	            cursor: 'pointer',
	            innerSize: 100,
	            depth: 45,
	            dataLabels: {
	                enabled: true,
	                format: '{point.name}'
	            }
	        }
	    },
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle'
			},
	    series: [{
	        name: '占比',
	        data: [
	            ['低于18℃', low/all],
				{
	                name: '18~22℃',
	                y: correct/all,
	                sliced: true,
	                selected: true
	            },
	            ['高于22℃', high/all]
	        ]
	    }]
	});
}


//格式化时间
function formatDateTime(theDate) {
	var _hour = theDate.getHours();
	var _minute = theDate.getMinutes();
	var _second = theDate.getSeconds();
	var _year = theDate.getFullYear()
	var _month = theDate.getMonth();
	var _date = theDate.getDate();
	if(_hour < 10) {_hour = "0" + _hour;}
	if(_minute < 10) {_minute = "0" + _minute;}
	if(_second < 10) {_second = "0" + _second;}
	_month = _month +1;
	if(_month < 10) {_month = "0" + _month;}
	if(_date < 10) {_date = "0" + _date;}
	return _year + "-" + _month + "-" + _date + " " + _hour + ":" + _minute + ":" + _second;
}