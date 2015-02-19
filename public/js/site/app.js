// --------------------------------
// Global Variables
var config = {
  "breakpoints" : {
  	"site" : {
  		"mobile" : 992,
  	},
  	"showroom" : {
  		"tablet" : 1024,
  		"touch" : 1920
  	}
  }
}

// Example Use-Case for functions in using breakpoints
// if(document.documentElement.clientWidth <= config.breakpoints.site.mobile) {
//     myFunctionHere();
// }





// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// Development Functions
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
function initDevelopment(){
	console.log('initDevelopment Called');
	// if(document.documentElement.clientWidth <= config.breakpoints.phone) {

	// }
}

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// Global Functions
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
function initGlobal(){
	console.log('initGlobal Called');
	
	navigationModal();
	itemNavigation($('.product-navigation-item-container'), $('.product-container'));
	videoClose();
	modalContent();

	// Removes dragging images.
	$('img').on('dragstart', function(event) { event.preventDefault(); });

	//VideoJS inits.
	videojs.options.flash.swf = "'/js/lib/videojs/video-js.swf";

	// Sets the blur to work with modal's.
	$('.modal').on('show.bs.modal', function (e) {
		$('.the-looking-glass').addClass('active');
	});
	$('.modal').on('hide.bs.modal', function (e) {
		$('.the-looking-glass').removeClass('active');
		$('video').each(function(){
			$(this).load();
		})
	});
}

/*  
	Standard Global Item Navigation within a view. (i.e. Product Navigation in Services)
	
	To use, set the argument `navigationItem` to the jQuery nav item to be clicked,
	and set the arguement `item` to the jQuery item that should appear.

	In the HTML set `data-navigationitem` and `data-item` as the same string.

	Both should use the active class to denote selection, with
	CSS creating any animations.
*/
function itemNavigation(navigationItem, item){
	navigationItem.on('click',function(){
		var keystone_id = $(this).data('navigationitem');
		var theItem = item.filter("[data-item='" + keystone_id + "']");
		$(this).addClass('active').siblings().removeClass('active');
		theItem.addClass('active').siblings().removeClass('active');
	});
}

// Simple ScrollTo Function
function customScrollTo(toBeScrolled, whereToScroll, time){
	if(typeof(time)==='undefined') time = 200;
	toBeScrolled.animate({
        scrollTop: whereToScroll
    }, time);
}

// Take a set of elements and euqal their heights.
function equalHeights(selector){
	if (selector[0]){
		var newHeight = 0;
		selector.each(function(){
			if ($(this).height() > newHeight){
				newHeight = $(this).height()
			} else {
				$(this).css('height', newHeight+'px');
			}
		})
	}
}

