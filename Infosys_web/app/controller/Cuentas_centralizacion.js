Ext.define('Infosys_web.controller.Cuentas_centralizacion', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: [],

    models: [],

    views: ['centralizacion.Ingresar'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
    
        ref: 'cuentascentraliza',
        selector: 'cuentascentraliza'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    }

    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({

            'cuentascentraliza button[action=grabarcentraliza]': {
                click: this.grabarcentraliza
            },
             
            'topmenus menuitem[action=mcentraliza]': {
                click: this.mcentraliza
            }
        });
    },

   
    mcentraliza: function(){
        Ext.create('Infosys_web.view.centralizacion.Ingresar').show();
    },

    grabarcentraliza :function(){


    },

   
  
});










