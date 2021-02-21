let is_first_run = true;

const BASE_URL = "//" + window.location.host;
const FLOOR_VALUE = -9999;
const CEIL_VALUE = 9999;
const MA_COMPARE_PRICE = "price_bid";
const INDICATOR_SETTINGS_TEMPLATE = {
    'ADX':{
        'mode_main':{
            'weak':{'color':'#17E9E6','level':1,'min':0,'max':25,},
            'strong':{'color':'#1A71D3','level':1,'min':25,'max':50,},
            'very_strong':{'color':'#04008F','level':1,'min':50,'max':CEIL_VALUE,}
        },
        'mode_plusdi':{
            'weak':{'color':'#D5FFCC','level':1,'min':0,'max':15,},
            'rally':{'color':'#87FE9A','level':2,'min':15,'max':25,},
            'strong':{'color':'#4BF125','level':3,'min':25,'max':50,},
            'very_strong':{'color':'#20800B','level':4,'min':50,'max':CEIL_VALUE,}
        },
        'mode_minusdi':{
            'weak':{'color':'#ffcccc','level':1,'min':0,'max':15,},
            'rally':{'color':'#FF7F7F','level':2,'min':15,'max':25,},
            'strong':{'color':'#DF1B1B','level':3,'min':25,'max':50,},
            'very_strong':{'color':'#940909','level':4,'min':50,'max':CEIL_VALUE,}
        },
    },
    'CCI':{
        'main_value':{
            'very_low':{'color':'#e60000','level':1,'min':FLOOR_VALUE,'max':-90,},
            'low':{'color':'#ff8080','level':2,'min':-90,'max':0,},
            'high':{'color':'#66ff66','level':3,'min':0,'max':90,},
            'very_high':{'color':'#009900','level':4,'min':90,'max':CEIL_VALUE,},
        },
    },
    'STOCHASTIC':{
        'mode_main':{
            'over_sold':{'color':'#00cc00','level':1,'min':0,'max':10,},
            'sold':{'color':'#4dff4d','level':2,'min':10,'max':25,},
            'soft_sold':{'color':'#99ff99','level':3,'min':25,'max':50,},
            'soft_bought':{'color':'#ffb3b3','level':4,'min':50,'max':75,},
            'bought':{'color':'#ff6666','level':5,'min':75,'max':90,},
            'over_bought':{'color':'#ff0000','level':6,'min':90,'max':100,},
        },
        'mode_signal':{
            'over_sold':{'color':'#00cc00','level':1,'min':0,'max':10,},
            'sold':{'color':'#4dff4d','level':2,'min':10,'max':25,},
            'soft_sold':{'color':'#99ff99','level':3,'min':25,'max':50,},
            'soft_bought':{'color':'#ffb3b3','level':4,'min':50,'max':75,},
            'bought':{'color':'#ff6666','level':5,'min':75,'max':90,},
            'over_bought':{'color':'#ff0000','level':6,'min':90,'max':100,},
        },
    },
};



