##Quick start
###Setup
1) Copy the contents of the userscript in the userscripts-folder to your new GreaseMonkey or TamperMonkey userscript.
1) Open a terminal
1) Do npm install
1) Do npm start
1) If server started correctly it should print 'Server running at http://127.0.0.1:8888'
    1) Is port 8888 in use, then change it to an available port in package.json and also modify the 
    basePath-variable in the user script.
1) Navigate to a http or https webpage that contains a div element. When the page is loaded it should 
alert "ui.js-file was loaded and says hello ;)"
###Modify
1) Your target website might use dynamic loading, change the pageLoaded-function to deal with this.
1) Start building your user script from public/main.js ;) 
