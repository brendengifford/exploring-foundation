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

Holy crap I just wasted a ton of time because I forgot the last step. Be sure to run Compass after the new poject install: `bundle` then `bundle exec compass watch`. Otherwise the Sass won't compile and you'll get no styles in the browser.

So, just going through http://foundation.zurb.com/docs/sass-files.html - it looks like they have a _settings.scss file which is basically their _foundation.scss file, but with everything commented out. Then if you want to tweak one of their styles, you come into the _settings.scss file and un-comment the line you want to change which overrides the foundation style, but doesn't actually alter it. Neat.

The SCSS compiles to a folder called stylesheets, but that folder doesn't show up in the Sublime Text side bar. That kind of weirded me out for a sec, but that's good because the compiled CSS shouldn't be touched. Note, you can write regular CSS in an SCSS file and it will compile fine.

I don't know what just happened. All of a sudden the bower_components directory was gone and compass shit the bed. I ran `foundation update` in the project directory and all seems to be well again...

**Compatibility between Mac and Windows**

Getting everything set up on Windows was pretty easy, I was able to install all of the dependencies without issue in my Git Bash Shell, then pulled the Foundation branch which pulled everything down EXCEPT the bower_components folder which is set to be ignored in .gitignore. To recreate it, I ran `bower install foundation`. I also had to install bundler since that isn't already in Ruby I guess... `gem install bundler`. Then I was able to get compass to start watching the folder with `bundle` then `bundle exec compass watch`.

Okay, let's actually build something
----

I'll be going through their documentation and adding examples to sandbox.html. If you want to see what I'm talking about, just pull this branch and open it up in a web browser.


**The Grid**

Foundation works in a grid system with a `.row` class and `.columns` classes. The `.row` can be any height and looks like it can even be used as a page-wrapper class. The `.columns` class works in conjunction with `large-n`, `medium-n`, and `small-n`, where `n` is the number of columns for that break point. For example, if you have an element that will take up 6 columns on a large window, 8 columns on a medium, and 12 on a small, you'd give it a class of `large-6 medium-8 small-12 columns` (actually, you don't need the small-12 columns as it'll be 12 columns by default, it appears).

If you have a row that you want smaller than 12 columns, you can specify the columns you want, then you have the option to center the columns by adding a class of `small-centered` to your `column` (or `large-centered` if you only want it centered on large screens).

Or you can just ofset it with classes like `large-offset-1` and `small-offset-3` that will just push it over that many columns (from the left).

There is also `block-grid` styles that you can use by assigning classes like `small-block-grid-2 medium-block-grid-4 large-block-grid-8` to the LIST TYPE (ul) of a LIST of block elements (li). That will tell each element within the `block-grid` to line up 8 across on a large screen, 4 across on the medium size and 2 on the smallest.

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

**More Responsive Goodies - Interchange**

Interchange is just incredible. It allows you to swap out the content of an element per screen size. Also allows you to swap out the image src of an image based on the screen size or to swap out the background image on an element per screen size.

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

There's also a Top Bar navigation that is exactly what it sounds like, just a bar across the top that you can put navigation link in, including dropdowns. It stick to the top of the screen as you scroll down, or you can just have it at the top.

A few others they have are:
- Side Nav, which is a typical list style navigation. 
- Magellan Sticky Nav, which links to sections of the page and scrolls down to them while staying stuck to the top.
- Sub Nav, good for showing different states of a page, different sorting options or filters for instance.
- Bread Crumb, you know, bread crumbs.
- Pagination, and you also know this.

