Ext.define('Infosys_web.controller.Notaventa', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['notaventa',
            'notaventa.Items',
            'notaventa.Editar',
            'Productosf',
            'notaventaeditar',
            'Correlativos',
            'Clientes'
             ],

    models: ['Notaventa',
             'notaventa.Item'],

    views: ['notaventa.notaventa',
            'notaventa.Principal',
            'notaventa.BuscarClientes',
            'notaventa.Editarnotaventa',
            'notaventa.BuscarProductos2'
            ],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
    
       ref: 'notaventaprincipal',
        selector: 'notaventaprincipal'
    },{    
        ref: 'notaventaingresar',
        selector: 'notaventaingresar'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{    
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{    
        ref: 'buscarclientesnotaventa',
        selector: 'buscarclientesnotaventa'
    },{
        ref: 'buscarproductosnotaventa',
        selector: 'buscarproductosnotaventa'
    },{
        ref: 'notaventaeditar',
        selector: 'notaventaeditar'
    },{
        ref: 'buscarproductosnotaventa2',
        selector: 'buscarproductosnotaventa2'
    }

  
    ],
    
    init: function() {
    	
        this.control({

            'notaventaprincipal button[action=buscarnotaventa]': {
                click: this.buscarnotaventa
            },
            'notaventaprincipal button[action=exportarexcelnotaventa]': {
                click: this.exportarexcelnotaventa
            },
            'topmenus menuitem[action=mnotaventa]': {
                click: this.mnotaventa
            },
            'notaventaingresar button[action=grabarnotaventa]': {
                click: this.grabarnotaventa
            },
            'notaventaeditar button[action=grabarnotaventa2]': {
                click: this.grabarnotaventa2
            },
            'notaventaprincipal button[action=agregarnotaventa]': {
                click: this.agregarnotaventa
            },
            'agregarnotaventa button[action=editarnotaventa]': {
                click: this.editarnotaventa
            },
            'notaventaprincipal button[action=cerrarnotaventa]': {
                click: this.cerrarnotaventa
            },
            'notaventaingresar button[action=validarut]': {
                click: this.validarut
            },
            'buscarclientesnotaventa button[action=seleccionarcliente]': {
                click: this.seleccionarcliente
            },
            'notaventaingresar button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'notaventaeditar button[action=buscarproductos2]': {
                click: this.buscarproductos2
            },
            'buscarproductosnotaventa button[action=seleccionarproductos]': {
                click: this.seleccionarproductos
            },
            'buscarproductosnotaventa button[action=buscar]': {
                click: this.buscarp
            },
            'buscarproductosnotaventa2 button[action=seleccionarproductos2]': {
                click: this.seleccionarproductos2
            },
            'buscarproductosnotaventa2 button[action=buscar2]': {
                click: this.buscarp2
            },
           
            'buscarclientesnotaventa button[action=buscar]': {
                click: this.buscar
            },
            'notaventaingresar button[action=grabarnotaventa]': {
                click: this.grabarnotaventa
            },
            'notaventaingresar #productoId': {
                select: this.selectItem
            },
             'notaventaeditar #productoId': {
                select: this.selectItem2
            },
            'notaventaingresar button[action=agregarItem]': {
                click: this.agregarItem
            },
            'notaventaeditar button[action=agregarItem2]': {
                click: this.agregarItem2
            },
            'notaventaingresar #finaldescuentoId': {
                change: this.changedctofinal
            },
            'notaventaingresar #tipoDocumento2Id': {
                select: this.selectItemdocuemento
            },
            'notaventaprincipal button[action=exportarnotaventa]': {
                click: this.exportarnotaventa
            },
            'notaventaprincipal button[action=editarnotaventa]': {
                click: this.editarnotaventa
            },
            'notaventaingresar button[action=eliminaritem]': {
                click: this.eliminaritem
            },
             'notaventaeditar button[action=eliminaritem2]': {
                click: this.eliminaritem2
            },
            'notaventaingresar button[action=editaritem]': {
                click: this.editaritem
            },
             'notaventaeditar button[action=editaritem2]': {
                click: this.editaritem2
            },
        });
    },

    grabarnotaventa2: function(){

        var viewIngresa = this.getnotaventaeditar();
        var numeroticket = viewIngresa.down('#ticketId').getValue();
        var idtipo = viewIngresa.down('#tipoDocumento2Id').getValue();
        var idcliente = viewIngresa.down('#id_cliente').getValue();
        var id = viewIngresa.down('#idId').getValue();
       
        var producto = viewIngresa.down('#tipoVendedorId');
        var finalafectoId = viewIngresa.down('#finaltotalnetoId').getValue();
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;

        var vendedor = record.id;
        var fechanotaventa = viewIngresa.down('#fechaventaId').getValue();
        var stItem = this.getnotaventaeditarStore();
        var stnotaventa = this.getnotaventaStore();

     
        if(vendedor==0  && tipo_documento.getValue() == 1){
            Ext.Msg.alert('Ingrese Datos del Vendedor');
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
            url: preurl + 'notaventa/save2',
            params: {
                idcliente: idcliente,
                id: id,
                items: Ext.JSON.encode(dataItems),
                vendedor : vendedor,
                idtipo : idtipo,
                numeroticket : numeroticket,
                fechanotaventa : fechanotaventa,
                descuento : viewIngresa.down('#finaldescuentoId').getValue(),
                neto : viewIngresa.down('#finaltotalnetoId').getValue(),
                iva : viewIngresa.down('#finaltotalivaId').getValue(),
                afecto: viewIngresa.down('#finalafectoId').getValue(),
                total: viewIngresa.down('#finaltotalpostId').getValue()
            },
             success: function(response){
                 var resp = Ext.JSON.decode(response.responseText);
                 var idnotaventa= resp.idnotaventa;
                 viewIngresa.close();
                 stnotaventa.load();
                 window.open(preurl + 'notaventa/exportPDF/?idnotaventa='+id);
               
            }
           
        });
       
    },

    selectItem2: function() {

        var view = this.getnotaventaeditar();
        var producto = view.down('#productoId');
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;
        
        view.down('#precioId').setValue(record.p_venta);
        view.down('#codigoId').setValue(record.codigo);
        view.down('#cantidadOriginalId').setValue(record.stock);
          
    },

    agregarItem2: function() {

        var view = this.getnotaventaeditar();
        var tipo_documento = view.down('#tipoDocumentoId');
        var rut = view.down('#rutId').getValue();
        var stItem = this.getnotaventaeditarStore();
        var producto = view.down('#productoId');
        var stCombo = producto.getStore();
        var cantidad = view.down('#cantidadId').getValue();
        var cantidadori = view.down('#cantidadOriginalId').getValue();
        var dcto = view.down('#descuentoId').getValue(); 
        var precio = ((view.down('#precioId').getValue()));
        var precioun = ((view.down('#precioId').getValue())/ 1.19);
        var cero = " ";
        var cero1= 0;
        var cero2= 1;
        if (!dcto){
            
            descuento = 0;
           
        }else{

            var descuento = (((cantidad * precio)) * (dcto)) / 100;
            
        }
        var neto = ((cantidad * precio) - descuento);
        var tot = ((cantidad * precio) - descuento);
        var neto = ((neto / 1.19));
        var exists = 0;
        var iva = (tot - neto );
        var totaliva = ((neto + iva ));

        
        if(producto.getValue() != null ){
            var record = stCombo.findRecord('id', producto.getValue()).data;
        }else{

            Ext.Msg.alert('Alerta', 'Debe Seleccionar un Producto');
            return false;

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
            if(r.data.id_producto == record.id){
                Ext.Msg.alert('Alerta', 'El registro ya existe.');
                exists = 1;
                cero="";
                view.down('#codigoId').setValue(cero);
                view.down('#productoId').setValue(cero);
                view.down('#cantidadId').setValue(cero2);
                view.down('#descuentoId').setValue(cero1);
                view.down('#precioId').setValue(cero1);
                view.down('#cantidadOriginalId').setValue(cero1);

                return; 
            }
        });
        if(exists == 1)
            return;
        
        stItem.add(new Infosys_web.model.notaventa.Item({
            id_producto: record.id,
            nombre: record.nombre,
            precio: precio,
            cantidad: cantidad,
            neto: neto,
            totaliva: totaliva,
            iva: iva,
            dcto: descuento,
            descuentoprct: descuento
        }));

        this.recalcular();

        view.down('#codigoId').setValue(cero);
        view.down('#productoId').setValue(cero);
        view.down('#cantidadId').setValue(cero2);
        view.down('#descuentoId').setValue(cero1);
        view.down('#precioId').setValue(cero1);
        view.down('#cantidadOriginalId').setValue(cero1);

    },

    editarnotaventa: function(){

        var stItms = Ext.getStore('notaventaeditar');
        stItms.removeAll();
       
        var view = this.getnotaventaprincipal();       
                   
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var view = this.getnotaventaeditar();
            var stItem = this.getnotaventaeditarStore();
            var idnotaventa = row.data.id;
            stItem.proxy.extraParams = {idnotaventa : idnotaventa};
            stItem.load();
            
            Ext.Ajax.request({
            url: preurl +'notaventa/edita/?idnotaventa=' + row.data.id,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {
                    
                    var view = Ext.create('Infosys_web.view.notaventa.Editarnotaventa').show();                   
                    var cliente = resp.cliente;                   
                    view.down("#ticketId").setValue(cliente.num_ticket);
                    view.down("#idId").setValue(cliente.id);
                    view.down("#tipoDocumento2Id").setValue(cliente.id_tip_docu);
                    view.down("#fechaventaId").setValue(cliente.fecha_venta);                    
                    view.down("#id_cliente").setValue(cliente.id_cliente);
                    view.down("#rutId").setValue(cliente.rut_cliente);
                    view.down("#nombre_id").setValue(cliente.nom_cliente);
                    view.down("#tipoVendedorId").setValue(cliente.id_vendedor);
                    var total = (cliente.total);
                    var neto = (cliente.neto);
                    var iva = (cliente.total - cliente.neto);
                    view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));
                    view.down('#finaltotalpostId').setValue(Ext.util.Format.number(total, '0'));
                    view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
                    view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
                    view.down('#finalafectoId').setValue(Ext.util.Format.number(neto, '0'));
                 
                }else{
                    Ext.Msg.alert('Correlativo no Existe');
                    return;
                }

            }
            
        });

        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
        
       
       
    },

    eliminaritem2: function() {
        var view = this.getnotaventaeditar();

        var total = view.down('#finaltotalpostId').getValue();
        var neto = view.down('#finaltotalnetoId').getValue();
        var iva = view.down('#finaltotalivaId').getValue();
        var grid  = view.down('#itemsgridId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
         
            var total = ((total) - (row.data.totaliva));
            var neto = ((neto) - (row.data.neto));
            var iva = ((iva) - (row.data.iva));
            var afecto = neto;
            view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));
            view.down('#finaltotalpostId').setValue(Ext.util.Format.number(total, '0'));
            view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
            view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
            view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));

            grid.getStore().remove(row);

        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

       
       
    },


    eliminaritem: function() {
        var view = this.getnotaventaingresar();
        var grid  = view.down('#itemsgridId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            grid.getStore().remove(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

        this.recalcularFinal();
       
    },

    editaritem: function() {
        var view = this.getnotaventaingresar();
        var grid  = view.down('#itemsgridId');
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
                    console.log("LLegamos")                   
                    if(resp.cliente){
                        console.log("LLegamos 2")  
                        var cliente = resp.cliente;
                        view.down('#precioId').setValue(cliente.p_venta);
                        view.down('#productoId').setValue(row.data.id_producto);
                        view.down('#codigoId').setValue(cliente.codigo);
                        view.down('#cantidadOriginalId').setValue(cliente.stock);
                        view.down('#cantidadId').setValue(row.data.cantidad);           
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

    editaritem2: function() {
        var view = this.getnotaventaeditar();
        var grid  = view.down('#itemsgridId');
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
                        var stock = ((cliente.stock) + (row.data.cantidad));
                        view.down('#precioId').setValue(cliente.p_venta);
                        view.down('#productoId').setValue(row.data.id_producto);
                        view.down('#codigoId').setValue(cliente.codigo);
                        view.down('#cantidadOriginalId').setValue(stock);
                        view.down('#cantidadId').setValue(row.data.cantidad);           
                    }                    
                }
            }

        });
        grid.getStore().remove(row);
        this.recalcularFinal2();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    exportarnotaventa: function(){
        var view = this.getnotaventaprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            window.open(preurl +'notaventa/exportPDF/?idnotaventa=' + row.data.id)
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    validaboleta: function(){

        var view =this.getnotaventaingresar();
        var rut = view.down('#rutId').getValue();
        
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
                        view.down("#id_cliente").setValue(cliente.id)
                        view.down("#nombre_id").setValue(cliente.nombres)
                        view.down("#rutId").setValue(rut)                       
                    }
                    
                }
            }

        });       
       
    },

    selectItemdocuemento: function() {
        
        var view =this.getnotaventaingresar();
        var tipo_documento = view.down('#tipoDocumento2Id');
        var bolDisabled = tipo_documento.getValue() == 2 ? true : false; // campos se habilitan sólo en factura
        
        if(bolDisabled == true){  // limpiar campos
           view.down('#rutId').setValue('19');
           this.validaboleta();
           
        }

        view.down('#rutId').setDisabled(bolDisabled);
        view.down('#buscarBtn').setDisabled(bolDisabled);
        view.down('#nombre_id').setDisabled(bolDisabled);
        view.down("#rutId").focus();

    },

    exportarexcelnotaventa: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getnotaventaprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelnotaventa?cols='+Ext.JSON.encode(jsonCol));
 
    },

    changedctofinal: function(){
        this.recalcularFinal();
    },

    recalcular: function(){

        var view = this.getnotaventaeditar();
        var stItem = this.getnotaventaeditarStore();
        var grid2 = view.down('#itemsgridId');
        var pretotal = 0;
        var total = 0;
        var iva = 0;
        var neto = 0;
        var dcto = view.down('#finaldescuentoId').getValue();

        stItem.each(function(r){
            pretotal = ((pretotal) + (r.data.totaliva))
            iva = ((iva) + (r.data.iva))
            neto = ((neto) + (r.data.neto))
        });
        pretotalfinal = ((pretotal * dcto)  / 100);
        total = ((pretotal) - (pretotalfinal));
        afecto = neto;
        
        //iva = (total - afecto);
        view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(total, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));
        //view.down('#finalpretotalId').setValue(Ext.util.Format.number(pretotal, '0,000'));
    },

    
    recalcularFinal: function(){

        var view = this.getnotaventaingresar();
        var stItem = this.getnotaventaItemsStore();
        var grid2 = view.down('#itemsgridId');
        var pretotal = 0;
        var total = 0;
        var iva = 0;
        var neto = 0;
        var dcto = view.down('#finaldescuentoId').getValue();

        stItem.each(function(r){
            pretotal = pretotal + r.data.totaliva
            iva = iva + r.data.iva
            neto = neto + r.data.neto
        });
        pretotalfinal = ((pretotal * dcto)  / 100);
        total = ((pretotal) - (pretotalfinal));
        afecto = neto;
        
        //iva = (total - afecto);
        view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(total, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));
        //view.down('#finalpretotalId').setValue(Ext.util.Format.number(pretotal, '0,000'));
    },

    recalcularFinal2: function(){

        var view = this.getnotaventaeditar();
        var stItem = this.getnotaventaItemsStore();
        var grid2 = view.down('#itemsgridId');
        var pretotal = 0;
        var total = 0;
        var iva = 0;
        var neto = 0;
        var dcto = view.down('#finaldescuentoId').getValue();

        stItem.each(function(r){
            pretotal = pretotal + r.data.totaliva
            iva = iva + r.data.iva
            neto = neto + r.data.neto
        });
        pretotalfinal = ((pretotal * dcto)  / 100);
        total = ((pretotal) - (pretotalfinal));
        afecto = neto;
        
        //iva = (total - afecto);
        view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(total, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));
        //view.down('#finalpretotalId').setValue(Ext.util.Format.number(pretotal, '0,000'));
    },



    agregarItem: function() {

        var view = this.getnotaventaingresar();
        var tipo_documento = view.down('#tipoDocumentoId');
        var rut = view.down('#rutId').getValue();
        var stItem = this.getnotaventaItemsStore();
        var producto = view.down('#productoId');
        var stCombo = producto.getStore();
        var cantidad = view.down('#cantidadId').getValue();
        var cantidadori = view.down('#cantidadOriginalId').getValue();
        var dcto = view.down('#descuentoId').getValue(); 
        var precio = ((view.down('#precioId').getValue()));
        var precioun = ((view.down('#precioId').getValue())/ 1.19);
        if (!dcto){
            
            descuento = 0;
           
        }else{

            var descuento = (((cantidad * precio)) * (dcto)) / 100;
            
        }
        var neto = ((cantidad * precio) - descuento);
        var tot = ((cantidad * precio) - descuento);
        var neto = ((neto / 1.19));
        var exists = 0;
        var iva = (tot - neto );
        var totaliva = ((neto + iva ));

        
        if(producto.getValue() != null ){
            var record = stCombo.findRecord('id', producto.getValue()).data;
        }else{

            Ext.Msg.alert('Alerta', 'Debe Seleccionar un Producto');
            return false;

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
            if(r.data.id == record.id){
                Ext.Msg.alert('Alerta', 'El registro ya existe.');
                exists = 1;
                cero="";
                view.down('#codigoId').setValue(cero);
                view.down('#productoId').setValue(cero);
                view.down('#cantidadId').setValue(cero);
                view.down('#descuentoId').setValue(cero);
                view.down('#precioId').setValue(cero);

                return; 
            }
        });
        if(exists == 1)
            return;
        
        stItem.add(new Infosys_web.model.notaventa.Item({
            id: record.id,
            id_producto: record.id,
            nombre: record.nombre,
            precio: precio,
            cantidad: cantidad,
            neto: neto,
            totaliva: totaliva,
            iva: iva,
            dcto: descuento,
            descuentoprct: descuento
        }));
        this.recalcularFinal();

        cero="";
        view.down('#codigoId').setValue(cero);
        view.down('#productoId').setValue(cero);
        view.down('#cantidadId').setValue(cero);
        view.down('#descuentoId').setValue(cero);
        view.down('#precioId').setValue(cero);
        view.down('#cantidadOriginalId').setValue(cero);
        view.down("#buscarproc").focus();

    },

    selectItem: function() {

        var view = this.getnotaventaingresar();
        var producto = view.down('#productoId');
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;
        
        view.down('#precioId').setValue(record.p_venta);
        view.down('#codigoId').setValue(record.codigo);
        view.down('#cantidadOriginalId').setValue(record.stock);
          
    },

    buscar: function(){

        var view = this.getBuscarclientesnotaventa();
        var st = this.getClientesStore();
        var rut = view.down('#rutId').getValue();
        var nombre = view.down('#nombreId').getValue();

        if (!rut){            
             var opcion = "Nombre";
        };
      
        if (!nombre){
            var opcion = "Rut";
            var nombre = view.down('#rutId').getValue();
        };

        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
        st.load();
    },

    seleccionarproductos: function(){

        var view = this.getBuscarproductosnotaventa();
        var viewIngresa = this.getnotaventaingresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#productoId').setValue(row.data.id);
            viewIngresa.down('#codigoId').setValue(row.data.codigo);
            viewIngresa.down('#precioId').setValue(row.data.p_venta);
            viewIngresa.down('#cantidadOriginalId').setValue(row.data.stock);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    seleccionarproductos2: function(){

        var view = this.getBuscarproductosnotaventa2();
        var viewIngresa = this.getnotaventaeditar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#productoId').setValue(row.data.id);
            viewIngresa.down('#codigoId').setValue(row.data.codigo);
            viewIngresa.down('#precioId').setValue(row.data.p_venta);
            viewIngresa.down('#cantidadOriginalId').setValue(row.data.stock);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    buscarproductos: function(){

        Ext.create('Infosys_web.view.notaventa.BuscarProductos').show();
    },

    buscarproductos2: function(){

        Ext.create('Infosys_web.view.notaventa.BuscarProductos2').show();
    },

    buscarp: function(){
        var view = this.getBuscarproductosnotaventa();
        var st = this.getProductosfStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

     buscarp2: function(){
        var view = this.getBuscarproductosnotaventa2();
        var st = this.getProductosfStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    seleccionarcliente: function(){

        var view = this.getBuscarclientesnotaventa();
        var viewIngresa = this.getnotaventaingresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#id_cliente').setValue(row.data.id);
            viewIngresa.down('#nombre_id').setValue(row.data.nombres);
            viewIngresa.down('#rutId').setValue(row.data.rut);
            view.close();
            viewIngresa.down("#tipoVendedorId").focus();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    validarut: function(){

        var view = this.getnotaventaingresar();
        var rut = view.down('#rutId').getValue();
        var numero = rut.length;

        if(numero==0){
            var edit = Ext.create('Infosys_web.view.notaventa.BuscarClientes');            
                  
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
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var cero = "";
                console.log(resp);
                if (resp.success == true) {
                    
                    if(resp.cliente){
                        var cliente = resp.cliente;
                        view.down("#id_cliente").setValue(cliente.id)
                        view.down("#nombre_id").setValue(cliente.nombres)                        
                        view.down("#rutId").setValue(rut)                       
                    }else{
                         Ext.Msg.alert('Rut No Exite');
                         view.down("#rutId").setValue(cero); 
                        return;   
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

    mnotaventa: function(){
       
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'notaventaprincipal'});
    },


    buscarnotaventa: function(){
        
        var view = this.getnotaventaprincipal()
        var st = this.getnotaventaStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();


    },

    grabarnotaventa: function(){

        var viewIngresa = this.getnotaventaingresar();
        var numeroticket = viewIngresa.down('#ticketId').getValue();
        var idtipo = viewIngresa.down('#tipoDocumento2Id').getValue();
        var idcliente = viewIngresa.down('#id_cliente').getValue();
      
        var producto = viewIngresa.down('#tipoVendedorId');
        var stCombo = producto.getStore();
        var record = stCombo.findRecord('id', producto.getValue()).data;
        var finalafectoId = viewIngresa.down('#finaltotalnetoId').getValue();
        var vendedor = record.id;
        var fechanotaventa = viewIngresa.down('#fechaventaId').getValue();
        var stItem = this.getnotaventaItemsStore();
        var stnotaventa = this.getnotaventaStore();

     
        if(vendedor==0  && tipo_documento.getValue() == 1){
            Ext.Msg.alert('Ingrese Datos del Vendedor');
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
            url: preurl + 'notaventa/save',
            params: {
                idcliente: idcliente,
                items: Ext.JSON.encode(dataItems),
                vendedor : vendedor,
                idtipo : idtipo,
                numeroticket : numeroticket,
                fechanotaventa : fechanotaventa,
                descuento : viewIngresa.down('#finaldescuentoId').getValue(),
                neto : viewIngresa.down('#finaltotalnetoId').getValue(),
                iva : viewIngresa.down('#finaltotalivaId').getValue(),
                afecto: viewIngresa.down('#finalafectoId').getValue(),
                total: viewIngresa.down('#finaltotalpostId').getValue()
            },
             success: function(response){
                 var resp = Ext.JSON.decode(response.responseText);
                 var idnotaventa= resp.idnotaventa;
                 viewIngresa.close();
                 stnotaventa.load();
                 window.open(preurl + 'notaventa/exportPDF/?idnotaventa='+idnotaventa);
               
            }
           
        });
       
    },

        
    
    agregarnotaventa: function(){

         //var view = this.getnotaventaingresar();
         var nombre = "6";    
         Ext.Ajax.request({

            url: preurl + 'correlativos/genera?valida='+nombre,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {
                    var view = Ext.create('Infosys_web.view.notaventa.notaventa').show();                   
                    var cliente = resp.cliente;
                    var correlanue = cliente.correlativo;
                    correlanue = (parseInt(correlanue)+1);
                    var correlanue = correlanue;
                    view.down("#ticketId").setValue(correlanue);
                }else{
                    Ext.Msg.alert('Correlativo YA Existe');
                    return;
                }



            }            
        });        
       
    },

    cerrarnotaventa: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
  
});










