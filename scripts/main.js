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
  BPM = 170;
  BPM_offset = 1.72;
  
  firstStart = false;
  
    
  chart = [1, 268, 2, 274, 3, 280, 0, 424, 3, 436, 1, 444, 2, 450, 0, 456, 2, 608, 3, 610, 0, 800, 2, 800, 1, 824, 3, 824, 0, 844, 2, 844, 3, 866, 1, 866, 0, 886, 2, 888, 1, 906, 3, 908, 0, 926, 2, 928, 0, 948, 1, 954, 2, 958, 3, 960, 0, 988, 3, 988, 1, 1010, 2, 1012, 0, 1034, 3, 1034, 1, 1056, 2, 1058, 3, 1076, 0, 1076, 1, 1096, 2, 1096, 0, 1116, 3, 1116, 1, 1138, 2, 1138, 3, 1160, 0, 1160, 2, 1186, 1, 1186, 3, 1204, 0, 1204, 0, 1224, 1, 1244, 2, 1266, 3, 1288, 0, 1310, 2, 1312, 1, 1330, 3, 1330, 0, 1350, 2, 1352, 1, 1372, 3, 1372, 2, 1380, 0, 1396, 2, 1396, 1, 1480, 3, 1500, 2, 1520, 2, 1528, 2, 1536, 1, 1544, 0, 1562, 1, 1586, 2, 1606, 2, 1612, 2, 1620, 3, 1624, 2, 1652, 1, 1670, 0, 1690, 0, 1698, 0, 1704, 1, 1708, 2, 1734, 3, 1754, 2, 1774, 2, 1780, 2, 1786, 1, 1794, 0, 1816, 1, 1838, 3, 1862, 3, 1878, 2, 1884, 1, 1906, 1, 1928, 0, 1948, 1, 1954, 0, 1962, 1, 1966, 2, 1988, 3, 2010, 3, 2030, 2, 2034, 3, 2040, 2, 2044, 3, 2046, 2, 2050, 1, 2072, 0, 2094, 1, 2114, 1, 2120, 1, 2128, 2, 2134, 1, 2158, 3, 2178, 2, 2198, 2, 2206, 2, 2214, 1, 2216, 0, 2240, 1, 2262, 1, 2284, 1, 2290, 1, 2296, 2, 2302, 3, 2326, 3, 2346, 3, 2366, 2, 2374, 2, 2380, 2, 2386, 1, 2392, 0, 2416, 1, 2436, 1, 2452, 2, 2458, 2, 2464, 2, 2474, 3, 2482, 2, 2500, 1, 2518, 0, 2538, 1, 2558, 2, 2580, 3, 2600, 2, 2620, 2, 2626, 2, 2634, 1, 2640, 0, 2664, 1, 2688, 1, 2706, 1, 2714, 1, 2718, 2, 2726, 3, 2748, 2, 2770, 0, 2792, 2, 2794, 1, 2796, 2, 2802, 0, 2804, 1, 2806, 2, 2810, 1, 2812, 0, 2830, 3, 2830, 0, 3152, 1, 3172, 2, 3194, 3, 3216, 2, 3236, 1, 3256, 0, 3278, 1, 3300, 2, 3320, 3, 3342, 2, 3364, 1, 3382, 0, 3404, 1, 3426, 2, 3448, 3, 3470, 2, 3490, 0, 3514, 1, 3528, 2, 3534, 0, 3550, 3, 3556, 1, 3570, 3, 3586, 0, 3600, 2, 3610, 1, 3620, 2, 3634, 0, 3646, 3, 3658, 1, 3670, 2, 3680, 0, 3690, 3, 3702, 1, 3712, 2, 3724, 0, 3734, 3, 3744, 1, 3754, 2, 3766, 0, 3774, 2, 3784, 1, 3794, 2, 3808, 0, 3820, 2, 3830, 1, 3840, 2, 3850, 0, 3860, 3, 3870, 1, 3882, 3, 3894, 0, 3904, 3, 3914, 1, 3924, 3, 3934, 1, 3944, 2, 3956, 0, 3966, 2, 3978, 1, 3988, 2, 3998, 1, 4010, 2, 4018, 0, 4028, 3, 4038, 1, 4052, 3, 4064, 0, 4072, 3, 4084, 1, 4092, 2, 4106, 0, 4114, 2, 4124, 1, 4134, 2, 4148, 0, 4156, 3, 4168, 1, 4176, 2, 4188, 0, 4198, 2, 4210, 1, 4220, 3, 4232, 1, 4242, 3, 4252, 0, 4260, 2, 4274, 1, 4282, 2, 4296, 0, 4304, 3, 4318, 1, 4326, 2, 4338, 0, 4346, 2, 4358, 1, 4368, 3, 4380, 0, 4390, 3, 4400, 1, 4410, 3, 4422, 1, 4432, 3, 4440, 0, 4450, 2, 4464, 1, 4474, 2, 4484, 2, 4508, 1, 4516, 2, 4528, 0, 4538, 2, 4550, 1, 4560, 3, 4570, 0, 4578, 3, 4592, 1, 4600, 2, 4612, 0, 4622, 3, 4634, 1, 4644, 3, 4656, 1, 4668, 3, 4676, 0, 4686, 2, 4698, 1, 4708, 3, 4718, 0, 4728, 3, 4738, 1, 4750, 2, 4760, 0, 4770, 3, 4780, 1, 4790, 2, 4802, 1, 4810, 2, 4824, 3, 4840, 3, 4866, 3, 4890, 3, 4912, 3, 4932, 3, 4954, 3, 4976, 1, 4996, 3, 4996, 3, 5006, 3, 5016, 3, 5026, 0, 5028, 3, 5048, 2, 5060, 1, 5080, 1, 5102, 1, 5124, 1, 5144, 0, 5164, 2, 5164, 1, 5184, 2, 5186, 3, 5206, 0, 5206, 3, 5226, 3, 5248, 1, 5268, 2, 5268, 2, 5278, 0, 5290, 0, 5312, 0, 5332, 3, 5342, 1, 5354, 2, 5364, 0, 5376, 2, 5394, 1, 5416, 2, 5440, 1, 5460, 2, 5482, 1, 5502, 0, 5522, 3, 5522, 1, 5544, 2, 5544, 3, 5566, 0, 5586, 2, 5586, 2, 5610, 1, 5610, 0, 5630, 2, 5630, 1, 5652, 0, 5672, 2, 5672, 3, 5682, 2, 5690, 1, 5694, 2, 5704, 0, 5716, 2, 5728, 1, 5738, 2, 5756, 0, 5774, 1, 5796, 0, 5818, 1, 5840, 2, 5842, 0, 5862, 2, 5864, 1, 5882, 3, 5884, 2, 5906, 0, 5924, 3, 5930, 2, 5944, 2, 5964, 1, 5966, 0, 5988, 2, 5988, 1, 6010, 3, 6010, 3, 6032, 2, 6044, 1, 6052, 2, 6070, 0, 6082, 2, 6092, 1, 6118, 2, 6122, 0, 6138, 3, 6138, 1, 6158, 2, 6158, 0, 6180, 3, 6180, 2, 6200, 1, 6222, 2, 6222, 2, 6242, 1, 6244, 1, 6264, 2, 6264, 2, 6284, 1, 6284, 2, 6306, 1, 6306, 2, 6326, 1, 6328, 1, 6348, 2, 6348, 3, 6366, 0, 6368, 2, 6372, 1, 6376, 1, 6392, 2, 6394, 2, 6412, 1, 6412, 1, 6434, 2, 6434, 2, 6454, 1, 6454, 1, 6474, 2, 6476, 2, 6496, 1, 6498, 2, 6518, 1, 6518, 2, 6528, 1, 6538, 2, 6538, 0, 6560, 3, 6560, 1, 6580, 3, 6584, 0, 6604, 2, 6604, 2, 6614, 1, 6624, 2, 6626, 0, 6640, 2, 6648, 1, 6666, 3, 6666, 0, 6688, 2, 6690, 2, 6698, 1, 6708, 2, 6708, 0, 6728, 3, 6730, 1, 6750, 3, 6752, 2, 6770, 3, 6778, 2, 6782, 3, 6788, 3, 6794, 2, 6794, 2, 6810, 1, 6810, 1, 6832, 2, 6832, 0, 6838, 3, 6840, 1, 6844, 2, 6846, 3, 6850, 0, 6852, 2, 6856, 1, 6856, 3, 6860, 0, 6862, 2, 6864, 1, 6864, 2, 6870, 1, 6894, 2, 6894, 2, 6916, 1, 6916, 0, 6940, 2, 6940, 2, 6948, 2, 6958, 1, 6962, 2, 6970, 0, 6982, 3, 6982, 3, 7002, 1, 7004, 1, 7024, 1, 7034, 0, 7046, 2, 7046, 1, 7068, 3, 7070, 0, 7090, 3, 7090, 2, 7110, 2, 7116, 2, 7126, 2, 7134, 1, 7148, 3, 7150, 1, 7170, 3, 7170, 0, 7192, 2, 7194, 2, 7202, 2, 7214, 1, 7216, 2, 7238, 1, 7238, 3, 7258, 0, 7258, 2, 7280, 1, 7280, 3, 7300, 0, 7300, 1, 7320, 3, 7322, 0, 7342, 3, 7344, 1, 7364, 2, 7364, 0, 7386, 3, 7386, 1, 7404, 2, 7406, 0, 7408, 3, 7410, 2, 7414, 1, 7416, 2, 7418, 0, 7420, 3, 7422, 1, 7424, 2, 7428, 3, 7430, 0, 7432, 1, 7438, 3, 7440, 2, 7444, 0, 7448, 3, 7448, 1, 7452, 2, 7454, 3, 7456, 0, 7460, 2, 7462, 1, 7464, 3, 7464, 0, 7468, 2, 7470, 1, 7472, 3, 7472, 0, 7476, 2, 7478, 1, 7480, 1, 7492, 2, 7492, 0, 7576, 2, 7578, 1, 7598, 3, 7600, 2, 7618, 3, 7624, 2, 7630, 3, 7634, 2, 7636, 1, 7658, 0, 7664, 1, 7670, 0, 7676, 1, 7680, 2, 7704, 1, 7704, 0, 7726, 3, 7726, 1, 7748, 2, 7750, 0, 7768, 3, 7768, 2, 7788, 3, 7792, 2, 7798, 3, 7800, 2, 7804, 0, 7828, 1, 7832, 0, 7838, 1, 7844, 0, 7848, 2, 7874, 1, 7876, 3, 7896, 0, 7896, 1, 7916, 2, 7916, 0, 7936, 3, 7936, 3, 7954, 2, 7960, 3, 7964, 2, 7970, 3, 7972, 2, 7976, 0, 7998, 1, 8002, 0, 8008, 1, 8012, 0, 8018, 1, 8020, 2, 8044, 1, 8044, 0, 8066, 3, 8066, 1, 8088, 2, 8088, 3, 8106, 0, 8106, 3, 8128, 1, 8128, 2, 8132, 0, 8132, 3, 8136, 1, 8138, 2, 8142, 3, 8144, 2, 8148, 2, 8170, 1, 8170, 0, 8190, 2, 8204, 1, 8210, 3, 8214, 0, 8214, 2, 8220, 1, 8222, 3, 8224, 2, 8230, 1, 8240, 2, 8254, 1, 8256, 0, 8274, 2, 8276, 3, 8296, 2, 8300, 3, 8306, 2, 8310, 0, 8336, 1, 8340, 0, 8346, 1, 8352, 0, 8356, 2, 8382, 1, 8382, 0, 8404, 3, 8404, 1, 8424, 2, 8426, 0, 8444, 3, 8444, 3, 8464, 0, 8466, 1, 8468, 2, 8468, 0, 8476, 3, 8478, 1, 8480, 2, 8480, 0, 8508, 3, 8510, 2, 8510, 1, 8510, 3, 8532, 0, 8532, 1, 8532, 2, 8532, 3, 8554, 2, 8554, 1, 8556, 0, 8556, 0, 8574, 2, 8574, 1, 8574, 3, 8574, 3, 8594, 0, 8594, 2, 8616, 1, 8616, 3, 8632, 0, 8634, 2, 8638, 1, 8640, 3, 8644, 0, 8646, 2, 8646, 1, 8648, 3, 8650, 0, 8678, 2, 8678, 3, 8698, 1, 8700, 2, 8722, 0, 8722, 3, 8722, 1, 8722, 3, 8742, 0, 8742, 2, 8764, 1, 8764, 0, 8784, 3, 8784, 3, 8820, 3, 8830, 2, 8848, 1, 8850, 3, 8858, 0, 8862, 2, 8862, 3, 8868, 2, 8872, 3, 8890, 2, 8896, 3, 8902, 2, 8906, 3, 8908, 2, 8912, 2, 8932, 1, 8932, 3, 8954, 0, 8954, 3, 8970, 2, 8976, 3, 8980, 3, 8986, 2, 8988, 0, 9012, 1, 9018, 0, 9024, 1, 9032, 3, 9054, 0, 9056, 2, 9066, 3, 9074, 2, 9084, 3, 9094, 0, 9104, 1, 9120, 2, 9120, 3, 9124, 0, 9142, 1, 9146, 2, 9148, 3, 9150, 3, 9182, 2, 9188, 1, 9194, 0, 9196, 0, 9224, 2, 9226, 1, 9230, 3, 9230, 3, 9248, 0, 9252, 3, 9272, 1, 9274, 2, 9292, 3, 9306, 2, 9310, 3, 9316, 0, 9316, 2, 9320, 1, 9320, 0, 9350, 1, 9356, 2, 9358, 3, 9362, 2, 9372, 2, 9380, 1, 9382, 0, 9388, 3, 9400, 1, 9418, 3, 9420, 0, 9440, 2, 9440, 3, 9446, 2, 9452, 3, 9456, 2, 9462, 1, 9478, 0, 9486, 1, 9500, 0, 9508, 1, 9512, 2, 9528, 1, 9530, 0, 9548, 3, 9548, 1, 9568, 3, 9570, 2, 9576, 0, 9576, 3, 9580, 1, 9580, 2, 9584, 3, 9588, 2, 9592, 3, 9606, 1, 9608, 0, 9628, 3, 9628, 1, 9650, 2, 9650, 0, 9658, 2, 9658, 1, 9664, 2, 9668, 0, 9690, 3, 9692, 1, 9710, 3, 9712, 0, 9732, 2, 9734, 1, 9738, 2, 9742, 0, 9748, 1, 9750, 2, 9750, 3, 9774, 0, 9776, 2, 9798, 1, 9798, 2, 9818, 0, 9820, 1, 9824, 2, 9826, 2, 9834, 1, 9858, 3, 9860, 3, 9870, 0, 9872, 1, 9878, 2, 9880, 2, 9888, 0, 9890, 3, 9906, 1, 9910, 0, 9926, 3, 9926, 2, 9948, 1, 9948, 0, 9970, 2, 9970, 2, 9988, 1, 9988, 0, 9996, 2, 9996, 1, 10000, 3, 10002, 1, 10028, 3, 10030, 0, 10040, 3, 10040, 1, 10046, 2, 10048, 2, 10068, 2, 10080, 1, 10084, 2, 10094, 0, 10098, 1, 10118, 3, 10120, 0, 10136, 2, 10140, 1, 10158, 3, 10160, 2, 10164, 0, 10168, 3, 10170, 1, 10174, 2, 10176, 2, 10182, 3, 10184, 1, 10188, 3, 10198, 1, 10204, 3, 10222, 0, 10242, 2, 10244, 1, 10264, 2, 10264, 0, 10284, 3, 10286, 1, 10376, 2, 10390, 0, 10404, 3, 10418, 1, 10426, 3, 10440, 0, 10450, 2, 10462, 1, 10472, 2, 10482, 0, 10494, 2, 10502, 1, 10512, 2, 10522, 0, 10536, 3, 10544, 1, 10556, 3, 10570, 0, 10580, 2, 10590, 1, 10602, 2, 10614, 0, 10624, 2, 10642, 1, 10652, 3, 10662, 0, 10670, 3, 10682, 1, 10692, 3, 10704, 0, 10712, 3, 10726, 1, 10734, 2, 10742, 0, 10754, 2, 10764, 1, 10774, 3, 10786, 0, 10798, 3, 10806, 1, 10818, 2, 10828, 0, 10840, 2, 10848, 1, 10860, 0, 10872, 1, 10882, 0, 10894, 1, 10902, 3, 10912, 1, 10924, 2, 10936, 0, 10944, 2, 10954, 1, 10966, 3, 10974, 0, 10988, 2, 11002, 1, 11014, 3, 11024, 0, 11038, 3, 11050, 1, 11062, 2, 11072, 0, 11082, 3, 11096, 1, 11106, 2, 11116, 0, 11124, 2, 11134, 1, 11144, 3, 11156, 0, 11166, 2, 11178, 1, 11188, 3, 11198, 0, 11208, 2, 11220, 1, 11230, 2, 11240, 1, 11250, 2, 11260, 0, 11270, 3, 11282, 1, 11292, 2, 11304, 0, 11314, 2, 11326, 1, 11336, 3, 11346, 0, 11352, 3, 11364, 1, 11376, 3, 11390, 0, 11402, 3, 11410, 1, 11420, 3, 11432, 0, 11440, 2, 11450, 1, 11462, 2, 11476, 0, 11484, 3, 11496, 1, 11506, 2, 11516, 0, 11526, 3, 11538, 1, 11548, 2, 11560, 1, 11570, 2, 11578, 0, 11588, 3, 11600, 1, 11610, 2, 11622, 0, 11634, 3, 11644, 1, 11654, 2, 11666, 0, 11676, 3, 11686, 1, 11696, 2, 11708, 0, 11716, 3, 11728, 1, 11738, 2, 11750, 1, 11762, 3, 11772, 0, 11780, 3, 11790, 1, 11802, 3, 11812, 0, 11822, 3, 11832, 1, 11842, 2, 11852, 0, 11864, 2, 11876, 1, 11886, 2, 11900, 1, 11908, 3, 11920, 0, 11926, 3, 11938, 1, 11950, 2, 11962, 0, 11972, 3, 11982, 1, 11992, 2, 12004, 0, 12014, 3, 12024, 1, 12034, 2, 12046, 0, 12054, 3, 12066, 1, 12078, 2, 12088, 0, 12100, 3, 12108, 1, 12120, 2, 12130, 1, 12140, 3, 12150, 0, 12162, 3, 12172, 1, 12182, 2, 12194, 0, 12202, 3, 12214, 1, 12222, 2, 12234, 0, 12244, 3, 12254, 1, 12264, 2, 12274, 3, 12286, 0, 12318, 2, 12320, 1, 12344, 3, 12344, 0, 12366, 2, 12368, 3, 12388, 1, 12388, 0, 12410, 2, 12410, 3, 12428, 1, 12430, 3, 12450, 0, 12452, 2, 12462, 3, 12470, 2, 12480, 1, 12484, 2, 12504, 0, 12512, 1, 12536, 0, 12556, 1, 12576, 0, 12596, 1, 12616, 2, 12618, 3, 12638, 0, 12638, 1, 12662, 3, 12662, 2, 12682, 1, 12682, 2, 12702, 0, 12724, 3, 12726, 2, 12734, 1, 12744, 2, 12768, 0, 12786, 3, 12796, 1, 12808, 2, 12818, 0, 12826, 1, 12850, 0, 12872, 1, 12894, 0, 12916, 1, 12936, 0, 12956, 1, 12976, 2, 12976, 0, 12996, 3, 12998, 1, 13018, 2, 13018, 0, 13038, 3, 13040, 2, 13062, 1, 13062, 2, 13082, 1, 13104, 3, 13106, 0, 13126, 3, 13126, 2, 13136, 1, 13146, 2, 13154, 0, 13168, 1, 13182, 0, 13192, 1, 13212, 3, 13232, 0, 13232, 1, 13252, 2, 13254, 0, 13272, 3, 13274, 2, 13298, 1, 13298, 3, 13304, 2, 13312, 1, 13338, 0, 13360, 1, 13380, 0, 13400, 2, 13400, 3, 13412, 1, 13422, 0, 13446, 1, 13466, 3, 13486, 0, 13486, 2, 13500, 1, 13512, 2, 13528, 0, 13530, 3, 13538, 2, 13546, 1, 13548, 0, 13570, 3, 13572, 2, 13580, 1, 13590, 2, 13592, 0, 13612, 2, 13612, 3, 13634, 1, 13634, 2, 13640, 2, 13652, 2, 13676, 1, 13676, 3, 13696, 0, 13698, 2, 13718, 1, 13722, 3, 13728, 2, 13734, 3, 13738, 2, 13744, 0, 13756, 1, 13780, 0, 13802, 3, 13804, 2, 13814, 1, 13826, 2, 13844, 0, 13846, 1, 13866, 3, 13868, 0, 13886, 3, 13888, 2, 13896, 1, 13906, 2, 13912, 0, 13926, 3, 13946, 1, 13950, 0, 13972, 2, 13972, 2, 13982, 1, 13992, 2, 13996, 0, 14016, 3, 14016, 3, 14036, 1, 14036, 3, 14058, 0, 14060, 2, 14078, 1, 14080, 3, 14100, 0, 14100, 2, 14108, 1, 14118, 2, 14126, 0, 14140, 3, 14148, 1, 14160, 3, 14168, 0, 14180, 3, 14186, 1, 14194, 3, 14196, 3, 14206, 0, 14206, 3, 14214, 3, 14224, 3, 14234, 1, 14240, 3, 14242, 0, 14248, 3, 14250, 1, 14254, 2, 14258, 0, 14268, 3, 14356, 0, 14356, 1, 14374, 2, 14374, 3, 14384, 0, 14384, 2, 14394, 1, 14394, 1, 14416, 2, 14416, 0, 14436, 3, 14436, 1, 14454, 2, 14456, 3, 14462, 2, 14470, 3, 14474, 0, 14478, 2, 14478, 1, 14500, 0, 14520, 1, 14542, 2, 14546, 0, 14546, 1, 14554, 2, 14560, 0, 14562, 1, 14586, 3, 14586, 0, 14604, 3, 14606, 1, 14626, 2, 14626, 2, 14636, 0, 14646, 2, 14648, 1, 14670, 2, 14674, 2, 14684, 1, 14696, 3, 14696, 3, 14712, 0, 14714, 2, 14722, 1, 14732, 2, 14736, 3, 14754, 0, 14760, 2, 14760, 2, 14778, 1, 14780, 0, 14798, 3, 14800, 2, 14808, 1, 14818, 0, 14842, 2, 14844, 1, 14862, 3, 14866, 2, 14886, 2, 14894, 3, 14900, 0, 14904, 1, 14926, 2, 14926, 3, 14946, 0, 14946, 2, 14968, 1, 14968, 0, 14988, 1, 15002, 3, 15010, 1, 15034, 2, 15034, 0, 15052, 1, 15064, 3, 15076, 2, 15094, 1, 15116, 0, 15134, 1, 15142, 2, 15150, 1, 15150, 2, 15160, 3, 15178, 0, 15180, 1, 15204, 2, 15204, 0, 15222, 1, 15232, 2, 15240, 3, 15260, 1, 15284, 2, 15284, 0, 15304, 1, 15312, 2, 15328, 1, 15348, 0, 15358, 1, 15366, 3, 15388, 1, 15392, 2, 15400, 0, 15410, 2, 15432, 1, 15434, 0, 15438, 3, 15438, 1, 15442, 2, 15444, 3, 15448, 2, 15454, 1, 15476, 2, 15476, 2, 15486, 2, 15496, 0, 15500, 3, 15514, 2, 15520, 3, 15524, 2, 15528, 1, 15540, 0, 15562, 1, 15584, 2, 15590, 1, 15600, 3, 15608, 0, 15616, 2, 15628, 1, 15632, 2, 15644, 1, 15666, 3, 15666, 3, 15688, 0, 15688, 2, 15710, 1, 15710, 2, 15730, 1, 15736, 3, 15746, 2, 15752, 0, 15770, 3, 15772, 1, 15794, 2, 15794, 3, 15812, 2, 15820, 3, 15828, 1, 15834, 2, 15834, 3, 15848, 2, 15858, 0, 15868, 2, 15870, 3, 15888, 1, 15892, 2, 15898, 2, 15920, 0, 15920, 1, 15942, 0, 15952, 3, 15962, 1, 15966, 2, 15984, 0, 15986, 3, 15992, 2, 16000, 1, 16006, 0, 16026, 2, 16026, 3, 16046, 1, 16046, 2, 16068, 0, 16070, 3, 16076, 2, 16086, 1, 16090, 3, 16108, 2, 16114, 3, 16128, 2, 16128, 0, 16152, 1, 16152, 2, 16178, 3, 16178, 0, 16196, 3, 16198, 1, 16214, 2, 16216, 2, 16240, 2, 16250, 1, 16260, 2, 16260, 3, 16280, 0, 16282, 2, 16302, 1, 16304, 3, 16320, 0, 16324, 3, 16340, 2, 16346, 2, 16360, 1, 16386, 2, 16386, 3, 16406, 0, 16408, 3, 16422, 2, 16426, 3, 16432, 2, 16432, 1, 16450, 2, 16452, 0, 16472, 3, 16472, 1, 16492, 2, 16492, 3, 16498, 2, 16512, 3, 16512, 0, 16514, 1, 16514, 3, 16534, 0, 16534, 3, 16558, 0, 16558, 2, 16578, 1, 16578, 3, 16586, 0, 16600, 2, 16600, 1, 16620, 2, 16620, 0, 16640, 3, 16642, 2, 16658, 3, 16664, 1, 16668, 2, 16670, 3, 16674, 2, 16680, 0, 16684, 3, 16702, 1, 16704, 0, 16724, 2, 16724, 1, 16744, 2, 16746, 3, 16754, 0, 16758, 2, 16758, 3, 16764, 1, 16764, 2, 16766, 3, 16788, 2, 16810, 0, 16812, 3, 16830, 1, 16832, 2, 16836, 0, 16840, 3, 16842, 2, 16846, 1, 16846, 0, 16872, 3, 16874, 3, 16894, 0, 16896, 2, 16896, 1, 16918, 3, 16918, 0, 16922, 0, 16938, 2, 16938, 3, 16938, 2, 16958, 3, 16958, 1, 16958, 0, 16978, 3, 16980, 1, 17000, 2, 17000, 3, 17000, 0, 17020, 3, 17020, 2, 17026, 2, 17040, 1, 17046, 2, 17066, 0, 17066, 2, 17088, 1, 17090, 3, 17098, 2, 17106, 0, 17108, 2, 17128, 1, 17130, 3, 17150, 0, 17150, 2, 17170, 1, 17170, 3, 17190, 2, 17196, 0, 17198, 3, 17206, 2, 17212, 0, 17232, 1, 17256, 0, 17276, 2, 17280, 1, 17284, 3, 17286, 3, 17316, 2, 17336, 1, 17360, 0, 17364, 1, 17374, 2, 17380, 3, 17390, 2, 17400, 1, 17422, 0, 17444, 1, 17450, 0, 17458, 2, 17458, 3, 17466, 2, 17480, 1, 17498, 0, 17520, 1, 17534, 2, 17542, 3, 17548, 2, 17552, 3, 17556, 2, 17560, 1, 17570, 0, 17592, 1, 17614, 2, 17620, 3, 17626, 2, 17632, 1, 17640, 0, 17652, 1, 17676, 3, 17698, 0, 17700, 2, 17708, 2, 17718, 1, 17722, 3, 17740, 0, 17742, 1, 17764, 2, 17764, 3, 17776, 2, 17784, 3, 17794, 0, 17798, 2, 17800, 0, 17800, 2, 17810, 1, 17828, 3, 17830, 0, 17848, 3, 17848, 1, 17868, 2, 17868, 3, 17874, 2, 17882, 2, 17888, 0, 17894, 1, 17912, 0, 17932, 1, 17954, 3, 17958, 2, 17964, 0, 17974, 2, 17974, 3, 17976, 1, 17994, 3, 18016, 2, 18038, 0, 18038, 3, 18046, 1, 18048, 2, 18052, 2, 18076, 0, 18076, 1, 18100, 3, 18104, 0, 18126, 2, 18126, 3, 18134, 1, 18166, 2, 18168, 0, 18190, 3, 18190, 1, 18210, 2, 18210, 0, 18230, 3, 18232, 2, 18252, 1, 18254, 3, 18260, 2, 18266, 3, 18270, 2, 18274, 0, 18274, 1, 18292, 0, 18314, 1, 18336, 2, 18344, 3, 18352, 2, 18372, 0, 18376, 1, 18396, 3, 18396, 0, 18416, 2, 18418, 1, 18454, 3, 18458, 0, 18482, 3, 18484, 1, 18504, 2, 18506, 0, 18526, 3, 18528, 1, 18548, 2, 18550, 0, 18570, 2, 18570, 1, 18590, 0, 18610, 1, 18632, 3, 18654, 2, 18674, 0, 18694, 1, 18718, 2, 18728, 0, 18740, 3, 18744, 1, 18750, 2, 18754, 0, 18776, 1, 18798, 0, 18822, 1, 18844, 0, 18864, 3, 18886, 1, 18906, 2, 18908, 0, 18930, 3, 18932, 2, 18950, 1, 18950, 0, 18970, 3, 18972, 1, 18992, 2, 18992, 3, 19012, 0, 19012, 2, 19034, 1, 19034, 0, 19054, 3, 19054, 2, 19096, 1, 19120, 3, 19120, 0, 19140, 2, 19142, 1, 19162, 0, 19182, 2, 19182, 1, 19204, 3, 19206, 0, 19224, 3, 19226, 2, 19246, 1, 19246, 3, 19250, 0, 19252, 2, 19256, 3, 19260, 2, 19284, 1, 19284, 0, 19308, 3, 19308, 1, 19330, 2, 19330, 0, 19350, 3, 19352, 2, 19372, 1, 19374, 3, 19392, 0, 19392, 1, 19404, 2, 19418, 3, 19422, 0, 19426, 2, 19428, 1, 19432, 0, 19452, 1, 19476, 3, 19498, 2, 19520, 1, 19542, 0, 19562, 1, 19584, 3, 19584, 0, 19606, 2, 19608, 1, 19628, 3, 19630, 2, 19650, 1, 19668, 3, 19670, 0, 19688, 2, 19688, 1, 19710, 3, 19710, 2, 19734, 0, 19736, 1, 19778, 3, 19780];
  resize_game();
}

