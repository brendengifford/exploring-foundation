#Foundation with Sass
----


Set Up Notes
----

Installing it is tricky, but not impossible. You have to have a bunch of stuff already installed for it to work; Ruby, NodeJS, Git, Bower, Compass, Sass, and Grunt-CLI.

You can also use Libsass & Grunt instead of Compass, but I chose to use Compass as that seemed easiest and most reliable (Libsass is not completely up to date with Sass).

Here's more info: http://foundation.zurb.com/docs/sass.html

Once you have all of that installed, you can run `gem install foundation` to install their CLI.

Then you create a project with `foundation new PROJECT_NAME`.

Creating a new project will create a directory with whatever the PROJECT_NAME is. Also, if Git is already tracking the directory that you install Foundation into, you'll need to cd into that folder and remove the .git/ directory that comes with Foundation. 

Be sure to run Compass after the new poject install: `bundle` then `bundle exec compass watch`. Otherwise the Sass won't compile and you'll get no styles in the browser.

If the bower_components directory disappears and Compass shit the bed. Try running `foundation update` in the project directory.

**Modernizr**

Foundation includes Modernizr, which helps with compatability with older browsers. The entire library is included by default in the header, but it doesn't look like that's the best way to use it according to this video: https://www.youtube.com/watch?v=dXDSzYu_bwc Basically, you should just go to the Modernizr website and click off the style or whatever you want it to check for and copy the code generated at the bottom, then paste into the app.js file. Otherwise there's another http request for an entire library that may not be needed.

**Compatibility between Mac and Windows**

Getting everything set up on Windows was pretty easy, I was able to install all of the dependencies without issue in my Git Bash Shell, then pulled the Foundation branch which pulled everything down EXCEPT the bower_components folder which is set to be ignored in .gitignore. To recreate it, I ran `bower install foundation`. I also had to install bundler since that isn't already in Ruby I guess... `gem install bundler`. Then I was able to get compass to start watching the folder with `bundle` then `bundle exec compass watch`.

**Notes on Cloning this Branch**

I'm realizing it's kind of a pain to see these files do anything so thought I should write this up. If you clone this branch and want to see these things work, you'll need to install Ruby, NodeJS, Git, Bower, Compass, Sass, and Grunt-CLI. Once those are installed, clone the repo with Git and run `bower install foundation` in the foundation-sass/ and the drugstore/ directory. Then run `bundle` and `bundle exec compass watch` in each and view in a web browser. Note, the Interchange example in foundation-sass/sandbox.html requires a web server to run. You can use WAMP for a local web server, then open the files using that. 

Okay, let's actually build something
----

I'll be going through their documentation looking for stuff relevent to what we want to build and adding examples to sandbox.html. If you want to see what I'm talking about, just `git pull` this branch and open it up in a web browser.

**Settings**

I should mention this first, they have a _settings.scss file (find in the scss folder) which is basically their _foundation.scss file, but with everything commented out. Then if you want to tweak one of their styles, you come into the _settings.scss file and un-comment the line you want to change. That will then override the foundation style, but won't actually alter it. Neat idea.

The SCSS then compiles to a folder called stylesheets, but that folder doesn't show up in the Sublime Text side bar. That kind of weirded me out for a sec, but that's good because the compiled CSS shouldn't be touched. Note, you can write regular CSS in an SCSS file and it will compile fine. (*update:* The folder shows up fine in windows, but anyway don't need to touch it)

Here's a breif run-down on the important sections

* c. Global: This section is where you edit fonts, colors, border radius, inset shadow and shiny edges.

* d. Media Query Ranges: Edit where your media breakpoints are. I go into this more further down.

* e. Typography: Goes deeper into fonts, which fonts are used in which section or tag. Font family and size for `h`, `p`, `code`, `a` tags, line-height, block-quote borders, etc.

* The rest of the sections are specific to the element being used. For example, I changed the Lightbox background in the "07. Clearing" section. 

Note, the universal settings are listed by alpha, while the specific settings are by decimal.

**The Grid**

Foundation works in a grid system with `.row` and `.columns` classes. The `.row` can be any height and looks like it can even be used as a page-wrapper class. The `.columns` class works in conjunction with `large-n`, `medium-n`, and `small-n`, where `n` is the number of columns for that break point. For example, if you have an element that will take up 6 columns on a large window, 8 columns on a medium, and 12 on a small, you'd give it a class of `large-6 medium-8 small-12 columns` (actually, you don't need the small-12 columns as it'll be 12 columns by default, it appears).

If you have a row that you want smaller than 12 columns, you can specify the columns you want, then you have the option to center the columns by adding a class of `small-centered` to your `column` (or `large-centered` if you only want it centered on large screens).

