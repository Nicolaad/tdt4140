# AFK-forum, a project by TDT4140 group 19

![logo][logo]

[logo]: frontend/afk_frontend/public/AFK-logo%20side.png "AFK logo"


This project is divided into two components. a front end, using DjangoREST, and a React frontend. The repository can be downloaded by cloning through Git.


## Backend

### How to set up

#### Viritual enviroment
The viritual enviroment makes sure that your python enviroment is not changed based on other projects, and reduces errors in setup.

First of all, make sure you have [Python 3.8.1](https://www.python.org/downloads/release/python-381/) or later installed. Then clone the repository in a desired location. Open up the terminal (for mac/linux, use powershell for windows) navigate to into repository (`cd 19`), then follow these commands:   
First navigate into the backend folder with `cd backend`
Then create the python viritual enviroment with `python -m venv env`
(if you are not running python 3.8.1 by default, you might have to specify it e.g `python3.8 -m venv env`. to check which is your default python, type ``python --version``)

You then need to activate the enviroment.
To activate the enviroment run the script for your OS:

Once done, you should have (env) visible in your terminal. If you close the terminal window, do the activate steps below to reinstantiate the enviroment. 

##### Windows(powershell)
Activate the enviroment with the following command `./env/Scripts/activate.ps1`
Caution! You might have to run set-executionPolicy RemoteSigned in powershell as an administrator if the command does not work

##### Linux/mac
Activate the viritual enviroment with `source env/bin/activate`


#### Installing dependencies

Make sure you are in your viritual enviroment with your terminal/powershell and that you are in the backend directory.

Then install the required python dependencies by running:  
    ```pip install -r requirements.txt```

#### Updating the database

On installation and when appylingmajor changes, you need to migrate the database - this is done by typing the following command while in the viritual enviroment:   

```python manage.py migrate```   
```python manage.py makemgirations```

### Running the backend

After completing the above steps - make sure you have activated your viritual enviroment and are in the backend folder. Then you can start the backend by typing:   
`python manage.py runserver`

The backend will now run in your terminal. Please keep it open and open a instances of the terminal for frontend/git usage
    
    

## Frontend

The frontend requires that a backend runs in order to work properly. Please make sure that you have a running backend and are abl to get the ip for it - as it is needed for configuring the frontend.

### How to setup the frontend

The frontend requires [Node. We recommend the LTS version ](https://nodejs.org/en/download/)
first of all, make sure that the djangoUrl field in `19/frontent/afk_frontend/src/index.js` is your actuall django url (found when running the backend)

### How to run the frontend
Navigate with your terminal into `19/frontent/afk_frontend` and run `npm install` to download all the dependencies. then run `npm start` The frontend should then be working.

### Locally run tests with coverage 
To run tests localy in watchmode, and with test coverage, please navigate to `19/frontent/afk_frontend` and run:   
`npm test -- --watch --coverage src`
This will trigger all the tests to run, aswel ass display a chart over codecoverage.


