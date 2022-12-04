var userObj = [];

var sheetHTML = $('.sheet').html();
function setUpSheets(){
    $( "#courses" ).html("");
  for(var i = 0; i < userObj.length; i++){
    $( "#courses" ).append("<div class='btn btn-primary subject' style='background-color:"+userObj[i].color+"'><span class='subject-title-icon'>"+userObj[i].icon+"</span><span class='subject-title'>"+userObj[i].subject+"</span><i class='fas fa-minus-circle text-danger'></i><i class='fas fa-copy'></i><i class='fas fa-edit'></i></>");
    if(i!==userObj.length - 1){
        $('#courses').append("<div class='spacer'></div>");
    }
  }
  $('.subject .fa-minus-circle').click(function(){
  var index = $(this).parent().index();
    if(index >= 0){
      console.log('yo'+index);
      //if(index == userObj.length - 1){
        currentindex = (index - 2)/2;
        if(currentindex<0){
            currentindex = 0;
        }
      //}
      userObj.splice((index/2),1);
      if(userObj.length > 0){
          $('.subject').eq(currentindex).click();
      }
      $(this).parent().remove();
      $('#courses .spacer').eq(index/2).remove();
      if(userObj.length == 0){
        $('.sheet').html(sheetHTML);
        $('.container').show();
        $('#proof-cont').hide();
      }
      updateUser();
    }
})
    
    $('.subject .fa-edit').click(function(){
        editingPick = true;
        var index = $(this).parent().index()/2;
        editingPickInd = index;
          console.log(index);
        document.getElementById("favcolor").value = userObj[index].color;
        getColor();
        $('#addSubject').click();
        $('#newSubject').prop('value', $(this).parent().find(".subject-title").html());
        for(var i = 0; i < $('.icon-selection-item').length; i++){
        if($('.icon-selection-item').eq(i).html() == $(this).parent().find(".subject-title-icon").html().slice(0,-1)){
          $('.icon-selection-item').eq(i).click();
          break;
        }
        }
        addToPreview();
        // userObj.splice(index,1);
        // $('.subject').eq(currentindex).click();
        //$(this).parent().remove();
    })
    $('.subject .fa-copy').click(function(){
        console.log("COPYING...");
        console.log($(this).parent().index());
        // Index of the course to copy
        var copyIdx = $(this).parent().index()/2;
        console.log(copyIdx);
        var copy = Object.assign({}, userObj[copyIdx]);
        userObj.push(copy);
        userObj[userObj.length - 1].subject = userObj[userObj.length - 1].subject + " Copy";
        updateUser();
        setUpSheets();
        $('#donedeleteSubject').click();
    })
    
    if(userObj !== ""){
      $('#courses .subject').eq(0).click();
    }
}

setUpSheets();

$('#calc').click(function(){
    //$('#proof-cont').show();
    for(var i = 0; i < $('.column-labels').eq(0).children().length-1; i++){
      calculateGrades(i+1)
    }
    calculateAverage();
})

$('#addAss').off().on('click', function() {
    addAssignment();
})

$('#remAss').click(function(){
  removeAssignment();
})

$('.ass-cont .fa-minus-circle').on("click", function( event ){
    event.stopPropagation();
    var ind = parseInt($(this).parent().index());
      for(var i = 0; i < $('.column-labels').length; i++){
        $('.column-labels').eq(i).children().eq(ind).remove();
      }
      
      userObj[currentindex].assignments.splice(ind, 1);
      userObj[currentindex].grades.splice(ind, 1);
      userObj[currentindex].possible_points.splice(ind, 1);
      updateUser();
})


$('#proof').click(function(){
    showProof();
})

function calculateGrades(id){
  var possPts = parseFloat($('#item'+id+'pts').val());
  var grade = parseFloat($('#item'+id+'grade').val());
  var ptsGained = grade*possPts/100;
  $('#item'+id+'ptsgained').prop('value',ptsGained);

}

