# AFK-forum, a project by TDT4140 group 19

![logo][logo]

[logo]: frontend/afk_frontend/public/AFK-logo%20side.png "AFK logo"


This project is divided into two components: a backend, using DjangoREST, and a React frontend. The repository can be downloaded by cloning through Git.


## Backend

### How to set up

#### Virtual environment
The virtual environment makes sure that your python environment is not changed based on other projects, and reduces errors in setup.

First of all, make sure you have [Python 3.8.1](https://www.python.org/downloads/release/python-381/) or later installed. Then clone the repository in a desired location. Open up the terminal (for mac/Linux, use powershell for windows) navigate to into repository (`cd 19`), then follow these commands:   
First navigate into the backend folder with `cd backend`
Then create the python virtual environment with `python -m venv env`
(if you are not running python 3.8.1 by default, you might have to specify it e.g. `python3.8 -m venv env`. to check which is your default python, type ``python --version``)

You then need to activate the environment.
To activate the environment run the script for your OS, as explained below.

Once done, you should have (env) visible in your terminal. If you open a new terminal window, you need to activate the environment again. 

##### Windows (powershell)
Activate the environment with the following command `.\env\Scripts\Activate.ps1`   
If the command does not work, you may have to allow execution of scripts. To do this, open powershell as an admin, then run:     
`set-executionPolicy RemoteSigned`   
After changing the execution policy,  navigate back to the backend folder in powershell and try again.

##### Linux/mac
Activate the virtual environment with `source env/bin/activate`


#### Installing dependencies

Make sure you are in your virtual environment with your terminal/powershell and that you are in the backend directory.

Then install the required python dependencies by running:  
 ```pip install -r requirements.txt```

#### Updating the database

On installation, and when applying major changes, you need to migrate the database. This is done by typing the following command while in the virtual environment:   

```
python manage.py makemigrations forum   
python manage.py migrate
```

### Running the backend

After completing the above steps, you can start the backend.  Make sure you have activated your virtual environment and are in the backend folder. Then type:   
`python manage.py runserver`

The backend will now run in your terminal. Please keep it open, and open new instances of the terminal for frontend/git usage.
    
    

## Frontend

The frontend requires that a backend runs in order to work properly. Please make sure that you have a running backend. If you have deployed the backend to a server, you need to configure the frontend to use its IP-address.

### How to setup the frontend

The frontend requires [Node. We recommend the LTS version ](https://nodejs.org/en/download/).
First of all, make sure that the djangoUrl field in `19/frontent/afk_frontend/src/index.js` is your actual django url (found when running the backend).

### How to run the frontend
Open your terminal as an administrator, and navigate into `19/frontent/afk_frontend` and run `npm install` to download all the dependencies.
Then run `npm start`.  The frontend should then be working.

### Locally run tests with coverage 
To run tests locally in watchmode, and with test coverage, please navigate to `19/frontent/afk_frontend` and run:   
`npm test -- --watch --coverage src`
This will trigger all the tests to run, as well as display a chart over code coverage.


