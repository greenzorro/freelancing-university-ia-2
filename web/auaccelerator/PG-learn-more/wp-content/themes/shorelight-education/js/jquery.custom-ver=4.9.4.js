jQuery(window).load(function() {
    jQuery('.video-testimonial.with-border').matchHeight();
});

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

jQuery(document).ready(function($){

    //disble click on megamenu column heading
    $('#main-menu > ul > li.multi-column > .sub-menu > li.column-heading > a').on('click', function(e){
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
   $('#main-menu > ul > li.menu-item-has-children > a').on('click', function(e){
        console.log('wtf');
        e.preventDefault();
        return false;
    });

    //mobile menu
    var mobileHeader = $('#mobile-header'),
        mobileMenuToggle = mobileHeader.find('.mobile-menu-toggle'),
        mobileMenu = $('#mobile-menu');

    mobileMenuToggle.on('click', function(){
        mobileMenu.stop().slideToggle();
        $('body').toggleClass('no-scroll');
        mobileMenuToggle.find('.menu-icon').toggleClass('open');
    });

    $('#mobile-menu > ul > .menu-item-has-children').each(function(){
        var menuItem = $(this).find('> a'),
            subMenuArrow = $('<span class="sub-menu-trigger"><svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.1 20.4" overflow="scroll"><path fill="#F8F8F8" d="M33.1 3.9L29.2 0 16.6 12.7 3.9 0 0 3.9l16.6 16.5"/></svg></span>');

        $(this).append(subMenuArrow);

        menuItem.on('click', function(e){
            e.preventDefault();

            $(this).toggleClass('active');
            menuItem.toggleClass('active-sub-menu');
            menuItem.parent().find('.sub-menu').toggleClass('active');
        });
    })

    //equal height columns
    $('.section-equal-height-columns .column, .se-quote-wrapper .column, .se-quiz .column').matchHeight();

    //gravity form select
    $('.gform_wrapper select').select2();
    jQuery(document).bind('gform_post_render', function(){
        $('.gform_wrapper select').select2();
        setTimeout(function(){
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
        accessibility: false
    });

    //Image Slideshow
    $('.image-slideshow').slick({
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        nav: false,
        fade: true,
        cssEase: 'linear',
        adaptiveHeight: true,
        accessibility: false
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

    se_advisors('');

    region_image();

    se_section_nav();

    se_tour();

    se_contact_information();

    se_quiz();

    se_button_smooth_scroll();

    se_button_menu();

    se_testimonial_slideshow();

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
    if ( typeof MktoForms2 !== 'undefined' )
    {
        MktoForms2.whenReady(function (form) {
            $('#mktoForms2BaseStyle, #mktoForms2ThemeStyle').remove();
        });
    }

    if(typeof SVGInjector != 'undefined'){
        // inject svg into dom
        SVGInjector($('.inject-svg'));
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
            var videoHTML = '<div class="embed-container"><iframe src="http://www.youtube.com/embed/' + video_id + '?autoplay=1&cc_load_policy=1" frameborder="0" allowfullscreen></iframe></div>';
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

function se_section_nav()
{
    var sectionNavDropdown = jQuery('#section-nav-dropdown'),
        sectionNavItems = jQuery('.section-nav');

    sectionNavItems.each(function(){
        var sectionNavItem = jQuery(this);
            sectionNavItemID = sectionNavItem.attr('id');
            sectionNavHeading = sectionNavItem.find('h3').text();

        sectionNavDropdown.append('<option value="#' + sectionNavItemID + '">' + sectionNavHeading + '</option>');
    });

    sectionNavDropdown.select2({
        minimumResultsForSearch: -1
    });

    sectionNavDropdown.on('change', function (e) {
        var selectedValue = jQuery(this).val();

        jQuery('html, body').animate({
            scrollTop: jQuery(selectedValue).offset().top
        }, jQuery(selectedValue).offset().top / 10);
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


function twobox_redirect_language(el) {
    var thisBox = el.parents('.se-terms-and-conditions-box');
    if (thisBox.length) {
        var selectBoxTypeVal = thisBox.attr('id').slice(0, -4);
        var selectLanguageVal = thisBox.find('.language').val();
    } else {
        var selectBoxTypeVal = jQuery('#hidden-type').val();
        var selectLanguageVal = jQuery('#language').val();
    }

    if(selectLanguageVal != 'default'){
        window.location.href = location.pathname + '?language=' + encodeURIComponent(selectLanguageVal) + '&type=' + encodeURIComponent(selectBoxTypeVal);
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