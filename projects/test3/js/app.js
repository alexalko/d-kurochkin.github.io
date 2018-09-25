document.addEventListener('DOMContentLoaded', function () {



    $('#wrapper a:not(#show-reg)').click(function(e) {

        e.preventDefault();

        $('#show-reg').trigger('click');

    });

    $('.btn.reg').click(function () {

        if (!settings.validate($(this).parent())) {
            return false;
        }

        var data = {};

        $('.drop-registartion input').each(function () {
            data[$(this).attr('name')] = $(this).val();
        });

        if (data['User[password]'] != data['User[repeat]']) {

            settings.response_handler(false, 1, 'Пароли не совпадают!');
            return false;
        }

        $.ajax({
            type: 'post',
            url: 'https://super-drop.ru/registration',
            data: data,
            success: function(result) {

                var result = JSON.parse(result);

                if (result.success) {

                    settings.response_handler(true, 1, 'Регистрация прошла успешно');
                }
                else {
                    if (result.errors && !$.isEmptyObject(result.errors)) {

                        for (var i in result.errors) {
                            settings.response_handler(false, 1, result.errors[i][0]);
                            break;
                        }

                    }

                }

            }
        });



    });

    $('body').on('click', '.show-text-drop', function () {

        var _this = $(this);

        if (_this.text() == '+ Подробнее') {

            $('.seo-text').animate({
                height: 819
            }, 500, function() {
                _this.text('- Свернуть');
            });

        }
        else {

            $('.seo-text').animate({
                height: 172
            }, 500, function() {
                _this.text('+ Подробнее');
            });

        }

    });
}, false);