// The main navigation function for showing the blocks and blurring background.
function navigationModal(){

	$('.navigation-item-list li.active').addClass('current');

	$('.navigation-modal-item').on('click',function(){


		$scope = {};
		$scope.$tiles = $('.navigation-modal-tiles');
		$scope.$glass = $('.the-looking-glass');
		$scope.$solutions = $('.my-solutions-link');
		$scope.glassActive = $scope.$glass.hasClass('active');
		$scope.$navItems = $('.navigation-modal-item');
		$scope.$navItem = $(this);
		$scope.$selector = $(this).data('navigation-modal-item');
		$scope.$target = $scope.$tiles.filter("[data-navigation-modal='" + $scope.$selector + "']");
		$scope.tilesActive = $scope.$tiles.hasClass('active');
		$scope.$allTiles = $('.navigation-modal-tile');
		$scope.$activePage = $('.navigation-item-list li.current');


		if(!$scope.$target.hasClass('active')){
			$scope.$glass.removeClass('active');
			$scope.$solutions.removeClass('active');
			$scope.$tiles.removeClass('active');
			$scope.$allTiles.removeClass('active');
			$scope.$navItems.removeClass('viewing');

			$scope.$glass.toggleClass('active');
			$scope.$solutions.toggleClass('active');
			setTimeout(function(){
				$scope.$target.toggleClass('active');
				$scope.$target.find('.navigation-modal-tile').toggleClass('active');
				$scope.$navItem.toggleClass('viewing');
				$scope.$activePage.removeClass('active');
			},150);
		} else {
			setTimeout(function(){
				$scope.$target.find('.navigation-modal-tile').toggleClass('active');
			},0);
			setTimeout(function(){
				$scope.$glass.toggleClass('active');
				$scope.$solutions.toggleClass('active');
			},150);
			$scope.$target.toggleClass('active');
			$scope.$navItem.toggleClass('viewing');
			$scope.$activePage.addClass('active');
		}
		
	
	});
	$('#body, .navigation-modal-tiles').not('.navigation-modal-tile').on('click', function(e){
		if (!$(e.target).hasClass('video-link') && !$(e.target).hasClass('modal') && !$(e.target).hasClass('story-link') && !$(e.target).hasClass('vjs-big-play-button') && !$(e.target).hasClass('vjs-tech')){
			$('.the-looking-glass, .navigation-modal-tiles, .navigation-modal-tile, .my-solutions-link').removeClass('active');
			$('.navigation-modal-item').removeClass('active');
			$('.navigation-modal-item').removeClass('viewing');
			$('.navigation-item-list li.current').addClass('active');
		}
	});
}



// Video Functions

// Reload Video
function reloadVideo(videoID){
	var player = videojs(videoID);
	player.load();
}

// Add this class for easy closing of videos.
function videoClose(){
	$('.csf-content-close').on('click',function(){
		if ($(this).parent().hasClass('csf-video-modal')){
			var selector = $(this).data('video-close');
			reloadVideo(selector);
			$('.vjs-big-play-button').removeClass('csf-active');
		}
		
	});
}


// Initiate the link for the modal the normal bootstrap approach.
// On the link add the data attribute: `data-video-data` and pass the keystone video array.
function modalContent(){
	$('.video-link, .story-link').on('click',function(){
		// Inits
		if ($(this).hasClass('video-link')){
			var videoData = $(this).data('video-data');
			var video = $('.modal.csf-video-modal video');
			video.attr('poster', videoData.background.url);
			video.attr('src', "http:"+videoData.video.url);
			video.children('source').attr('src', "http:"+videoData.video.url);
			$('.modal.csf-video-modal .video-title').html(videoData.title);
			$('.modal.csf-video-modal .video-title').appendTo($('.modal.csf-video-modal .video-js'));
		}
		if ($(this).hasClass('story-link')){
			var storyData = $(this).data('story-data');
			var storyContent = storyData.content.html;
			var storyTitle = storyData.title;
			var storyImage = storyData.featured_image.url;

			$('.modal .story-content').html(storyContent);
			$('.modal .story-container .story-title').html(storyTitle);
			if (storyImage){
				$('.modal .story-featured-image').css('background-image', 'url('+storyImage+')');
			}
			
		}
	

		if($('body').hasClass('companion-site')){
			if(document.documentElement.clientWidth >= config.breakpoints.site.mobile) {
			    if ($(window).scrollTop() == 0){
			    	$('.csf-content-close').css('top', '96px');
			    } else if ($(window).scrollTop() > 0 && $(window).scrollTop() < 96){
			    	$('.csf-content-close').css('top', (96-$(window).scrollTop())+'px');
			    } else {
			    	$('.csf-content-close').css('top', '0');
			    }
			} else {
				$('.csf-content-close').css('top', '0');
			}
		}
		
		
	});
}




// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// Showroom Functions
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
function initShowroom(){
	console.log('initShowroom Called');
	sidebarNavigation();
	homeStageTransitions();
	mySolutionsFavoritesInteraction();
	allServices();
	itemNavigation($('.map-overlay-navitem'), $('.map-overlay'));
	factoidGeneral();
	

	// Allows for Touchscreen Scrolling on Hover for the Products area of Services Views.
	$('.product-showroom-scroll').on('mouseover',function(){
		var parent = $(this).parent();
		var target = $(this);
		if(parent.hasClass('scrolled')){
			customScrollTo(parent, 0, 1000);
			
			target.fadeOut('300', function(){
				parent.removeClass('scrolled');
				target.fadeIn('300');
			});
		} else {
			customScrollTo(parent, parent.children('.row').last().offset().top, 1000);
			
			target.fadeOut('300', function(){
				parent.addClass('scrolled');
				target.fadeIn('300');
			});
		}
	});
}

function quickClassToggle(item, toggledClass, time){
	item.addClass(toggledClass);
	setTimeout(function(){
		item.removeClass(toggledClass);
	},time);
}
function oneClassToggle(item, class1, interval, count, ease){
	var theCount = count;
	var theInterval = interval;
	theCount--;
	if (theCount == 0){ return; }
	if (ease) {
		theInterval -= interval/count;
	}
	item.addClass(class1);
	setTimeout(function(){
		item.removeClass(class1);
		twoClassToggle(item, class1, theInterval, theCount, ease);
	},theInterval);
}
function twoClassToggle(item, class1, class2, interval, count, ease){
	var theCount = count;
	var theInterval = interval;
	theCount--;
	if (theCount == 0){ return; }
	if (ease) {
		theInterval -= interval/count;
	}
	item.addClass(class1);
	setTimeout(function(){
		item.removeClass(class1);
		item.addClass(class2);
		setTimeout(function(){
			item.removeClass(class2);
			twoClassToggle(item, class1, class2, theInterval, theCount, ease);
		},theInterval)
	},theInterval);
}
function fourClassToggle(item, class1, class2, class3, class4, interval, count, ease){
	var theCount = count;
	var theInterval = interval;
	theCount--;
	if (theCount == 0){ return; }
	if (ease) {
		theInterval -= interval/count;
	}
	item.addClass(class1);
	setTimeout(function(){
		item.removeClass(class1);
		item.addClass(class2);
		setTimeout(function(){
			item.removeClass(class2);
			item.addClass(class3);
			setTimeout(function(){
				item.removeClass(class3);
				item.addClass(class4);
				setTimeout(function(){
					item.removeClass(class4);
					fourClassToggle(item, class1, class2, class3, class4, theInterval, theCount, ease);
				},theInterval);
			},theInterval);
		},theInterval);
	},theInterval);
}

function factoidGeneral(){
	$('.factoid').on('click',function(){
		$(this).toggleClass('flipped').siblings().removeClass('flipped');
	});
	$('.factoid-close').on('click',function(){
		$('.factoid').removeClass('flipped');
	})
}

function factoidTransition(set, toggledClass, type, numToCount){
	//twoClassToggle(set.eq(currentCount), 'factoid-jiggle', 'factoid-jiggle2', 100, 10);
	var currentCount = numToCount;
	if(type == 'unveil'){
		set.eq(currentCount).toggleClass(toggledClass);
	} else if (type == 'jiggle') {
		twoClassToggle(set.eq(currentCount), 'factoid-jiggle1', 'factoid-jiggle2', 80, 8, true);
	}
	
	currentCount++;
	if(currentCount >= set.length){
		currentCount = 0;
		return;
	}
	if(currentCount == set.length-1){
		setTimeout(function(){
			factoidTransition(set, toggledClass, type, currentCount);
		},300);
	} else {
		setTimeout(function(){
			factoidTransition(set, toggledClass, type, currentCount);
		},200);
	}
	
	
}


// Used on Industries page to trigger the Services Navigation to Open
function allServices(){
	$('.industry-services-all-services').on('click',function(e){
		e.stopPropagation();
		$('.navigation-toggle').trigger('click');
		$('.navigation-modal-item').filter("[data-navigation-modal-item='services']").trigger('click');
	});
}

