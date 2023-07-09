const openWin = (item, count = 1, callback) => {
  let newWindow = open(
    '/',
    'Buy sunglasses!',
    'width=353,height=411,top=center,right=center'
  );

  newWindow.document.write(`
	<div class="modal-contain">
		<div class="modal-content">

		<div class="right-side">
        <div class="left-side">

  Goats: ${
    /* prevent xss */
    Number(count)
  }, Total price: $${
    /* prevent xss */
    Number(item.coast)
  }
        
        </div>
				<!-- /mobile header -->

				<div class="inputs-contain">
					<input
						type="text"
						placeholder="XXXX"
						maxlength="4"
						class="card clear"
						autofocus
					>
					<input
						type="text"
						placeholder="XXXX"
						maxlength="4"
						class="card clear"
					>
          <input
						type="text"
						placeholder="XXXX"
						maxlength="4"
						class="card clear"
					>
          <input
						type="text"
						placeholder="XXXX"
						maxlength="4"
						class="card clear"
					>
				</div>
				<div class="inputs-contain second">
					<div class="cards-logo">
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
              height="15"
							class="mastercard clear"
							alt="mastercard"
						>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1280px-Visa_Inc._logo.svg.png"
							class="visa clear"
              height="15"
							alt="visa"
						>
					</div>
					<input type="text" placeholder="MM/YY" maxlength="4"
						class="date dont-clear"
					>
					<input type="password" placeholder="CVV" maxlength="3"
						class="cvv clear"
					>
				</div>
				<button class="buy-bttn">BUY</button>
				<div class="or-decoration"> - or - </div>
				<div class="buttons-contain">
					<button>
						<img
							src="https://upload.wikimedia.org/wikipedia/uk/f/ff/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%9F%D1%80%D0%B8%D0%B2%D0%B0%D1%8224.png"
							class="privat24-logo"
							
							alt="privat_24"
						>
					</button>
					<button>
						<img
							src="https://w7.pngwing.com/pngs/660/666/png-transparent-paypal-logo-payment-confinity-ebay-blue-angle-company.png"
							class="paypal-logo"
							
							alt="paypal_logo"
						>
					</button>
					<button>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/1024px-Apple_Pay_logo.svg.png"
							class="apple-pay-logo"
							
							alt="apple-pay_logo"
						>
					</button>
				</div>
			</div>
		</div>
	</div>

	<script>
		const cardFields = document.querySelectorAll( '.card' );
		const date = document.querySelector( '.date' );
		const cvv = document.querySelector( '.cvv' );

		cardFields.forEach( ( item, i ) => {
			item.addEventListener( 'input', () => {
				if( item.value.length >= 4 ){
					if( cardFields[i+1] !== undefined ){
						cardFields[i+1].focus();
					} else {
						date.focus();
					}
				}
			});
		});

		date.addEventListener( 'change', () => {
			if( date.value.length <= 4 ){
				const arr = date.value.split('');
				date.value = arr.map( ( item, i ) =>{
					if( i > 3 )
						return '';
					if( i === 2 )
						return '/' + item;
					return item;
				}).join( '' );
				cvv.focus();
				date.setAttribute( 'maxlength', 5 );
			} else {
				date.setAttribute( 'maxlength', 4 );
			}
		});

		date.addEventListener( 'input', () => {
			if( date.value.length >= 4 ){
				cvv.focus();
			}
		});

		document.querySelectorAll( '.clear' ).forEach( input => {
			input.addEventListener( 'input', () => {
				input.value = input.value.replace( /[^+\\d-]/g, '' );
			});
		});

		document.querySelector( '.dont-clear' ).addEventListener( 'input', e => {
			e.target.value = e.target.value.replace( /[^+\\d-/]/g, '' );
		});

		cardFields[0].focus();

		document.head.innerHTML = '<meta name="viewport" content="width=device-width, initial-scale=1"><style type="text/css">body.pay-modal-hidden{display:none}.modal-contain{position:fixed;top:0;left:0;z-index:9999;width:100%;height:100%;background-color:#fff;display:flex;justify-content:space-around;align-items:center}.inputs-contain{width:123.5%;padding:10% 0 0;display:flex;flex-direction:row;justify-content:space-around;margin:5% 0}.inputs-contain input{width:60px;height:87%;padding:1.69%;border-radius:5px;text-align:center;border:none;margin:0 .67%;max-height:35px;background-color:#efefef}.inputs-contain.second{justify-content:center;margin-top:5%;padding:0;height:7%}.close-bttn{width:123%;text-align:right;opacity:.6;background-color:transparent;border:none;padding-top:5%;margin-bottom:-7%}.close-bttn>img{width:14%}.modal-content{border-radius:15px;height:60%;min-height:340px;width:max-content;max-height:450px;-webkit-box-shadow:0 0 32px -4px rgba(0,0,0,.75);-moz-box-shadow:0 0 32px -4px rgba(0,0,0,.75);box-shadow:0 0 32px -4px rgba(0,0,0,.75);padding:48px 45px 0 35px;display:flex;flex-direction:row}.left-side,.product-info{flex-direction:column;display:flex}.product-info{width:100%;height:max-content;margin:auto 0}.product-info>*{width:80%;margin:20% 0}.product-info img{width:100%;margin:0 0 40%}.left-side{align-items:center;margin-right:3%}.left-side>*{width:100%}.right-side{display:flex;flex-direction:column;align-items:center;margin-left:3%}.or-decoration{color:#cecece;margin:5% 0}.buy-bttn{width:123%;border:1px solid red;border-radius:5px;background-color:#f50000;color:#fff;padding:3%;margin-top:10%;margin-bottom:0}.buttons-contain{width:100%;display:flex;justify-content:space-around;margin-bottom:2%}.buttons-contain>button>img{width:35px}.buttons-contain *{outline:0;border:none;background-color:transparent}.cards-logo{margin-right:14%;margin-top:2%}.cards-logo>img{height:15px}.visa{margin-right:2px}.mobile-info-header{display:none;width:120%;margin-bottom:-10px;margin-top:-20px;justify-content:space-between;flex-direction:column}.mobile-info-header>*{width:max-content;display:flex;align-items:center}._brend{font-weight:800}._model{font-weight:400;color:#ccc}._coast{text-align:center;font-weight:800}.unvalid-input{border:1px solid red}.load{opacity:.5}<style>';
	</script>
	`);

  const modalContain = newWindow.document.querySelector('.modal-contain');

  newWindow.document.body.addEventListener('click', (e) => {
    if (e.target === modalContain) {
      newWindow.close();
    }
  });

  newWindow.document
    .querySelector('.buy-bttn')
    .addEventListener('click', (e) => {
      if (item !== null) callback(item.id);
      e.target.classList.add('load');

      setTimeout(() => {
        newWindow.close();
      }, 100);
    });
};

export default openWin;