Or you can just ofset it with classes like `large-offset-1` and `small-offset-3` that will just push it over that many columns (from the left).

There is also `block-grid` styles that you can use by assigning classes like `small-block-grid-2 medium-block-grid-4 large-block-grid-8` to the LIST TYPE (ul) of a LIST of block elements (li). That will tell each element within the `block-grid` to line up 8 across on a large screen, 4 across on the medium size and 2 on the smallest.

You can remove the space between columns by adding the `collapse` class to the `row`.

**Media Queries**

You can change where the media break-points are by editing the _settings.scss file under "d. Media Query Ranges". Then, you can use the @media mixin to adjust an elements style for each range, like so:

	body {
		@media #{$small-up} { 
	  		background: red;
		} 
		@media #{$medium-up} { 
	  		background: orange;
		} 
		@media #{$large-up} { 
		  	background: yellow; 
		} 
	}

The `-up` part means that anything larger than that will inherit the style unless it's specifically overwritten. You can also use `-only` for that style to apply only to that break point. 

That also works with the showing/hiding of elements for certain break points. The class `show-for-medium-only` will only show on medium screens, while `show-for-medium-up` will show on medium screens and anything larger. Similarly, `hide-for-small-only` will hide an element on only small screens. If you still want the content readable for screen readers, use `hidden` and `visible` instead of `show` and `hide`.

**Interchange - More Responsive Goodies**

Interchange is just incredible. It allows you to swap out the content of an element per screen size break point. Also allows you to swap out the image src of an image or to swap out the background image on an element.

I want to look into this more, but research time is almost up! 

*UPDATE:*

Spent a little bit longer looking into it and came up with something pretty cool as an example of how interchange works. I made a CD Baby Store that will swap out which version it's using (full, album, or square) based on the screen size. Works pretty well and makes the CD Baby Store *actually* responsive!

Checkout sandbox.html to see it, but it needs to be on a web server to work. 

**Utility Classes**

Pretty easy to figure out, they have `clearfix`, `left`, `right` (floats), `radius` for rounded corners and `round` for no corners, then `text-left`, `text-right`, etc. for text-align stuff (also works with size, e.g. `medium-only-text-left`). They also have `hide` to hide an element.

**Icon Fonts**

They have icon fonts for Foundation, but they don't come with it for some reason. Anyway, you can get them here: http://zurb.com/playground/foundation-icon-fonts-3

Unzip the file and move it to the project folder, then add `<link rel="stylesheet" href="foundation-icons/foundation-icons.css" />` to the `<head>` of the html pages.

You can now add, for example: `<i class="fi-burst-new"></i>` to include an icon, where the class name is the name of the icon. Find a full list of icons in the example.html file that comes in the foundation-icons folder.

**Navigation**

There are a few navigation options, they all look boring and businessy, but the styles are probably easy to overwrite. 

The Offcanvas is pretty cool. Used in conjunction with `show-for-small-only`, it could be a good solution for mobile navigation. 

There's also a Top Bar navigation that is exactly what it sounds like, just a bar across the top that you can put navigation links in, including dropdowns. It stick to the top of the screen as you scroll down, or you can just have it at the top.

A few others they have are:
- Side Nav, which is a typical list style navigation. 
- Magellan Sticky Nav, which links to sections of the page and scrolls down to them while staying stuck to the top.
- Sub Nav, good for showing different states of a page, different sorting options or filters for instance.
- Bread Crumb, you know, bread crumbs.
- Pagination, and you also know this.

I'd also like to throw in that Button Groups look like they'd work well for navigation, although they're separate from the navigation section in the docs.

There are also Tabs, which are used to switch through small chunks of content quickly. Not really navigation, but pseudo navigation anyway so I'll mention it here.

**Carousel Slider**

