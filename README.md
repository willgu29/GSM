Directions and how things work:

Step 1:  in command line ->  sudo npm install 
(this will create the node_modules folder)

Step 2: You'll need to install MongoDB on your mac. There is an installer. Should be easy. 

Step 3: After installing, run in command line -> sudo mongod 
	-> Keep this terminal open as that initiates the database.

Layout of project:

1. ReactViews act as client rendering. Create new files in src ->
babel ReactViews/src/ --watch --out-dir ReactViews/build/

(old: jsx src build --watch to link into build.)


2. Models include all mongoose models that will be used in index.js

3. node index.js to run server. will be in localhost:3000

4. templates are used server side to render views. The specific one I'm using is called handlebars (.hbs) (instead of html)

5. public folder includes libs, imgs, stylesheets.

To style project:

1. First style individual components in ReactViews/src.
2. Create a site wide styling if needed in public/styles.
	-> you can link this style to the whole website by going into templates/layouts/main.hbs and adding the style link there
3. Don't do any sort of positioning just yet. 