/*  
	Adjusts the links on the navigation modals
	using an onclick call. Readjusts them if the
	normal navigation is used.
*/
var alteredLinks = false;
function alterNavigationModalLinks(type, slug, remove){
	if (remove == true && alteredLinks == true){
		if (type == 'services'){
			var tiles = $('.navigation-modal-tiles').filter("[data-navigation-modal='services']").find('.navigation-modal-tile').not('.fake-tile');
			tiles.each(function(e){
				$(this).attr('href', $(this).attr('href').substr(0, $(this).attr('href').lastIndexOf("/")));
			});
		}
		alteredLinks = false;
	} else if (remove == false) {
		if (type == 'services'){
			var tiles = $('.navigation-modal-tiles').filter("[data-navigation-modal='services']").find('.navigation-modal-tile').not('.fake-tile');
			tiles.each(function(e){
				$(this).attr('href', $(this).attr('href')+'/'+slug);
			});
			setTimeout(function(){
				//Adjust for race conditions
				alteredLinks = true;
			},100)
		}
	}
}


// Tablet Sidebar Navigation
function sidebarNavigation(){
	$('.navigation-toggle').on('click', function(){
		$('#side-navigation').toggleClass('active');
	});
	$('#body').on('click', function(e){
		$('#side-navigation').removeClass('active');
	});
}

//Regular Transitions Functionality for Home Staging Area.
function homeStageTransitions(){
	$('.home-stage .scene').on('click',function(){
		var clicked = $(this);
		var selector = clicked.data('scene');
		var target = $('.home-stage .act').filter("[data-act='"+selector+"']");

		if (clicked.hasClass('scene-active')){
			$('.home-stage .scene, .home-stage .act')
			.removeClass('scene-active')
			.removeClass('scene-inactive')
			.removeClass('scene-in-focus')
			.removeClass('active');
		}
		else if (clicked.hasClass('scene-inactive')){
			alert("you shouldn't see this lol, go slack Nick if you see this haha");
		}
		else {
			clicked.addClass('scene-active').siblings().addClass('scene-inactive').removeClass('scene-active');
			setTimeout(function(){
				if (clicked.hasClass('scene-active')){
					clicked.addClass('scene-in-focus');
					target.addClass('active').siblings().removeClass('active');
				}
			},1000);
			
			if (selector == 'Did you know?'){
				setTimeout(function(){
					factoidTransition($('.factoid'), 'inactive-factoid', 'unveil', 0);
				},1000);
				setTimeout(function(){
					factoidTransition($('.factoid'), 'inactive-factoid', 'jiggle', 0);
				},1400);
			}
		}

	});
	$('.home-stage .act .act-close').on('click', function(){
		$('.home-stage .scene, .home-stage .act')
		.removeClass('scene-active')
		.removeClass('scene-inactive')
		.removeClass('scene-in-focus')
		.removeClass('active');
		factoidTransition($('.factoid'), 'inactive-factoid');
	});
}


// My Solutions Functions
function mySolutionsFavoritesInteraction(){

	$('.can-favorite').on('click',function(e){

		//Inits
		var isAddition = false;
		var countObject = $('.my-solutions-count-number');
		var currentCount = parseInt(countObject.html());
		var solutionsItem = $(this).data('solutions-slug');

		// Which type of Item was clicked?
		if($(this).hasClass('solution-page-title')){
			var theStar = $(this).find('.coxicon');
			if (theStar.hasClass('active')){
				isAddition = false
			} else {
				isAddition = true;	
			} 
			theStar.toggleClass('active');
		}
		if($(this).hasClass('solution-service-item')){
			e.preventDefault();
			var theStar = $(this).find('.coxicon');
			if (theStar.hasClass('active')){
				isAddition = false
			} else {
				isAddition = true;	
			} 
			theStar.toggleClass('active');
		}


		// Add or Subtract
		if (isAddition) { currentCount++; } else { currentCount--; }
		countObject.html(currentCount);
		if (currentCount > 0) {
			countObject.siblings('.coxicon').addClass('active');
		} else {
			countObject.siblings('.coxicon').removeClass('active');
		}

		// Update the Session
		mySolutionsSessionUpdate(solutionsItem, isAddition);

	});
}

