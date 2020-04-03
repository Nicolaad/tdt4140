# AFK-forum, a project by TDT4140 group 19

![logo][logo]

[logo]: frontend/afk_frontend/public/AFK-logo%20side.png "AFK logo"


This project is divided into two components. a front end, using DjangoREST, and a React frontend. The repository can be downloaded by cloning through Git.


## Backend

<details>
  <summary><h4> setup Linux and Mac </h4></summary>


Make sure you have python XXX installed and cloned the repository. Open up powershell and navigate into `19/backend` and setup the python virtual environment by running  
    ```python -m venv env```
(to activate the enviroment at a later point, run `source env/bin/activate`)
 
 Then install the required python dependencies by running:  
    ```pip install -r requirements.txt```

Afterwards, migrate the database by running both:  
    ```python manage.py migrate forum```  
    ```python manage.py makemgirations```

You should now be able to run the development sever by entering:  
    

</details>  



<details>
  <summary><h4>Setup Windows</h4></summary>
todo


</details>

#### Running the backend

Make sure that you have gone through the setup for your OS, and that you are still in your viritual python enviroment (should have `(env)` in your terminal). Then enter:  
``python manage.py runserver``  
  The backend will now run in your terminal. Please keep it open and open a new one for frontend/git usage

### Frontend

#### How to setup the frontend

The frontend requires node, lease download it from here. 
first of all, make sure you configure the djangoUrl field in `19/frontent/afk_frontend/src/index.js` to be your actuall django url (found when running the backend)

### How to run the frontend
Navigate with your terminal into `19/frontent/afk_frontend` and run `npm install` to download all the dependencies. then run `npm start` The frontend should then be working. 

#### other commands
