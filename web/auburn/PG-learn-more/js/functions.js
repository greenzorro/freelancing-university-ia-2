$(function () {

	formValidate();

})




function formValidate () {
	$(".form .submit").click(function () {
		$(".form .row").removeClass("error");
		$(".error_tip").hide();
		$(".form #form input").each(function () {
			if ($(this).val() == "") {
				$(this).parent().addClass("error");
			}
		})
		$(".form #form select").each(function () {
			if ($(this).val() == "") {
				$(this).parent().addClass("error");
			}
		})
		if($(".form #form .error").length > 0) {
			$(".error_tip").show();
		}
	})
}
