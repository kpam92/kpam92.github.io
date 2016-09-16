## Serpentine

### Background

Serpentine is a javascript based game where the player uses the mouse to guide a a small shape around a maze of small asteroids coming in a linear fashion from the top right corner.  

### Functionality & MVP  

With this game, users will be able to:

- [ ] move around the canvas with their mouse trying to avoid obstacles.
- [ ] Colliding with asteroids ends the game.
- [ ] Visually, a trail will snake behind the user's shape.
- [ ] A scoreboard will be present in the top left corner

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game
- [ ] A production Readme
- [ ] A menu that pops up once lost that shows their score for that round and directs the user to play again

### Wireframes

This app will consist of a single screen with game board, game controls, and nav links to the Github, my LinkedIn,
and the About modal.  User will click start button to start game, and instructions will show that the space button will be for pausing the game.

![wireframes](/gameplay.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.
- `Sound.js` for background music (will be able to toggle on and off)

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `Easel.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `Easel.js`.  Goals for the day:

- Get a green bundle with `webpack`
- Learn enough `Easel.js` to render an object to the `Canvas` element and initial player object.

**Day 2**: Continue with Easel and Canvas, to then lead in to creating logic for moving the user object, and the logic for the obstacle shapes coming in.  Goals for the day:

- Create all objects for the game
- Make user object able to move around through use of mouse
- Make functions to facilitate obstacles' logic and creation

**Day 3**: Create power ups for user, and the logic for them.

- Use vanilla Javscript to continue with gameplay aspects and flush out power ups.
- Create a functional and informative menu screen.
- Create a functional game over screen.


**Day 4**: Polish project, and style all elements. Goals for the day:

- Create and establish excellent UX and UI.
- Have all display features including music toggle and space bar pause button.


### Bonus features

There are many directions this cellular automata engine could eventually go.  Some anticipated updates are:

- [ ] Creating multiple levels
