Ext.define('Infosys_web.controller.Bitacora', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Bitacora'],

    models: ['bitacora'],

    views: ['usuarios.Principal'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
       ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'usuariosprincipal',
        selector: 'usuariosprincipal'
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
           
            'topmenus menuitem[action=mbitacora]': {
                click: this.mbitacora
            },
            'usuariosprincipal button[action=buscarbitacora]': {
                click: this.buscarbitacora
            },
            'usuariosprincipal button[action=cerrarusuarios]': {
                click: this.cerrarusuarios
            },
            'usuariosprincipal button[action=exportarexcelbitacora]': {
                click: this.exportarexcelbitacora
            }
           
        });
    },

     exportarexcelbitacora: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getUsuariosprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelBitacora?cols='+Ext.JSON.encode(jsonCol));
 
    },

   
    cerrarusuarios: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },
 
    mbitacora: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        var st = this.getBitacoraStore()
        st.load();
        viewport.add({xtype: 'usuariosprincipal'});
    },

   
    buscarbitacora: function(){

        var view = this.getUsuariosprincipal()
        var st = this.getBitacoraStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();

   },

    
  
});










