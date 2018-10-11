$(document).ready(function () {

    function getUserAgent (){
        var ua = navigator.userAgent;
        return {
            ua: ua,
            browser: /Edge\/\d+/.test(ua) ? "ed" : /MSIE 9/.test(ua) ? "ie9" : /MSIE 10/.test(ua) ? "ie10" : /MSIE 11/.test(ua) ? "ie11" : /MSIE\s\d/.test(ua) ? "ie?" : /rv\:11/.test(ua) ? "ie11" : /Firefox\W\d/.test(ua) ? "ff" : /Chrome\W\d/.test(ua) ? "gc" : /Chromium\W\d/.test(ua) ? "oc" : /\bSafari\W\d/.test(ua) ? "sa" : /\bOpera\W\d/.test(ua) ? "op" : /\bOPR\W\d/i.test(ua) ? "op" : typeof MSPointerEvent !== "undefined" ? "ie?" : "",
            os: /Windows NT 10/.test(ua) ? "win10" : /Windows NT 6\.0/.test(ua) ? "winvista" : /Windows NT 6\.1/.test(ua) ? "win7" : /Windows NT 6\.\d/.test(ua) ? "win8" : /Windows NT 5\.1/.test(ua) ? "winxp" : /Windows NT [1-5]\./.test(ua) ? "winnt" : /Mac/.test(ua) ? "mac" : /Linux/.test(ua) ? "linux" : /X11/.test(ua) ? "nix" : "",
            mobile: /IEMobile|Windows Phone|Lumia/i.test(ua) ? "w" : /iPhone|iP[oa]d/.test(ua) ? "i" : /Android/.test(ua) ? "a" : /BlackBerry|PlayBook|BB10/.test(ua) ? "b" : /Mobile Safari/.test(ua) ? "s" : /webOS|Mobile|Tablet|Opera Mini|\bCrMo\/|Opera Mobi/i.test(ua) ? 1 : 0,
            tablet: /Tablet|iPad/i.test(ua),
            touch: "ontouchstart" in document.documentElement
        }
    }

   function checkIfIsDevice(){
       var isDecive = false;
       var userAgent = getUserAgent();
       if (userAgent.mobile !== 0 || userAgent.tablet !== false) {
           isDecive = true;
           $("html").addClass("is-device");
       }
       return isDecive;
   }

   checkIfIsDevice();

    function maxHeightHeroMobileHack(){
        var $hero = $('.m-hero');

        $hero.each(function () {
            $(this).css({
                "min-height" : window.innerHeight - $('.o-header').innerHeight()
            });
        })


    }



    /*
    if(checkIfIsDevice() && $('.m-hero').length > 0){

        maxHeightHeroMobileHack();

        window.addEventListener('resize', function () {
            maxHeightHeroMobileHack();
        });

    }
    */


    /*Utils*/
    function isScrollBiggerThanViewPort() {
        return $(window).scrollTop() > $(window).height();
    }

    function smoothScroll (){
        $('html,body').animate(
            {
                scrollTop: 0
            }, 500
        );
        return false;
    }

    function createCookie (name, value, days){
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name){
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function checkForCookie(x){
        if (!x) {
            $('body').addClass('show-cookies');
        }
    }

    var x = readCookie('conditions');
    checkForCookie(x);


    $('.m-cookies__btn').on('click',function (e) {
        e.stopImmediatePropagation();
        if (!x) {
            createCookie('conditions', '1', 365);
            $('body').removeClass('show-cookies');
        }
    });

    /*Init slider*/
    $('.js-slick').slick();

    /*Scroll Top*/

    function toggleScrollTop(){
        isScrollBiggerThanViewPort() ? $('.a-scroll-top').addClass('is-active') : $('.a-scroll-top').removeClass('is-active');
    }


    $('.js-scroll-top').on('click', function (e) {
        e.preventDefault();
        smoothScroll();
    });

    window.addEventListener('scroll', function () {
        toggleScrollTop();
    });

    function toggle($el){
        var target = $el.data('toggle'),
            classToChange = $el.data('toggle-class');
        $el.toggleClass('is-active');
        $(target).toggleClass(classToChange);
    }


    $('.js-toggle').on('click',function (e) {
        e.preventDefault();
        toggle($(this));
    });



    function toggleFormInDevices() {

        $(".m-form-work__row--2 .desplega").each(function () {
            $(this).toggleClass('is-active');
            $(this).next('.desplegar').toggle();
        })
    }

    if(checkIfIsDevice() && $('#tcn_formulario').length > 0){
        toggleFormInDevices();
    }

    /*Toggle de los elementos*/
    $('.desplega').on('click',function () {
        console.log('click')
        $(this).toggleClass('is-active');
        $(this).next('.desplegar').toggle();
    });

    function autosize(textarea){
        var el = textarea;
        setTimeout(function(){
            el.style.cssText = 'height:auto; padding:0';
            // for box-sizing other than "content-box" use:
            el.style.cssText = '-moz-box-sizing:content-box';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
    }

    $('#tcn_input_otros').on('keydown keyup keypress',function () {
        autosize(this);
    });





    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        var re = /^[\+?|\(]{0,2}[\d\s\-\(\))]{3,}$/;
        var minLenght = 9;
        var MaxLenght = 15;
        var phoneVal = phone.replace(/ /g, '');

        return !!(re.exec(phoneVal) && phoneVal.length >= minLenght && phoneVal.length <= MaxLenght);
    };


    function removeAllErrors() {
        $('.m-contact-form__error', '#contactForm').remove();
    }

    function validateForm(){
        var valid = true,
            that = this;

        $('.is-required', '#contactForm').each(function () {

            var $this = $(this);
            $this.removeClass('error');
            var inputName = $this.attr("name");
            var inputErrorMsg = $this.data('error');

            if($this.val() === "" ){
                valid = false;
                $this.addClass('error');
                $this.removeClass('is-valid');
                $this.parents('.m-contact-form__field').append('<span class="m-contact-form__error">'+inputErrorMsg+'</span>');
            }

            if (inputName === "contactConditions" && $this.prop("checked") == false) {
                valid = false;
                $this.addClass('error');
                $this.removeClass('is-valid');
                $this.parents('.m-contact-form__field').append('<span class="m-contact-form__error">'+inputErrorMsg+'</span>');
            }

            if (inputName === "email" && $this.val() !== '') {
                if (!validateEmail($this.val())) {
                    valid = false;
                    $this.addClass('error');
                    $this.removeClass('is-valid');
                    $this.parents('.m-contact-form__field').append('<span class="m-contact-form__error">Introduce un email válido</span>');
                }
            }
            if (inputName === "phone" && $this.val() !== '') {
                console.log('entra')
                if (!validatePhone($this.val())) {
                    valid = false;
                    $this.addClass('error');
                    $this.removeClass('is-valid');
                    $this.parents('.m-contact-form__field').append('<span class="m-contact-form__error">Introduce un teléfono válido</span>');

                }
            }

        });

        return valid;

    };


    $('#submitContact').on('click',function (e) {
        e.preventDefault();
        removeAllErrors()
        if(validateForm()){
            $('#contactForm').submit();
        }
    });





    /*Formulario validacion*/





});