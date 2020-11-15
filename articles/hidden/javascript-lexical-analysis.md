---
name: Building a lexical analyser in javascript (compiler design)
description: How does a compiler understand your code? How does it know what machine-code it should generate? This tutorial explains how you can create your own lexical analyser in javascript.
themeColor: "#FFA3FF"
thumbnails:
    - /image/lexical-analysis-javascript/tokens.png
type: tutorial
readMinutes: 6
githubRepo: CodeStix/shithead-the-game
updated: "Sep 17 2020"
---

## What is lexical analysis?

![tokens](/image/lexical-analysis-javascript/tokens.png)

Lexical analysis is the method to describe a sequence of characters (or text) as multiple tokens, where a token is a sequence of predefined characters.

This type of analysis is used in compilers (the program that converts human-readable code into machine-readable code), because they don't understand individual characters but they may understand sequences of predefined characters. We tell the lexical analyser what tokens should be expected, we define these tokens, and then, we give the analyser some text and it lets us know if there is a syntax error and what tokens were used.

## Lets develop our own!

Lets develop our own lexical analyser in javascript!