function calculateAverage(){
  var possPtsSum = 0;
  var ptsGainedSum = 0;
  var possPossPtsSum = 0;
  for(var i = 0; i < $('.column-labels').eq(0).children().length-1; i++){
    var id = i+1;
    possPtsSum += parseFloat($('#item'+id+'pts').val());
    
    if($('#item'+id+'grade').val() != ""){
      ptsGainedSum += parseFloat($('#item'+id+'ptsgained').val());
      console.log(id);
      possPossPtsSum += parseFloat($('#item'+id+'pts').val());
    }
}
  var targetGrade = parseFloat($('#target-grade').val());
  var remAvg = 100*((targetGrade * possPtsSum/100) - ptsGainedSum)/(possPtsSum - possPossPtsSum);
  var sumVerif = 0;
  console.log(remAvg);
  $('#rem-avg').prop('value', remAvg.toFixed(2));
  for(var i = 0; i < $('.column-labels').eq(0).children().length-1; i++){
    var id = i+1;
    
    var verifGrade = 0;
    if($('#item'+id+'grade').val() != ""){
      verifGrade = parseFloat($('#item'+id+'ptsgained').val());
    }else{
      $('#item'+id+'grade').prop('placeholder',remAvg.toFixed(2)+'%');
      verifGrade = remAvg*parseFloat($('#item'+id+'pts').val())/100;
      $('#item'+id+'ptsgained').prop('placeholder',verifGrade.toFixed(4));
    }
    $('#item'+id+'verif').prop('value',verifGrade.toFixed(4));
    sumVerif+= verifGrade;
  }
  console.log(sumVerif);
  console.log(possPtsSum);
  console.log(100 * sumVerif / possPtsSum)
}

function addAssignment(){
  var ind = parseInt($('.column-labels').eq(0).children().length);
  for(var i = 0; i < $('.column-labels').length; i++){
     var text = ''
    if(i == 0){
      text = '<span class="ass-cont"><i class="fas fa-minus-circle text-danger" title="delete assignment"></i><input id="item'+ind+'assignment" type="text" placeholder="Assignment #'+ind+'"></span>';
    }else if(i == 1){
      text = '<input type="number" id="item'+ind+'pts" min="0" placeholder="Total Possible Points">';
    }else if(i == 2){
      text = '<input type="number" id="item'+ind+'grade" min="0" placeholder="Grade (%)">';
    }else if(i == 3){
      text = '<input id="item'+ind+'ptsgained" readonly type="number" placeholder="Grade (Pts)">';
    }else if(i == 4){
      text = '<input type="number" readonly="" id="item'+ind+'verif" placeholder="Points from Projected Average">';
    }
    $('.column-labels').eq(i).append(text);

  }
      $( "#sheetwrapper input" ).keyup(function( event ) {
      event.preventDefault();
      updateUser();
    });
    
    $('.ass-cont .fa-minus-circle').on("click", function( event ){
        event.stopPropagation();
        var ind = parseInt($(this).parent().index());
        for(var i = 0; i < $('.column-labels').length; i++){
            $('.column-labels').eq(i).children().eq(ind).remove();
        }
        
        userObj[currentindex].assignments.splice(ind, 1);
        userObj[currentindex].grades.splice(ind, 1);
        userObj[currentindex].possible_points.splice(ind, 1);
        updateUser();
    })
}

function removeAssignment(){
  var ind = parseInt($('.column-labels').eq(0).children().length);
  if(ind > 3){
      for(var i = 0; i < $('.column-labels').length; i++){
    $('.column-labels').eq(i).children().last().remove();
      }
  }
}

$('#proof-cont').hide();
$(document).ready(function(){
    $('#proof-cont').hide();
})
function showProof(){
    $('#proof-cont').show();
    $('#proofneededpts, #prooftotalpts').html('');
    var neededsum = 0; var sum = 0;
    var finalDec = 0; var finalPer = '';
    
    for(var i = 0; i < $('.column-labels').eq(0).children().length-1; i++){
        var tsign = '+ ';
        if(i == 0){
            tsign = '';
        }
        var neededString = '<div class="proof_num">' + tsign + $('#item'+parseInt(i+1)+'verif').val() + '</div>';
        var totalString = '<div class="proof_num">' + tsign + $('#item'+parseInt(i+1)+'pts').val() + '</div>';
        $('#proofneededpts').append(neededString);
        $('#prooftotalpts').append(totalString);
        neededsum += Math.round(100*parseFloat($('#item'+parseInt(i+1)+'verif').val()))/100;
        sum += Math.round(1000*parseFloat($('#item'+parseInt(i+1)+'pts').val()))/1000;
    }
    finalDec += Math.round(10000*parseFloat(neededsum/sum))/10000;
    finalPer = parseFloat(100*finalDec) + '%';
    $('#proofneededptssum').html(neededsum);
    $('#prooftotalptssum').html(sum);
    $('#proofdecimal').html(finalDec);
    $('#proofpercent').html(finalPer);
}

