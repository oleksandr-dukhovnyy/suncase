const openWin = ( item, count = 1, callback ) => {

	let newWindow = open( '/', '', 'width=353,height=411,top=center,right=center' );

	newWindow.document.write(`
	<div class="modal-contain">
		<div class="modal-content">

		<div class="right-side">
        <div class="left-side">
          
		  Goats: ${count}, Total price: ${item.coast} $
        
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

							class="mastercard clear"
							alt="mastercard"
						>
						<img
							src="https://investor100.ru/wp-content/uploads/2016/11/Visa.jpg"

							class="visa clear"
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

		document.head.innerHTML = '<link rel="stylesheet" href="./css/payModal.css">';
	</script>

	`);

	newWindow.document.querySelector( '.buy-bttn' ).addEventListener( 'click', e => {
		if( item !== null )
			callback( item.id );
		e.target.classList.add( 'load' );
		setTimeout( () => {
			newWindow.close();
		}, 1000 );
	});
	
}

export default openWin;