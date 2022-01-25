# Dwolla Transaction Reports

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Dwolla transaction reports is a small app that allows clients to get
transactions for a specific customer. The app supports filtering by certian
parameters such as `startDate`, `endDate`, and `amount`.

## Requirements

- Node 16+
- Python 3.8+
- Pipenv 11.9+

## Install

- Clone this repository
- In the root directory, run `pipenv install` to install pip dependencies.
- Optionally in the root directory run `pipenv install --dev` to intall pip development dependencies.
- `cd` into the `client` directory and run `npm install` to install the npm packages for the react client.
- 2 servers need to run simultaneously: one for the react client, and one for the flask backend.
  - To run the flask server, make sure you are in the root directory and run `flask run`
  - To run the react client, in a seperate terminal `cd` into the `client` directory and run `npm start`

## Contribution

Contributions to the project are welcome via pull requests!

## License

This project is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
