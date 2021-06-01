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
    
    
  chart = [1, 542, 3, 542, 0, 610, 2, 610, 2, 632, 3, 632, 0, 654, 1, 654, 1, 718, 2, 718, 3, 762, 2, 782, 1, 794, 0, 826, 2, 848, 1, 870, 0, 984, 3, 984, 2, 1044, 1, 1068, 0, 1090, 3, 1154, 3, 1194, 2, 1194, 0, 1218, 2, 1228, 3, 1228, 1, 1256, 3, 1284, 2, 1306, 3, 1416, 0, 1416, 2, 1484, 1, 1502, 0, 1524, 3, 1590, 3, 1628, 1, 1654, 3, 1664, 2, 1694, 1, 1718, 0, 1740, 0, 1850, 2, 1852, 1, 1910, 3, 1932, 2, 1956, 0, 2018, 3, 2062, 2, 2086, 3, 2096, 1, 2126, 2, 2152, 0, 2172, 2, 2282, 1, 2352, 3, 2390, 3, 2454, 2, 2496, 1, 2562, 0, 2604, 1, 2616, 2, 2628, 1, 2660, 0, 2674, 3, 2718, 2, 2782, 1, 2824, 0, 2888, 2, 2932, 3, 2964, 1, 2994, 3, 3018, 2, 3038, 1, 3072, 0, 3102, 3, 3124, 2, 3148, 1, 3148, 0, 3240, 1, 3246, 2, 3250, 3, 3256, 3, 3362, 2, 3396, 1, 3426, 0, 3448, 0, 3472, 1, 3484, 0, 3496, 2, 3528, 3, 3540, 2, 3582, 1, 3582, 2, 3636, 3, 3648, 3, 3670, 2, 3694, 1, 3752, 0, 3796, 1, 3820, 0, 3830, 1, 3842, 0, 3854, 1, 3864, 2, 3886, 3, 3910, 0, 4018, 3, 4018, 2, 4076, 3, 4082, 3, 4104, 2, 4126, 0, 4190, 0, 4232, 2, 4258, 1, 4268, 2, 4278, 2, 4290, 2, 4302, 3, 4322, 2, 4344, 2, 4452, 1, 4452, 2, 4506, 3, 4516, 3, 4538, 2, 4558, 1, 4624, 0, 4666, 0, 4690, 2, 4690, 1, 4702, 3, 4702, 0, 4714, 2, 4714, 3, 4726, 1, 4726, 0, 4736, 2, 4736, 1, 4758, 2, 4776, 3, 4886, 2, 4938, 1, 4950, 0, 4972, 1, 4994, 2, 5060, 0, 5100, 2, 5122, 1, 5134, 3, 5144, 2, 5154, 1, 5168, 0, 5188, 2, 5210, 3, 5318, 1, 5318, 2, 5382, 3, 5402, 2, 5424, 0, 5492, 2, 5532, 2, 5568, 1, 5602, 3, 5622, 2, 5646, 3, 5752, 2, 5818, 1, 5838, 0, 5862, 2, 5924, 3, 5966, 3, 6002, 2, 6036, 1, 6056, 0, 6076, 3, 6184, 2, 6250, 1, 6272, 2, 6296, 0, 6358, 3, 6400, 2, 6424, 1, 6436, 0, 6458, 1, 6468, 2, 6492, 1, 6516, 3, 6516, 0, 6620, 2, 6620, 1, 6644, 3, 6654, 2, 6684, 3, 6708, 0, 6728, 2, 6730, 1, 6794, 1, 6836, 3, 6836, 0, 6868, 2, 6868, 2, 6900, 3, 6902, 0, 6922, 1, 6922, 3, 6948, 0, 6948, 1, 7054, 2, 7122, 3, 7156, 0, 7158, 3, 7228, 2, 7266, 1, 7334, 0, 7376, 1, 7388, 2, 7400, 1, 7426, 0, 7440, 1, 7484, 2, 7484, 2, 7552, 3, 7552, 0, 7594, 1, 7594, 0, 7660, 3, 7662, 0, 7702, 3, 7734, 1, 7766, 3, 7788, 2, 7810, 1, 7844, 0, 7876, 2, 7898, 1, 7918, 0, 8004, 1, 8010, 2, 8012, 3, 8018, 3, 8136, 2, 8166, 1, 8198, 0, 8218, 0, 8240, 2, 8252, 1, 8262, 0, 8298, 0, 8310, 3, 8354, 2, 8418, 3, 8442, 2, 8462, 1, 8530, 2, 8572, 2, 8606, 1, 8634, 3, 8656, 0, 8678, 2, 8790, 1, 8790, 0, 8854, 1, 8864, 2, 8880, 3, 8900, 1, 8966, 2, 
  8966];
  
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
  current_time = song.currentTime*60;
  
  
  accuracy = Math.floor(hits/(hits+misses) * 100);
  
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
  
  ctx.fillText("Current Time: "+ song.currentTime, 0, 180);
  
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
      temp_scale = arrow_pulses[i] * 8;
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
  pressednotes = pressednotes + Math.round((current_time/2))*2 + ", ";
  
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

