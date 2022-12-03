<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content = "width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no">
  <title>GradeBook</title>
  <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css'>
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'>
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css'><link rel="stylesheet" href="./style.css?v=12345678">
<!-- Link icon tags -->
<link rel="icon" href="assets/logo.png">
<link rel="apple-touch-icon" sizes="100x100" href="assets/logo.png" />
</head>
<body>
    <!-- partial:index.partial.html -->
    <div id="main-wrapper">
<div class="text-center perf-center" id="sign-in-cont"><form class="form-signin">
      <img class="mb-4" src="assets/logo.svg" alt="" width="288" height="150">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputUser" class="sr-only">User</label>
      <input type="text" id="inputUser" class="form-control" placeholder="Username" required="" autofocus="" onkeyup="validateUsername()" onchange="validateUsername()">
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="" onkeyup="validateEmail()" onchange="validateEmail()">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="" onkeyup="validatePassword()" onchange="validatePassword()">
      <i class="fa fa-eye" id="showorhidepword"></i>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" id="rem-check"> Remember me
        </label>
      </div>
      <div id="error-text" class="checkbox mb-3 text-danger">
        
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-3 text-center" id="flip-form"><a href="" onclick="return false;">Don't have an account? Sign up</a></p>
      <p class="mb-3 text-muted">© <script>document.write( new Date().getFullYear() );</script></p>
    </form>
</div>
<div id="user" class="container" style="
    margin: 0;
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 20px;
"><h5 style="
    margin-bottom: 0px;
    padding: 0;
"></h5></div>
<div class="container" style="
    margin: 0;
    margin-left: 10px;
"><h5 style="
    margin-bottom: 0px;
    padding: 0;
">Your courses:</h5></div>
<div class="container" id="course-cont" style="overflow: scroll;width: calc(100% - 105px);margin: 0;vertical-align: middle;min-height: 51px;">
<div id='courses' class='row'>
  
</div>
    </div>
<button class='btn btn-primary' id="addSubject" title="add subject"><i class="fas fa-plus"></i></button>
    <button class='btn btn-primary' id="deleteSubject" style="padding-right: 8px;" title="edit"><i class="fas fa-edit"></i></button>
      <button class='btn btn-success' id="donedeleteSubject"><i  class="fas fa-check"></i>
  </button>
