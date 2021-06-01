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
  
  arrow_spacing = 128;
  
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
    
    
  chart = [3, 627, 3, 636, 3, 646, 0, 646, 3, 665, 3, 675, 1, 683, 2, 686, 3, 695, 2, 703, 3, 709, 3, 727, 0, 728, 3, 739, 3, 749, 1, 757, 3, 758, 3, 781, 3, 791, 3, 809, 0, 809, 3, 818, 3, 828, 1, 832, 3, 839, 1, 841, 3, 861, 3, 871, 3, 888, 0, 890, 3, 907, 1, 912, 3, 917, 3, 928, 3, 955, 3, 965, 0, 966, 2, 986, 1, 987, 3, 1007, 0, 1008, 3, 1017, 3, 1027, 1, 1035, 3, 1036, 3, 1059, 3, 1067, 3, 1082, 0, 1085, 3, 1105, 1, 1126, 2, 1126, 2, 1134, 3, 1137, 0, 1140, 2, 1143, 1, 1146, 3, 1148, 3, 1162, 0, 1166, 2, 1169, 1, 1171, 3, 1186, 3, 1198, 0, 1205, 3, 1207, 3, 1225, 1, 1228, 3, 1235, 3, 1255, 3, 1266, 0, 1285, 2, 1286, 2, 1305, 1, 1307, 2, 1315, 3, 1319, 0, 1325, 2, 1331, 3, 1348, 2, 1355, 1, 1366, 3, 1371, 3, 1389, 3, 1399, 0, 1407, 3, 1409, 3, 1426, 3, 1436, 1, 1446, 3, 1446, 3, 1465, 0, 1466, 1, 1486, 2, 1487, 3, 1505, 2, 1515, 3, 1523, 0, 1526, 3, 1547, 3, 1565, 1, 1566, 3, 1586, 0, 1586, 1, 1607, 2, 1608, 1, 1626, 3, 1639, 1, 1649, 2, 1650, 3, 1669, 2, 1675, 3, 1683, 0, 1690, 3, 1694, 3, 1714, 3, 1733, 1, 1733, 3, 1750, 3, 1760, 0, 1768, 3, 1768, 3, 1790, 3, 1800, 1, 1809, 3, 1809, 2, 1827, 0, 1846, 2, 1847, 1, 1887, 3, 1887, 0, 1923, 2, 1924, 3, 1945, 1, 1947, 3, 1955, 3, 1966, 0, 1967, 3, 1986, 1, 2007, 3, 2007, 3, 2027, 0, 2047, 3, 2047, 3, 2068, 2, 2086, 1, 2087, 3, 2107, 0, 2107, 2, 2114, 1, 2114, 3, 2128, 0, 2128, 1, 2150, 2, 2150, 0, 2169, 3, 2170, 0, 2208, 3, 2209, 2, 2226, 1, 2227, 0, 2247, 2, 2248, 1, 2267, 3, 2267, 0, 2286, 3, 2287, 1, 2305, 3, 2306, 0, 2327, 3, 2327, 2, 2357, 1, 2357, 0, 2362, 3, 2362, 2, 2367, 1, 2367, 0, 2384, 3, 2384, 3, 2404, 1, 2405, 2, 2424, 0, 2425, 3, 2430, 1, 2440, 2, 2440, 3, 2448, 0, 2449, 1, 2467, 3, 2467, 0, 2475, 2, 2477, 1, 2486, 3, 2489, 3, 2506, 0, 2506, 1, 2515, 3, 2515, 0, 2524, 3, 2526, 1, 2544, 3, 2546, 0, 2563, 2, 2564, 0, 2585, 2, 2585, 2, 2603, 1, 2603, 0, 2624, 3, 2625, 1, 2634, 3, 2635, 0, 2656, 3, 2657, 0, 2679, 3, 2679, 1, 2706, 2, 2707, 3, 2717, 0, 2718, 1, 2726, 2, 2727, 0, 2746, 3, 2746, 1, 2757, 3, 2757, 0, 2778, 3, 2778, 1, 2805, 3, 2805, 3, 2825, 0, 2825, 3, 2835, 1, 2835, 3, 2855, 3, 2864, 3, 2874, 0, 2884, 3, 2884, 3, 2902, 1, 2905, 3, 2914, 3, 2923, 0, 2927, 2, 2945, 2, 2956, 1, 2960, 2, 2977, 0, 2994, 3, 2995, 3, 3028, 1, 3031, 3, 3039, 2, 3048, 3, 3066, 0, 3070, 3, 3076, 1, 3085, 3, 3094, 0, 3121, 3, 3121, 2, 3142, 1, 3143, 3, 3152, 0, 3152, 2, 3174, 2, 3185, 2, 3194, 1, 3202, 2, 3204, 2, 3221, 3, 3234, 0, 3241, 3, 3245, 3, 3261, 1, 3273, 2, 3274, 3, 3292, 0, 3295, 3, 3306, 2, 3313, 1, 3320, 3, 3341, 3, 3353, 0, 3362, 3, 3363, 3, 3382, 1, 3387, 3, 3393, 3, 3414, 3, 3437, 0, 3437, 3, 3460, 1, 3461, 0, 3469, 2, 3472, 3, 3491, 0, 3497, 2, 3500, 1, 3503, 3, 3507, 0, 3511, 3, 3520, 0, 3529, 3, 3531, 3, 3547, 0, 3548, 3, 3557, 1, 3563, 3, 3565, 3, 3584, 0, 3587, 3, 3594, 0, 3597, 3, 3611, 1, 3634, 2, 3635, 3, 3664, 3, 3673, 0, 3681, 3, 3682, 1, 3702, 3, 3702, 0, 3710, 3, 3714, 2, 3714, 3, 3729, 0, 3731, 
  3, 3756, 1, 3757, 0, 3777, 3, 3778, 1, 3785, 2, 3789];
  
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

