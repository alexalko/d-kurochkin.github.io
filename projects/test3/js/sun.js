//(function(e){e.fn.supremate=function(t,n,r,i){var s=e(this);var o=e.fn.supremate._duration(s,t,n);s.animate(t,o,r,i);return this};e.fn.supremate._duration=function(t,n,r){var i=this._position(t);var s=t.clone().insertBefore(t);t.hide();s.animate(n,0);var o=this._position(s);s.remove();t.show();var u=this._distance(i,o);return u/(r/1e3)};e.fn.supremate._distance=function(n,r){var i=distance=0;e.each(n,function(e,t){distance=Math.abs(n[e]-r[e]);i=distance>i?distance:i});return i};e.fn.supremate._position=function(t){var n=t.offset();return{top:n.top,left:n.left,width:t.width(),height:t.height()}}})(jQuery);

$('a').each(function () {

    var href = $(this).attr('href');

    if (href && ~href.indexOf('http') && !~href.indexOf('super-opt')) {
        $(this).attr('target', '_blank');
    }

});



(function () {

    if (!$('#ditto_pages:not(.main-page-pagination)').length || $('.myrev-page').length) return false;

    var pagination = $('#ditto_pages');

    if ($('.ditto_page', pagination).length > 6) {

        var currentPage = parseInt($('.ditto_currentpage', pagination).text()),
            totalPages = $('.ditto_page', pagination).length + 1,
            href = !~$('.ditto_page', pagination).eq(0).attr('href').indexOf('search') ?
                $('.ditto_page', pagination).eq(0).attr('href').split('=')[0] :
                $('.ditto_page', pagination).eq(0).attr('href').split('aso=')[0]
            ;

        pagination.empty();

        pagination.pagination({
            items: totalPages,
            itemOnPage: 7,
            currentPage: currentPage,
            cssStyle: '',
            prevText: '<i class="fa fa-chevron-left"></i>',
            nextText: '<i class="fa fa-chevron-right"></i>',
            onInit: function () {
                // fire first page loading
            },
            onPageClick: function (page, evt) {
                evt.preventDefault();


                !~href.indexOf('search') ? location.replace(href + '=' + (page-1)*18) : location.replace(href + 'aso=0,' + (page-1)*24);
            }
        });
        
    }


}());

window.changeKatalogHeight = 1;

var startCuponCounter = function () {

    if (localStorage.kupon) {

        $('.kupon').removeClass('ajax-fancy');

        var setKupon = function () {
            $('.kupon>div').html('Заберите свой купон!');

            $('.kupon').click(function (e) {
                e.preventDefault();

                if (!localStorage.kupon) {
                    $('#get-cupon-href').trigger('click');
                    return false;
                }

                if ($('.double-counter').length) {
                    $('.double-counter').remove();
                }
                $('#get-cupon strong').remove();

                $.ajax({
                    type: 'get',
                    url: $(this).attr('href'),
                    data: {
                        '_csrf-frontend': $('meta[name="csrf-token"]').attr('content')
                    },
                    async: false,
                    success: function(data) {

                        metrika.reachGoal('COUPON');

                        $('#modal').html(data);

                        $.fancybox.open('#modal');

                    },
                    error: function() {

                    }
                });

                var ar = ['As','Ds','Ls','fD','Mn','Lu','iD','Yh','Kd','Iy','Jy','kJ','nF','Je','Ec','Md','Al','Lk','Df','Gr'],
                    random = function () {
                        return Math.floor(Math.random()*100) + ar[Math.floor(Math.random()*19)];
                    },
                    generatedKupon = random()+'-'+random()+'-'+random();

                $('#get-cupon>p').text('Вы получили сертификат 1000 рублей. Теперь вы можете оплатить часть покупки сертификатом. Необходимо указать код купона при заказе.');
                $('#get-cupon').append('<strong style="margin: 12px 0 -68px;">Ваш купон:</strong>');
                $('#get-cupon').append('<span style="font-size: 50px;">'+generatedKupon+'<span>');
                $('#get-cupon>div').empty();

                var data = JSON.parse(localStorage.kupon);

                data.coupon = generatedKupon;

                $.ajax({
                    type: 'post',
                    url: '/form/coupon',
                    data: data,
                    success: function(result){

                        $(".kupon-page").html($(result).find(".kupon-page").html());

                        $('#kupon-yes').css('display','block');

                        localStorage.clear();
                    }
                });

                localStorage.clear();
            });
        }

        if (JSON.parse(localStorage.kupon).complite < 1000) {

            function declOfNum(number, titles, id) {
                var number = parseInt(number),
                    cases = [2, 0, 1, 1, 1, 2];
                if (!id) return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
                $('#' + id).text(titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ]);
            }

            $('.kupon>div').html('Вы накопили <span><span>...</span><div id="kupon-animation"></div></span> <i>рублей</i>');


            var countSum = parseInt(JSON.parse(localStorage.kupon).complite),
                kuponI = $('.kupon i'),
                kuponSpan = $('.kupon>div>span>span'),
                popupSpan = $('#get-cupon>span');


            $('#kupon-animation').show();

            var interval = setInterval(function () {

                if (countSum < 1000) {

                    countSum++;

                    var kupon = JSON.parse(localStorage.kupon);

                    kupon.complite = countSum;

                    localStorage.setItem('kupon', JSON.stringify(kupon));

                    kuponSpan.text(countSum);
                    kuponI.text(declOfNum(countSum, ['рубль', 'рубля', 'рублей']));

                    if (popupSpan.length) {
                        popupSpan.html(countSum + '<i>'+declOfNum(countSum, ['рубль', 'рубля', 'рублей'])+'<i>');
                    }

                }
                else {

                    setKupon();

                    clearInterval(interval);
                }

            }, 1200);



            $('.kupon').click(function (e) {
                e.preventDefault();
            });
        }
        else {

            setKupon();
        }

    }

}

