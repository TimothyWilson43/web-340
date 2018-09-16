/*
============================================
; Title:  Assignment 7.3
; Author: Timothy Wilson
; Date:   16 Sep 2018
; Modified By: Timothy Wilson
; Description: This program demonstrates the
; use of chai.
;===========================================
*/

var fruits = require("../wilson-fruits");

var chai = require("chai");

var assert = chai.assert;

describe("fruits", function () {

    it("should return an array of fruits", function () {

        var f = fruits('Apple,Orange,Mango');

        assert(Array.isArray(f));

    });

});