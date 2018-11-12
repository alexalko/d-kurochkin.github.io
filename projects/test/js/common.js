$(document).ready(function () {

	// Функция отвечающая за полную работу ячейки "ДО ПОВЫШЕНИЯ ЦЕНЫ ТОКЕНА ОСТАЛОСЬ"
	// Для кастомизации менять только те значения, что находятся в "changeable variables"

			// changeable variables START
			var monthsBefore = 9;
			var monthsAfter = 12;
			var newPriceContainer = $('.header_counter');
			// changeable variables END

			var variableYear = moment().format("YYYY");
			var variableMonth = moment().format("MM");
			var variableDay = moment().format("DD");
			var nextPriceUpDay = Math.floor(moment(getNewPriceDate(variableYear + variableMonth + variableDay)) / 1000);

			formatedDate();
			window.setInterval(function () {
					formatedDate();
			}, 1000);

			if (weeks === 0) {
					$('.timer_week').css("display", "none");
			}

			function getNewPriceDay(day) {
					var newDay = day;
					if (parseInt(newDay) < 11) {
							newDay = "01"
					}
					else if (parseInt(newDay) < 21) {
							newDay = "11"
					}
					else {
							newDay = "21"
					}
					return newDay;
			}

			function formatedDate() {
					var secondsToNextPriceUp = nextPriceUpDay - Math.floor(moment() / 1000);
					var hoursInGreenwich = moment().tz("Europe/London").format('H');
					var hoursHow = moment().format('H');

					amount = secondsToNextPriceUp + (hoursHow - hoursInGreenwich) * 3600;
					if (amount > 0) {
							weeks = Math.floor(amount / 604800);
							amount = amount % 604800;
							days = Math.floor(amount / 86400);
							amount = amount % 86400;
							hours = Math.floor(amount / 3600);
							amount = amount % 3600;
							mins = Math.floor(amount / 60);
							amount = amount % 60;
							secs = Math.floor(amount);

							$('.timer_week span').text(weeks);
							$('.timer_days span').text(days);
							$('.timer_hours span').text(hours);
							$('.timer_minutes span').text(mins);
							$('.timer_seconds span').text(secs);
					}
			}

			function getNewPriceDate(date) {
					var newYear = date.charAt(0) + date.charAt(1) + date.charAt(2) + date.charAt(3);
					var newMonth = date.charAt(4) + date.charAt(5);
					var newDay = date.charAt(6) + date.charAt(7);
					newDay = getNewPriceDay(newDay);

					if (newDay === "01") {
							newDay = "11";
					}
					else if (newDay === "11") {
							newDay = "21";
					}
					else if (newDay === "21") {
							newDay = "01";
							newMonth = (parseInt(newMonth) + 1).toString()
							if (newMonth.length === 1) {
									newMonth = "0" + newMonth;
							}
					}
					if (newMonth == "13") {
							newMonth = "01"
							newYear = (parseInt(newYear) + 1).toString()
					}
					var newDate = newYear + "-" + newMonth + "-" + newDay;
					return newDate;
			}

		$('.jsAdvantagesSlider').owlCarousel({
			items: 5,
			dots: false,
			nav: true,
			margin: 30,
			navText: ['<img src="../img/arrow-left-icon.png">', '<img src="../img/arrow-right-icon.png">']
		});

		$('.jsWaysSlider').owlCarousel({
			items: 4,
			dots: false,
			nav: true,
			margin: 50,
			navText: ['<img src="../img/arrow-left-icon.png">', '<img src="../img/arrow-right-icon.png">']
		});

});
