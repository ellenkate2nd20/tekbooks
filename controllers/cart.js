'use strict';

var book = require('../models/bookModel')
var category = require('../models/categoryModel')

module.exports = function(router)
{
	router.get('/', function(req, res)
	{
		var cart = req.session.cart;
		var displayCart = {items: [], total: 0};
		var total = 0;

		for(var item in cart)
		{
			displayCart.items.push(cart[item]);
			total += (cart[item].qty*cart[item].price);
		}

		displayCart.total = total;

		res.render('cart/index', {cart: displayCart});
	});

	router.post('/:id', function(req, res)
	{
		req.session.cart = req.session.cart || {};
		var cart = req.session.cart;

		book.findOne({_id: req.params.id}, function(err, books)
		{
			if(err)
				console.log(err);
			if(cart[req.params.id])
				cart[req.params.id].qty++;
			else
			{
				cart[req.params.id] = 
				{
					item: books._id,
					title: books.title,
					price: books.price,
					qty: 1
				}
			}
			res.redirect('/cart');
		});
	});

	router.post('/delete/:id', function(req, res)
	{
		delete req.session.cart[req.params.id];
		res.redirect('/cart');
		res.location('/cart');
	});
}