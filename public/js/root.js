var Root = {};

Root.showPopup = function(text){
	Swal.fire({
        html: text,
        width: '300px',
        showConfirmButton: false,
        allowOutsideClick: false,
    });
	Swal.showLoading();
}

Root.showPopupUpRightCorner = function(status, text){
    Message.add(text, {
        type: status,
        life: 5000
    });
}

Root.formatDatetime = function(date_obj){
    let month = (date_obj.getMonth() > 9) ? date_obj.getMonth() : ('0' + date_obj.getMonth());
    let day = (date_obj.getDate() > 9) ? date_obj.getDate() : ('0' + date_obj.getDate());
    let hour = (date_obj.getHours() > 9) ? date_obj.getHours() : ('0' + date_obj.getHours());
    let minute = (date_obj.getMinutes() > 9) ? date_obj.getMinutes() : ('0' + date_obj.getMinutes());
    let second = (date_obj.getSeconds() > 9) ? date_obj.getSeconds() : ('0' + date_obj.getSeconds());
    return  `${day}/${month}/${date_obj.getFullYear()} ${hour}:${minute}:${second}`;
}

Root.closePopup = function(){
	Swal.close();
}

Root.randomStr = function(length){
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for(let i=0; i<length; i++) {
        result += characters.charAt(Math.floor(Math.random()*charactersLength));
    }
    return result;
}

Root.showWarningWithRedirect = function(text, url){
	Swal.fire({
		html: text,
		icon: 'warning',
		width: '550px',
		showConfirmButton: true,
	}).then(function() {
		if(typeof url !== 'undefined'){
			window.location = url;
		}
	});
}

Root.getPriceColor = function(pair,price_type,current_price){
    if(is_first_run == false){
        let previous_price = document.getElementById(pair+"_"+price_type).innerText;
        if(previous_price > current_price){
            return "red";
        }else if(previous_price == current_price){
            return $('#'+pair+"_"+price_type).css("color");
        }else{
            return "lime";
        }
    }
}