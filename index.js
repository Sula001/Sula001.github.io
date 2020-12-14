const getValuesFromForm = () => {
    const email = document.querySelector('.email').value
    const name = document.querySelector('.name').value
    const phone = document.querySelector('.phone').value
    const amount = document.querySelector('.amount').value

    return { email, name, phone, amount }
}

const pay = () => {	
	const { name, email, phone, amount } = getValuesFromForm()

    var widget = new cp.CloudPayments();
       widget.pay('auth', // или 'charge'
           { //options
               publicId: 'pk_fdccae37a72bb9f6744adf02f861e', //id из личного кабинета
               description: 'Тестовая оплата', //назначение
               amount: Number(amount), //сумма
               currency: 'RUB', //валюта
               invoiceId: '1234567', //номер заказа  (необязательно)
               accountId: 'nursik.ls@list.ru', //идентификатор плательщика (необязательно)
               skin: "mini", //дизайн виджета (необязательно),
               email,
               data: {
                   name,
                   phone,
                   email                  
               }
           },
           {
               onSuccess: function (options) { // success
                   //действие при успешной оплате
               },
               onFail: function (reason, options) { // fail
                   //действие при неуспешной оплате
               },
               onComplete: function (paymentResult, options) { //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
                   //например вызов вашей аналитики Facebook Pixel
               }
           }
       )
   };
   
document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('.form');

	form.addEventListener('submit', (e) => {
		e.preventDefault();
			
		pay()
	})
})

