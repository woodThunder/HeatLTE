$(document).ready(function(){
	
	userid = $.cookie('userid');
	truename = $.cookie('truename');
	var auth = $.cookie('auth');
	console.log(auth);
	if(auth == 1){
		$(".sidebar-menu > li").eq(2).hide();
		$(".ele-count > button").eq(3).hide();
		$(".notice").hide();
	}
	
	$('.info p').html(truename);
	wecome();
	setInterval(wecome,1000);
	
	tt();
    //setInterval(tt,5000);
    
	
	$("#login_btn").click(function () {
        //获取用户名
        var username = $('#username_txt').val();
        //获取密码
        var userpass = $('#userpass_txt').val();
        if (username == "" || userpass == "") { alert("用户名密码不能为空！"); }
        else {

            //调用登录方法
            $.ajax({
                //要用post方式     
                type: "Post",
                //方法所在页面和方法名     
                url: 'http://123.57.162.77:8081/AppInterface/userLogin?params={%22userName%22:%22'+username+'%22,%22password%22:%22'+userpass+'%22}',
                dataType: "jsonp",
				jsonp: "jsonpCallback",
                success: function (data) {
					console.log(data);
					
					var datas = data.result;
					switch (datas)
					{
						case 4:
						    alert('温馨提示','用户名不存在！','info');
						    break;
						case 101:
						    alert('温馨提示','密码错误！','info');
						    break;
						case 0:
							window.location.href = "index.html";
						    break;
						
					}
                    
                },
                error: function (err) {
                    alert('系统连接错误，请重试！');
                }
            });


        }

    });
	
	$("body").keydown(function(event) {
	  if (event.keyCode == "13") {//keyCode=13是回车键
		$("#login_btn").click();
	  }
	}); 
	$(".header-btn").click(function(){
		if(confirm("你确定退出系统吗？")){
			window.location.href = "login.html";
		}else{
			return;
		}
	});
	
	//动态设置最终时间
	var theDate = new Date();
	var _hour = theDate.getHours();
	var _minute = theDate.getMinutes();
	var _second = theDate.getSeconds();
	var _year = theDate.getFullYear();
	var _month = theDate.getMonth();
	var _date = theDate.getDate();
	if(_hour < 10) {
		_hour = "0" + _hour
	}
	if(_minute < 10) {
		_minute = "0" + _minute
	}
	if(_second < 10) {
		_second = "0" + _second
	}
	_month = _month +1;
	if(_month < 10) {
		_month = "0" + _month;
	}
	if(_date < 10) {
		_date = "0" + _date
	}
	var _end = _year + "-" + _month + "-" + _date;
	_startTime = _end + " 00:00:00";
//	_startTime = "2017-10-30 00:00:00";
	_endTime = _end + " 23:59:59";
	alarmlist(_startTime, _endTime);
	
})

//报警列表
function alarmlist(startdate, enddate) {
	$.ajax({
		//要用post方式
		type: "post",
		//方法所在页面和方法名
		url:'http://123.57.162.77:8083/WlcsInterface/ queryPoliceById?params={%22id%22:109,%22type%22:2,%22startTime%22:%22'+ startdate +'%22,%22endTime%22:%22'+ enddate +'%22,%22errData%22:%222%22}',
		dataType: "jsonp",
		jsonp: "jsonpCallback",
		success: function(data) {
			console.log(data);
			if(data.data) {
				var datas = data.data.reverse();
				//console.log(datas);
				var a = [];
				for(var i = 0; i < datas.length; i++) {
					
			        a[i] = {
			            'num': i+1,
			            'name': datas[i].devidName,
			            'id': datas[i].deviceId,
//							            'settem': datas[i].setValue,
//							            'alarmtem': datas[i].errorValue,
			            'alarmtime': datas[i].errorTime,
			            'recoverytime': datas[i].recoveryTime,
			            'alarminfo': datas[i].errorData
			        }
			        var str = '<li><a href="alarm.html">' + datas[i].errorTime + ' 设备' + datas[i].deviceId + '停止上传数据' + '</a></li>'
					$("#jsfoot02").append(str);
				}
				

			} else {
				var str = '<li><a href="alarm.html">没有设备停止上传数据！</a></li>'
				$("#jsfoot02").append(str);
				
			}
			if($("#jsfoot02").children().is("li")){
				var scrollup = new ScrollText("jsfoot02");
				scrollup.LineHeight = 26;        //单排文字滚动的高度
				scrollup.Amount = 1;            //注意:子模块(LineHeight)一定要能整除Amount.
				scrollup.Delay = 20;           //延时
				scrollup.Start();             //文字自动滚动
				scrollup.Direction = "up";   //默认设置为文字向上滚动
			}
			
		},
		error: function(err) {
			console.log('系统连接错误，请重试！');
		}
	});
}


function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

//头部欢迎方法
function wecome() {
	var theDate = new Date();
	var _hour = theDate.getHours();
	var _year = theDate.getFullYear();
	var _month = theDate.getMonth();
	var _date = theDate.getDate();
	var _dayNum = theDate.getDay();
	var _day; switch (_dayNum) {
		case 0: _day = "星期日";
			break;
		case 1: _day = "星期一";
			break;
		case 2: _day = "星期二";
			break;
		case 3: _day = "星期三";
			break;
		case 4: _day = "星期四";
			break;
		case 5: _day = "星期五";
			break;
		case 6: _day = "星期六";
			break;
	}

	//获取系统标题
	//$('#systemName').html('<strong>' + systemName + '</strong>');

	var hello = "";
	if (_hour >= 12)
		hello = '下午好';
	else
		hello = '上午好';
	$('.header-time').html(_year + "年" + (_month + 1) + "月" + _date + "日  " + _day);
}

//登录方法
function tt(){
    $.ajax({
        //要用post方式
        type: "post",
        //方法所在页面和方法名
        url: 'http://123.57.162.77:8089/getBzRecordList?params={%22deviceIds%22:%22289%22}',
        dataType: "jsonp",
        jsonp: "jsonpCallback",
        success: function (data) {
            //查看返回的数据data
            //console.log(data);
            var datas = data.data[0].bzRecord.data.split(",");
            $('.header-tem').html(Math.round(datas[16]*10)/10);
        },
        error: function (err) {
            alert(err);
        }
    });
}
//var boxHeight = document.documentElement.clientHeight;
//function setScroll(){
//  $("body").slimScroll({
//      height: '100%',
//      size: '5px', //组件宽度
//      alwaysVisible: true,
//  });
//}
//
//setScroll();
//
//$(window).on("resize",setScroll);

