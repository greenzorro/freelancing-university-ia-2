var marketoCookie = Cookies.get('_mkto_trk');

if(typeof custom_data.marketoHost != 'undefined'){
    jQuery(function($){
        var data = {
            'action': 'get_marketo_lead_data',
            'cookie': marketoCookie
        };
        $.post( custom_data.ajaxURL, data, function(response) {
            if(response.success)
            {
                setMarketoLeadData(response);
            }
        });
    });
}

jQuery(window).on("load resize scroll",function($){
    if (jQuery(window).width() > 991) {
         if (jQuery('.image-container-desc').length) {
            jQuery('.image-container-desc').each(function(){
                var thisHeight = jQuery(this).outerHeight();
                var descriptionContainerBrother = jQuery(this).parent().find('.description-container');
                descriptionContainerBrother.height(thisHeight);
            });
        }
    }
});

jQuery(document).ready(function($) {

    //disble click on megamenu column heading
    $('#main-menu > ul > li.multi-column > .sub-menu > li.column-heading > a').on('click', function (e) {
        e.preventDefault();
    });

    //header animations
    $('#main-header').headroom();

    $(window).load(se_move_toolbar);
    jQuery(window).resize(se_move_toolbar);

    $('#mobile-header').headroom();

    //lazy load
    $('.lazy').lazyload({
        effect: 'fadeIn',
        effectspeed: 400,
        skip_invisible: true
    });
    //main menu
//   $('#main-menu > ul > li.menu-item-has-children > a').on('click', function(e){
//        console.log('wtf');
//        e.preventDefault();
//        return false;
//    });

    //mobile menu
    var mobileHeader = $('#mobile-header'),
        mobileMenuToggle = mobileHeader.find('.mobile-menu-toggle'),
        mobileMenu = $('#mobile-menu');

    mobileMenuToggle.on('click', function () {
        mobileMenu.stop().slideToggle();
        $('body').toggleClass('no-scroll');
        mobileMenuToggle.find('.menu-icon').toggleClass('open');
    });

    $('#mobile-menu > ul > .menu-item-has-children').each(function () {
        var menuItem = $(this).find('> a');
        var subMenuArrow = $('<span class="sub-menu-trigger"><svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.1 20.4" overflow="scroll"><path fill="#F8F8F8" d="M33.1 3.9L29.2 0 16.6 12.7 3.9 0 0 3.9l16.6 16.5"/></svg></span>');

        $(this).append(subMenuArrow);

        subMenuArrow.on('click', function (e) {
            e.preventDefault();

            $(this).toggleClass('active');
            menuItem.toggleClass('active-sub-menu');
            menuItem.parent().find('.sub-menu').toggleClass('active');
        });
    })

    //equal height columns
    $('.section-equal-height-columns .column, .se-quote-wrapper .column, .se-quiz .column').matchHeight();
    $('.slideshow-university-logos').matchHeight();

    //gravity form select
    $('.gform_wrapper select').select2();
    jQuery(document).bind('gform_post_render', function () {
        $('.gform_wrapper select').select2();
        setTimeout(function () {
            $('#main-header').removeClass('headroom--pinned').addClass('headroom--unpinned')
        }, 100);
    });

    //featured posts slideshow
    $('.featured-posts .container').slick({
        dots: true,
        arrows: false,
        nav: false,
        fade: true,
        cssEase: 'linear',
        adaptiveHeight: true,
        accessibility: false,
    });

    //Image Slideshow
    $('.image-slideshow').slick({
        prevArrow: '<div class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 224.3 407.44"><defs><style>.cls-1{fill:#fff;}</style></defs><title>icon-arrow-left</title><g id="Layer_1" data-name="Layer 1"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="224.3 21.18 203.06 0 0 203.72 203.06 407.44 224.3 386.26 42.36 203.72 224.3 21.18"/></g></g></svg></div>',
        nextArrow: '<div class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 224.3 407.44"><defs><style>.cls-1{fill:#fff;}</style></defs><title>icon-arrow-right</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-3" data-name="Layer 2"><polygon class="cls-1" points="0 21.18 21.25 0 224.3 203.72 21.25 407.44 0 386.26 181.94 203.72 0 21.18"/></g></g></svg></div>',
        dots: true,
        customPaging: function (slider, index) {
            // this example would render "tabs" with titles
            return '<button class="tab"><div class="steps">' + $(slider.$slides[index]).find('.slider-page').text() + '</button>';
        },
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
        nav: true,
        fade: true,
        cssEase: 'linear',
        adaptiveHeight: true,
        accessibility: false,
    });


    //Image Slideshow on Mobile
    $('.image-slideshow-mobile').slick({
        prevArrow: '<div class="slick-prev-mobile"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 224.3 407.44"><defs><style>.cls-1{fill:#fff;}</style></defs><title>icon-arrow-left</title><g id="Layer_3" data-name="Layer 3"><g id="Layer_1-3" data-name="Layer 3"><polygon class="cls-1" points="224.3 21.18 203.06 0 0 203.72 203.06 407.44 224.3 386.26 42.36 203.72 224.3 21.18"/></g></g></svg></div>',
        nextArrow: '<div class="slick-next-mobile"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 224.3 407.44"><defs><style>.cls-1{fill:#fff;}</style></defs><title>icon-arrow-right</title><g id="Layer_4" data-name="Layer 4"><g id="Layer_1-4" data-name="Layer 4"><polygon class="cls-1" points="0 21.18 21.25 0 224.3 203.72 21.25 407.44 0 386.26 181.94 203.72 0 21.18"/></g></g></svg></div>',
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
        nav: true,
        fade: true,
        cssEase: 'linear',
        adaptiveHeight: true,
        accessibility: false,
    });

    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    }
                    ;
                });
            }
        }
    });

    videoPopupBox();

    se_icon_with_text();
    $(window).resize(se_icon_with_text);

    se_flip_card_size();
    $(window).resize(se_flip_card_size);

    se_responsive_data_tables();

    se_youtube_player();

    se_video_testimonials();

    se_team();

    eventsFilter();

    counselorFilter();

    se_advisors('');

    region_image();

    se_section_table();

    se_tour();

    se_contact_information();

    se_quiz();

