# Docker

    docker build -t express-project-appnote .
    docker  images
    
    docker rmi 460773d059fc
    
    docker run -p 3000:3000 -d express-project-appnote
    
    docker ps
    docker stop 6d11feffc7ed
    
    docker ps -f "status=exited"
