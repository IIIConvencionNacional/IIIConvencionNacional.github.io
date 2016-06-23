/* jquery functions */
$(function() {

	var urlParams;
	(window.onpopstate = function () {
	    var match,
	        pl     = /\+/g,  // Regex for replacing addition symbol with a space
	        search = /([^&=]+)=?([^&]*)/g,
	        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
	        query  = window.location.search.substring(1);

	    urlParams = {};
	    while (match = search.exec(query)){
	       urlParams[decode(match[1])] = decode(match[2]);
	    }
	})();

	/* ticket buying fucntions */
	function fn_password_toggle(){
		if($("input[name='user_password_toggle']:checked").val() == "Y"){
			$("#user_password, #helpBlock").show();
			$("#user_password_new, #user_password_new2, .g-recaptcha").hide().val('');
		}else{
			$("#user_password, #helpBlock").hide().val('');
			$("#user_password_new, #user_password_new2, .g-recaptcha").show();
		}
	}
	$("input[name='user_password_toggle']").on("change",function(){
		fn_password_toggle();
	});
	fn_password_toggle();

	function pw_reminder_toggle(){
		$("#user_password_toggleN").parent().parent().parent().hide();
		$("#user_password, #helpBlock").html('<p>Please enter the email address you registered with in the field above and we will email you further instructions.</p>');
		$("#submit").text("Reset password");
		$(".g-recaptcha").show();
	}

	if($("#unique_request_key").val()){
		$(".g-recaptcha").hide();	
		$("#submit").text("Reset password");
	}

	if($("#unique_request_key_used").val()){
		$(".g-recaptcha").hide();	
		$("#submit").remove();
	}

	$("#pw_reminder_toggle").on("click",function(e){
		e.preventDefault();
		pw_reminder_toggle();
		$("#pw_reminder").val(1);
	});

	if($("#pw_reminder").val() == 1){
		pw_reminder_toggle();
	}

	function full_product_description_hide(){
		var object = $("input[name='product_id']:not(:checked),input[name^='event_id']:not(:checked)").parent();
		object.find('.short_description').show();
		object.find('.description').hide();
		object.find("input[name^='a_']").prop('checked', false);
	}
	function full_product_description_show(object){
		object.find(".description").show();
		object.find(".short_description").hide();
	}

	$("body").on("change","input[name='product_id'],input[name^='event_id']",function(e){
		full_product_description_hide();
		full_product_description_show($(this).parent().parent());
	});

	$("input[name='product_id']:checked,input[name^='event_id']:checked").each(function( index ) {
		full_product_description_show($(this).parent().parent());
	});

	$("#delegate_phone").on("change",function(){
		$("#delegate_phone").val( $("#delegate_phone").val().replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3") );
	});

	var $non_corp_rate_url = '';
	if(urlParams["non_corp_rate_url"]){
		$non_corp_rate_url = urlParams["non_corp_rate_url"];
	}

	function non_corp_rate_url(object){
		if(object.is(":checked")){
			object.parent().after('<div class="form-group" style="padding:10px 20px 0">'
			+'<input type="text" placeholder="http://" name="non_corp_rate_url" class="form-control" value="'+$non_corp_rate_url+'">'
			+'<input type="hidden" name="non_corp_rate" value="1">'
			+'</div>');
		}else{
			$("input[name='non_corp_rate_url']").parent().remove();
		}
	}

	$("body").on("change", ".checkbox label:contains('Non-corporate') input", function(){
		non_corp_rate_url($(this));
	});

	non_corp_rate_url($(".checkbox label:contains('Non-corporate') input"));

	$("#person_phone").on("change",function(){
		$("#person_phone").val( $("#person_phone").val().replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3") );
	});

	$("#shop_form").on("click",".btn-eticket",function(){
		$("#modal-eticket .modal-body").html('');
		var $eticketUid = $(this).data("eticket-uid");
		$("#modal-eticket .modal-body").load( "/widgets/eticket/output.php?eticket_uid="+$eticketUid );
	});
	
	$("#toggleSearch").on("click",function(){
		$("#toggleSearch").toggle();
		$("#___gcse_0").toggle();
	});
	$(".expand_links a[href='#']").on("click", function (e) {
		e.preventDefault();
		$(this).closest('.schedule').find('.expanded').show();
		$(this).closest('.expand_links').hide();
	});
	
	/*$('.dropdown').on('mouseenter mouseleave click tap', function() {
	  $(this).find('.dropdown-menu').slideToggle(200);
	});*/

	// cookies
	$.cookieCuttr({
		cookieAnalytics: false,
		cookieMessage: 'We use cookies on this website, <a href="{{cookiePolicyLink}}" title="read about our cookies">you can read about them here</a>. To use the website as intended please... ',
		cookiePolicyLink: '/about/legal-info/#cookies',
		cookieNotificationLocationBottom: true
	});
	if( $.cookieAccepted() ) { 
		$('#resetcookies').append('<p class="reset" style="display: block;"><a title="Reset" href="#" class="cc-cookie-reset">Reset Cookies</a></p>');
		$('p.reset a.cc-cookie-reset').click(function(z) {
			z.preventDefault();
			$.cookie("cc_cookie_accept", null, {
				path: '/'
			});
			$.cookie("cc_cookie_decline", null, {
				path: '/'
			});
			location.reload();
		});
	}

	// tab jump
	var hash = document.location.hash;
	var prefix = "go-";
	if (hash) {
		$(".nav-tabs a[href="+hash.replace(prefix,"")+"]").tab("show");
	} 
	
	// Change hash for page-reload
	$(".nav-tabs a").on("shown", function (e) {
		window.location.hash = e.target.hash.replace("#", "#" + prefix);
	});
	
	if (window.addtocalendar)if(typeof window.addtocalendar.start == "function")return;
            if (window.ifaddtocalendar == undefined) { window.ifaddtocalendar = 1;
                var d = document, s = d.createElement('script'), g = 'getElementsByTagName';
                s.type = 'text/javascript';s.charset = 'UTF-8';s.async = true;
                s.src = ('https:' == window.location.protocol ? 'https' : 'http')+'://addtocalendar.com/atc/1.5/atc.min.js';
                var h = d[g]('body')[0];h.appendChild(s); }

});


            
				