Their default slider called Orbit has been depreciated. They recommend using [Slick Carousel](http://kenwheeler.github.io/slick/) which looks pretty active and easy to implement. They give some reasons why they don't want to continue to develop their slider, but it basically comes down to they don't want to continue to develop for something there are already so many easy options for that have all the features they did. Makes sense. 

They also mentioned these:

- [Owl Carousel](http://www.owlgraphic.com/owlcarousel/)
- [Wow Slider](http://wowslider.com/)
- [Amazing Slider](http://amazingslider.com/)
- [Mighty Slider](http://mightyslider.com/#introducing-top)
- [bxSlider](http://bxslider.com/)
- [And all of these](http://tympanus.net/codrops/2011/02/18/20-unique-and-creative-image-sliders/)

I think they were trying to make their point... Whatever functionality we're looking for, we should be able to find it in one of these plug ins. Slick Carousel, looks good on first glance. I might come back and try to experiment with that.

Yeah, Slick Carousel is super easy to set up. Took me about 10 minutes.

Stuff Possibly Not Needed for This Project
----

...but checked it out anyway.

**Clearing Lightbox**

I'm not sure what the 'clearing' part means. It's a lightbox that looks pretty terrible at first, but with some styling can come out okay. 

I like that it's responsive, the carousel goes away on mobile. I don't like that the thumbnails just get dumped to the bottom left. Dunno if there's a way to center them maybe? Also, takes forever to load the first time (forever being a couple of seconds).


**Flex Video**

Pretty easy, just wrap the iframe in a `div` with `class="flex-video"`. I also liked wrapping that `.flex-video` div in a div with `class="large-8 medium-10 columns small-centered"` so the video wouldn't take up the whole screen on a large or medium screen. 

I came across [this gist](https://gist.github.com/twoSeats/7986293) which is supposed to automatically wrap iframes in `.flex-video`, but couldn't get it to work. We'll just have to manually wrap the massive amount of videos we'll be embedding like peasants.

**Forms**

Nothing too crazy, use the `row` and `columns` classes to arrange the form elements. Use `postfix` or `prefix`, in conjunction with `collapse` on the `row` div to attach a button or label to an input field. Use `prefix-radius` and `prefix-round` if the input fields are radiused (is that a word?) or rounded.

There are styles for error states as well. Use the class `error` on an element to give it those styles. Then probably `hide` it and have a validation script generate the error state by setting it to `show` or...

**Form Validation**

Oh whatd'ya know, they have a validation script too. They call it Abide Validation. To use it, just add the `data-abide` attribute to the `form` tag, then add a `required` attribute to any input that's required. 

To restrict input type, use an attribute `pattern=[P]` where 'P' is the pattern type that the input needs to match (alphabetic only or numeric only for example). See [the documentation](http://foundation.zurb.com/docs/components/abide.html) for a full list of available patterns. Inputs with the `type` attribute set to `email` or `url` will have the patterns applied automatically. 

Set a confirmation field by using the attribute `data-equalto="#id"`, where #id is the id of the field you're confirming. 

And yep, error messages are added by using a `small` tag with an `error` class as a sibling of the input tag. They kind of suck because they push the form down when they are displayed. The margin on the bottom of inputs goes away on invalid fields, so I bet it's supposed to make room for the error message or something, but I couldn't get it to work right. The error does change the label color which is pretty decent.

In order for any of this to work, you need to add the foundation.abide.js file to the bottom of the HTML page, *after* where the foundation.js file is.

	<script src="js/foundation/foundation.js"></script>
	<script src="js/foundation/foundation.abide.js"></script>

Another note on using their validation, when the form is submitted, you have to use their callbacks in order to have it fire any custom JavaScript (like swapping the form out for a Thank You message). 

Example:

	$('#myForm')
	  .on('invalid.fndtn.abide', function () {
	    var invalid_fields = $(this).find('[data-invalid]');
	    console.log(invalid_fields);
	  })
	  .on('valid.fndtn.abide', function () {
	    console.log('valid!');
	  });


**Joyride**

This is a cool little thing that'll take you on a tour of a site. Good for teaching how to use something.

This is the HTML they add with JS, good to know for styling purposes

	<div class="joyride-tip-guide">
	  <span class="joyride-nub top"></span>
	  <div class="joyride-content-wrapper">
	    <p>Hello and welcome to the Joyride documentation page.</p>
	    <a href="#" class="small button joyride-next-tip">Next</a>
	    <a href="#close" class="joyride-close-tip">&times;</a>
	  </div>
	</div>

To set it up, add a list at the bottom of your page, just before the closing `</body>` tag (I put it before the JS though, dunno if it *really* matters too much). It can be `ol` or `ul`, the example uses `ol` which I like for this. 

Give the list a `class="joyride-list"` and a `data-joyride` attribute. Then give each li a `data-id="stop"` where "stop" is the id of the element that the tour will go to (if you don't add a stop, it will just be a modal window). You can add other options as in the example (for a full list of options, see [the documentation](http://foundation.zurb.com/docs/components/joyride.html))

Example:

	<!-- At the bottom of your page but inside of the body tag -->
	<ol class="joyride-list" data-joyride>
	  <li data-id="firstStop" data-text="Next" data-options="tip_location: top; prev_button: false">
	    <p>Hello and welcome to the Joyride documentation page.</p>
	  </li>
	  <li data-id="numero1" data-class="custom so-awesome" data-text="Next" data-prev-text="Prev">
	    <h4>Stop #1</h4>
	    <p>You can control all the details for you tour stop. Any valid HTML will work inside of Joyride.</p>
	  </li>
	  <li data-id="numero2" data-button="Next" data-prev-text="Prev" data-options="tip_location:top;tip_animation:fade">
	    <h4>Stop #2</h4>
	    <p>Get the details right by styling Joyride with a custom stylesheet!</p>
	  </li>
	  <li data-button="End" data-prev-text="Prev">
	    <h4>Stop #3</h4>
	    <p>It works as a modal too!</p>
	  </li>
	</ol>

Then, go through the document and the id's to the appropriate stops. 

Next, add the JS files to the bottom of the document, *below* the foundation.js:
	
  	<script src="bower_components/foundation/js/foundation.min.js"></script>
	<script src="js/foundation/foundation.joyride.js"></script>
	<script src="js/vendor/jquery.cookie.js"></script> <!-- Optional -->

And you need to initialize it with:

	<script>
	  $(document).foundation('joyride', 'start');
	</script>

Alternatively, you could have a button that when clicked, would call that code to initialize the function.

I should also mention that you need to set the cookies in the initialization, if you want to use them (I think so that the tour doesn't start twice or something? I dunno). 

You can have a button initialize the tour, but you have to call the start function on a div that wraps around the list.

	$('.joyride-btn').click(function(){
		$("#joyride-wrap").foundation('joyride', 'start');
	});

**Modal Window**

The basic modal window works pretty well and is easily set up by adding the `data-reveal-id="id"` where "id" is the id you give the modal div. You'll also give the modal div a `class="reveal-modal"` and `data-reveal` attribute. Then have an anchor tag with `class="close-reveal-modal"` for your close button.

For a video modal, same thing, except slap a `large` class on the modal div, then use the `flex-video` class on a wrapper div with the iframe inside that. Pretty easy.

**Alerts**

Default styling for some alert boxes. Add a `data-alert` attribute to a div, then give it a class of `alert-box` for an alert with the primary color. Add `success`, `warning`, `info`, `alert`, or `secondary` classes for different types of alerts. Also, include an `a` tag in the div with a `close` class so you can close the alert.

**Tooltips**

Have a little tooltip pop up when you hover over text. Wrap the hoverable text in a `span` tag with a `data-tooltip` attribute and a class of `has-tip`, then give it a `title="tip"` where "tip" is the text you want in the pop up. Change the direction of the pop up with `tip-top`, `tip-right`, `tip-left`. The default is `tip-bottom`.


**Dropdowns**

You can attach a dropdown to pretty much anything, link, button, whatever. Just give it an attribute `data-dropdown="id"` where "id" is the id you give to the element that's dropping down (like a list for links or a div for content). Then give the drop down element an attribute `data-dropdown-content` and a class of `f-dropdown`. You can also give it other classes like `large` or, well here's copy/paste:

Available class options:

- `tiny`: Make the dropdown have a max-width of 200px
- `small`: Make the dropdown have a max-width of 300px
- `medium`: Make the dropdown have a max-width of 500px
- `large`: Make the dropdown have a max-width of 800px
- `mega`: Make the dropdown go full 100% width
- `content`: Add padding inside the dropdown for better-looking content

Change the direction of the drop..um..down by adding `data-options="align:top"` to the link or button they click to initate it (or left or right, down is default). 

Add `data-options="is_hover:true"` to it if you want the dropdown on hover.

You'll need to add the JS file *below* the foundation.js: 

	<script src="js/foundation/foundation.js"></script>
	<script src="js/foundation/foundation.dropdown.js"></script>

**Pricing Tables**

Use any or all of these classes inside a ul with `class="pricing-table"`

- `li.title`: Creates the styles for a title.
- `li.price`: Add a price that stands out.
- `li.description`: If you need to describe the plan, add this.
- `li.bullet-item`: To call out features, use this list item.
- `li.cta-button`: To add a button inside a list item, use this.

**Accordion & Tabs**

The Accordion and Tabs navigation feature use `dl` and `dd` tags to wrap and break up the content. 

For accordion, `data-accordion` gets added to the dl along with `class="accordion"`, then `class="accordion-navigation"` gets added to each dd tag. Inside the dd tag, a link to the id of the content of that panel. The panel should have a class of `content` with an optional open one having a class of `active`.

Tabs are similar except the dl>dd list goes before the content and the content is wrapped in a `tabs-content` class div.

**Equalizer**

This creates equal height columns in a row.

Use `data-equalizer` on the `.row` and `data-equalizer-watch` on each element to equalize.

Include this at the bottom of the page *after* the foundation.js

	<script src="js/foundation/foundation.equalizer.js"></script>

**You made it!**
