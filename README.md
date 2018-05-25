# Project-1-WDI

For our first project, we were given a week to design and build an in-browser game using HTML, CSS and JavaScript (jQuery library used). The Heist was inspired by action games from the late 90s and early 00s in terms of theme of the action, but I wanted to follow the retro theme and feeling of older top-down dungeon crawling games. Following this I wanted to re-capture the sense of nostalgia from the games I played during my childhood.

#Game Description

The Heist is a turn-based stealth game where all movements are following a grid. The Map, and the spawn locations for the player, guards and treasures are preset on the grid in config.js .

The Game starts placing the player on the top left corner near the EXIT, leaving you to your own vices to collect as much treasure on the map as you can as quickly as possible losing as little lives as possible whilst avoiding guards.

The Game features a single level and the intention is to be played competetively to acquire the highest score possible.

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

#In Review

I'm happy with how the game turned out. I feel the game is currently fairly modular and adding extra features isn't too difficult. I was initially surprised at my perceived complexity of movement on the grid, but once I managed to wrap my head around that, I felt that other features came rather naturally and with haste.

I found the time I spent planning out each individual process and how I would approach a problem on the technical side invaluable. It helped me plan our my scope and features and keep me from being overly stressed out.

I'm glad I was able to try my hand at sprite drawing and animations myself, making me satisfied with the end-product.
