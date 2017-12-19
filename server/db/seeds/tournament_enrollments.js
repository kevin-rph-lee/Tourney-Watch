
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tournament_enrollments').del()
    .then(function () {
      // Inserts seed entries
      return knex('tournament_enrollments').insert([
{user_id:1,tournament_id:1,level:100,first_role:'offense',first_role_time_played:91260000,second_role:'support',second_role_time_played:68400000,medal_gold:688,medal_silver:608,medal_bronze:478,games_won:323},
{user_id:2,tournament_id:1,level:87,first_role:'offense',first_role_time_played:44940000,second_role:'support',second_role_time_played:30600000,medal_gold:342,medal_silver:310,medal_bronze:214,games_won:158},
{user_id:3,tournament_id:1,level:60,first_role:'tank',first_role_time_played:450000000,second_role:'support',second_role_time_played:303300000,medal_gold:2537,medal_silver:2204,medal_bronze:2068,games_won:1465},
{user_id:4,tournament_id:1,level:97,first_role:'offense',first_role_time_played:90420000,second_role:'defense',second_role_time_played:77700000,medal_gold:852,medal_silver:677,medal_bronze:497,games_won:361},
{user_id:5,tournament_id:1,level:50,first_role:'offense',first_role_time_played:123840000,second_role:'defense',second_role_time_played:55020000,medal_gold:608,medal_silver:609,medal_bronze:455,games_won:315},
{user_id:6,tournament_id:1,level:23,first_role:'offense',first_role_time_played:484380000,second_role:'tank',second_role_time_played:388800000,medal_gold:2666,medal_silver:2695,medal_bronze:2412,games_won:1565},
{user_id:7,tournament_id:1,level:74,first_role:'defense',first_role_time_played:316800000,second_role:'support',second_role_time_played:219600000,medal_gold:1886,medal_silver:1814,medal_bronze:1802,games_won:1125},
{user_id:8,tournament_id:1,level:55,first_role:'defense',first_role_time_played:115200000,second_role:'offense',second_role_time_played:77580000,medal_gold:754,medal_silver:649,medal_bronze:542,games_won:385},
{user_id:9,tournament_id:1,level:51,first_role:'support',first_role_time_played:166740000,second_role:'offense',second_role_time_played:137520000,medal_gold:1165,medal_silver:1001,medal_bronze:827,games_won:623},
{user_id:10,tournament_id:1,level:47,first_role:'support',first_role_time_played:47640000,second_role:'tank',second_role_time_played:46140000,medal_gold:484,medal_silver:377,medal_bronze:322,games_won:209},
{user_id:11,tournament_id:1,level:51,first_role:'support',first_role_time_played:110940000,second_role:'offense',second_role_time_played:110760000,medal_gold:959,medal_silver:735,medal_bronze:596,games_won:421},
{user_id:12,tournament_id:1,level:66,first_role:'offense',first_role_time_played:146280000,second_role:'defense',second_role_time_played:120240000,medal_gold:842,medal_silver:702,medal_bronze:619,games_won:440},
{user_id:13,tournament_id:1,level:107,first_role:'tank',first_role_time_played:714815497,second_role:'offense',second_role_time_played:167224305,medal_gold:2415,medal_silver:848,medal_bronze:1740,games_won:1880},
{user_id:14,tournament_id:1,level:294,first_role:'tank',first_role_time_played:465518275,second_role:'offense',second_role_time_played:375222387,medal_gold:893,medal_silver:520,medal_bronze:1234,games_won:364},
{user_id:15,tournament_id:1,level:249,first_role:'defense',first_role_time_played:6500037,second_role:'tank',second_role_time_played:96372667,medal_gold:2091,medal_silver:1611,medal_bronze:715,games_won:340},
{user_id:16,tournament_id:1,level:321,first_role:'tank',first_role_time_played:179804149,second_role:'offense',second_role_time_played:414631309,medal_gold:350,medal_silver:1521,medal_bronze:1724,games_won:1951},
{user_id:17,tournament_id:1,level:370,first_role:'offense',first_role_time_played:346656004,second_role:'defense',second_role_time_played:378012548,medal_gold:2245,medal_silver:1187,medal_bronze:676,games_won:1146},
{user_id:18,tournament_id:1,level:37,first_role:'defense',first_role_time_played:543235423,second_role:'offense',second_role_time_played:157981500,medal_gold:799,medal_silver:1997,medal_bronze:776,games_won:707},
{user_id:19,tournament_id:1,level:182,first_role:'defense',first_role_time_played:638647078,second_role:'support',second_role_time_played:440355809,medal_gold:1461,medal_silver:1256,medal_bronze:1611,games_won:1304},
{user_id:20,tournament_id:1,level:58,first_role:'offense',first_role_time_played:355229277,second_role:'support',second_role_time_played:11913934,medal_gold:1868,medal_silver:1680,medal_bronze:1185,games_won:396},
{user_id:21,tournament_id:1,level:149,first_role:'tank',first_role_time_played:727702265,second_role:'defense',second_role_time_played:433235776,medal_gold:1585,medal_silver:1609,medal_bronze:1185,games_won:776},
{user_id:22,tournament_id:1,level:398,first_role:'support',first_role_time_played:618875597,second_role:'offense',second_role_time_played:210336829,medal_gold:1311,medal_silver:793,medal_bronze:1555,games_won:1490},
{user_id:23,tournament_id:1,level:254,first_role:'defense',first_role_time_played:688499147,second_role:'offense',second_role_time_played:388185188,medal_gold:862,medal_silver:1718,medal_bronze:465,games_won:1841},
{user_id:24,tournament_id:1,level:209,first_role:'tank',first_role_time_played:75357553,second_role:'offense',second_role_time_played:411923687,medal_gold:621,medal_silver:1259,medal_bronze:812,games_won:454},
{user_id:25,tournament_id:1,level:265,first_role:'support',first_role_time_played:746920892,second_role:'tank',second_role_time_played:95861620,medal_gold:736,medal_silver:583,medal_bronze:1286,games_won:560},
{user_id:26,tournament_id:1,level:57,first_role:'offense',first_role_time_played:402213743,second_role:'support',second_role_time_played:201476135,medal_gold:283,medal_silver:1103,medal_bronze:493,games_won:188},
{user_id:27,tournament_id:1,level:225,first_role:'defense',first_role_time_played:521793164,second_role:'support',second_role_time_played:262366470,medal_gold:1833,medal_silver:1695,medal_bronze:883,games_won:1134},
{user_id:28,tournament_id:1,level:277,first_role:'defense',first_role_time_played:730590422,second_role:'offense',second_role_time_played:262164294,medal_gold:2454,medal_silver:1309,medal_bronze:844,games_won:1552},
{user_id:29,tournament_id:1,level:273,first_role:'support',first_role_time_played:775958713,second_role:'tank',second_role_time_played:515671418,medal_gold:1093,medal_silver:966,medal_bronze:496,games_won:115},
{user_id:30,tournament_id:1,level:258,first_role:'defense',first_role_time_played:446185900,second_role:'tank',second_role_time_played:517821196,medal_gold:466,medal_silver:860,medal_bronze:466,games_won:1209},
{user_id:31,tournament_id:1,level:350,first_role:'support',first_role_time_played:270264227,second_role:'offense',second_role_time_played:134821190,medal_gold:737,medal_silver:1121,medal_bronze:716,games_won:1870},
{user_id:32,tournament_id:1,level:62,first_role:'offense',first_role_time_played:798664055,second_role:'tank',second_role_time_played:17998393,medal_gold:1395,medal_silver:614,medal_bronze:1134,games_won:1386},
{user_id:33,tournament_id:1,level:286,first_role:'defense',first_role_time_played:413462920,second_role:'support',second_role_time_played:391880370,medal_gold:2145,medal_silver:1216,medal_bronze:1213,games_won:819},
{user_id:34,tournament_id:1,level:45,first_role:'defense',first_role_time_played:259240253,second_role:'tank',second_role_time_played:256083373,medal_gold:844,medal_silver:972,medal_bronze:1357,games_won:1487},
{user_id:35,tournament_id:1,level:189,first_role:'tank',first_role_time_played:228129061,second_role:'support',second_role_time_played:331191587,medal_gold:2096,medal_silver:826,medal_bronze:546,games_won:1729},
{user_id:36,tournament_id:1,level:79,first_role:'tank',first_role_time_played:720225675,second_role:'defense',second_role_time_played:366812100,medal_gold:2222,medal_silver:1854,medal_bronze:566,games_won:1740},
{user_id:37,tournament_id:1,level:328,first_role:'support',first_role_time_played:155880858,second_role:'offense',second_role_time_played:512331639,medal_gold:2061,medal_silver:1731,medal_bronze:667,games_won:771},
{user_id:38,tournament_id:1,level:62,first_role:'offense',first_role_time_played:408981085,second_role:'defense',second_role_time_played:472924110,medal_gold:1880,medal_silver:1908,medal_bronze:460,games_won:504},
{user_id:39,tournament_id:1,level:253,first_role:'defense',first_role_time_played:846740253,second_role:'offense',second_role_time_played:215784386,medal_gold:2366,medal_silver:1892,medal_bronze:1130,games_won:679},
{user_id:40,tournament_id:1,level:246,first_role:'offense',first_role_time_played:4426763,second_role:'support',second_role_time_played:232738494,medal_gold:408,medal_silver:1235,medal_bronze:1944,games_won:1386},
{user_id:41,tournament_id:1,level:137,first_role:'offense',first_role_time_played:82767472,second_role:'defense',second_role_time_played:452852288,medal_gold:1487,medal_silver:1984,medal_bronze:636,games_won:1186},
{user_id:42,tournament_id:1,level:340,first_role:'support',first_role_time_played:655961114,second_role:'tank',second_role_time_played:456535524,medal_gold:1889,medal_silver:677,medal_bronze:1839,games_won:1013},
{user_id:43,tournament_id:1,level:177,first_role:'tank',first_role_time_played:145018613,second_role:'offense',second_role_time_played:337429226,medal_gold:349,medal_silver:1391,medal_bronze:809,games_won:1857},
{user_id:44,tournament_id:1,level:218,first_role:'defense',first_role_time_played:87015444,second_role:'offense',second_role_time_played:400226920,medal_gold:1456,medal_silver:1815,medal_bronze:1552,games_won:1864},
{user_id:45,tournament_id:1,level:67,first_role:'defense',first_role_time_played:409809056,second_role:'offense',second_role_time_played:155977571,medal_gold:1772,medal_silver:1658,medal_bronze:661,games_won:182},
{user_id:46,tournament_id:1,level:98,first_role:'tank',first_role_time_played:67424322,second_role:'defense',second_role_time_played:503387221,medal_gold:1228,medal_silver:1788,medal_bronze:1919,games_won:211},
{user_id:47,tournament_id:1,level:78,first_role:'tank',first_role_time_played:521495469,second_role:'defense',second_role_time_played:309593581,medal_gold:909,medal_silver:1280,medal_bronze:1891,games_won:1030},
{user_id:48,tournament_id:1,level:116,first_role:'offense',first_role_time_played:419360598,second_role:'tank',second_role_time_played:140751791,medal_gold:1272,medal_silver:967,medal_bronze:848,games_won:1268}
      ]);
    });
};
