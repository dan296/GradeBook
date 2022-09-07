var userObj = [
  {
  subject: "Chemistry",
  icon: "<i class='fas fa-atom'></i> ",
  target: [90],
  assignments: ["Exam 1", "Exam 2", "Exam 3", "Exam 4", "Exam 5", "Exam 6"],
  possible_points: [100, 100, 200, 400, 100, 100, 900],
  grades: [85],
  color: '#34abde'
},
{
  subject: "English",
  icon: "",
  target: [80],
  assignments: ["Exam 1", "Exam 2", "Exam 3"],
  possible_points: [100, 100, 50],
  grades: [85],
  color: '#4a4bde'
}  
];

var sheetHTML = $('.sheet').html();
function setUpSheets(){
  for(var i = 0; i < userObj.length; i++){
    $( "#courses" ).append("<div class='btn btn-primary subject' style='background-color:"+userObj[i].color+"'><span class='subject-title-icon'>"+userObj[i].icon+"</span><span class='subject-title'>"+userObj[i].subject+"</span><i class='fas fa-minus-circle text-danger'></i><i class='fas fa-edit'></i></>");
  }
  
}

setUpSheets();

$('#calc').click(function(){
  for(var i = 0; i < $('.column-labels').eq(0).children().length-1; i++){
  calculateGrades(i+1)
}
    calculateAverage();
})

$('#addAss').click(function(){
  addAssignment();
})

$('#remAss').click(function(){
  removeAssignment();
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
      $('#item'+id+'ptsgained').prop('placeholder',verifGrade.toFixed(2));
    }
    $('#item'+id+'verif').prop('value',verifGrade.toFixed(2));
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
      text = '<input id="item'+ind+'assignment" type="text" placeholder="Assignment">';
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
}

function removeAssignment(){
  var ind = parseInt($('.column-labels').eq(0).children().length);
  if(ind > 3){
      for(var i = 0; i < $('.column-labels').length; i++){
    $('.column-labels').eq(i).children().last().remove();
      }
  }
  
}
var counter = 0;
var currentindex = -1;
$("#courses").on('click','.subject',  function(){
  currentindex = $(this).index();
  $('#sheet-title').html($(this).html());
  $('.column-labels, #calc, #addSubject, #deleteSubject, .top-column').css('background', userObj[currentindex].color);
  $('#sheet-title').css('color', userObj[currentindex].color);
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
 $('.fa-minus-circle, .subject .fa-edit').show(); 
  $('#donedeleteSubject').show();
  $('#deleteSubject').hide();
    $('#cancelAddSubject').click();
})

$('#donedeleteSubject').click(function(){
 $('.fa-minus-circle, .subject .fa-edit').hide();  
  $('#donedeleteSubject').hide();
  $('#deleteSubject').show();
})

$('#confAddSubject').click(function(){
  if($('#newSubject').val() !== ""){
    if(editingPick){
      $( "#courses .subject" ).eq(editingPickInd).css('background-color', $('#preview-button').css('background-color'));
      $( "#courses .subject" ).eq(editingPickInd).html($('#preview-button').html()+"<i class='fas fa-minus-circle text-danger'></i><i class='fas fa-edit'></i>");
    var thisicon = "";
    if($('#preview-button .subject-title-icon').html() !== undefined){
      thisicon = $('#preview-button .subject-title-icon').html();
    }
    userObj[editingPickInd]={
      subject: $('#preview-button .subject-title').html(),
      icon: thisicon,
      target: userObj[editingPickInd].target,
  assignments: userObj[editingPickInd].assignments,
  possible_points: userObj[editingPickInd].possible_points,
  grades: userObj[editingPickInd].grades,
  color: rgb2hex($('#preview-button').css('background-color'))
    };
      $( "#courses .subject" ).eq(editingPickInd).click();
      $('#cancelAddSubject').click();
    }else{
      $( "#courses" ).append("<div class='btn btn-primary subject' style='background-color:"+$('#preview-button').css('background-color')+"'>"+$('#preview-button').html()+"<i class='fas fa-minus-circle text-danger'></i><i class='fas fa-edit'></i></>");
    var thisicon = "";
    if($('#preview-button .subject-title-icon').html() !== undefined){
      thisicon = $('#preview-button .subject-title-icon').html();
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
    

    }
    
    $('.subject .fa-minus-circle').click(function(){
  var index = $(this).parent().index();
  console.log('yo'+index);
  if(index == userObj.length - 1){
    currentindex = index - 1;
  }
  userObj.splice(index,1);
  $('.subject').eq(currentindex).click();
  $(this).parent().remove();
  if(userObj.length == 0){
    $('.sheet').html(sheetHTML)
  }
})
    
    $('.subject .fa-edit').click(function(){
  editingPick = true;
  var index = $(this).parent().index();
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
  console.log('yo'+index);
  if(index == userObj.length - 1){
    currentindex = index - 1;
  }
  userObj.splice(index,1);
  $('.subject').eq(currentindex).click();
  $(this).parent().remove();
  if(userObj.length == 0){
    $('.sheet').html(sheetHTML)
  }
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
  var index = $(this).parent().index();
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
    userObj[currentindex].assignments = [];
  userObj[currentindex].grades = [];
  userObj[currentindex].possible_points = [];
  userObj[currentindex].target = [parseInt($('#target-grade').val())];
  for(var i = 0; i < $('.column-labels').eq(0).children().length-1; i++){
    userObj[currentindex].assignments.push( $('#item'+parseInt(i+1)+'assignment').val());
    userObj[currentindex].grades.push(parseInt($('#item'+parseInt(i+1)+'grade').val()));
    userObj[currentindex].possible_points.push(parseInt($('#item'+parseInt(i+1)+'pts').val()));
  }
$('#calc').click();
}

$( "#sheetwrapper input" ).keyup(function( event ) {
  event.preventDefault();
  updateUser();
});