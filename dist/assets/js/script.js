'use script'

// Add backdrop element
$('body').append('<div class="main-backdrop"></div>');

// Enable tooltips everywhere
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

// Show sidebar in mobile
$('#menuLink').on('click', function(e){
  e.preventDefault();

  $('body').toggleClass('sidebar-show');
});

// Hide sidebar in mobile
$('body').on('click', '.main-backdrop', function(){
  $('body').removeClass('sidebar-show sideright-show');
})

// Sidebar Interaction
const psSidebar = new PerfectScrollbar('#sidebarMenu', {
  suppressScrollX: true
});

$('.sidebar .nav-label').on('click', function(e){
  e.preventDefault();

  var target = $(this).next('.nav-sidebar');
  $(target).slideToggle(function(){
    psSidebar.update();
  });

});

$('.sidebar .has-sub').on('click', function(e){
  e.preventDefault();

  var target = $(this).next('.nav-sub');
  $(target).slideToggle(function(){
    psSidebar.update();
  });

  var siblings = $(this).closest('.nav-item').siblings();
  siblings.each(function(){
    var nav = $(this).find('.nav-sub');
    if(nav.is(':visible')) {
      nav.slideUp();
    }
  });
});

$('#sidebarFooterMenu').on('click', function(e){
  e.preventDefault();
  $(this).closest('.sidebar').toggleClass('footer-menu-show');
});

// Header mobile effect on scroll
function animateHead() {
  if($(document).scrollTop() > 20) {
    $('.main-mobile-header').addClass('scroll');
  } else {
    $('.main-mobile-header').removeClass('scroll');
  }
}

$(window).scroll(function() {
  animateHead();
});

// Click interaction anywhere in the page
$(document).on('click touchstart', function(e){
  e.stopPropagation();

  // closing sidebar footer menu
  if(!$(e.target).closest('.sidebar-footer').length) {
    $('.sidebar').removeClass('footer-menu-show');
  }
});
// modal menu
$('.modal-toggle').on('click', function(e) {
  e.preventDefault();
  $('.modal-menu').toggleClass('is-visible');
});

jQuery(function(){
 jQuery('.showSingle').click(function(){
    jQuery('.targetDiv').hide('.cnt');
    jQuery('#div'+$(this).attr('target')).slideToggle();

 }); 
});

// Form search
$('.form-search .form-control').on('focusin focusout', function(e){
  $(this).parent().toggleClass('onfocus');
});

// Show/hide sidebar
$('#menuSidebar').on('click', function(e){
  e.preventDefault();

  if(window.matchMedia('(min-width: 992px)').matches) {
    $('body').toggleClass('sidebar-hide');
  } else {
    $('body').toggleClass('sidebar-show');
  }
});

// Show/hide sidebar offset
$('#menuSidebarOffset').on('click', function(e){
  e.preventDefault();

  $('body').toggleClass('sidebar-show');
});

// Load skin mode
var skinMode = localStorage.getItem('skin-mode');
if(skinMode) {
  $('html').attr('data-skin', 'dark');
  $('#skinMode .nav-link:last-child').addClass('active').siblings().removeClass('active');
}

// Set skin mode
$('#skinMode .nav-link').on('click', function(e){
  e.preventDefault();
  $(this).addClass('active').siblings().removeClass('active');

  var mode = $(this).text().toLowerCase();
  if(mode == 'dark') {
    $('html').attr('data-skin', 'dark');
    localStorage.setItem('skin-mode', mode);
  } else {
    localStorage.removeItem('skin-mode');
    $('html').attr('data-skin', '');
  }
});

// Load sidebar skin
var sidebarSkin = localStorage.getItem('sidebar-skin');
if(sidebarSkin) {
  $('.sidebar').attr('class', 'sidebar sidebar-' + sidebarSkin);

  if(sidebarSkin == 'prime') {
    $('#sidebarSkin .nav-link:nth-child(2)').addClass('active').siblings().removeClass('active');
  } else {
    $('#sidebarSkin .nav-link:last-child').addClass('active').siblings().removeClass('active');
  }
}