//    se_button_smooth_scroll();

    se_button_menu();

    se_testimonial_slideshow();

    marketoThankYouMessage();

    stop_q2w3_fixed_widget_container();


    /*
    if ( typeof MktoForms2 !== 'undefined' )
    {
        MktoForms2.whenReady(function (form) {
            $('#mktoForms2BaseStyle, #mktoForms2ThemeStyle').remove();
            $(form.getFormElem()).find('select').select2({
                minimumResultsForSearch: -1
            });
        });
    }
    */
    if (typeof MktoForms2 !== 'undefined') {
        MktoForms2.whenReady(function (form) {
            $('#mktoForms2BaseStyle, #mktoForms2ThemeStyle').remove();
        });
    }

    if (typeof SVGInjector != 'undefined') {
        // inject svg into dom
        SVGInjector($('.inject-svg'));
    }


    $('.filter-select').select2();
    if (typeof MktoForms2 !== 'undefined') {
        MktoForms2.whenReady(function (form) {
            var formEl = form.getFormElem()[0];
            if (formEl == $('.mktoForm')[0]) {
                var questionLabel = $(formEl).find('label[for="question"]');
                var row = $(questionLabel).closest('.mktoFormRow');
                $(row).addClass('question-row');
                var allNextRows = $(row).nextAll('.mktoFormRow');
                $(allNextRows).each(function () {
                    var checkBox = $(this).find('input[type="checkbox"]');
                    if (checkBox.length) {
                        $(this).addClass('checkbox-row');
                    }
                });

            }
        });
    }
});

//Show/Hide Search Box
jQuery('.sb-icon-search').click(function() {

    if(jQuery('.sb-search-input').hasClass('closed')) {
        jQuery('.sb-search-input').removeClass('closed');
    } else {
        jQuery('.sb-search-input').addClass('closed');
    }


});

function se_move_toolbar() {
    var toolbar = jQuery('#ucfhb'),
        windowWidth = window.innerWidth;

    if (windowWidth <= 991) {
        toolbar.prependTo('#mobile-header');
    } else {
        toolbar.prependTo('#main-header');
    }
}

function se_button_menu()
{
    jQuery('.se-button-has-menu > a').on('click', function(e){
        e.preventDefault();
        jQuery(this).parent().toggleClass('active');
    })
}

function se_button_smooth_scroll()
{
    var scrollButtons = jQuery('.se-button[href*=#]:not(.no-scroll)');
    if ( scrollButtons.length )
    {
        scrollButtons.each(function(){
            var scrollButton = jQuery(this),
                scrollButtonHref = scrollButton.attr('href');

            scrollButton.on('click', function(e){
                e.preventDefault();

                jQuery('html, body').animate({
                    scrollTop: jQuery(scrollButtonHref).offset().top
                }, 300);

            });
        });
    }
}

