Ext.define('Infosys_web.controller.Existencias', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Existencias',
             'Existencias2'],

    models: ['existencias',
              'existencias2'],

    views: ['existencia.Principal',
             'existencia.detalle_existencias'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
       ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'existenciaprincipal',
        selector: 'existenciaprincipal'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{
        ref: 'detalleexistencias',
        selector: 'detalleexistencias'
    }
    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({
           
            'topmenus menuitem[action=mexistencia]': {
                click: this.mexistencia
            },
            'existenciaprincipal button[action=buscarexistencia]': {
                click: this.buscarexistencia
            },
            'existenciaprincipal button[action=cerrarexistencia]': {
                click: this.cerrarexistencia
            },
            'existenciaprincipal button[action=exportarexcelexistencia]': {
                click: this.exportarexcelexistencia
            },
            'detalleexistencias button[action=exportarexcelexistenciadetalle]': {
                click: this.exportarexcelexistenciadetalle
            },
            'existenciaprincipal button[action=editarexistencia]': {
                click: this.editarexistencia
            },
           
        });
    },

    editarexistencia: function(){

        var view = this.getExistenciaprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.existencia.detalle_existencias').show();
            var nombre = (row.get('id_producto'));
            var stock = (row.get('stock'));
            edit.down('#productoId').setValue(nombre);
            edit.down('#stockId').setValue(stock);
            var st = this.getExistencias2Store()
            st.proxy.extraParams = {nombre : nombre}
            st.load();
           
                   
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },


    cerrarexistencia: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },
 
    mexistencia: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        var st = this.getExistenciasStore()
        st.load();
        viewport.add({xtype: 'existenciaprincipal'});
    },

    exportarexcelexistencia: function(){

        var jsonCol = new Array()
        var i = 0;
        var grid =this.getExistenciaprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelExistencia?cols='+Ext.JSON.encode(jsonCol));

   },

    exportarexcelexistenciadetalle: function(){

        var view =this.getDetalleexistencias()
        var idproducto = view.down('#productoId').getValue()
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getDetalleexistencias()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelExistenciadetalle?idproducto='+idproducto+'&cols='+Ext.JSON.encode(jsonCol));
         view.close();

   },

    buscarexistencia: function(){

        var view = this.getExistenciaprincipal()
        var st = this.getExistenciasStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();

   },

    
  
});










