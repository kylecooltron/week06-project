/* Linepath */

//wait until page is fully loaded
window.onload=function(){

  //get reference to path container
  const path_container = document.querySelector('.path-container');
  //create list of canvas's and json object
  let canvas_list = []
  //reused variables
  let this_ctx;

  //do updates
  function do_updates() {
    //code here

    //draw on canvas's
    if(canvas_list.length > 0){

        //for every canvas in the canvas list
        for (var i = 0; i < canvas_list.length; i++) {

          //access it's canvas reference
          this_ctx = canvas_list[i][0].getContext("2d");
          //set the correct drawing color
          this_ctx.strokeStyle = canvas_list[i][1];
          //set the starting position for a line
          this_ctx.beginPath();

            //for every path of this canvas
            for (var j = 0; j < canvas_list[i][2].length; j++) {

              //set starting draw position
              this_ctx.moveTo(canvas_list[i][2][j][0][0], canvas_list[i][2][j][0][1]);

                //for every set of points in this individual path
                for (var k = 0; k < canvas_list[i][2][j].length; k++) {   
                  //draw a line to next point
                  this_ctx.lineTo(canvas_list[i][2][j][k][0], canvas_list[i][2][j][k][1]);
                  this_ctx.stroke();
                }

            }
        }


    }

  }

  setInterval(do_updates, 1);

  readJsonFile('paths');
  
  function outputJson(jsonObject){
  //for testing
  console.log(jsonObject);

  //for every canvas within json 'canvas'
  for (var i = 0; i < jsonObject['canvas'].length; i++) {

    //create a new canvas
    let this_canvas = create_new_canvas();
    //set it's width and height
    this_canvas.width = jsonObject['canvas'][i]["width"];
    this_canvas.height = jsonObject['canvas'][i]["height"];
    //fill it with the correct background color
    this_ctx = this_canvas.getContext("2d");
    this_ctx.fillStyle = jsonObject['canvas'][i]["backcolor"];
    this_ctx.fillRect(0, 0, this_canvas.width, this_canvas.height);
    //append canvas to the page
    path_container.append(this_canvas);
    //add to the global path list this paths: canvas, linecolor, and array of paths
    canvas_list[i] = [this_canvas, jsonObject['canvas'][i]["linecolor"], jsonObject['canvas'][i]["paths"]]

  }


  }
  
  function readJsonFile(filename)
  {;
    fetch('line-paths/'+ filename + '.json')
    .then(response => response.json())
    .then(jsonResponse => outputJson(jsonResponse));    
     // outputs a javascript object from the parsed json
  }
  
  
  function create_new_canvas(width = 400, height = 200, backcolor = "red"){
    //creates new canvas element
    const this_canvas = document.createElement("canvas");

    //basic settings for canvas
    this_canvas.width = width;
    this_canvas.height = height;
    const ctx = this_canvas.getContext("2d");
    ctx.fillStyle = backcolor;
    ctx.fillRect(0, 0, width, height);
    //appends it to the path container section on the page
    path_container.appendChild(this_canvas);
    //returns a reference to canvas
    return this_canvas;
  }

/* code for making test json point data
  function getPos(el) {
    var rect=el.getBoundingClientRect();
    return {x:rect.left,y:rect.top};
  }

  let mousepicture = ""

  let mouseX = 0;
  let mouseY = 0;
  onmousemove = function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
    }


        //test
    this_canvas.addEventListener('click',   function canvas_onclick(event){

      var coords = getPos(this_canvas);
  
      mousepicture += "[" + (mouseX - coords.x) + "," + (mouseY- coords.y) + "], \n";
  
      console.log(mousepicture)
  
      console.log('clicked');


      this_ctx = this_canvas.getContext("2d");
      this_ctx.fillStyle = "black";
      let dx = (mouseX - coords.x);
      let dy = (mouseY - coords.y);
      this_ctx.fillRect(dx,dy,5,5);

  });

  
*/

;}









