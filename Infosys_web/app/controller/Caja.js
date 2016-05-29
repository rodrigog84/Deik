Ext.define('Infosys_web.controller.Caja', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Control_cajas'],

    models: ['control_caja'],

    views: ['ventacaja.Principal'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
       ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{
        ref: 'ventacajaprincipal',
        selector: 'ventacajaprincipal'
    }
    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({
           
            'topmenus menuitem[action=mcontrolcaja]': {
                click: this.mcontrolcaja
            },
            'ventacajaprincipal button[action=buscarcontrolcaja]': {
                click: this.buscarcontrolcaja
            },
            'ventacajaprincipal button[action=cerrarcontrolcaja]': {
                click: this.cerrarcontrolcaja
            },
            'ventacajaprincipal button[action=exportarexcelcontrolcaja]': {
                click: this.exportarexcelcontrolcaja
            },
            'ventacajaprincipal button[action=editarcontrolcaja]': {
                click: this.editarcontrolcaja
            },
           
        });
    },

    editarcontrolcaja: function(){

        
    },


    cerrarcontrolcaja: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },
 
    mcontrolcaja: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'ventacajaprincipal'});
    },

   
    exportarexcelcontrolcaja: function(){

        

    },

    buscarcontrolcaja: function(){

        var view = this.getVentacajaprincipal()
        var st = this.getControl_cajaStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();

    },

    
  
});