var counter = 0;
var currentindex = -1;

$("#courses").on('click','.subject',  function(){
    $('#proof-cont').hide();
    $('#courses .subject').removeClass('current-subject');
    $(this).addClass('current-subject');
  currentindex = $(this).index()/2;
  scrollToSubject(currentindex);
  $('#sheet-title').html($(this).html());
  //$('.column-labels, #calc, #addSubject, #deleteSubject, .top-column').css('background', userObj[currentindex].color);
  document.documentElement.style.setProperty('--current-color', userObj[currentindex].color)
  $('#target-grade').prop('value', userObj[currentindex].target);
  var longestLength = userObj[currentindex].assignments.length;
  if(longestLength < userObj[currentindex].grades.length){
    longestLength = userObj[currentindex].grades.length;
  }
  
  if(longestLength < userObj[currentindex].possible_points.length){
    longestLength = userObj[currentindex].possible_points.length;
  }
  for(var i = 0; i < longestLength; i++) {
    if(i >= $('.column-labels').eq(0).children().length-1){
      addAssignment();
    }else{
      while($('.column-labels').eq(0).children().length-1 > longestLength){
        removeAssignment();
        counter++;
        if(counter > 1000){
          counter = 0;
          break;
        }
      }
    }
    $('#item'+parseInt(i+1)+'assignment').prop('value', userObj[currentindex].assignments[i]);
    $('#item'+parseInt(i+1)+'pts').prop('value', userObj[currentindex].possible_points[i]);
    $('#item'+parseInt(i+1)+'grade').prop('value', userObj[currentindex].grades[i]);
  }
  $('#calc').click();
  updateUser();
});

$('#addSubject').click(function(){
  $('#newSubjectContainer').fadeIn();
 //$('#cancelAddSubject, #confAddSubject').show();
$('#donedeleteSubject').click();
 // $(this).hide();
  //$('#newSubject').css('width','263px');
})

$('#deleteSubject').click(function(){
 $('.fa-minus-circle, .subject .fa-edit, .fa-copy').show(); 
  $('#donedeleteSubject').show();
  $('#deleteSubject').hide();
    $('#cancelAddSubject').click();
})

$('#donedeleteSubject').click(function(){
 $('.fa-minus-circle, .subject .fa-edit, .fa-copy').hide();  
  $('#donedeleteSubject').hide();
  $('#deleteSubject').show();
})

