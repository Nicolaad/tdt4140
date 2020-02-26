import requests
import random
import string

def randomString(stringLength):
    """Generate a random string with the combination of lowercase and uppercase letters """

    letters = string.ascii_letters + string.digits
    return ''.join(random.choice(letters) for i in range(stringLength))

def randomPassword(stringLength):
    """Generate a random string of letters and digits """
    letters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(letters) for i in range(stringLength))

filename = "userlog.txt"
file = open(filename, "w")
for i in range(50):
    u_length = random.randint(3,20)
    username = randomString(u_length)

    p_length = random.randint(3,20)
    password = randomPassword(p_length)

    file.write(username + " : " + password + "\n")

    payload = {'username': username, 'password': password}

    r = requests.post("http://127.0.0.1:8000/users/", data=payload)

file.close()