// Set sidebar skin
$('#sidebarSkin .nav-link').on('click', function(e){
  e.preventDefault();
  $(this).addClass('active').siblings().removeClass('active');

  var skin = $(this).text().toLowerCase();
  if(skin == 'default') {

    $('.sidebar').attr('class','sidebar');
    localStorage.removeItem('sidebar-skin');

  } else {

    $('.sidebar').attr('class', 'sidebar sidebar-' + skin);
    localStorage.setItem('sidebar-skin', skin);
  }
});

// Direction (LTR,RTL)
$('#layoutDirection .nav-link').on('click', function(e){
  e.preventDefault();
  var loc = window.location.href;
  var newLoc = '';

  if($(this).is(':last-child')) {
    if(loc.includes('/dashboard/')) newLoc = loc.replace('/dashboard/', '/dashboard-rtl/');
    if(loc.includes('/apps/')) newLoc = loc.replace('/apps/', '/apps-rtl/');
    if(loc.includes('/pages/')) newLoc = loc.replace('/pages/', '/pages-rtl/');

  } else {
    if(loc.includes('/dashboard-rtl/')) newLoc = loc.replace('/dashboard-rtl/', '/dashboard/');
    if(loc.includes('/apps-rtl/')) newLoc = loc.replace('/apps-rtl/', '/apps/');
    if(loc.includes('/pages-rtl/')) newLoc = loc.replace('/pages-rtl/', '/pages/');
  }

  window.location.href = newLoc;
})

$('#select2F').select2({
  placeholder: 'Pilih filter',
  maximumSelectionLength: 100,
  minimumResultsForSearch: Infinity
});
// scroll ticky table
$(window).scroll(function() {
  if ($(this).scrollTop() > 200){  
      $('.h-t').addClass("sticky-th");
    }
    else{
      $('.h-t').removeClass("sticky-th");
    }
  }); 


// menu filter
$('.select-filter').on('click',function () {
  $('.dropdown-menufilter').addClass('show-filter');   
});
$('.filterclose').on('click',function () {
  $('.dropdown-menufilter.show-filter').removeClass('show-filter');   
});
$('.filter-footer').on('click',function () {
  $('.dropdown-menufilter.show-filter').removeClass('show-filter');   
});

// $('#menuSidebarOffset').on('click', function(e){
//   e.preventDefault();

//   $('body').toggleClass('sidebar-show');
// });

// change background check box table
$(function() {
  $('td:first-child input').change(function() {
    $(this).closest('tr').toggleClass("highlight", this.checked);
  });
});


// show menu action checklist
$('.checkmenu').change(function(){
  if($(this).is(":checked")) {
      $('.menu-action').addClass('checklis-show');
  } else {
      $('.menu-action').removeClass('checklis-show');
  }
});
$('.close-menuaction').on('click',function () {
  $('.menu-action.checklis-show').removeClass('checklis-show');   
});

$('#wizard3').steps({
  headerTag: 'h3',
  bodyTag: 'div',
  autoFocus: true,
  titleTemplate: '<span class="number">#index#</span> <span class="title">#title#</span>',
  stepsOrientation: 1,
  transitionEffect: "fade",
    labels: 
    {
        finish: "Kirim",
        next: "Selanjutnya",
        previous: "Kembali",
    },
});

// steps
$(document).ready(function(){
  $("select").change(function(){
      $(this).find("option:selected").each(function(){
          if($(this).attr("value")=="ada"){
              $(".box").not(".ada").hide();
              $(".ada").show();
          }
          else if($(this).attr("value")=="tidakada"){
              $(".box").not(".tidakada").hide();
              $(".tidakada").show();
          }
          else if($(this).attr("value")=="tunda"){
              $(".box").not(".tunda").hide();
              $(".tunda").show();
          }
          else{
              $(".box").hide();
              $(".ada").show();
          }
      });
  }).change();
});

// upload photo profile
const imageUploader = document.querySelector("input");
const imagePreview = document.querySelector(".showphoto");

function showImage() {
  let reader = new FileReader();
 reader.readAsDataURL(imageUploader.files[0]);
  reader.onload = function(e) {
    imagePreview.classList.add("show");
    imagePreview.src = e.target.result;
  };
}
