$(document).ready(function(){
	//get json
	$.ajax({
		type: 		"get",
		url: 		"json/skaters.json",
		dataType: 	"json"
	}).done(function(data){
		if(data.data.length > 0 && data.status == "OK"){
			loadTemplate(data.data);
		}
	}).fail(function(){
		alert('Something went wrong loading the data from the server');
	});

	//creates template for data and inserts into dom
	function loadTemplate(skaters) {
		var template;

		template	=	'<li class="row">';
		template 	+=	'<span class="col-md-3"><span class="image"></span><span class="name"></span></span>';
		template	+=	'<span class="col-md-2"><span class="difficulty"></span><span> pts</span></span>';
		template	+=	'<span class="col-md-2"><span class="speed"></span><span>  km/h</span></span>';
		template	+=	'<span class="col-md-1"><span class="flow"></span><span> %</span></span>';
		template	+=	'<span class="col-md-2"><span class="height"></span><span> m</span></span>';
		template	+=	'<span class="col-md-2"><span class="distance"></span><span> m</span></span>';
		template	+=	'</li>';

		// var li;
		// var spanName, spanDifficulty, spanSpeed, spanFlow, spanHeight, spanDistance;
		// var tempImg;

		var values = new Array();
		
		$.each(skaters, function(index, value) {

			values[index] = {
				name 		: 	skaters[index].name,
				difficulty 	: 	skaters[index].stats.difficulty,
				speed 		: 	skaters[index].stats.speed,
				flow 		: 	skaters[index].stats.flow,
				height 		: 	skaters[index].stats.height,
				distance 	: 	skaters[index].stats.distance
			};
		});

		var options = {
		  valueNames: [ 'name', 'difficulty', 'speed', 'flow', 'height', 'distance' ],
		  item: template
		};

		var skaterList = new List('skater-list', options, values);

		//load images
		var tempImg;
		$.each(skaters, function(index, value) {
			tempImg = $('<img />').load(function(){
				$('ul li:nth-child('+(index+1)+') .image').append($(this));
				$(this).fadeIn();
			}).attr('src', '../'+skaters[index].uri).hide();
		});
	}

	$('.list').delegate('li', 'click', function(){
		console.log( $(this).children('.col-md-3').children('.name').html() );
	});

});