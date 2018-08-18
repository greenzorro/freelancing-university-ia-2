$(function () {

	formValidate();

})




function formValidate () {
	$("#cola-form .submit").click(function () {
		$("#cola-form .cola-row").removeClass("error");
		$(".error_tip").hide();
		$("#cola-form .cola-row input").each(function () {
			if ($(this).val() == "") {
				$(this).parent().addClass("error");
			}
		})
		$("#cola-form .cola-row select").each(function () {
			if ($(this).val() == "") {
				$(this).parent().addClass("error");
			}
		})
		if($("#cola-form .error").length > 0) {
			$(".error_tip").show();
		}
	})
}
