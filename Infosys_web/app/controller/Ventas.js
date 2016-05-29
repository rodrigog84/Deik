Ext.define('Infosys_web.controller.Ventas', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: [],

    models: [],

    views: ['ventas.Ventas', 'ventas.Ejemplo'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
       ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'ventasingresar',
        selector: 'ventasingresar'
    },{
        ref: 'ventasejemplo',
        selector: 'ventasejemplo'
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

             'topmenus menuitem[action=mventas]': {
                click: this.mventas
            },
           
            'topmenus button[action=mejemplo]': {
                click: this.mejemplo
            },


        });
    },

    
    mventas: function(){

        Ext.create('Infosys_web.view.ventas.Ventas').show();
    },

    mejemplo: function(){

        Ext.create('Infosys_web.view.ventas.Ejemplo').show();
    },

    
  
});










