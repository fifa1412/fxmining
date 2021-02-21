var Formatter = {};

Formatter.getIndicatorColor = function(request_settings, value){
   let min, max;
   let color_code = "";
   let threshold_list = Object.keys(INDICATOR_SETTINGS_TEMPLATE[request_settings.indicator_name][request_settings.value]);
   
   threshold_list.forEach(function(threshold) {
      min = INDICATOR_SETTINGS_TEMPLATE[request_settings.indicator_name][request_settings.value][threshold]['min'];
      max = INDICATOR_SETTINGS_TEMPLATE[request_settings.indicator_name][request_settings.value][threshold]['max'];
      if(value>=min && value<max){
         color_code = INDICATOR_SETTINGS_TEMPLATE[request_settings.indicator_name][request_settings.value][threshold]['color'];
      }
   });

   return color_code;
}

Formatter.getDiffPoints = function(digits,first_price,second_price){
   return Math.round(Math.abs((Math.pow(10,digits)*first_price)-(Math.pow(10,digits)*second_price)));
}
