$(document).ready(function(){
	
	$('body').on('click', '.btn-buy', function(event) {

        event.preventDefault();


		/*

		 if ($('#product-id').length && typeof window.metrika != 'undefined') {
		 window.metrika.reachGoal('add-to-cart');
		 }
		 else {
		 window.metrika.reachGoal('order-from-catalog');
		 }

		 */


        $('.bottom-panel-basket').addClass('active');

        setTimeout(function () {
            $('.bottom-panel-basket').removeClass('active');
        },1000);

        var id = $(this).attr('buy-item');
		var q = 5;
		if($('#count').val()===undefined) q=5;
		else q=parseInt($('#count').val());
		
		if(id > 0) {			
			$.ajax({
				type: 'post',
				url: '/basket/add',
				data: {
					id: id,
					count : q,
					'_csrf-frontend': $('meta[name="csrf-token"]').attr('content')
				},
			})
			.done(function(data) {	

				update_cart(JSON.parse(data), true);
			});
			$(this).text('Добавлено');
			$(this).css({

				'font-size': '12px',
			    'padding-left': '5px',
			    'padding-right': '5px',
			})
		}
		//update_cart(true);
		return false;
	});

    $('.btn-one-click').click(function(e) {

        e.preventDefault();

		if ($(this).attr('buy-item')) {

			$.ajax({
				type: 'post',
				url: '/basket/click',
				data: {
					id: $(this).attr('buy-item'),
					count : parseInt($('#count').val()),
					'_csrf-frontend': $('meta[name="csrf-token"]').attr('content')
				},
			})
				.done(function(data) {

					update_cart(JSON.parse(data), true, true);
				});
		}
    });

	window.reload_delete = function(bool) {

		$('.delete').click(function(event) {

			$.ajax({
				type: 'post',
				url: '/basket/remove',
				data: {
					product: $(this).attr('del-id'),
					'_csrf-frontend': $('meta[name="csrf-token"]').attr('content')
				},
			})
			.done(function(data) {

				update_cart(JSON.parse(data), true);
			});

			return false;
		});
	}
	reload_delete();
	
	
	
	window.reload_update = function(bool) {
		
		$('.quantity').change(function(){

            var isOneClick = $(this).closest('#one-click').length ? true : false;

			$.ajax({
				type: 'post',
				url: '/basket/' + (isOneClick ? 'click' : 'update'),
				data: {
					id: $(this).attr('item-id'),
					count: $(this).val(),
					'_csrf-frontend': $('meta[name="csrf-token"]').attr('content')
				},
			})
			.done(function(data) {

                update_cart(JSON.parse(data), true, isOneClick);
			});

			return false;
		})
	}
	
	reload_update();
});