startCuponCounter();

(function () {

    //produc-counter

    var calculePrice = function () {

        var container = $('#price-block'),
            count = parseInt($('#count').val()),
            label = $('.sale'),
            price = 0,
            percent = 0;

        if (!count) {

            $('#count').val(1);
            count = 1;
        }

        if (typeof prices !== 'undefined' && container.length) {

            for (var i in prices.count) {

                if (count <= prices.count[i]) {

                    break;
                }

                price = prices.current[i];

                percent = !$.isEmptyObject(prices.old) && prices.old[i] ? 100 - Math.round((price / prices.old[i]) * 100) : 0;
            }
        }

        var text = ' \
            ' + price + ' \
            <span>руб.</span> \
            ' + (percent ? ' <span style="color: #b31b4a;">–</span><i style="color: #b31b4a;font-style: normal;font-size: 27px;">' + percent + '</i><span style="color: #b31b4a;">%</span>' : '') + ' \
        ';

        if (price) {

            container.html(text);
        }

        if (label.length && percent) {

            label.html('Акция&nbsp;&nbsp;-' + percent + '%');
        }
    }


    $('#count').focusout(function () {

        calculePrice();
    });

    $('body').on('click', '.count-plus', function () {
        $('input', $(this).parent()).val(parseInt($('input', $(this).parent()).val()) + 1);
        $('input', $(this).parent()).trigger('change');

        calculePrice();
    });

    $('body').on('click', '.count-minus', function () {

        if (parseInt($('input', $(this).parent()).attr('min')) <= (parseInt($('input', $(this).parent()).val()) - 1)) {
            $('input', $(this).parent()).val(parseInt($('input', $(this).parent()).val()) - 1);
            $('input', $(this).parent()).trigger('change');
        }

        calculePrice();
    });

    //viewed products

    var rProduct = $('#product-id'),
        setViewCookie = function (name, data) {


            var curDate = new Date;
            curDate.setDate(curDate.getDate() + 300);

            document.cookie = name + '=' + data +'; path=/; domain=.super-opt.ru; expires='+curDate.toUTCString() + ';';

        };

    if (rProduct.length) {
        console.log('isset');
        if (~document.cookie.indexOf('reViewed')) {
            var reViewedArray = document.cookie.split('reViewed=')[1].split(';')[0].split(','),
                exist = 0;

            for (var i in reViewedArray) {
                if (reViewedArray[i] == rProduct.text()) {
                    exist = 1;
                    break;
                }
            }

            if (!exist) {
                reViewedArray.push(rProduct.text());

                $('#reviewed-count').text(reViewedArray.length);

                setViewCookie('reViewed', reViewedArray.join(','));
            }

        }
        else {
            setViewCookie('reViewed', rProduct.text());
        }

    }

    $(document).on('click', '.like', function () {

        metrika.reachGoal('like');

        if (!~document.cookie.indexOf('liked')) {
            setViewCookie('liked', '');
        }

        var likedArray = document.cookie.split('liked=')[1].split(';')[0].split(',');

        for (var i in likedArray) {
            if (!likedArray[i]) likedArray.splice(i, 1);
        }

        if ($(this).hasClass('active')) {

            $(this).removeClass('active');

            likedArray.splice($.inArray($(this).attr('data-product-id'), likedArray), 1);

            setViewCookie('liked', likedArray.join(','));

        }
        else {

            $(this).addClass('active');

            if (~document.cookie.indexOf('liked')) {

                likedArray.push($(this).attr('data-product-id'));

                setViewCookie('liked', likedArray.join(','));

            }
            else {
                setViewCookie('liked', $(this).attr('data-product-id'));
            }

        }

        setCountUserProducts();

        $('#like-count').text(likedArray.length);

        $('.bottom-panel-likes').addClass('active');

        setTimeout(function () {
            $('.bottom-panel-likes').removeClass('active');
        },1000);

    });

    // setLiks

    var setLikes = function () {
        var likes = $('.like');

        if (likes.length && ~document.cookie.indexOf('liked')) {

            var likedArray = document.cookie.split('liked=')[1].split(';')[0].split(',');

            likes.each(function () {

                for (var i in likedArray) {
                    if ($(this).attr('data-product-id') == likedArray[i]) {

                        $(this).addClass('active');

                        break;
                    }
                }

            });

        }
    }

    setLikes();

    //bottom panel
    $('#mini-basket-count').text($('#cart-q').text());
    $('#mini-basket-sum').text($('#cart-summ').text());

    var setCountUserProducts = function () {

        var totalCount = 0;

        if (~document.cookie.indexOf('liked')) {

            var likes = document.cookie.split('liked=')[1].split(';')[0].split(','),
                count = 0;

            for (var i in likes) {
                if (likes[i]) {
                    count++;
                }
            }

            totalCount += count;

            $('#like-count').text(count);
        }

        if (~document.cookie.indexOf('reViewed')) {

            var view = document.cookie.split('reViewed=')[1].split(';')[0].split(','),
                count = 0;

            for (var i in view) {
                if (view[i]) {
                    count++;
                }
            }

            totalCount += count;

            $('#reviewed-count').text(count);
        }


        if ((!totalCount && !parseInt($('#mini-basket-count').text()))) {
            $('.bottom-panel').hide();
        }
        else {
            //$('.bottom-panel').show();
        }

    }

    setCountUserProducts();

    $('.bottom-panel-likes').click(function () {
        if (parseInt($('#like-count', $(this)).text())) {
            location.replace('/izbrannoe');
            getProducts(document.cookie.split('liked=')[1].split(';')[0].split(','), 'liked');
        }
    });

    $('.bottom-panel-reviewed').click(function () {

        if (parseInt($('#reviewed-count', $(this)).text())) {
            location.replace('/prosmotrennye');
            getProducts(document.cookie.split('reViewed=')[1].split(';')[0].split(','), 'reViewed');
        }
    });

    $('.bottom-panel-basket').click(function () {
        location.replace('/korzina');
    });

    //get products

    var getProducts = function (ids, type) {
        $.ajax({
            url: '/izbrannoe',
            method: 'post',
            data: {
                products: ids,
                '_csrf-frontend': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (data) {

                $('#likedProducts .products').html(data);

                $('#likedProducts .like').each(function () {

                    if (type == 'reViewed') {

                        $(this).after('<i class="remove-reviewed fa fa-trash-o"><i>');
                        $(this).addClass('like-left');

                        var els = $(this).parent().find('.hit-wrapper>div');

                        if (els.length>1) {
                            $(this).parent().find('.hit-wrapper>div').eq(1).remove();
                        }

                        if ($(this).parent().find('.hit-wrapper>div').length>1) {
                            $(this).parent().find('.hit-wrapper>div').eq(1).remove();
                        }
                    }

                });

                $('#likedProducts .remove-reviewed').click(function (e) {

                    e.preventDefault();

                    $(this).closest('.product').remove();

                    if (type == 'liked') {
                        var itemsArray = document.cookie.split('liked=')[1].split(';')[0].split(',');
                    }
                    else {
                        var itemsArray = document.cookie.split('reViewed=')[1].split(';')[0].split(',');
                    }

                    itemsArray.splice($.inArray($(this).attr('data-product-id'), itemsArray), 1);


                    setViewCookie(type, itemsArray.join(','));


                    setCountUserProducts();

                });

                setLikes();
            }
        });
    }

    if (~location.pathname.indexOf('izbrannoe')) {
        getProducts(document.cookie.split('liked=')[1].split(';')[0].split(','), 'liked');
    }
    else if (~location.pathname.indexOf('prosmotrennye')) {
        getProducts(document.cookie.split('reViewed=')[1].split(';')[0].split(','), 'reViewed');
    }

}());

/*
if (window.screen.width < 1024) {
    if (!~document.cookie.indexOf('mobile')) {
        $('body').append('<link rel="stylesheet" href="/css/responsive.css">');

        var curDate = new Date;
        curDate.setDate(curDate.getDate() + 300);

        document.cookie = 'mobile=1; path=/; domain=.super-opt.ru; expires='+curDate.toUTCString() + ';';

    }
    else {
        $('#mobile').css('display', 'block');
    }
}
*/
//validate
if ($('.box.catalog>ul li.active ').hasClass('menu-level-3')) {
    $('.box.catalog>ul li.active ').parent().show().parent().addClass('active');
}

if ($('.box.catalog>ul>li.active img').length) {

    if ($('.box.catalog .active').length && $('.box.catalog .active .active').length) {
        $('.box.catalog .active').eq(0).removeClass('active');
    }
    else {
        $('.box.catalog>ul>li.active img').attr('src', $('img', $('.box.catalog>ul>li.active')).attr('src').split('.png')[0] + '-hover.png');
    }

}

var settings = {
    base_url: '',
    sendAjax: function(ajaxParams,bool) {

        var bool = bool ? false : true;

        window.xhr = $.ajax({
            type: ajaxParams.method,
            url: ajaxParams.baseUrl ? (ajaxParams.baseUrl+ajaxParams.url) : (this.base_url+ajaxParams.url),
            dataType: 'json',
            async: bool,
            data: ajaxParams.data,
            success: function(result,status,xhr) {
                ajaxParams.callback(result);
                ajaxParams.response_headers(xhr);
            },
            error: function(data,status,xhr) {
                ajaxParams.error(data.responseJSON[0].message);
            }
        });
    },
    response_handler: function(bool,data_id,error) {
        if (bool) {
            $('.success-block[data-id="'+data_id+'"]').show();
            $('.error-block[data-id="'+data_id+'"]').hide();
        }
        else {
            $('.success-block[data-id="'+data_id+'"]').hide();
            $('.error-block[data-id="'+data_id+'"] span').text(error);
            $('.error-block[data-id="'+data_id+'"]').show();
        }
    },
    get_time: function(created_at,full) {
        var theDate = new Date(created_at * 1000);
        var full_date = theDate.getDate()+'.'+(theDate.getMonth()+1<10?('0'+(theDate.getMonth()+1)):theDate.getMonth()+1)+'.'+theDate.getFullYear();
        var full_date_width_time = full_date+' РІ '+theDate.getHours()+':'+(theDate.getMinutes()<10?('0'+theDate.getMinutes()):theDate.getMinutes());
        if (full)
            return full_date_width_time;
        else
            return full_date;
    },
    validate: function(el, errorBlockId) {

        var errorBlockId = errorBlockId || $('section', el).eq(0).attr('data-id');

        var types = {
                string: {
                    pattern: '',
                    response: function(name) {
                        return 'Поле "' + name + '" должно быть строкой!';
                    }
                },
                number: {
                    pattern: /^\d+$/i,
                    response: function(name) {
                        return 'Поле "' + name + '" должно быть числом!';
                    }
                },
                url: {
                    pattern: /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    response: function(name) {
                        return 'Некорректная ссылка!';
                    }
                },
                email: {
                    pattern: /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i,
                    response: function(name) {
                        return 'Некорректный почтовый адрес!';
                    }
                }
            },
            errorsCount = 0;


        $('input, select, textarea', el).each(function() {

            if (!$(this).attr('data-validate-field')) {
                return true;
            }

            var els = $(this),
                fieldValue = $(this).val(),
                fieldName = $('label[for="'+$(this).attr('id')+'"]').eq(0).text(),
                fieldRequired = parseInt($(this).attr('data-validate-field').split(':')[0]) ? true : false,
                fieldType = $(this).attr('data-validate-field').split(':')[1],
                addOutline = function(el, bool) {

                    var el = !el.is(':visible') ? el.parent().find('.ms-parent') : el;

                    bool ? el.css('outline', 'none') : el.css('outline', '1px solid #de2727');
                };

            if (fieldRequired) {
                if (!fieldValue) {
                    settings.response_handler(false, errorBlockId, 'Поле "' + fieldName + '" обязательно для заполнения!');
                    addOutline(els, false);
                    errorsCount++;
                    return false;
                }

                addOutline(els, true);
            }

            if (fieldType) {

                for (var i in types) {
                    if (i == fieldType && fieldValue) {

                        if (types[i].pattern && !types[i].pattern.test(fieldValue)) {
                            settings.response_handler(false, errorBlockId, types[i].response(fieldName));
                            addOutline(els, false);
                            errorsCount++;
                            return false;
                        }

                        addOutline(els, true);

                        break;
                    }
                }

            }

        });

        return errorsCount ? false : true;

    },
    declOfNum: function(number, titles, id) {

        var number = parseInt(number),
            cases = [2, 0, 1, 1, 1, 2],
            result = titles[(number%100 > 4 && number%100 < 20) ? 2 : cases[(number%10 < 5) ? number%10 : 5]];

        if (!id) return result;

        $('#' + id).text(result);
    },
}

$(function() {

    //file input

    $('input[type="file"]').change(function () {

        var el = $('label[for="'+$(this).attr('id')+'"]');

        if (el.length) {

            if (!$('div', el).length) {
                el.append('<div class="uploaded-file"></div>');
            }

            $('div', el).text($(this).val().split('\\')[$(this).val().split('\\').length-1]);

        }

    });


    //kupon
    if (!localStorage.kupon) {
        $('.kupon').click(function (e) {
            e.preventDefault();
            $('#get-cupon-href').trigger('click');
        });
    }

    //tabs

    $('.tab-header').click(function () {
        $('.tab-header').removeClass('active');
        $(this).addClass('active');
        var id = $(this).data('id');
        $('.tabs').removeClass('active');
        $('#'+id).addClass('active');
    });

    //ajax comment

    var comments = [];

    if ($('.wrap-comments').length && !$('.wrap-comments.otziv-page').length) {

        $('.wrap-comments .item').each(function () {

            comments.push($(this)[0].outerHTML);

            if ($(this).index() && ($(this).index()-1)) {
                $(this).remove();
            }

        });

    }

    $('.reviews').on('click', '#ditto_pages a', function(e) {

        e.preventDefault();
        $('.ditto_currentpage').removeClass('ditto_currentpage');
        $(this).addClass('ditto_currentpage');

        $('.wrap-comments').html(comments[$(this).text()*2-2]+comments[$(this).text()*2-1]);

    });

    $('.show-all').click(function() {

        $(this).hide();

        $(this).parent().animate({
            height : '610px'
        }, 'slow');

    });

    $('.box.catalog>ul>li:not(.active)>a').hover(function () {
        $('img', $(this)).attr('src', $('img', $(this)).attr('src').split('.png')[0] + '-hover.png');
    }, function () {
        $('img', $(this)).attr('src', $('img', $(this)).attr('src').split('-hover.png')[0] + '.png');
    });

    if ($(window).width() > 1024) {
        $('.btn-news').hover(function () {
            $('img', $(this)).attr('src', '/img/news-hover.png');
        }, function () {
            $('img', $(this)).attr('src', '/img/news.png');
        });

        $('.btn-youtube').hover(function () {
            $('img', $(this)).attr('src', '/img/youtube-hover.png');
        }, function () {
            $('img', $(this)).attr('src', '/img/youtube.png');
        });
    }



    //$('.left-aside').height($('.inner').height());

    (function() {

        if (!$('.box.catalog').length || !$('.box.catalog').is(':visible')) {

            document.addEventListener('scroll', function() {

                if ($(window).width() < 1024) {

                    var currentHeight = $(window).scrollTop();

                    if (currentHeight > 700) {
                        $('.fixed.mobile-version').show();
                    }
                    else {
                        $('.fixed.mobile-version').hide();
                    }

                }

            });

            return false;
        }


        var setHeight = function () {

                var leftPartHeight = $('#wrapper>.left-aside'),
                    rightPartHeight = $('#wrapper>.inner');

                leftPartHeight.removeAttr('style');
                rightPartHeight.removeAttr('style');

                if (leftPartHeight.height() > rightPartHeight.height()) {
                    rightPartHeight.height(leftPartHeight.height());
                    leftPartHeight.height(rightPartHeight.height());
                }
                else {
                    leftPartHeight.height(rightPartHeight.height());
                    rightPartHeight.height(leftPartHeight.height());
                }
            },
            setBlocksHeight = function () {

                (function() {

                    var el = $('.cat-text'),
                        show = function (bool) {
                            $('>*', el).each(function (e) {
                                if (e > 2 && $(this)[0].nodeName != 'DIV') {
                                    bool ? $(this).show() : $(this).hide();
                                }
                            });
                        };

                    if (el.length && $('>p', el).length > 1 ) {

                        show(false);

                        el.append('<div class="show-text">+ Подробнее</div>');
                    }

                    $('.cat-text .show-text').click(function() {

                        $(this).text() == '- Свернуть' ? show(false) : show(true);
                        $(this).text() == '- Свернуть' ? $(this).text('+ Подробнее') : $(this).text('- Свернуть');

                        setHeight();

                    });

                } ());

                setHeight();

                var el = $('.box.catalog'),
                    elHeight = el.height(),
                    leftHeighr = $('.left-aside'),
                    height = el.offset().top + elHeight,
                    scrollable = $('.scrollable'),
                    mainPage = $('.btn-wrapper').length ? leftHeighr.height()-3512 : 0;

                document.addEventListener('scroll', function() {

                    var endScrollHeight = leftHeighr.offset().top + leftHeighr.height() - scrollable.height() - mainPage;

                    var currentHeight = $(window).scrollTop();

                    if ($(window).width() > 1024) {

                        if (!window.changeKatalogHeight) {

                            var catalog = $('.box.catalog');

                            elHeight = catalog.height();
                            height = catalog.offset().top + catalog.height();

                            window.changeKatalogHeight = 1;
                        }

                        //console.log(currentHeight + ' ' + endScrollHeight);

                        if (currentHeight > height + 20 && currentHeight < endScrollHeight) {
                            scrollable.attr('class', 'scrollable start-scroll');
                            $('.wrap-scrollable').addClass('wrap-scrollable-active');
                        }
                        else if (currentHeight > endScrollHeight) {
                            scrollable.attr('class', 'scrollable end-scroll').css('bottom', mainPage);
                            $('.wrap-scrollable').removeClass('wrap-scrollable-active');
                        }
                        else {
                            scrollable.attr('class', 'scrollable');
                            $('.wrap-scrollable').removeClass('wrap-scrollable-active');
                        }
                    }

                    if (currentHeight>180) {
                        //$('.fixed.full-version').show();
                        $('.fixed.full-version, .bottom-panel').fadeIn();
                    }
                    else {
                        $('.fixed.full-version, .bottom-panel').fadeOut();
                    }

                });
            }

        if (!~location.pathname.indexOf('izbrannoe') && !~location.pathname.indexOf('prosmotrennye')) {

            setTimeout(function () {
                setBlocksHeight();
            }, 1000);
        }
        else {
            setTimeout(function () {
                setBlocksHeight();
            }, 1000);
        }


    }());

    //callBack from

    $('.call-btn').click(function(e) {

        e.preventDefault();

        if (!settings.validate($(this))) {
            return false;
        }

        var self = $(this);

        $.ajax({
            type: 'get',
            url: '/form/call-back',
            data: '',
            resetForm: 'true',
            success: function(result) {

                $('#modal').html(result);

                $.fancybox.open('#modal');

                $('#call-sent').click(function(e) {

                    e.preventDefault();

                    var self = $(this).closest('form');

                    $.ajax({
                        type: 'post',
                        url: '/form/call-back',
                        data: self.serialize() + '&_csrf-frontend=' + $('meta[name="csrf-token"]').attr('content'),
                        resetForm: 'true',
                        success: function(result) {

                            $('#modal').html(result);

                            $.fancybox.open('#modal');
                        }
                    });
                });
            }
        });

    })


    //follow form

    $('#follow-form').submit(function (e) {

        e.preventDefault();

        if (!settings.validate($(this))) {
            return false;
        }

        var self = $(this);

        $.ajax({
            type: 'post',
            url: '/form/subscribe',
            data: self.serialize() + '&_csrf-frontend=' + $('meta[name="csrf-token"]').attr('content'),
            resetForm: 'true',
            success: function(result) {

                $('input[name="email"]', self).val('');
                $('#modal').html(result);

                $.fancybox.open('#modal');
            }
        });

    });

    //china form

    $('#china-form, #china-form-2').submit(function(e){

        e.preventDefault();

        if (!settings.validate($(this))) {
            return false;
        }

        var m_method = $(this).attr('method'),
            m_action = $(this).attr('action'),
            self = $(this);

        $.ajax({
            type: m_method,
            url: m_action,
            data: new FormData($(this)[0]),
            resetForm: 'true',
            processData: false,
            contentType: false,
            success: function(result) {

                self[0].reset();

                $('#modal').html(result);

                $.fancybox.open('#modal');
            }
        });
    });

    //product existance form

    $('.product-existance form').submit(function(e){

        e.preventDefault();

        var m_method = $(this).attr('method'),
            m_action = $(this).attr('action'),
            self = $(this);

        $('input[name="product"]').val($('#product-search-info').html());

        $.ajax({
            type: m_method,
            url: m_action,
            data: $(this).serialize(),
            resetForm: 'true',
            success: function(result) {
                $('#end-existance-href').trigger('click');
            }
        });
    });

    // notify form
    $('#modal').on('submit', '#notify-form', function(e) {

        e.preventDefault();

        var m_method = $(this).attr('method'),
            m_action = $(this).attr('action'),
            self = $(this);

        $.ajax({
            type: m_method,
            url: m_action,
            data: $(this).serialize(),
            resetForm: 'true',
            success: function(result) {
                $('#modal').html(result);

                $.fancybox.open('#modal');
            }
        });
    });

    // notify form
    $('#modal').on('submit', '#low-price-form', function(e) {

        e.preventDefault();

        if (!settings.validate($(this))) {

            return false;
        }

        var m_method = $(this).attr('method'),
            m_action = $(this).attr('action'),
            self = $(this);

        $.ajax({
            type: m_method,
            url: m_action,
            data: $(this).serialize(),
            resetForm: 'true',
            success: function(result) {
                $('#modal').html(result);

                $.fancybox.open('#modal');
            }
        });
    });

    //landing from cart form

    $('#modal').on('submit', '#landing-form', function(e) {

        e.preventDefault();

        var _self = $(this);

        if ($('button .btn-preloader-img', _self).is(':visible') || !settings.validate($(this))) {

            return false;
        }

        metrika.reachGoal('get-landing');

        $('#get-landing h3>span').text($('.catalog-title-h1>h1').text().replace(' оптом', ''));

        $('#landing-product').val(' \
            <table> \
                <tr> \
                    <td style="border:1px solid #eee;padding:10px;"><img src="'+$('.product-img-block>img').attr('src')+'" alt="" style="width: 100px;" /></td> \
                    <td style="border:1px solid #eee;padding:10px;"><a target="_blank" href="'+window.location.href+'">'+$('.catalog-title-h1').text()+'</a></td> \
                </tr> \
            </table> \
        ');

        $('button>span', _self).hide();
        $('button .btn-preloader-img', _self).show();

        $.ajax({
            type: 'post',
            url: $(this).attr('action'),
            data: $(this).serialize(),
            async: false,
            success: function(result) {

                $('#modal').html(result);

                $.fancybox.open('#modal');

            },
            error: function() {

            }
        });
    });

    // price-list form

    $('#modal').on('submit', '#get-price-list', function(e) {

        e.preventDefault();

        if (!settings.validate($(this))) {

            return false;
        }

        var m_method = $(this).attr('method'),
            m_action = $(this).attr('action'),
            self = $(this);

        $.ajax({
            type: m_method,
            url: m_action,
            data: self.serialize(),
            success: function(result){

                $('.price-list-wrapper .right').html(result);


                //$.fancybox.open('#modal');
            }
        });

    });

    //search form

    $('#search-form').submit(function(e){

        e.preventDefault();

        if (!settings.validate($(this))) {
            return false;
        }

        var m_method = $(this).attr('method'),
            m_action = $(this).attr('action'),
            self = $(this);

        $.ajax({
            type: m_method,
            url: m_action,
            data: new FormData($(this)[0]),
            resetForm: 'true',
            processData: false,
            contentType: false,
            success: function(result){

                $('#search-form')[0].reset();

                $('#modal').html(result);

                $.fancybox.open('#modal');
            }
        });

    });

    //coment form

    $('#reviews').submit(function(e){

        e.preventDefault();

        if (!settings.validate($(this))) {
            return false;
        }

        var m_method = $(this).attr('method'),
            m_action = $(this).attr('action'),
            self = $(this);

        $.ajax({
            type: m_method,
            url: m_action,
            data: new FormData($(this)[0]),
            resetForm: 'true',
            processData: false,
            contentType: false,
            success: function(result){

                $('#reviews')[0].reset();

                $('#modal').html(result);

                $.fancybox.open('#modal');

            }
        });
    });

    //show text

    $('.show-text').click(function () {

        if (!$('.sub-text').length) {
            return false;
        }

        var _this = $(this);

        if (_this.text() == '+ Подробнее') {

            _this.parent().animate({
                height: 800
            }, 500, function() {
                _this.text('- Свернуть');
            });

        }
        else {

            _this.parent().animate({
                height: 212
            }, 500, function() {
                _this.text('+ Подробнее');
            });

        }

    });

    $("a.scroll-china").click(function() {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
    });
    
    //mobile menu
    
    $('.mobile-logo .mobile-menu').click(function () {

        var menu = $('#main-menu'),
            menuOverlay = $('#main-menu-overlay');

        menuOverlay.fadeIn();

        $('#main-wrapper').addClass('content-menu-open');
        $('html').addClass('mobile-menu-opened');

        menu.show();

    });

    $('#main-menu-overlay').click(function () {

        var menu = $('#main-menu'),
            menuOverlay = $('#main-menu-overlay');

        menuOverlay.fadeOut();

        //$('#main-wrapper').attr('style', 'left:0!important');

        $('#main-wrapper').removeClass('content-menu-open');
        $('html').removeClass('mobile-menu-opened');

        menu.hide();
    });


    if (allGetParams().ids) {
        alert(document.cookie);
        alert($('.go-to-full-version').attr('href'));
    }



    $('#full').click(function () {
        var curDate = new Date;
        curDate.setDate(curDate.getDate() + 300);

        document.cookie = 'mobile=0; path=/; domain=.super-opt.ru; expires='+curDate.toUTCString() + ';';
        location.reload();
    });


    $('#mobile').click(function () {
        var curDate = new Date;
        curDate.setDate(curDate.getDate() + 300);

        document.cookie = 'mobile=1; path=/; domain=.super-opt.ru; expires='+curDate.toUTCString() + ';';
        location.reload();
    });

    $('.box.catalog>ul a').click(function (e) {

        var li = $(this).parent();

        if (li.hasClass('parent-true')) {

            if (e.offsetX > 230) {
                e.preventDefault();

                var ul = li.find('ul');

                window.changeKatalogHeight = 0;

                if(!ul.is(':visible')) {
                    $(this).addClass('clicked');

                    ul.slideDown();

                    $(this).css({
                        'background' : 'url(../assets/images/catIcons/arrow-up-click.png) no-repeat right',
                        'background-position' : '245px 24px',
                        'background-size': '11px'
                    });
                }
                else {

                    $(this).removeClass('clicked');
                    ul.slideUp();
                    $(this).css({
                        'background' : 'url(../assets/images/catIcons/arrow-down.png) no-repeat right',
                        'background-position' : '245px 24px',
                        'background-size': '11px'
                    });
                }

            }
        }

    });

    // ajax fancy

    $('.ajax-fancy').click(function(e) {

        e.preventDefault();

        $.ajax({
            type: 'get',
            url: $(this).attr('href'),
            data: {
                '_csrf-frontend': $('meta[name="csrf-token"]').attr('content')
            },
            async: false,
            success: function(data) {

                $('#modal').html(data);

                $.fancybox.open('#modal');

            },
            error: function() {

            }
        });
    });

    // mobile menu constructor

    $('#main-menu-content>ul').eq(1).addClass('main-menu-catalog');

    $('#main-menu .parent-true ul').each(function () {

         $(this).attr('data-parent', $('>a', $(this).parent()).text())
             .addClass('mobile-menu-hidden')
             .prepend('<li><span class="menu-back">Каталог</span></li>');

        var ul = $(this).clone();

        $('#main-menu>div').append(ul);

        $(this).remove();

    });

    $('#main-menu>div').on('click', 'a', function (e) {

        if ($(this).parent().hasClass('parent-true')) {

            e.preventDefault();

            var text = $(this).text(),
                el = $('#main-menu>div ul[data-parent="'+text+'"]');

            $('#main-menu-content').css('margin-left', '-50%');
            el.show();

            //$()

        }

    });

    $('#main-menu .menu-back').click(function () {

        var text = $(this).closest('ul').attr('data-parent'),
            el = $('#main-menu>div ul[data-parent="'+text+'"]');

        $('#main-menu-content').css('margin-left', '0%');
        el.hide();
    });

    $('#main-menu-content>a').click(function (e) {

        e.preventDefault();

        $('#full').trigger('click');
    });

    //from jivo to unisender

    (function () {

        if (!localStorage.jivo && window.jivo_api !== undefined) {

            var startCheckJivo = setInterval(function () {

                var user = jivo_api.getContactInfo(),
                    uniURL = 'https://api.unisender.com/ru/api/subscribe?format=json&tags=%D0%B8%D0%B7%20jivosite&api_key=6npa6dokwdeqf3w3mrqub1ax4dfmrrnqt8g1es1o&list_ids=6068462&double_optin=1&overwrite=0';

                if(user.email) {

                    uniURL += '&fields[email]=' + user.email;

                    if (user.client_name){
                        uniURL += '&fields[Name]=' + encodeURI(user.client_name);
                    }

                    if (user.phone){
                        uniURL += '&fields[phone]=' + encodeURI(user.phone);
                    }

                    $.ajax({
                        type: "GET",
                        url: uniURL,
                        success: function(data) {

                            localStorage.setItem('jivo', 1);

                            clearInterval(startCheckJivo);

                        },
                        error:  function(xhr, str){

                        }
                    });

                }

            }, 5000);

        }

    } ());

    if (allGetParams().conf) {

        setTimeout(function () {
            $('.konfidencialnost').trigger('click');
        }, 1000);

    }

    $('.hint').tipsy({
        html: true,
        opacity: 0.9,
        title: function() {
            return $('#' + $(this).attr('data-hint')).html();
        }
    });

    /**
     * about company
     */

    var companyVideo = {
        __preview: '#transit-video-trigger',
        __delay: 15000,
        videoWidth: false,
        videoHeight: false,
        init: function() {



            this.initScripts();

            if (this.checkLocalStorage()) {

                setTimeout(this.showPreview, this.__delay);

                var videoPlayerElement = document.querySelector('.js-transit-video-player');

                $('.js-close-trigger-x, .js-close-trigger').click(function() {

                    companyVideo.closePrivew();
                    companyVideo.setLocalStorage();
                });

                $('.click-zone').click(function() {

                    companyVideo.play.playVideo();
                    companyVideo.videoWidth = 640;
                    companyVideo.videoHeight = 360;
                    companyVideo.resize();

                    companyVideo.showVideo();
                });

                $('.seen-already').click(function() {

                    companyVideo.setLocalStorage();
                    companyVideo.closePrivew();
                });

                $('.js-close').click(function() {

                    companyVideo.play.pauseVideo();
                    companyVideo.hideVideo();
                });

                $(window).on('resize', function() {
                    companyVideo.resize();
                })
            }
        },
        showPreview: function () {

            if (!companyVideo.play) {

                companyVideo.play = companyVideo.initVideo();
            }

            $(companyVideo.__preview).addClass('view');
        },
        closePrivew: function() {

            $(companyVideo.__preview).removeClass('view');
        },
        setLocalStorage: function() {

            localStorage.setItem('aboutVideo', 1);
        },
        checkLocalStorage: function() {

            return typeof(localStorage.aboutVideo) === "undefined";
        },
        showVideo: function () {

            $('#transit-video-popup').show().addClass('opened');
        },
        hideVideo: function () {

            $('#transit-video-popup').removeClass('opened');
        },
        initScripts: function () {

            var tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        },
        initVideo: function () {

            return new YT.Player('vBBdfRJPeQ0', {
                height: '360',
                width: '640',
                videoId: 'vBBdfRJPeQ0',
                playerVars: {
                    showinfo: 0,
                    controls: 1,
                    modestbranding: 0,
                    wmode: 'opaque'
                }
            });
        },
        getWidthPadding : function() {
            if( window.innerWidth >= 1440 ) {
                return 190;
            }else if( window.innerWidth >= 1280 ) {
                return 160;
            }else{
                return 130;
            }
        },
        getHeightPadding : function() {
            if( window.innerWidth >= 1440 ) {
                return 115;
            }else if( window.innerWidth >= 1280 ) {
                return 100;
            }else{
                return 120;
            }
        },
        resize: function() {

            var ww = ( window.innerWidth - this.getWidthPadding() * 2 );
            var wh = ( window.innerHeight - this.getHeightPadding() * 2 );
            var width = ww;
            var height = wh;

            if(this.videoWidth && this.videoHeight)
            {
                height = Math.round( width / this.videoWidth * this.videoHeight );
                if(wh && ( height > wh ) )
                {
                    height = wh;
                    width = Math.round( height / this.videoHeight * this.videoWidth );
                }
            }

            $('.js-transit-video-player').css({ width : width, height : height });
            companyVideo.play.setSize(width, height)
        }

    }

    companyVideo.init();

    /**
     * new product preview
     */

    if (allGetParams().gal && $('.product-litle-img').length) {

        /**
         *
         * cases
         *
         * 1. 5 or less - nothing
         * 2. 4 or less + video - nothing
         * 3. more then 5 - galerry (4 els)
         * 4. more then 4 + video (3 els)
         *
         */

        var imgCount = $('.product-litle-img>div').length,
            video = $('.product-video').length,
            slickSettings = {
                infinite: true,
                slidesToScroll: 1
            }

        if (video && imgCount > 4) {

            $('.product-litle-img').css({
                'width': '262px',
                'display': 'inline-block',
                'margin-left': '39px',
            });

            slickSettings.slidesToShow = 3;
        }
        else if (imgCount > 5) {

            $('.product-litle-img').css('width', '356px');
            slickSettings.slidesToShow = 4;
        }
        else {
            $('.product-litle-img').css('display', 'inline-block');
            video ? $('.product-video').css('margin-left', 0) : 0;
        }

        if (slickSettings.slidesToShow) {

            $('.product-litle-img img').css('margin', '0 auto');
            $('.product-litle-img').slick(slickSettings);
        }

    }

    /**
     * express discount
     */

    if (!~document.cookie.indexOf('express') && document.cookie.split('reViewed=')[1] && document.cookie.split('reViewed=')[1].split(';')[0].split(',').length > 1 && !~window.location.href.indexOf('korzina') && !~window.location.href.indexOf('thank') && !~window.location.href.indexOf('payment')) {

        setTimeout(function () {
            $('.new-bottom-panel').slideDown(500);
        }, 5000);

        var curDate = new Date;

        curDate.setDate(curDate.getDate() + 1);

        $('.new-bottom-panel>a').click(function () {

            document.cookie = 'express=1; path=/; domain=.super-opt.ru; expires='+curDate.toUTCString() + ';';
            $('.new-bottom-panel').hide();
        });

        $('body').on('submit', '#discount-form', function(e) {

            e.preventDefault();

            if ($('#cart-mail', $(this)).val()) {

                var _self = $(this);

                $.ajax({
                    type: 'post',
                    url: $(this).attr('action'),
                    data: $(this).serialize(),
                    resetForm: 'true',
                    success: function(result) {

                        $('#modal').html(result);

                        $.fancybox.open('#modal');

                        curDate.setDate(curDate.getDate() + 30);
                        document.cookie = 'express=1; path=/; domain=.super-opt.ru; expires='+curDate.toUTCString() + ';';
                    }
                });
            }


        });
    }



}());