$('#confAddSubject').click(function(){
  if($('#newSubject').val() !== ""){
    if(editingPick){
      $( "#courses .subject" ).eq(editingPickInd).css('background-color', $('#preview-button').css('background-color'));
      $( "#courses .subject" ).eq(editingPickInd).html($('#preview-button').html()+"<i class='fas fa-minus-circle text-danger'></i><i class='fas fa-copy'></i></i><i class='fas fa-edit'></i>");
    var thisicon = "";
    if($('#preview-button .subject-title-icon').html() !== undefined){
      thisicon = $('#preview-button .subject-title-icon').html();
    }
    userObj[editingPickInd]={
      subject: $('#preview-button .subject-title').html(),
      icon: thisicon.replace(/"/g, "'"),
      target: userObj[editingPickInd].target,
  assignments: userObj[editingPickInd].assignments,
  possible_points: userObj[editingPickInd].possible_points,
  grades: userObj[editingPickInd].grades,
  color: rgb2hex($('#preview-button').css('background-color'))
    };
      $( "#courses .subject" ).eq(editingPickInd).click();
      $('#cancelAddSubject').click();
    }else{
        if($( "#courses .subject" ).length > 0){
                    $( "#courses" ).append("<div class='spacer'></div>");
        }
      $( "#courses" ).append("<div class='btn btn-primary subject' style='background-color:"+$('#preview-button').css('background-color')+"'>"+$('#preview-button').html()+"<i class='fas fa-minus-circle text-danger'></i><i class='fas fa-edit'></i></>");
    var thisicon = "";
    if($('#preview-button .subject-title-icon').html() !== undefined){
      thisicon = $('#preview-button .subject-title-icon').html().replace(/"/g, "'");
    }
    userObj.push(
    {
      subject: $('#preview-button .subject-title').html(),
      icon: thisicon,
      target: [],
  assignments: ["", ""],
  possible_points: ["",""],
  grades: ["",""],
  color: rgb2hex($('#preview-button').css('background-color'))
    });
    
 $( "#courses .subject" ).eq($( "#courses .subject" ).length-1).click();
    }
    
    $('.subject .fa-minus-circle').click(function(){
  var index = $(this).parent().index();
    if(index >= 0){
      console.log('yo'+index);
      //if(index == userObj.length - 1){
        currentindex = (index - 2)/2;
      //}
      if(currentindex<0){
            currentindex = 0;
        }
      userObj.splice((index/2),1);
      if(userObj.length > 0){
          $('.subject').eq(currentindex).click();
      }
      $(this).parent().remove();
      $('#courses .spacer').eq(index/2).remove();
      if(userObj.length == 0){
        $('.sheet').html(sheetHTML);
        $('.container').show();
        $('#proof-cont').hide();
      }
      updateUser();
    }
})
    
    $('.subject .fa-edit').click(function(){
  editingPick = true;
  var index = $(this).parent().index()/2;
  editingPickInd = index;
      console.log(index);
  document.getElementById("favcolor").value = userObj[index].color;
  getColor();
  $('#addSubject').click();
  $('#newSubject').prop('value', $(this).parent().find(".subject-title").html());
  for(var i = 0; i < $('.icon-selection-item').length; i++){
    if($('.icon-selection-item').eq(i).html() == $(this).parent().find(".subject-title-icon").html().slice(0,-1)){
      $('.icon-selection-item').eq(i).click();
      break;
    }
  }
  addToPreview();
 // userObj.splice(index,1);
 // $('.subject').eq(currentindex).click();
  //$(this).parent().remove();
})

    $('.subject .fa-copy').click(function(){
        console.log("COPYING...");
        console.log($(this).parent().index());
        // Index of the course to copy
        var copyIdx = $(this).parent().index()/2;
        console.log(copyIdx);
        var copy = Object.assign({}, userObj[copyIdx]);
        userObj.push(copy);
        userObj[userObj.length - 1].subject = userObj[userObj.length - 1].subject + " Copy";
        updateUser();
        setUpSheets();
        $('#donedeleteSubject').click();
    })
    
    $('#newSubject').prop('value','');
    if(selectedChild >= 0){
          $('.icon-selection-item').eq(selectedChild).click();
    }

    addToPreview();
   
  }else{
    $('#cancelAddSubject').click();
  }
})

$('#cancelAddSubject').click(function(){
  //$(this).hide();
  //$('#confAddSubject').hide();
        editingPick = false;
      editingPickInd = -1;
  $('#addSubject').show();
  $('#newSubject input').prop('value','');
      if(selectedChild >= 0){

  $('.icon-selection-item').eq(selectedChild).click();
      }
    addToPreview();
  $('#newSubjectContainer').fadeOut();
  //$('#newSubject').css('width', '0%');
})

$('.subject .fa-minus-circle').click(function(){
    var index = $(this).parent().index();
    if(index >= 0){
      console.log('yo'+index);
      //if(index == userObj.length - 1){
        currentindex = (index - 2)/2;
      //}
      if(currentindex<0){
            currentindex = 0;
        }
      userObj.splice((index/2),1);
      if(userObj.length > 0){
          $('.subject').eq(currentindex).click();
      }
      
      $(this).parent().remove();
      $('#courses .spacer').eq(index/2).remove();
      if(userObj.length == 0){
        $('.sheet').html(sheetHTML);
        $('.container').show();
        $('#proof-cont').hide();

      }
      updateUser();
    }

})

$('.subject .fa-copy').click(function(){
    console.log("COPYING...");
    console.log($(this).parent().index());
    // Index of the course to copy
    var copyIdx = $(this).parent().index()/2;
    console.log(copyIdx);
    var copy = Object.assign({}, userObj[copyIdx]);
    userObj.push(copy);
    userObj[userObj.length - 1].subject = userObj[userObj.length - 1].subject + " Copy";
    updateUser();
    setUpSheets();
    $('#donedeleteSubject').click();
})

function getColor(){
 document.documentElement.style.setProperty('--color-pick', document.getElementById("favcolor").value)
  console.log(document.getElementById("favcolor").value);
}
var selectedIcon = '';
var selectedChild = -1;
function addToPreview(){
  var icon = '';
  if(selectedIcon !== ''){
    icon = '<span class="subject-title-icon" >'+selectedIcon+" </span>";
  }
  $('#preview-button').html(icon + '<span class="subject-title" >'+$('#newSubject').val()+'</span>');
}
$('.icon-selection-item').click(function(){
  if($(this).hasClass('icon-selected')){
    $('.icon-selection-item').removeClass('icon-selected');
    selectedIcon = '';
    selectedChild = -1;
  }else{
    $('.icon-selection-item').removeClass('icon-selected');
    $(this).addClass('icon-selected');
 selectedIcon = $(this).html();
  selectedChild = $('.icon-selection-item').index(this);
  }
  addToPreview();
  
  
})

var editingPick = false;
var editingPickInd = -1;
$('.subject .fa-edit').click(function(){
  editingPick = true;
  var index = $(this).parent().index()/2;
  editingPickInd = index;
  document.getElementById("favcolor").value = userObj[index].color;
  getColor();
  $('#addSubject').click();
  $('#newSubject').prop('value', $(this).parent().find(".subject-title").html());
  for(var i = 0; i < $('.icon-selection-item').length; i++){
    if($('.icon-selection-item').eq(i).html() == $(this).parent().find(".subject-title-icon").html().slice(0,-1)){
      $('.icon-selection-item').eq(i).click();
      break;
    }
  }
  addToPreview();
 // userObj.splice(index,1);
 // $('.subject').eq(currentindex).click();
  //$(this).parent().remove();
})


function rgb2hex(rgb) {
  var hexDigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
  }
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function updateUser(){
    if(userObj.length == 0){
        currentindex = -1;
        userObj = [];
    }else{
            userObj[currentindex].assignments = [];
  userObj[currentindex].grades = [];
  userObj[currentindex].possible_points = [];
  userObj[currentindex].target = [parseInt($('#target-grade').val())];
  for(var i = 0; i < $('.column-labels').eq(0).children().length-1; i++){
    userObj[currentindex].assignments.push( $('#item'+parseInt(i+1)+'assignment').val());
    userObj[currentindex].grades.push(parseFloat($('#item'+parseInt(i+1)+'grade').val()));
    userObj[currentindex].possible_points.push(parseFloat($('#item'+parseInt(i+1)+'pts').val()));
  }
$('#calc').click();
    }

updateUserObject();
}

$( "#sheetwrapper input" ).keyup(function( event ) {
  event.preventDefault();
  updateUser();
});
var cookieSet = false;
/*function checkCookie(){
    $.ajax({
  type: "POST",
  url: 'db.php',
  data: {check_cookie: true},
  success: function(data){
      data = JSON.parse(data);
      cookieSet = data[0];
      if(cookieSet){
          $('#rem-check').click();
          thisuser = data[1];
          $('#inputUser').prop('value',thisuser);
          login();
      }
  },
  dataType: 'HTML'
});
}*/
//checkCookie();

function login(){
    console.log('i logged in');
    console.log($('#rem-check').is(':checked'));
    $.ajax({
        type: "POST",
        url: 'db.php',
        data: {user: $("#inputUser").val(), password: $("#inputPassword").val(), signing_in: true, remember: $('#rem-check').is(':checked')},
        success: function(data){
          console.log(data);
          data = data.trim();
          if(data.substring(0,5) == "Error"){
              if(data.indexOf("User") > -1){
                  $( "#inputUser" ).effect( "shake" );
                  $( "#inputUser" ).addClass( "invalid-focus" );
              }else if(data.indexOf("Email") > -1){
                  $( "#inputEmail" ).effect( "shake" );
                  $( "#inputEmail" ).addClass( "invalid-focus" );
              }else if(data.indexOf("Password") > -1){
                  $( "#inputPassword" ).effect( "shake" );
                  $( "#inputPassword" ).addClass( "invalid-focus" );
              }
              console.log(data);
              $('#error-text').show();
              $('#error-text').html(data);
              //$('#error-text').delay(1000).fadeOut();
          }else{
              //show screen
              userObj = [];
              if(data!== ""){
                userObj = JSON.parse(data.replace(/singqt/g, "'"));
              }
              thisuser = $("#inputUser").val();
              setUpSheets();
              $('#user').html(thisuser);
              $('#sign-in-cont').fadeOut(200);
              $(".container:not(#proof-cont), #addSubject, #deleteSubject, #sign-out, #excel, #settings").delay(200).fadeIn(200);
              $('#course-cont').css('opacity', 1);
              $('#proof-cont').hide();
              console.log('hide');
          }
        },
        dataType: 'HTML'
    });
}

function clearError(){
    $( ".form-control" ).removeClass( "invalid-focus" );
    $('#error-text').hide();
}

var thisuser = '';
function signup(){
    if(!alphaNumeric($("#inputUser").val())){
        $( "#inputUser" ).effect( "shake" );
        $( "#inputUser" ).addClass( "invalid-focus" );
        $('#error-text').show();
        $('#error-text').html("Error: not alphanumeric");
    }else if($("#inputUser").val().length<5){
         $( "#inputUser" ).effect( "shake" );
         $( "#inputUser" ).addClass( "invalid-focus" );
         $('#error-text').show();
         $('#error-text').html("Error: must be longer than 4 characters");
    }else if(!alphaNumeric($('#inputPassword').val())){
        $( "#inputPassword" ).effect( "shake" );
        $( "#inputPassword" ).addClass( "invalid-focus" );
        $('#error-text').show();
        $('#error-text').html("Error: not alphanumeric");
    } else if($('#inputPassword').val().length<7){
        $( "#inputPassword" ).effect( "shake" );
        $( "#inputPassword" ).addClass( "invalid-focus" );
        $('#error-text').show();
        $('#error-text').html("Error: must be longer than 6 characters");
    }else{
        $.ajax({
            type: "POST",
            url: 'db.php',
            data: {email: $("#inputEmail").val(), user: $("#inputUser").val(), password: $("#inputPassword").val(), signing_up: true, remember: $('#rem-check').is(':checked')},
            success: function(data){
              console.log(data);
              data = data.trim();
              if(data.substring(0,5) == "Error"){
                  if(data.indexOf("user") > -1){
                      $( "#inputUser" ).effect( "shake" );
                      $( "#inputUser" ).addClass( "invalid-focus" );
                  }else if(data.indexOf("Email") > -1){
                      $( "#inputEmail" ).effect( "shake" );
                      $( "#inputEmail" ).addClass( "invalid-focus" );
                  }
                  $('#error-text').show();
                  $('#error-text').html(data);
              }else{
                  //show screen
                  thisuser = data;
                  $('#sign-in-cont').fadeOut(function(){
                      //$('#sign-in-cont').css('height', '100px');
                      //$('#sign-in-cont').html('<h1>Welcome '+ thisuser+'</h1>').fadeIn(function(){
                          //$('#sign-in-cont').delay(1500).fadeOut(function(){
                              $(".container, #addSubject, #deleteSubject, #sign-out, #excel, #settings").fadeIn(function(){
                                   $('#course-cont').css('opacity', 1);
                              });
                          //});
                      //});
                  });
                  
                 
              }
            },
            dataType: 'HTML'
        });
    }
}


function scrollToSubject(ind){
    console.log(ind);
    if(ind == 0.5){
        ind = 0;
    }
        $('#course-cont').animate({
            scrollLeft: $('#courses .subject').eq(ind).offset().left - $('#course-cont').offset().left + $('#course-cont').scrollLeft()
        });
}

function updateUserObject(){
    console.log(userObj);
    console.log(thisuser);
        $.ajax({
  type: "POST",
  url: 'db.php',
  data: {user: thisuser, userObj: JSON.stringify(userObj).replace(/'/g, 'singqt'), updating_user: true},
  success: function(data){

  },
  dataType: 'HTML'
});
}

var form = 1;
$("#flip-form").click(function(){
    $('form').toggleClass("flip-form");
    $('#inputPassword').removeClass('invalid').removeClass('valid');
    $('#inputUser').toggleClass('invalid').toggleClass('valid');
    if(form){
        $('form h1').html("Please sign up");
        $('form button').html("Sign up");
        $('#inputEmail').show();
        $(this).children().html("Already have an account? Sign in");
        form = 0;
    }else{
        $('form h1').html("Please sign in");
        $('form button').html("Sign in");
        $(this).children().html("Don't have an account? Sign up");
        $('#inputEmail').hide();
        form = 1;
    }
    
})

$('form button').click(function(event){
    event.preventDefault();
    // sign IN
    if(form){
        login();
    }else{
        //SIGNING UP
        signup();
    }
    console.log(form);
})
var showingpword = 0;
$('#showorhidepword').click(function(){
    $("#showorhidepword").toggleClass("fa-eye").toggleClass("fa-eye-slash");
    if(showingpword){
        $('#inputPassword').attr('type','password');
        showingpword = 0;
    }else{
        $('#inputPassword').attr('type','text');
        showingpword = 1;
    }
})

function alphaNumeric(inputtxt)
  {
   var letters = /^[a-z0-9]+$/i;
   if(inputtxt.match(letters))
     {
      return true;
     }
   else
     {
     //alert("message");
     return false;
     }
  }
  
function validateUsername(){
     if(form){
        validateUserInput();
     }else{
        if(alphaNumeric($('#inputUser').val()) && $('#inputUser').val().length>5){
            $('#inputUser').addClass('valid');
            $('#inputUser').removeClass('invalid');
        }else{
            $('#inputUser').addClass('invalid');
            $('#inputUser').removeClass('valid');
        }
        invalidateUserInput();
     }
    clearError();
 }
 
 function validatePassword(){
     if(form){
        validatePasswordInput();
     }else{
        if(alphaNumeric($('#inputPassword').val()) && $('#inputPassword').val().length>7){
            $('#inputPassword').addClass('valid');
            $('#inputPassword').removeClass('invalid');
        }else{
            $('#inputPassword').addClass('invalid');
            $('#inputPassword').removeClass('valid');
        }
     }
    clearError();
 }
 
 function validateUserInput(){
        $.ajax({
  type: "POST",
  url: 'db.php',
  data: {user: $('#inputUser').val(), validating_user_input: true},
  success: function(data){
      if(data && data!== false && data.replace(/\s+/g, '')!==""){
          console.log("ME!" + data);
            $('#inputUser').addClass('valid');
            $('#inputUser').removeClass('invalid');
        }else{
            $('#inputUser').addClass('invalid');
            $('#inputUser').removeClass('valid');
        }
  },
  dataType: 'HTML'
});
}
function invalidateUserInput(){
        $.ajax({
  type: "POST",
  url: 'db.php',
  data: {user: $('#inputUser').val(), invalidating_user_input: true},
  success: function(data){
      if(data && data!== false && data.replace(/\s+/g, '')!==""){
             $('#inputUser').addClass('invalid');
            $('#inputUser').removeClass('valid');
        }else{
            $('#inputUser').addClass('valid');
            $('#inputUser').removeClass('invalid');
        }
  },
  dataType: 'HTML'
});
}
function validatePasswordInput(){
        $.ajax({
  type: "POST",
  url: 'db.php',
  data: {user: $('#inputUser').val(), password: $('#inputPassword').val(), validating_password_input: true},
  success: function(data){
      if(data && data!== false && data.replace(/\s+/g, '')!==""){
            $('#inputPassword').addClass('valid');
            $('#inputPassword').removeClass('invalid');
        }else{
            $('#inputPassword').addClass('invalid');
            $('#inputPassword').removeClass('valid');
        }
  },
  dataType: 'HTML'
});
}
function validateEmail(){
    clearError();
        $.ajax({
  type: "POST",
  url: 'db.php',
  data: {email: $('#inputEmail').val(), invalidating_email_input: true},
  success: function(data){
      if(data && data!== false && data.replace(/\s+/g, '')!==""){
            $('#inputEmail').addClass('invalid');
            $('#inputEmail').removeClass('valid');
        }else{
            $('#inputEmail').addClass('valid');
            $('#inputEmail').removeClass('invalid');
        }
  },
  dataType: 'HTML'
});
}

function signOut(){
    $.ajax({
        type: "POST",
        url: 'db.php',
        data: {signing_out: true},
        success: function(){
            cookieSet = false;
            $(".container, #addSubject, #deleteSubject, #sign-out, #excel, #settings").fadeOut(200);
            $('#course-cont').css('opacity', 0);
            $('#sign-in-cont').delay(200).fadeIn(200);
        },
        dataType: 'HTML'
    });

    
}

 const ele = document.getElementById('course-cont');
ele.scrollTop = 100;
ele.scrollLeft = 150;
 let pos = { top: 0, left: 0, x: 0, y: 0 };

const mouseDownHandler = function(e) {
    pos = {
        // The current scroll 
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

$( document ).tooltip();
  $(document).tooltip({
        tooltipClass: "tooltiptext",
        track: true,
});

// HOLDING CLICK ON ADD ASS
var intervalID;
$(".fa-plus-square").mousedown(function() {
     intervalId = setInterval(increase, 250);
 }).mouseup(function() {
    clearInterval(intervalId);
});
$(".fa-minus-square").mousedown(function() {
  intervalId = setInterval(decrease, 250);
}).mouseup(function() {
 clearInterval(intervalId);
});
function increase(){
    $(".fa-plus-square").click();
}
function decrease(){
    $(".fa-minus-square").click();
}

// EXPORTING TO EXCEL:
function downloadExcel(filename) {

      var element = document.createElement('a');
      element.setAttribute('href',filename);
      //element.setAttribute('download', filename);
      document.body.appendChild(element);
      element.click();
      //document.body.removeChild(element);
}
$('#excel').click(function(){
    $.ajax({
      type: "POST",
      url: 'phpSpreadsheet.php',
      data: {download_excel: true, user: thisuser},
      success: function(data){
          console.log(data.trim());
          downloadExcel("files/"+data.trim());
          deleteExcel("files/"+data.trim());
      },
      dataType: 'HTML'
    });
    
    
    console.log("t");
})

function deleteExcel(filename) {
    $.ajax({
      type: "POST",
      url: 'phpSpreadsheet.php',
      data: {delete_excel: true, file: filename},
      success: function(data){
          console.log(data);
      },
      dataType: 'HTML'
    });
}



function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}

// MOVING AROUND LIKE EXCEL
$('input').keydown(function(e){
    if(e.which === 38){ // UP ARROW
        e.preventDefault();
        console.log('yo');
    }
    if(e.which === 40){ // DOWN ARROW
        e.preventDefault();
        console.log('yo');
    }
    if(e.which === 37){ // LEFT ARROW
        e.preventDefault();
        console.log('yo');
    }
    if(e.which === 39){ // RIGHT ARROW
        e.preventDefault();
        console.log('yo');
    }
    if(e.which === 13){ // ENTER
        e.preventDefault();
        console.log('yo');
    }
    if(e.which === 9){ // TAB
        e.preventDefault();
        console.log('yo');
    }
});

// SETTINGS PAGE:
$("#settings").click(function(){
    $("#settings-cont").fadeIn();
})

$("#close-settings").click(function(){
    $("#settings-cont").fadeOut();
})

$('.toggle-switch').off().click(function(){
  if($('.toggle-switch input').is(":checked")){
    document.documentElement.style.setProperty('--bg', 'white');
    document.documentElement.style.setProperty('--txt', '#1d1d1d');
  }else{
    document.documentElement.style.setProperty('--bg', '#1d1d1d');
    document.documentElement.style.setProperty('--txt', 'white');
  }
})

