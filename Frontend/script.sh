#!/bin/bash
variable="I love Tea"
echo "Our  Bharat is most beautiful country"
echo "I'm from  Assam, $variable"

read  -p  "Enter your name:" user
echo "My name is , $user"

if [ -f "file.txt" ]; then
     echo  "file exists"
else 
     echo  "file doesn't exists"
fi


for i in  1 2 3 4 5
do 
   echo "Number $i"
done

greet(){
     echo "Welcome Everyone"
}

greet