function se_icon_with_text()
{
    var elements = jQuery('.se-icon-text');
    elements.each(function(){
        var element = jQuery(this),
            elementHeight = element.outerHeight(),
            heading = element.children().not('img'),
            headingHeight = heading.outerHeight();

        heading.removeAttr('style');

        if ( headingHeight < elementHeight )
        {
            var paddingValue = ( elementHeight - headingHeight ) / 2;
            heading.css('padding-top', paddingValue);
        }
    });
}

function se_flip_card_size()
{
    var flipCards = jQuery('.se-flip-card');

    flipCards.each(function(){
        var flipCard = jQuery(this),
            flipCardHeight = flipCard.outerWidth(),
            flipCardInner = flipCard.find('.se-flip-card-inner');

        flipCardInner.css('height', flipCardHeight);
    });
}

function se_responsive_data_tables()
{
    var responsiveTables = jQuery('.responsive-table');

    responsiveTables.each(function(){
        var responsiveTable = jQuery(this);

        if ( responsiveTable.hasClass('stack-columns') )
        {
            responsiveTable.stackcolumns();
            responsiveTable.find('tbody tr:nth-child(even)').addClass('alt');
        }
        if ( responsiveTable.hasClass('stack-table') )
        {
            responsiveTable.stacktable();
            responsiveTable.find('tbody tr:nth-child(even)').addClass('alt');
        }
        if ( responsiveTable.hasClass('stack-table-card') )
        {
            responsiveTable.cardtable();
            responsiveTable.find('tbody tr:nth-child(even)').addClass('alt');
        }
    });
}

function se_youtube_player()
{
    var players = jQuery('.youtube-player');

    players.each(function(){
        var player = jQuery(this),
            video_id = player.data('video-id');

        player.on('click', function(){
            var videoHTML = '<div class="embed-container"><iframe src="//www.youtube.com/embed/' + video_id + '?autoplay=1&cc_load_policy=1" frameborder="0" allowfullscreen></iframe></div>';
            player.html(videoHTML);
        });
    });
}

function se_video_testimonials()
{

    var video_testimonials = jQuery('.video-testimonials');
    video_testimonials.each(function(){
        var item = jQuery(this);
            filter = item.find('.filter select');

        var itemIsotope = item.find('.row');

        filter.select2({
            minimumResultsForSearch: -1
        });

        itemIsotope.imagesLoaded( function() {
            itemIsotope.isotope({
                layoutMode: 'fitRows'
            });

            filter.on('change', function (e) {
                var selectedValue = jQuery(this).val();
                itemIsotope.isotope({ filter: selectedValue });
            });
        });
    });

}

function se_team()
{
    var se_team = jQuery('.se-team');
    se_team.each(function(){
        var item = jQuery(this);
            filter = item.find('.filter select');
        var itemIsotope = item.find('.row');

        filter.select2({
            minimumResultsForSearch: -1
        });

        itemIsotope.imagesLoaded( function() {
            itemIsotope.isotope({
                layoutMode: 'fitRows'
            });

            filter.on('change', function (e) {
                var selectedValue = jQuery(this).val();
                itemIsotope.isotope({ filter: selectedValue });
            });
        });
    });

}

function se_advisors(filterValue)
{

    var se_advisors = jQuery('.se-advisors');
    se_advisors.each(function(){
        var item = jQuery(this);
            filter = item.find('.filter select');
        var itemIsotope = item.find('.row');
        filter.select2({
            minimumResultsForSearch: -1
        });

        itemIsotope.imagesLoaded( function() {
            itemIsotope.isotope({
                layoutMode: 'fitRows'
            });

            if( filterValue != '' ) {
                itemIsotope.isotope({ filter: '.' + filterValue });
            }

            filter.on('change', function (e) {
                var selectedValue = jQuery(this).val();

                itemIsotope.isotope({ filter: selectedValue });
            });
        });
    });
}


function region_image() {
    var region_image = jQuery('.region-filter');

    region_image.on('click', function(){
        var filterValue =  jQuery(this).data('filter');

        jQuery('.se-advisors').removeClass('hide');
        jQuery('.regions').addClass('hide');
        se_advisors(filterValue);
        jQuery("#select-region").val('.'+filterValue).trigger('change.select2');
    });
}

