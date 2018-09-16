/*
============================================
; Title:  Assignment 7.2
; Author: Timothy Wilson
; Date:   16 Sep 2018
; Modified By: Timothy Wilson
; Description: This program demonstrates the
; use of tdd in action.
;===========================================
*/

var assert = require("assert");

describe("String#split", function () {

    it("should return an array of fruits", function () {

        assert(Array.isArray('Apple,Orange,Mango'.split(',')));

    });

});

function getFruits(str) {

    return str.split(',');

   }

   module.exports = getFruits;