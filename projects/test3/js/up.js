window.dataLayer = window.dataLayer || [];
var allGetParams = function() {
    var getParams = window.location.search.substring(1).split('&'),
        params = {};
    for (var i in getParams) {
        params[getParams[i].split('=')[0]] = getParams[i].split('=')[1] ? getParams[i].split('=')[1] : null;
    }
    return params;
};
if (allGetParams().code && allGetParams().hit) {
    var curDate = new Date;
    curDate.setDate(curDate.getDate() + 30);
    document.cookie = 'code=' + allGetParams().code+'; path=/; domain=super-opt.ru; expires='+curDate.toUTCString() + ';';
    document.cookie = 'hit=' + allGetParams().hit+'; path=/; domain=super-opt.ru; expires='+curDate.toUTCString() + ';';
}

$(document).ready(function(){

    $(document).on("submit","form",function(e){

        if (!settings.validate($(this))) {
            e.stopImmediatePropagation();
            return false;
        }

    });

    var productsConstructor = function(el, data) {

        var productsHTML = '',
            count = data.length,
            data = data.slice(0, 10);


        for (var i in data) {

            productsHTML += ' \
                <a href="/katalog/' + data[i].categories[0].slug + '/' + data[i].slug + '" class="autocomplete-suggestion"> \
                    <img src="' + data[i].preview + '" alt="' + data[i].name + '"> \
                    <span>' + data[i].name + ' <p>' + data[i].price + '<i> руб.</i></p></span> \
                </a>';
        }

        if (~location.href.indexOf('m.')) {

            productsHTML = '<div class="to-search-scroll">' + productsHTML + '</div>';
        }

        if (count > 9) {

            productsHTML += ' \
                 <div class="autocomplete-suggestion" data-index="15"><span class="allresults">Показать все ' + count + ' ' + settings.declOfNum(count, ["товар", "товара", "товаров"]) + '</span></div> \
            ';
        }

        if (count) {

            el.html(productsHTML).show();

            $('.allresults').click(function(e) {

                location.replace('/search?name=' + $('#ajaxSearch_input').val());
            });
        }
        else {
            delete searchProducts;
            el.html('').hide();
        }
    }

    $(document).click(function() {
        $('div.search-result').hide();
    });

    $('.cleardefault').keyup(function(e) {

        var query = $(this).val(),
            keys = {
                27: 1,
                9: 1,
                13: 1,
                37: 1,
                38: 1,
                39: 1,
                40: 1,
            },
            container = $('div.search-result');

        if (query.length == 2 || (query.length > 2 && typeof searchProducts === 'undefined')) {

            if (!keys[e.keyCode]) {

                if (window.xhr) {

                    //window.xhr.abort();
                }

                settings.sendAjax({
                    method: 'POST',
                    url: '/product/search',
                    data: {
                        name: query,
                        '_csrf-frontend': $('meta[name="csrf-token"]').attr('content')
                    },
                    callback: function(result, status, xhr) {

                        if (result.length) {

                            window.searchProducts = result;
                            productsConstructor(container, result);
                        }
                        else {

                            container.html('').hide();
                        }

                    },
                    response_headers: function(xhr) {

                    },
                    error: function(error) {

                        container.html('').hide();

                    }
                });
            }
        }
        else if (!query) {

            container.html('').hide();
        }
        else {

            if (window.searchProducts && window.searchProducts.length) {

                var cityList = $.grep(window.searchProducts, function(e) {

                    return ~e.name.toLocaleUpperCase().indexOf(query.toLocaleUpperCase()) ||  (e.hidden_name ? ~e.hidden_name.toLocaleUpperCase().indexOf(query.toLocaleUpperCase()) : 0) || ~e.articul.toLocaleUpperCase().indexOf(query.toLocaleUpperCase());
                });

                productsConstructor(container, cityList);
            }

        }
    });

    $("#faq-form button").click(function(){
        function checkField(field) {
            var fields = [
                {id: 'name', pattern: /^[а-яa-z0-9,\- ]+$/i, required: true},
                {id: 'phone', pattern: /^[0-9\-\(\)\+ ]{6,}$/i, required: true},
                {id: 'mail', pattern: /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i, required: true},
            ];
            var hasError = false;
            for(var i = 0; i < fields.length; i++) {
                if (field !== undefined && fields[i].id != field) {
                    continue;
                }
                obj = $('#faq-form input[name="'+fields[i].id+'"]');
                val = obj.val();
                if (val == '') {
                    if (fields[i].required) {
                        hasError = true;
                        obj.css('border', '1px solid #ff0000');
                    }
                    continue;
                } else {
                    obj.css('border', '1px solid #c2c2c2');
                }
                if (!fields[i].pattern.test(val)) {
                    obj.css('border', '1px solid #ff0000');
                    hasError = true;
                }
                else {
                    obj.css('border', '1px solid #c2c2c2');
                }
            }
            return hasError;
        }
        if (checkField()) {
            return false;
        }
        send_bitrix();

        try {
            yaCounter33014704.reachGoal('QUESTION');
        }
        catch(e) {
        }

        name=$('#faq-form input[name=name]').val();
        mail=$('#faq-form input[name=mail]').val();
        phone=$('#faq-form input[name=phone] ').val();
        text=$('#faq-form textarea').val();
        $.ajax({
            type: 'post',
            url: '/bitrix/api.php',
            async: false,
            data: {
                newColl: {
                    name: NAME,
                    phone: PHONE,
                    email: mail,
                    comment: text,
                    type: 'question'
                }
            },
            success: function(data) {
            }
        });
        $.ajax({
            url: '/php/quest.php',
            type: 'post',
            data: {
                name: name,
                phone: phone,
                mail: mail,
                text: text,
                id: 'Вопрос'
            },
            success: function(html){

            },
            error: function(html){
                //$('.result').text('При отправке сообщения возникли ошибки');
            }
        });
        $('.spb').click();
        $('#faq-form input[name=name]').val('');
        $('#faq-form input[name=mail]').val('');
        $('#faq-form input[name=phone]').val('');
        text=$('#faq-form textarea').val('');
        return false;
    })

    var name = $(".catalog-title-h1").children("h1").html();
    if (typeof(name) != 'undefined'){
        dataLayer.push({
            "ecommerce":{
                "detail":{
                    "products":[{
                        "name":name
                    }]
                }
            }
        });
    }

    $('.fancy').fancybox({
        axWidth: 916,
        helpers: {
            overlay: {
              locked: false
            }
          }
    });

    $('.product-litle-img a').fancybox({
        'type': 'image',
        //prevEffect	: 'fade',
        //nextEffect	: 'fade',
        nextSpeed: 300,
        prevSpeed: 300,
        'closeClick': true,
        //'openEffect': 'elastic',
        //'closeEffect': 'elastic'
    });


    $(document).on("submit","#faq-form",function(e){
        e.preventDefault();
        var m_method=$(this).attr('method');
        var m_action=$(this).attr('action');
        var m_data=$(this).serialize();
        $.ajax({
            type: m_method,
            url: m_action,
            data: m_data,
            resetForm: 'true',
            success: function(result){
                var data = $(result).find("#feedback").html();
                $("#feedback").html(data);
            }
        });

    });
    $(document).on("submit","#kupon-form",function(e){
        e.preventDefault();

        if (!localStorage.kupon) {

            localStorage.setItem('kupon', JSON.stringify({
                name: $('[name="name"]', $(this)).val(),
                phone: $('[name="phone"]', $(this)).val(),
                mail: $('[name="mail"]', $(this)).val(),
                complite: 0
            }));

            $('#get-cupon>strong').text('Отсчет пошел!');
            $('#get-cupon>strong').css({'margin' : '0 auto', 'display' : 'block'});
            $('#get-cupon>p').text('Когда копилка достигнет отметки в 1000 рублей, Вы сможете получить сертификат, и воспользоваться им при оплате заказа на нашем сайте!');
            $('#get-cupon').append('<span class="double-counter">0</span>');

            $('#get-cupon>div').empty();

            startCuponCounter();

            return false;
        }
        else if (JSON.parse(localStorage.kupon).complite <50) {

            return false;
        }

        var m_method=$(this).attr('method'),
            m_action=$(this).attr('action'),
            m_data=$(this).serialize();


        $.ajax({
            type: m_method,
            url: m_action,
            data: m_data,
            resetForm: 'true',
            success: function(result){
                var data = $(result).find(".kupon-page").html();
                $(".kupon-page").html($(result).find(".kupon-page").html());

                if ($(".kupon-page").find('#kupon-thankyou').text().length>0){
                    $('.load').css('display','block')
                    $.ajax({
                        url: '/add-mail',
                        type: 'post',
                        data: m_data,
                        success: function(result){
                            if (result==0){
                                $('#kupon-failed').css('display','block');
                            }
                            if (result==1){
                                $('#kupon-yes').css('display','block');
                            }
                        }
                    });
                }
            }
        });

    });

    if (allGetParams().id && $('#order-id').length) {
        $('#order-id').text(allGetParams().id);
    }

    $(document).on("submit","#order",function(e){

        var btn = $('.btn-preloader-img').parent();

        if ($('img', btn).is(':visible')) {

            return false;
        }

        $('span', btn).hide();
        $('img', btn).show();

        metrika.reachGoal('zakazat');

    });

    $('.fancy-border').fancybox({
        padding : '20',
        width: 800,
        height: 600,
    })
    if (!$.cookie('was')) {

        setTimeout("$('#for-price-list-down').click()",5000)
    }

    $.cookie('was', true, {
        expires: 1,
        path: '/'
    });

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    //if (!isMobile.any()) {
    if (1) {
        /*
         if (!~document.cookie.indexOf('vkWget')) {
         VK.Widgets.CommunityMessages("vk_community_messages", 97236456, {shown: "1"});
         document.cookie = "vkWget=1";
         }
         else {
         VK.Widgets.CommunityMessages("vk_community_messages", 97236456, {});
         }
         */
        (function(w, d, u, i, o, s, p) { if (d.getElementById(i)) { return; } w['MangoObject'] = o; w[o] = w[o] || function() { (w[o].q = w[o].q || []).push(arguments) }; w[o].u = u; w[o].t = 1 * new Date(); s = d.createElement('script'); s.async = 1; s.id = i; s.src = u; s.charset = 'utf-8'; p = d.getElementsByTagName('script')[0]; p.parentNode.insertBefore(s, p); }(window, document, '//widgets.mango-office.ru/widgets/mango.js', 'mango-js', 'mgo')); mgo({multichannel: {id: 931}});
    }

})