function init(){
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");
  
  window.addEventListener("resize", resize_game);
  init_images();
  init_inputs();
  
  started = false;
  
  frame = 0;
  
  startTime = performance.now();
  FPSNormal = 0;
  
  FPS = 60;
  
  arrow_spacing = 132;
  
  arrow_width = 128;
  arrow_height = 128;
  
  scroll_speed = 20;
  current_time = 0;
  
  hit_precision = 6 - scroll_speed * 0.06;
  if (hit_precision < 1) hit_precision = 1;
  
  hits = 0;
  misses = 0;
  
  combo = 0;
  
  arrow_pulses = [0, 0, 0, 0];
  
  pressednotes = "[";
  
  /*chart = [
    3, 100,
    2, 100,
    0, 110,
    1, 110,
    3, 120,
    2, 120,
    0, 130,
    1, 130,
    3, 140,
    2, 140,
    0, 150,
    1, 150,
    
    0, 200,
    1, 205,
    2, 210,
    3, 215,
    0, 220,
    1, 225,
    2, 230,
    3, 235,
    
    0, 260,
    1, 260,
    2, 260,
    3, 260,
    
    1, 280,
    3, 280,
    2, 300,
    0, 300,
    ];*/
    
    
  chart = [1, 575, 0, 575, 2, 575, 3, 575, 0, 639, 3, 660, 2, 683, 0, 749, 3, 749, 2, 804, 1, 805, 2, 834, 1, 835, 0, 867, 3, 887, 1, 909, 3, 1029, 0, 1029, 2, 1087, 1, 1087, 3, 1111, 0, 1112, 1, 1134, 3, 1135, 3, 1204, 0, 1204, 2, 1204, 1, 1251, 3, 1251, 0, 1252, 3, 1285, 1, 1285, 0, 1285, 3, 1320, 2, 1320, 0, 1321, 1, 1342, 3, 1343, 0, 1364, 3, 1365, 1, 1483, 2, 1483, 3, 1541, 0, 1541, 1, 1566, 3, 1567, 0, 1588, 3, 1590, 0, 1656, 3, 1657, 1, 1704, 2, 1704, 2, 1737, 1, 1737, 0, 1772, 3, 1774, 2, 1787, 1, 1787, 3, 1795, 0, 1795, 1, 1814, 3, 1815, 0, 1927, 3, 1927, 2, 1993, 2, 2004, 1, 2017, 3, 2018, 0, 2040, 3, 2042, 2, 2062, 3, 2072, 2, 2085, 3, 2107, 1, 2107, 2, 2130, 2, 2153, 2, 2182, 0, 2184, 2, 2221, 1, 2222, 0, 2243, 3, 2244, 2, 2265, 1, 2265, 2, 2315, 3, 2326, 2, 2335, 3, 2345, 2, 2358, 3, 2382, 1, 2383, 0, 2444, 2, 2445, 1, 2488, 3, 2489, 3, 2558, 2, 2604, 1, 2675, 0, 2725, 1, 2732, 2, 2747, 1, 2774, 0, 2787, 1, 2832, 3, 2833, 3, 2893, 2, 2944, 0, 3011, 1, 3059, 3, 3093, 2, 3123, 3, 3147, 1, 3169, 0, 3204, 2, 3246, 3, 3266, 1, 3286, 2, 3287, 2, 3318, 2, 3320, 2, 3321, 2, 3323, 2, 3324, 2, 3325, 1, 3376, 2, 3382, 3, 3388, 3, 3508, 2, 3544, 1, 3575, 0, 3599, 0, 3621, 1, 3634, 0, 3646, 0, 3679, 0, 3691, 1, 3734, 2, 3734, 2, 3790, 3, 3798, 3, 3826, 2, 3848, 1, 3910, 0, 3963, 1, 3985, 0, 3997, 1, 4007, 0, 4019, 0, 4033, 0, 4050, 2, 4073, 1, 4073, 1, 4137, 2, 4144, 3, 4152, 2, 4174, 1, 4195, 3, 4196, 2, 4245, 3, 4251, 3, 4277, 2, 4300, 2, 4364, 1, 4365, 0, 4414, 1, 4438, 0, 4448, 1, 4459, 0, 4471, 1, 4482, 2, 4506, 3, 4529, 1, 4529, 2, 4593, 3, 4600, 3, 4623, 3, 4641, 1, 4642, 2, 4698, 3, 4704, 3, 4730, 0, 4752, 2, 4754, 2, 4816, 1, 4817, 0, 4864, 1, 4889, 2, 4900, 1, 4912, 2, 4921, 0, 4935, 3, 4958, 1, 4980, 2, 4982, 3, 5057, 3, 5093, 1, 5093, 2, 5152, 3, 5160, 3, 5181, 0, 5204, 2, 5205, 3, 5228, 2, 5237, 3, 5246, 2, 5271, 1, 5271, 2, 5295, 0, 5315, 3, 5317, 2, 5340, 1, 5343, 3, 5350, 2, 5362, 2, 5385, 0, 5385, 2, 5407, 1, 5410, 0, 5431, 2, 5431, 2, 5498, 2, 5523, 1, 5544, 2, 5545, 2, 5606, 3, 5629, 1, 5653, 2, 5653, 3, 5675, 2, 5686, 3, 5694, 0, 5721, 3, 5723, 2, 5745, 2, 5766, 2, 5800, 1, 5833, 2, 5834, 0, 5856, 3, 5858, 2, 5880, 1, 5880, 2, 5951, 2, 5975, 2, 5995, 1, 5996, 2, 6064, 3, 6085, 2, 6106, 0, 6171, 1, 6222, 0, 6246, 1, 6251, 0, 6293, 3, 6313, 2, 6334, 1, 6334, 3, 6360, 3, 6396, 0, 6424, 3, 6427, 2, 6451, 1, 6451, 0, 6509, 1, 6515, 2, 6522, 3, 6531, 1, 6561, 2, 6562, 0, 6623, 1, 6672, 3, 6673, 2, 6696, 3, 6706, 0, 6739, 2, 6740, 3, 6761, 1, 6763, 2, 6783, 0, 6784, 2, 6822, 2, 6835, 2, 6847, 2, 6877, 1, 6878, 0, 6901, 3, 6901, 2, 6922, 3, 6933, 2, 6945, 1, 6968, 2, 6968, 0, 6989, 2, 6989, 2, 7012, 1, 7012, 0, 7071, 3, 7122, 1, 7123, 3, 7154, 1, 7155, 2, 7187, 3, 7211, 0, 7234, 3, 7235, 1, 7350, 1, 7382, 1, 7383, 1, 7385, 1, 7386, 1, 7388, 1, 7389, 1, 7391, 1, 7393, 1, 7394, 1, 7396, 1, 7397, 1, 7399, 0, 7419, 2, 7419, 1, 7465, 3, 7467, 3, 7534, 2, 7579, 1, 7651, 0, 7695, 1, 7707, 2, 7717, 1, 7747, 0, 7762, 3, 7800, 1, 7800, 2, 7862, 3, 7910, 2, 7986, 1, 8034, 3, 8066, 2, 8094, 3, 8116, 2, 8138, 1, 8174, 0, 8208, 2, 8233, 1, 8234, 0, 8255, 2, 8256, 2, 8287, 2, 8289, 2, 8290, 2, 8292, 2, 8293, 2, 8295, 2, 8296, 2, 8298, 2, 8300, 2, 8302, 2, 8303, 2, 8305, 2, 8306, 2, 8308, 0, 8347, 1, 8355, 2, 8361, 3, 8374, 3, 8479, 2, 8511, 1, 8544, 0, 8566, 0, 8590, 2, 8603, 1, 8615, 0, 8650, 1, 8661, 0, 8705, 3, 8706, 2, 8766, 3, 8771, 1, 8795, 0, 8818, 2, 8884, 2, 8933, 3, 8934, 2, 8969, 3, 8970, 1, 9002, 0, 9002, 2, 9021, 3, 9022, 1, 9042, 0, 9042, 1, 9156, 0, 9228, 1, 9229, 3, 9229, 2, 9230, 2, 9252, 3, 9252, 0, 9252, 1, 9252, 1, 9275, 0, 9275, 3, 9275, 2, 
  9276];
  
  gamechart = chart;
  
  resize_game();
}