function se_section_table()
{
    var sectionTableDropdown = jQuery('#section-table-dropdown'),
        sectionTableItems = jQuery('.section-table');

    sectionTableItems.each(function(){
        var sectionTableItem = jQuery(this);
            sectionTableItemID = sectionTableItem.attr('id');
            sectionTableHeading = sectionTableItem.find('h3').text();

        sectionTableDropdown.append('<option value="#' + sectionTableItemID + '">' + sectionTableHeading + '</option>');
    });



    sectionTableDropdown.select2({
        minimumResultsForSearch: -1
    });

    sectionTableDropdown.on('change', function (e) {
        var selectedValue = jQuery(this).val();

        console.log(sectionTableItemID);

        jQuery(selectedValue).removeClass('hide');
        jQuery(sectionTableItemID).addClass('hide');

        jQuery('.section-table').hide();
        jQuery(selectedValue).show();
    });
}

function se_tour()
{
    var tourMenuItems = jQuery('.vc_tta-tabs .vc_tta-tab > a');

    tourMenuItems.each(function(){
        var tourMenuItem = jQuery(this);
        tourMenuItem.append('<span class="icon"><svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 20" overflow="scroll"><path fill="#222" d="M0 2.3L7.5 10 0 17.7 2.3 20 12 10 2.3 0 0 2.3z"/></svg></span>');
    });
}

function se_contact_information()
{
    var contactInformation = jQuery('.se-contact-information');

    contactInformation.each(function(){
        var element = jQuery(this),
            elementFilter = element.find('.filter select'),
            elementInfos = element.find('.info');

        elementFilter.select2({
            minimumResultsForSearch: -1
        });

        elementFilter.on('change', function (e) {
            var selectedValue = jQuery(this).val();

            elementInfos.addClass('info-hidden');
            element.find('.' + selectedValue).removeClass('info-hidden');
        });
    });
}

function se_quiz()
{
    var quizes = jQuery('.se-quiz');

    quizes.each(function(){
        var quiz = jQuery(this),
            quizButton = quiz.find('.se-button'),
            quizPopup = quiz.find('.se-quiz-popup');

        quizButton.on('click', function(e){
            e.preventDefault();

            jQuery.magnificPopup.open({
                closeMarkup: '<button title="%title%" type="button" class="mfp-close"><span></span></button>',
                items: {
                    src: quizPopup,
                    type: 'inline'
                }
            });
        });

    });
}

function redirect_language() {
    var selectVal = jQuery('#language').val();

    if(selectVal != 'default'){
        window.location.href = location.pathname + '?language=' + encodeURIComponent(selectVal);


    }

}

function videoPopupBox() {
    jQuery('.popup-video').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    jQuery('.popup-video').on('click', function() {
        var windowHeight = jQuery(window).height();
        var videoHeight = jQuery('.mfp-content').height();
        var videoOffset = jQuery('.mfp-content').offset().top;
        var offset;

        if (videoHeight < windowHeight) {
            offset = videoOffset - ((windowHeight / 2) - (videoHeight / 2));
        } else {
            offset = videoOffset;
        }

        jQuery("html, body").animate({ scrollTop: offset }, 'slow');
    });
}

function se_testimonial_slideshow() {
    jQuery('.testimonial-slider').slick({
        dots: true,
        arrows: false,
        nav: false,
        fade: true,
        cssEase: 'linear',
        adaptiveHeight: false,
        accessibility: false
    });
}

function setMarketoLeadData(response) {
    jQuery.each (response, function (key, value) {
        if(key != 'success') {
            Cookies.set('marketo-' + key, value, {expires: 1});
            jQuery('.marketo-'+ key).attr('data-marketo-' + key, value);
            jQuery('.marketo-'+ key).text(value);
        }
    });
}

function eventsFilter() {
    jQuery('.events-filter-button').on('click', function(){

        var params = jQuery('#events-filter').serialize();
        params += '&action=ajax_filter_events';
        params += '&security='+ajax_object.ajax_nonce;

        jQuery('.events-list .container').html('<div class="spinner"></div>').find('.spinner').addClass('show');

        jQuery.ajax({
            url : ajax_object.ajaxurl,
            type : 'get',
            data : params,
            success : function( response ) {
                jQuery('.events-list .container').css('opacity', 0).html(response).animate({'opacity' : 1}, 500);
            }
        });

    });
}

