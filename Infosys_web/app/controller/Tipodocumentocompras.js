Ext.define('Infosys_web.controller.Tipodocumentocompras', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Tipo_documento_compras'
             ],

    models: ['Tipo_documentocompras'],

    views: ['tipo_documento_compras.Principal',
            'tipo_documento_compras.Ingresar'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
    
       ref: 'tipodocumentoprincipal',
        selector: 'tipodocumentoprincipal'
    },{
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
    
        ref: 'tipodocumentoingresar',
        selector: 'tipodocumentoingresar'
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

            'tipodocumentoprincipal button[action=buscartipodocumento]': {
                click: this.buscartipodocumento
            },
             
            'topmenus menuitem[action=mtipodocumento]': {
                click: this.mtipodocumento
            },
            
            'tipodocumentoprincipal button[action=exportarexceltipodocumento]': {
                click: this.exportarexceltipodocumento
            },
            
            'tipodocumentoingresar button[action=tipomovimientograbar]': {
                click: this.tipomovimientograbar
            },
            'tipodocumentoprincipal button[action=agregartipodocumento]': {
                click: this.agregartipodocumento
            },
            'tipodocumentoprincipal button[action=cerrartipodocumento]': {
                click: this.cerrartipodocumento
            }
        });
    },    
   
    exportarexceltipodocumento: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getTipodocumentoprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelTipodocumento?cols='+Ext.JSON.encode(jsonCol));

    },

    mtipodocumento: function(){

        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'tipodocumentoprincipal'});
    },


    buscartipodocumento: function(){

        console.log("llegamos") 
        var view = this.getTipodocumentoprincipal()
        var st = this.getTipo_documento_comprasStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();


    },

    
    tipomovimientograbar: function(){

            
        var win    = this.getTipodocumentoingresar(),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues();
       
        if(!form.getForm().isValid()){
            Ext.Msg.alert('Informacion', 'Rellene todo los campos');
            return false
        }
        
        var st = this.getTipo_documento_comprasStore()
        
        var nuevo = false;
        
        if (values.id > 0){
            record.set(values);
        } else{
            record = Ext.create('Infosys_web.model.Tipo_documentocompras');
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

    agregartipodocumento: function(){
        Ext.create('Infosys_web.view.tipo_documento_compras.Ingresar').show();
    },

    cerrartipodocumento: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
  
});










