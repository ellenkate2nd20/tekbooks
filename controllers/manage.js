'use strict';

var book = require('../models/bookModel')
var category = require('../models/categoryModel')

module.exports = function(router)
{
	router.get('/', function(req, res)
	{
		res.render('manage/index');
	});

// MANAGE BOOK
	
	// show book
	router.get('/books', function(req, res)
	{
		book.find({}, {}, function(err, books)
		{
			if(err)
				console.log(err);

			var model = {books:books};
			res.render('manage/books/index', model);
		});
	});

	// add book form
	router.get('/books/add', function(req, res)
	{
		category.find({}, function(err, categories)
		{
			if(err)
				console.log(err);

			var model = {categories:categories};
			res.render('manage/books/add', model);
		});
	});

	// add book
	router.post('/books', function(req, res)
	{
		var title = req.body.title && req.body.title.trim();
		var category = req.body.category && req.body.category.trim();
		var author = req.body.author && req.body.author.trim();
		var publisher = req.body.publisher && req.body.publisher.trim();
		var price = req.body.price && req.body.price.trim();
		var description = req.body.description && req.body.description.trim();
		var cover = req.body.cover && req.body.cover.trim();

		// validation
		if(title == '' || price == '')
		{
			req.flash('error', 'Please fill out required fields');
			res.location('/manage/books/add');
			res.redirect('/manage/books/add');
		}

		if(isNaN(price))
		{
			req.flash('error', 'Price must be a number');
			res.location('/manage/books/add');
			res.redirect('/manage/books/add');
		}

		var newBook = new book(
		{
			title: title,
			category: category,
			author: author,
			publisher: publisher,
			price: price,
			description: description,
			cover: cover
		});

		newBook.save(function(err)
		{
			if(err)
				console.log('save error', err);

			req.flash('success', 'Book Added');
			res.location('/manage/books');
			res.redirect('/manage/books');
		});
	});

	// update book form
	router.get('/books/edit/:id', function(req, res)
	{
		category.find({}, function(err, categories)
		{
			book.findOne({_id: req.params.id}, function(err, books)
			{
				if(err)
					console.log(err);

				var model = {books: books, categories: categories};
				res.render('manage/books/edit', model);
			});
		});
	});

	// update book
	router.post('/books/edit/:id', function(req, res)
	{
		var title = req.body.title && req.body.title.trim();
		var category = req.body.category && req.body.category.trim();
		var author = req.body.author && req.body.author.trim();
		var publisher = req.body.publisher && req.body.publisher.trim();
		var price = req.body.price && req.body.price.trim();
		var description = req.body.description && req.body.description.trim();
		var cover = req.body.cover && req.body.cover.trim();

		// validation
		if(title == '' || price == '')
		{
			req.flash('error', 'Please fill out required fields');
			res.location('/manage/books/edit');
			res.redirect('/manage/books/edit');
		}

		if(isNaN(price))
		{
			req.flash('error', 'Price must be a number');
			res.location('/manage/books/edit');
			res.redirect('/manage/books/edit');
		}

		book.update({_id:req.params.id},
		{
			title: title,
			category: category,
			author: author,
			publisher: publisher,
			price: price,
			description: description,
			cover: cover
		}, function(err)
		{
			if(err)
				console.log('update error', err);

			req.flash('success', 'Book Updated');
			res.location('/manage/books');
			res.redirect('/manage/books');
		});
	});

	// delete book
	router.post('/books/delete/:id', function(req, res)
	{
		book.remove({_id:req.params.id}, function(err)
		{
			if(err)
				console.log('update error', err);

			req.flash('success', 'Book Deleted');
			res.location('/manage/books');
			res.redirect('/manage/books');
		});
	});

// MANAGE CATEGORY
	
	// show category
	router.get('/categories', function(req, res)
	{
		category.find({}, function(err, categories)
		{
			if(err)
				console.log(err);

			var model = {categories:categories};
			res.render('manage/categories/index', model);
		});
	});

	// add category form
	router.get('/categories/add', function(req, res)
	{
		res.render('manage/categories/add');
	});

	// add category
	router.post('/categories', function(req, res)
	{
		var name = req.body.name && req.body.name.trim();

		// validation
		if(name == '')
		{
			req.flash('error', 'Please fill out required fields');
			res.location('/manage/categories/add');
			res.redirect('/manage/categories/add');
		}

		var newCategory = new category(
		{
			name: name
		});

		newCategory.save(function(err)
		{
			if(err)
				console.log('save error', err);

			req.flash('success', 'Category Added');
			res.location('/manage/categories');
			res.redirect('/manage/categories');
		});
	});

	// update category form
	router.get('/categories/edit/:id', function(req, res)
	{
		category.findOne({_id: req.params.id}, function(err, categories)
		{
			if(err)
				console.log(err);

			var model = {categories: categories};
			res.render('manage/categories/edit', model);
		});
	});

	// update category
	router.post('/categories/edit/:id', function(req, res)
	{
		var name = req.body.name && req.body.name.trim();

		// validation
		if(name == '')
		{
			req.flash('error', 'Please fill out required fields');
			res.location('/manage/categories/edit');
			res.redirect('/manage/categories/edit');
		}

		category.update({_id:req.params.id},{name:name}, function(err)
		{
			if(err)
				console.log('update error', err);

			req.flash('success', 'Category Updated');
			res.location('/manage/categories');
			res.redirect('/manage/categories');
		});
	});

	//delete category
	router.post('/categories/delete/:id', function(req, res)
	{
		category.remove({_id:req.params.id}, function(err)
		{
			if(err)
				console.log('update error', err);

			req.flash('success', 'Category Deleted');
			res.location('/manage/categories');
			res.redirect('/manage/categories');
		});
	});
}