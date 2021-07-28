# ssh-keygen
        
        # Private Key
        ssh-keygen -t rsa -b 4096 -m PEM -f key 
        
        # Public Key
        ssh-keygen -e -m PEM -f key > key.pub
