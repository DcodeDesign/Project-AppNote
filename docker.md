docker login -u "usename" -p "userpassword" docker.io
docker build -t thomasgravy/appnotefront:latest -f Dockerfile .
docker push thomasgravy/appnotefront:latest 