<div class='sheet'>
  <div id="sheetwrapper">
    <div class="container" style="padding: 0px;text-align: center; margin-bottom: 0px;">
    <h3>
      <div id="sheet-title">New Subject</div>
    </h3>
      <div class="top-column">
    <div class="top-label">Target Grade:</div>
    <input type="number" id="target-grade" placeholder="Target Grade (%)">
    </div><div class="top-column">
      <div class="top-label">Average to Maintain:</div>
    <input type="number" readonly id='rem-avg' placeholder="Average to get on Remaining Grades"></input></div>
    </div>
    <div class='container' style="overflow: scroll; margin-top: 0px;">
      <div class='row' style="display: table;">
        <div class="column-labels">
          <div>Assignment
            <i id="addAss" class="fas fa-plus-square" title="add assignment"></i><i id="proof" class='fas fa-calculator' title="proof"></i></div>
            <span class='ass-cont'><i class="fas fa-minus-circle text-danger" title="delete assignment"></i><input id='item1assignment' type='text' placeholder='Assignment #1'></input></span>
          <span class='ass-cont'><i class="fas fa-minus-circle text-danger" title="delete assignment"></i><input id='item2assignment' type='text' placeholder='Assignment #2'></input></span>
        </div>
        <div class="column-labels">
          <div>Points Worth</div>
          <input type='number' id='item1pts' min='0' placeholder='Total Possible Points'>
          <input type='number' id='item2pts' min='0' placeholder='Total Possible Points'>
        </div>
        <div class="column-labels">
          <div>% Grade</div>
          <input type='number' id='item1grade' min='0' placeholder='Grade (%)'></input>
          <input type='number' id='item2grade' min='0' placeholder='Grade (%)'></input>
        </div>
        <div class="column-labels">
          <div>Points Gained</div>
          <input id='item1ptsgained' readonly type='number' placeholder='Grade (Pts)'>
          <input id='item2ptsgained' readonly type='number' placeholder='Grade (Pts)'></input>
        </div>
        <div class="column-labels">
          <div>Points Needed</div>
          <input type='number' readonly id='item1verif' placeholder='Points from Projected Average'></input>
          <input type='number' readonly id='item2verif' placeholder='Points from Projected Average'></input>
        </div>
      </div>

    </div>
    <div class="container" id="proof-cont">
    <div class="bottom-column" style="
        grid-column: 1 / span 1;
        grid-row: 1 / 2;
    ">
      <div class="top-label">Points Needed</div>
        <div id="proofneededpts"></div>
    </div>
    <div class="bottom-column" style="
        grid-column: 3 / span 1;
        grid-row: 1 / 2;
    ">
        <div class="top-label">Total Points</div>
        <div id="prooftotalpts"></div>
    </div>
    <div class="bottom-column" style="
        grid-column: 1 / span 1;
        grid-row: 2 / 3;
        text-align: right;
        padding-top: 0;
    ">
        <div style="
            max-width: 60px;
            margin-left: auto;
            border-top: 5px solid;
        " id="proofneededptssum">280</div>
    </div>
    <div class="bottom-column" style="
        grid-column: 2 / span 1;
        grid-row: 2 / 3;
        text-align: center;
        padding-top: 0;
    ">
        <div class="top-label" style="background: transparent"></div>
        <div>/</div>
    </div>
    <div class="bottom-column" style="
        grid-column: 3 / span 1;
        grid-row: 2 / 3;
        padding-top: 0;
    ">
        <div style="
            border-top: 5px solid;
            text-align: right;
            max-width: 60px;
            margin-left: auto;
        " id="prooftotalptssum">280</div>
    </div>
    <div class="bottom-column" style="
        text-align: center;
        grid-column: 4 / span 1;
        padding-top: 0;
        grid-row: 2 / 3;
    ">
        <div class="top-label" style="background: transparent"></div>
        <div>=</div>
    </div>
    <div class="bottom-column" style="
        grid-column: 5 / span 1;
        grid-row: 2 / 3;
        padding-left: 0px;
        border-top: 5px solid transparent;
        padding-top: 0;
    ">
        <div>
            <div class="proof_num" id="proofdecimal">0.7</div>
            <div class="proof_num">× 100</div>
        </div>
    </div>
    <div class="bottom-column" style="
        grid-column: 4 / span 2;
        grid-row: 3 / 4;
        font-size: 46px;
    ">
    <div class="" style="
    color: white;
    font-weight: bold;
    border-top: 5px solid;
" id="proofpercent">70%</div></div>


</div>
  </div>
  
</div>

<div id='newSubjectContainer' class='perf-center'>
  <input id="newSubject" type="text" placeholder="Subject Name" onkeyup="addToPreview()" onchange="addToPreview()"></input>
