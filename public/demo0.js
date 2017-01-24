$(function () {
	var chooseBtn = $('#choose');
	var submitBtn = $('#submit');
	var file = $('#upload');
	var form = $('#fm');

	chooseBtn.click(function (event) {
		// 因为表单中任意button被点击都会导致提交，所以要阻止表单中button的默认行为
		event.preventDefault();
		// 点击自定义按钮的时候模拟表单文件控件的点击
		file.click();
	});
	// 注意这里用了个div而不是button也是因为button被点击默认会提交从而触发submit事件，
	// 而form.submit也会触发submit事件，所以默认情况下如果是button则会触发两次submit事件，
	// 而阻止button默认行为又会导致form.submit()也被阻止，事实上我们只想阻止一次button默认行为
	// 所以这里不用button而用了div
	submitBtn.click(function (event) {
		form.submit();
	});
	// 在表单提交前触发
	form.submit(function (event) {
		$(document.body)
			.append($('<iframe id="tempfrm" name="tempfrm"></iframe>'));
		$(this)
			.attr('target', 'tempfrm');
		setTimeout(function () {
			$('#tempfrm')
				.remove();
		}, 3000);
	});
});


// 也可以监听iframe的onload，但onload不能知道是成功还是失败，所以还是这样好点
function sayHello(data) {
	console.log(data);
}