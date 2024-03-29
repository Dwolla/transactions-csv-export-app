# Dwolla Transaction Reports

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Dwolla transaction reports is a small app that allows clients to get
transactions for a specific customer. The app supports filtering by certain
parameters such as `startDate`, `endDate`, and `amount`.

## Requirements

- Node 16+
- Python 3.8+
- Pipenv 11.9+

## Install

- Clone this repository
- In the root directory, run `pipenv install` to install pip dependencies.
- Optionally in the root directory run `pipenv install --dev` to install pip development dependencies.
- `cd` into the `client` directory and run `npm install` to install the npm packages for the react client.
- In the root directory, create a folder named `files`. This is where transaction report CSV files will be saved.
- In the `client` directory create a `.env` file. The following is a list of enviornment variables:
  - REACT_APP_FLASK_BASE_URL
- 2 servers need to run simultaneously: one for the react client, and one for the flask backend.
  - To run the flask server, make sure you are in the root directory and run `flask run`
  - To run the react client, in a separate terminal `cd` into the `client` directory and run `npm start`

## Contribution

Contributions to the project are welcome via pull requests!

## License

This project is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Disclaimer

This project is meant to serve as an educational tool only that helps you understand how to implement a Dwolla concept.
