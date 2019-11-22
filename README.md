Angular Application
===================

- - - - 

This project was designed to transform data received from server to a different format for display purpose.

## Response from server :
{
  "data": [
    {
      "name": "",
      "bands": [
        {
          "name":  "Band Z",
          "recordLabel": "Record Label 1"
        }
      ]
    },
    {
      "name": "",
      "bands": [
        {
          "name":  "Band D",
          "recordLabel": "A record label"
        }
      ]
    },
    {
      "name": "Phi Festival",
      "bands": [
        {
          "name":  "Band S",
          "recordLabel": "A record label"
        },
        {
          "name":  "Band T",
          "recordLabel": "B record label"
        }
      ]
    },
    {
      "name": "Omega Festival",
      "bands": [
        {
          "name":  "Band X",
          "recordLabel": "Record Label 1"
        }
      ]
    },
    {
      "name": "Alpha Festival",
      "bands": [
        {
          "name":  "Band A",
          "recordLabel": "Record Label 2"
        }
      ]
    },
    {
      "name": "Gamma Festival",
      "bands": [
        {
          "name":  "Band C",
          "recordLabel": "Record Label 3"
        },
        {
          "name":  "Band Y",
          "recordLabel": "Record Label 1"
        }
      ]
    },
    {
      "name": "Beta Festival",
      "bands": [
        {
          "name":  "Band A",
          "recordLabel": "Record Label 2"
        },
        {
          "name":  "Band C",
          "recordLabel": "Record Label 3"
        }
      ]
    }
  ]
}



## Display Format:
![Screenshot](https://github.com/imehra07/angular-app/blob/master/display%20screenshot.png)

## Assumption: 
Capital letters are to be considered identical to their corresponding lower case letters for the alphabetic sorting i.e the sorting should be case insensitive.

## Express Server
Festival.json is served from an Express Server running at http://localhost:3000
Navigate to `http://localhost:3000/api/v1/festivals` to check out the festival.json 

## Build
Please run `npm install` to install dependencies.

## Development server
Run `npm run start` to start the express and the dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

To only start the dev server run `ng serve`. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.



This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19.
