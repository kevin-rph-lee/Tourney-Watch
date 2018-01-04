exports.seed = async function(knex, promise){
  const tournamentTask = (async () => {
    await knex('tournaments').del();
    return knex('tournaments').returning('*').insert([
      {name: 'Test Tournament', description: 'My tournament for testing', no_of_teams: 8, creator_user_id: 54, is_started: false, twitch_channel: 'WhtMage'}
    ]);
  })();

  const usersTask = (async () => {
    await knex('users').del();
    return knex('users').returning('*').insert([
      {email:'aaaa@aifhiaw.com',password:'123456',battlenet_id:'Samuel#1066'},
      {email:'pfa7u7.n0v7_iin@iw2fv4.com',password:'password',battlenet_id:'Rubye#3562'},
      {email:'28xmm0jsmpsf-@lfkh1eg9.com',password:'password',battlenet_id:'Stormy#691'},
      {email:'g-jmucg@92atcmqm4.com',password:'password',battlenet_id:'Lela#1231'},
      {email:'k0zwc-65c.2p@s6m2g64m3un.com',password:'password',battlenet_id:'Ena#29941'},
      {email:'23_tt1@4pmnrkgjmf.com',password:'password',battlenet_id:'Alix#727'},
      {email:'z6bp_9hm13z_on2@m6haywmadwh.com',password:'password',battlenet_id:'Eloisa#'},
      {email:'nk1.d3o@bxunlkajyn0z.com',password:'password',battlenet_id:'Alaina#'},
      {email:'a95n08@aeh9rrw.com',password:'password',battlenet_id:'Fawn#2565'},
      {email:'n7x_p_k1@atmnsmwym.com',password:'password',battlenet_id:'Evonne#3042'},
      {email:'2qm1uux..@iquujgtye.com',password:'password',battlenet_id:'Brandee#3771'},
      {email:'em2s7bdspx-da@j3t3ot2w.com',password:'password',battlenet_id:'Beth#1154'},
      {email:'gis29xsj36-iy_m@en8bq8ki.com',password:'password',battlenet_id:'Floria#3205'},
      {email:'x_6i0eof@vcbhuk.com',password:'password',battlenet_id:'Mariko#2006'},
      {email:'ifahrevng.kri2t@5ylcvpq1.com',password:'password',battlenet_id:'Marybelle#848'},
      {email:'5id@bgqjlqq3u.com',password:'password',battlenet_id:'Inell#2293'},
      {email:'3.phid2b4admrvc@rc5ze7.com',password:'password',battlenet_id:'Sabrina#1493'},
      {email:'fgbw-xvcmvru4v@h4ki8xyqze.com',password:'password',battlenet_id:'Hassan#2689'},
      {email:'7yp2iu8jd@55y7fhmz0.com',password:'password',battlenet_id:'Melissa#150'},
      {email:'4gez65dt0wa3ip@qp9lybesz-y8.com',password:'password',battlenet_id:'Allan#1745'},
      {email:'8iixpmk@hdnza9z2.com',password:'password',battlenet_id:'Jefferson#1150'},
      {email:'gwbsj@cw12wn.com',password:'password',battlenet_id:'Misha#515'},
      {email:'2tf0evjo3m3@pmyec5ijpj1x.com',password:'password',battlenet_id:'Sharleen#2748'},
      {email:'oc-328@qhanluvz.com',password:'password',battlenet_id:'Iluminada#1928'},
      {email:'p3kd7m@8cvlll0xxlzu.com',password:'password',battlenet_id:'Ara#2341'},
      {email:'qtw@p67-qujn.com',password:'password',battlenet_id:'Lemuel#460'},
      {email:'yb7_-9vki8i7tut@bv7rdr89m7n7.com',password:'password',battlenet_id:'Honey#3921'},
      {email:'8fo9@0m567dc1l8h.com',password:'password',battlenet_id:'Laure#789'},
      {email:'kql3t4yqeu6.1@u64813iu.com',password:'password',battlenet_id:'Hiedi#2107'},
      {email:'z27-xb5blhn@azdyeh.com',password:'password',battlenet_id:'Brianna#2899'},
      {email:'7cdu2@7ytv8.com',password:'password',battlenet_id:'Trent#1524'},
      {email:'hz018pynlm16p@85t-ah6cko5g.com',password:'password',battlenet_id:'Cordell#3354'},
      {email:'4_f@1f4x5yaq.com',password:'password',battlenet_id:'Son#3969'},
      {email:'5zfgv_2u_0oah57@n5ge4l69.com',password:'password',battlenet_id:'Kerri#3512'},
      {email:'34th@250p0f086.com',password:'password',battlenet_id:'German#1244'},
      {email:'399-z2ls0@pjikgm29die.com',password:'password',battlenet_id:'Antwan#1245'},
      {email:'dj.ih9c246wy4@imb1jr.com',password:'password',battlenet_id:'Lazaro#1254'},
      {email:'4g6sd92i24l_3uf@wv6nop-fy.com',password:'password',battlenet_id:'Genie#3770'},
      {email:'owznbpt@67v2w4q.com',password:'password',battlenet_id:'Maricruz#364'},
      {email:'pcxv1hp@cw5b2s.com',password:'password',battlenet_id:'Basilia#3139'},
      {email:'8_xhaa1@68jvsbb5ep81.com',password:'password',battlenet_id:'Heide#988'},
      {email:'duncand@yahoo.ca',password:'password',battlenet_id:'Luna#14851'},
      {email:'pakaste@att.net',password:'password',battlenet_id:'Shayla#1243'},
      {email:'dwsauder@me.com',password:'password',battlenet_id:'Susan#1255'},
      {email:'johnh@msn.com',password:'password',battlenet_id:'Reena#1513'},
      {email:'valdez@verizon.net',password:'password',battlenet_id:'Parthenia#645'},
      {email:'bachmann@att.net',password:'password',battlenet_id:'Ocie#124'},
      {email:'jimmichie@mac.com',password:'password',battlenet_id:'Maria#35234'},
      {email:'amaranth@hotmail.com',password:'password',battlenet_id:'Fatimah#1241'},
      {email:'mthurn@icloud.com',password:'password',battlenet_id:'Kelsie#241'},
      {email:'report@gmail.com',password:'password',battlenet_id:'Belia#4444'},
      {email:'pplinux@hotmail.com',password:'password',battlenet_id:'Lakia#2124'},
      {email:'seemant@mac.com',password:'password',battlenet_id:'Alva#1244'}
    ]);
  })();
  const teamsTask = (async () => {
    const [tournament] = await tournamentTask;
    const tournament_id = tournament.id;
    await knex('teams').del();
    return knex('teams').insert([
      {tournament_id},
      {tournament_id},
      {tournament_id},
      {tournament_id},
      {tournament_id},
      {tournament_id},
      {tournament_id},
      {tournament_id},
    ]);
  })();
  const tournament_enrollmentTask = (async () => {
    const [tournament] = await tournamentTask;
    const tournament_id = tournament.id;
    console.log('Tournement ID, ' + tournament_id);
    const users = await usersTask;
    await knex('enrollments').del();
    return knex('enrollments').insert([
      {user_id:users[0].id,tournament_id,level:116,first_role:'offense',first_role_time_played:419360598,second_role:'tank',second_role_time_played:140751791,medal_gold:1272,medal_silver:967,medal_bronze:848,games_won:1268},
      {user_id:users[1].id,tournament_id,level:100,first_role:'offense',first_role_time_played:91260000,second_role:'support',second_role_time_played:68400000,medal_gold:688,medal_silver:608,medal_bronze:478,games_won:323},
      {user_id:users[2].id,tournament_id,level:87,first_role:'offense',first_role_time_played:44940000,second_role:'support',second_role_time_played:30600000,medal_gold:342,medal_silver:310,medal_bronze:214,games_won:158},
      {user_id:users[3].id,tournament_id,level:60,first_role:'tank',first_role_time_played:450000000,second_role:'support',second_role_time_played:303300000,medal_gold:2537,medal_silver:2204,medal_bronze:2068,games_won:1465},
      {user_id:users[4].id,tournament_id,level:97,first_role:'offense',first_role_time_played:90420000,second_role:'defense',second_role_time_played:77700000,medal_gold:852,medal_silver:677,medal_bronze:497,games_won:361},
      {user_id:users[5].id,tournament_id,level:50,first_role:'offense',first_role_time_played:123840000,second_role:'defense',second_role_time_played:55020000,medal_gold:608,medal_silver:609,medal_bronze:455,games_won:315},
      {user_id:users[6].id,tournament_id,level:23,first_role:'offense',first_role_time_played:484380000,second_role:'tank',second_role_time_played:388800000,medal_gold:2666,medal_silver:2695,medal_bronze:2412,games_won:1565},
      {user_id:users[7].id,tournament_id,level:74,first_role:'defense',first_role_time_played:316800000,second_role:'support',second_role_time_played:219600000,medal_gold:1886,medal_silver:1814,medal_bronze:1802,games_won:1125},
      {user_id:users[8].id,tournament_id,level:55,first_role:'defense',first_role_time_played:115200000,second_role:'offense',second_role_time_played:77580000,medal_gold:754,medal_silver:649,medal_bronze:542,games_won:385},
      {user_id:users[9].id,tournament_id,level:51,first_role:'support',first_role_time_played:166740000,second_role:'offense',second_role_time_played:137520000,medal_gold:1165,medal_silver:1001,medal_bronze:827,games_won:623},
      {user_id:users[10].id,tournament_id,level:47,first_role:'support',first_role_time_played:47640000,second_role:'tank',second_role_time_played:46140000,medal_gold:484,medal_silver:377,medal_bronze:322,games_won:209},
      {user_id:users[11].id,tournament_id,level:51,first_role:'support',first_role_time_played:110940000,second_role:'offense',second_role_time_played:110760000,medal_gold:959,medal_silver:735,medal_bronze:596,games_won:421},
      {user_id:users[12].id,tournament_id,level:66,first_role:'offense',first_role_time_played:146280000,second_role:'defense',second_role_time_played:120240000,medal_gold:842,medal_silver:702,medal_bronze:619,games_won:440},
      {user_id:users[13].id,tournament_id,level:107,first_role:'tank',first_role_time_played:714815497,second_role:'offense',second_role_time_played:167224305,medal_gold:2415,medal_silver:848,medal_bronze:1740,games_won:1880},
      {user_id:users[14].id,tournament_id,level:294,first_role:'tank',first_role_time_played:465518275,second_role:'offense',second_role_time_played:375222387,medal_gold:893,medal_silver:520,medal_bronze:1234,games_won:364},
      {user_id:users[15].id,tournament_id,level:249,first_role:'defense',first_role_time_played:6500037,second_role:'tank',second_role_time_played:96372667,medal_gold:2091,medal_silver:1611,medal_bronze:715,games_won:340},
      {user_id:users[16].id,tournament_id,level:321,first_role:'tank',first_role_time_played:179804149,second_role:'offense',second_role_time_played:414631309,medal_gold:350,medal_silver:1521,medal_bronze:1724,games_won:1951},
      {user_id:users[17].id,tournament_id,level:370,first_role:'offense',first_role_time_played:346656004,second_role:'defense',second_role_time_played:378012548,medal_gold:2245,medal_silver:1187,medal_bronze:676,games_won:1146},
      {user_id:users[18].id,tournament_id,level:37,first_role:'defense',first_role_time_played:543235423,second_role:'offense',second_role_time_played:157981500,medal_gold:799,medal_silver:1997,medal_bronze:776,games_won:707},
      {user_id:users[19].id,tournament_id,level:182,first_role:'defense',first_role_time_played:638647078,second_role:'support',second_role_time_played:440355809,medal_gold:1461,medal_silver:1256,medal_bronze:1611,games_won:1304},
      {user_id:users[20].id,tournament_id,level:58,first_role:'offense',first_role_time_played:355229277,second_role:'support',second_role_time_played:11913934,medal_gold:1868,medal_silver:1680,medal_bronze:1185,games_won:396},
      {user_id:users[21].id,tournament_id,level:149,first_role:'tank',first_role_time_played:727702265,second_role:'defense',second_role_time_played:433235776,medal_gold:1585,medal_silver:1609,medal_bronze:1185,games_won:776},
      {user_id:users[22].id,tournament_id,level:398,first_role:'support',first_role_time_played:618875597,second_role:'offense',second_role_time_played:210336829,medal_gold:1311,medal_silver:793,medal_bronze:1555,games_won:1490},
      {user_id:users[23].id,tournament_id,level:254,first_role:'defense',first_role_time_played:688499147,second_role:'offense',second_role_time_played:388185188,medal_gold:862,medal_silver:1718,medal_bronze:465,games_won:1841},
      {user_id:users[24].id,tournament_id,level:209,first_role:'tank',first_role_time_played:75357553,second_role:'offense',second_role_time_played:411923687,medal_gold:621,medal_silver:1259,medal_bronze:812,games_won:454},
      {user_id:users[25].id,tournament_id,level:265,first_role:'support',first_role_time_played:746920892,second_role:'tank',second_role_time_played:95861620,medal_gold:736,medal_silver:583,medal_bronze:1286,games_won:560},
      {user_id:users[26].id,tournament_id,level:57,first_role:'offense',first_role_time_played:402213743,second_role:'support',second_role_time_played:201476135,medal_gold:283,medal_silver:1103,medal_bronze:493,games_won:188},
      {user_id:users[27].id,tournament_id,level:225,first_role:'defense',first_role_time_played:521793164,second_role:'support',second_role_time_played:262366470,medal_gold:1833,medal_silver:1695,medal_bronze:883,games_won:1134},
      {user_id:users[28].id,tournament_id,level:277,first_role:'defense',first_role_time_played:730590422,second_role:'offense',second_role_time_played:262164294,medal_gold:2454,medal_silver:1309,medal_bronze:844,games_won:1552},
      {user_id:users[29].id,tournament_id,level:273,first_role:'support',first_role_time_played:775958713,second_role:'tank',second_role_time_played:515671418,medal_gold:1093,medal_silver:966,medal_bronze:496,games_won:115},
      {user_id:users[30].id,tournament_id,level:258,first_role:'defense',first_role_time_played:446185900,second_role:'tank',second_role_time_played:517821196,medal_gold:466,medal_silver:860,medal_bronze:466,games_won:1209},
      {user_id:users[31].id,tournament_id,level:350,first_role:'support',first_role_time_played:270264227,second_role:'offense',second_role_time_played:134821190,medal_gold:737,medal_silver:1121,medal_bronze:716,games_won:1870},
      {user_id:users[32].id,tournament_id,level:62,first_role:'offense',first_role_time_played:798664055,second_role:'tank',second_role_time_played:17998393,medal_gold:1395,medal_silver:614,medal_bronze:1134,games_won:1386},
      {user_id:users[33].id,tournament_id,level:286,first_role:'defense',first_role_time_played:413462920,second_role:'support',second_role_time_played:391880370,medal_gold:2145,medal_silver:1216,medal_bronze:1213,games_won:819},
      {user_id:users[34].id,tournament_id,level:45,first_role:'defense',first_role_time_played:259240253,second_role:'tank',second_role_time_played:256083373,medal_gold:844,medal_silver:972,medal_bronze:1357,games_won:1487},
      {user_id:users[35].id,tournament_id,level:189,first_role:'tank',first_role_time_played:228129061,second_role:'support',second_role_time_played:331191587,medal_gold:2096,medal_silver:826,medal_bronze:546,games_won:1729},
      {user_id:users[36].id,tournament_id,level:79,first_role:'tank',first_role_time_played:720225675,second_role:'defense',second_role_time_played:366812100,medal_gold:2222,medal_silver:1854,medal_bronze:566,games_won:1740},
      {user_id:users[37].id,tournament_id,level:328,first_role:'support',first_role_time_played:155880858,second_role:'offense',second_role_time_played:512331639,medal_gold:2061,medal_silver:1731,medal_bronze:667,games_won:771},
      {user_id:users[38].id,tournament_id,level:62,first_role:'offense',first_role_time_played:408981085,second_role:'defense',second_role_time_played:472924110,medal_gold:1880,medal_silver:1908,medal_bronze:460,games_won:504},
      {user_id:users[39].id,tournament_id,level:253,first_role:'defense',first_role_time_played:846740253,second_role:'offense',second_role_time_played:215784386,medal_gold:2366,medal_silver:1892,medal_bronze:1130,games_won:679},
      {user_id:users[40].id,tournament_id,level:246,first_role:'offense',first_role_time_played:4426763,second_role:'support',second_role_time_played:232738494,medal_gold:408,medal_silver:1235,medal_bronze:1944,games_won:1386},
      {user_id:users[41].id,tournament_id,level:137,first_role:'offense',first_role_time_played:82767472,second_role:'defense',second_role_time_played:452852288,medal_gold:1487,medal_silver:1984,medal_bronze:636,games_won:1186},
      {user_id:users[42].id,tournament_id,level:340,first_role:'support',first_role_time_played:655961114,second_role:'tank',second_role_time_played:456535524,medal_gold:1889,medal_silver:677,medal_bronze:1839,games_won:1013},
      {user_id:users[43].id,tournament_id,level:177,first_role:'tank',first_role_time_played:145018613,second_role:'offense',second_role_time_played:337429226,medal_gold:349,medal_silver:1391,medal_bronze:809,games_won:1857},
      {user_id:users[44].id,tournament_id,level:218,first_role:'defense',first_role_time_played:87015444,second_role:'offense',second_role_time_played:400226920,medal_gold:1456,medal_silver:1815,medal_bronze:1552,games_won:1864},
      {user_id:users[45].id,tournament_id,level:67,first_role:'defense',first_role_time_played:409809056,second_role:'offense',second_role_time_played:155977571,medal_gold:1772,medal_silver:1658,medal_bronze:661,games_won:182},
      {user_id:users[46].id,tournament_id,level:98,first_role:'tank',first_role_time_played:67424322,second_role:'defense',second_role_time_played:503387221,medal_gold:1228,medal_silver:1788,medal_bronze:1919,games_won:211},
      {user_id:users[47].id,tournament_id,level:78,first_role:'tank',first_role_time_played:521495469,second_role:'defense',second_role_time_played:309593581,medal_gold:909,medal_silver:1280,medal_bronze:1891,games_won:1030},
    ]);
  })();
  const highlightsTask = (async () => {
    const [tournament] = await tournamentTask;
    const tournament_id = tournament.id;
    await knex('highlights').del();
    return knex('highlights').insert([
      {tournament_id, name: 'Video 1', url: 'eWbroN1QORk'},
      {tournament_id, name: 'Video 2', url: '2X4IRPnKAGk'},
      {tournament_id, name: 'Video 3', url: 'jRC9RxqwPJ0'},
    ]);
  })();
  await usersTask;
  await teamsTask;
  await tournamentTask;
  await tournament_enrollmentTask;
  await highlightsTask;
};
