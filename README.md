# ACNH Bugs Fish API


## Overview
This is the source code for all the bugs and (most fish) for Animal Crossing - New Horizons.

You can check it out here: 

https://acnh-what-to-catch.herokuapp.com/

## Installation

Simply clone the repository. Once cloned, go to the file directory and do the following code.

```bash
npm install
```

After that, run the next command to run
```bash
npm start
```

The application now be running in localhost:3001, simply type that up in your url, and it should be working!

## Endpoints

``/`` Returns you a list of all bugs and fishes

``/bugs`` Returns a list of all bugs

``/fish`` Returns a list of all fish

For all of these endpoints, you can insert the following to the end to improve the specification of your search

``month=[0-11]&hour=[0-23]`` By adding a month and an hour between those ranges, you get the specific bugs and/or fishes 
you can catch at that specific time. **Both of these need to be included to get a specific time**

``sort=[true/false]`` This sorts the result based on price.

## Examples

https://acnh-what-to-catch.herokuapp.com/fish?sort=true&month=5&hour=10

This returns all fish that can be caugh in June, at 10 AM, sorted by price.

https://acnh-what-to-catch.herokuapp.com/bugs?month=11&hour=16

This returns all bugs that can be caught in December, at 4 PM.

https://acnh-what-to-catch.herokuapp.com?sort=true

This sorts all the bugs and fishes by their price.
