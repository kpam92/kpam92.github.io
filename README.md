
## Serpentine

### Background

[live][heroku]

[heroku]: https://kpam92.github.io/
Serpentine is a game created with JavaScript, HTML, and CSS, where the player uses the mouse to guide a a small shape around a maze of small asteroids coming in a linear fashion from the top right corner.  

### Functionality & MVP  

With this game, users are be able to:

- [ ] move around the canvas with their mouse trying to avoid obstacles.
- [ ] Colliding with asteroids ends the game.
- [ ] Visually, a trail will snake behind the user's shape.
- [ ] A scoreboard will be present in the top left corner
- [ ] A music icon toggles background music


![wireframes](/gameplay.png)


### Implementation

To create the tail aspect of the user, a Dot class was created, called upon, and loops every time the canvas updates to vary the positions of each dot. A previous eventlistener finds the x and y location of them mouse, and defines them as window.x and window.y.

```javascript
this.x = window.x || 0;
this.y = window.y || 0;

dots.forEach(function(dot,index, dots) {
var nextDot = dots[index + 1] || dots[1];

dot.x = this.x;
dot.y = this.y;

dot.draw();

that.x += (nextDot.x - dot.x) * .6;
that.y += (nextDot.y - dot.y) * .6;

});
```

### Future features

There are many added and subtle features that can be added to this game. Future updates include:

- [ ] Power-ups that make the user invincible to asteroids
- [ ] Varying velocity for asteroid generation to add obstacles of different speed
- [ ] Sprite implementation for more visually appealing asteroid obstacles