function mySolutionsSessionUpdate(slug, isAddition){
	if (isAddition){
		console.log("Adding Item: "+slug);
	} else {
		console.log("Removing Item: "+slug);
	}
}

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// Companion Site Functions
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
function initCompanion(){
	console.log('initCompanion Called');

	// Yes, Yes, we are doing this.
	var ieVer = ieVersion();
	if (ieVer != 0){
		$('html').addClass('ie'+ieVer);
	}

	mobileNavigation();
	setMobileNavHeight();
	customHomeNameAdjust();	
}

// Returns IE Version Number
function ieVersion() {
    var ua = window.navigator.userAgent;
    if (ua.indexOf("Trident/7.0") > 0)
        return 11;
    else if (ua.indexOf("Trident/6.0") > 0)
        return 10;
    else if (ua.indexOf("Trident/5.0") > 0)
        return 9;
    else
        return 0;  // not IE9, 10 or 11
} 


// Tablet Sidebar Navigation
function mobileNavigation(){
	$('.navigation-toggle').on('click', function(){
		if($(this).hasClass('active')){
			$('.navigation-mobile-sub-menu').removeClass('active');
			$('.navigation-item.has-menu').removeClass('viewing');
			$('.navigation-mobile ul').children().removeClass('viewing').children().removeClass('active');
			$('.navigation-mobile ul').children().children('.navigation-mobile-sub-menu').slideUp();
			$('.navigation-mobile-body-background').removeClass('active');
		} else {
			$('.navigation-mobile-body-background').addClass('active');
		}
		$(this).toggleClass('active');
		$('.navigation-mobile').toggleClass('active');

	});
	$('.navigation-item.has-menu').on('click', function(){
		$(this).parent().siblings().removeClass('viewing').children().removeClass('active');
		$(this).parent().siblings().children('.navigation-mobile-sub-menu').slideUp();
		$(this).parent().toggleClass('viewing');
		$(this).siblings('.navigation-mobile-sub-menu').slideToggle();
	})
	$('#body, .navigation-mobile-body-background').on('click', function(e){
		$('.navigation-mobile, .navigation-toggle, .navigation-mobile-sub-menu').removeClass('active');
		$('.navigation-item.has-menu').removeClass('viewing');
		$('.navigation-mobile ul').children().removeClass('viewing').children().removeClass('active');
		$('.navigation-mobile ul').children().children('.navigation-mobile-sub-menu').slideUp();
		$('.navigation-mobile-body-background').removeClass('active');
	});
}


function setMobileNavHeight(){
	$('.navigation-mobile').css('max-height', document.documentElement.clientHeight - 50 + 'px');
}

function customHomeNameAdjust(){
	if ($('.hero-custom-name')[0]){
		var target = $('.hero-custom-name');
		var length = target[0].innerHTML.length;
		if (length > 9 && length < 16){
			target.css('font-size', '3em');
		} else if (length > 15 && length < 21){
			target.css('font-size', '2em');
		} else if (length > 20){
			target.css('font-size', '1.5em');
			target.css('font-weight', 'normal');
		}
	}
}

function adjustCloseButtonModal(){
	
}


// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// Window Resizing
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
$(window).resize(function(){
	if($('body').hasClass('showroom')){

	}
	if($('body').hasClass('companion-site')){
		if(document.documentElement.clientWidth <= config.breakpoints.site.mobile) {
			setMobileNavHeight();
		}
	}
});

$('html, body').on('scroll', function(){
	adjustCloseButtonModal();
});

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// Document Ready
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
$(function() {

	// Inits
	initGlobal();
	if($('body').hasClass('showroom'))
		initShowroom();
	if($('body').hasClass('companion-site'))
		initCompanion();

	//Development Only
	initDevelopment();

});