function start(){
  if (!started){
    started = true;
    song.play();
    setInterval(onframe, 1000/FPS);
  }
}

function init_images(){
  arrows = document.getElementById("arrows");
  song = document.getElementById("music");
}

function init_inputs(){
  inputs = [
      up = false,
      down = false,
      left = false,
      right = false,
  ];
  
  document.addEventListener('click', start);
  
  document.addEventListener('keydown', function(event) {
   
    if(event.keyCode == 68) {
      inputs.left = true;
      press_input(0);
    }
    else if(event.keyCode == 75) {
      inputs.right = true;
      press_input(3)
    }
    else if(event.keyCode == 74) {
      inputs.up = true;
      press_input(2)
    }
    else if(event.keyCode == 70) {
      inputs.down = true;
      press_input(1)
    }
  });
  
  document.addEventListener('keyup', function(event) {
     
      if(event.keyCode == 68) {
        inputs.left = false;
      }
      else if(event.keyCode == 75) {
        inputs.right = false;
      }
      else if(event.keyCode == 74) {
        inputs.up = false;
      }
      else if(event.keyCode == 70) {
        inputs.down = false;
      }
  });
}

function resize_game(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function onframe(){
  current_time++;
  
  accuracy = Math.round(hits/(hits+misses) * 100);
  
  if(hits+misses === 0) accuracy = 100;
  
  if (arrow_pulses[0] > 0) arrow_pulses[0]--;
  if (arrow_pulses[1] > 0) arrow_pulses[1]--;
  if (arrow_pulses[2] > 0) arrow_pulses[2]--;
  if (arrow_pulses[3] > 0) arrow_pulses[3]--;
  
  render();
}

function render(){
  ctx.textAlign = "left";
  ctx.font = "11px Arial";
  
  ctx.fillStyle = "#0f0f0f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = "white";
  ctx.fillText("FPS: "+Math.round(FPSNormal), 0, 12); 
  ctx.fillText("Window Width: "+canvas.width, 0, 24);
  ctx.fillText("Window Height: "+canvas.height, 0, 36);
  
  ctx.fillText("Arrow Width: "+arrow_width, 0, 60);
  ctx.fillText("Arrow Height: "+arrow_height, 0, 72);
  ctx.fillText("Arrow Spacing: "+arrow_spacing, 0, 84);
  
  ctx.fillText("Scroll Speed: "+scroll_speed, 0, 108);
  
  ctx.fillText("Notes Left: "+gamechart.length/2, 0, 132);
  ctx.fillText("Hits: "+ hits, 0, 144);
  ctx.fillText("Misses: "+ misses, 0, 156);
  
  ax = canvas.width/2 - arrow_spacing * 1.5;
  ay = canvas.height - 160 - arrow_height/2;
  
  draw_arrows();
  draw_chart();
    
  ctx.textAlign = "center";
  ctx.fillText(accuracy + "%", canvas.width/2, canvas.height - 10)
  
  ctx.font = "40px Arial";
  ctx.fillText(combo, canvas.width/2, canvas.height - 50)
  calculateFPSNormal();
}

function draw_arrows(){

  for (i = 0; i < 4; i++){
    var sprite_offset = 0;
    var temp_scale = 0;
    if ( i === 0 && inputs.left ||
         i === 1 && inputs.down ||
         i === 2 && inputs.up   ||
         i === 3 && inputs.right){
           
           sprite_offset = 768;
         } 
    
    if (arrow_pulses[i]){
      sprite_offset = 512;
      temp_scale = arrow_pulses[i] * 6;
    }

    ctx.drawImage(arrows, i * 256, 768 - sprite_offset, 256, 256, ax + (arrow_spacing * i) - ((arrow_width + temp_scale)/2), ay - temp_scale/2, arrow_width + temp_scale, arrow_height + temp_scale);
  }
}

function draw_chart(){
  for (i = 0; i <= gamechart.length/2; i++){
    var arrow_n =        gamechart[i*2]; // direction of arrow
    var arrow_position = gamechart[i*2 + 1];
    var arrow_screen = arrow_position * scroll_speed - (scroll_speed * current_time); // position of arrow on screen
    
    if (arrow_position-current_time < hit_precision - 16){
      gamechart.splice(i*2, 2);
      misses++;
      combo = 0;
    }; // deletes missed notes
    
    ctx.drawImage(arrows, arrow_n * 256, 512, 256, 256, ax + (arrow_spacing * arrow_n) - (arrow_width/2), ay - arrow_screen, arrow_width, arrow_height);
  }
}

function press_input(note){
  lowest_note = NaN;
  
  pressednotes = pressednotes + note + ", ";
  pressednotes = pressednotes + current_time + ", ";
  
  for (i = 0; i <= gamechart.length/2; i++){
    var arrow_n =        gamechart[i*2]; // direction of arrow
    var arrow_position = gamechart[i*2 + 1]; //position of arrow
    
    if (arrow_n == note && Math.abs(arrow_position-current_time) < hit_precision){
      if (arrow_position < gamechart[lowest_note] || isNaN(lowest_note)) lowest_note = i*2;
    }
  }
  
  if (!isNaN(lowest_note)){
    gamechart.splice(lowest_note, 2);
    hits++;
    combo++;
    arrow_pulse(note);
  } 
}

function arrow_pulse(note){
  arrow_pulses[note] = 6; //frames
}

// I totally stole this code
function calculateFPSNormal() {

	var t = performance.now();
	var dt = t - startTime;

	// if elapsed time is greater than 1s
	if( dt > 1000 ) {
		// calculate the frames drawn over the period of time
		FPSNormal = frame * 1000 / dt;
		// and restart the values
		frame = 0;
		startTime = t;
	}
	frame++;

}

