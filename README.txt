My Source Files 
/ backend folder
	- .env
	- data.js
	- server.js
	- utils.js

	/ models folder
		- orderModel.js
		- productModel.js
		- userModel.js
	/ routes folder
		- orderRoutes.js
		- productRoutes.js
		- seedRoutes.js
		- userRoutes.js
/ frontend folder
	/ public folder
		/ images folder - contains products images and icon images
	/ src folder
		- App.js
		- index.js
		- index.css
		- Store.js
		- utils.js

		/ components folder
			- CheckoutProgress.js
			- Footer.js
			- LoadingBox.js
			- MessageBox.js
			- Product.js
			- Rating.js
			- SearchBar.js
		/ pages folder
			- CartPage.js
			- HomePage.js
			- OrderHistoryPage.js
			- OrderPaymentPage.js
			- OrderSummaryPage.js
			- PaymentMethodPage.js
			- ProductPage.js
			- ProfilePage.js
			- RecieptPage.js
			- SearchPage.js
			- ShippingAddressPage.js
			- SigninPage.js
			- SignUpPage.js

System should work with any web browser or operating sstem but it was developed and tested with Google Chrome as the web browser on a Windows 10 PC.
If you have any issues running the code, please sent me a message. It has been tested on multiple devices and any errors that occur is due to version incompatibility due to the large number of modules and packages being used.

Programming Languages used:
- JavaScript
- CSS/html

Installation:
- The latest version (v6.0.0) of MongoDB community server edition must be installed from the official website at https://www.mongodb.com/try/download/community?tck=docs_server
- The latest version of Node.js (v16.16.0) must be installed from the official website at https://nodejs.org/en/download/

Run:
- **** YOU WILL NEED ACCESS TO THE INTERNET ****
- Open up two terminals and travel to the project folder using both terminals
- For the first terminal, travel to the 'backend' folder and enter the command 'npm start'
- For the second terminal, travel to the 'front' folder and enter the command 'npm start'
- If the backend is successfully connected to the database and the frontend is compiled successfully, a new tab in your web browser should be opened.
- If a new tab is not automatically opened, enter the following URL into your web browser 'http://localhost:3000'

Information necessary for testing:
    User Account email: admin@unlockedphonestore.ca
    User Account password: password

    PayPal SandBox test account email: sb-re9ae19150040@personal.example.com
    PayPal SandBox test account password: N29b^.nK

    Generated Credit Card details for testing (the other input fields can be whatever you want as long as they are of the valid format):
    Card Type: Visa
    Card Number: 4032039381548983
    Expiration Date: 06/24
    CVV: 978

Tasks for testing the system:
- Sign in using an existing user account or create a new user account
- Access the user profile page using the dropdown menu on the right side of the header and check if the user account information is correct 
- Subscribe to the store newsletter using the form in the footer
- Add a product(s) to the item cart 
    - add product(s) from one of the recommended products on the homepage 
    - or add product(s) from the product catalog page 
        - by clicking on the 'browse all products' hyperlink 
        - or by clicking on the products tab in the header
        - or by clicking on the product catalog pague hyperlink in the sidebar (open sidebar by clicking on the icon next to the logo in the header)
- Search for a specific product using the search bar in the header. I recommend trying queries such as 'google', 'samsung', 'apple', 'iphone', 'galaxy'
- Narrow down the search results using the filters on the left side of the search results page
- When you have items in shopping cart, travel to the shopping cart page by clicking on the shopping cart icon or the text in the header and click on the proceed to checkout button.
- Complete the checkout process
    - Fill out the shipping address forms
    - Select payment method
    - You can use the edit hyperlinks on the order summary page to change shipping information, payment method, or the items in the shopping cart.
    - Apply the coupon code 'FREESHIPPING' into the coupon code form on the order summary page.
    - On the payment page, click on either the PayPal button or 'the debit or credit' button to start payment process. Fill out the required information using the tester PayPal account or tester credit card information as mentioned above.
    - Upon successful payment, you will be redirect to to the reciept page
- Access the order history page using the dropdown menu on the right side of the header to view the order details. 
