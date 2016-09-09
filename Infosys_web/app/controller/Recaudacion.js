Ext.define('Infosys_web.controller.Recaudacion', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Recauda',
            'recaudacion.Selector'],

    models: ['Recauda'],

    views: ['recaudacion.Principal',
            'recaudacion.Exportar',
            'recaudacion.ExportarPdf',
            'Pago_caja.Edita_pagos'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
       ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'recaudacionprincipal',
        selector: 'recaudacionprincipal'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{
        ref: 'exportarrecaudacion',
        selector: 'exportarrecaudacion'
    },{
        ref: 'pdfexportarrecaudacion',
        selector: 'pdfexportarrecaudacion'
    },{
        ref: 'editapagos',
        selector: 'editapagos'
    }

    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({
           
            'topmenus menuitem[action=mrecauda]': {
                click: this.mrecauda
            },
            
            'recaudacionprincipal button[action=cerrarrecaudacion]': {
                click: this.cerrarrecaudacion
            },
            'recaudacionprincipal button[action=exportarecauda]': {
                click: this.exportarecauda
            },
            'recaudacionprincipal button[action=exportarecaudapdf]': {
                click: this.exportarecaudapdf
            },
            'recaudacionprincipal button[action=editarrecaudacion]': {
                click: this.editarrecaudacion
            },
            'recaudacionprincipal button[action=buscarrecaudacion]': {
                click: this.buscarrecaudacion
            },
            'recaudacionprincipal button[action=exportarrecaudacionPdf]': {
                click: this.exportarrecaudacionPdf
            },
            'exportarrecaudacion button[action=exportarexcelrecaudacion]': {
                click: this.exportarexcelrecaudacion
            },
            'recaudacionprincipal button[action=exportarecaudadetalle]': {
                click: this.exportarecaudadetalle
            },
            'recaudacionprincipal button[action=exportarlibrorecaudacion]': {
                click: this.exportarlibrorecaudacion
            },
            'pdfexportarrecaudacion button[action=exportarpdfrecaudacion]': {
                click: this.exportarpdfrecaudacion
            },
            'recaudacionprincipal button[action=Editapago]': {
                click: this.Editapago
            },
            'recaudacionprincipal button[action=actualizar]': {
                click: this.actualizar
            }
           
        });
    },

    actualizar: function(){

        var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Actualizando..."});
        myMask.show();
        Ext.Ajax.request({
            url: preurl + 'recaudacion/actualizar',

            params: {
                id: 1
            },
            success: function(response){

                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {
                    myMask.hide();
                    Ext.Msg.alert('Alerta', 'Actualizacion Exitosa');
                    return;
                    
                }
            }

        });       

    },
    
    Editapago: function(){

        var view = this.getRecaudacionprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var idrecauda = (row.get('id'));                        
            var ticket = (row.get('num_ticket'));
            var idticket = (row.get('id'));
            var preventa = (row.get('id_documento'));
            var idcliente = (row.get('id_cliente'));
            var idcaja = (row.get('id_caja'));
            var nomcaja = (row.get('nom_caja'));
            var comprobante = (row.get('num_comp'));
            var idcajero = (row.get('id_cajero'));
            var nomcajero = (row.get('nom_cajero'));
            var tipo_docu = (row.get('id_tip_docu'));
            var id_vendedor = (row.get('id_vendedor'));
            var id_pago = (row.get('id_pago'));
            var nom_vendedor = (row.get('nom_vendedor'))
            var neto = (row.get('neto'));
            var desc = (row.get('desc'));
            var total = (row.get('total'));
            var afecto = (neto-desc);
            var iva = (total-afecto);
                        
            Ext.Ajax.request({
            url: preurl + 'recaudacion/editarecauda?idrecauda='+idrecauda,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {
                    if(resp.cliente){
                        var view = Ext.create('Infosys_web.view.Pago_caja.Edita_pagos').show();                   
                        var nombre = tipo_docu;
                        view.down("#ticketId").setValue(ticket);
                        view.down("#idticketId").setValue(idticket);
                        view.down("#idId").setValue(idticket);
                        view.down("#netoId").setValue(neto);
                        view.down("#descuentoId").setValue(desc);
                        view.down("#tipoDocumentoId").setValue(tipo_docu);
                        view.down("#docuementoId").setValue(preventa);                        
                        view.down("#ivaId").setValue(iva);                       
                        view.down("#afectoId").setValue(afecto);
                        view.down("#totalId").setValue(total);
                        view.down("#valorpagoId").setValue(total);
                        view.down("#tipocondpagoId").setValue(id_pago);
                        view.down("#recaudaId").setValue(recauda);
                        view.down("#comprobanteId").setValue(comprobante);
                        view.down("#netoaId").setValue(Ext.util.Format.number(neto, '0,000'));
                        view.down("#descuentoaId").setValue(Ext.util.Format.number(desc, '0,000'));
                        view.down("#ivaaId").setValue(Ext.util.Format.number(iva, '0,000'));
                        view.down("#afectoaId").setValue(Ext.util.Format.number(afecto, '0,000'));
                        view.down("#totalaId").setValue(Ext.util.Format.number(total, '0,000'));
                        view.down("#finaltotalUnformat").setValue(total);                        
                        view.down("#cajaId").setValue(idcaja);
                        view.down("#nomcajaId").setValue(nomcaja);
                        view.down("#cajeroId").setValue(idcajero);
                        view.down("#nomcajeroId").setValue(nomcajero);
                        view.down("#contadoId").setValue(contado);
                        view.down("#chequesId").setValue(cheques);
                        view.down("#otrosId").setValue(otros);
                        var cliente = resp.cliente;
                        view.down("#nombre_id").setValue(cliente.nombres);
                        view.down("#id_cliente").setValue(cliente.id);
                        view.down("#tipoCiudadId").setValue(cliente.nombre_ciudad);
                        view.down("#tipoComunaId").setValue(cliente.nombre_comuna);
                        view.down("#giroId").setValue(cliente.giro);
                        view.down("#direccionId").setValue(cliente.direccion);
                        view.down("#rutId").setValue(cliente.rut);
                        view.down("#idVendedorId").setValue(id_vendedor);
                        view.down("#VendedorId").setValue(nom_vendedor);
                                                                   
                    }
                    
                }
            }

        });       

           
                       
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },  

    editarrecaudacion: function(){

        var view = this.getRecaudacionprincipal();
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

    exportarrecaudacionPdf: function(){
        var view = this.getRecaudacionprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            window.open(preurl +'recaudacion/exportRecaudacionPDF/?idrecaudacion=' + row.data.id)
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },


    cerrarrecaudacion: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },
 
    mrecauda: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        var st = this.getRecaudaStore()
        st.load();
        viewport.add({xtype: 'recaudacionprincipal'});
    },

    exportarecauda : function(){

        Ext.create('Infosys_web.view.recaudacion.Exportar');
    },

    exportarlibrorecaudacion : function(){

        Ext.create('Infosys_web.view.recaudacion.ExportarPdf');
    },

    exportarpdfrecaudacion : function(){

        var jsonCol = new Array()
        var i = 0;        
        var view = this.getPdfexportarrecaudacion();
        var grid = this.getRecaudacionprincipal();
        var fecha2 = view.down('#fechaId').getSubmitValue();
        var tipo = view.down('#tipoId').getSubmitValue();
        var concaja = view.down('#cajaId');
        var stCombo = concaja.getStore();
        var caja = stCombo.findRecord('id', concaja.getValue()).data;
        var idcaja = caja.id;
        var nomcaja = caja.nombre;
        var condicion = view.down('#cajeroId');
        var stCombo = condicion.getStore();
        var cajero = stCombo.findRecord('id', condicion.getValue()).data;
        var idcajero = cajero.id;
        var nomcajero = cajero.nombre;

        if (!idcaja){

             Ext.Msg.alert('Alerta', 'Selecciona Caja.');
            return;
            

        };

        if (!idcajero){

             Ext.Msg.alert('Alerta', 'Selecciona Cajero.');
            return;
            

        };

        if (!tipo){

             Ext.Msg.alert('Alerta', 'Selecciona Tipo Informe.');
            return;
            

        };

       
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })
        
        window.open(preurl + 'recaudacion/exportarPdflibroRecauda?cols='+Ext.JSON.encode(jsonCol)+'&idcajero='+idcajero+'&idcaja='+idcaja+'&fecha2='+fecha2+'&tipo='+tipo+'&nomcaja='+nomcaja+'&nomcajero='+nomcajero);

        view.close();
   },

    exportarexcelrecaudacion: function(){


        var jsonCol = new Array()
        var i = 0;        
        var view = this.getExportarrecaudacion();
        var grid = this.getRecaudacionprincipal();
        var fecha2 = view.down('#fechaId').getSubmitValue();
        var tipo = view.down('#tipoId').getSubmitValue();

        var concaja = view.down('#cajaId');
        var stCombo = concaja.getStore();
        var caja = stCombo.findRecord('id', concaja.getValue()).data;
        var idcaja = caja.id;
        var nomcaja = caja.nombre;

        var condicion = view.down('#cajeroId');
        var stCombo = condicion.getStore();
        var cajero = stCombo.findRecord('id', condicion.getValue()).data;
        var idcajero = cajero.id;
        var nomcajero = cajero.nombre;
        
        


        if (!idcaja){

             Ext.Msg.alert('Alerta', 'Selecciona Caja.');
            return;
            

        };

        if (!idcajero){

             Ext.Msg.alert('Alerta', 'Selecciona Cajero.');
            return;
            

        };

        if (!tipo){

             Ext.Msg.alert('Alerta', 'Selecciona Tipo Informe.');
            return;
            

        };

       
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelrecaudacion?cols='+Ext.JSON.encode(jsonCol)+'&idcajero='+idcajero+'&idcaja='+idcaja+'&fecha2='+fecha2+'&tipo='+tipo+'&nomcaja='+nomcaja+'&nomcajero='+nomcajero);

        view.close();
   },

   
    buscarrecaudacion: function(){

        var view = this.getRecaudacionprincipal();
        var st = this.getRecaudaStore()
        var nombre = view.down('#productosId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();

   },

    
  
});










