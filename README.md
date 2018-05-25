# Project-1-WDI

For our first project, we were given a week to design and build an in-browser game using HTML, CSS and JavaScript (jQuery library used). The Heist was inspired by action games from the late 90s and early 00s in terms of theme of the action, but I wanted to follow the retro theme and feeling of older top-down dungeon crawling games. Following this I wanted to re-capture the sense of nostalgia from the games I played during my childhood.

#Game Description

The Heist is a turn-based stealth game where all movements are following a grid. The Map, and the spawn locations for the player, guards and treasures are preset on the grid in config.js .

The Game starts placing the player on the top left corner near the EXIT, leaving you to your own vices to collect as much treasure on the map as you can as quickly as possible losing as little lives as possible whilst avoiding guards.

The Game features a single level and the intention is to be played competetively to acquire the highest score possible.

In order to 'win' the game, one simply has to walk into the square labeled EXIT. The challenge is introduced when one is considering their high score. And in order to be competetive, the user will have to gather as many treasures possible, in the least amount of turns possible.

#Current features

<img src='./images/the_heist_example.gif'>

- Player moves around controlling the character 'Emilia' using W A S D keys for 'up','left','down',right respectively.
- Guard Movement is entirely randomised.
- Treasures are animated with accompanying sound effect upon pick up.
- Windows are added too give the player a quick way to bypass guards.
- Game stores all gathered high scores locally, allowing for hot seat competitions.



#Planned features

Down the line, I would like to add the ability to use bigger screens, whilst only rendering a limited scope of the screen. A la a window that would be following the player character around, leaving the user blind to anything that's outside of the window, potentially increasing the difficulty of your game if you don't know exactly where everything is.

Additionally, I would consider adding a PvP version of the game, where the second player controls one of the guards, and their goal is to catch the player.

#Complications during development

Throughout the week I found myself encounter several hurdles. Including getting a character to move on a grid. Which to a human mind is such a simple concept, but it ended up being a little bit more challenging to explain that to the computer.
Initially, I found a solution that altered the initial grid file, which forced me to remove and redraw the map every turn, and though the concept worked, it wasn't the best possible solution in terms of performance or user experience.
Later down the line I managed to get movement to work, only redrawing the cells affected by action taken, by changing the classes assigned to each individual cell.

Additionally, another complication was around localStorage, being a completely new concept which I had no prior experience with. I found myself looking at localStorage when I wanted the game to retain the high scores of previous playthrough, and to last even through a page reload. Allowing someone to leave the page and return, and still acquire their scores, unless they've cleared their browser cache. The challenge was to get the page to display only 10 highest scores in descending order, and after few iterations, I managed to do it. By pushing the values into arrays, only looking at unique values, and then printing out the values corresponding to the 10 highest values.

#In Review

I'm happy with how the game turned out. I feel the game is currently fairly modular and adding extra features isn't too difficult. I was initially surprised at my perceived complexity of movement on the grid, but once I managed to wrap my head around that, I felt that other features came rather naturally and with haste.

I found the time I spent planning out each individual process and how I would approach a problem on the technical side invaluable. It helped me plan our my scope and features and keep me from being overly stressed out.

I'm glad I was able to try my hand at sprite drawing and animations myself, making me satisfied with the end-product.
