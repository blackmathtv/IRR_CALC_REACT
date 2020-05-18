To get this app working, it needs to be started on a webserver
For example: install nodejs, 
npm install serve
copy the build folder to wherever makes sense
navigate to the parent directory of the build folder
serve -s build //will start the webserver at localhost:5000 by default using the code in the build folder

Then, embed in an Iframe in your webpage and size the app inside of it. Look at the example in embeddedAppExample.html
you can also just create a link/forward the resolves to <whatever your ip is>:5000