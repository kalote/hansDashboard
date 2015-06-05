$(document).ready(function() {
	function getTimeDisplay() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    m = checkTime(m);
    console.log(h+":"+m);
    $(".time").text(h+":"+m);
    setTimeout(getTimeDisplay,500);
	}

  function getDateDisplay() {
    var now = new Date();
    var wd = dayName(now.getDay());
    var d = now.getDate().length > 1 ? now.getDate() : "0"+now.getDate();
    var m = monthName((now.getMonth()+1));
    $(".date").text(wd+" "+d+" "+m+" "+now.getFullYear());
    setTimeout(getDateDisplay,3600000);
  }

	function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
	}

  function dayName(d) {
    var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayNames[d];
  }

  function monthName(m) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[m];
  }

  function getLocation(){
    try {
      navigator.geolocation.getCurrentPosition(function(position) {
        loadWeather(position.coords.latitude+','+position.coords.longitude);
      });
      setInterval(getLocation, 600000); //Update the weather every 10 minutes.
    } catch (err) {
      console.log(err.message);
      alert("Your browser doesn't support HTML5 geolocation !");
    }
  }

  function loadWeather(location, woeid) {
    $.simpleWeather({
      location: location,
      woeid: woeid,
      unit: 'c',
      success: function(weather) {
        $("#loading").remove();
        $(".outsideTemp").html(weather.temp+"&deg;"+weather.units.temp);
        $(".outsideIcon").html("<i class='icon-"+weather.code+"'></i>");
        $(".outsidePlace").text(weather.city);
      },
      error: function(error) {
        $(".outsideTemp").html('<p>'+error+'</p>');
      }
    });
  }

  function loadNetatmo(){
    $.getJSON("/device", function(data){
      var html='';
      $("#loadingDevices").remove();
      html += '<div class="col-sm-12"><span class="insideTemp">'+data[0].insideTemp+'</span>'+
              '<span class="insidePlace">'+data[0].insidePlace+'</span></div>';
      $(".secondRow").html(html);
    });
    setInterval(loadNetatmo, 600000); //Update the weather every 10 minutes.
  }


  //date + time
  getTimeDisplay();
  getDateDisplay();
  //weather outside
  getLocation();
  //weather inside
  loadNetatmo();
})
