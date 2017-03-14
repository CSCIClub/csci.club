/**
 * Particleground
 * @author Jonathan Nicol - @mrjnicol
 */

document.addEventListener('DOMContentLoaded', function () {
  particleground(document.getElementById('particles'), {
    dotColor: '#5cbdaa',
    lineColor: '#000000',
    particleRadius:8,
    proximity:100,
    minRadiusPct:1, 
    maxRadiusPct:2.2,
    density:2500,
    parallax:false,
  });
  //var intro = document.getElementById('intro');
  //intro.style.marginTop = - intro.offsetHeight / 2 + 'px';
}, false);

