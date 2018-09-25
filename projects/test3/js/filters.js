$(function () {

    /**
     * old price helper
     */

    let prices = function () {

        this.prices = {};

        this.oldPrices = {};

        this.isSale = false;

        this.setPrices = function (prices) {

            this.prices = prices;

            return this;
        };

        this.setOldPrices = function(prices) {

            if (prices) {

                for (var i in prices) {

                    if (prices[i]) {

                        this.isSale = true;

                        break;
                    }
                }
            }

            this.oldPrices = prices;

            return this;
        };

        this.calculateExtremums = function() {

            var extremums = {
                'max': 0,
                'min': 100000,
                'keyMax': null,
                'keyMin': null,
            }

            for (var i in this.prices) {

                if (parseInt(this.prices[i])) {

                    if (extremums.max < this.prices[i]) {

                        extremums.max = this.prices[i];

                        if (this.isSale) {

                            extremums.keyMax = i;
                        }
                    }

                    if (extremums.min >= this.prices[i]) {

                        extremums.min = this.prices[i];

                        if (this.isSale) {

                            extremums.keyMin = i;
                        }
                    }
                }
            }

            extremums.min = extremums.min == 100000 ? 0 : extremums.min;

            return extremums;
        };

        this.calculateDiscount = function() {

            if (this.isSale) {

                var extremums = this.calculateExtremums(),
                    discount = 100 - Math.round((this.prices[extremums.keyMin] / this.oldPrices[extremums.keyMin])*100);
            }
            else {

                var discount = '';
            }

            return discount;
        };

        this.isEqual = function(price) {

            return price == this.prices[this.calculateExtremums().keyMin] ? this.oldPrices[this.calculateExtremums().keyMin] : false;
        }
    }



    /**
     * catalog filters
     */

    var productFilters = function(bool) {

        if (!bool) {
            $('#current-page').val(1);
        }

        var data = {};

        $('#filters>input, #filters>select, #filters>input:checked, #per-page').each(function () {

            if ($(this).val()) {

                data[$(this).attr('name')] = $(this).val();
            }

        });

        var products = $('#products');

        if (!~location.href.indexOf('rasprodazha')) {

        }
        else {
            data['tip'] = 2;
        }

        if (allGetParams().brand) {
            data['brand'] = allGetParams().brand;
        }

        data['q[price][between]'] = $('#range').data().from + ',' + $('#range').data().to;

        settings.sendAjax({
            method: 'GET',
            url: '',
            data: data,
            callback: function(result, status, xhr) {

                $('.inner').removeAttr('style');

                var productsHTML = '',
                    types = {
                        'new': '<div class="novinka">новинка</div>',
                        'week': '<div class="week">Товар недели</div>',
                        'sale': '<div class="sale">акция</div>',
                        'hit': '<div class="hit">Хит продаж</div>',
                        'china': '<div class="preorder">Предзаказ</div>',
                    };

                if (result.products.length || !$.isEmptyObject(result.products)) {

                    for (var i in result.products) {

                        var hits = '',
                            modelCount = JSON.parse(result.products[i].models_count),
                            labels = JSON.parse(result.products[i].labels),
                            productPrices = (new prices())
                                .setPrices(JSON.parse(result.products[i].table))
                                .setOldPrices(JSON.parse(result.products[i].old));

                        for (var j in types) {

                            if (labels[j]) {

                                if (j == 'sale' && productPrices.isSale) {

                                    var percent = productPrices.calculateDiscount() ? '&nbsp;&nbsp;-' + productPrices.calculateDiscount() + '%' : '';

                                    hits += '<div class="sale">акция ' + percent + '</div>';
                                }
                                else {

                                    hits += types[j];
                                }
                            }

                        }

                        //var priceHTML = '<p class="price" style="float:left;">'+(result.products[i].price*1 ? result.products[i].price + ' <span> руб.</span>' : '0 <span>руб.</span> <span> <i class="hint" data-hint="null-price">?</i></span>')+'</p>';
                        var priceHTML = '<p class="price" style="float:left;">'+ result.products[i].price + ' <span> руб.</span></p>';

                        if (productPrices.isSale && productPrices.isEqual(result.products[i].price*1)) {

                            let sale = productPrices.isEqual(result.products[i].price*1);

                            priceHTML = '<p class="price sale-old-price" style="float:left;">'+ sale + ' <span> руб</span><i class="through-line"></i></p><p class="sale-price"><i>'+ result.products[i].price + ' руб.</i></p>';
                        }

                        productsHTML += ' \
                        <div class="product" data-clock=\',,\'> \
                            <div class="hit-wrapper">'+hits+'</div> \
                            <div class="like" data-product-id="'+result.products[i].id+'"></div> \
                            <a href="/katalog/'+result.products[i].categories[0].slug+'/'+result.products[i].slug+'"> \
                                <p class="product-img"><img src="'+result.products[i].preview+'" alt="'+result.products[i].name+'" title="'+result.products[i].name+'"></p> \
                                <p class="product-title">'+result.products[i].name+'</p> \
                                <span>'+(modelCount.model_count ? modelCount.model_count+':' : '')+' <span>'+(modelCount.model_description ? modelCount.model_description : '')+'</span></span> \
                                ' + priceHTML + ' \
                                <div class="clear"></div> \
                            </a> \
                            <a href="" class="btn-buy" buy-item="'+result.products[i].id+'">Заказать</a> \
                            <a href="/katalog/'+result.products[i].categories[0].slug+'/'+result.products[i].slug+'" class="btn-tr">подробнее</a> \
                        </div>';

                    }

                }


                if (bool) {
                    $('#products').append(productsHTML);
                }
                else {
                    $('#products').html(productsHTML);
                }

                /*
                var ajaxBtn = '';

                if (result.pagination.pages > 1 && result.pagination.current != result.pagination.pages) {

                    ajaxBtn = '\
                            <div style="width: 860px;" class="btn-wrapper"> \
                                <a style="width: 235px;" data-current-id="'+(result.pagination.current + 1) +'" id="ajax-loader" class="new-full-btn red">Показать больше товаров</a> \
                            </div> \
                        ';

                }


                $('.products').eq(1).html(ajaxBtn);
                 */


                 if (allGetParams().tes) {
                    $('#products').append(productsHTML);
                 }
                 else {
                    $('#products').html(productsHTML);
                 }

                 var el = $('#ditto_pages');

                 el.empty();

                 if (el.data('twbs-pagination')) {

                     el.twbsPagination('destroy');
                 }

                 if (result.pagination.count) {

                 el.twbsPagination({
                     totalPages: result.pagination.count,
                     visiblePages: 10,
                     first: false,
                     last: false,
                     prev: false,
                     next: false,
                     startPage: result.pagination.current,
                     onPageClick: function (event, page) {

                         event.preventDefault();

                         $('#current-page').val(page);

                         $("html, body").animate({
                                scrollTop: $('h1').offset().top + "px"
                             }, {
                                 duration: 300,
                                 easing: "swing"
                         });

                         productFilters(true);

                     }
                 });

                 }

                $('.hint').tipsy({
                    html: true,
                    opacity: 0.9,
                    title: function() {
                        return $('#' + $(this).attr('data-hint')).html();
                    }
                });



            },
            response_headers: function(xhr) {

            },
            error: function(error) {

                settings.btn_preloader(false, 4);
                settings.response_handler(false, 1, error);
            }
        });

    }

    if ($('#filters').length) {

        $('.products').on('click', '#ajax-loader', function() {

            $('#current-page').val($(this).attr('data-current-id'));

            productFilters(true);
        });

        var data = {
                extremums: 1,
            },
            products = $('#products');

        if (!~location.href.indexOf('rasprodazha')) {
            if (products.attr('data-category-id') == 2) {

                data['category'] = products.attr('data-subcategory-id');
            }
            else {
                data['sub_category'] = products.attr('data-subcategory-id');
            }
        }
        else {
            data['tip'] = 2;
        }


        if (allGetParams().brand) {
            data['brand'] = allGetParams().brand
        }

        var min = 0,
            max = 0;

        settings.sendAjax({
            method: 'GET',
            url: '',
            data: data,
            callback: function(result, status, xhr) {

                min = result.extremums.min ? result.extremums.min : 0;
                max = result.extremums.max ? result.extremums.max : 0;

                var dmin = min,
                    dmax = max;

                $('#price-from').val(min);
                $('#price-to').val(max);

                $('#range').ionRangeSlider({
                    type: "double",
                    min: min,
                    max: max,
                    grid: true,
                    onFinish: function (data) {
                        productFilters();
                    },
                    onChange: function (data) {

                        if (data.from != dmin) {
                            $('#price-from').focus();
                            dmin = data.from;
                        }

                        if (data.to != dmax) {
                            $('#price-to').focus();
                            dmax = data.to;
                        }

                        $('#price-from').val(data.from);
                        $('#price-to').val(data.to);
                    },
                });

                //productFilters();

            },
            response_headers: function(xhr) {

            },
            error: function(error) {

            }
        });


        $('#sort').multipleSelect({
            filter: false,
            placeholder: 'Сначала новинки',
            single: true,
            width: 135
        });

        $('#filters .ms-drop').addClass('set-width');

        $('#per-page').multipleSelect({
            filter: false,
            placeholder: '12',
            single: true,
            width: 50
        });

        $('#filters #name').keyup(function (e) {

            e.preventDefault();

            var query = $(this).val(),
                keys = {
                    27: 1,
                    9: 1,
                    13: 1,
                    37: 1,
                    38: 1,
                    39: 1,
                    40: 1,
                };

            if (query.length && !keys[e.keyCode]) {

                if (window.xhr) {
                    window.xhr.abort();
                }

                productFilters();

            }

        });

        $('#filters>select, #filters>input, .filter-bag-fix>input, #per-page').on('change', function () {

            $('#range').data("ionRangeSlider").update({
                from: $('#price-from').val(),
                to: $('#price-to').val(),
            });

            productFilters();
        });

    }
    else {
        $('#filters').hide();
    }

    if ($('#ajax-reviews1').length) {

        var page = 1;

        $('#ajax-reviews').click(function (e) {

            e.preventDefault();

            page++;

            var data = {
                reviews: 1,
                page: page
            }

            settings.sendAjax({
                method: 'GET',
                url: '/custom/sorting.php',
                data: data,
                callback: function(result, status, xhr) {

                    var reviewHTML = '';

                    var reviews = result.products;

                    for (var i in reviews) {

                        reviewHTML += ' \
                            <div class="item"> \
                                <img src="'+(reviews[i].avatar ? reviews[i].avatar : '/img/vkAva.png')+'" alt=""> \
                                <p class="author">'+reviews[i].pagetitle+', '+reviews[i].city+'</p> \
                                <span>'+settings.get_time(reviews[i].createdon)+'</span> \
                                 <a class="vk-link" rel="nofollow" href="'+reviews[i].link+'">'+reviews[i].link+'</a> \
                                <p class="title">'+reviews[i].longtitle+'</p> \
                                <div class="txt">'+reviews[i].content+'</div> \
                            </div> \
                        ';

                    }

                    $('.wrap-comments').append(reviewHTML);

                    if (result.pagination.pages > 1 && result.pagination.current == result.pagination.pages) {

                        $('#ajax-reviews').remove();
                    }

                },
                response_headers: function(xhr) {

                },
                error: function(error) {

                    settings.btn_preloader(false, 4);
                    settings.response_handler(false, 1, error);
                }
            });

        });

    }

});
