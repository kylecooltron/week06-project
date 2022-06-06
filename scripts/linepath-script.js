/* 
Linepath-script.js
Author: Kyle Coulon 2022
*/

  /* DEFINE VARIABLES */
  //create list of canvas's and json object
  let canvas_list = []
  //reused variables
  let this_ctx;
  let startx, starty;
  let nextx, nexty;
  let canv_width, canv_height;
  //amount drawn each frame in pixels
  let draw_speed = 1;

  /* DO DRAW UPDATES EACH FRAME */
  function do_draw_updates() {

    //if there is at least one canvas
    if(canvas_list.length > 0){
      console.log(window.scrollY);
        //for every canvas in the canvas list
        for (var i = 0; i < canvas_list.length; i++) {

          if(elementInViewport(canvas_list[i][0]) ){
          // this controls how fast lines draw out
          canvas_list[i][3] += draw_speed;
        
          //access it's canvas reference
          this_ctx = canvas_list[i][0].getContext("2d");
          //set the correct drawing color
          this_ctx.strokeStyle = canvas_list[i][1];
          //set a drawing path
          this_ctx.beginPath();
          canv_width = canvas_list[i][0].width;
          canv_height = canvas_list[i][0].height;

          /* DRAW EACH LINE PROGRESSIVELY */

          //for every path of this canvas
          for (var j = 0; j < canvas_list[i][2].length; j++) {
            
            //set starting draw position
            startx = canvas_list[i][2][j][0][0] * canv_width;
            starty = canvas_list[i][2][j][0][1] * canv_height;
            this_ctx.moveTo(startx,starty);

            // reset drawing amount for this line path
            let dist_left_to_draw = canvas_list[i][3];

            //for every set of points in this individual path
            for (var k = 0; k < canvas_list[i][2][j].length; k++) {  

              //if we still have some distance to go for this path
              if(dist_left_to_draw > 0){

              //get the next point
              nextx = canvas_list[i][2][j][k][0] * canv_width;
              nexty = canvas_list[i][2][j][k][1] * canv_height;
              //find the difference between last point and this next one
              let difference = Math.abs(startx-nextx) + Math.abs(starty-nexty);
              
              // if we have already drawn past this point
              if(dist_left_to_draw > difference){
                // subtract its distance
                dist_left_to_draw -= difference;
              }else{ // draw the remaining distance

                // set next x/y to correct draw distance
                if(startx != nextx){ //x line
                  if(nextx > startx){ nextx = startx + dist_left_to_draw; //positive difference
                  }else{ nextx = startx - dist_left_to_draw; }//negative difference
                }else{ //y line
                  if(nexty > starty){ nexty = starty + dist_left_to_draw; //positive difference
                  }else{ nexty = starty - dist_left_to_draw; }//negative difference
                }
                
              //DRAW RIGHT SIDE
              this_ctx.moveTo(startx,starty);
              this_ctx.lineTo(nextx,nexty);
              this_ctx.stroke();
              //DRAW MIRROR LEFT
              this_ctx.moveTo(-startx+canv_width,starty);
              this_ctx.lineTo(-nextx+canv_width,nexty);
              this_ctx.stroke();
              
              //we've used up the rest
              dist_left_to_draw = 0;
              }
              //set up for measuring distance next frame
              startx = nextx;
              starty = nexty;
            }
            }
          }
        }
        }
    }
  } // end do_draw_updates()

  /* DO DRAW UPDATES EVERY FRAME */
  setInterval(do_draw_updates, 1);
  
  /* GO THROUGH JSON DATA AND CREATE CANVAS'S */
  function outputJson(jsonObject){
  //for every canvas within json 'canvas'
  for (var i = 0; i < jsonObject['canvas'].length; i++) {
    //create a new canvas with correct width, height, backcolor, and parent element selector
    let this_canvas = create_new_canvas(jsonObject['canvas'][i]["width"],jsonObject['canvas'][i]["height"],jsonObject['canvas'][i]["backcolor"],jsonObject['canvas'][i]["element"]);
    //add to the global path list this paths: canvas, linecolor, and array of paths
    canvas_list[i] = [this_canvas, jsonObject['canvas'][i]["linecolor"], jsonObject['canvas'][i]["paths"], 0]
  }
  }

  /* CREATE A CANVAS WITH CORRECT SETTINGS */
  function create_new_canvas(width = 400, height = 200, backcolor = "black", element="body"){
    //creates new canvas element
    const this_canvas = document.createElement("canvas");
    //basic settings for canvas
    this_canvas.width = width;
    this_canvas.height = height;
    const ctx = this_canvas.getContext("2d");
    //fills with background color
    ctx.fillStyle = backcolor;
    ctx.fillRect(0, 0, width, height);
    //appends it to element on the page
    document.querySelector(element).appendChild(this_canvas);
    //returns a reference to canvas
    return this_canvas;
  }

  /* FETCH JSON DATA FROM FILE */
  function readJsonFile(filename)
  {;
    fetch('line-paths/'+ filename + '.json')
    .then(response => response.json())
    .then(jsonResponse => outputJson(jsonResponse));    
     // outputs a javascript object from the parsed json
  }
  
  /* GET PATH DATA FROM JSON FILE */
  readJsonFile('paths');



  /* elementInViewport was submitted to a forum by @Prestaul - Sep 24, 2008
  https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport */
  //check if an element is visible to the viewport
  function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;
    while(el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }
    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    );
  }









