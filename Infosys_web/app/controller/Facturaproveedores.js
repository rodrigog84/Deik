Ext.define('Infosys_web.controller.Facturaproveedores', {
    extend: 'Ext.app.Controller',

    stores: ['Facturaproveedor',
             'Proveedores'],

    models: ['Facturaproveedor'],

    views: [
        'facturaproveedores.Principal',
        'facturaproveedores.ingreso',
        'facturaproveedores.BusquedaProveedor'
    ],

    refs: [{
        ref: 'proveedoresprincipal',
        selector: 'proveedoresprincipal'
    },{
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'ingresofacturaproveedores',
        selector: 'ingresofacturaproveedores'
    },{
        ref: 'busquedaproveedorfactura',
        selector: 'busquedaproveedorfactura'
    },{
        ref: 'exportarpdfproveedores',
        selector: 'exportarpdfproveedores'
    },{
        ref: 'formularioexportarexcel',
        selector: 'formularioexportarexcel'
    }






       
    ],

    init: function() {

        this.control({
        	'topmenus menuitem[action=mfactprovee]': {
                click: this.mfactprovee
            },
             'proveedoresprincipal button[action=cerrarfacturaprovee]': {
                click: this.cerrarfacturaprovee
            },
             'proveedoresprincipal button[action=mfacturaprovee]': {
                click: this.mfacturaprovee
            },
            'ingresofacturaproveedores button[action=wbuscarproveedorfactura]': {
                click: this.wbuscarproveedorfactura
            },
            'busquedaproveedorfactura button[action=buscarproveedor]': {
                click: this.buscarproveedor2
            },
            'busquedaproveedorfactura button[action=seleccionarproveedor]': {
                click: this.seleccionarproveedor
            },
            'ingresofacturaproveedores button[action= grabarfacturaproveedores]': {
                click: this. grabarfacturaproveedores
            },
            'ingresofacturaproveedores #netoId': {
                specialkey: this.calculaiva
            },
            'proveedoresprincipal button[action=generarlibropdf]': {
                click: this.generarlibropdfprovee
            },
            'exportarpdfproveedores button[action=exportarPdfFormulario]': {
                click: this.exportarPdfFormulario
            },
            'proveedoresprincipal button[action=exportarexcelfacturas]': {
                click: this.exportarexcelfacturas
            },
            'formularioexportarexcel button[action=exportarExcelFormulario]': {
                click: this.exportarExcelFormulario
            },



           
            
        });
    },

    exportarExcelFormulario: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getProveedoresprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })
       
        var view =this.getFormularioexportarexcel()
        var viewnew =this.getProveedoresprincipal()
        var fecha = view.down('#fechaId').getSubmitValue();
        var opcion = viewnew.down('#tipoSeleccionId').getValue()
        var nombre = viewnew.down('#nombreId').getSubmitValue();
        var fecha2 = view.down('#fecha2Id').getSubmitValue();
        var opcion = "LIBRO COMPRAS";
        var tipo = 120;
        
        if (!tipo) {        
               Ext.Msg.alert('Alerta', 'Debe seleccionar Tipo de Documento');
            return;          

        };

        if (fecha > fecha2) {        
               Ext.Msg.alert('Alerta', 'Fechas Incorrectas');
            return;          

        };

        if (opcion == "LIBRO COMPRAS"){

             
             if (tipo == 120){
             window.open(preurl + 'facturasproveedores/exportarExcellibroFacturas?cols='+Ext.JSON.encode(jsonCol)+'&fecha='+fecha+'&fecha2='+fecha2);
             view.close();
             };

        }

       
 
    },

    exportarexcelfacturas: function(){
              
           Ext.create('Infosys_web.view.facturaproveedores.Exportar').show();
    },

    generarlibropdfprovee: function(){
              
           Ext.create('Infosys_web.view.facturaproveedores.Exportarpdf').show();
    }, 

    exportarPdfFormulario: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getProveedoresprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })

        var view =this.getExportarpdfproveedores()
        var viewnew =this.getProveedoresprincipal()
        var fecha = view.down('#fechaId').getSubmitValue();
        var fecha2 = view.down('#fecha2Id').getSubmitValue();
        var opcion = "LIBRO COMPRAS";

        
        if (fecha > fecha2) {
        
               Ext.Msg.alert('Alerta', 'Fechas Incorrectas');
            return;          

        };

        if (opcion == "LIBRO COMPRAS"){

            window.open(preurl + 'facturasproveedores/exportarPdflibroFacturas?cols='+Ext.JSON.encode(jsonCol)+'&fecha='+fecha+'&fecha2='+fecha2);
            view.close();
            
            

        }
       
 
    },

    calculaiva: function(){

        var view = this.getIngresofacturaproveedores();
        var neto = view.down('#netoId').getValue();
        var iva = ((neto * 19) / 100);
        var total = (neto + iva);
        view.down('#ivaId').setValue(iva);
        view.down('#totalId').setValue(total);
       
    },

    grabarfacturaproveedores: function(){

        var view = this.getIngresofacturaproveedores();
        var idproveedor = view.down('#idproveedor').getValue();
        var neto = view.down('#netoId').getValue();
        var iva = view.down('#ivaId').getValue();
        var total = view.down('#totalId').getValue();
        var exento = view.down('#exentoId').getValue();
        var fechavenc = view.down('#fechavencId').getValue();
        var fecha = view.down('#fechaId').getValue();
        var numero = view.down('#numrfacturaId').getValue();
        var stItem = this.getFacturaproveedorStore();

        var dataproveedor = {
            mail_contacto: view.down('#mail_contactoId').getValue(),
            nombre_contacto: view.down('#nombre_contactoId').getValue(),
            telefono_contacto: view.down('#fono_contactoId').getValue(),
        };
        
        if (!idproveedor){            
             Ext.Msg.alert('Debe Ingresar Datos del Proveedor');
             return;
        }

        if (!numero){            
             Ext.Msg.alert('Debe Ingresar Numero Factura');
             return;
        }

        if (!neto){            
             Ext.Msg.alert('Debe Valores');
             return;
        }

        if (!iva){            
             Ext.Msg.alert('Debe Valores');
             return;
        }

        if (!total){            
             Ext.Msg.alert('Debe Valores');
             return;
        }

        Ext.Ajax.request({
            url: preurl + 'facturasproveedores/save',
            params: {
                idproveedor: idproveedor,
                dataproveedor: Ext.JSON.encode(dataproveedor),
                exento : exento,
                neto: neto,
                iva: iva,
                total: total,
                numero: numero,
                fecha: Ext.Date.format(fecha,'Y-m-d'),
                fechavenc: Ext.Date.format(fechavenc,'Y-m-d'),
                
            },
            success: function(response){
                var text = response.responseText;
                Ext.Msg.alert('Informacion', 'Creada Exitosamente.');
                view.close();
                stItem.load();
            }
        });

        
    },

    seleccionarproveedor: function() {

        var viewIngresa = this.getIngresofacturaproveedores();
        var view = this.getBusquedaproveedorfactura();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#idproveedor').setValue(row.data.id);
            viewIngresa.down('#direccionId').setValue(row.data.direccion);
            viewIngresa.down('#nomgiroId').setValue(row.data.giro);
            viewIngresa.down('#giroId').setValue(row.data.id_giro);
            viewIngresa.down('#mail_contactoId').setValue(row.data.e_mail_contacto);
            viewIngresa.down('#nombre_contactoId').setValue(row.data.nombre_contacto);
            viewIngresa.down('#empresaId').setValue(row.data.nombres);
            viewIngresa.down('#rutId').setValue(row.data.rut);
            viewIngresa.down('#fono_contactoId').setValue(row.data.fono_contacto);
            viewIngresa.down('#fonoId').setValue(row.data.fono);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },
    
    buscarproveedor2: function() {

        var view = this.getBusquedaproveedorfactura();
        var st = this.getProveedoresStore()
        var nombre = view.down('#bproveedornombreId').getValue();
        var rut = view.down('#bproveedorrutId').getValue();
        var numero = rut.length;
        var cero = "";

        if (nombre==""){            
            var opcion = "Rut";
            var nombre = view.down('#bproveedorrutId').getValue();
        };

        if (rut==""){            
            var opcion = "Nombre";
            var nombre = view.down('#bproveedornombreId').getValue();
        };
        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
        st.load();                 
               
    }, 

    wbuscarproveedorfactura: function(){

        var view = Ext.create('Infosys_web.view.facturaproveedores.BusquedaProveedor').show();
        view.down("#bproveedornombreId").focus();
        
    },

    mfacturaprovee: function(){

          Ext.create('Infosys_web.view.facturaproveedores.ingreso').show();
        
    },

     mfactprovee: function(){

        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'proveedoresprincipal'});
        var view = this.getProveedoresprincipal();        
        view.down("#nombreId").focus();
    },   

     cerrarfacturaprovee: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
    
});










