function init(){
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");
  
  window.addEventListener("resize", resize_game);
  init_images();
  init_inputs();
  
  frame = 0;
  
  startTime = performance.now();
  FPSNormal = 0;
  
  FPS = 60;
  setInterval(onframe, 1000/FPS);
  
  arrow_spacing = 128;
  
  arrow_width = 128;
  arrow_height = 128;
  
  scroll_speed = 20;
  current_time = 0;
  
  hit_precision = 6 - scroll_speed * 0.08;
  
  hits = 0;
  misses = 0;
  
  combo = 0;
  
  arrow_pulses = [0, 0, 0, 0];
  
  chart = [
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
    ];
  
  gamechart = chart;
  
  resize_game();
}

function init_images(){
  arrows = document.getElementById("arrows");
}

function init_inputs(){
  inputs = [
      up = false,
      down = false,
      left = false,
      right = false,
  ];
  
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