<span style="padding-left: 5px;">Select an icon:</span>
<div id="icon-selection"><div class='icon-selection-item'><i class='fas fa-atom'></i></div><div class='icon-selection-item'><i class='fas fa-book'></i></div><div class='icon-selection-item'><i class='fas fa-book-medical'></i></div><div class='icon-selection-item'><i class='fas fa-landmark'></i></div><div class='icon-selection-item'><i class='fas fa-notes-medical'></i></div><div class='icon-selection-item'><i class='fas fa-globe-americas'></i></div><div class='icon-selection-item'><i class='fas fa-code'></i></div><div class='icon-selection-item'><i class='fas fa-laptop-code'></i></div><div class='icon-selection-item'><i class='far fa-keyboard'></i></div><div class='icon-selection-item'><i class='fas fa-leaf'></i></div><div class='icon-selection-item'><i class='fas fa-hammer'></i></div><div class='icon-selection-item'><i class='fas fa-tools'></i></div><div class='icon-selection-item'><i class='fas fa-gavel'></i></div><div class='icon-selection-item'><i class='fas fa-money-bill-wave-alt'></i></div><div class='icon-selection-item'><i class='fas fa-heartbeat'></i></div><div class='icon-selection-item'><i class='fas fa-lungs'></i></div><div class='icon-selection-item'><i class='fas fa-viruses'></i></div><div class='icon-selection-item'><i class='fas fa-lungs-virus'></i></div><div class='icon-selection-item'><i class='fas fa-first-aid'></i></div><div class='icon-selection-item'><i class='fas fa-bolt'></i></div><div class='icon-selection-item'><i class='fas fa-plug'></i></div><div class='icon-selection-item'><i class='fas fa-football-ball'></i></div><div class='icon-selection-item'><i class='fas fa-shapes'></i></div><div class='icon-selection-item'><i class='fas fa-dumbbell'></i></div><div class='icon-selection-item'><i class='fas fa-robot'></i></div><div class='icon-selection-item'><i class='fas fa-calculator'></i></div><div class='icon-selection-item'><i class='fas fa-infinity'></i></div><div class='icon-selection-item'><i class='fas fa-square-root-alt'></i></div><div class='icon-selection-item'><i class='fas fa-brain'></i></i></div><div class='icon-selection-item'><i class='fas fa-space-shuttle'></i></div><div class='icon-selection-item'><i class='fas fa-vial'></i></div><div class='icon-selection-item'><i class='fas fa-microscope'></i></div><div class='icon-selection-item'><i class='fas fa-flask'></i></div><div class='icon-selection-item'><i class='fas fa-fire'></i></div><div class='icon-selection-item'><i class='fas fa-tree'></i></div><div class='icon-selection-item'><i class='fas fa-capsules'></i></div><div class='icon-selection-item'><i class='fas fa-pills'></i></div><div class='icon-selection-item'><i class='fas fa-tablets'></i></div><div class='icon-selection-item'><i class='fas fa-stethoscope'></i></div><div class='icon-selection-item'><i class='fas fa-percentage'></i></div>
</div>
<span style="padding-left: 5px;">Select a color: </span><input type="color" id="favcolor" name="favcolor" value="#007bff" onchange="getColor()" onclick="getColor()" oninput="getColor()"><br/>
<span style="padding-left: 5px;">Preview: </span><button class="btn btn-primary subject" type="button" style="background-color: var(--color-pick)" id='preview-button'></button>
<div style="text-align: center;">
<button class='btn btn-success' id="confAddSubject"><i class="fas fa-check"></i></button>
<button class='btn btn-danger' id="cancelAddSubject"><i class="fas fa-times"></i></button>
</div>
</div>
<div class='row'><button id="calc" class='btn btn-primary subject'>Calculate</button></div>
<button class="btn btn-success" id="excel" style="position: absolute;top: 5px;width: 40px;height: 40px;right: 95px;" title="excel"><i class="fas fa-file-excel"></i></button>
<button class="btn btn-secondary" id="settings" onclick="" style="position: absolute;top: 5px;height: 40px;right: 50px;width: 40px;padding: 0px;" title="settings"><i class="fas fa-cog"></i></button>
<button class="btn btn-danger" id="sign-out" onclick="signOut()" style="position: absolute;top: 5px;right: 5px;height: 40px;width: 40px;" title="sign out"><i class="fas fa-sign-out-alt"></i></button>
<div id="settings-cont">
    <i class="fa fa-times" id="close-settings"></i>
</div>
<!-- partial -->
<div style="position: absolute; left: 0; right: 0; bottom: 0; text-align: center;">
      <u>
        <a target="_blank" href="https://github.com/dan296/GradeBook" style="position: relative; left: -10px;"><i class="fab fa-github" style="margin-right: 5px; font-size: 10pt;"></i>v1.0.1</a>
      </u>
    </div>
</div>
  <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js'></script><script  src="./script.js"></script>
<script type="text/javascript">
console.log('hh');
  <?php
  include("db_connection.php");
if(isset($_COOKIE["member_login"]) && $_COOKIE["member_login"] !== ""){
        $user = $_COOKIE["member_login"];
        $sql = "SELECT `userObj` FROM `users` WHERE `user_name`='$user'";
        $result = $conn->query($sql);
        $results = $result -> fetch_array(MYSQLI_ASSOC);
        ?>
        console.log("HELLO?");
        cookieSet = true;
        $('#rem-check').click();
        thisuser = '<?php echo $_COOKIE["member_login"]; ?>';
        $('#user').html(thisuser);
        $('#inputUser').prop('value',thisuser);
        userObj = '<?php echo $results["userObj"]; ?>';
        if(userObj == ''){
            userObj = [];
        }else{
            userObj = JSON.parse(userObj.replace(/singqt/g, "'"));
        }
        
        setUpSheets();
        $('#sign-in-cont').hide();
        $(".container, #addSubject, #deleteSubject, #sign-out, #excel, #settings").show();
        $('#course-cont').css('opacity', 1);
        <?
    }else{ ?>
        $('#sign-in-cont').fadeIn(200);
   <?php }
 ?>  
    
</script>

</body>
</html>
