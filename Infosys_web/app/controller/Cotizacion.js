Ext.define('Infosys_web.controller.Cotizacion', {
    extend: 'Ext.app.Controller',

    stores: ['Cotizaciones', 
             'Clientes',
             'cotizacion.Items',
             'Cotizaeditar',
             'Preventa',
             'Productosf',
             'Vendedores',
             'Contacto_clientes',
             'cotizacion.Selector',
             'Tabladescuento',
             'Tipo_documento.Selector'],

    models: ['Cotizacion', 'cotizacion.Item'],

    views: [
        'cotizaciones.Ingresar',
        'cotizaciones.Editar',
        'cotizaciones.BusquedaCliente',
        'cotizaciones.Principal',
        'cotizaciones.BuscarProductos',
        'cotizaciones.BuscarProductos2',
        'cotizaciones.Desplieguecontactos',
        'cotizaciones.EditarPreventa',
        'cotizaciones.Observaciones',
        'cotizaciones.Observacionespre',
        'cotizaciones.Observaciones2',
        'cotizaciones.CotizacionMail'
    ],

    refs: [{
        ref: 'topmenus',
        selector: 'topmenus'
    },{
        ref: 'cotizacioningresar',
        selector: 'cotizacioningresar'
    },{
        ref: 'busquedacliente',
        selector: 'busquedacliente'
    },{
        ref: 'cotizacionprincipal',
        selector: 'cotizacionprincipal'
    },{
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'buscarproductos',
        selector: 'buscarproductos'
    },{
        ref: 'cotizacioneditar',
        selector: 'cotizacioneditar'
    },{
        ref: 'buscarproductos2',
        selector: 'buscarproductos2'
    },{
        ref: 'desplegarcontactoscotiza',
        selector: 'desplegarcontactoscotiza'
    },{
        ref: 'desplegarcontactoscotiza',
        selector: 'desplegarcontactoscotiza'
    },{
        ref: 'preventaeditarcotiza',
        selector: 'preventaeditarcotiza'
    },{
        ref: 'observacionescotiza',
        selector: 'observacionescotiza'
    },{
        ref: 'observacionescotiza2',
        selector: 'observacionescotiza2'
    },{
        ref: 'observacionescotizapre',
        selector: 'observacionescotizapre'
    },{
        ref: 'cotizacionmail',
        selector: 'cotizacionmail'
    }
    ],

    init: function() {

        this.control({
            'cotizacioningresar #rutId': {
                specialkey: this.special
            },
            'cotizacioningresar button[action=grabar]': {
        		click: this.grabar
        	},
             'cotizacioningresar button[action=wcontacto]': {
                click: this.wcontacto
            },
            'cotizacioneditar button[action=grabar2]': {
                click: this.grabar2
            },
            'cotizacionprincipal button[action=editarcotiza]': {
                click: this.editarcotiza
            },
            'cotizacionprincipal button[action=generaventa]': {
                click: this.generaventa
            },
            'cotizacioningresar button[action=wbuscarcliente]': {
                click: this.wbuscarcliente
            },
            'cotizacioningresar #DescuentoproId': {
                change: this.changedctofinal3
            },
            'cotizacioneditar button[action=buscarproductos2]': {
                click: this.buscarproductos2
            },
            'cotizacioneditar button[action=eliminaritem2]': {
                click: this.eliminaritem2
            },
             'cotizacioneditar #productoId': {
                select: this.selectItem2
            },
            'cotizacioningresar button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'cotizacioningresar button[action=editaritem]': {
                click: this.editaritem
            },
            'busquedacliente button[action=buscaclientes]': {
                click: this.buscaclientes
            },
            'busquedacliente button[action=seleccionarcliente]': {
                click: this.seleccionarcliente
            },
            'cotizacioningresar button[action=agregarItem]': {
                click: this.agregarItem
            },
            'cotizacioningresar #productoId': {
                select: this.selectItem
            },
            'cotizacioningresar button[action=eliminaritem]': {
                click: this.eliminaritem
            },
            'cotizacioneditar button[action=agregarItem2]': {
                click: this.agregarItem2
            },

            'preventaeditarcotiza button[action=agregarItem3]': {
                click: this.agregarItem3
            },
            'cotizacioningresar #finaldescuentoId': {
                change: this.changedctofinal
            },
            'cotizacionprincipal button[action=agregarcotizacion]': {
                click: this.agregarcotizacion
            },
            'cotizacionprincipal button[action=exportarcotizacion]': {
                click: this.exportarcotizacion
            },
            'cotizacionprincipal button[action=Buscar]': {
                click: this.buscarclientes                
            },
            'topmenus menuitem[action=mcotizacion]': {
                click: this.mcotizacion
            },
            'buscarproductos button[action=seleccionarproductos3]': {
                click: this.seleccionarproductos3
            },
            'buscarproductos #nombreId': {
                 specialkey: this.special3
            },
            'cotizacionprincipal button[action=cerrarcotizacion]': {
                click: this.cerrarcerrarcotizacion
            },
            'buscarproductos2 button[action=seleccionarproductos2]': {
                click: this.seleccionarproductos2
            },
            'buscarproductos2 button[action=buscarprocoti]': {
                click: this.buscarp2
            },
            'buscarproductos2 #nombreId': {
                specialkey: this.special2
            },
            'busquedacliente #nombreId': {
                specialkey: this.special6
            },

            'desplegarcontactoscotiza button[action=seleccionarcontactos]': {
                click: this.seleccionarcontactos
            },
            'preventaeditarcotiza button[action=grabarpreventa]': {
                click: this.grabarpreventa
            },
             'preventaeditarcotiza button[action=buscarproductos2]': {
                click: this.buscarproductos2
            },
            'cotizacioningresar button[action=agregarobservaciones]': {
                click: this.agregarobserva
            },
            'cotizacioningresar #tipocondpagoId': {
                select: this.condicionpago
            },
            'cotizacioneditar #tipocondpagoId': {
                select: this.condicionpago2
            },
            'preventaeditarcotiza button[action=agregarobservaciones]': {
                click: this.agregarobservapre
            },
            'observacionescotiza button[action=ingresaobs]': {
                click: this.ingresaobs
            },
            'observacionescotizapre button[action=ingresaobspre]': {
                click: this.ingresaobspre
            },
            'cotizacioneditar button[action=agregarobservaciones2]': {
                click: this.agregarobserva2
            },
            'observacionescotiza2 button[action=ingresaobs2]': {
                click: this.ingresaobs2
            },
            'cotizacioningresar #codigoId': {
                specialkey: this.special4
            },
            'cotizacioneditar #codigoId': {
                specialkey: this.special5
            },
            'desplegarcontactoscotiza #codigoId': {
                specialkey: this.special7
            },
            'cotizacioneditar button[action=editaritem2]': {
                click: this.editaritem2
            },
            'cotizacioningresar #tipoDescuentoId': {
                change: this.changedctofinal5
            },
            'cotizacioningresar #tipoDescuentoId': {
                change: this.changedctofinal7
            },
            'cotizacioneditar #DescuentoproId': {
                change: this.changedctofinal6
            },
            'cotizacionprincipal button[action=enviaremail]': {
                click: this.enviaremail
            },
            'cotizacionmail button[action=cotizacionemail]': {
                click: this.cotizacionemail
            }
        });
    },

    cotizacionemail : function(){
        
        var view =this.getCotizacionmail();
        var email = view.down('#email').getValue();
        var mensaje = view.down('#mensaje').getValue();
        var idcotiza = view.down('#idCotizaId').getValue();
       
        form   = view.down('form');
        if(!form.getForm().isValid()){
            Ext.Msg.alert('Informacion', 'Rellene todos los campos correctamente');
            return false
        }else{
          var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Enviado mail..."});
          myMask.show();
          Ext.Ajax.request({
             url: preurl + 'cotizaciones/enviarMail',
                  params: {
                      email: email,
                      idcotiza : idcotiza,
                      mensaje : mensaje
                  },
             success: function(response, opts) {             
                myMask.hide();
                Ext.Msg.alert('Informacion', 'El correo ha sido enviado exitosamente');
                view.close();             
                
             },
             failure: function(response, opts) {
                myMask.hide();
                console.log('server-side failure with status code ' + response.status);
             }
          });  

        }       
    },

    enviaremail: function(){

        var view = this.getCotizacionprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var idcotiza = row.data.id;
            var email = row.data.email_contacto;
            edit =   Ext.create('Infosys_web.view.cotizaciones.CotizacionMail').show();
            edit.down('#idCotizaId').setValue(idcotiza);
            edit.down('#email').setValue(email);
            edit.down("#mensaje").focus();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }   
      },

    changedctofinal5: function(){
        this.recalculardescuento();
    },

    changedctofinal6: function(){
        this.recalculardescuentopro2();
    },
    changedctofinal7: function(){
        this.recalculardescuento2();
    },

    recalculardescuento2: function(){

        var view = this.getCotizacioneditar();
        var pretotal = view.down('#finalafectoId').getValue();
        var total = view.down('#finaltotalpostId').getValue();
        var iva = view.down('#finaltotalivaId').getValue();
        var neto = view.down('#finaltotalnetoId').getValue();
        var descuento = view.down('#tipoDescuentoId');
        var stCombo = descuento.getStore();
        var record = stCombo.findRecord('id', descuento.getValue()).data;
        var dcto = (record.porcentaje);
       
        afecto = (Math.round(total / 1.19));
        descuentopesos = (Math.round(neto * dcto) / 100);
        afecto = neto - descuentopesos;
        pretotal = (Math.round((afecto * 19) / 100) + afecto);
        iva = (pretotal - afecto);
        afecto = afecto;
        neto = neto;
        pretotalfinal = afecto + iva;


        view.down('#finaltotalId').setValue(Ext.util.Format.number(pretotalfinal, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(pretotalfinal, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));
        view.down('#descuentovalorId').setValue(Ext.util.Format.number(descuentopesos, '0'));
    },

    recalculardescuento: function(){

        var view = this.getCotizacioningresar();
        var pretotal = view.down('#finalafectoId').getValue();
        var total = view.down('#finaltotalpostId').getValue();
        var iva = view.down('#finaltotalivaId').getValue();
        var neto = view.down('#finaltotalnetoId').getValue();
        var descuento = view.down('#tipoDescuentoId');
        var stCombo = descuento.getStore();
        var record = stCombo.findRecord('id', descuento.getValue()).data;
        var dcto = (record.porcentaje);
       
        afecto = (Math.round(total / 1.19));
        descuentopesos = (Math.round(neto * dcto) / 100);
        afecto = neto - descuentopesos;
        pretotal = (Math.round((afecto * 19) / 100) + afecto);
        iva = (pretotal - afecto);
        afecto = afecto;
        neto = neto;
        pretotalfinal = afecto + iva;


        view.down('#finaltotalId').setValue(Ext.util.Format.number(pretotalfinal, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(pretotalfinal, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));
        view.down('#descuentovalorId').setValue(Ext.util.Format.number(descuentopesos, '0'));
    },

    changedctofinal3: function(){
        this.recalculardescuentopro();
    },

    recalculardescuentopro: function(){

        var view = this.getCotizacioningresar();
        var precio = view.down('#precioId').getValue();
        var cantidad = view.down('#cantidadId').getValue();
        var total = ((precio * cantidad));
        var desc = view.down('#DescuentoproId').getValue();
        if (desc){
        var descuento = view.down('#DescuentoproId');
        var stCombo = descuento.getStore();
        var record = stCombo.findRecord('id', descuento.getValue()).data;
        var dcto = (record.porcentaje);
        totaldescuento = (Math.round((total * dcto)  / 100));
        view.down('#totdescuentoId').setValue(totaldescuento);
        };    
    },

    recalculardescuentopro2: function(){

        var view = this.getCotizacioneditar();
        var precio = view.down('#precioId').getValue();
        var cantidad = view.down('#cantidadId').getValue();
        var total = ((precio * cantidad));
        var desc = view.down('#DescuentoproId').getValue();
        if (desc){
        var descuento = view.down('#DescuentoproId');
        var stCombo = descuento.getStore();
        var record = stCombo.findRecord('id', descuento.getValue()).data;
        var dcto = (record.porcentaje);
        totaldescuento = (Math.round((total * dcto)  / 100));
        view.down('#totdescuentoId').setValue(totaldescuento);
        };    
    },

    condicionpago: function(){

        var viewIngresa = this.getCotizacioningresar();
        var idpago = viewIngresa.down('#tipocondpagoId').getValue();
        var bolEnable = false;
        var bolDisabel = true;
         
        if (idpago == 1){
            viewIngresa.down('#DescuentoproId').setDisabled(bolEnable);
            viewIngresa.down('#tipoDescuentoId').setDisabled(bolEnable);
            viewIngresa.down('#descuentovalorId').setDisabled(bolEnable);
                
        };
        if (idpago == 6){

             viewIngresa.down('#DescuentoproId').setDisabled(bolEnable);
             viewIngresa.down('#tipoDescuentoId').setDisabled(bolEnable);
             viewIngresa.down('#descuentovalorId').setDisabled(bolEnable);
            
        };
        if (idpago == 7){

             viewIngresa.down('#DescuentoproId').setDisabled(bolEnable);
             viewIngresa.down('#tipoDescuentoId').setDisabled(bolEnable);
             viewIngresa.down('#descuentovalorId').setDisabled(bolEnable);
            
        };
        if (idpago == 2){

             viewIngresa.down('#DescuentoproId').setDisabled(bolDisabel);
             viewIngresa.down('#tipoDescuentoId').setDisabled(bolDisabel);
             viewIngresa.down('#descuentovalorId').setDisabled(bolDisabel);
            
        };
        if (idpago == 3){

             viewIngresa.down('#DescuentoproId').setDisabled(bolDisabel);
             viewIngresa.down('#tipoDescuentoId').setDisabled(bolDisabel);
             viewIngresa.down('#descuentovalorId').setDisabled(bolDisabel);
            
        };
        if (idpago == 4){

             viewIngresa.down('#DescuentoproId').setDisabled(bolDisabel);
             viewIngresa.down('#tipoDescuentoId').setDisabled(bolDisabel);
             viewIngresa.down('#descuentovalorId').setDisabled(bolDisabel);
            
        };
        if (idpago == 5){

             viewIngresa.down('#DescuentoproId').setDisabled(bolDisabel);
             viewIngresa.down('#tipoDescuentoId').setDisabled(bolDisabel);
             viewIngresa.down('#descuentovalorId').setDisabled(bolDisabel);
            
        };
    },

    condicionpago2: function(){

        var viewIngresa = this.getCotizacioneditar();
        var idpago = viewIngresa.down('#tipocondpagoId').getValue();
        var bolEnable = false;
        var bolDisabel = true;
         
        if (idpago == 1){
            viewIngresa.down('#DescuentoproId').setDisabled(bolEnable);
            viewIngresa.down('#tipoDescuentoId').setDisabled(bolEnable);
            viewIngresa.down('#descuentovalorId').setDisabled(bolEnable);
                
        };
        if (idpago == 6){

             viewIngresa.down('#DescuentoproId').setDisabled(bolEnable);
             viewIngresa.down('#tipoDescuentoId').setDisabled(bolEnable);
             viewIngresa.down('#descuentovalorId').setDisabled(bolEnable);
            
        };
        if (idpago == 7){

             viewIngresa.down('#DescuentoproId').setDisabled(bolEnable);
             viewIngresa.down('#tipoDescuentoId').setDisabled(bolEnable);
             viewIngresa.down('#descuentovalorId').setDisabled(bolEnable);
            
        };
        if (idpago == 2){

             viewIngresa.down('#DescuentoproId').setDisabled(bolDisabel);
             viewIngresa.down('#tipoDescuentoId').setDisabled(bolDisabel);
             viewIngresa.down('#descuentovalorId').setDisabled(bolDisabel);
            
        };
        if (idpago == 3){

             viewIngresa.down('#DescuentoproId').setDisabled(bolDisabel);
             viewIngresa.down('#tipoDescuentoId').setDisabled(bolDisabel);
             viewIngresa.down('#descuentovalorId').setDisabled(bolDisabel);
            
        };
        if (idpago == 4){

             viewIngresa.down('#DescuentoproId').setDisabled(bolDisabel);
             viewIngresa.down('#tipoDescuentoId').setDisabled(bolDisabel);
             viewIngresa.down('#descuentovalorId').setDisabled(bolDisabel);
            
        };
        if (idpago == 5){

             viewIngresa.down('#DescuentoproId').setDisabled(bolDisabel);
             viewIngresa.down('#tipoDescuentoId').setDisabled(bolDisabel);
             viewIngresa.down('#descuentovalorId').setDisabled(bolDisabel);
            
        };
    },

    editaritem2: function() {
        var view = this.getCotizacioneditar();
        var grid  = view.down('#itemsgridId');
        var total = view.down('#finaltotalpostId').getValue();
        var neto = view.down('#finaltotalnetoId').getValue();
        var iva = view.down('#finaltotalivaId').getValue();
        var afecto = view.down('#finalafectoId').getValue();
        var descuento = view.down('#descuentovalorId').getValue();
        var idpago = view.down('#tipocondpagoId').getValue();
        var bolEnable = false;
        var cero = 0;
        if (idpago == 1){
            view.down('#DescuentoproId').setDisabled(bolEnable);
            view.down('#tipoDescuentoId').setDisabled(bolEnable);
            view.down('#descuentovalorId').setDisabled(bolEnable);
                
        };
        if (idpago == 6){
             view.down('#DescuentoproId').setDisabled(bolEnable);
             view.down('#tipoDescuentoId').setDisabled(bolEnable);
             view.down('#descuentovalorId').setDisabled(bolEnable);            
        };
        if (idpago == 7){
             view.down('#DescuentoproId').setDisabled(bolEnable);
             view.down('#tipoDescuentoId').setDisabled(bolEnable);
             view.down('#descuentovalorId').setDisabled(bolEnable);            
        };

        var cero = "";
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            var id_producto = row.data.id_producto;
            var totalnue = total - (row.data.total);
            var ivanue = iva - (row.data.iva);
            var afectonue = afecto - (row.data.neto);
            var netonue = neto - (row.data.neto);

            Ext.Ajax.request({
            url: preurl + 'productos/buscarp?nombre='+id_producto,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) { 
                    if(resp.cliente){
                        var cliente = resp.cliente;
                        view.down('#precioId').setValue(cliente.p_venta);
                        view.down('#productoId').setValue(row.data.id_producto);
                        view.down('#nombreproductoId').setValue(row.data.nombre);
                        view.down('#codigoId').setValue(cliente.codigo);
                        view.down('#cantidadOriginalId').setValue(cliente.stock);
                        view.down('#cantidadId').setValue(row.data.cantidad);
                        view.down('#totdescuentoId').setValue(row.data.dcto);
                        if ((row.data.id_descuento)==0){
                            view.down('#DescuentoproId').setValue(cero);
                        }else{
                            view.down('#DescuentoproId').setValue(row.data.id_descuento);
                        }
                        
                        view.down('#finaltotalId').setValue(Ext.util.Format.number(totalnue, '0,000'));
                        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(totalnue, '0'));
                        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(netonue, '0'));
                        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(ivanue, '0'));
                        view.down('#finalafectoId').setValue(Ext.util.Format.number(afectonue, '0'));
                        view.down('#descuentovalorId').setValue(Ext.util.Format.number(cero));

                             
                    }
                }
            }

        });       
        grid.getStore().remove(row);
        //this.recalcularFinal2();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
              
    },

    editaritem: function() {

        var view = this.getCotizacioningresar();
        var grid  = view.down('#itemsgridId');
        var cero = "";
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            var id_producto = row.data.id_producto;            
            Ext.Ajax.request({
            url: preurl + 'productos/buscarp?nombre='+id_producto,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) { 
                    if(resp.cliente){
                        var cliente = resp.cliente;
                        view.down('#precioId').setValue(cliente.p_venta);
                        view.down('#productoId').setValue(row.data.id_producto);
                        view.down('#nombreproductoId').setValue(row.data.nombre);
                        view.down('#codigoId').setValue(cliente.codigo);
                        view.down('#cantidadOriginalId').setValue(cliente.stock);
                        view.down('#cantidadId').setValue(row.data.cantidad);
                        view.down('#totdescuentoId').setValue(row.data.dcto);
                        if ((row.data.id_descuento)==0){
                            view.down('#DescuentoproId').setValue(cero);
                        }else{
                            view.down('#DescuentoproId').setValue(row.data.id_descuento);
                        }       
                    }
                }
            }

        });
        grid.getStore().remove(row);
        this.recalcularFinal();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    special4 : function(f,e){
        if (e.getKey() == e.ENTER) {
            this.buscacodigo()
        }
    },

    special5 : function(f,e){
        if (e.getKey() == e.ENTER) {
            this.buscacodigo2()
        }
    },

    special6 : function(f,e){
        if (e.getKey() == e.ENTER) {
            this.buscaclientes()
        }
    },
    special7 : function(f,e){
        if (e.getKey() == e.ENTER) {
            this.buscar()
        }
    },

    buscacodigo2 : function() {

        var viewIngresa = this.getCotizacioneditar();
        var codigo = viewIngresa.down('#codigoId').getValue();
        var cero = " ";
        var cero1= 0;
        var cero2= 1;

        Ext.Ajax.request({
            url: preurl + 'productos/buscacodigo',
            params: {
                codigo: codigo
            },
            success: function(response){
                 var resp = Ext.JSON.decode(response.responseText);
                 if (resp.success == true){
                     var cliente= resp.cliente;
                     viewIngresa.down('#productoId').setValue(cliente.id);
                     viewIngresa.down('#nombreproductoId').setValue(cliente.nombre);
                     viewIngresa.down('#codigoId').setValue(cliente.codigo);
                     viewIngresa.down('#precioId').setValue(cliente.p_venta);
                     viewIngresa.down('#cantidadOriginalId').setValue(cliente.stock);
                     viewIngresa.down("#cantidadId").focus();
                 }else{

                    Ext.Msg.alert('Alerta', 'Codigo producto no existe');
                    viewIngresa.down('#codigoId').setValue(cero);
                    viewIngresa.down('#productoId').setValue(cero);
                    viewIngresa.down('#nombreproductoId').setValue(cero);
                    viewIngresa.down('#cantidadId').setValue(cero2);
                    viewIngresa.down('#descuentoId').setValue(cero1);
                    viewIngresa.down('#precioId').setValue(cero1);
                    viewIngresa.down('#cantidadOriginalId').setValue(cero1);
                    return;
                }
                               
            }
           
        });        
    },

    buscacodigo : function() {

        var viewIngresa = this.getCotizacioningresar();
        var codigo = viewIngresa.down('#codigoId').getValue();
        var cero = " ";
        var cero1= 0;
        var cero2= 1;

        Ext.Ajax.request({
            url: preurl + 'productos/buscacodigo',
            params: {
                codigo: codigo
            },
            success: function(response){
                 var resp = Ext.JSON.decode(response.responseText);
                 if (resp.success == true){
                     var cliente= resp.cliente;
                     viewIngresa.down('#productoId').setValue(cliente.id);
                     viewIngresa.down('#nombreproductoId').setValue(cliente.nombre);
                     viewIngresa.down('#codigoId').setValue(cliente.codigo);
                     viewIngresa.down('#precioId').setValue(cliente.p_venta);
                     viewIngresa.down('#cantidadOriginalId').setValue(cliente.stock);
                     viewIngresa.down("#cantidadId").focus();
                 }else{

                    Ext.Msg.alert('Alerta', 'Codigo producto no existe');
                    viewIngresa.down('#codigoId').setValue(cero);
                    viewIngresa.down('#productoId').setValue(cero);
                    viewIngresa.down('#nombreproductoId').setValue(cero);
                    viewIngresa.down('#cantidadId').setValue(cero2);
                    viewIngresa.down('#descuentoId').setValue(cero1);
                    viewIngresa.down('#precioId').setValue(cero1);
                    viewIngresa.down('#cantidadOriginalId').setValue(cero1);
                    return;
                }
                               
            }
           
        });        
    },

    ingresaobspre: function(){
        var viewIngresa = this.getObservacionescotizapre();
        var view = this.getPreventaeditarcotiza();
        var observa = viewIngresa.down('#observaId').getValue();
        if (observa){
             view.down('#observacionesId').setValue(observa);
        };
        viewIngresa.close();
    },

    agregarobservapre: function(){

         var viewIngresa = this.getPreventaeditarcotiza();
         var observa = viewIngresa.down('#observacionesId').getValue();        
         Ext.create('Infosys_web.view.cotizaciones.Observacionespre').show();
         var view = this.getObservacionescotizapre();
         if (!observa){             
             observa= "";
         };
         view.down('#observaId').setValue(observa);
        
    },

    ingresaobs: function(){
        var viewIngresa = this.getObservacionescotiza();
        var view = this.getCotizacioningresar();
        var observa = viewIngresa.down('#observaId').getValue();
        if (observa){
             view.down('#observacionesId').setValue(observa);
        };
        viewIngresa.close();
    },

    ingresaobs2: function(){
        var viewIngresa = this.getObservacionescotiza2();
        var view = this.getCotizacioneditar();
        var observa = viewIngresa.down('#observaId').getValue();
        if (observa){
             view.down('#observacionesId').setValue(observa);
        };
        viewIngresa.close();
    },

    agregarobserva2: function(){

         var viewIngresa = this.getCotizacioneditar();
         var observa = viewIngresa.down('#observacionesId').getValue();        
         Ext.create('Infosys_web.view.cotizaciones.Observaciones2').show();
         var view = this.getObservacionescotiza2();
         if (!observa){             
             observa= "";
         };
         view.down('#observaId').setValue(observa);
        
    },

    agregarobserva: function(){

         var viewIngresa = this.getCotizacioningresar();
         var observa = viewIngresa.down('#observacionesId').getValue();        
         Ext.create('Infosys_web.view.cotizaciones.Observaciones').show();
         var view = this.getObservacionescotiza();
         if (!observa){             
             observa= "";
         };
         view.down('#observaId').setValue(observa);
        
    },

    special: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.buscar()
        }
    },    

    special2 : function(f,e){
        if (e.getKey() == e.ENTER) {
            this.buscarp2()
        }
    },    

    grabarpreventa: function(){

        var viewIngresa = this.getPreventaeditarcotiza();
        var numeroticket = viewIngresa.down('#ticketId').getValue();
        var idtipo = viewIngresa.down('#tipoDocumento2Id').getValue();
        var idpago = viewIngresa.down('#tipocondpagoId').getValue();
        var idcliente = viewIngresa.down('#id_cliente').getValue();
        var vendedor = viewIngresa.down('#tipoVendedorId').getValue();
        var observa = viewIngresa.down('#observacionesId').getValue();
        
        if(!idpago){
            Ext.Msg.alert('Ingrese Condicion Venta');
            return;   
        }

        if(!vendedor){
            Ext.Msg.alert('Ingrese Datos del Vendedor');
            return;   
        }
        var finalafectoId = viewIngresa.down('#finalafectoId').getValue();
        var fechapreventa = viewIngresa.down('#fechaventaId').getSubmitValue();
        var stItem = this.getCotizaeditarStore();
        var stPreventa = this.getPreventaStore();
        
        if(!idtipo){
            Ext.Msg.alert('Ingrese Tipo de Documento');
            return;   
        }     
        if(finalafectoId==0){
            Ext.Msg.alert('Ingrese Productos a la Venta');
            return;   
        }        
        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'preventa/save3',
            params: {
                idcliente: idcliente,
                items: Ext.JSON.encode(dataItems),
                vendedor: vendedor,
                observa: observa,
                idtipo: idtipo,
                idpago: idpago,
                numeroticket: numeroticket,
                fechapreventa: fechapreventa,
                descuento: viewIngresa.down('#descuentovalorId').getValue(),
                neto: viewIngresa.down('#finalafectoId').getValue(),
                iva: viewIngresa.down('#finaltotalivaId').getValue(),
                afecto: viewIngresa.down('#finalafectoId').getValue(),
                total: viewIngresa.down('#finaltotalpostId').getValue()
            },
             success: function(response){
                 var resp = Ext.JSON.decode(response.responseText);
                 var idpreventa= resp.idpreventa;
                 viewIngresa.close();
                 stPreventa.load();
                 window.open(preurl + 'preventa/exportPDF/?idpreventa='+idpreventa);
               
            }
           
        });
       
    },

    generaventa: function(){

        var stItms = Ext.getStore('Cotizaeditar');
        stItms.removeAll();
        var view = this.getCotizacionprincipal();       
                   
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var stItem = this.getCotizaeditarStore();
            var viewIngresa = this.getPreventaeditarcotiza();       
            var idcotiza = row.data.id;
            var id_cliente = row.data.id_cliente;
            var neto = (row.data.neto);
            var iva = (row.data.iva);
            var total = (row.data.total);
            var cero = 0;
            stItem.proxy.extraParams = {idcotiza : idcotiza};
            stItem.load();           
           
            Ext.Ajax.request({
            url: preurl +'preventa/editapreventa/?idcotiza=' + row.data.id,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {

                    var view = Ext.create('Infosys_web.view.cotizaciones.EditarPreventa').show();                   
                    view.down("#ticketId").setValue(resp.correlanue); 
                    var cliente = resp.cliente;
                    view.down('#nombre_id').setValue(cliente.nombres);                    
                    view.down('#id_cliente').setValue(id_cliente);
                    view.down('#rutId').setValue(cliente.rut);
                    view.down('#direccionId').setValue(cliente.direccion);
                    view.down('#giroId').setValue(cliente.nombre_giro);
                    view.down('#tipocondpagoId').setValue(cliente.id_pago);                   
                    view.down('#tipoVendedorId').setValue(cliente.id_vendedor);
                    var total = (cliente.total);
                    var neto = (cliente.neto);
                    var iva = (cliente.total - cliente.neto);
                    view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));
                    view.down('#finaltotalpostId').setValue(Ext.util.Format.number(total, '0'));
                    view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
                    view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
                    view.down('#finalafectoId').setValue(Ext.util.Format.number(neto, '0'));
                    view.down('#descuentovalorId').setValue(Ext.util.Format.number(cliente.desc, '0'));
                    view.down('#observacionesId').setValue(cliente.observaciones);
                    var bolEnable = false;
                    if (cliente.id_pago == 1){
                        view.down('#DescuentoproId').setDisabled(bolEnable);
                        view.down('#tipoDescuentoId').setDisabled(bolEnable);
                        view.down('#descuentovalorId').setDisabled(bolEnable);
                            
                    };
                    if (cliente.id_pago == 6){

                         view.down('#DescuentoproId').setDisabled(bolEnable);
                         view.down('#tipoDescuentoId').setDisabled(bolEnable);
                         view.down('#descuentovalorId').setDisabled(bolEnable);
                        
                    };
                    if (cliente.id_pago == 7){

                         view.down('#DescuentoproId').setDisabled(bolEnable);
                         view.down('#tipoDescuentoId').setDisabled(bolEnable);
                         view.down('#descuentovalorId').setDisabled(bolEnable);
                        
                    };
                      
                }
            }
            
        });

        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }        
    },

    seleccionarcontactos: function(){

        var view = this.getDesplegarcontactoscotiza();
        var viewIngresa = this.getCotizacioningresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#idcontacto').setValue(row.data.id);
            viewIngresa.down('#nombre_contactoId').setValue(row.data.nombre);
            viewIngresa.down('#fono_contactoId').setValue(row.data.fono);
            viewIngresa.down('#mail_contactoId').setValue(row.data.email);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }       
       
    },


    wcontacto: function(){
        
        var view = this.getCotizacioningresar();
        var nombre = view.down('#idcliente').getValue()
        
        if (nombre){

            var edit = Ext.create('Infosys_web.view.cotizaciones.Desplieguecontactos').show();
            var st = this.getContacto_clientesStore();
            st.proxy.extraParams = {nombre : nombre};
            edit.down("#nombreId").focus();
            st.load();

            
        }else{          
            

            Ext.Msg.alert('Alerta', 'Selecciona Cliente.');
            return;           

        }
        
    },

    special3: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.buscarp()
        }
    },

    buscarp: function(){
        var view = this.getBuscarproductos();
        var st = this.getProductosfStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    buscarp2: function(){
        var view = this.getBuscarproductos2();
        var st = this.getProductosfStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    buscarclientes: function(){
        
        var view = this.getCotizacionprincipal()
        var st = this.getCotizacionesStore()
        var cero = "";
        var opcion = view.down('#tipoSeleccionId').getValue()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
        st.load();
        view.down('#nombreId').setValue(cero);
    },

    buscar: function(){

        var view = this.getCotizacioningresar();
        var rut = view.down('#rutId').getValue();
        var numero = rut.length;
        var cero = "";
        
        if(numero==0){
            var edit = Ext.create('Infosys_web.view.cotizaciones.BuscarClientes');
        }else{
       
         if(numero>9){            
            Ext.Msg.alert('Rut Erroneo Ingrese Sin Puntos');
            return;            
        }else{
            if(numero>13){
            Ext.Msg.alert('Rut Erroneo Ingrese Sin Puntos');
            return;   
            }
        }
        

        Ext.Ajax.request({
            url: preurl + 'clientes/validaRut?valida='+rut,
            params: {
                id: 1,
                tipo: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                
                if (resp.success == true) {                    
                    if(resp.cliente){
                        var cliente = resp.cliente;
                        var cliente = resp.cliente;
                        view.down("#idcliente").setValue(cliente.id)
                        view.down("#nombreId").setValue(cliente.nombres)
                        view.down("#tipoVendedorId").setValue(cliente.id_vendedor)
                        view.down("#giroId").setValue(cliente.id_giro)
                        view.down("#nom_giroId").setValue(cliente.giro)
                        view.down("#direccionId").setValue(cliente.direccion)    
                        view.down("#rutId").setValue(rut)
                        view.down("#fono_contactoId").setValue(cliente.fono)                        
                        view.down("#tipocondpagoId").setValue(cliente.id_pago)
                        view.down("#nombre_contactoId").setValue(cliente.nombre_contacto)
                        view.down("#fono_contactoId").setValue(cliente.fono_contacto)
                        view.down("#mail_contactoId").setValue(cliente.e_mail_contacto)
                                                
                        view.down("#buscarproc").focus()  
                        var bolEnable = true;
                        if (cliente.id_pago == 1){
                            view.down('#DescuentoproId').setDisabled(bolEnable);
                            view.down('#tipoDescuentoId').setDisabled(bolEnable);
                            view.down('#descuentovalorId').setDisabled(bolEnable);
                                
                        };
                        if (cliente.id_pago == 2){
                            view.down('#DescuentoproId').setDisabled(bolEnable);
                            view.down('#tipoDescuentoId').setDisabled(bolEnable);
                            view.down('#descuentovalorId').setDisabled(bolEnable);
                                
                        };
                        if (cliente.id_pago == 4){
                            view.down('#DescuentoproId').setDisabled(bolEnable);
                            view.down('#tipoDescuentoId').setDisabled(bolEnable);
                            view.down('#descuentovalorId').setDisabled(bolEnable);
                                
                        };
                        if (cliente.id_pago == 6){

                             view.down('#DescuentoproId').setDisabled(bolEnable);
                             view.down('#tipoDescuentoId').setDisabled(bolEnable);
                             view.down('#descuentovalorId').setDisabled(bolEnable);
                            
                        };
                        if (cliente.id_pago == 7){

                             view.down('#DescuentoproId').setDisabled(bolEnable);
                             view.down('#tipoDescuentoId').setDisabled(bolEnable);
                             view.down('#descuentovalorId').setDisabled(bolEnable);
                            
                        };                      
                    }else{
                        var viewedit = Ext.create('Infosys_web.view.clientes.Ingresar').show();                        
                        viewedit.down("#rutId").setValue(rut);                         
                    }
                    
                }else{
                      Ext.Msg.alert('Informacion', 'Rut Incorrecto');
                      view.down("#rutId").setValue(cero);
                      return;
                      
                }
            }

        }); 
        
        }
        
       
    },

    seleccionarproductos2: function(){

        var view = this.getBuscarproductos2();
        var viewIngresa = this.getCotizacioneditar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#productoId').setValue(row.data.id);
            viewIngresa.down('#nombreproductoId').setValue(row.data.nombre);
            viewIngresa.down('#codigoId').setValue(row.data.codigo);
            viewIngresa.down('#precioId').setValue(row.data.p_venta);
            viewIngresa.down('#cantidadOriginalId').setValue(row.data.stock);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

        viewIngresa.down("#cantidadId").focus();
    },

    selectItem2: function() {

        var view = this.getCotizacioneditar();
        var producto = view.down('#productoId');
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;        
        view.down('#precioId').setValue(record.p_venta);
        //view.down('#codigoId').setValue(record.codigo);
        view.down('#cantidadOriginalId').setValue(record.stock);
          
    },

    buscarproductos2: function(){

        var view = Ext.create('Infosys_web.view.cotizaciones.BuscarProductos2').show();
        view.down("#nombreId").focus();
    },

    eliminaritem2: function() {
        var view = this.getCotizacioneditar();
        var grid  = view.down('#itemsgridId');
        var totalnue = view.down('#finaltotalpostId').getValue();
        var netonue = view.down('#finaltotalnetoId').getValue();
        var ivanue = view.down('#finaltotalivaId').getValue();
        var afectonue = view.down('#finalafectoId').getValue();
        var descuentonue = view.down('#descuentovalorId').getValue();
        cero1 = "";
        cero = 0;
        var grid  = view.down('#itemsgridId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            var totalnue = totalnue - (row.data.total);
           
            if (totalnue == 0){
                Ext.Msg.alert('Alerta', 'No puede Eliminar Ultimo Registro');
                return;                
            }else{
                var ivanue = ivanue - (row.data.iva);
                var afectonue = afectonue - (row.data.neto);
                var netonue = netonue - (row.data.neto);
                grid.getStore().remove(row);
            };
            view.down('#DescuentoproId').setValue(cero1);
            view.down('#finaltotalId').setValue(Ext.util.Format.number(totalnue, '0,000'));
            view.down('#finaltotalpostId').setValue(Ext.util.Format.number(totalnue, '0'));
            view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(netonue, '0'));
            view.down('#finaltotalivaId').setValue(Ext.util.Format.number(ivanue, '0'));
            view.down('#finalafectoId').setValue(Ext.util.Format.number(afectonue, '0'));
            view.down('#descuentovalorId').setValue(Ext.util.Format.number(cero));

        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
      
    },

    agregarItem3: function() {

        var view = this.getPreventaeditarcotiza();
        var rut = view.down('#rutId').getValue();
        var nueneto = view.down('#finaltotalnetoId').getValue();
        var nueiva =  view.down('#finaltotalivaId').getValue();
        var nuetotal = view.down('#finaltotalpostId').getValue();
        var nuedesc = view.down('#finaldescuentoId').getValue();
        var stItem = this.getCotizaeditarStore();
        var producto = view.down('#productoId').getValue();
        var nombre = view.down('#nombreproductoId').getValue();
        var cantidad = view.down('#cantidadId').getValue();
        var codigo = view.down('#codigoId').getValue();
        var cantidadori = view.down('#cantidadOriginalId').getValue();
        var precio = ((view.down('#precioId').getValue()));
        var precioun = (Math.round(view.down('#precioId').getValue())/ 1.19);
        var descuento = view.down('#totdescuentoId').getValue(); 
        var iddescuento = view.down('#DescuentoproId').getValue();
        var bolEnable = true;
        
        if (descuento == 1){            
            var descuento = 0;
            var iddescuento = 0;
        };

        if (descuento > 0){            
            view.down('#tipoDescuentoId').setDisabled(bolEnable);
            view.down('#descuentovalorId').setDisabled(bolEnable);
        };
        var tot = ((cantidad * precio) - descuento);
        var neto = (tot / 1.19);
        var exists = 0;
        var iva = (tot - neto);
        var total = (Math.round(neto + iva ));
                     
        if(!producto){
           Ext.Msg.alert('Alerta', 'Debe Seleccionar un Producto');
        }

        if(precio==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Precio Producto');
            return false;
        }

        if(cantidad>cantidadori){
            Ext.Msg.alert('Alerta', 'Cantidad Ingresada de Productos Supera El Stock');
            return false;
        }

        if(cantidad==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Cantidad.');
            return false;
        }
        
        if(rut.length==0 ){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Datos a la Factura.');
            return false;
        }

        stItem.each(function(r){
            if(r.data.id_producto == producto){
                Ext.Msg.alert('Alerta', 'El registro ya existe.');
                exists = 1;
                cero="";
                cero1=0;
                cero2=1;
                view.down('#codigoId').setValue(cero);
                view.down('#productoId').setValue(cero);
                view.down('#nombreproductoId').setValue(cero);
                view.down('#cantidadId').setValue(cero2);
                view.down('#precioId').setValue(cero);
                view.down('#cantidadOriginalId').setValue(cero);
                view.down('#totdescuentoId').setValue(cero1);
                view.down('#DescuentoproId').setValue(cero);
                return; 
            }
        });

        if(exists == 1)
            return;
      
        stItem.add(new Infosys_web.model.cotizacion.Item({
            id: producto,
            id_producto: producto,
            id_descuento: iddescuento,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
            neto: neto,
            totaliva: totaliva,
            iva: iva,
            dcto: descuento
           
        }));

        var nueneto = (nueneto + neto);
        var nueiva = (nueiva + iva);
        var nuetotal = (nuetotal + total);
        var nuedesc = (nuedesc + desc);
        var nueafecto = (nueneto + nuedesc);
                

        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(nueneto, '0'));
        view.down('#verfinaltotalnetoId').setValue(Ext.util.Format.number(nueneto, '0,000'));


        view.down('#finaldescuentoId').setValue(Ext.util.Format.number(nuedesc, '0'));

        view.down('#finalafectoId').setValue(Ext.util.Format.number(nueafecto, '0'));
        view.down('#verfinalafectoId').setValue(Ext.util.Format.number(nueafecto, '0,000'));

        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(nueiva, '0'));
        view.down('#verfinaltotalivaId').setValue(Ext.util.Format.number(nueiva, '0,000'));        

        view.down('#finaltotalId').setValue(Ext.util.Format.number(nuetotal, '0,000'));  
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(nuetotal, '0'));  

        view.down('#productoId').setValue(cero);
        view.down('#nombreproductoId').setValue(cero);
        view.down('#cantidadId').setValue(cero2);
        view.down('#descuentoId').setValue(cero1);
        view.down('#precioId').setValue(cero1);
        view.down('#cantidadOriginalId').setValue(cero1);
    },

    agregarItem2: function() {

        var view = this.getCotizacioneditar();
        var stItem = this.getCotizaeditarStore();        
        var nombre = view.down('#nombreproductoId').getValue();
        var rut = view.down('#rutId').getValue();
        var cantidad = view.down('#cantidadId').getValue();
        var cantidadori = view.down('#cantidadOriginalId').getValue();
        var codigo = view.down('#codigoId').getValue();
        var precio = ((view.down('#precioId').getValue()));
        var precioun = (Math.round(view.down('#precioId').getValue())/ 1.19);
        var descuento = view.down('#totdescuentoId').getValue(); 
        var iddescuento = view.down('#DescuentoproId').getValue();
        var nueneto = view.down('#finaltotalnetoId').getValue();
        var nueiva =  view.down('#finaltotalivaId').getValue();
        var nuetotal = view.down('#finaltotalpostId').getValue();
        var bolEnable = true;
        var producto = view.down('#productoId').getValue();
        if (descuento == 1){            
            var descuento = 0;
            var iddescuento = 0;
        };

        if (descuento > 0){            
            view.down('#tipoDescuentoId').setDisabled(bolEnable);
            view.down('#descuentovalorId').setDisabled(bolEnable);
        };
        var exists = 0;
        var cero = " ";
        var cero1= 0;
        var cero2= 1;

        var tot = ((cantidad * precio) - descuento);
        var neto = (tot / 1.19);
        var exists = 0;
        var iva = (tot - neto);
        var total = (Math.round(neto + iva ));
        
        stItem.each(function(r){
            if(r.data.id_producto == producto){
                Ext.Msg.alert('Alerta', 'El registro ya existe.');
                exists = 1;
                cero="";
                cero1=0;
                cero2=1;
                view.down('#codigoId').setValue(cero);
                view.down('#productoId').setValue(cero);
                view.down('#nombreproductoId').setValue(cero);
                view.down('#cantidadId').setValue(cero2);
                view.down('#precioId').setValue(cero);
                view.down('#cantidadOriginalId').setValue(cero);
                view.down('#totdescuentoId').setValue(cero1);
                return; 
            }
        });

        if(exists == 1)
            return;
      

        stItem.add(new Infosys_web.model.cotizacion.Item({
            id: producto,
            id_producto: producto,
            id_descuento: iddescuento,
            nombre: nombre,
            codigo: codigo,
            precio_base: precio,
            cantidad: cantidad,
            total: total,
            iva: iva,
            neto: neto,
            dcto: descuento
            
        }));

        
        if(precio==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Precio Producto');
            return false;
        }

        if(cantidad>cantidadori){
            Ext.Msg.alert('Alerta', 'Cantidad Ingresada de Productos Supera El Stock');
            return false;
        }

        if(cantidad==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Cantidad.');
            return false;
        }
        
        if(rut.length==0 ){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Datos a la Factura.');
            return false;
        }

        var nueneto = (nueneto + neto);
        var nueiva = (nueiva + iva);
        var nuetotal = (nuetotal + total);

        view.down('#finaltotalId').setValue(Ext.util.Format.number(nuetotal, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(nuetotal, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(nueneto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(nueiva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(nueneto, '0'));
        
        cero="";
        cero1=0;
        cero2=1;
        view.down('#codigoId').setValue(cero);
        view.down('#productoId').setValue(cero);
        view.down('#nombreproductoId').setValue(cero);
        view.down('#cantidadId').setValue(cero2);
        view.down('#precioId').setValue(cero);
        view.down('#cantidadOriginalId').setValue(cero);
        view.down('#totdescuentoId').setValue(cero1);
    },

    editarcotiza: function(){

        var stItms = Ext.getStore('Cotizaeditar');
        stItms.removeAll();
       
        var view = this.getCotizacionprincipal();       
                   
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var view = this.getCotizacioneditar();
            var stItem = this.getCotizaeditarStore();
            var idcotiza = row.data.id;
            var neto = row.data.neto;
            var iva = row.data.iva;
            var total = row.data.total;
            var afecto = row.data.afecto;
            var descuento = row.data.descuento;
            var mail = row.data.email_contacto;
            var cero = 0;
            stItem.proxy.extraParams = {idcotiza : idcotiza};
            stItem.load();
           
            Ext.Ajax.request({
            url: preurl +'cotizaciones/edita/?idcotiza=' + row.data.id,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {                    
                    var view = Ext.create('Infosys_web.view.cotizaciones.Editar').show();                   
                    var cliente = resp.cliente;
                    view.down("#direccionId").setValue(cliente.direccion);
                    view.down('#idcliente').setValue(cliente.id_cliente);
                    view.down('#idId').setValue(cliente.id);
                    view.down('#tipoVendedorId').setValue(cliente.id_vendedor);
                    view.down('#numcotizaId').setValue(cliente.num_cotiza);
                    view.down('#nombreId').setValue(cliente.nombres);
                    view.down('#giroId').setValue(cliente.id_giro);
                    view.down("#nom_giroId").setValue(cliente.giro);                        
                    view.down('#rutId').setValue(cliente.rut);
                    view.down('#fechaordenId').setValue(cliente.fecha);
                    view.down('#nom_giroId').setValue(cliente.nombre_giro);
                    view.down('#fonoId').setValue(cliente.fono);
                    view.down('#nombre_contactoId').setValue(cliente.nombre_contacto);
                    view.down('#idcontacto').setValue(cliente.id_contacto);
                    view.down('#fono_contactoId').setValue(cliente.telefono_contacto);
                    view.down('#tipocondpagoId').setValue(cliente.id_pago);
                    view.down('#mail_contactoId').setValue(cliente.email_contacto);                  
                    var total = (cliente.total);
                    var neto = (cliente.neto);
                    var iva = (cliente.total - cliente.neto);
                    view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));
                    view.down('#finaltotalpostId').setValue(Ext.util.Format.number(total, '0'));
                    view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
                    view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
                    view.down('#finalafectoId').setValue(Ext.util.Format.number(neto, '0'));
                    view.down('#descuentovalorId').setValue(Ext.util.Format.number(cliente.desc, '0'));
                    view.down('#observacionesId').setValue(cliente.observaciones);
                    var bolEnable = false;
                    if ((cliente.id_pago) == 1){
                        view.down('#DescuentoproId').setDisabled(bolEnable);
                        view.down('#tipoDescuentoId').setDisabled(bolEnable);
                        view.down('#descuentovalorId').setDisabled(bolEnable);
                            
                    };
                    if ((cliente.id_pago) == 6){

                         view.down('#DescuentoproId').setDisabled(bolEnable);
                         view.down('#tipoDescuentoId').setDisabled(bolEnable);
                         view.down('#descuentovalorId').setDisabled(bolEnable);
                        
                    };
                    if ((cliente.id_pago) == 7){

                         view.down('#DescuentoproId').setDisabled(bolEnable);
                         view.down('#tipoDescuentoId').setDisabled(bolEnable);
                         view.down('#descuentovalorId').setDisabled(bolEnable);
                        
                    }; 
                }
                

            }
            
        });

        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }       
    },


    cerrarcerrarcotizacion: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },

    seleccionarproductos3: function(){

        var view = this.getBuscarproductos();
        var viewIngresa = this.getCotizacioningresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#productoId').setValue(row.data.id);
            viewIngresa.down('#codigoId').setValue(row.data.codigo);
            viewIngresa.down('#nombreproductoId').setValue(row.data.nombre);
            viewIngresa.down('#precioId').setValue(row.data.p_venta);
            viewIngresa.down('#cantidadOriginalId').setValue(row.data.stock);
            
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

         viewIngresa.down("#cantidadId").focus();
       
    },

    buscarproductos: function(){

        var view = Ext.create('Infosys_web.view.cotizaciones.BuscarProductos').show();
        view.down("#nombreId").focus();
        

    },

    mcotizacion: function(){


        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'cotizacionprincipal'});
        var view = this.getCotizacionprincipal();
        view.down("#nombreId").focus();
        
    },

    exportarcotizacion: function(){
        var view = this.getCotizacionprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            //window.location = preurl +'cotizaciones/exportPDF/?idcotizacion=' + row.data.id; 
            window.open(preurl +'cotizaciones/exportPDF/?idcotizacion=' + row.data.id)
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    agregarcotizacion: function(){
         var nombre = "9";    
         Ext.Ajax.request({

            url: preurl + 'correlativos/generacoti?valida='+nombre,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {
                    var view = Ext.create('Infosys_web.view.cotizaciones.Ingresar').show();                 
                    var cliente = resp.cliente;
                    var correlanue = cliente.correlativo;
                    correlanue = (parseInt(correlanue)+1);
                    var correlanue = correlanue;
                    view.down("#numcotizaId").setValue(correlanue);
                    view.down("#rutId").focus();
                }else{
                    Ext.Msg.alert('Correlativo YA Existe');
                    return;
                }



            }            
        });        
        
    },

    changedctofinal: function(){
        this.recalcularFinal();
    },

    recalcularFinal2: function(){

        var view = this.getCotizacioneditar();
        var stItem = this.getCotizaeditarStore();
        var idcotiza = view.down('#idId').getValue();
        var pretotal = 0;
        var descuento = 0;
        var total = 0;
        var iva = 0;
        var neto = 0;
        stItem.proxy.extraParams = {idcotiza : idcotiza};
        var pretotal = 0;
        var total = 0;
       
        stItem.each(function(r){
            pretotal = (pretotal + r.data.total)
        });

        neto = (Math.round(pretotal /1.19));
        iva = ((pretotal - neto));
        afecto = neto;
        neto = neto;
        pretotalfinal = pretotal;
        
        view.down('#finaltotalId').setValue(Ext.util.Format.number(pretotalfinal, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(pretotalfinal, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#descuentovalorId').setValue(Ext.util.Format.number(descuento, '0'));
        
    },

    recalcularFinal: function(){

        var view = this.getCotizacioningresar();
        var stItem = this.getCotizacionItemsStore();
        var grid2 = view.down('#itemsgridId');
        var pretotal = 0;
        var total = 0;
        var iva = 0;
        var neto = 0;
        stItem.each(function(r){
            pretotal = pretotal + r.data.total
        });
        
        neto = (Math.round(pretotal /1.19));
        iva = ((pretotal - neto));
        afecto = neto;
        neto = neto;
        pretotalfinal = pretotal;
        
        //iva = (total - afecto);
        view.down('#finaltotalId').setValue(Ext.util.Format.number(pretotalfinal, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(pretotalfinal, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(neto, '0'));

    },
    
    eliminaritem: function() {

        var view = this.getCotizacioningresar();
        var grid  = view.down('#itemsgridId');
        var totalnue = view.down('#finaltotalpostId').getValue();
        var netonue = view.down('#finaltotalnetoId').getValue();
        var ivanue = view.down('#finaltotalivaId').getValue();
        var afectonue = view.down('#finalafectoId').getValue();
        var descuentonue = view.down('#descuentovalorId').getValue();
        cero1 = "";
        cero = 0;
        var grid  = view.down('#itemsgridId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            var totalnue = totalnue - (row.data.total);
           
            if (totalnue ==0){
                Ext.Msg.alert('Alerta', 'No puede Eliminar Ultimo Registro');
                return;                
            }else{
                var ivanue = ivanue - (row.data.iva);
                var afectonue = afectonue - (row.data.neto);
                var netonue = netonue - (row.data.neto);
                grid.getStore().remove(row);
            };
            view.down('#DescuentoproId').setValue(cero1);
            view.down('#finaltotalId').setValue(Ext.util.Format.number(totalnue, '0,000'));
            view.down('#finaltotalpostId').setValue(Ext.util.Format.number(totalnue, '0'));
            view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(netonue, '0'));
            view.down('#finaltotalivaId').setValue(Ext.util.Format.number(ivanue, '0'));
            view.down('#finalafectoId').setValue(Ext.util.Format.number(afectonue, '0'));
            view.down('#descuentovalorId').setValue(Ext.util.Format.number(cero));

        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    selectItem: function() {
        var view = this.getCotizacioningresar();
        var producto = view.down('#productoId');
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;

        view.down('#precioId').setValue(record.p_venta);
        view.down('#cantidadOriginalId').setValue(record.stock);
    },
    
    agregarItem: function() {

        var view = this.getCotizacioningresar();
        var stItem = this.getCotizacionItemsStore();
        var producto = view.down('#productoId').getValue();
        var nombre = view.down('#nombreproductoId').getValue();
        var cantidad = view.down('#cantidadId').getValue();
        var codigo = view.down('#codigoId').getValue();
        var precio = ((view.down('#precioId').getValue()));
        var precioun = (Math.round(view.down('#precioId').getValue())/ 1.19);
        var descuento = view.down('#totdescuentoId').getValue(); 
        var iddescuento = view.down('#DescuentoproId').getValue();
        var bolEnable = true;
        var totalnue = view.down('#finaltotalpostId').getValue();
        var netonue = view.down('#finaltotalnetoId').getValue();
        var ivanue = view.down('#finaltotalivaId').getValue();
        var afectonue = view.down('#finalafectoId').getValue();
        
        if (descuento == 1){            
            var descuento = 0;
            var iddescuento = 0;
        };

        if (descuento > 0){            
            view.down('#tipoDescuentoId').setDisabled(bolEnable);
            view.down('#descuentovalorId').setDisabled(bolEnable);
        };

        var exists = 0;
        var cero = " ";
        var cero1= 0;
        var cero2= 1;

        var tot = ((cantidad * precio) - descuento);
        var neto = (tot / 1.19);
        var exists = 0;
        var iva = (tot - neto);
        var total = (Math.round(neto + iva ));
                
        stItem.each(function(r){
            if(r.data.id_producto == producto){
                Ext.Msg.alert('Alerta', 'El registro ya existe.');
                exists = 1;
                cero="";
                cero1=0;
                cero2=1;
                view.down('#codigoId').setValue(cero);
                view.down('#productoId').setValue(cero);
                view.down('#nombreproductoId').setValue(cero);
                view.down('#cantidadId').setValue(cero2);
                view.down('#precioId').setValue(cero);
                view.down('#cantidadOriginalId').setValue(cero);
                view.down('#totdescuentoId').setValue(cero1);
                return; 
            }
        });
        if(exists == 1)
            return;

        stItem.add(new Infosys_web.model.cotizacion.Item({
            id: producto,
            id_producto: producto,
            id_descuento: iddescuento,
            nombre: nombre,
            codigo: codigo,
            precio_base: precio,
            cantidad: cantidad,
            total: total,
            iva: iva,
            neto: neto,
            dcto: descuento
            
        }));

        var totalnue = totalnue + total;
        var ivanue = ivanue + iva;
        var afectonue = afectonue + neto;
        var netonue = netonue + neto;

        view.down('#finaltotalId').setValue(Ext.util.Format.number(totalnue, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(totalnue, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(netonue, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(ivanue, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afectonue, '0'));
        view.down('#descuentovalorId').setValue(Ext.util.Format.number(cero));
       

        cero="";
        cero1=0;
        cero2=1;
        view.down('#codigoId').setValue(cero);
        view.down('#productoId').setValue(cero);
        view.down('#nombreproductoId').setValue(cero);
        view.down('#cantidadId').setValue(cero2);
        view.down('#precioId').setValue(cero);
        view.down('#cantidadOriginalId').setValue(cero);
        view.down('#totdescuentoId').setValue(cero1);
        view.down('#DescuentoproId').setValue(cero);
             
    },
    
    seleccionarcliente: function() {
        var viewIngresa = this.getCotizacioningresar();
        var view = this.getBusquedacliente();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#idcliente').setValue(row.data.id);
            viewIngresa.down('#tipoVendedorId').setValue(row.data.id_vendedor);
            viewIngresa.down('#nombreId').setValue(row.data.nombres);
            viewIngresa.down('#giroId').setValue(row.data.id_giro);
            viewIngresa.down('#nom_giroId').setValue(row.data.giro);
            viewIngresa.down('#direccionId').setValue(row.data.direccion);
            viewIngresa.down('#rutId').setValue(row.data.rut);
            viewIngresa.down("#tipocondpagoId").setValue(row.data.id_pago);
            var bolEnable = false;
            if (row.data.id_pago == 1){

                viewIngresa.down('#DescuentoproId').setDisabled(bolEnable);
                viewIngresa.down('#tipoDescuentoId').setDisabled(bolEnable);
                viewIngresa.down('#descuentovalorId').setDisabled(bolEnable);
                
            };
            if (row.data.id_pago == 6){

                 viewIngresa.down('#DescuentoproId').setDisabled(bolEnable);
                 viewIngresa.down('#tipoDescuentoId').setDisabled(bolEnable);
                 viewIngresa.down('#descuentovalorId').setDisabled(bolEnable);
                
            };
            if (row.data.id_pago == 7){

                 view.down('#DescuentoproId').setDisabled(bolEnable);
                 view.down('#tipoDescuentoId').setDisabled(bolEnable);
                 view.down('#descuentovalorId').setDisabled(bolEnable);
                
            };

            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },
    
    buscaclientes: function() {
        var view = this.getBusquedacliente()
        var st = this.getClientesStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : "Nombre"}
        st.load();
    },

    wbuscarcliente: function() {

        var view = this.getCotizacioningresar();
        var rut = view.down('#rutId').getValue();
        var numero = rut.length;

        if(numero>9){            
            Ext.Msg.alert('Rut Erroneo Ingrese Sin Puntos');
            return;            
        }else{
            if(numero>13){
            Ext.Msg.alert('Rut Erroneo Ingrese Sin Puntos');
            return;   
            }
        }
              

        if (rut){
        
        Ext.Ajax.request({
            url: preurl + 'clientes/validaRut?valida='+rut,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var cero = "";
                if (resp.success == true) {
                    
                    if(resp.cliente){
                        var cliente = resp.cliente;
                        view.down("#idcliente").setValue(cliente.id)
                        view.down("#tipoVendedorId").setValue(cliente.id_vendedor)
                        view.down("#nombreId").setValue(cliente.nombres)
                        view.down("#giroId").setValue(cliente.giro)
                        view.down("#direccionId").setValue(cliente.direccion)
                        view.down("#fonoId").setValue(cliente.fono)
                        view.down("#rutId").setValue(rut) 
                        view.down("#nom_giroId").setValue(cliente.nom_giro)
                        view.down("#tipocondpagoId").setValue(row.data.id_pago);
                        view.down("#nombre_contactoId").focus();
                        var bolEnable = false;
                        if (row.data.id_pago == 1){

                            viewIngresa.down('#DescuentoproId').setDisabled(bolEnable);
                            viewIngresa.down('#tipoDescuentoId').setDisabled(bolEnable);
                            viewIngresa.down('#descuentovalorId').setDisabled(bolEnable);
                            
                        };
                        if (row.data.id_pago == 6){

                             viewIngresa.down('#DescuentoproId').setDisabled(bolEnable);
                             viewIngresa.down('#tipoDescuentoId').setDisabled(bolEnable);
                             viewIngresa.down('#descuentovalorId').setDisabled(bolEnable);
                            
                        };
                        if (row.data.id_pago == 7){

                             view.down('#DescuentoproId').setDisabled(bolEnable);
                             view.down('#tipoDescuentoId').setDisabled(bolEnable);
                             view.down('#descuentovalorId').setDisabled(bolEnable);
                            
                        };
                    }
                    
                }else{

                     Ext.create('Infosys_web.view.cotizaciones.BusquedaCliente').show();
                    

                }
            }

        }); 
        }else{

             var viewcoti = Ext.create('Infosys_web.view.cotizaciones.BusquedaCliente').show();
             viewcoti.down("#nombreId").focus();

                    
            
        }      


       
    },
    
    grabar2: function() {

        var viewIngresa = this.getCotizacioneditar();
        var view = this.getBusquedacliente();
        var idcliente = viewIngresa.down('#idcliente').getValue();
        var fecha = viewIngresa.down('#fechaordenId').getSubmitValue();
        var id = viewIngresa.down('#idId').getValue();
        var numcotiza = viewIngresa.down('#numcotizaId').getValue();
        var vendedor = viewIngresa.down('#tipoVendedorId').getValue();
        var stItem = this.getCotizaeditarStore();
        var stCotiz = this.getCotizacionesStore();
        var contacto = viewIngresa.down('#nombre_contactoId').getValue();
        var idcontacto = viewIngresa.down('#idcontacto').getValue();
        var mail = viewIngresa.down('#mail_contactoId').getValue();
        var telefono = viewIngresa.down('#fono_contactoId').getValue();
        var observa = viewIngresa.down('#observacionesId').getValue();

        if (!idcliente){

            Ext.Msg.alert('Ingrese Datos de Cliente');
            return;
        };

        if (!vendedor){

            Ext.Msg.alert('Seleccione Vendedor');
            return;
        };

        /*if (!contacto){

            Ext.Msg.alert('Ingrese Nombre Contacto');
            return;
        };

        if (!mail){

            Ext.Msg.alert('Ingrese Correo Electronico de Contacto');
            return;
        };

        if (!telefono){

            Ext.Msg.alert('Ingrese Telefono de Contacto');
            return;
        };*/

        var datacliente = {
            contacto: contacto,
            mail: mail,
            telefono: telefono
            
        };

        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'cotizaciones/save2',
            params: {
                idcliente: idcliente,
                id: id,
                vendedor: vendedor,
                fecha: fecha,
                observa: observa,
                numcotiza: numcotiza,
                idcontacto: idcontacto,
                items: Ext.JSON.encode(dataItems),
                datacliente: Ext.JSON.encode(datacliente),
                descuento: viewIngresa.down('#descuentovalorId').getValue(),
                neto: viewIngresa.down('#finaltotalnetoId').getValue(),
                iva: viewIngresa.down('#finaltotalivaId').getValue(),
                afecto: viewIngresa.down('#finalafectoId').getValue(),
                total: viewIngresa.down('#finaltotalpostId').getValue()

                              
            },
            success: function(response){
                var text = response.responseText;
                viewIngresa.close();
                stCotiz.load();
                window.open(preurl +'cotizaciones/exportPDF/?idcotizacion=' + id);
            }
        });

    },

    grabar: function() {

        var viewIngresa = this.getCotizacioningresar();
        var view = this.getBusquedacliente();
        var numcotiza = viewIngresa.down('#numcotizaId').getValue();
        var fecha = viewIngresa.down('#fechaordenId').getSubmitValue();
        var idcliente = viewIngresa.down('#idcliente').getValue();
        var vendedor = viewIngresa.down('#tipoVendedorId').getValue();
        var stItem = this.getCotizacionItemsStore();
        var stCotiz = this.getCotizacionesStore();
        var contacto = viewIngresa.down('#nombre_contactoId').getValue();
        var idcontacto = viewIngresa.down('#idcontacto').getValue();
        var mail = viewIngresa.down('#mail_contactoId').getValue();
        var telefono = viewIngresa.down('#fono_contactoId').getValue();
        var observa = viewIngresa.down('#observacionesId').getValue();

        if (!idcliente){

            Ext.Msg.alert('Ingrese Datos de Cliente');
            return;
        };

         if (!vendedor){

            Ext.Msg.alert('Seleccione Vendedor');
            return;
        };

        /*if (!contacto){

            Ext.Msg.alert('Ingrese Nombre Contacto');
            return;
        };

        if (!mail){

            Ext.Msg.alert('Ingrese Correo Electronico de Contacto');
            return;
        };

        if (!telefono){

            Ext.Msg.alert('Ingrese Telefono de Contacto');
            return;
        };*/

        var datacliente = {
            contacto: contacto,
            mail: mail,
            telefono: telefono
            
        };

        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'cotizaciones/save',
            params: {
                idcliente: idcliente,
                numcotiza: numcotiza,
                vendedor: vendedor,
                observa: observa,
                fecha: fecha,
                idcontacto: idcontacto,
                datacliente: Ext.JSON.encode(datacliente),
                items: Ext.JSON.encode(dataItems),
                descuento: viewIngresa.down('#descuentovalorId').getValue(),
                neto: viewIngresa.down('#finaltotalnetoId').getValue(),
                iva: viewIngresa.down('#finaltotalivaId').getValue(),
                afecto: viewIngresa.down('#finalafectoId').getValue(),
                total: viewIngresa.down('#finaltotalpostId').getValue()
                
            },
            success: function(response){
                var text = response.responseText;
                var resp = Ext.JSON.decode(response.responseText);
                var id = (resp.id);
                viewIngresa.close();
                stCotiz.load();
                window.open(preurl +'cotizaciones/exportPDF/?idcotizacion=' + id);
            }
        });

    }
});










