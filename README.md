# 7 Factor React UI Evaluation

## Notes from Steven

`master` contains the work that was completed on this challenge in the first hour. 
The `completed` branch has the fully completed challenge, which took another couple of hours with some refactoring.

## Objective

The goal is to take an input of nested arrays filled with single digit integers and translate
them as a grid of boxes, each displaying their integer value, within the browser window.

A file, randomArray.js, is included in /src.  This file's exported method 'getArray()', which returns an array of nested arrays,
should be used to generate a new array each time the page is loaded.

Using the React framework, each nested array should then be used to generate a row of React elements.  The result should be
a 10x10 full-window grid of boxes with integers.

----

Stretch goal 1:  Make each integer box have a unique background color for their integer, so 1 = blue, 2 = green, etc.

Stretch goal 2: At the border of each box where it bounds another, display the two boxes sum total along their border.
I.E: If a box with 2 has a box with 6 to the right, the number 8 would display somewhere along that border.  Same for above and below.

Stretch goal 3: Provide a button that sorts the grid by descending integers

---

## To install and run

Clone this repository

Yarn

Yarn start
