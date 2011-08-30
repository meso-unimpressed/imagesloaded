module('ImagesLoaded');

test('load IMG-Tags', function () {
	stop(1000);

	var img = $('<span><img src="assets/xraysun.gif" /></span>');
	img.hide();
	img.imagesLoaded(function (images, bgimages) {
		start();
		strictEqual(images.length, 1, 'should have loaded exactly one image');
		strictEqual(bgimages.length, 0, 'should have loaded exactly zero backgrounds-images');
		$('#qunit-fixture').append(img);
		img.show();
	});
});

test('load stylesheet-background-images when in DOM', function () {
	stop(4000);

	var html = $('<div><span class="bg-preload stylesheetbg"></span></div>');
	html.hide();
	$('#qunit-fixture').append(html);
	html.imagesLoaded(function (images, backgroundimages) {
		start();
		strictEqual(images.length, 0, 'no regular images loaded');
		strictEqual(backgroundimages.length, 1, 'one background-image loaded');
		html.show();
	});
});

test('load inline-background-images, even though not in DOM', function () {
	stop(4000);

	var html = $('<div><div class="bg-preload" style="background-image:url(assets/warty-final-ubuntu.png);"><span>test</span></div></div>');
	html.hide();
	html.imagesLoaded(function (images, backgroundimages) {
		start();
		strictEqual(images.length, 0, 'no regular images loaded');
		strictEqual(backgroundimages.length, 1, 'one background-image loaded');
		$('#qunit-fixture').append(html);
		html.show();
	});
});

