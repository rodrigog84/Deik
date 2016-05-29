Ext.define('Infosys_web.controller.Correlativos', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Correlativos'
             ],

    models: ['Correlativo'],

    views: ['correlativos.BusquedaCorrelativos','correlativos.Ingresar',
    'correlativos.Principal'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
    
       ref: 'correlativosprincipal',
        selector: 'correlativosprincipal'
    },{
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
    
        ref: 'correlativosingresar',
        selector: 'correlativosingresar'
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

            'correlativosprincipal button[action=buscarcorrelativos]': {
                click: this.buscarcorrelativos
            },
             
            'topmenus menuitem[action=mcorrelativos]': {
                click: this.mcorrelativos
            },
            
            'correlativosprincipal button[action=exportarexcelcorrelativos]': {
                click: this.exportarexcelcorrelativos
            },
            
            'correlativosingresar button[action=grabarcorrelativos]': {
                click: this.grabarcorrelativos
            },
            'correlativosprincipal button[action=agregarcorrelativos]': {
                click: this.agregarcorrelativos
            },
            'correlativosprincipal button[action=editarcorrelativos]': {
                click: this.editarcorrelativos
            },
            'correlativosprincipal button[action=cerrarcorrelativos]': {
                click: this.cerrarcorrelativos
            }
        });
    },

   
    exportarexcelcorrelativos: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getProveedorprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelProveedor?cols='+Ext.JSON.encode(jsonCol));

    },

    mcorrelativos: function(){
       
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'correlativosprincipal'});
    },


    buscarcorrelativos: function(){
        
        var view = this.getCorrelativosprincipal()
        var st = this.getCorrelativosStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();


    },

    
    grabarcorrelativos: function(){

            
        var win    = this.getCorrelativosingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
       
        if(!form.getForm().isValid()){
            Ext.Msg.alert('Informacion', 'Rellene todo los campos');
            return false
        }
        
        var st = this.getCorrelativosStore();
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Correlativo');
            record.set(values);
            st.add(record);
            nuevo = true;
        }
        
        win.close();
        st.sync({
            success: function(){
                st.load();
            }
        }

        );
    },

        
    editarcorrelativos: function(){
        
        var view = this.getCorrelativosprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var edit = Ext.create('Infosys_web.view.correlativos.Ingresar').show();
            edit.down('form').loadRecord(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    agregarcorrelativos: function(){
        Ext.create('Infosys_web.view.correlativos.Ingresar').show();
    },

    cerrarcorrelativos: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
  
});










