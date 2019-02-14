setTimeout(function(){ 
setTimeout(function () {
  let menu = new SlideMenu(document.getElementById('slide-menu-resp'),{
      position: 'left',
      showBackLink: true,
      keycodeClose: '13',
      submenuLinkAfter: '<i class="icon-Arrow-rightward2"></i>',
      backLinkBefore: '<i class="icon-Arrow-leftward2"></i>'
  });


$('.new_head_ham.slide-menu__control , .cat_btn.slide-menu__control').on('click',function(){
  let menu = document.getElementById('slide-menu-resp')._slideMenu;
  menu.open();
  $('#slideoverlay').removeClass('hide');
})
$('.closemenu.slide-menu__control ,#slideoverlay, .login_new, .signup_new ').on('click',function(){
    let menu = document.getElementById('slide-menu-resp')._slideMenu;
    menu.close();
    $('#slideoverlay').addClass('hide');   
});
}, 2000);
$(document).on('ready', function(){
if(window.innerWidth > 767){
 $('.catmenumain').css('display', 'block');
}
});
var autocollapsecat = function() {
  let $topcategorynav = $('.topcatsec');
  var tabs = $('#tabscathome');
  var tabsHeight = tabs.innerHeight();
  if (tabsHeight >= 35) {
    while(tabsHeight > 35) {
      var children = tabs.children('li:not(:last-child)');
      var count = children.size();
      tmpHtml = children[count-1].innerHTML;
      //tmpHtml = tmpHtml.replace('Top_Category_', 'Browse_Category_');
      tmpHtml = tmpHtml.replace('giTrackElementHeader', '');
      c_name = children[count-1].textContent;
      //$on_click = "triggerEvent('Top_category_click', {'Category_name': '$c_name'});return true;"
      tmpHtml = tmpHtml.replace('<a', '<a onclick="trackGIEventHeader(this);triggerEvent(\'Top_category_click\', {\'Category_name\': \''+ c_name +'\'});return true;" ');
      children[count-1].innerHTML = tmpHtml;
      $(children[count-1]).prependTo('#hiddencat');
      
      tabsHeight = tabs.innerHeight();
    }
  }
  else {
  	while(tabsHeight < 35 && (tabs.children('li').size()>0)) {
      
      var collapsed = $('#hiddencat').children('li');
      var count = collapsed.size();
      $(collapsed[0]).insertBefore(tabs.children('li:last-child'));
      tabsHeight = tabs.innerHeight();
    }
    if (tabsHeight>35) { // double chk height again
    	autocollapsecat();
    }
  }
  $topcategorynav.css('overflow', 'visible');
};

$(document).ready(function() {
    autocollapsecat(); // when document first loads
	$(window).on('resize', autocollapsecat); // when window is resized
  
});


}, 1100);