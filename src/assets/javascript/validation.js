$(document).ready(function() {

    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '< Ant',
        nextText: 'Sig >',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['D','L','M','M','J','V','S'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);

    $( ".datepicker" ).datepicker({
        showOtherMonths: true,
        selectOtherMonths: true
    });


    var wrapper = $('<div/>').css({
        height: 0,
        width: 0,
        'overflow': 'hidden'
    });
    var fileInput = $('#fileinput').wrap(wrapper);
    var fileInput2 = $('#fileinput2').wrap(wrapper);
    var fileInput3 = $('#fileinput3').wrap(wrapper);
    var fileInput4 = $('#fileinput4').wrap(wrapper);
    var fileInput5 = $('#fileinput5').wrap(wrapper);
    var imgInput = $('#imginput').wrap(wrapper);

    fileInput.change(function() {
        $this = $(this);
        $('#file').text($(this).val());
        archivo = fileInput.val();
        extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase();
        if (extension != '.pdf') {
            $this.parent().prev().fadeIn();
        } else {
            $this.parent().prev().fadeOut();
        }
    });
    fileInput2.change(function() {
        $this = $(this);
        $('#file2').text($(this).val());
        $this.parent().prev().fadeIn();
    });
    fileInput3.change(function() {
        $this = $(this);
        $('#file3').text($(this).val());
        $this.parent().prev().fadeIn();
    });
    fileInput4.change(function() {
        $this = $(this);
        $('#file4').text($(this).val());
        $this.parent().prev().fadeIn();
    });
    fileInput5.change(function() {
        $this = $(this);
        $('#file5').text($(this).val());
        $this.parent().prev().fadeIn();
    });

    $('#file').click(function() {
        fileInput.click();
    }).show();

    if (fileInput.val() != '') {
        $('#file').text(fileInput.val());
    }
    $('#file2').click(function() {
        fileInput2.click();
    }).show();
    if (fileInput2.val() != '') {
        $('#file2').text(fileInput2.val());
    }
    $('#file3').click(function() {
        fileInput3.click();
    }).show();
    if (fileInput3.val() != '') {
        $('#file3').text(fileInput3.val());
    }
    $('#file4').click(function() {
        fileInput4.click();
    }).show();
    if (fileInput4.val() != '') {
        $('#file4').text(fileInput4.val());
    }
    $('#file5').click(function() {
        fileInput5.click();
    }).show();
    if (fileInput5.val() != '') {
        $('#file5').text(fileInput5.val());
    }

    $('.anadir_cv').click(function() {
        $(this).parent().next().fadeIn();
        $(this).parent().next().find('.tcn_boton_archivo').trigger('click');
        $(this).remove();
    });

    imgInput.change(function() {
        $this = $(this);
        $('#img-user').text($(this).val());
    })

    $('#img-user').click(function() {
        imgInput.click();
    }).show();
    if (imgInput.val() != '') {
        $('#img-user').text(imgInput.val());
    }

    $('body').on('click', '.tcn_cerrarOverlay', function() {
        $('#tcn_overlay').remove();
    })
    $('#tcn_cargos').val('');
    $('.tcn_sector').click(function() {

        $(this).parent().next().toggle();
    });
    $('#dni').click(function() {
        $('#inputnie').fadeOut(200, function() {
            $('#inputdni').fadeIn();
        });
    });
    $('#nie').click(function() {
        $('#inputdni').fadeOut(200, function() {
            $('#inputnie').fadeIn();
        });
    });
    $('#incorporacion3').click(function() {
        $('#inputdisp').fadeIn();
    });
    $('#disponibilidad3').click(function() {
        $('#inputdisp2').fadeIn();
    });

    $('.caja-radio').click(function() {
        $(this).prev().prop('checked', true);
        $(this).parents('.content-caja-check').find('.selec').removeClass('selec');
        $(this).addClass('selec');
    });
    $('.caja-check').click(function() {
        $(this).prev().trigger('click');
        $(this).toggleClass('selec');
    });

    $('.tcn_container').on('click', '.tcn_boton_enviar_formulario', function() {
        $(this).removeClass('tcn_boton_enviar_formulario').html('Enviando...');

        var x = 8;

        if (!$('.checksr').is(':checked')) {
            $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
            $('.caja-tratamiento').addClass('error');
            $('.obligatorios').css('display', 'block');
            x++;
        } else {
            x = x - 1;
            $('.caja-tratamiento').removeClass('error');
            $('.obligatorios').css('display', 'none');
        }

        if ($('.tcn_input_nombre').val().trim() == '') {
            $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
            $('.tcn_input_nombre').parent().addClass('error');
            $('.obligatorios').css('display', 'block');
            x++;
        } else {
            x = x - 1;
            $('.tcn_input_nombre').parent().removeClass('error');
            $('.obligatorios').css('display', 'none');
        }

        if ($('.tcn_input_apellidos').val().trim() == '') {
            $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
            $('.tcn_input_apellidos').parent().addClass('error');
            $('.obligatorios').css('display', 'block');
            x++;
        } else {
            x = x - 1;
            $('.tcn_input_apellidos').parent().removeClass('error');
            $('.obligatorios').css('display', 'none');
        }

        if ($('.tcn_input_correo').val().trim() == 'Correo electrónico' || $('.tcn_input_correo').val().trim() == '') {
            $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
            $('.tcn_input_correo').parent().addClass('error');
            $('.obligatorios').css('display', 'block');
            x++;
        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($('.tcn_input_correo').val().trim()))) {
            $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
            $('.tcn_input_correo').parent().addClass('error');
            $('.msgemail').css('display', 'block');
            x++;
        } else {
            x = x - 1;
            $('.tcn_input_correo').parent().removeClass('error');
            $('.obligatorios').css('display', 'none');
            $('.msgemail').css('display', 'none');
        }

        var telf = $('.tcn_input_telefono').val().replace(/\s/g, '');
        if ($('.tcn_input_telefono').val().trim() == '' || !telf.match(/^\d+$/)) {
            $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
            $('.tcn_input_telefono').parent().addClass('error');
            $('.obligatorios').css('display', 'block');
            x++;
        } else {
            x = x - 1;
            $('.tcn_input_telefono').parent().removeClass('error');
            $('.obligatorios').css('display', 'none');
        }

        if ($('.select-dia').val() == 0 || $('.select-mes').val() == 0 || $('.select-ano').val() == 0) {
            $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
            $('.content-select').parent().addClass('error');
            $('.obligatorios').css('display', 'block');
            x++;
        } else {
            x = x - 1;
            $('.content-select').parent().removeClass('error');
            $('.obligatorios').css('display', 'none');
        }

        if (!$('.checkdni').is(':checked')) {
            $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
            $('.caja-dni').addClass('error');
            $('.obligatorios').css('display', 'block');
            x++;
        } else {
            x = x - 1;
            $('.caja-dni').parent().removeClass('error');
            $('.obligatorios').css('display', 'none');
        }

        if ($('#dni').is(':checked')) {
            if ($('#inputdni').val().trim() == '') {
                $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
                $('.caja-dni').addClass('error');
                $('.msgdni').css('display', 'block');
                x++;
            } else {
                var expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
                var dni = $('#inputdni').val().trim();
                if (expresion_regular_dni.test(dni) == true) {
                    numero = dni.substr(0, dni.length - 1);
                    letr = dni.substr(dni.length - 1, 1);
                    numero = numero % 23;
                    letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
                    letra = letra.substring(numero, numero + 1);
                    if (letra != letr.toUpperCase()) {
                        $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
                        $('.caja-dni').addClass('error');
                        $('.letradni').css('display', 'block');
                        x++;
                    } else {
                        x = x - 1;
                        $('.caja-dni').removeClass('error');
                        $('.msgdni').css('display', 'none');
                        $('.letradni').css('display', 'none');
                        $('.msgnie').css('display', 'none');
                    }
                } else {
                    $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
                    $('.caja-dni').addClass('error');
                    $('.msgdni').css('display', 'block');
                    x++;
                }
            }
        }

        if ($('#nie').is(':checked')) {
            if ($('#inputnie').val().trim() == '') {
                $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
                $('.caja-dni').addClass('error');
                $('.msgnie').css('display', 'block');
                x++;
            } else {
                var expresion_regular_nie = /^[XYZ][0-9]{7}[A-Z]$/i;
                var nie = $('#inputnie').val().trim();
                if (expresion_regular_nie.test(nie) == false) {
                    $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
                    $('.caja-dni').addClass('error');
                    $('.msgnie').css('display', 'block');
                    x++;
                } else {
                    x = x - 1;
                    $('.caja-dni').removeClass('error');
                    $('.msgnie').css('display', 'none');
                    $('.msgdni').css('display', 'none');
                    $('.letradni').css('display', 'none');
                }
            }
        }

        if (!$('.checkprov').is(':checked')) {
            $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
            $('.caja-provincia').addClass('error');
            $('.obligatorios').css('display', 'block');
            x++;
        } else {
            x = x - 1;
            $('.caja-provincia').removeClass('error');
            $('.obligatorios').css('display', 'none');
        }

        var cargosSeleccionados = '';
        var numeroCargos = 0;
        var t = 0;
        var tmax = 0;
        $('.tcn_cargo_seleccionado').each(function() {
            cargosSeleccionados += $(this).html() + '; ';
            numeroCargos++;
        })
        if ($('.tcn_input_otros').val().trim() != '') {
            numeroCargos++;
        }

        if (numeroCargos > 3) {
            $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
            $('.tcn_sector_title').css('border-color', '#ff0000');
            $('.trabajos').css('display', 'block');
            t = 1;
        } else {
            t = 0;
            $('.trabajos').css('display', 'none');
        }
        if (cargosSeleccionados == '' && ($('.tcn_input_otros').val().trim() == '' || $('.tcn_input_otros').val().trim() == 'Escribe el cargo')) {
            $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
            $('.tcn_sector_title').css('border-color', '#ff0000');
            $('.trabajos').css('display', 'block');
            tmax = 1;
        } else {
            tmax = 0;
            $('.trabajos').css('display', 'none');
        }

        var y = 3;
        if (!$('.turnos').is(':checked')) {
            $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
            $('.caja-turnos').addClass('error');
            $('.obligatorios_2').css('display', 'block');
            y++;
        } else {
            y = y - 1;
            $('.caja-turnos').removeClass('error');
            $('.obligatorios_2').css('display', 'none');
        }

        if (!$('.incorporacion').is(':checked')) {
            $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
            $('.caja-incorporacion').addClass('error');
            $('.obligatorios_2').css('display', 'block');
            y++;
        } else if ($('.incorporacion:checked').val() == 'otra') {
            if ($('#inputdisp').val().trim() == '') {
                $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
                $('.caja-incorporacion').addClass('error');
                $('.obligatorios_2').css('display', 'block');
                y++;
            } else {
                y = y - 1;
                $('.caja-incorporacion').removeClass('error');
                $('.obligatorios_2').css('display', 'none');
            }
        } else {
            y = y - 1;
            $('.caja-incorporacion').removeClass('error');
            $('.obligatorios_2').css('display', 'none');
        }

        if (!$('.disponibilidad').is(':checked')) {
            $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
            $('.caja-disponibilidad').addClass('error');
            $('.obligatorios_2').css('display', 'block');
            y++;
        } else {
            y = y - 1;
            $('.caja-disponibilidad').removeClass('error');
            $('.obligatorios_2').css('display', 'none');
        }

        var z = 1;
        if (fileInput.val().trim() == '') {
            $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
            $('#file').parent().addClass('error');
            $('.msgcv').css('display', 'block');
            z++;
        } else {
            archivo = fileInput.val();
            extensiones_permitidas = new Array(".pdf", ".jpg", ".png", ".jpeg", ".gif");
            extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase();
            if (extensiones_permitidas.indexOf(extension) == -1) {
                $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
                $('#file').parent().addClass('error');
                $('.msgcv').css('display', 'block');
                z++;
            } else {
                z = z - 1;
                $('#file').parent().removeClass('error');
                $('.msgcv').css('display', 'none');
            }
        }

        var z2 = 0;
        if (fileInput2.val().trim() != '') {
            archivo = fileInput2.val();
            extensiones_permitidas = new Array(".jpg", ".png", ".jpeg", ".gif");
            extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase();
            if (extensiones_permitidas.indexOf(extension) == -1) {
                $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
                $('#file2').parent().addClass('error');
                $('.msgcv2').css('display', 'block');
                z2 = 1;
            } else {
                z2 = 0;
                $('#file2').parent().removeClass('error');
                $('.msgcv2').css('display', 'none');
            }
        }
        if (fileInput3.val().trim() != '') {
            archivo = fileInput3.val();
            extensiones_permitidas = new Array(".jpg", ".png", ".jpeg", ".gif");
            extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase();
            if (extensiones_permitidas.indexOf(extension) == -1) {
                $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
                $('#file3').parent().addClass('error');
                $('.msgcv2').css('display', 'block');
                z2 = 1;
            } else {
                z2 = 0;
                $('#file3').parent().removeClass('error');
                $('.msgcv2').css('display', 'none');
            }
        }
        if (fileInput4.val().trim() != '') {
            archivo = fileInput4.val();
            extensiones_permitidas = new Array(".jpg", ".png", ".jpeg", ".gif");
            extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase();
            if (extensiones_permitidas.indexOf(extension) == -1) {
                $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
                $('#file4').parent().addClass('error');
                $('.msgcv2').css('display', 'block');
                z2 = 1;
            } else {
                z2 = 0;
                $('#file4').parent().removeClass('error');
                $('.msgcv2').css('display', 'none');
            }
        }
        if (fileInput5.val().trim() != '') {
            archivo = fileInput5.val();
            extensiones_permitidas = new Array(".jpg", ".png", ".jpeg", ".gif");
            extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase();
            if (extensiones_permitidas.indexOf(extension) == -1) {
                $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
                $('#file5').parent().addClass('error');
                $('.msgcv2').css('display', 'block');
                z2 = 1;
            } else {
                z2 = 0;
                $('#file5').parent().removeClass('error');
                $('.msgcv2').css('display', 'none');
            }
        }

        var f = 0;
        if (imgInput.val().trim() != '') {
            archivo = imgInput.val();
            extensiones_permitidas = new Array(".jpg", ".png", ".jpeg", ".gif");
            extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase();
            if (extensiones_permitidas.indexOf(extension) == -1) {
                $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
                $('#img-user').addClass('error');
                $('.msgfoto').css('display', 'block');
                f = 1;
            } else {
                f = 0;
                $('#img-user').removeClass('error');
                $('.msgfoto').css('display', 'none');
            }
        }

        var p = 0;
        if ($('#checkbox').is(':checked')) {
            p = 0;
            $('.msgpolitica').css('display', 'none');
        } else {
            $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
            $('.msgpolitica').css('display', 'block');
            p = 1;
        }

        var captchaResult = $('.resultado').val().trim();
        var firstNumber = $('.firstNumber').val();
        var secondNumber = $('.secondNumber').val();

        var checkTotal = parseInt(firstNumber) + parseInt(secondNumber);

        if (captchaResult == checkTotal) {
            c = 0;
            $('.msgcaptcha').css('display', 'none');
            $('.operacion').removeClass('error');
        } else {
            $(this).addClass('tcn_boton_enviar_formulario').html('Enviar solicitud');
            $('.operacion').addClass('error');
            $('.msgcaptcha').css('display', 'block');
            c = 1;
        }

        if (x > 0) {
            var $i = 0;
            $('.obligatorios').css('display', 'block');
            $('html, body').stop().animate({
                scrollTop: $('#tcn_formulario').offset().top
            }, 800, function() {
                $(".obligatorio").each(function(index) {
                    if ($(this).attr('type') == 'text') {
                        if ($(this).val().trim() == '') {
                            if ($i == 0) {
                                $(this).focus();
                            }
                            $i++;
                        }
                    }
                });
            });
            return false;
        } else if (t != 0) {
            var $i = 0;
            $('.trabajos').css('display', 'block');
            $('html, body').stop().animate({
                scrollTop: $('.ancla_work').offset().top - 125
            }, 800);
            return false;
        } else if (tmax != 0) {
            var $i = 0;
            $('.trabajos').css('display', 'block');
            $('html, body').stop().animate({
                scrollTop: $('.ancla_work').offset().top - 125
            }, 800);
            return false;
        } else if (y != 0) {
            $('html, body').stop().animate({
                scrollTop: $('.ancla_trabajo').offset().top - 125
            }, 800);
            return false;
        } else if (z != 0) {
            var $i = 0;
            $('html, body').stop().animate({
                scrollTop: $('.ancla_comentarios').offset().top - 125
            }, 800, function() {
                $(".obligatorio").each(function(index) {
                    if ($(this).attr('type') == 'text') {
                        if ($(this).val().trim() == '') {
                            if ($i == 0) {
                                $(this).focus();
                            }
                            $i++;
                        }
                    }
                });
            });
            return false;
        } else if (z2 == 1) {
            var $i = 0;
            $('html, body').stop().animate({
                scrollTop: $('.ancla_comentarios').offset().top - 125
            }, 800, function() {
                $(".obligatorio").each(function(index) {
                    if ($(this).attr('type') == 'text') {
                        if ($(this).val().trim() == '') {
                            if ($i == 0) {
                                $(this).focus();
                            }
                            $i++;
                        }
                    }
                });
            });
            return false;
        } else if (p == 1) {
            return false;
        } else if (c == 1) {
            return false;
        } else if (f == 1) {
            $('html, body').stop().animate({
                scrollTop: $('#tcn_formulario').offset().top
            }, 800);
        } else {
            $('.tcn_boton_enviar').html('Enviando...');
            $('.form_alert').remove();
            $('#tcn_cargos').val(cargosSeleccionados);
            $('.msgerror').css('display', 'none');
            $('#tcn_formulario').submit();
        }
    });

    $('.tcn_cargo').click(function() {
        if ($(this).hasClass('tcn_cargo_seleccionado')) {
            $(this).removeClass('tcn_cargo_seleccionado');
        } else {
            $(this).addClass('tcn_cargo_seleccionado');
        }
    });

    $('.tcn_input_otros').click(function() {
        if ($(this).val() == 'Escribe el cargo') {
            $(this).val('');
        }
    });
    $('.tcn_input_correo').click(function() {
        if ($(this).val() == 'Correo electrónico') {
            $(this).val('');
        }
    });






});