
$(document).ready(function() {

  $("#navButton").on('click', function(){
    $('.header-nav').toggleClass('menu-open');
    $('#navButton i').toggleClass('fa-circle');
  });

	keepRatio();

	$(window).resize(function() {
		keepRatio();
	});

  var leadIP;
  var leadClaim = "No";
  var leadReport = "No";
  var leadWhitepaper = "No";


  $.getJSON("http://jsonip.com/?callback=?", function (data) {
    leadIP = data.ip;
    console.log(leadIP);
  });

  $("#lead-form").on("submit", function(e){
    e.preventDefault();

    var leadName = $("#lead-name").val(),
        leadEmail = $("#lead-email").val(),
        leadPhone = $("#lead-phone").val(),
        leadJob = $("#lead-job").val(),
        leadPractice = $("#lead-practice").val();

    switch ($("#lead-action").val()) {
      case "claim":
          leadClaim = "Yes";
          break;
      case "report":
          leadReport = "Yes";
          break;
      case "whitepaper":
          leadWhitepaper = "Yes";
          break;
      default:
          // Do nothing!
    }

    $.ajax({
      data: JSON.stringify({
        "id": leadEmail,
        "name": leadName,
        "email": leadEmail,
        "phone": leadPhone,
        "last_seen_ip": leadIP,
        "custom_attributes": {
          "Job Title": leadJob,
          "Practice": leadPractice,
          "Claimed Profile": leadClaim,
          "Accessed Report": leadReport,
          "Downloaded Whitepaper": leadWhitepaper
        }
      }),
      dataType: 'json',
      processData: false,
      type: 'POST',
      url: "https://hooks.zapier.com/hooks/catch/564458/96yhms/",
      success: function(data, status, xhttp){
        console.log("Status: " + status);
        console.log(data);
        console.log(xhttp);
      }
    });

    $(this)[0].reset();
  });

});

function keepRatio() {
  var iframeWidth = $( "iframe" ).width();
  $('iframe').height(iframeWidth * 0.5625);
}
