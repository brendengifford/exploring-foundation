#Foundation with Sass
----


Usage Notes
----

Installing it is tricky, but not impossible. You have to have a bunch of stuff already installed for it to work; Ruby, NodeJS, Git, Bower, Compass, Sass, and Grunt-CLI.

Then you can run `gem install foundation` to install *their* CLI.

After that you create a project with `foundation new PROJECT_NAME`.

Note, creating a new project will create a directory with whatever the PROJECT_NAME is. Also, if Git is already tracking the directory that you install Foundation into, you'll need to cd into that folder and remove the .git/ directory that comes with Foundation. 

Holy crap I just wasted a ton of time because I forgot the last step. Be sure to run Compass after the new poject install: `bundle` then `bundle exec compass watch`.

So, it looks like they have a _settings.scss file which is basically their _foundation.scss file, but with everything commented out. Then if you want to tweak one of their styles, you come into the _settings.scss file and un-comment the line you want to change which overrides the foundation style, but doesn't actually alter it. Neat.

The SCSS compiles to a folder called stylesheets, but that folder doesn't show up in the Sublime Text side bar. That kind of weirded me out for a sec, but that's good because the compiled CSS shouldn't be touched. Note, you can write regular CSS in an SCSS file and it will compile fine.