function start(){
  if (!started){
    
    started = true;
    gamechart = chart.slice();
    
    song.currentTime = 0;
    
    HP = 100;
    
    alive = true;
    lastBeatTimer = 0;
    
    arrow_spacing = 144;
    
    arrow_width = 142;
    arrow_height = 142;
    
    scroll_speed = 25;
    current_time = 0;
    
    hit_precision = 6 - scroll_speed * 0.06;
    if (hit_precision < 1) hit_precision = 1;
    
    hits = 0;
    misses = 0;
    
    combo = 0;
    
    beat_every = (60/BPM); // Beat occurs on every multiple of this
    
    arrow_pulses = [0, 0, 0, 0];
    pulse_size = 0;
    
    pressednotes = "[";
  
    song.play();
    if (!firstStart)setInterval(onframe, 1000/FPS);
    
    firstStart = true;
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
  
  if (HP > 100) HP = 100;
  if (HP < 0) die();
  
  accuracy = Math.floor(hits/(hits+misses) * 100);
  
  if(hits+misses === 0) accuracy = 100;
  
  if (arrow_pulses[0] > 0) arrow_pulses[0]--;
  if (arrow_pulses[1] > 0) arrow_pulses[1]--;
  if (arrow_pulses[2] > 0) arrow_pulses[2]--;
  if (arrow_pulses[3] > 0) arrow_pulses[3]--;
  
  if (pulse_size > 0) pulse_size--;
  
  ax = canvas.width/2 - arrow_spacing * 1.5; // AX is the horizontal center of the left arrow
  ay = canvas.height - 80 - arrow_height/2; // AY is the vertical center of all arrows
  
  currentBeatTimer = ((current_time/60)+BPM_offset)%beat_every
  
  if (lastBeatTimer > currentBeatTimer && (current_time/60)-BPM_offset > 0){
    beat();
  }
  
  lastBeatTimer = currentBeatTimer
  
  render();
}

function beat(){
  pulse_size = 10;
}

function die(){
  song.pause();
  started = false;
  alive = false;
}

function render(){
  ctx.fillStyle = "rgb("+(45-pulse_size)+","+(44-pulse_size)+","+(46-pulse_size)+")";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = "rgb(61, 58, 60)";
  ctx.fillRect(ax - (arrow_width+pulse_size*2)/2 - 8, 0, arrow_spacing*3 + arrow_width + pulse_size*2 + 16, canvas.height);
  
  draw_arrows();
  draw_chart();
  draw_debug();
  draw_health();
    
  calculateFPSNormal();
}


function draw_health(){
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, canvas.height-10, canvas.width, 10);
  
  var colorHP = HP * 2.55
  
  ctx.fillStyle = "rgb("+(255 - colorHP)+","+colorHP+ ", 0)";
  ctx.fillRect(0, canvas.height-10, canvas.width * HP/100, 10);
}

