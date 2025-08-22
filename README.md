This little game was built to put my JavaScript skills to the test. It’s a simple browser game that also uses HTML and CSS to pull it all together.

The concept is straightforward: keep the smiley face inside the square. Sounds easy, right? The catch is—you have to solve math problems to stay alive. There's an invisible timer ticking in the background, so speed and accuracy are key.

Things I’d Like to Improve:
This project has a lot of potential, and I’ve got a few ideas to level it up:

Timer Enhancements
Add visible timers for each question, the full game, and remaining time left for the player.

Scoring & Stats
Track the number of correct and failed attempts.
Show the player’s score compared to their all-time best.
Add login functionality to save high scores across sessions.

UI & Layout
Improve the look and feel overall.
Separate the smiley maze and the question panel into two dedicated sections.
Add “Enter” and “Delete” buttons for better control during gameplay.
Show the correct answer before moving to the next question—for that learning moment.

This started out as a fun way to sharpen my logic and DOM manipulation skills, but with a few upgrades, it could grow into a more polished and engaging challenge. One step at a time!


POST IMPROVEMENT::

2025: The Glorious Overhaul (a.k.a. "I Actually Know What I'm Doing Now")

So, I went full 10x JavaScript developer and refactored the living daylight out of this game. Here’s what’s new, improved, and (supposedly) professional:

Timer Enhancements (Yes, Timers Everywhere)
- Global Game Timer: There’s now a visible countdown for the whole game session. (Because panic is fun.)
- Per-Question Timer: Each math question has its own timer, so you can watch yourself fail in real time. (Timer resets for every new question, because fairness.)
- Live Timer UI: All timers are DOM-bound (they update live on the screen, not just in my head).

Scoring & Stats (Because Numbers Make Everything Better)
- Correct/Failed Attempt Tracking: Now you can see exactly how many times you’ve been wrong. (Motivational, right?)
- Score & High Score: Your score is tracked and compared to your all-time best (persisted in localStorage, which is like a tiny hard drive in your browser).
- Login Functionality: Enter your username and your high score is saved per user. (localStorage FTW.)

UI & Layout (I Pretend to Care About Design)
- Vertical Stack Layout: Everything is arranged top-to-bottom, like a real mobile game. Stats/timers at the top, maze in the middle, input at the bottom. (No more horizontal chaos.)
- Question Placement: The math equation is now displayed above the maze, not hidden somewhere random.
- Bigger, Movable Maze: The smiley face actually moves inside a properly sized, relatively positioned box. (Because, y’know, movement is the point.)
- Number Pad Redesign: The number pad is now a grid (1-2-3, 4-5-6, 7-8-9, Enter-0-Delete), just like a real arcade. (No more hunting for numbers.)
- Input Box Sizing: The answer box is finally the same width as the number pad. (Symmetry! Wow!)
- Arcade Aesthetic: Pixel font, bold colors, and a UI that screams "I played too much Pac-Man as a kid."
- Mobile Friendly: Responsive design so you can fail at math on your phone, too.

 User Experience (UX, Because I Googled That Term)
- Enter/Delete Buttons: You don’t have to touch your keyboard at all. (You’re welcome, touchscreen users.)
- Correct Answer Reveal: If you mess up, the game actually shows you the right answer before moving on. (Learning moment, or just rubbing it in?)
- Game Overlays: Feedback, correct answers, and game over screens are now overlays. (You literally can’t ignore your mistakes.)


This is now a real (ish) arcade math game. If you break it, it’s probably a feature. Enjoy!

