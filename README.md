Barteguiden-Web
===============

This is the repo for Barteguiden Webapp! 


#Setup

You'll need `npm`, `grunt`, `bower`, and `compass`. More info on installing can be found [here](http://www.google.com).

Clone the repo with

    git clone git@github.com:Studentmediene/Barteguiden-Web.git

`cd` into the directory and run

    npm install
    bower install
    grunt serve

This might take some time. Now, the site should be available at `http://localhost:9000/`

# Build

Before you build, please comment out ( // ) unnecessary Bootstrap SASS in `bower_components/bootstrap-sass-official/stylesheets/bootstrap/_bootstrap.scss` and remove unnecessary Bootstrap Javascript in `app/index.html`.

    grunt build

The minified files are now in the dist folder.