function draw_debug(){
  ctx.textAlign = "left";
  ctx.font = "11px Tahoma";
  
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
  
  ctx.fillText("Health: "+ HP + "%", 0, 204);
  
  ctx.textAlign = "center";
  ctx.fillText("Accuracy: " + accuracy + "%", canvas.width/2, canvas.height - 20);
  
  ctx.font = "40px Tahoma";
  
  ctx.fillText(combo, canvas.width/2, canvas.height - 40);
  
  
  if (!alive){
    ctx.fillText("You died, click to restart.", canvas.width/2, canvas.height/2)
    ctx.fillText("You made it " + Math.round((song.currentTime/song.duration)*100) + "% into the song.", canvas.width /2, canvas.height/2 + 40)
  }
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
      temp_scale = arrow_pulses[i] * 10;
    }
    var WIDTH = arrow_width + temp_scale + pulse_size // Adds all scales
    var HEIGHT = arrow_height + temp_scale + pulse_size // Adds all scales
    
    var xPOS = ax + (arrow_spacing * i) - (WIDTH/2);
    var yPOS = ay - (HEIGHT/2);

    ctx.drawImage(arrows, i * 256, 768 - sprite_offset, 256, 256, xPOS, yPOS, WIDTH, HEIGHT);
  }
}

function draw_chart(){
  for (i = 0; i <= gamechart.length/2; i++){
    var arrow_n =        gamechart[i*2]; // direction of arrow
    var arrow_position = gamechart[i*2 + 1];
    var arrow_screen = arrow_position * scroll_speed - (scroll_speed * current_time); // position of arrow on screen
    
    if (arrow_position-current_time < hit_precision - 16){
      gamechart.splice(i*2, 2);
      miss_note();
    }; // deletes missed notes
    
    if (arrow_screen + arrow_height > 0){
      
      
      var WIDTH = arrow_width + pulse_size // Adds all scales
      var HEIGHT = arrow_height + pulse_size // Adds all scales
      
      var xPOS = ax + (arrow_spacing * arrow_n) - (WIDTH/2);
      var yPOS = ay - (HEIGHT/2) - arrow_screen;
    
      ctx.drawImage(arrows, arrow_n * 256, 512, 256, 256, xPOS , yPOS, WIDTH, HEIGHT);
    }
  }
}

function miss_note(){
  misses++;
  HP -= 16;
  combo = 0;
}

function press_input(note){
  lowest_note = NaN;
  
  pressednotes = pressednotes + note + ", ";
  pressednotes = pressednotes + Math.round((current_time/2))*2 + ", ";
  
  var hittable_note = false; // checks if there is a note where the wrong input was hit
  
  for (i = 0; i <= gamechart.length/2; i++){
    var arrow_n =        gamechart[i*2]; // direction of arrow
    var arrow_position = gamechart[i*2 + 1]; //position of arrow
    
    if (arrow_n == note && Math.abs(arrow_position-current_time) < hit_precision){
      if (arrow_position < gamechart[lowest_note] || isNaN(lowest_note)) lowest_note = i*2;
    }
    
    if (Math.abs(arrow_position-current_time) < hit_precision){
      hittable_note = true;
    }
  }
  
  if (!isNaN(lowest_note)){
    gamechart.splice(lowest_note, 2);
    hits++;
    HP += 14
    combo++;
    arrow_pulse(note);
    return
  } 
  
  if (hittable_note){
    miss_note();
  }
  
  
}

function arrow_pulse(note){
  arrow_pulses[note] = 8; //frames
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

