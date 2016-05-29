Ext.define('Infosys_web.controller.Comisiones', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['comisiones.Selector',
            'comision'
             ],

    models: ['Vendedor',
             'Vendedores.Item'],

    views: ['comisiones.Principal',
            'comisiones.Exportarpdf'
            ],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
    
       ref: 'comisionesprincipal',
        selector: 'comisionesprincipal'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{    
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{    
        ref: 'formularioexportarpdfcomisiones',
        selector: 'formularioexportarpdfcomisiones'
    }
  
    ],
    
    init: function() {
    	
        this.control({

            'topmenus menuitem[action=mcomisiones]': {
                click: this.mcomisiones
            },
            'comisionesprincipal button[action=buscar]': {
                click: this.buscar
            },
            'comisionesprincipal button[action=cerrar]': {
                click: this.cerrar
            },
            'formularioexportarpdfcomisiones button[action=exportarPdfFormulario]': {
                click: this.exportarPdf
            },
            'comisionesprincipal button[action=generarcomisionespdf]': {
                click: this.generarcomisionpdf
            },
        });
    },

    generarcomisionpdf: function(){
              
           Ext.create('Infosys_web.view.comisiones.Exportarpdf').show();
    },
    
    exportarPdf: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getComisionesprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })

        var view = this.getComisionesprincipal();
        if (view.getSelectionModel().hasSelection()){
            var row = view.getSelectionModel().getSelection()[0];
            var id = (row.data.id);
            var viewnew = this.getFormularioexportarpdfcomisiones();
            var fecha = viewnew.down('#fechaId').getSubmitValue();
            var fecha2 = viewnew.down('#fecha2Id').getSubmitValue();
            var opcion = viewnew.down('#tipoId').getSubmitValue();

        if (fecha > fecha2){        
               Ext.Msg.alert('Alerta', 'Fechas Incorrectas');
            return;
        };

        if (opcion == "PDF"){
            window.open(preurl + 'comisiones/exportarPdf?cols='+Ext.JSON.encode(jsonCol)+'&fecha='+fecha+'&fecha2='+fecha2+'&id='+id);
            viewnew.close();
        }else{
             window.open(preurl + 'comisiones/exportarExcelcomision?cols='+Ext.JSON.encode(jsonCol)+'&fecha='+fecha+'&fecha2='+fecha2+'&id='+id);
            viewnew.close();     

        }
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },   
    
    buscar: function(){
        var view = this.getComisionesprincipal();
        var st = this.getComisionStore()
        var nombre = view.down('#nombreId').getValue()
        console.log(nombre)
        st.proxy.extraParams = {nombre : nombre}
        st.load();

    },    
    
    mcomisiones: function(){       
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'comisionesprincipal'});
    },
   
    cerrar: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();     
    },
  
});










