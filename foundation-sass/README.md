#Foundation with Sass
----


Usage Notes
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