function update_cart(data, bool, isOneClick, isPop){

	var q = data.calculatedBasket.count,
		sum = data.calculatedBasket.sum;

	$('#cart-q').text(q);
	$('#mini-basket-count').text(q);
	$('#cart-summ').text(sum);
	$('#mini-basket-sum').text(sum);

	window.bottomPanelBasketCount = q;

	if (q) {
		$('.bottom-panel').show();
	}


	function declOfNum(number, titles, id) {
		var number = parseInt(number),
			cases = [2, 0, 1, 1, 1, 2];
		if (!id) return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
		$('#' + id).text(titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ]);
	}

	var basketHTML = '';

	if (data.products.length) {

		basketHTML = '\
			<table> \
				<thead> \
					<tr> \
						<th class="basket-mobile-show"></th> \
						<th style="width: 100px;">фото</th> \
						<th class="align-center">наименование товара</th> \
						<th style="width: 200px;">количество</th> \
						<th class="basket-mobile-hide">цена</th> \
						<th class="basket-mobile-hide">сумма</th> \
						' + (isOneClick ? '' : '<th class="basket-mobile-hide"></th>') + ' \
					</tr> \
				</thead> \
			<tbody>';

		for (var i in data.products) {

			basketHTML += ' \
				<tr class="basket_item"> \
					<td class="basket-mobile-show"><a href="" del-id="' + data.products[i].id + '" class="delete"></a></td> \
					<td><img src="' + data.products[i].preview + '" alt=""></td> \
					<td class="align-center"> \
						<span>Артикул: <span class="articul">' + data.products[i].articul + '</span> \
						</span> \
						<br> \
						<h4><a href="/katalog/'+ data.products[i].category.slug +'/' + data.products[i].slug + ' " target="_blank">' + data.products[i].name + '</a></h4> \
					</td> \
					<td> \
						<div class="new-product-count"> \
							<div> \
								<span class="count-minus">–</span> \
								<input type="text" class="quantity" id="' + data.products[i].id + '_quantity" min="' + data.products[i].min_count + '" max="99999" item-id="' + data.products[i].id + '" value="' + data.fullBasket[data.products[i].id].count + '" onchange="if(parseInt($(this).val()) < parseInt($(this).attr(\'min\'))) { $(this).val($(this).attr(\'min\')); } else if(parseInt($(this).val()) > parseInt($(this).attr(\'max\'))) { $(this).val($(this).attr(\'max\')); }"> \
								<span class="count-plus">+</span> \
							</div> \
						</div> \
					</td> \
					<td class="row-price basket-mobile-hide"> \
						' + (data.fullBasket[data.products[i].id].sale ? '<i>' + data.fullBasket[data.products[i].id].sale + '</i>' : '') + ' \
						' + data.fullBasket[data.products[i].id].price + ' \
					</td> \
					<td class="basket-mobile-hide">' + data.fullBasket[data.products[i].id].sum + '</td> \
					' + (isOneClick ? '' : '<td class="basket-mobile-hide"><a href="" del-id="' + data.products[i].id + '" class="delete"></a></td>') + ' \
				</tr> \
			';
		}

		basketHTML += '</tbody></table>';

        if (!isOneClick) {

            if (data.calculatedBasket.minOrder || data.calculatedBasket.discount) {

                basketHTML += '<table class="to-hide"><tr><td></td></tr></table>';

                basketHTML += '<table class="price-description to-hide"> \
                    <tr> \
                        <td>Товаров (' + data.calculatedBasket.count + ' шт)</td> \
                        <td>' + (data.calculatedBasket.sum + data.calculatedBasket.discount) + ' руб.</td> \
                    </tr> \
                ';

                if (data.calculatedBasket.discount) {

                    basketHTML += ' \
                        <tr> \
                            <td>Скидка</td> \
                            <td style="color: #b31b4a;">-' + data.calculatedBasket.discount + ' руб.</td> \
                        </tr> \
                    ';
                }

                if (data.calculatedBasket.minOrder) {

                    basketHTML += ' \
                        <tr> \
                            <td>Розничная наценка ' + data.calculatedBasket.minOrder.percent + '%</td> \
                            <td class="min-price"><i class="hint" data-hint="new-min-order" original-title="">Подробнее</i></td> \
                        </tr> \
                    ';
                }

                basketHTML += ' \
                	</table> \
                    <div class="clearfix"></div> \
                    <div class="row to-hide"> \
                        <div class="row-itogo new-row-itogo"> \
                            <span>итого</span>' + (data.calculatedBasket.minOrder ? data.calculatedBasket.minOrder.sum : data.calculatedBasket.sum) + ' <i>руб.</i> \
                        </div> \
                    </div> \
                ';

                basketHTML += '\
                    <div class="row to-hide-basket"> \
                        <div class="row-itogo"> \
                            <span>итого</span>' + sum + ' <i>руб.</i> \
                        </div> \
                    </div> \
                ';

                if ($('#new-min-order').length) {

                    $('#new-min-order').html(' \
                        <p class="min-order-title">Вы не набрали заказ на сумму 5 000 руб. по минимальной закупке.</p> \
                        <p class="min-order-title">Что бы избежать наценки <strong>' + (data.calculatedBasket.minOrder ? data.calculatedBasket.minOrder.percent : '' ) + '%</strong>, Вы можете добавить товаров на сумму <strong>' + (5000 - data.calculatedBasket.sum) + '</strong> руб.</p> \
                    ');
                }
            }
            else {

                basketHTML += ' \
                    <div class="row"> \
                        <div class="row-itogo"> \
                            <span>итого</span>' + sum + ' <i>руб.</i> \
                        </div> \
                    </div> \
                ';
            }

        }
	}
	else {

		basketHTML = '<div style="text-align: center;">В вашей корзине пусто? Это не страшно! <a style="font: 14px G-medium" href="https://super-opt.ru/hity-prodazh">Вернуться к покупкам</a></div>';
	}

	if (!isOneClick) {

        $('#move').html(' \
                <h3>В Вашей корзине '+q+' '+declOfNum(q, ["товар","товара","товаров"]) + '</h3> \
                <div id="user_basket">' + basketHTML + '</div> \
                <table> \
                    <tr> \
                        <td><a href="" id="continue" class="new-full-btn grey" >Продолжить покупки</a></td> \
                        <td><a href="/korzina" class="new-full-btn red" >перейти в корзину</a></td> \
                    </tr> \
                </table> \
            ');



    }
    else {

        $('#move').html(' \
                <div  id="one-click"> \
                    <h3>КУПИТЬ В ОДИН КЛИК</h3> \
                    <div id="user_basket">' + basketHTML + '</div> \
                    <h4>Контактные данные</h4> \
                    <div class="cart-form"> \
                        <form action="/form/one-click-form" method="post" class="clearfix" name="one-click-form" id="order"> \
                            <div> \
                                <label for="cart-name">Имя</label> \
                                <input data-validate-field="1:string" type="text" name="name" class="input-text" id="cart-name" placeholder="Иванов Иван Иванович" value=""> \
                            </div> \
                            <div> \
                                <label for="cart-phone">Телефон</label> \
                                <input data-validate-field="1:string" type="text" id="cart-phone" class="input-text" title="Международный, государственный или местный телефонный номер" name="phone" placeholder="+7(910)000-00-00" value=""> \
                            </div> \
                            <div> \
                                <label for="cart-mail">E-mail</label> \
                                <input data-validate-field="1:email" type="text" name="email" id="cart-mail" class="input-text" placeholder="ivanov@mail.ru" value=""> \
                            </div> \
                            <input type="hidden" name="count" value="' + data.calculatedBasket.count + '"> \
                            <input type="hidden" name="price" value="' + data.calculatedBasket.sum/data.calculatedBasket.count + '"> \
                            <input type="hidden" name="product" value="' + $('.btn-buy').attr('buy-item') + '"> \
                            <input type="hidden" name="_csrf-frontend" value="' + $('meta[name="csrf-token"]').attr('content') + '"> \
                            <button type="submit" onclick="metrika.reachGoal(\'one-click-order\'); return true;" class="full-btn red basket-preloader"><span>оформить заказ</span><img class="btn-preloader-img" src="partner/images/loader.gif" alt=""></button> \
                        </form> \
                    </div> \
                </div> \
            ');
    }

	if (data.calculatedBasket.minOrder) {

		$('#move').append(' \
				<div class="row basket-description-separator"> \
					  <table> \
						  <tr> \
							  <td><img src="/img/new-min-order-icon.png" style=""></td> \
							  <td>Вы не набрали заказ на минимальную сумму 5 000 руб.<br />Что бы избежать розничной наценки ' + data.calculatedBasket.minOrder.percent + '%, добавьте товары на сумму ' + (5000 - data.calculatedBasket.sum) + ' руб.</td> \
						  </tr> \
					  </table> \
				</div> \
			');
	}


	if ($('#user_basket').length) {

		$('#user_basket').html(basketHTML);
	}

	if ($('.hint').length) {

        $('.hint').tipsy({
            html: true,
            opacity: 0.9,
            title: function() {
                return $('#' + $(this).attr('data-hint')).html();
            }
        });
    }



	$('#continue').click(function (e) {

		e.preventDefault();

		$('.fancybox-close').click();
	});

	if (bool) {

		if (!$('#move').is(':visible')) {

			$('#call_move').click();
		}

		reload_delete(true);

		reload_update(true);
	}


}
