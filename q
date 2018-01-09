[1mdiff --git a/public/scripts/register.js b/public/scripts/register.js[m
[1mindex 207eea0..af0ae74 100644[m
[1m--- a/public/scripts/register.js[m
[1m+++ b/public/scripts/register.js[m
[36m@@ -1,5 +1,4 @@[m
 $(document).ready(function () {[m
[31m-  console.log('i should be the userID', userID);[m
   // console.log('I am ready');[m
   $('.submit').click(function(e){[m
     const email = $('#entry-email').val();[m
[1mdiff --git a/public/scripts/tournament_view.js b/public/scripts/tournament_view.js[m
[1mindex 74503af..0fe5b3d 100644[m
[1m--- a/public/scripts/tournament_view.js[m
[1m+++ b/public/scripts/tournament_view.js[m
[36m@@ -15,7 +15,7 @@[m [m$(document).ready(function () {[m
       teamRoster[teamNames[t]].forEach((user) => {[m
         $(`[data-team-id="${teamNames[t]}"`).append(`[m
         <div class='container player'>[m
[31m-          <img class="player-class" src="/images/icon-${user.first_role}.png" title="${user.first_role}">[m
[32m+[m[32m          <a href="/users/${user.id}"><img class="player-class" src="/images/icon-${user.first_role}.png" title="${user.first_role}"></a>[m
           <span data-balloon=" Level: ${user.level} &#10; Games Won: ${user.games_won} &#10; Gold Medals: ${user.medal_gold} &#10; Silver Medals: ${user.medal_silver} &#10; Bronze Medals: ${user.medal_bronze}" data-balloon-pos="up" data-balloon-break data-team = ${user.team_id} class="player">${user.battlenet_id} </span>[m
         </div>[m
         `)[m
[36m@@ -69,7 +69,7 @@[m [m$(document).ready(function () {[m
 [m
     window.setTimeout(function() {[m
       $(".alert").fadeTo(500, 0).slideUp(500, function(){[m
[31m-          $(this).remove(); [m
[32m+[m[32m          $(this).remove();[m
       });[m
     }, 4000);[m
   })[m
[36m@@ -162,7 +162,7 @@[m [m$(document).ready(function () {[m
         `)[m
         window.setTimeout(function() {[m
           $(".alert").fadeTo(500, 0).slideUp(500, function(){[m
[31m-              $(this).remove(); [m
[32m+[m[32m              $(this).remove();[m
           });[m
       }, 4000);[m
         return;[m
[36m@@ -318,7 +318,7 @@[m [m$(document).ready(function () {[m
           placement: 'right',[m
           html: true[m
         })[m
[31m-      [m
[32m+[m
       $( '.delete-highlight' ).click(function(e) {[m
         const highlightID = $(e.target).data().id[m
         $.ajax({[m
[36m@@ -484,7 +484,7 @@[m [m$(document).ready(function () {[m
       }[m
     });[m
 [m
[31m-    // When the user clicks anywhere outside of the modal, [m
[32m+[m[32m    // When the user clicks anywhere outside of the modal,[m
     // modal will close, and information inside will be cleared[m
     window.onclick = function(event) {[m
       console.log("is owner clicks");[m
[1mdiff --git a/views/register.ejs b/views/register.ejs[m
[1mindex 170892f..95119bf 100644[m
[1m--- a/views/register.ejs[m
[1m+++ b/views/register.ejs[m
[36m@@ -3,7 +3,7 @@[m
 [m
 <head>[m
     <script>[m
[31m-        window.userID = <%= userID %>[m
[32m+[m[32m        // window.userID = <%= userID %>[m
     </script>[m
 [m
 </head>[m
