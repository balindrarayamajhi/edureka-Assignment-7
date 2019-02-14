//desktop View fix
setTimeout(function(){ 
function ABTestOnSrp(page, searchKeyword) {
    let actionUrl = '';
    switch(page) {
        case 'all':
            if (abTestChoices['SearchResultsPage'] === 'new') {
                actionUrl = webURL + '/v2/all-courses';
                trackSRPEvent(EVENT_ALLCOURSES_NEW, 'All Courses page', isloggedIn);
            }
            else {
                actionUrl = webURL + 'all-courses';
                trackSRPEvent(EVENT_ALLCOURSES_OLD, 'All Courses page', isloggedIn);
            }
            break;
        case 'search':
            if (abTestChoices['SearchResultsPage'] === 'new') {
                actionUrl = webURL + 'v2/search/' + cleankeyword(searchKeyword);
                trackSRPEvent(EVENT_SEARCHPAGE_NEW, 'Search page', isloggedIn);
            }
            else {
                actionUrl = webURL + 'search/' + cleankeyword(searchKeyword);
                trackSRPEvent(EVENT_SEARCHPAGE_OLD, 'Search page', isloggedIn);
            }
            break;

    }
    console.log(actionUrl);
    return actionUrl;
}

setTimeout(function () {
    $("#header_topcat").hover(function () {
        $(this).addClass("open");
    }, function () {
        $(this).removeClass("open");
    });
}, 1000);

function openSignInSignup(tab) {
    var mod = document.getElementById("myModal");
    if (mod === null) {
        if (typeof clp_version == 'undefined') {
            clp_version = null;
        }
        if (typeof offer_id == 'undefined') {
            offer_id = null;
        }
        if (typeof course_id == 'undefined') {
            course_id = null;
        }
        if (typeof slug == 'undefined') {
            slug = null;
        }
        $.ajax({
            type: 'post',
            url: webURL + 'lms_pages/getSignupSigninModal',
            data: {
                course_id: course_id,
                slug: slug,
                offer_id: offer_id,
                clp_version: clp_version
            },
            dataType: 'html',
            success: function (data) {
                $('body').append(data);
                openLoginOrSignupTab(tab);
            }
        });
    } else {
        openLoginOrSignupTab(tab);
    }
}

function openLoginOrSignupTab(tab) {
    if (tab == 'signup') {
        showSignUpForm();
    } else if (tab == 'signup_enroll') {
        showSignUpFormEnroll();
    } else {
        showLogInForm();
    }
}

function showLogInForm() {
    loginTabClickActions();
//    $("#myModal").modal('show');
    $('#new_sign_up_mode').modal('show');
    showLoginInModal();
}

function showSignUpForm() {
    freezeBodyScroll();
    signupTabClickActions();
    $('#new_sign_up_mode').modal('show');
    showSignupInModal();
}

function showSignUpFormEnroll() {
    freezeBodyScroll();
    //signupTabClickActions();
    $("#enrollModalcenter").modal('show');
//        $('button:contains("Unlock Demo Video")').text("Login");
    /*if ($("#page_sense_enroll_exp").length != 0) {
        $("#enrollModalcenter").modal('show');
        $('button:contains("Unlock Demo Video")').text("Login");
    } else {
        $("#myModal").modal('show');
    }*/
}

function freezeBodyScroll() {
    var $body = $('body');
    if ($body.hasClass('modal-open')) {
        $body.addClass('modal-scroll-hide');
    } else {
        $body.addClass('modal-scroll-hide');
    }
}


function signupTabClickActions(){
    $('#signin_signup_cancel').attr('data-gacat', 'Signup popup');
    $(".right_wid_signup").css("display", "block");
    $(".right_wid_login").css("display", "none");

    $("#LogIn").removeClass('in active');
    $("#SignUp").addClass('in active');

    if(typeof $("#eu-terms-check").val() != "undefined"){
        if($("#eu-terms-check").is(":checked")){
            $('#eu-create-btn').prop('disabled', false);
        }
        else{
            $('#eu-create-btn').prop('disabled', true);
        }
    }
}

function loginTabClickActions(){
    $('#signin_signup_cancel').attr('data-gacat', 'Login popup');
    $(".right_wid_signup").css("display", "none");
    $(".right_wid_login").css("display", "block");

    $("#LogIn").addClass('in active');
    $("#SignUp").removeClass('in active');

    $(".forgotpasssection").hide();
    $(".successfooter").hide();
    $(".loginsecmain").show();
    $(".loginsec").show();
}


if ($(window).width() > 991) {
    $('.search_inp').click(function () {
        $('#dropdownMenu1').attr('aria-expanded', 'false');
        $('#dropdownMenu1Container').removeClass('open');
    });
}
// mobile and tab view fix
//if ($(window).width() <= 991) {
//// different search box for mobile view
//    form_string = '<form id="cb_searchbox" onsubmit="return formSubmit(\'search-inp\')">'
//            + '<a data-toggle="collapse" id="mobile-search-icon" href="#mobsearch" aria-expanded="false" aria-controls="mobsearch">'
//            + '<i class="fa fa-search icon-fa-search search_ico visible-sm visible-xs"></i>'
//            + '</a>'
//            + '<div class="collapse search-course" id="mobsearch" aria-expanded="false">'
//            + '<span>'
//            + '<div id="remote" class="typeahead__container">'
//            + '<div class="typeahead__field">'
//            + '<span class="typeahead__query">'
//            + '<input maxlength="41" type="text" name="user_v1[query]" autocomplete="off" onKeyUp="return submitenter(\'search-inp\', event)" id="search-inp" class="search_inp" placeholder="What do you want to learn today?" value="">'
//            + '</span>'
//            + '<span class="typeahead__button">'
//            + '<i id="search-button-top" onclick="formSubmit(\'search-inp\', false)" class="icon-Right_arrow search_ico icon-Right_arrow-search_ico"></i>'
//            + '<i id="autosearchload_top" style="display:none;" class="fa fa-circle-o-notch fa-spin icon-fa-spin search_ico"></i>'
//            + '</span>'
//            + '</div>'
//            + '</div>'
//            + '</span>'
//            + '</div>'
//            + '</form>';
//    $('#desktop-searchbox').html("");
//    if (typeof page_name != "undefined" && page_name == "home") {
//        $('#mobile-searchbox').html(''); //	Do not show search in home page
//    } else {
//        $('#mobile-searchbox').html(form_string);
//    }
//// Mobile view fix
//// give priority to course list in mobile view
//    if ($(window).width() <= 776) {
//        $('#dropdownMenu1').attr('aria-expanded', 'false');
//        $('#dropdownMenu1').click(function () {
//            if ($('#dropdownMenu1').attr('aria-expanded') == 'false') {
//                $('body').animate({
//                    scrollTop: $('#dropdownMenu1').offset().top
//                }, 500);
//            }
//        });
//    }
//}

// auto search js
var searchQueryId = null;
var searchText = null;
var searchResults = [];
setTimeout( function () {
    var cntItems = 0;
    $('#search-inp,#search-inp1').typeahead({
        searchOnFocus: true,
        maxItem: 0,
        maxItemPerGroup: 6,
        group: {
            template: function(item) {
                if(item.group === 'Trending Courses')
                    return '<i class="icon-Trending_Searches"></i>&nbsp; ' + item.group;
            }
        },
        groupOrder: ["Relevant Courses", "Trending Courses"],
        delay: 50,
        dynamic: true,
        dynamicFilter: false,
        cancelButton: false,
        loadingAnimation: false,
        highlight: true,
        template: function (query, item) {
            cntItems = cntItems + 1;
            var template = '';
            gaAction = 'Insite Search';
            if(item.group === 'Trending Courses') {
                template += '<i class="icon-Trending_Search"></i>&nbsp;&nbsp;'
                gaAction = 'Trending Search';
            }
            
            if(page_name=='home_new_v2' || page_name=='home_new') {
                 gaAction = 'Homepage_' + gaAction;
             } else {
                 gaAction = 'Site_' + gaAction;
             }
             
            template += '<span class="{{class}}" data-id="{{dataId}}">'
                + '<a class="title" onclick="trackGIEventHeader(this);triggerEvent(\'Searched_v2\', {\'Recommendation_clicked\': \''+ cntItems +'\', \'Search_Keyword\': \''+ searchText +'\'});return true;" data-gi-label-expanded="true", data-gi-action="'+ gaAction +'", data-gi-label="Recommedation -'+ cntItems +'", data-gi-category="Search_v2"  href="{{slug}}">'
                + '<span class="title">{{title}}</span>'
                + '</a>'
                + "</span>";
            return template;

        },
        templateValue: " ",
        emptyTemplate: '<span class="title">No relevant results found </span>',
        display: ["title", "search_tags", "description"],
        href: "{{item.slug}}",
        source: {
            "Trending Courses": {
                minLength: 0,
                maxLength: 0,
                filter: false,
                data: trendingCourseList
            },
            "Relevant Courses": {
                minLength: 1,
                filter: false,
                ajax: {
                    url: webURL + "/search-service/search-courses?v=v1&q={{query}}&c=" + getSearchTrackerCookie(),
                    type: 'GET',
                    async: true,
                    callback: {
                        done: function(data) {
                            cntItems = 0;
                            if(typeof data === 'string') {
                                data = JSON.parse(data);
                            }
                            data.data.forEach(function(item, currentIndex) {
                                item.class = 'relevant-course';
                                item.dataId = currentIndex + 1;
                                if(item._highlightResult && item._highlightResult.display_title) {
                                    item.title = item._highlightResult.display_title.value
                                }
                            });
                            searchResults = data.data;
                            searchQueryId = data.requestId;
                            return data.data;
                        }
                    }
                }
            }
        },
        callback: {
            onSendRequest: function (node, query) {
                searchText = query;
                if($("#dropdownMenu1Container").hasClass("open")) {
                    $("#dropdownMenu1Container").removeClass("open");
                }
                var selector = node.selector;
                if (selector == "#search-inp1") {
                    $("#search-button-bottom").hide();
                    $("#autosearchload_bottom").show();
                } else {
                    $("#search-button-top").hide();
                    $("#autosearchload_top").show();
                }
            },
            onReceiveRequest: function (node, query) {
                searchText = query;
                var selector = node.selector;
                if (selector == "#search-inp1") {
                    $("#autosearchload_bottom").hide();
                    $("#search-button-bottom").show();
                } else {
                    $("#autosearchload_top").hide();
                    $("#search-button-top").show();
                }
            },
            onClickAfter: function (node, a, obj, event) {
                event.preventDefault();
                logSearchResponseSelection(searchQueryId, obj);
                tmpCategory = '';
                if(coursesData[Number(obj.id)] !== undefined) {
                    if(coursesData[Number(obj.id)]['Category'] !== undefined) {
                        tmpCategory = coursesData[Number(obj.id)]['Category'];
                    }
                }
                searchResults = filterSearchResults(searchResults);
                /*
                triggerEvent(EVENT_SEARCH,{
                   keyword: searchText,
                   courseCategory: tmpCategory,
                   courseName: obj.display_title,
                   results: JSON.stringify(searchResults.slice(0,3)),
                   recommendationClicked: obj.dataId,
                   status: "success"
                }); */

                window.location.href = obj.slug;
            }
        },
        debug: false
    });
    $("#search-button-top").css("pointer-events", "none");
    if(page_name == 'home_new') {
        tempPageName = 'Home_v2';
        eventFieldsObject = {};
        ga('send', 'event', tempPageName, 'page visit', '', eventFieldsObject);
    }
    
    
    
    
},1000);


if (typeof isJSON != 'function') {
    function isJSON(data) {
        var ret = true;
        try {
            $.parseJSON(data);
        } catch (e) {
            ret = false;
        }
        return ret;
    }
}


function filterSearchResults(searchResults) {
    var newSearchData = [];
    searchResults = searchResults.slice(0, 3);
    var dataLength = searchResults.length;
    if (dataLength > 0) {
        for (i = 0; i < dataLength; i++) {
            var tempSearchObject = {
                id: searchResults[i]['id'],
                title: searchResults[i]['title'],
                displayTitle: searchResults[i]['display_title'],
                column: searchResults[i]['column']
            };
            newSearchData.push(tempSearchObject);
        }
    }
    return newSearchData;
}


function submitenter(myfield, e, gacat) {
    if (typeof gacat === "undefined") {  gacat=null; }
    var searchKeyword = $('#' + myfield).val();
    searchKeyword = searchKeyword.replace(/[^a-zA-Z0-9]+/,'');
    if (($.trim(searchKeyword) != '')) {
        $("#search-button-top").css("pointer-events", "unset");
    } else {
        $("#search-button-top").css("pointer-events", "none");
    }

    if(myfield == 'homeSearchBar' && searchKeyword == ''){
        $("#homeSearchBarLoadingIcon").hide();
        $("#homeSearchBarIcon").css("display", "inline-block");
    }

    if ((e.which == 13) && (searchKeyword != '')) {

        var tabname = "Search Bar - Header Search";
        var myElemnt = document.getElementById("homeSearchBar");
        if(myElemnt){
            var tabname = "Search Bar - Banner Search";
        }
        if (gacat!='' && gacat!=null) {
            var tabname = gacat;
        }
        var context = window.location.href;
        var userid = $("#ugaid").val();
        var user_email = $("#uemailid").val();
        var status = "user not logged in";
        if (userid != "" || userid != 0) {
            status = "user logged in";
        }
        var currenttimestamp = new Date($.now());
        var event_desc = "UserId: " + userid + "---" + "TimeStamp: "
                + currenttimestamp + "---" 
                + "PageName: " + context;
        //ga('send', 'event', tabname, searchKeyword, event_desc, 0);
        
        
        window._fbq.push(["track", "Search", {}]);
        
        //new ga event
        eventAction = 'Site Search_Search Page';
        if(page_name === 'home_new_v2' || page_name === 'home_new') {
            eventAction = 'Homepage Search_Search Page';
        }
        eventFieldsObject = {};
        eventLabel = userEmail + ';' + Date().toString() + ';' + document.title;
        ga('send', 'event', 'Search_v2', eventAction, eventLabel, eventFieldsObject);
        
        formSubmit(myfield, false);
        return false;
    }
}

function formSubmit(myfield, flag) {
    if (typeof flag === 'undefined') {
        flag = true;
    }
    var searchKeyword = $('#' + myfield).val();
    var actionUrl = '';
    searchKeyword = searchKeyword.replace(/[^a-z0-9\s]/gi, '');
    searchKeyword = searchKeyword.trim();
    $ajaxLoaderGif = $(".ajax_loader_gif_enroll");
    if (searchKeyword === '') {
        $('#' + myfield.id).focus();

        actionUrl = ABTestOnSrp('all', searchKeyword);
        
        if (!flag) {
            $ajaxLoaderGif.show();
            window.location = actionUrl;
            return true;
        } else {
            var actionUrl = webURL + 'all-courses'
        }
    } else {
        actionUrl = ABTestOnSrp('search', searchKeyword);
        triggerEvent(EVENT_SEARCH, {
            keyword: searchKeyword,
            status: "failure"
        });
    }
    $ajaxLoaderGif.show();
    window.location= actionUrl;
    return false;
}

function SearchCategory() {
    var searchKeyword = $('#selectCategory').val();
    if (searchKeyword === 'select') {
        $('#search-inp').focus();
        return false;
    }
    var actionUrl = webURL + 'search/category/' + cleankeyword(searchKeyword);
    var context = window.location.href;
    var tabname = "Search Bar";
    var userid = $("#ugaid").val();
    var user_email = $("#uemailid").val();
    var status = "user not logged in";
    if (userid != "" || userid != 0) {
        status = "user logged in";
    }
    var currenttimestamp = new Date($.now());
    var event_desc = "UserId : " + userid + "---" + "TimeStamp: "
            + currenttimestamp + "--" + "PageName: " + context
            + "User status : " + status;
    // alert(event_desc);
    ga('send', 'event', tabname, searchKeyword, event_desc, 0);
    window.location.href = actionUrl;
}
$("#selectCategory").change(function () {
    SearchCategory();
});
$(".search-header-navigation").on(
        "click",
        "li",
        function () {
            var context = window.location.href;
            var tabname = "Header Navigation";
            var userid = $("#ugaid").val();
            var user_email = $("#uemailid").val();
            var status = "user not logged in";
            if (userid != "" || userid != 0) {
                status = "user logged in";
            }
            var currenttimestamp = new Date($.now());
            var event_desc = "User Email : " + user_email + "---"
                    + "TimeStamp: " + currenttimestamp + "--" + "PageName: "
                    + context + " User status : " + status;
            // alert(event_desc);
            // ga('send', 'event', tabname, event_desc, 0);
            // window.location.href = actionUrl;

        });
// ga calls

function cleankeyword(str) {
    str = str.replace(/\\/g, '').replace(/\//g, '');
    r = encodeURIComponent(str);
    r = r.replace(/\%20/g, '+').replace(/\%/g, '');
    console.log(r);
    return r;
}

// var coursejson = <?php // echo $coursejson; ?>;
$('.ga-allcourses').on("click", function () {
    return true;
    var context = window.location.href;
    var event_category = "All Courses Page";
    var event_action = "All Courses Top Navigation";
    var userid = $("#ugaid").val();
    var currenttimestamp = new Date($.now());
    var event_label = "UserId: " + userid + "---" + "TimeStamp: "
            + currenttimestamp + "--" + "PageName: " + context;
    ga('send', 'event', event_category, event_action, event_label, 0);
});
$('.ga-instructor').on("click", function () {
    return true;
    var context = window.location.href;
    var event_category = "For Instructor";
    var event_action = window.location.href;
    var userid = $("#ugaid").val();
    var currenttimestamp = new Date($.now());
    var event_label = "UserId: " + userid + "---" + "TimeStamp: "
            + currenttimestamp + "--" + "PageName: " + context;
    ga('send', 'event', event_category, event_action, event_label, 0);
});
$('.top-signin').on("click", function () {
    return true;
    var context = window.location.href;
    var event_category = "Header";
    var event_action = "Login";
    var userid = $("#ugaid").val();
    var currenttimestamp = new Date($.now());
    var event_label = "UserId: " + userid + "---" + "TimeStamp: " + currenttimestamp + "--" + "PageTitle: " + context;
    ga('send', 'event', event_category, event_action, event_label, 0);
    $('#auto_banner_load').data('zindex', $('#auto_banner_load').css('z-index'));
   // $('#auto_banner_load').css('z-index', 999);
});
//$('.signin_signup_cancel').click(function () {
//    $('#auto_banner_load').css('z-index', $('#auto_banner_load').data('zindex'));
//});
$('.top-signup').on("click", function () {
    return true;
    var context = window.location.href;
    var event_category = "Header";
    var event_action = "Register";
    var userid = $("#ugaid").val();
    var currenttimestamp = new Date($.now());
    var event_label = "UserId: " + userid + "---" + "TimeStamp: " + currenttimestamp + "--" + "PageTitle: " + context;
    ga('send', 'event', event_category, event_action, event_label, 0);
});
$('.festbtn').on("click", function () {
    $('.offerBanner').css({
        "z-index": "1051"
    });
    var context = window.location.href;
    var event_category = "Promotional Banner ";
    var event_action = context;
    var userid = $("#ugaid").val();
    var currenttimestamp = new Date($.now());
    var event_label = "UserId: " + userid + "---" + "TimeStamp: "
            + currenttimestamp + "--" + "PageName: " + context;
    // alert(userid+"----"+event_category+"---"+event_action+"----"+event_label);
    ga('send', 'event', event_category, event_action, event_label, 0);
});
$('#learnmore').on('click', '.md-close', function () {
    $('.offerBanner').css({
        "z-index": "1031"
    });
});
$('.signin-button, .ga-signin').on("click", function () {
    var context = window.location.href;
    var event_category = "Sign In Label Popup";
    var event_action = context;
    var userid = $("#ugaid").val();
    var currenttimestamp = new Date($.now());
    var event_label = "UserId: " + userid + "---" + "TimeStamp: "
            + currenttimestamp + "--" + "PageName: " + context;
    // alert(userid+"----"+event_category+"---"+event_action+"----"+event_label);
    ga('send', 'event', event_category, event_action, event_label, 0);
});
$('.signup-button, .ga-signup').on("click", function () {
    var context = window.location.href;
    var event_category = "Sign Up Label Popup";
    var event_action = context;
    var userid = $("#ugaid").val();
    var currenttimestamp = new Date($.now());
    var event_label = "UserId: " + userid + "---" + "TimeStamp: "
            + currenttimestamp + "--" + "PageName: " + context;
    // alert(userid+"----"+event_category+"---"+event_action+"----"+event_label);
    ga('send', 'event', event_category, event_action, event_label, 0);
});
$('.ga-blog').on("click", function () {
    return true;
    var event_category = "Header";
    var event_action = "Blog";
    var currenttimestamp = new Date($.now());
    var userid = $("#ugaid").val();
    var event_label = "UserId: " + userid + "---" + "TimeStamp: " + currenttimestamp + "--" + "PageTitle: " + window.location.href;
    ga('send', 'event', event_category, event_action, event_label, 0);
});
$("#header-II .search-nav .dropdown-menu > li:first-child").addClass("active");
$("#header-II .search-nav .dropdown-menu > li").hover(function (e) {
    $("#header-II .search-nav .dropdown-menu > li").removeClass("active");
    $(this).toggleClass("active");
});
var Width = $(window).width();
if (Width < 767) {
// $(".search-nav").css('display','none');
    $("#mob_search").click(function (e) {
        $(".search-nav").css('display', 'table');
        $(".search-nav").css('width', '100%');
        $("#search-inp").css('width', '100%');
        $("#search-inp").focus();
        $("#mob_search").fadeOut(500);
    });
    $("#search-inp").focusout(function (e) {
// $(".search-nav").css('display', 'none');
        $("#mob_search").fadeIn(500);
    });
} else {
    $("#mob_search").css('display', 'none');
}

// $(document).ready(function (e) {
// 	$("#dropdownMenu1Container").hover(
//   function () {
//     $(this).addClass("open");
// 	  $('.typeahead__container').removeClass("result backdrop hint");
//   },
//   function () {
//     $(this).removeClass("open");
//   }
// );
	
	
    $('#mobile-search-icon').click(function (e) {
        setTimeout(function () {
            $("#search-inp").focus();
        }, 10);
    });
    setTimeout(function () {
        $('#header-II .signin').show();
    }, 10);
    $('.popup-close-icon').click(function (e) {
        $('.popup-banner').slideUp('slow');
    });
    $('.popup-anchor').click(function (e) {
        $('.popup-banner').slideToggle('slow', function () {
// var x = $(window).width();
// alert(x);
// $("#mobile-carousel .owl-item").css({"width":x+"px"});
            if (typeof $('').owlCarousel != 'undefined') {

                $("#mobile-carousel").owlCarousel({
                    loop: true,
                    margin: 10,
                    responsiveClass: true,
                    navigation: false,
                    pagination: true,
                    responsive: {
                        0: {
                            items: 1,
                            nav: false
                        },
                        600: {
                            items: 2,
                            nav: false
                        },
                        1000: {
                            items: 3,
                            nav: false,
                            loop: true
                        }
                    }
                });
            }
        });
    });
    $(window).scroll(function (e) {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 520) {
            $('.popup-banner').hide();
        }
    });
    	$("body").on("mouseover",".drop-category-menu",function(){
		var tab_id = $(this).attr('data-tab');//
		$('li.drop-category-menu').removeClass('active');
		$(this).addClass('active');
		$('.sub-cat-menu:visible').hide();
		$('.sub-cat-wrapper').show(); 
		$("#"+tab_id).show();
                
//                var crouselId = "#crousel-"+tab_id;
//                var crouselLeft = ".left-"+tab_id;
//                var crouselRight = ".right-"+tab_id;
//                var crouselIndex = "index-"+tab_id;
//                if(document.getElementById(tab_id).children[1]){
//                    tab_id = new Siema({
//                       selector: crouselId,
//                    });
//                    document.querySelector(crouselLeft).addEventListener('click',function(){
//                        tab_id.prev();
//                        crouselCurrentIndex();
//                    });
//                    document.querySelector(crouselRight).addEventListener('click',function(){
//                        tab_id.next();
//                        crouselCurrentIndex();
//                    });
//                    function crouselCurrentIndex(){
//                        document.getElementById(crouselIndex).innerHTML = tab_id.currentSlide+1;
//                    }
//                }
	});
// });
// wishlist code

$('.header-wishlist').on("click", function () {
    var context = window.location.href;
    var event_category = "Header Wishlist";
    var event_action = context;
    var userid = $("#ugaid").val();
    status = "user not logged in";
    if (userid != "" || userid != 0) {
        status = "user logged in";
    }
    var currenttimestamp = new Date($.now());
    var event_label = "UserId: " + userid + "---" + "TimeStamp: "
            + currenttimestamp + "--" + "UserStatus: " + status + "---"
            + "Page Title : " + context;
    // alert(userid+"----"+event_category+"---"+event_action+"----"+event_label);
    ga('send', 'event', event_category, event_action, event_label, 0);
});
function autoRefresh_div() {
    var user_id = $("#ugaid").val();
    $.ajax({
        type: 'post',
        url: webURL + 'lms_pages/webinarMessage',
        data: {
            user_id: user_id
        },
        asyn: true,
        dataType: 'json',
        success: function (data) {
            // $('#thankyou_popup').modal();
            if (data.msg != "" && data.msg != null) {
                $('.homejoinbtn').show();
                var msg = data.msg;
                $('.hidetexthome').html(msg);
            }
            if (data.status != "" && data.status != null) {
                a = document.getElementById("url_show");
                b = document.getElementById("url_show1")
                a.setAttribute("href", data.status);
                b.setAttribute("href", data.status);
            }
            if (data.msg == "" || data.msg == null) {
                $("#cusbtnhome").hide();
                $('.homejoinbtn').hide();
                $("#cusbtnhomeban").hide();
            }
        }
    });
}

$(function () {
    var existing_customer = $("#existing_cust").val();
    if (existing_customer === "1") {
        var cacheExists = false;
        var referautopopped = false;
        var referpopupvialink = $("#referpopupvialink").val();
        $('#referTopTwo').on('click', function (e) {
            $('#referTop').trigger('click');
        });
        var user_id = $("#ugaid").val();
        var context = window.location.href;
        $(document).on('click', '#referTop , #widget_refer_poup , .referel-link-dashboard', function (e) {
//        $('#referTop , #widget_refer_poup').on('click', function (e) {

            if (!cacheExists) {
                $("#referral-section").load(webURL + 'LmsUsers/userreferrel', function () {
                    cacheExists = true;
                    // $('#ajax-loader').hide();

                    $.ajax({
                        type: 'post',
                        url: webURL + 'users/ambassadorevents',
                        data: {
                            user_id: user_id,
                            context: context,
                            autopopped: referautopopped,
                            clicktype: 'TOPBAR'
                        },
                        dataType: 'json',
                        asyn: true,
                        error: function () {
                            // $('#admin').html("ERROR!");
                            referautopopped = false;
                        },
                        success: function (data) {
                            referautopopped = false;
                        }
                    });
                    $("#referral-section").show();
                    $('.modulebox').hide();
                    $('.referral-module').show();
                    $('#lms-modal-referral').modal('show');
                });
            }
            ga('create', GaUATID, 'auto');
            ga('send', 'event', 'Referral Tabs', 'Email',
                    'User Id:' + user_id + ', Date:' + current_date, 0);
//            ga('send', 'event', 'Referral Click',
//                    'Refer on Top Bar', user_id + ':'
//                    + current_date, 0);
        });
    }
});
var $body = $(window.document.body);
function bodyFreezeScroll() {
    var bodyWidth = $body.innerWidth();
    $body.css('overflow', 'hidden');
    $body.css('marginRight', ($body.css('marginRight') ? '+=' : '')
            + ($body.innerWidth() - bodyWidth));
}

function bodyUnfreezeScroll() {
    var bodyWidth = $body.innerWidth();
    $body.css('marginRight', '-=' + (bodyWidth - $body.innerWidth()));
    $body.css('overflow', 'auto');
}

$(function () {
    if((page_name==='home_new' || page_name==='home_new_v2') && headerType==="new") {
        clevertap_partial_data = {'pageName': 'home_new_v2'};
        triggerEvent('Page Viewed', clevertap_partial_data);
    }
    $('#banner-panel').show();
    // bodyFreezeScroll()
    $('#bannerhide').click(function () {
        $('#banner-panel').hide();
        // bodyUnfreezeScroll();
        $.ajax({
            url: webURL + 'lms/updateSmartBanner',
        });
    });
    /*
     * post in forum js
     */
    $("#postinforum").on("click", function () {
        $('#postquestionform').attr('action', webURL + 'postquestion');
        $('#question_desc').val($('#question_desc').code());
        $('#postquestionform').submit();
        saveMyQuery();
        return false;
    });
    
    //$('.giTrackElementHeader').on('click', function(){trackGIEventHeader(this);return true;});
    $('.giTrackElementHeader').click(function(){trackGIEventHeader(this);return true;});
});
/*
 * auto load banner by slot is and dev id
 * @author niraj singh
 */

function loadBannerFoAllBatch(slot_id, courseId) {
    var isCompanyAllow = $("#companyAllow").val();
    if (isCompanyAllow) {
        return true;
    }
    var batchId = 'NA';
    var prev_offer_code = '';
    if (typeof prev_offer_code == "undefined") {
        prev_offer_code = '';
    }
    $.each(eval(batch_array), function (key, val) {
        if (val['batch_id'] != "undefined") {
            batchId = val['batch_id']
        } else {
            batchId = val['id']
        }
        loadUrl = webURL + 'contents/loadBannerBySlotId/' + slot_id + '/' + courseId + '/' + batchId + '/' + prev_offer_code;
        $('.' + courseId + "_" + batchId).load(loadUrl, function () {
            $('.' + courseId + "_" + batchId + '_tooltip').attr("data-original-title", $('.' + courseId + "_" + batchId).html());
        });
    });
}

function loadBanner(dev_id, slot_id, courseId, div_type) {
    var isCompanyAllow = $("#companyAllow").val();
    var course_version = $("#passclp_version").val();
    if (isCompanyAllow) {
        return true;
    }
    var loadUrl;
    var batchId = 'NA';
    if (typeof courseId == "undefined" || courseId == null || courseId == "") {
        courseId = "NA";
    }
    if (typeof prev_offer_code == "undefined" || prev_offer_code == null || prev_offer_code == "") {
        prev_offer_code = "NA";
    }
    if (typeof div_type !== "undefined") {
        div_type = div_type;
    } else {
        div_type = "id";
    }
    if (prev_offer_code != "NA") {
        loadUrl = webURL + 'contents/loadBannerBySlotId/' + slot_id + '/' + courseId + '/' + batchId + '/' + prev_offer_code + '/' + course_version;
    } else if (courseId != "NA") {
        loadUrl = webURL + 'contents/loadBannerBySlotId/' + slot_id + '/' + courseId + '/' + batchId + '/' + prev_offer_code + '/' + course_version;
    } else if (typeof (currentCourseId) !== 'undefined') {
        loadUrl = webURL + 'contents/loadBannerBySlotId/' + slot_id + '/' + currentCourseId + '/' + batchId + '/' + prev_offer_code + '/' + course_version;
    } else {
        loadUrl = webURL + 'contents/loadBannerBySlotId/' + slot_id;
    }
    if (div_type == "id") {

        $('#' + dev_id).load(loadUrl, function (response, status, xhr) {
            if (response) {
                if (slot_id == "1") {
                    adjustPage();
                }
            } else {
                if (slot_id == "1") {
                    $('#smart_banner_id').show();
                }
            }
        });
    } else {
        $('.' + dev_id).load(loadUrl, function (response, status, xhr) {
            if ($.trim(response) === '' || response === null) {
                $("." + dev_id).removeClass();
            }
        });
    }

}


//function adjustPage() {
//    if (homepageloadbanner == false || typeof homepageloadbanner == "undefined") {
//        if ($('.notification-banner , .festBar').length == 1) {
//            $('#header-II').addClass('withoffer');
//            $('.offerBanner').css({"z-index": "1041"});
//            $(".top_nav_stik").css({"top": "33px"});
//        }
//        if ($(window).width() >= 768 && $('.notification-banner , .festBar').length == 1) {
//            if (typeof $('.notification-banner , .festBar').data('actheight') == 'undefined')
//                $('.notification-banner , .festBar').data('actheight', $('.notification-banner , .festBar').height());
//            // $('body').css({
//            //     'marginTop': $('.notification-banner , .festBar').data('actheight') +
//            //             $('.notification-banner , .festBar').height()
//            // });
//            $('body').css({'margin-top': '93px'});
//            $(".inner-navigation-list").css({"padding-top": "0px"});
//            $(".breadcrumbsstaticpg").css({"padding-top": "6px"});
//            $(".bredcrumb_mobiletop1").css({"margin-top": "8px"});
//            $(".review_page_contentright").css({"margin-top": "26px"});
//            $(".bredcrumb_mobiletop2").css({"margin-top": "-2px"});
//            $(".bredcrumb_mobiletop").css({"margin-top": "0px"});
//            $(".breadcrumbs_staticabout").css({"margin-top": "-2px"});
//            $(".breadcrumbs_static").css({"padding-top": "0px"});
//            $(".banersearchafter").css({"padding-top": "17px"});
//            $(".myprofilebanrload").css({"padding-top": "24px"});
//            $(".breadcrumbssearchnew").css({"padding-top": "18px"});
//            $(".side_top_fix").css({"top": "33px"});
//            $(".top_nav_stik").css({"top": "33px"});
//            /*All course breadcrum fix on banner load- start viky22Feb16*/
//            $(".breadcrumbs_allcourse_onbannerload").css({"padding-top": "18px"});
//            $(".allcourse-herohead").css({"margin-top": "6px"});
//            /*All course breadcrum fix on banner load- end*/
//            /*CLP breadcrumb fix start- viky22Feb16*/
//            $(".clp-herohead-fix").css({"padding-top": "13px"});
//            /*CLP breadcrumb fix end- viky22Feb16*/
//        }
//        $(".closeFestBar").click(function () {
//            if (typeof onBannerClose == 'function') {
//                onBannerClose();
//            }
//            $(".festBar").hide();
//            $(".afterclose_open").slideDown("slow");
//            $("body").css({"margin-top": "60px"});
//            $(".breadcrumbsstaticpg").css({"padding-top": "6px"});
//            $('#header-II').removeClass('withoffer');
//           // $('.offerBanner').css({"z-index": "1"});
//           $(".side_top_fix").css({"top": "0px"});
//           $(".top_nav_stik").css({"top": "0px"});
//        });
//    } else {
//        if ($('.notification-banner , .festBar').length == 1) {
//            $('#header-II').addClass('withoffer');
//            $(".top_nav_stik").css({"top": "33px"});
//            //$('.offerBanner').css({"z-index": "999"});
//        }
//        $(".closeFestBar").click(function () {
//
//            $(".festBar").hide();
//            $('#header-II').removeClass('withoffer');
//            //$('.offerBanner').css({"z-index": "1"});
//            $(".side_top_fix").css({"top": "0px"});
//            $(".top_nav_stik").css({"top": "0x"});
//        });
//    }
//}


/**
 * handles post button click request
 *
 * @returns {Boolean}
 */
function saveMyQuery() {

    var code = $('#question_desc').code();
    var validDesc = ($.trim($('<p>' + code + '</p>').text()) != '');
    $('#question_desc').val(code);
    var validatorCheck = $('#postquestionform').data('bootstrapValidator');
    validatorCheck.validate();
    var attachments = $('#questionfilequeue').children('div.uploadifive-queue-item');
    if (!validDesc) {
        var msg = 'Add some description to your query.';
        $(".alert-danger").show();
//         $(".has-feedback").each(function () {
//            $('.has-feedback').addClass("has-error");
//        });
        $('#qa-post-error_message').html(msg).show().closest('.errr-body').removeClass('none');
        return false;
    }
    if (attachments.length > 3) {
        var msg = 'You cannot upload more than 3 attachments.Use a zip file if required.';
        $('#qa-post-error_message').html(msg).show().closest('.errr-body')
                .removeClass('none');
        return false;
    }
    $('#qa-post-error_message').hide().closest('.errr-body').addClass('none');
    if (validatorCheck.isValid()) {

        $('#ajax-loader').show();
        if (attachments.length > 0) {
            $('#ajax-loader').children().toggleClass('none');
            setTimeout(function () {
                $('#questionfiles').uploadifive('upload');
                sendQuestionSaveRequest();
            }, 500);
        } else {
            sendQuestionSaveRequest();
        }
    }

}
/**
 * ajax post request to save questions
 */
function sendQuestionSaveRequest() {
    $('#qa-post-error_message').hide().closest('.errr-body').addClass('none');
    $('#ajax-loader').show();
    $.ajax({
        type: 'post',
        url: $('#postquestionform').attr('action'),
        data: $('#postquestionform').serializeArray(),
        dataType: 'json',
        async: true,
        error: function () {
            $('#ajax-loader').hide();
        },
        success: function (dataResponce) {
            if (dataResponce.status == 'success') {
                $('#question_desc').code('');
                $('.modal').modal('hide');
                $('#ajax-loader').hide();
                $("#support_ticket_status_msg").html("Success!");
                $("#support_ticket_alert_msg").html(dataResponce.msg);
                $('#alertsupportticket').on('hide.bs.modal', function () {
                    location = location;
                });
                $('#alertsupportticket').modal('show');
                setTimeout(function () {
                    $('#alertsupportticket').trigger('click');
                }, 1000);
                if (typeof dataResponce.qcount != 'undefined')
                    $('.label-question-count').html(
                            dataResponce.qcount + ' Question(s)');
            } else {
                $('#ajax-loader').hide();
                var msg = (typeof dataResponce.msg == 'object') > 0 ? dataResponce.msg.content
                        : dataResponce.msg;
                $('#qa-post-error_message').html(msg).show().closest(
                        '.errr-body').removeClass('none');
                return false;
            }
            return false;
        }
    });
}

/**
 *
 * @param {type}
 *            e
 * @returns {undefined}
 */
function clearQueue(e) {
    $('#questionfiles').uploadifive('clearQueue');
}
$("#header-II .mobsearch a").click(function (e) {
    //alert();
    $("#header-II .mobsearch a .search_ico").toggleClass("toggle");
});

function formatPrice(price) {
    const figure = 3;
    if (price !== undefined && price != null) {
        price = price.toString();
        if (price.length > figure) {
            price = price.slice(0, price.length - figure) + "," + price.slice(price.length - figure);
        }
    }
    return price;
}

function bingTrackingCode(ec , ea , el , ev){
    
    window.uetq = window.uetq || []; 
    window.uetq.push
    ({ 'ec':ec, 'ea':ea, 'el':el, 'ev':ev }); 
    
}

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}
$("#dropdownMenu1").click(function(){
    $(".typeahead__container").css("z-index",0);
});



$(".ele_iterator").each(function() {
var key = $(this).attr("data-key");
const items = document.querySelectorAll('#counter-item-'+key);
const itemCount = items.length;
const nextItem = document.querySelector('#next-'+key);
const previousItem = document.querySelector('#previous-'+key);
var count = 0;
document.getElementById('counter-'+key).innerHTML = (count + 1)+"/"+itemCount;
$('#previous-'+key).addClass("arrowdisable");

if (itemCount === 1 ){
    document.getElementById('counter-'+key).classList.add('hide');
    document.getElementById('slider-n').classList.add('hide');
    }
    
    
function showNextItem() { 
  items[count].classList.remove('active');
  if(count < itemCount - 1) {
    $('#next-'+key).removeClass("arrowdisable");
    count++;
    if(count == itemCount - 1){
        $('#next-'+key).addClass("arrowdisable");
        $('#previous-'+key).removeClass("arrowdisable");
        //count = 0;
    }
  } 

  items[count].classList.add('active');
  console.log(count);
    document.getElementById('counter-'+key).innerHTML = (count + 1)+"/"+itemCount;
}

function showPreviousItem() { 
  items[count].classList.remove('active');
  if(count > 0) {
    $('#previous-'+key).removeClass("arrowdisable");
    count--;
    if(count == 0){
        $('#previous-'+key).addClass("arrowdisable");
        $('#next-'+key).removeClass("arrowdisable");
        //count = itemCount - 1;
    }
  } 

  items[count].classList.add('active');
  console.log(count);
    document.getElementById('counter-'+key).innerHTML = (count + 1)+"/"+itemCount;
}
nextItem.addEventListener('click', showNextItem);
previousItem.addEventListener('click', showPreviousItem);

});
$(document).on('click', '.dropdown-submenu_home', function (e) {
  e.stopPropagation();
});
$('#homeSearchBar').on('focus', function(){
  $('#remote').removeClass('result');
});
$('#search-inp').on('focus', function(){
  $('.typeahead__container').removeClass('result');
});


function logSearchResponseSelection(requestId, selection) {
    let data = {
        "requestId": requestId,
        "selection": selection
    }
    $.post(webURL + '/search-service/log-selection', data, function(response) {
        console.log(response)
    })

}

function getSearchTrackerCookie(uname) {
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookies = decodedCookie.split('; ');
    var key = 'search_tracker_cookie';
    var val = null
    cookies.forEach(function(cookie) {
        if(cookie.split('=')[0] == key)
            val = cookie.split('=')[1];
    })
    if(!val) {
        console.log('val = null')
        val = uuidv4();
        createCookie(key, val, 30)
    }
    return val;
}

function createCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function uuidv4() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}
}, 1500);

function trackGIEventHeader(element) {
    eventCategory = (page_name != undefined && (page_name == 'home_new_v2' || page_name == 'home_new')) ? 'Search_Header_Home' : "Search_Header_Non-Home";
    //has a custom override category been set on the element?.. checking...
    eventCategoryOverride = $(element).data('gi-category');
    if (eventCategoryOverride!=='' && eventCategoryOverride!=undefined) {
        eventCategory = eventCategoryOverride;
    }
    
    eventAction = $(element).data('gi-action');
    eventLabel = $(element).data('gi-label');

    //handling the default
    if (eventLabel == undefined || eventLabel == 'default') {
        eventLabel = '';
    }
    
    expandLabel = $(element).data('gi-label-expanded');
    if (expandLabel == true || expandLabel == 'true') {
        //let us expand the label as "<label value>;UserEmail; timestamp; page title"
        //handling the delimiter case
        if(eventLabel != '') {
            eventLabel = eventLabel + ';';
        }
        //now expanding/augmenting the label value
        eventLabel = eventLabel + userEmail + ';' + Date().toString() + ';' + document.title;
    }
    
    
    reportGAEvent(eventCategory, eventAction, eventLabel);
    return true;
}