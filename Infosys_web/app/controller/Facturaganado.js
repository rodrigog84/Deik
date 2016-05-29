Ext.define('Infosys_web.controller.Facturaganado', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['facturaganado.Items',
             'Clientes',
             'Factura',
             'Productosf',
             'Tipo_documento',
             'Sucursales_clientes',
             'Tipo_documento.Selector4'],

    models: ['facturaganado.Item',
             'Tipo_documento',
             'Sucursales_clientes'],

    views: ['facturaganado.Facturaganado',
            'facturaganado.BuscarClientes',
            'facturaganado.BuscarSucursales',
            'facturaganado.BuscarProductos',
            'ventas.Principalfactura'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
       ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'facturaganado',
        selector: 'facturaganado'
    },{
        ref: 'facturaganadoclientes',
        selector: 'facturaganadoclientes'
    },{
        ref: 'buscarsucursalesclientesfacturaganado',
        selector: 'buscarsucursalesclientesfacturaganado'
    },{
        ref: 'facturasprincipal',
        selector: 'facturasprincipal'
    },{
        ref: 'buscarproductosganado',
        selector: 'buscarproductosganado'
    }




    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({

            'facturaganado #rutId': {
                specialkey: this.special
            },

            'facturaganado #numfactId': {
                specialkey: this.special2
            },

            'facturasprincipal button[action=mfacturaganado]': {
                click: this.mfacturaganado
            },
           
            'facturaganado button[action=facturaganadobuscarclientes]': {
                click: this.facturaganadobuscarclientes
            },
            'facturaganado button[action=buscarfactura]': {
                click: this.buscarfactura
            },
            'facturaganado button[action=buscarsucursalfacturaganado]': {
                click: this.buscarsucursalfacturaganado
            },
            'facturaganado button[action=buscarvendedor]': {
                click: this.buscarvendedor
            },
            'facturaganado button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'facturaganado #nombreId': {
                click: this.special
            },

            'facturaganado #netoId': {
                specialkey: this.calculaiva
            },            

            'facturaganado button[action=validarut]': {
                click: this.validarut
            },
            'facturaganado button[action=grabarfacturaganado]': {
                click: this.grabarfacturaganado
            },
            'facturaganadoclientes button[action=buscar]': {
                click: this.buscar
            },
            'facturaganadoclientes button[action=seleccionarcliente]': {
                click: this.seleccionarcliente
            },
            'buscarsucursalesclientesfacturaganado button[action=seleccionarsucursalganado]': {
                click: this.seleccionarsucursalganado
            },
            'facturaganado #tipocondpagoId': {
                select: this.selecttipocondpago                
            },
            'facturaganado #fechafacturaId': {
                select: this.selecttipocondpago
            },
            'facturaganado button[action=agregarItem]': {
                click: this.agregarItem
            }, 
            'facturaganado button[action=eliminaritem]': {
                click: this.eliminaritem
            },
            'facturaganado #tipoDocumentoId': {
                select: this.selectItemdocuemento
            },
            'buscarproductosganado button[action=seleccionarproductos]': {
                click: this.seleccionarproductos
            },
            'buscarproductosganado button[action=buscar]': {
                click: this.buscarp
            },
            
        });
    },

    seleccionarproductos: function(){

        var view = this.getBuscarproductosganado();
        var viewIngresa = this.getFacturaganado();
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
    },

    buscarp: function(){
        var view = this.getBuscarproductosganado();
        var st = this.getProductosfStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },

    buscarproductos: function(){

        var st = this.getProductosfStore();
        Ext.create('Infosys_web.view.facturaganado.BuscarProductos').show();
        st.load();
    },

    validaboleta: function(){

        var view =this.getFacturaganado();
        var rut = view.down('#rutId').getValue();
        var cero = "";
        var cero1 = "";
        
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
                        view.down("#tipoCiudadId").setValue(cliente.nombre_ciudad)
                        view.down("#tipoComunaId").setValue(cliente.nombre_comuna)
                        view.down("#tipoVendedorId").setValue(cliente.id_vendedor)
                        view.down("#giroId").setValue(cliente.giro)
                        view.down("#direccionId").setValue(cliente.direccion)
                        view.down("#tipocondpagoId").setValue(cliente.id_pago)
                        view.down("#rutId").setValue(rut)
                        view.down('#finaltotalId').setValue(Ext.util.Format.number(cero, '0,000'));
                        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(cero1, '0'));
                        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(cero1, '0'));
                        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(cero1, '0'));
                        view.down('#finalafectoId').setValue(Ext.util.Format.number(cero1, '0'));                      
                    }
                    
                }
            }

        });       
       
    },

    selectItemdocuemento: function() {
        
        var view =this.getFacturaganado();
        var tipo_documento = view.down('#tipoDocumentoId');
        var stCombo = tipo_documento.getStore();
        var record = stCombo.findRecord('id', tipo_documento.getValue()).data;
        var cero = "";
        var cero1 = "";
        
        var nombre = (record.id);    
         Ext.Ajax.request({

            url: preurl + 'correlativos/generafact?valida='+nombre,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {
                    var cliente = resp.cliente;
                    var correlanue = cliente.correlativo;
                    correlanue = (parseInt(correlanue)+1);
                    var correlanue = correlanue;
                    view.down('#numfacturaId').setValue(correlanue);
                    
                }else{
                    Ext.Msg.alert('Correlativo Existe');
                    return;
                }

            }            
        });
        var grid  = view.down('#itemsgridId');
        view.down('#finaltotalId').setValue(Ext.util.Format.number(cero, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(cero1, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(cero1, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(cero1, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(cero1, '0'));        

        
        var bolDisabled = tipo_documento.getValue() == 2 ? true : false; // campos se habilitan sólo en factura

        if(bolDisabled == true){  // limpiar campos
           view.down('#rutId').setValue('19');
           this.validaboleta();
           
        }

        //view.down('#rutId').setDisabled(bolDisabled);
        //view.down('#buscarBtn').setDisabled(bolDisabled);
        //view.down('#nombre_id').setDisabled(bolDisabled);
        //view.down('#direccionId').setDisabled(bolDisabled);
        //view.down('#giroId').setDisabled(bolDisabled);
        //view.down('#tipoCiudadId').setDisabled(bolDisabled);
        //view.down('#tipoComunaId').setDisabled(bolDisabled);
        //view.down('#sucursalId').setDisabled(bolDisabled);
        //view.down('#tipoVendedorId').setDisabled(bolDisabled);
        //view.down('#tipocondpagoId').setDisabled(bolDisabled);
        grid.getStore().removeAll();  
        
    },

           
    calculaiva: function(){

        var view = this.getFacturaganado();
        var tipo_documento = view.down('#tipoDocumentoId').getValue();
        if (tipo_documento == 19 ){
            var iva = 0;
            var neto = view.down('#netoId').getValue();
            view.down('#totalId').setValue(neto);
            view.down('#ivaId').setValue(iva);
        }else if (tipo_documento == 2 ){
            
            var iva = 0;
            var neto = view.down('#netoId').getValue();
            view.down('#totalId').setValue(neto);
            view.down('#ivaId').setValue(iva);

        }else{
        var neto = view.down('#netoId').getValue();
        var iva = (parseInt((neto * 19) / 100));
        var total = (neto + iva);
        view.down('#ivaId').setValue(iva);
        view.down('#totalId').setValue(total);
        };
    },

    recalcularFinal: function(){
        var view = this.getFacturaganado();
        var stItem = this.getFacturaganadoItemsStore();
        var pretotal = 0;
        var total = 0;
        
        stItem.each(function(r){
            pretotal = (parseInt(pretotal) + parseInt(r.data.neto))
          
        });
        
        total = (pretotal * 1.19);
        afecto = pretotal;
        iva = total - pretotal;
        
        //iva = (total - afecto);
        view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(total, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(pretotal, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));
          
    },

    changedctofinal: function(){
        this.recalcularFinal();
    },


    agregarItem: function() {

        var view = this.getFacturaganado();
        var tipo_documento = view.down('#tipoDocumentoId');
        var rut = view.down('#rutId').getValue();
        var stItem = this.getFacturaganadoItemsStore();
        var producto = view.down('#productoId').getValue();
        var nombre = view.down('#nombreproductoId').getValue();
        var cantidad = view.down('#cantidadId').getValue();
        var cantidadori = view.down('#cantidadOriginalId').getValue();
        var precio = ((view.down('#precioId').getValue()));
        var kilos = ((view.down('#kilosId').getValue()));
        var neto = (view.down('#netoId').getValue());
        var bolEnable = true;
        var st = this.getProductosfStore();
        
        if (tipo_documento.getValue() == 2){
             var neto = ((kilos * precio));
             var iva = 0;
             var total = neto;

        }else{
        
        var tot = (parseInt(neto * 1.19));
        var exists = 0;
        var iva = (tot - neto );
        var total = ((neto + iva ));

        };

        
        if(!producto){
            
            Ext.Msg.alert('Alerta', 'Debe Seleccionar un Producto');
            return false;

        }

        if(precio==0){

            Ext.Msg.alert('Alerta', 'Debe Ingresar Precio Producto');
            return false;
            

        }

        if(kilos==0){

            Ext.Msg.alert('Alerta', 'Debe Ingresar Kilos Producto');
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

        Ext.Ajax.request({
            url: preurl + 'facturaganado/rebajaproducto',
            params: {
                idproducto: producto,
                cantidad: cantidad
            },
             success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                st.load();
                
            }
           
        });

        
                
        stItem.add(new Infosys_web.model.facturaganado.Item({
            id_producto: producto,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
            kilos: kilos,
            neto: neto,
            total: total,
            iva: iva,
        }));
        this.recalcularFinal();

        cero="";
        cero1=0;
        cero2=1;
        view.down('#codigoId').setValue(cero);
        view.down('#productoId').setValue(cero);
        view.down('#nombreproductoId').setValue(cero);
        view.down('#cantidadId').setValue(cero2);
        view.down('#precioId').setValue(cero);
        view.down('#cantidadOriginalId').setValue(cero);
        view.down('#kilosId').setValue(cero);
        view.down('#netoId').setValue(cero);
        view.down("#buscarproc").focus();
    },

    eliminaritem: function() {
        var view = this.getFacturaganado();
        var total = view.down('#finaltotalpostId').getValue();
        var neto = view.down('#finaltotalnetoId').getValue();
        var iva = view.down('#finaltotalivaId').getValue();
        var grid  = view.down('#itemsgridId');
        var st = this.getProductosfStore();
       
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            var total = (parseInt(total) - parseInt(row.data.total));
            var neto = (parseInt(neto) - parseInt(row.data.neto));
            var iva = (parseInt(iva) - parseInt(row.data.iva));
            var afecto = neto;
            view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));
            view.down('#finaltotalpostId').setValue(Ext.util.Format.number(total, '0'));
            view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
            view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
            view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));

            grid.getStore().remove(row);

            var producto = (row.data.id_producto);
            var cantidad = (row.data.cantidad);           


            Ext.Ajax.request({
            url: preurl + 'facturaganado/agregaproducto',
            params: {
                idproducto: producto,
                cantidad: cantidad
            },
             success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                st.load();
                
            }
           
        });

        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    
    special: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.validarut()
        }
    },

    special2: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.validafactura()
        }
    },
  
    
    selecttipocondpago: function() {
        
        var view =this.getFacturaganado();
        var condicion = view.down('#tipocondpagoId').getValue();
        var fechafactura = view.down('#fechafacturaId').getValue();

        if (!condicion){

            Ext.Msg.alert('Alerta', 'Selecciona Forma de Pago.');
            return;
            
        }else{
        
        var condicion = view.down('#tipocondpagoId');
        var stCombo = condicion.getStore();
        var record = stCombo.findRecord('id', condicion.getValue()).data;
        dias = record.dias;
        
        Ext.Ajax.request({
            url: preurl + 'facturas/calculofechas',
            params: {
                dias: dias,
                fechafactura : fechafactura
            },
            success: function(response){
               var resp = Ext.JSON.decode(response.responseText);
               var fecha_final= resp.fecha_final;
               view.down("#fechavencId").setValue(fecha_final);
                           
            }
           
        });

        };
       
            
    },

    seleccionarsucursalganado: function(){

        var view = this.getBuscarsucursalesclientesfacturaganado();
        var viewIngresa = this.getFacturaganado();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#id_sucursalID').setValue(row.data.id);
            viewIngresa.down('#direccionId').setValue(row.data.direccion);
            viewIngresa.down('#tipoCiudadId').setValue(row.data.nombre_ciudad);
            viewIngresa.down('#tipoComunaId').setValue(row.data.nombre_comuna);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    buscar: function(){

        var view = this.getFacturaganadoclientes()
        var st = this.getClientesStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : "Nombre"}
        st.load();
    },

    buscarsucursalfacturaganado: function(){

       var busca = this.getFacturaganado()
       var nombre = busca.down('#id_cliente').getValue();
       
       if (nombre){
         var edit = Ext.create('Infosys_web.view.facturaganado.BuscarSucursales').show();
          var st = this.getSucursales_clientesStore();
          st.proxy.extraParams = {nombre : nombre};
          st.load();
       }else {
          Ext.Msg.alert('Alerta', 'Debe seleccionar Cliente.');
            return;
       }
      
    },

    seleccionarcliente: function(){

        var view = this.getFacturaganadoclientes();
        var viewIngresa = this.getFacturaganado();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#id_cliente').setValue(row.data.id);
            viewIngresa.down('#nombre_id').setValue(row.data.nombres);
            viewIngresa.down('#tipoCiudadId').setValue(row.data.nombre_ciudad);
            viewIngresa.down('#tipoComunaId').setValue(row.data.nombre_comuna);
            viewIngresa.down('#tipoVendedorId').setValue(row.data.id_vendedor);
            viewIngresa.down('#giroId').setValue(row.data.giro);
            viewIngresa.down('#direccionId').setValue(row.data.direccion);
            viewIngresa.down('#rutId').setValue(row.data.rut);
            viewIngresa.down('#tipoVendedorId').setValue(row.data.id_vendedor);
            viewIngresa.down('#tipocondpagoId').setValue(row.data.id_pago);
            view.close();
            var condicion = viewIngresa.down('#tipocondpagoId');
            var fechafactura = viewIngresa.down('#fechafacturaId').getValue();
            var stCombo = condicion.getStore();
            var record = stCombo.findRecord('id', condicion.getValue()).data;
            dias = record.dias;
        
            Ext.Ajax.request({
                url: preurl + 'facturas/calculofechas',
                params: {
                    dias: dias,
                    fechafactura : fechafactura
                },
                success: function(response){
                   var resp = Ext.JSON.decode(response.responseText);
                   var fecha_final= resp.fecha_final;
                   viewIngresa.down("#fechavencId").setValue(fecha_final);
                               
            }
           
        });
            
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        };

              
    },
           
    grabarfacturaganado : function() {

        var viewIngresa = this.getFacturaganado();
        var tipo_documento = viewIngresa.down('#tipoDocumentoId').getValue();
        var idcliente = viewIngresa.down('#id_cliente').getValue();
        var idtipo= viewIngresa.down('#tipoDocumentoId').getValue();
        var idsucursal= viewIngresa.down('#id_sucursalID').getValue();
        var idcondventa= viewIngresa.down('#tipocondpagoId').getValue();
        var vendedor = viewIngresa.down('#tipoVendedorId').getValue();
        var numdocumento = viewIngresa.down('#numfacturaId').getValue();
        var fechafactura = viewIngresa.down('#fechafacturaId').getValue();
        var fechavenc = viewIngresa.down('#fechavencId').getValue();
        var stItem = this.getFacturaganadoItemsStore();
        var stFactura = this.getFacturaStore();        
        
        if(numdocumento==0){
            Ext.Msg.alert('Ingrese Datos a La Factura');
            return;   
            }

        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'facturaganado/save',
            params: {
                idcliente: idcliente,
                numdocumento: numdocumento,
                idsucursal: idsucursal,
                idcondventa: idcondventa,
                idtipo: idtipo,
                items: Ext.JSON.encode(dataItems),
                vendedor : vendedor,
                fechafactura : fechafactura,
                fechavenc: fechavenc,
                tipodocumento : tipo_documento,
                netofactura: viewIngresa.down('#finaltotalnetoId').getValue(),
                ivafactura: viewIngresa.down('#finaltotalivaId').getValue(),
                afectofactura: viewIngresa.down('#finalafectoId').getValue(),
                totalfacturas: viewIngresa.down('#finaltotalpostId').getValue()
            },
             success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var idfactura= resp.idfactura;
                 viewIngresa.close();
                 stFactura.load();
                 window.open(preurl + 'facturaganado/exportfacturaganadoPDF/?idfactura='+idfactura);

            }
           
        });
        
        var view = this.getFacturaganado();
        var st = this.getFacturaStore();
        st.proxy.extraParams = {documento: idtipo}
        st.load();       
        
    },

    
    validarut: function(){

        var view =this.getFacturaganado();
        var rut = view.down('#rutId').getValue();
        var numero = rut.length;

       
        if(numero==0){
            var edit = Ext.create('Infosys_web.view.facturaganado.BuscarClientes');            
                  
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
                if (resp.success == true) {
                    
                    if(resp.cliente){
                        var cliente = resp.cliente;
                        view.down("#id_cliente").setValue(cliente.id)
                        view.down("#nombre_id").setValue(cliente.nombres)
                        view.down("#tipoCiudadId").setValue(cliente.nombre_ciudad)
                        view.down("#tipoComunaId").setValue(cliente.nombre_comuna)
                        view.down("#tipoVendedorId").setValue(cliente.id_vendedor)
                        view.down("#giroId").setValue(cliente.giro)
                        view.down("#direccionId").setValue(cliente.direccion)
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

                //view.close();

            }

        });       
        }
    },

    mfacturaganado: function(){

        var nombre = 1;    
        Ext.Ajax.request({

            url: preurl + 'correlativos/generancred?valida='+nombre,
            params: {
                id: 1
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {
                    var cliente = resp.cliente;
                    var correlanue = cliente.correlativo;
                    var descripcion = cliente.nombre;
                    var id = cliente.id;
                    correlanue = (parseInt(correlanue)+1);
                    var correlanue = correlanue;
                    var view = Ext.create('Infosys_web.view.facturaganado.Facturaganado').show();
                    view.down('#numfacturaId').setValue(correlanue);
                    view.down('#tipoDocumentoId').setValue(id);
                                       
                }else{
                    Ext.Msg.alert('Correlativo YA Existe');
                    return;
                }



            }            
        });
    },

    buscarvendedor: function(){

        Ext.create('Infosys_web.view.vendedores.BuscarVendedor').show();
    },

      
});










