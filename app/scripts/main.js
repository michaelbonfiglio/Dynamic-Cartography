/* jshint devel:true */

var SITE = SITE || {};


SITE.home = {
	init: function () {


		$('#vidmute').click(function(e) {
			$('#homeText').fadeTo( 1000, 0 ).addClass('homePointer');
			$('#bgvid').prop('muted', false);
			e.stopPropagation();
			
		});


		$('#homeText').click(function(){
			
			if(!$('#bgvid').prop('muted')){
				$('#homeText').fadeTo( 1000, 1 ).removeClass('homePointer');
				$('#bgvid').prop('muted', true);
			}

		});


	}
};




SITE.animations = {
	init: function () {

		var animSide = $('#animBox').outerWidth( false );

		var animWidth;

		

		$('#myAffix').affix({
		  	offset: {
		    top: 150
		  }
		});


		$('#myAffix').on('affixed.bs.affix', function(){
			animWidth = animSide/6 + "px";
        	$('#myAffix ul').css( "width", animWidth);
    	});

    	$( window ).resize(function() {
    		var winSize = $(window).width();
    		if(winSize > 1199){
    			animWidth = animSide/6 + "px";
    		}
    		else {
    			animWidth = animSide/4 + "px";
    		}
		  $('#myAffix ul').css( "width", animWidth);
		});

    	$('body').scrollspy({ target: '#myAffix', offset: 300 });

    	$('[data-spy="scroll"]').each(function () {
		  var $spy = $(this).scrollspy('refresh');
		});

		$('#h6SLR').click(function() {
			event.preventDefault();
			$(window).scrollTo($('#animSLR'), 800);
		});

		$('#h6SHR').click(function() {
			event.preventDefault();
			$(window).scrollTo($('#animSHR'), 800);
		});

		$('#h6STS').click(function() {
			event.preventDefault();
			$(window).scrollTo($('#animSTS'), 800);
		});

    	
	}
};





