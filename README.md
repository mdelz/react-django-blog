# Getting Started

Checkout the repository. TThis project is written and tested with the following software.

- `python` v3.8.0
- `django` v3.1.7
- `node` v10.23.3
- `yarn` v1.22.5
- `pip` v20.3.3

## Setup Backend

First we have to install all dependencies. Open a terminal in the chekcout directory.

```bash
# install pipenv
pip install pipenv

# install dependencies
pipenv install

# use the virtual environment
pipenv shell

# change to backend directory
cd backend

# run migrations
python manage.py migrate

# In case you want to use the Django admin backend
python manage.py createsuperuser

# start django
python manage.py runserver
```

## Setup Frontent

Since the backend is still running in the terminal open a new one, again in the checkout directory.

```bash
# change to the frontend directory
cd frontend

# install all dependencies
yarn install

# start frontend (will open new tab automatically)
yarn start
```