function counselorFilter() {

    jQuery('.counselor-country-filter-button').on('click', function() {


        toggleSpinner();
        counselorStep2();

        jQuery('.steps li a.step-1.checked').on('click', function() {
            if(jQuery(this).hasClass('checked')){
                jQuery('.steps li a').removeClass('active').removeClass('checked');
                jQuery(this).removeClass('checked').addClass('active');
                jQuery('.choose-country').removeClass('hide');
                jQuery('.agencies').addClass('hide');
                jQuery('.counselors').addClass('hide');
            }
        });

    });
}

function counselorStep2()
{
    jQuery('.steps li a.active').removeClass('active').addClass('checked');
    jQuery('.steps li a.step-2').addClass('active');
    jQuery('.choose-country').addClass('hide');


    var countrySelected = jQuery('#counselor-country :selected').text();
    jQuery( ".pencil.first-pencil .name" ).replaceWith('<div class="name">' + (countrySelected ? countrySelected : 'All') + "</div>");

    getCountryAgencies();
}

function counselorStep3(agency)
{
    jQuery('.agencies').addClass('hide');
    jQuery('.steps li a.active').removeClass('active').addClass('checked');
    jQuery('.steps li a.step-3').addClass('active');

    jQuery( ".pencil.second-pencil .name" ).replaceWith('<div class="name">' + agency.attr('data-agency-name') + "</div>");

    getAgencyCounselors(agency);
}

function getCountryAgencies()
{
    var params = jQuery('#counselor-filter').serialize();
        params += '&action=filter_counselor_country';
        params += '&security='+ajax_object.ajax_nonce_counselors;

    jQuery.ajax({
        url : ajax_object.ajaxurl,
        type : 'get',
        data : params,
        success : function( response ) {
            toggleSpinner();
            jQuery('.agencies').removeClass('hide').css('opacity', 0).html(response).animate({'opacity' : 1}, 500);

            jQuery('.button-agency-select').on('click', function() {

                toggleSpinner();
                counselorStep3(jQuery(this));

                jQuery('.steps li a.step-2.checked').on('click', function() {
                    if(jQuery(this).hasClass('checked')){
                        jQuery('.steps li a').removeClass('active');
                        jQuery(this).removeClass('checked').addClass('active');
                        jQuery('.choose-country').addClass('hide');
                        jQuery('.agencies').removeClass('hide');
                        jQuery('.counselors').addClass('hide');
                    }
                });
            });
        }
    });
}

function getAgencyCounselors(agency)
{
    var agencyName = agency.attr('data-agency-name');
    var params = 'id=' + agency.attr('data-agency-id');

    params += '&agencyName=' + agencyName;
    params += '&action=filter_counselor_agency';
    params += '&security='+ajax_object.ajax_nonce_counselors;

    jQuery.ajax({
        url : ajax_object.ajaxurl,
        type : 'get',
        data : params,
        success : function( response ) {
            toggleSpinner();
            jQuery('.counselors').removeClass('hide').css('opacity', 0).html(response).animate({'opacity' : 1}, 500);

            setTimeout(function(){
                jQuery('.counselor').matchHeight();
            }, 500);
        }
    });
}

function toggleSpinner()
{
    if(jQuery('.spinner').hasClass('hide')) {
        jQuery('.spinner').removeClass('hide').addClass('show');
    }
    else {
        jQuery('.spinner').addClass('hide').removeClass('show');
    }

}

function marketoThankYouMessage() {
    if(typeof MktoForms2 != "undefined"){
         MktoForms2.whenReady(function (form){
         //Add an onSuccess handler
          form.onSuccess(function(values, followUpUrl){
           //get the form's jQuery element and hide it
            var x = document.getElementsByClassName("marketo-form-container");
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
           document.getElementById('confirmform').style.visibility = 'visible';
           document.getElementById('confirmform').style.position = 'relative';

            jQuery('html, body').animate({
                scrollTop: jQuery("#confirmform").offset().top - 250
            }, 300);

           //return false to prevent the submission handler from taking the lead to the follow up url.
           return false;
         });

         });
    }
}

function stop_q2w3_fixed_widget_container() {
    fixedWidget = jQuery('#sidebar .callout-box');
    console.log(fixedWidget);
    jQuery(window).scroll(function() {
        if(jQuery(window).scrollTop() + jQuery(window).height() > (jQuery(document).height() - 180) ) {
            fixedWidget.css('bottom', '180px');
            fixedWidget.css('transition', 'bottom 0.2s');
        }
        else {
            fixedWidget.css('bottom', '20px');
            fixedWidget.css('transition', 'bottom 0.2s');
        }
    });
}
