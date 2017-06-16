Ext.define('Infosys_web.controller.Guiasdespacho', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Guiasdespacho',
             'Guiasdespachopendientes',
             'Guiasdespachopendientes2',
             'guiasdespacho.Items',
             'Clientes',
             'productos.Items',
             'Sucursales_clientes',
             'Factura4',
             'Despachafactura',
             'Despachaproductos',
             'guiasdespacho.Selector',
             'Tipo_documento.Selectorg'],

    models: ['Guiasdespacho',
             'Guiasdespacho.Item'],

    views: ['guiasdespacho.Principalguias',
            'guiasdespacho.Principalguiaspendientes',
            'guiasdespacho.Facturaguias',
            'guiasdespacho.BuscarClientes',
            'guiasdespacho.BuscarClientes2',
            'guiasdespacho.BuscarGuias',
            'guiasdespacho.Observaciones',
            'guiasdespacho.Despachafactura',
            'guiasdespacho.BuscarFacturas',
            'guiasdespacho.BuscarSucursales',
            'guiasdespacho.BuscarProductos',
            'guiasdespacho.Exportar',
            'guiasdespacho.BuscarSucursales2'],
           
    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
       ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{
        ref: 'guiasprincipal',
        selector: 'guiasprincipal'
    },{
        ref: 'guiasprincipalpendientes',
        selector: 'guiasprincipalpendientes'
    },{
        ref: 'facturaguias',
        selector: 'facturaguias'
    },{
        ref: 'guiasdespachobuscarclientes',
        selector: 'guiasdespachobuscarclientes'
    },{
        ref: 'guiasdespachobuscarclientes2',
        selector: 'guiasdespachobuscarclientes2'
    },{
        ref: 'buscarguias',
        selector: 'buscarguias'
    },{
        ref: 'observacionesfacturasguias',
        selector: 'observacionesfacturasguias'
    },{
        ref: 'despachofactura',
        selector: 'despachofactura'
    },{
        ref: 'buscarfacturasdespacho',
        selector: 'buscarfacturasdespacho'
    },{
        ref: 'buscarsucursalesclientesfacturas',
        selector: 'buscarsucursalesclientesfacturas'
    },{
        ref: 'buscarproductosfacturadirecta',
        selector: 'buscarproductosfacturadirecta'
    },{
        ref: 'formularioexportarguias',
        selector: 'formularioexportarguias'
    },{
        ref: 'buscarsucursalesclientesfacturas2',
        selector: 'buscarsucursalesclientesfacturas2'
    }

    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({ 
                   
            'topmenus menuitem[action=mguias]': {
                click: this.mguias
            },
            'topmenus menuitem[action=fguias]': {
                click: this.fguias
            },
            'guiasprincipal button[action=cerrarguia]': {
                click: this.cerrarguia
            },
            'guiasprincipalpendientes button[action=cerrarguiapendientes]': {
                click: this.cerrarguia
            },
            'guiasprincipalpendientes button[action=buscarfact]': {
                click: this.buscarfact
            },
            'guiasprincipal button[action=buscar]': {
                click: this.buscar
            },
            'guiasprincipalpendientes button[action=factguia]': {
                click: this.factguia
            },
            'guiasprincipal button[action=despachofactura]': {
                click: this.despachofactura
            },           
            'facturaguias button[action=validarut21]': {
                click: this.validarut21
            },
            'facturaguias #rutId': {
                specialkey: this.special
            },
            'guiasdespachobuscarclientes button[action=seleccionarclienteguias]': {
                click: this.seleccionarclienteguias
            },
            'guiasdespachobuscarclientes2 button[action=seleccionarclienteguias2]': {
                click: this.seleccionarclienteguias2
            },
            'facturaguias button[action=agregarItem]': {
                click: this.agregarItem
            },
            'buscarguias button[action=seleccionarguias]': {
                click: this.seleccionarguias
            },
            'buscarguias button[action=buscarguiasdespacho]': {
                click: this.buscarguias2
            },
            'buscarguias button[action=seleccionartodas]': {
                click: this.seleccionartodas
            },
            'facturaguias button[action=buscarguias]': {
                click: this.buscarguias
            },
            'guiasdespachobuscarclientes button[action=buscarclientesguias]': {
                click: this.buscarclientesguias
            },
            'guiasdespachobuscarclientes2 button[action=buscarclientesguias2]': {
                click: this.buscarclientesguias2
            },
            'facturaguias button[action=grabarfactura]': {
                click: this.grabarfactura
            },
            'facturaguias #tipocondpagoId': {
                select: this.selecttipocondpago
            },
            'facturaguias button[action=observaciones]': {
                click: this.observaciones
            },
            'observacionesfacturasguias button[action=ingresaobs]': {
                click: this.ingresaobs
            },
            'observacionesfacturasguias #rutId': {
                specialkey: this.special6
            },
            'despachofactura #rutId': {
                specialkey: this.special3
            },
            'despachofactura button[action=validarut3]': {
                click: this.validarut3
            },            
            'despachofactura button[action=buscarfactura]': {
                click: this.buscarfactura
            },
            'facturaguias button[action=buscarsucursaldespacho]': {
                click: this.buscarsucursaldespacho
            },
            'despachofactura button[action=buscarsucursalfacturadespacho]': {
                click: this.buscarsucursalfacturadespacho
            },
            'buscarsucursalesclientesfacturas button[action=seleccionarsucursalcliente]': {
                click: this.seleccionarsucursalcliente
            },
            'buscarsucursalesclientesfacturas2 button[action=seleccionarsucursalcliente2]': {
                click: this.seleccionarsucursalcliente2
            },
            'despachofactura button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'buscarproductosfacturadirecta button[action=seleccionarproductos]': {
                click: this.seleccionarproductos
            },
            'buscarfacturasdespacho button[action=seleccionarfactura]': {
                click: this.seleccionarfactura
            },
            'buscarfacturasdespacho button[action=encuentrafactura]': {
                click: this.encuentrafactura
            },
            'despachofactura button[action=agregarItem2]': {
                click: this.agregarItem2
            },
            'despachofactura button[action=grabarfacturadespacho]': {
                click: this.grabarfacturadespacho
            },
            'buscarproductosfacturadirecta button[action=seleccionartodas2]': {
                click: this.seleccionartodas2
            },
            'guiasprincipal button[action=generarguiaspdf]': {
                click: this.generarguiaspdf
            },  
            'guiasprincipal button[action=exportarexcelguias]': {
                click: this.exportarexcelguias
            },
            'formularioexportarguias button[action=exportarExcelFormulario]': {
                click: this.exportarExcelFormulario
            },
            'despachofactura button[action=eliminaritem]': {
                click: this.eliminaritem
            },
            'despachofactura #tipocondpagoId': {
                select: this.selecttipocondpago2
            },
            'guiasprincipalpendientes button[action=marcaguia]': {
                click: this.marcarguias
            },
            'guiasprincipalpendientes button[action=generarguias]': {
                click: this.generarfacturapdf
            },
            'facturaguias #tipoDescuentoId': {
                change: this.changedctofinal
            },
            'despachofactura #tipodocumentoId': {
                select: this.selectItemdocuemento
            },
            'facturaguias button[action=eliminaritem2]': {
                click: this.eliminaritem2
            }, 

        });
    },

    changedctofinal: function(){
        this.recalculardescuento();
    },

    recalculardescuento: function(){

        var view = this.getFacturaguias();
        var pretotal = view.down('#finalafectoId').getValue();
        var total = view.down('#finaltotalpostId').getValue();
        var iva = view.down('#finaltotalivaId').getValue();
        var neto = view.down('#finaltotalnetoId').getValue();
        var descuento = view.down('#tipoDescuentoId');
        var stCombo = descuento.getStore();
        var record = stCombo.findRecord('id', descuento.getValue()).data;
        var dcto = (record.porcentaje);
       
        pretotalfinal = ((total * dcto)  / 100);
        total = ((total) - (pretotalfinal));
        afecto = ((total / 1.19));
        iva = (total - afecto);

        view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(total, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));
        view.down('#descuentovalorId').setValue(Ext.util.Format.number(pretotalfinal, '0'));
    },

    generarfacturapdf: function(){
        var view = this.getGuiasprincipalpendientes();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            window.open(preurl +'facturas/exportPDF/?idfactura=' + row.data.id);
            
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    marcarguias: function(){

        Ext.Ajax.request({
            url: preurl + 'guias/procesomarca',
            params: {
                id : 1
            },
             success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {
                    Ext.Msg.alert('Alerta', 'Proceso Correcto');
                    return;
                }else{
                    Ext.Msg.alert('Alerta', 'Proceso InCorrecto');
                return;
                }                
            }           
        });
    },


    eliminaritem: function() {

        var view = this.getDespachofactura();
        var grid  = view.down('#itemsgridId');
        var totalnue = view.down('#finaltotalpostId').getValue();
        var netonue = view.down('#finaltotalnetoId').getValue();
        var ivanue = view.down('#finaltotalivaId').getValue();
        var afectonue = view.down('#finalafectoId').getValue();
        cero1 = "";
        cero = 0;
        var grid  = view.down('#itemsgridId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            var totalnue = totalnue - (row.data.totaliva);
            if (totalnue ==0){
                Ext.Msg.alert('Alerta', 'No puede Eliminar Ultimo Registro');
                return;                
            }else{
                var ivanue = ivanue - (row.data.iva);
                var afectonue = afectonue - (row.data.neto);
                var netonue = netonue - (row.data.neto);
                grid.getStore().remove(row);
            };
            view.down('#finaltotalId').setValue(Ext.util.Format.number(totalnue, '0,000'));
            view.down('#finaltotalpostId').setValue(Ext.util.Format.number(totalnue, '0'));
            view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(netonue, '0'));
            view.down('#finaltotalivaId').setValue(Ext.util.Format.number(ivanue, '0'));
            view.down('#finalafectoId').setValue(Ext.util.Format.number(afectonue, '0'));
            
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    exportarexcelguias: function(){              
           Ext.create('Infosys_web.view.guiasdespacho.Exportar').show();
    },

    generarguiaspdf: function(){
        var view = this.getGuiasprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            window.open(preurl +'facturas/exportPDF/?idfactura=' + row.data.id)            
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    exportarExcelFormulario: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getGuiasprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })

        var view =this.getFormularioexportarguias()
        var viewnew =this.getGuiasprincipal()
        var fecha = view.down('#fechaId').getSubmitValue();
        var opcion = viewnew.down('#tipoSeleccionId').getValue()
        var nombre = viewnew.down('#nombreId').getSubmitValue();
        var fecha2 = view.down('#fecha2Id').getSubmitValue();
        var opcion = view.down('#tipoId').getSubmitValue();

        console.log(opcion)

        if (fecha > fecha2) {
        
               Ext.Msg.alert('Alerta', 'Fechas Incorrectas');
            return;          

        };

        if (opcion == "LIBRO GUIAS"){

            window.open(preurl + 'adminServicesExcel/exportarExcellibroGuias?cols='+Ext.JSON.encode(jsonCol)+'&fecha='+fecha+'&fecha2='+fecha2);
            view.close();
            
            

        }else{

            window.open(preurl + 'adminServicesExcel/exportarExcelGuias?cols='+Ext.JSON.encode(jsonCol)+'&fecha='+fecha+'&fecha2='+fecha2+'&opcion='+opcion+'&nombre='+nombre);
            view.close();

          

        }       
 
    },

    seleccionartodas2: function(){

        var stItem1 = this.getDespachaproductosStore();
        var stItem = this.getProductosItemsStore();
        var view = this.getBuscarproductosfacturadirecta();
        var viewIngresa = this.getDespachofactura();
        var totalfin = viewIngresa.down('#finaltotalpostId').getValue();
        var netofin = viewIngresa.down('#finalafectoId').getValue();
        var ivafin = viewIngresa.down('#finaltotalivaId').getValue();
        var totalfactura = viewIngresa.down('#totalId').getValue();
        var netofactura = viewIngresa.down('#netofacId').getValue();
        var ivafactura = viewIngresa.down('#ivafacId').getValue();
        var descuento = viewIngresa.down('#descuentoId').getValue();       
        
        
        stItem1.each(function(r){

            producto = r.data.id_producto,
            nomproducto = r.data.nombre,
            precio = r.data.p_venta,
            cantidad = r.data.stock,
            neto = ((cantidad * precio)),
            tot = ((cantidad * precio)),
            neto = ((neto / 1.19)),
            iva = (tot - neto ),
            total = ((neto + iva )),
            neto = (total - iva),
            
            stItem.add(new Infosys_web.model.Productos.Item({
                id: producto,
                idproducto: producto,
                nombre: nomproducto,
                precio: precio,
                cantidad: cantidad,
                neto: neto,
                totaliva: total,
                iva: iva          
            }));

            totalfin = totalfin + parseInt(total),
            netofin = netofin + parseInt(neto),
            ivafin = ivafin + parseInt(iva)
                      
        });

        if (totalfactura < totalfin){
            viewIngresa.down('#descuentofinalId').setValue(Ext.util.Format.number(descuento, '0'));
            totalfin = totalfactura;
            netofin = netofactura;
            ivafin = ivafactura;
        };

        viewIngresa.down('#finaltotalId').setValue(Ext.util.Format.number(totalfin, '0,000'));
        viewIngresa.down('#finaltotalpostId').setValue(Ext.util.Format.number(totalfin, '0'));
        viewIngresa.down('#finaltotalnetoId').setValue(Ext.util.Format.number(netofin, '0'));
        viewIngresa.down('#finaltotalivaId').setValue(Ext.util.Format.number(ivafin, '0'));
        viewIngresa.down('#finalafectoId').setValue(Ext.util.Format.number(netofin, '0'));
          
        view.close();
             
    },

    grabarfacturadespacho: function() {

        var viewIngresa = this.getDespachofactura();
        var tipo_documento = viewIngresa.down('#tipodocumentoId').getValue();
        var idcliente = viewIngresa.down('#id_cliente').getValue();
        var idtipo= viewIngresa.down('#tipodocumentoId').getValue();
        var idsucursal= viewIngresa.down('#id_sucursalID').getValue();
        var idcondventa= viewIngresa.down('#tipocondpagoId').getValue();
        var idfactura = viewIngresa.down('#numfacturaId').getValue();
        var vendedor = viewIngresa.down('#tipoVendedorId').getValue();
        var numdocumento = viewIngresa.down('#numfacturaId').getValue();
        var fechafactura = viewIngresa.down('#fechafacturaId').getValue();
        var numfactura_asoc = viewIngresa.down('#numfactId').getValue();
        var idfactura_asoc = viewIngresa.down('#factId').getValue();
        
        var fechavenc = viewIngresa.down('#fechavencId').getValue();
        var stItem = this.getProductosItemsStore();
        var stGuias = this.getGuiasdespachoStore();

        if(numdocumento==0){
            Ext.Msg.alert('Ingrese Datos a La Factura');
            return;   
        }

        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'facturas/save',
            params: {
                idcliente: idcliente,
                idfactura: idfactura,
                numfactura: numdocumento,
                idsucursal: idsucursal,
                idcondventa: idcondventa,
                idtipo: idtipo,
                items: Ext.JSON.encode(dataItems),
                vendedor : vendedor,
                numfactura_asoc : numfactura_asoc,
                idfactura_asoc : idfactura_asoc,
                fechafactura : fechafactura,
                fechavenc: fechavenc,
                tipodocumento : tipo_documento,
                netofactura: viewIngresa.down('#finaltotalnetoId').getValue(),
                ivafactura: viewIngresa.down('#finaltotalivaId').getValue(),
                afectofactura: viewIngresa.down('#finalafectoId').getValue(),
                totalfacturas: viewIngresa.down('#finaltotalpostId').getValue(),
                totaldescuento: viewIngresa.down('#descuentofinalId').getValue()
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var idfactura= resp.idfactura;
                 viewIngresa.close();
                 stGuias.load();                 //window.open(preurl + 'facturas/exportPDF/?idfactura='+idfactura);

            }
           
        });      
        
    },

    agregarItem2: function() {

        var view = this.getDespachofactura();
        var tipo_documento = view.down('#tipoDocumentoId');
        var rut = view.down('#rutId').getValue();
        var stItem = this.getProductosItemsStore();
        var producto = view.down('#productoId').getValue();
        var nomproducto = view.down('#nomproductoId').getValue();
        var cantidad = view.down('#cantidadId').getValue();
        var cantidadori = view.down('#cantidadOriginalId').getValue();
        var idfactura = view.down('#factId').getValue();
        var precio = ((view.down('#precioId').getValue()));
        var precioun = ((view.down('#precioId').getValue())/ 1.19);
        var totalfactura = view.down('#totalId').getValue();
        var netofactura = view.down('#netofacId').getValue();
        var ivafactura = view.down('#ivafacId').getValue();
        var descuento = view.down('#descuentoId').getValue();       
        var neto = ((cantidad * precio));
        var tot = ((cantidad * precio));
        var neto = (parseInt(neto / 1.19));
        var exists = 0;
        var iva = (tot - neto );
        var totaliva = ((neto + iva ));
        var neto = (totaliva - iva);

        var totalfin = view.down('#finaltotalpostId').getValue();
        var netofin = view.down('#finalafectoId').getValue();
        var ivafin = view.down('#finaltotalivaId').getValue();
        
        if(precio==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Precio Producto');
            return false;
        };

        if(cantidad>cantidadori){
            Ext.Msg.alert('Alerta', 'Cantidad Ingresada de Productos Supera El Stock');
            return false;
        };

        if(cantidad==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Cantidad.');
            return false;
        };
                    
        if(rut.length==0 ){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Datos a la Factura.');
            return false;
        };

        if(idfactura){
            Ext.Ajax.request({
                    url: preurl + 'notacredito/validaproducto',
                params: {
                    idproducto: producto,
                    idfactura : idfactura
                },
                success: function(response){
                   var resp = Ext.JSON.decode(response.responseText);                

                   if(resp.cliente){

                      var cliente = resp.cliente;
                      var canti = cliente.cantidad;
                    }

                   if (resp.success == false) {

                    cero="";
                    cero2=0;
                    view.down('#codigoId').setValue(cero);
                    view.down('#productoId').setValue(cero);
                    view.down('#cantidadId').setValue(cero);
                    view.down('#precioId').setValue(cero2);
                    view.down('#cantidadOriginalId').setValue(cero);
                    view.down("#buscarproc").focus();

                    Ext.Msg.alert('Alerta', 'Producto No corresponde a Factura');
                    return false;
                    

                   }else{

                    if(cantidad>canti){

                        cero="";
                        cero2=0;
                        view.down('#codigoId').setValue(cero);
                        view.down('#productoId').setValue(cero);
                        view.down('#cantidadId').setValue(cero);
                        view.down('#precioId').setValue(cero2);
                        view.down('#cantidadOriginalId').setValue(cero);
                        view.down("#buscarproc").focus();


                        Ext.Msg.alert('Alerta', 'Cantidad de Producto Mayor a lo Vendido');
                        return false;

                    }else{
                    

                    stItem.each(function(r){
                    if(r.data.id == producto){
                        Ext.Msg.alert('Alerta', 'El registro ya existe.');
                        exists = 1;
                        cero="";
                        view.down('#codigoId').setValue(cero);
                        view.down('#productoId').setValue(cero);
                        view.down('#cantidadId').setValue(cero);
                        view.down('#precioId').setValue(cero);

                        return; 
                    }
                    });
                    if(exists == 1)
                    return;

                    stItem.add(new Infosys_web.model.Productos.Item({
                        id: producto,
                        idproducto: producto,
                        nombre: nomproducto,
                        precio: precio,
                        cantidad: cantidad,
                        neto: neto,
                        totaliva: totaliva,
                        iva: iva          
                    }));

                    cero="";
                    cero2=0;
                    view.down('#codigoId').setValue(cero);
                    view.down('#productoId').setValue(cero);
                    view.down('#cantidadId').setValue(cero2);
                    view.down('#precioId').setValue(cero2);
                    view.down('#cantidadOriginalId').setValue(cero);
                    view.down("#buscarproc").focus();
                    totalfin = totalfin + totaliva;
                    ivafin = ivafin + iva;
                    netofin = netofin + neto;
                    
                    if (totalfactura < totalfin){
                        view.down('#descuentofinalId').setValue(Ext.util.Format.number(descuento, '0'));
                        totalfin = totalfactura;
                        netofin = netofactura;
                        ivafin = ivafactura;
                    };
                  
                    view.down('#finaltotalId').setValue(Ext.util.Format.number(totalfin, '0,000'));
                    view.down('#finaltotalpostId').setValue(Ext.util.Format.number(totalfin, '0'));
                    view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(netofin, '0'));
                    view.down('#finaltotalivaId').setValue(Ext.util.Format.number(ivafin, '0'));
                    view.down('#finalafectoId').setValue(Ext.util.Format.number(netofin, '0'));
          
                }
                    }
                    
                               
                    }
                });
        }else{

            Ext.Msg.alert('Alerta', 'Debe Seleccionar un Factura');
            return false;           

        };
    },

    seleccionarfactura: function(){

        var view = this.getBuscarfacturasdespacho();
        var viewIngresa = this.getDespachofactura();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#facturaId').setValue(row.data.id);
            viewIngresa.down('#numfactId').setValue(row.data.num_factura);
            viewIngresa.down('#descuentoId').setValue(row.data.descuento);
            viewIngresa.down('#netofacId').setValue(row.data.neto);
            viewIngresa.down('#ivafacId').setValue(row.data.iva);
            viewIngresa.down('#totalId').setValue(row.data.totalfactura);
            viewIngresa.down('#totfactId').setValue(row.data.totalfactura);
            viewIngresa.down('#factId').setValue(row.data.id);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }

    },

    seleccionarproductos: function(){

        var view = this.getBuscarproductosfacturadirecta();
        var viewIngresa = this.getDespachofactura();
        var idfactura = viewIngresa.down('#factId').getValue();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#productoId').setValue(row.data.id_producto);
            var idproducto = (row.data.id_producto);
            var nomproducto = (row.data.nombre);

            Ext.Ajax.request({
                    url: preurl + 'notacredito/validaproducto',
                params: {
                    idproducto: idproducto,
                    idfactura : idfactura
                },
                success: function(response){
                   var resp = Ext.JSON.decode(response.responseText);                

                   if(resp.cliente){
                      var cliente = resp.cliente;
                      var canti = cliente.cantidad;
                      viewIngresa.down('#cantidadOriginalId').setValue(canti);
                      viewIngresa.down('#productoId').setValue(idproducto);
                      viewIngresa.down('#nomproductoId').setValue(nomproducto);
                      viewIngresa.down('#codigoId').setValue(row.data.codigo);
                      viewIngresa.down('#precioId').setValue(row.data.p_venta);
                      viewIngresa.down('#cantidadId').setValue(canti);
                      view.close();
                    }

                   if (resp.success == false) {

                    cero="";
                    cero2=0;
                    viewIngresa.down('#codigoId').setValue(cero);
                    viewIngresa.down('#productoId').setValue(cero);
                    viewIngresa.down('#cantidadId').setValue(cero2);
                    viewIngresa.down('#precioId').setValue(cero2);
                    viewIngresa.down('#cantidadOriginalId').setValue(cero);
                    viewIngresa.down("#buscarproc").focus();

                    Ext.Msg.alert('Alerta', 'Producto No corresponde a Factura');
                    return false;
                    

                   }
                               
                    }
                });
           
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    buscarproductos: function(){

        var view = this.getDespachofactura();
        var st = this.getDespachaproductosStore()
        var nombre = view.down('#facturaId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
        Ext.create('Infosys_web.view.guiasdespacho.BuscarProductos').show();
    },

    seleccionarsucursalcliente: function(){

        var view = this.getBuscarsucursalesclientesfacturas();
        var viewIngresa = this.getDespachofactura();
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

    seleccionarsucursalcliente2: function(){

        var view = this.getBuscarsucursalesclientesfacturas2();
        var viewIngresa = this.getFacturaguias();
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

    buscarsucursaldespacho: function(){

       var busca = this.getFacturaguias()
       var nombre = busca.down('#id_cliente').getValue();
       
       if (nombre){
         var edit = Ext.create('Infosys_web.view.guiasdespacho.BuscarSucursales2').show();
          var st = this.getSucursales_clientesStore();
          st.proxy.extraParams = {nombre : nombre};
          st.load();
       }else {
          Ext.Msg.alert('Alerta', 'Debe seleccionar Cliente.');
            return;
       }
      
    },

    buscarsucursalfacturadespacho: function(){

       var busca = this.getDespachofactura()
       var nombre = busca.down('#id_cliente').getValue();
       
       if (nombre){
         var edit = Ext.create('Infosys_web.view.guiasdespacho.BuscarSucursales').show();
          var st = this.getSucursales_clientesStore();
          st.proxy.extraParams = {nombre : nombre};
          st.load();
       }else {
          Ext.Msg.alert('Alerta', 'Debe seleccionar Cliente.');
            return;
       }
      
    },

    buscarfactura : function() {

       var busca = this.getDespachofactura()
       var nombre = busca.down('#id_cliente').getValue();
    
       if (nombre){
          var edit =  Ext.create('Infosys_web.view.guiasdespacho.BuscarFacturas').show();
          var st = this.getFactura4Store();
          st.proxy.extraParams = {nombre : nombre,
                                  opcion : "Nombre"};
          st.load();
       }else {
          Ext.Msg.alert('Alerta', 'Debe seleccionar Cliente.');
            return;
       }

    },

    

     special3: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.validarut3()
        }
    },


    selectItemdocuemento: function() {



        var view =this.getDespachofactura();
        var tipo_documento = view.down('#tipodocumentoId');
        var stCombo = tipo_documento.getStore();

        var record = stCombo.findRecord('id', tipo_documento.getValue()).data;
        //console.log(record);
        var nombre = (record.id);    
        if(nombre == 105){ // GUIA DE DESPACHO ELECTRONICA

            // se valida que exista certificado
            response_certificado = Ext.Ajax.request({
            async: false,
            url: preurl + 'facturas/existe_certificado/'});

            var obj_certificado = Ext.decode(response_certificado.responseText);

            if(obj_certificado.existe == true){


                //buscar folio factura electronica
                // se buscan folios pendientes, o ocupados hace más de 4 horas

                response_folio = Ext.Ajax.request({
                async: false,
                url: preurl + 'facturas/folio_documento_electronico/'+nombre});  
                var obj_folio = Ext.decode(response_folio.responseText);
                nuevo_folio = obj_folio.folio;
                if(nuevo_folio != 0){
                    view.down('#numfacturaId').setValue(nuevo_folio);  
                    //habilita = true;
                }else{
                    Ext.Msg.alert('Atención','No existen folios disponibles');
                    view.down('#numfacturaId').setValue('');  

                    //return
                }

            }else{
                    Ext.Msg.alert('Atención','No se ha cargado certificado');
                    view.down('#numfacturaId').setValue('');  
            }


        }else{

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
                        //var descripcion = cliente.nombre;
                        //var id = cliente.id;
                        correlanue = (parseInt(correlanue)+1);
                        var correlanue = correlanue;
                        //var view = Ext.create('Infosys_web.view.notacredito.Notacredito').show();
                        view.down('#numfacturaId').setValue(correlanue);
                        //view.down('#nomdocumentoId').setValue(descripcion);
                        //view.down('#tipodocumentoId').setValue(id);
                        
                    }else{
                        Ext.Msg.alert('Correlativo YA Existe');
                        return;
                    }



                }            
            });            
        }
        var grid  = view.down('#itemsgridId');        
        grid.getStore().removeAll();  
        //var controller = this.getController('Productos');
        //this.recalcularFinal();

    },    

    validarut3: function(){

        var view =this.getDespachofactura();
        var rut = view.down('#rutId').getValue();
        var numero = rut.length;
       
        if(numero==0){
            var edit = Ext.create('Infosys_web.view.guiasdespacho.BuscarClientes');            
                  
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
                        view.down("#numfactId").focus()                       
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

    special6: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.validarut2()
        }
    },

    validarut2: function(){

        var view = this.getObservacionesfacturasguias();
        var rut = view.down('#rutId').getValue();
        var okey = "SI";
        var cero = " ";
        
        if (!rut){
             Ext.Msg.alert('Alerta', 'Debe Ingresar Rut');
                 return;
        };

        Ext.Ajax.request({
            url: preurl + 'facturasvizualiza/validaRut?valida='+rut,
            params: {
                id: 1
            },
            
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {
                    var rutm = resp.rut;
                    if (resp.existe == true){
                        var observa = resp.observa;
                        if (observa){
                         view.down("#nombreId").setValue(observa.nombre);
                         view.down("#rutId").setValue(observa.rut);
                         view.down("#rutmId").setValue(rut);
                         view.down("#camionId").setValue(observa.pat_camion);
                         view.down("#carroId").setValue(observa.pat_carro);
                         view.down("#fonoId").setValue(observa.fono);
                         view.down("#validaId").setValue(okey);
                         view.down("#observaId").focus();
                    }             
                    };
                    if (resp.existe == false){
                        view.down("#nombreId").focus();
                         view.down("#rutId").setValue(rutm);
                         view.down("#rutmId").setValue(rut);
                         view.down("#validaId").setValue(okey);
                    }  
                    
                }else{

                      Ext.Msg.alert('Informacion', 'Rut Incorrecto');                      
                      return false;
                     
                      
                }
               
            }

        });
    },

    ingresaobs: function(){

        var view = this.getObservacionesfacturasguias();
        var viewIngresar = this.getFacturaguias();                
        var rut = view.down('#rutmId').getValue();
        var nombre = view.down('#nombreId').getValue();
        var camion = view.down('#camionId').getValue();
        var fono = view.down('#fonoId').getValue();
        var carro = view.down('#carroId').getValue();
        var observa = view.down('#observaId').getValue();
        var valida = view.down('#validaId').getValue();
        var numero = view.down('#FactId').getValue();      
        
        var permite = "SI"

        if (valida == "NO"){
             Ext.Msg.alert('Alerta', 'Debe Validar Rut');
                 return;
        };        
        
        if (!rut){
             Ext.Msg.alert('Alerta', 'Debe Ingresar Rut');
                 return;
        };
        if (!nombre){
             Ext.Msg.alert('Alerta', 'Debe Ingresar Nombre');
                 return;
        };
       
       
        Ext.Ajax.request({
            url: preurl + 'facturasvizualiza/saveobserva',
            params: {
                rut: rut,
                nombre: nombre,
                camion: camion,
                carro : carro,
                fono : fono,
                observa : observa,
                numero: numero
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var idobserva = resp.idobserva;         
                view.close();
                viewIngresar.down("#observaId").setValue(observa);
                viewIngresar.down("#permiteId").setValue(permite);
                viewIngresar.down("#obsId").setValue(idobserva);               

            }
           
        });
    },

    observaciones: function(){

        var viewIngresa = this.getFacturaguias();
        var numfactura = viewIngresa.down('#numfacturaId').getValue();
        var view = Ext.create('Infosys_web.view.guiasdespacho.Observaciones').show();
        view.down("#rutId").focus();
        view.down("#FactId").setValue(numfactura);

    },

    selecttipocondpago: function() {
        
        
        var view =this.getFacturaguias();
        var condicion = view.down('#tipocondpagoId');
        var fechafactura = view.down('#fechafacturaId').getValue();
                

        var stCombo = condicion.getStore();
        var record = stCombo.findRecord('id', condicion.getValue()).data;
        dias = record.dias;


        if (dias > 0){
        
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

        }else{

            var fecha_final = fechafactura;
            view.down("#fechavencId").setValue(fecha_final);


        };
       
            
    },

    selecttipocondpago2: function() {
        
        
        var view =this.getDespachofactura();
        var condicion = view.down('#tipocondpagoId');
        var fechafactura = view.down('#fechafacturaId').getValue();
                

        var stCombo = condicion.getStore();
        var record = stCombo.findRecord('id', condicion.getValue()).data;
        dias = record.dias;


        if (dias > 0){
        
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

        }else{

            var fecha_final = fechafactura;
            view.down("#fechavencId").setValue(fecha_final);


        };
       
            
    },

    grabarfactura: function() {

        var viewIngresa = this.getFacturaguias();
        var tipo_documento = viewIngresa.down('#tipoDocumentoId');
        var idcliente = viewIngresa.down('#id_cliente').getValue();
        var idsucursal= viewIngresa.down('#id_sucursalID').getValue();
        var idcondventa= viewIngresa.down('#tipocondpagoId').getValue();
        var vendedor = viewIngresa.down('#tipoVendedorId').getValue();
        var ordencompra = viewIngresa.down('#ordencompraId').getValue();
        var numfactura = viewIngresa.down('#numfacturaId').getValue();
        var fechafactura = viewIngresa.down('#fechafacturaId').getValue();
        var observa = viewIngresa.down('#observaId').getValue();
        var idobserva = viewIngresa.down('#obsId').getValue();
        var fechavenc = viewIngresa.down('#fechavencId').getValue();
        var stItem = this.getGuiasdespachoItemsStore();
        var stFactura = this.getGuiasdespachopendientesStore();
        var stFactura = this.getGuiasdespachopendientes2Store();
        if(vendedor==0  && tipo_documento.getValue() == 1){
            Ext.Msg.alert('Ingrese Datos del Vendedor');
            return;   
        }

        if(numfactura==0){
            Ext.Msg.alert('Ingrese Datos a La Factura');
            return;   
            }

        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'guias/save',
            params: {
                idcliente: idcliente,
                idsucursal: idsucursal,
                idcondventa: idcondventa,
                items: Ext.JSON.encode(dataItems),
                observacion: observa,
                ordencompra: ordencompra,
                idobserva: idobserva,
                vendedor : vendedor,
                numfactura : numfactura,
                fechafactura : fechafactura,
                fechavenc: fechavenc,
                netofactura: viewIngresa.down('#finaltotalnetoId').getValue(),
                ivafactura: viewIngresa.down('#finaltotalivaId').getValue(),
                afectofactura: viewIngresa.down('#finalafectoId').getValue(),
                tipodocumento : 101,
                //descuentofactuta : viewIngresa.down('#descuentovalorId').getValue(),
                totalfacturas: viewIngresa.down('#finaltotalpostId').getValue()               
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var idfactura= resp.idfactura;
                viewIngresa.close();
                stFactura.reload();
                window.open(preurl + 'facturas/exportPDF/?idfactura='+idfactura);
            }
           
        });

        var stItem2 = this.getGuiasdespachopendientes2Store();
        stItem2.reload();
        
    },

    seleccionartodas: function(){

        var stItem1 = this.getGuiasdespachopendientesStore();
        var stItem2 = this.getGuiasdespachopendientes2Store();
        var stItem = this.getGuiasdespachoItemsStore();
        var view = this.getBuscarguias();
        var viewIngresa = this.getFacturaguias();
        var totalfin = viewIngresa.down('#finaltotalpostId').getValue();
        var netofin = viewIngresa.down('#finalafectoId').getValue();
        var ivafin = viewIngresa.down('#finaltotalivaId').getValue();

        
        stItem1.each(function(r){

            idguia = r.data.id,
            numguia = r.data.num_factura,
            neto = r.data.neto,
            iva = r.data.iva,
            total = r.data.totalfactura,

            stItem.add(new Infosys_web.model.Guiasdespacho.Item({
            id_guia: idguia,
            num_guia: numguia,
            neto: neto,
            iva: iva,
            total: total
            }));

            totalfin = totalfin + parseInt(r.data.totalfactura),
            netofin = netofin + parseInt(r.data.neto),
            ivafin = ivafin + parseInt(r.data.iva)
                      
        });

        viewIngresa.down('#finaltotalId').setValue(Ext.util.Format.number(totalfin, '0,000'));
        viewIngresa.down('#finaltotalpostId').setValue(Ext.util.Format.number(totalfin, '0'));
        viewIngresa.down('#finaltotalnetoId').setValue(Ext.util.Format.number(netofin, '0'));
        viewIngresa.down('#finaltotalnetodId').setValue(Ext.util.Format.number(netofin, '0,000'));
        viewIngresa.down('#finaltotalivaId').setValue(Ext.util.Format.number(ivafin, '0'));
        viewIngresa.down('#finaltotalivadId').setValue(Ext.util.Format.number(ivafin, '0,000'));
        viewIngresa.down('#finalafectoId').setValue(Ext.util.Format.number(netofin, '0'));
        viewIngresa.down('#finalafectodId').setValue(Ext.util.Format.number(netofin, '0,000'));
               
        view.close();
        stItem2.reload();
       
    },

    seleccionarguias: function(){

        var view = this.getBuscarguias();
        var viewIngresa = this.getFacturaguias();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#idguiaId').setValue(row.data.id);
            viewIngresa.down('#numguiaId').setValue(row.data.num_factura);
            viewIngresa.down('#netoId').setValue(row.data.neto);
            viewIngresa.down('#ivaId').setValue(row.data.iva);
            viewIngresa.down('#totalId').setValue(row.data.totalfactura);
            grid.getStore().remove(row);
            view.close(); 
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },   

    buscarguias : function() {

       var busca = this.getFacturaguias()
       var nombre = busca.down('#id_cliente').getValue();
       var opcion = "Id";
       if (nombre){
          var st = this.getGuiasdespachopendientesStore();          
          var edit =  Ext.create('Infosys_web.view.guiasdespacho.BuscarGuias').show();
          edit.down('#clienteId').setValue(nombre);
          st.proxy.extraParams = {nombre : nombre,
                                  opcion : opcion};
          st.load();
       }else {
          Ext.Msg.alert('Alerta', 'Debe seleccionar Cliente.');
            return;
       }

    },

    buscarguias2 : function() {

       var busca = this.getBuscarguias()
       var id_cliente = busca.down('#clienteId').getValue();
       var nombre = busca.down('#nombreId').getValue();
       var opcion = "Numero";
       if (nombre){
          var st = this.getGuiasdespachopendientesStore();          
          st.proxy.extraParams = {nombre : nombre,
                                  opcion : opcion,
                                  idcliente: id_cliente};
          st.load();
       }

    },

    agregarItem: function() {

        var view = this.getFacturaguias();
        var tipo_documento = view.down('#tipoDocumentoId');
        var rut = view.down('#rutId').getValue();
        var neto = view.down('#netoId').getValue();
        var idguia = view.down('#idguiaId').getValue();
        var numguia = view.down('#numguiaId').getValue();
        var iva = view.down('#ivaId').getValue();
        var total = view.down('#totalId').getValue();
        var stItem = this.getGuiasdespachoItemsStore();
        var totalfin = view.down('#finaltotalpostId').getValue();
        var netofin = view.down('#finaltotalnetoId').getValue();
        var afectofin = view.down('#finalafectoId').getValue();
        var ivafin = view.down('#finaltotalivaId').getValue();
        var secuencia = view.down('#secuenciaId').getValue();
        var totalfin = totalfin + total;
        var netofin = netofin + neto;
        //var afectofin = netofin + neto;
        var afectofin = netofin;
        var ivafin= ivafin + iva;
        var espacios = "";
        var ceros = 0;
        var secuencia = secuencia + 1;       
                
        if(neto==0){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Valores');
            return false;
        };       
                    
        if(rut.length==0 ){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Datos a la Factura.');
            return false;
        };

        if (secuencia > 8 & tipo_documento ==2 ){

           Ext.Msg.alert('Alerta', 'Ya sobrepaso el maximo de Registros');
                exists = 1;
                cero="";
                view.down('#idguiaId').setValue(espacios);
                view.down('#numguiaId').setValue(espacios);
                view.down('#ivaId').setValue(ceros);
                view.down('#totalId').setValue(ceros);
                view.down('#netoId').setValue(ceros);
                return; 
            

        };
        
        stItem.add(new Infosys_web.model.Guiasdespacho.Item({
            secuencia: secuencia,
            id_guia: idguia,
            num_guia: numguia,
            neto: neto,
            iva: iva,
            total: total
        }));

       
        view.down('#finaltotalId').setValue(Ext.util.Format.number(totalfin, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(totalfin, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(netofin, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(ivafin, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afectofin, '0'));
        view.down('#secuenciaId').setValue(secuencia);
        
       Ext.Ajax.request({
                url: preurl + 'guias/marcarguias',
                params: {
                    factura: idguia,
                },
                success: function(response){
                   var resp = Ext.JSON.decode(response.responseText);

                   if (resp.success == true) {
                    view.down('#idguiaId').setValue(espacios);
                    view.down('#numguiaId').setValue(espacios);
                    view.down('#ivaId').setValue(ceros);
                    view.down('#totalId').setValue(ceros);
                    view.down('#netoId').setValue(ceros);
                }
            }
           
        });
        
    },

    eliminaritem2: function() {
        var view = this.getFacturaguias();
        var nueneto = view.down('#finaltotalnetoId').getValue();
        var nueiva =  view.down('#finaltotalivaId').getValue();
        var nuetotal = view.down('#finaltotalpostId').getValue();
        var secuencia = view.down('#secuenciaId').getValue();
        var secuencia = secuencia - 1;
        var grid  = view.down('#itemsgridId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            var nuetotal = (parseInt(nuetotal) - parseInt(row.data.total));
            var neto = (parseInt((row.data.total)/1.19));
            var nueneto = nueneto - neto;
            var nueiva = nuetotal - nueneto;
            view.down('#finaltotalId').setValue(Ext.util.Format.number(nuetotal, '0,000'));
            view.down('#finaltotalpostId').setValue(Ext.util.Format.number(nuetotal, '0'));
            view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(nueneto, '0'));
            view.down('#finalafectoId').setValue(Ext.util.Format.number(nueneto, '0'));
            view.down('#finaltotalivaId').setValue(Ext.util.Format.number(nueiva, '0'));
            view.down('#secuenciaId').setValue(secuencia);     

            grid.getStore().remove(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
      
    },

    seleccionarclienteguias: function(){

        var view = this.getGuiasdespachobuscarclientes();
        var viewIngresa = this.getDespachofactura();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            console.log(row.data.id);
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

            if (dias > 0){
        
            Ext.Ajax.request({
                url: preurl + 'facturas/calculofechas',
                params: {
                    factura: dias,
                    fechafactura : fechafactura
                },
                success: function(response){
                   var resp = Ext.JSON.decode(response.responseText);
                   var fecha_final= resp.fecha_final;
                   viewIngresa.down("#fechavencId").setValue(fecha_final);
                               
            }
           
            });
            };
            
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    seleccionarclienteguias2: function(){

        var view = this.getGuiasdespachobuscarclientes2();
        var viewIngresa = this.getFacturaguias();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            console.log(row.data.id);
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

            if (dias > 0){
        
            Ext.Ajax.request({
                url: preurl + 'facturas/calculofechas',
                params: {
                    factura: dias,
                    fechafactura : fechafactura
                },
                success: function(response){
                   var resp = Ext.JSON.decode(response.responseText);
                   var fecha_final= resp.fecha_final;
                   viewIngresa.down("#fechavencId").setValue(fecha_final);
                               
            }
           
            });
            };
            
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
       
    },

    buscarclientesguias : function(){

        var view = this.getGuiasdespachobuscarclientes()
        var st = this.getClientesStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : "Nombre"}
        st.load();
    },

     buscarclientesguias2 : function(){

        var view = this.getGuiasdespachobuscarclientes2()
        var st = this.getClientesStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : "Nombre"}
        st.load();
    },


    special: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.validarut()
        }
    },

    validarut: function(){

        var view =this.getFacturaguias();
        var rut = view.down('#rutId').getValue();
        var numero = rut.length;

       
        if(numero==0){
            var edit = Ext.create('Infosys_web.view.guiasdespacho.BuscarClientes');            
                  
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

    validarut21: function(){

        var view =this.getFacturaguias();
        var rut = view.down('#rutId').getValue();
        var numero = rut.length;

       
        if(numero==0){
            var edit = Ext.create('Infosys_web.view.guiasdespacho.BuscarClientes2');            
                  
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



    /*factguia: function(){

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
                    var view = Ext.create('Infosys_web.view.guiasdespacho.Facturaguias').show();
                    view.down('#numfacturaId').setValue(correlanue);
                    view.down('#nomdocumentoId').setValue(descripcion);
                    view.down('#tipodocumentoId').setValue(id);
                    
                }else{
                    Ext.Msg.alert('Correlativo YA Existe');
                    return;
                }



            }            
        });
    },*/


    factguia: function(){

        var nombre = 101; 

        response_certificado = Ext.Ajax.request({
        async: false,
        url: preurl + 'facturas/existe_certificado/'});
        var obj_certificado = Ext.decode(response_certificado.responseText);


        if(obj_certificado.existe == true){

            //buscar folio factura electronica
            // se buscan folios pendientes, o ocupados hace más de 4 horas

            response_folio = Ext.Ajax.request({
            async: false,
            url: preurl + 'facturas/folio_documento_electronico/'+nombre});  
            var obj_folio = Ext.decode(response_folio.responseText);
            //console.log(obj_folio); 
            nuevo_folio = obj_folio.folio;
            var view = Ext.create('Infosys_web.view.guiasdespacho.Facturaguias').show();
            if(nuevo_folio != 0){
                view.down('#numfacturaId').setValue(nuevo_folio);  
                view.down('#nomdocumentoId').setValue('FACTURA ELECTRONICA');  
                habilita = true;
            }else{
                Ext.Msg.alert('Atención','No existen folios disponibles');
                view.down('#numfacturaId').setValue('');  

                //return
            }

        }else{
                Ext.Msg.alert('Atención','No se ha cargado certificado');
                view.down('#numfacturaId').setValue('');  
        }

    },


    despachofactura: function(){
        var view = Ext.create('Infosys_web.view.guiasdespacho.Despachafactura').show();
        /*var nombre = 3;    
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
                    var view = Ext.create('Infosys_web.view.guiasdespacho.Despachafactura').show();
                    view.down('#numfacturaId').setValue(correlanue);
                    view.down('#nomdocumentoId').setValue(descripcion);
                    view.down('#tipodocumentoId').setValue(id);
                    
                }else{
                    Ext.Msg.alert('Correlativo YA Existe');
                    return;
                }



            }            
        });*/
    },
   
    fguias: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'guiasprincipalpendientes'});
    },

    mguias: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'guiasprincipal'});
    },

    buscarfact: function(){

        var view = this.getBuscarfacturasdespacho()
        var st = this.getGuiasdespachopendientes2Store()
        var opcion = view.down('#tipoSeleccionId').getValue()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
        st.load();
    },

    buscar: function(){

        var view = this.getGuiasprincipal()
        var st = this.getGuiasdespachoStore()
        var opcion = view.down('#tipoSeleccionId').getValue()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
        st.load();
    },

    encuentrafactura: function(){

        var view = this.getBuscarfacturasdespacho();
        var st = this.getFactura4Store()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : "Numero"}
        st.load();
    },

    
    cerrarguia: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },

   
});