SITE.interactives = {
	init: function () {
		//Leaflet

		var map = L.map('map', {
				zoomControl: false, 
				scrollWheelZoom:false,
			}).setView([34.84, -76.53], 10);

			L.tileLayer('http://{s}.tiles.mapbox.com/v3/michaelbonfiglio.8bf731b0/{z}/{x}/{y}.png', {
			    attribution: 'Michael',
			    maxZoom: 18
			}).addTo(map);



		var slr0 = 'http://maps2.coast.noaa.gov/arcgis/services/dc_slr/slr_1ft/MapServer/WmsServer?';
	    
	  
		var slr1 = L.esri.tiledMapLayer('http://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_1ft/MapServer/', {
					layers: '0',
				    format: 'image/png',
				    transparent: true,
					});

		var slr2 = L.esri.tiledMapLayer('http://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_2ft/MapServer/', {
					layers: '0',
				    format: 'image/png',
				    transparent: true,
					});

		var slr3 = L.esri.tiledMapLayer('http://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_3ft/MapServer/', {
					layers: '0',
				    format: 'image/png',
				    transparent: true,
					});

		var slr4 = L.esri.tiledMapLayer('http://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_4ft/MapServer/', {
					layers: '0',
				    format: 'image/png',
				    transparent: true,
					});

		var slr5 = L.esri.tiledMapLayer('http://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_5ft/MapServer/', {
					layers: '0',
				    format: 'image/png',
				    transparent: true,
					});

		var slr6 = L.esri.tiledMapLayer('http://maps1.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_6ft/MapServer/', {
					layers: '0',
				    format: 'image/png',
				    transparent: true,
					});

		
		

		
		//Line Button
		var mapWidth = $('#map').innerWidth();
		var mapHeight = $('#map').height();


		var sampleSVG = d3.select('#map')
	        .append('svg')
	        .attr('width', mapWidth)
	        .attr('height', mapHeight);   

	    var button = d3.select("#button1");

	    button.on("click", function() {
	    	event.preventDefault();
	    	var myCirc = sampleSVG.append("line")
	        .style("stroke", "#0ba2ce")
	        .attr("x1", mapWidth-50)
            .attr("y1", mapHeight)
            .attr("x2", mapWidth)
            .attr("y2", mapHeight-50);

            var j = myCirc.attr("x1");
            var h = myCirc.attr("y2");

            var lineCounter = 1; 

            function lineLoop () {           
			   setTimeout(function () {    
			      myCirc.transition().attr("x1",j).attr("y2",h).style("opacity",.1); 
			      setTimeout(function () {myCirc.transition().style("opacity",1)}, 400);
			      j = j -30; 
			      h = h -20;       
			      lineCounter++;                    
			      if (lineCounter < 30) {            
			         lineLoop();             
			      }
			      else{
			      	setTimeout(function () {myCirc.transition().style("opacity",0)}, 500);
			      }                        
			   }, 800)

			}   

            
            lineLoop ();

		});


		//Shape Button

		var recolorMap = function(e){ 
		 $(this._container).find('img').removeClass('slrTransition').addClass('slrRecolor');
		}


		var slrAll = L.layerGroup([slr1, slr2, slr3, slr4, slr5, slr6]);


		var button2 = d3.select('#button2');

	    button2.on("click", function() {
	    	event.preventDefault();
	    	if(map.hasLayer(slr1)){

	    		map.removeLayer(slr1);
	    		map.removeLayer(slr2);
	    		map.removeLayer(slr3);
	    		map.removeLayer(slr4);
	    		map.removeLayer(slr5);
	    		map.removeLayer(slr6);
	    	}
	    	slr1.on('load', recolorMap).addTo(map);
	    	setTimeout(function(){slr2.on('load', recolorMap).addTo(map);}, 800);
	    	setTimeout(function(){slr3.on('load', recolorMap).addTo(map);}, 1600);
	    	setTimeout(function(){slr4.on('load', recolorMap).addTo(map);}, 2400);
	    	setTimeout(function(){slr5.on('load', recolorMap).addTo(map);}, 3200);
	    	setTimeout(function(){slr6.on('load', recolorMap).addTo(map);}, 4000);

		});

		//Transparent Button

		var recolorMap2 = function(e){ 
		 $(this._container).find('img').removeClass('slrRecolor').addClass('slrTransition');
		}

		var button3 = d3.select('#button3');

	    button3.on("click", function() {
	    	event.preventDefault();
	    	if(map.hasLayer(slr1)){
	    		map.removeLayer(slr1);
	    		map.removeLayer(slr2);
	    		map.removeLayer(slr3);
	    		map.removeLayer(slr4);
	    		map.removeLayer(slr5);
	    		map.removeLayer(slr6);
	    	}
	    	slr1.on('load', recolorMap2).addTo(map);
	    	setTimeout(function(){slr2.on('load', recolorMap2).addTo(map);}, 800);
	    	setTimeout(function(){slr3.on('load', recolorMap2).addTo(map);}, 1600);
	    	setTimeout(function(){slr4.on('load', recolorMap2).addTo(map);}, 2400);
	    	setTimeout(function(){slr5.on('load', recolorMap2).addTo(map);}, 3200);
	    	setTimeout(function(){slr6.on('load', recolorMap2).addTo(map);}, 4000);
	  		
		});

	}
};

SITE.features = {
	init: function () {
		var features = $('body').data('features');
		var featuresArray = [];

		if(features){
			featuresArray = features.split(' ');

			for(var i = 0;  i < featuresArray.length; i++) {
				var func = featuresArray[i];

				if(SITE[func] && typeof SITE[func].init === 'function'){
					SITE[func].init();
				}
			}

		}	
	}

};

$(document).ready(function(){

	SITE.features.init();


});


//Responsive Nav
var navigation = responsiveNav('.nav-collapse', {
        animate: true,                    // Boolean: Use CSS3 transitions, true or false
        transition: 284,                  // Integer: Speed of the transition, in milliseconds
        label: "Menu",                    // String: Label for the navigation toggle
        insert: "after",                  // String: Insert the toggle before or after the navigation
        customToggle: "",                 // Selector: Specify the ID of a custom toggle
        closeOnNavClick: false,           // Boolean: Close the navigation when one of the links are clicked
        openPos: "relative",              // String: Position of the opened nav, relative or static
        navClass: "nav-collapse",         // String: Default CSS class. If changed, you need to edit the CSS too!
        navActiveClass: "js-nav-active",  // String: Class that is added to <html> element when nav is active
        jsClass: "js",                    // String: 'JS enabled' class which is added to <html> element
        init: function(){},               // Function: Init callback
        open: function(){},               // Function: Open callback
        close: function(){}               // Function: Close callback
      });

