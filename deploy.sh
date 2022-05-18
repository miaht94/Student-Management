echo("Stopped all process")
pm2 stop all

echo("Pulling from GitHub")
git pull

echo("Installing client node modules")
cd Student-Management/client
npm i

echo("Installing server node modules")
cd ../server
npm i

echo("Started all process")
cd ..
pm2 start ecosystem.config.js