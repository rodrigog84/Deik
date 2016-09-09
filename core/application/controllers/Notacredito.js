Ext.define('Infosys_web.controller.Notacredito', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['productos.Items',
             'notacredito.Items',
             'Notacredito',
             'Notacreditop',
             'Clientes',
             'Factura2',
             'Productosf',
             'Productos',
             'Tipo_documento',
             'Sucursales_clientes',
             'Tipo_documento.Selector',
             'Tipo_documento.Selectornc'],

    models: ['Notacredito.Item',
             'Notacredito',
             'Notacreditop',
             'Nota.Item2',
             'Tipo_documento',
             'Productos.Item',
             'Sucursales_clientes'],

    views: ['notacredito.Notacredito',
            'notacredito.Principal',
            'notacredito.BuscarClientes',
            'notacredito.BuscarProductos',
            'notacredito.BuscarSucursales',
            'notacredito.BuscarFacturas',
            'notacredito.BuscarFacturas2',
            'notacredito.Exportar',
            'notacredito.Notacreditoglosa',
            'notacredito.BuscarClientes2'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
       ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'notacreditoingresar',
        selector: 'notacreditoingresar'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{
        ref: 'notacreditoprincipal',
        selector: 'notacreditoprincipal'
    },{
        ref: 'notacreditobuscarclientes',
        selector: 'notacreditobuscarclientes'
    },{
        ref: 'buscarproductosnotacredito',
        selector: 'buscarproductosnotacredito'
    },{
        ref: 'buscarsucursalesclientesnotacredito',
        selector: 'buscarsucursalesclientesnotacredito'
    },{
        ref: 'buscarfacturas',
        selector: 'buscarfacturas'
    },{
        ref: 'formularioexportarnotacredito',
        selector: 'formularioexportarnotacredito'
    },{
        ref: 'notacreditoglosa',
        selector: 'notacreditoglosa'
    },{
        ref: 'buscarfacturas2',
        selector: 'buscarfacturas2'
    },{
        ref: 'notacreditobuscarclientes2',
        selector: 'notacreditobuscarclientes2'
    }
   
    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({

            'notacreditoingresar #rutId': {
                specialkey: this.special
            },

            'notacreditoingresar #numfactId': {
                specialkey: this.special2
            },

            'notacreditoprincipal button[action=mnotacredito]': {
                click: this.mnotacredito
            },
            'notacreditoprincipal button[action=mnotacreditoglosa]': {
                click: this.mnotacreditoglosa
            },
           
            'topmenus menuitem[action=meNotacredito]': {
                click: this.meNotacredito
            },
            'notacreditoingresar button[action=notacreditobuscarclientes]': {
                click: this.notacreditobuscarclientes
            },
            'notacreditoingresar button[action=buscarfactura]': {
                click: this.buscarfactura
            },
            'notacreditoingresar button[action=buscarsucursalnotacredito]': {
                click: this.buscarsucursalnotacredito
            },
            'notacreditoingresar #tipodocumentoId': {
                select: this.selectItemdocuemento
            },


            'notacreditoglosa #tipodocumentoId': {
                select: this.selectItemdocuementoglosa
            },            

            'notacreditoingresar button[action=buscarvendedor]': {
                click: this.buscarvendedor
            },
            'notacreditoingresar button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'notacreditoingresar #nombreId': {
                click: this.special
            },

            'notacreditoingresar button[action=validarut]': {
                click: this.validarut
            },
            'notacreditoingresar button[action=grabarnotacredito]': {
                click: this.grabarnotacredito
            },
            'notacreditoprincipal button[action=cerrarfactura]': {
                click: this.cerrarfactura
            },
            'notacreditoprincipal button[action=generarfacturapdf]': {
                click: this.generarfacturapdf
            },
            'notacreditobuscarclientes button[action=buscar]': {
                click: this.buscar
            },
            'notacreditobuscarclientes button[action=seleccionarcliente]': {
                click: this.seleccionarcliente
            },
            'buscarproductosnotacredito button[action=seleccionarproductos]': {
                click: this.seleccionarproductos
            },
            'buscarproductosnotacredito button[action=buscar]': {
                click: this.buscarp
            },
            'buscarsucursalesclientesnotacredito button[action=seleccionarsucursalcliente]': {
                click: this.seleccionarsucursalcliente
            },
            'notacreditoingresar #tipocondpagoId': {
                select: this.selecttipocondpago
            },
            'notacreditoglosa #tipocondpagoId': {
                select: this.selecttipocondpago2
            },
            'notacreditoingresar button[action=agregarItem]': {
                click: this.agregarItem
            }, 
            'notacreditoingresar button[action=eliminaritem]': {
                click: this.eliminaritem
            },           
            'buscarfacturas button[action=seleccionarfactura]': {
                click: this.seleccionarfactura
            },
            'buscarfacturas button[action=buscarfac]': {
                click: this.buscarfac
            },
            'notacreditoprincipal button[action=exportarexcelnotacredito]': {
                click: this.exportarexcelnotacredito
            },
            'formularioexportarnotacredito button[action=exportarExcelFormulario]': {
                click: this.exportarExcelFormulario
            },
            'notacreditoprincipal button[action=buscarnota]': {
            click: this.buscarnota
            },
            'notacreditoglosa button[action=validarutglosa]': {
                click: this.validarutglosa
            },
            'notacreditobuscarclientes2 button[action=seleccionarcliente2]': {
                click: this.seleccionarcliente2
            },
            'notacreditoglosa button[action=buscarfactura2]': {
                click: this.buscarfactura2
            },
            'buscarfacturas2 button[action=seleccionarfactura2]': {
                click: this.seleccionarfactura2
            },
            'notacreditoglosa button[action=agregarItem2]': {
                click: this.agregarItem2
            },
            'notacreditoglosa #netoId': {
                specialkey: this.calculaiva
            },
            'notacreditoglosa button[action=grabarnotacredito2]': {
                click: this.grabarnotacredito2
            }         

            
        });
    },

    grabarnotacredito2: function() {

        var viewIngresa = this.getNotacreditoglosa();
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
        var docurelacionado = viewIngresa.down('#factId').getValue();
        var valorneto = viewIngresa.down('#finaltotalnetoId').getValue();
        var valoriva = viewIngresa.down('#finaltotalivaId').getValue();
        var totalfactura= valorneto + valoriva;
     
        
        var fechavenc = viewIngresa.down('#fechavencId').getValue();
        var stItem = this.getNotacreditoItemsStore();
        var stnotacredito = this.getNotacreditoStore();

        if(numdocumento==0){
            Ext.Msg.alert('Ingrese Datos a La Factura');
            return;   
        }

        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'notacredito/save2',
            params: {
                idcliente: idcliente,
                idfactura: idfactura,
                numdocumento: numdocumento,
                docurelacionado: docurelacionado,
                idsucursal: idsucursal,
                idcondventa: idcondventa,
                idtipo: idtipo,
                items: Ext.JSON.encode(dataItems),
                vendedor : vendedor,
                numfactura_asoc : numfactura_asoc,
                fechafactura : fechafactura,
                fechavenc: fechavenc,
                tipodocumento : tipo_documento,
                netofactura: viewIngresa.down('#finaltotalnetoId').getValue(),
                ivafactura: viewIngresa.down('#finaltotalivaId').getValue(),
                afectofactura: viewIngresa.down('#finalafectoId').getValue(),
                totalfacturas: totalfactura
            },
             success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var idfactura= resp.idfactura;
                 viewIngresa.close();
                 stnotacredito.load();
                 if(tipo_documento == 102){ // NOTA DE CREDITO ELECTRONICA
                    window.open(preurl +'facturas/exportFePDF/' + idfactura);   
                 }else{
                    window.open(preurl + 'facturas/exportPDF/?idfactura='+idfactura);
                    //window.open(preurl + 'notadebito/exportnotadebitoPDF/?idfactura='+idfactura);
                 }                  
                 //window.open(preurl + 'notadebito/exportnotadebitoPDF/?idfactura='+idfactura);
                 
            }
           
        });      
        
    },

    calculaiva: function(){
        var view = this.getNotacreditoglosa();
        var neto = view.down('#netoId').getValue();
        var iva = (((neto * 19) / 100));
        var total = (neto + iva);
        view.down('#ivaId').setValue(iva);
        view.down('#totalId').setValue(total);
    },

    agregarItem2: function() {

        var view = this.getNotacreditoglosa();
        var tipo_documento = view.down('#tipoDocumentoId');
        var rut = view.down('#rutId').getValue();
        var stItem = this.getNotacreditoItemsStore();;        
        var glosa = view.down('#glosaId').getValue();
        var neto = view.down('#netoId').getValue();
        var iva = view.down('#ivaId').getValue();
        var total = view.down('#totalId').getValue();
        var idfactura = view.down('#factId').getValue();
        var totfactura = view.down('#totfactId').getValue();
        var totalfin = view.down('#finaltotalpostId').getValue();
        var netofin = view.down('#finalafectoId').getValue();
        var ivafin = view.down('#finaltotalivaId').getValue();

        if(!glosa){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Glosa.');
            return false;
        }; 
        
        if(neto==0 ){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Valores.');
            return false;
        }; 
        
        if(iva==0 ){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Valores.');
            return false;
        }; 

        if(total==0 ){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Valores.');
            return false;
        };        
        
                   
        if(rut.length==0 ){  // se validan los datos sólo si es factura
            Ext.Msg.alert('Alerta', 'Debe Ingresar Datos a la Factura.');
            return false;
        };   

        if(totfactura){

            totalfin = totalfin + total;
            ivafin = ivafin + iva;
            netofin = netofin + neto;
      

        
            stItem.add(new Infosys_web.model.Nota.Item2({
                    glosa: glosa,
                    neto: neto,
                    iva: iva,
                    total: total             
            }));
       
       
        cero="";
        cero2=0;
        view.down('#glosaId').setValue(cero);
        view.down('#netoId').setValue(cero2);
        view.down('#ivaId').setValue(cero2);
        view.down('#totalId').setValue(cero2);
        
        view.down('#finaltotalId').setValue(Ext.util.Format.number(totalfin, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(totalfin, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(netofin, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(ivafin, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(netofin, '0'));
                
        }else{

            Ext.Msg.alert('Alerta', 'Debe Seleccionar un Factura');
            return false;           

        };

             
    },

    seleccionarfactura2 : function(){

        var view = this.getBuscarfacturas2();
        var viewIngresa = this.getNotacreditoglosa();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#facturaId').setValue(row.data.id);
            viewIngresa.down('#numfactId').setValue(row.data.num_factura);
            viewIngresa.down('#totfactId').setValue(row.data.totalfactura);
            viewIngresa.down('#factId').setValue(row.data.id);
            view.close();
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }


        

    },


     buscarfactura2 : function() {

       var busca = this.getNotacreditoglosa()
       var nombre = busca.down('#id_cliente').getValue();
           
       if (nombre){
          var edit =  Ext.create('Infosys_web.view.notacredito.BuscarFacturas2').show();
          var st = this.getFactura2Store();
          st.proxy.extraParams = {nombre : nombre};
          st.load();
       }else {
          Ext.Msg.alert('Alerta', 'Debe seleccionar Cliente.');
            return;
       }

    },


    seleccionarcliente2: function(){

        var view = this.getNotacreditobuscarclientes2();
        var viewIngresa = this.getNotacreditoglosa();
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
        }
       
    },

    validarutglosa : function(){

        var view =this.getNotacreditoglosa();
        var rut = view.down('#rutId').getValue();
        var numero = rut.length;

       
        if(numero==0){
            var edit = Ext.create('Infosys_web.view.notacredito.BuscarClientes2');            
                  
        }else{     
        

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

    mnotacreditoglosa: function(){
        var view = Ext.create('Infosys_web.view.notacredito.Notacreditoglosa').show();
        /*var nombre = 11;    
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
                    var view = Ext.create('Infosys_web.view.notacredito.Notacreditoglosa').show();
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

    special: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.buscarproductos()
        }
    },


    selectItemdocuemento: function() {
        

        var view =this.getNotacreditoingresar();
        var tipo_documento = view.down('#tipodocumentoId');
        var stCombo = tipo_documento.getStore();

        var record = stCombo.findRecord('id', tipo_documento.getValue()).data;
        //console.log(record);
        var nombre = (record.id);    
        if(nombre == 102){ // NOTA DE CREDITO ELECTRONICA

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
        this.recalcularFinal();

    },


    selectItemdocuementoglosa: function() {
        

        var view =this.getNotacreditoglosa();
        var tipo_documento = view.down('#tipodocumentoId');
        var stCombo = tipo_documento.getStore();

        var record = stCombo.findRecord('id', tipo_documento.getValue()).data;
        //console.log(record);
        var nombre = (record.id);    
        if(nombre == 102){ // NOTA DE CREDITO ELECTRONICA

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
        this.recalcularFinal2();

    },

    buscarnota: function(){
        
        var view = this.getNotacreditoprincipal();
        var st = this.getNotacreditoStore()
        var opcion = view.down('#tipoSeleccionId').getValue()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
        st.load();
    },

    buscarfac: function(){
        
        var view = this.getBuscarfacturas();
        var st = this.getFactura2Store()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : "Numero"}
        st.load();
    },

    exportarexcelnotacredito: function(){
              
           Ext.create('Infosys_web.view.notacredito.Exportar1').show();
    },

    exportarExcelFormulario: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getNotacreditoprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })

        var view =this.getFormularioexportarnotacredito()
        var viewnew =this.getNotacreditoprincipal()
        var fecha = view.down('#fechaId').getSubmitValue();
        var opcion = viewnew.down('#tipoSeleccionId').getValue()
        var nombre = viewnew.down('#nombreId').getSubmitValue();
        var fecha2 = view.down('#fecha2Id').getSubmitValue();

        if (fecha > fecha2) {
        
               Ext.Msg.alert('Alerta', 'Fechas Incorrectas');
            return;          

        };

        window.open(preurl + 'adminServicesExcel/exportarExcelNotacredito?cols='+Ext.JSON.encode(jsonCol)+'&fecha='+fecha+'&fecha2='+fecha2+'&opcion='+opcion+'&nombre='+nombre);
        view.close();
 
    },


    recalcularFinal2: function(){
        var view = this.getNotacreditoglosa();
        var stItem = this.getProductosItemsStore();
        var pretotal = 0;
        var total = 0;
        
        stItem.each(function(r){
            pretotal = (parseInt(pretotal) + parseInt(r.data.totaliva))
          
        });
        total = pretotal;
        neto = (total / 1.19);
        afecto = neto;
        iva = total - neto;
        
        //iva = (total - afecto);
        view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(total, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));
          
    },


    recalcularFinal: function(){
        var view = this.getNotacreditoingresar();
        var stItem = this.getProductosItemsStore();
        var pretotal = 0;
        var total = 0;
        
        stItem.each(function(r){
            pretotal = ((pretotal) + (r.data.totaliva))
          
        });
        total = pretotal;
        neto = (total / 1.19);
        afecto = neto;
        iva = total - neto;
        
        //iva = (total - afecto);
        view.down('#finaltotalId').setValue(Ext.util.Format.number(total, '0,000'));
        view.down('#finaltotalpostId').setValue(Ext.util.Format.number(total, '0'));
        view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(neto, '0'));
        view.down('#finaltotalivaId').setValue(Ext.util.Format.number(iva, '0'));
        view.down('#finalafectoId').setValue(Ext.util.Format.number(afecto, '0'));
          
    },

    changedctofinal: function(){
        this.recalcularFinal();
    },


    agregarItem: function() {

        var view = this.getNotacreditoingresar();
        var tipo_documento = view.down('#tipoDocumentoId');
        var rut = view.down('#rutId').getValue();
        var stItem = this.getProductosItemsStore();
        var producto = view.down('#productoId').getValue();
        var nomproducto = view.down('#nomproductoId').getValue();
        var cantidad = view.down('#cantidadId').getValue();
        var cantidadori = view.down('#cantidadOriginalId').getValue();
        var idfactura = view.down('#factId').getValue();
        var idfacturaval = view.down('#factactId').getValue();
        var numfactura = view.down('#numfactId').getValue();
        var precio = ((view.down('#precioId').getValue()));
        var precioun = ((view.down('#precioId').getValue())/1.19);
        var total = ((cantidad * precio));
        var neto = ((total / 1.19));
        var exists = 0;
        var iva = (total - neto );
        var totaliva = (total);
       
        var totalfin = view.down('#finaltotalpostId').getValue();
        var netofin = view.down('#finalafectoId').getValue();
        var ivafin = view.down('#finaltotalivaId').getValue();
        
        if(precio==0 || precio == '' || precio == null){
            Ext.Msg.alert('Alerta', 'Debe Ingresar Precio Producto');
            return false;
        };

        if (cantidadori){
            if(cantidad>cantidadori){
                Ext.Msg.alert('Alerta', 'Cantidad Ingresada de Productos Supera El Stock');
                return false;
            };

        };

        if(cantidad==0 || cantidad == '' || cantidad == null){
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
                    idfactura : idfacturaval
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
                    view.down('#cantidadId').setValue(cero2);
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
                        view.down('#cantidadId').setValue(cero2);
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
                        id_producto: producto,
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

            if (numfactura){

            stItem.add(new Infosys_web.model.Productos.Item({
                        id: producto,
                        id_producto: producto,
                        nombre: nomproducto,
                        precio: precioun,
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
                  
                    view.down('#finaltotalId').setValue(Ext.util.Format.number(totalfin, '0,000'));
                    view.down('#finaltotalpostId').setValue(Ext.util.Format.number(totalfin, '0'));
                    view.down('#finaltotalnetoId').setValue(Ext.util.Format.number(netofin, '0'));
                    view.down('#finaltotalivaId').setValue(Ext.util.Format.number(ivafin, '0'));
                    view.down('#finalafectoId').setValue(Ext.util.Format.number(netofin, '0'));
          
            }else{

            Ext.Msg.alert('Alerta', 'Debe Seleccionar un Factura');
            return false;
            
            };           

        };

        //this.recalcularFinal();

        
        
    },

    eliminaritem: function() {
        var view = this.getNotacreditoingresar();
        var total = view.down('#finaltotalpostId').getValue();
        var neto = view.down('#finaltotalnetoId').getValue();
        var iva = view.down('#finaltotalivaId').getValue();
        var grid  = view.down('#itemsgridId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            console.log(total);
            var total = ((total) - (row.data.totaliva));
            console.log(row.data.totaliva);
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

    seleccionarfactura: function(){

        var view = this.getBuscarfacturas();
        var viewIngresa = this.getNotacreditoingresar();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#facturaId').setValue(row.data.id);
            viewIngresa.down('#numfactId').setValue(row.data.num_factura);
            viewIngresa.down('#totfactId').setValue(row.data.totalfactura);
            viewIngresa.down('#factId').setValue(row.data.id);
            var tipo_documento = viewIngresa.down('#tipodocumentoId').getValue();

            if(tipo_documento == 102){
                viewIngresa.down('#tipoNotaCredito').setDisabled(false);
            }            
            view.close();
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

    validafactura: function() {

        Ext.Msg.alert('Alerta', 'Factura no Existe');
            return;

    },

    buscarfactura : function() {

       var busca = this.getNotacreditoingresar()
       var nombre = busca.down('#id_cliente').getValue();

    
       if (nombre){
          var edit =  Ext.create('Infosys_web.view.notacredito.BuscarFacturas').show();
          var st = this.getFactura2Store();
          st.proxy.extraParams = {nombre : nombre};
          st.load();
       }else {
          Ext.Msg.alert('Alerta', 'Debe seleccionar Cliente.');
            return;
       }

    },

    meNotacredito: function() { 
    
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'notacreditoprincipal'});
    },

    selecttipocondpago: function() {
        
        var view =this.getNotacreditoingresar();
        var condicion = view.down('#tipocondpagoId');
        var fechafactura = view.down('#fechafacturaId').getValue();
                

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
       
            
    },

    selecttipocondpago2: function() {
        
        var view =this.getNotacreditoglosa();
        var condicion = view.down('#tipocondpagoId');
        var fechafactura = view.down('#fechafacturaId').getValue();
                

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
       
            
    },

    seleccionarsucursalcliente: function(){

        var view = this.getBuscarsucursalesclientesnotacredito();
        var viewIngresa = this.getNotacreditoingresar();
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

        var view = this.getNotacreditobuscarclientes()
        var st = this.getClientesStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : "Nombre"}
        st.load();
    },

    buscarsucursalnotacredito: function(){

       var busca = this.getNotacreditoingresar()
       var nombre = busca.down('#id_cliente').getValue();
       
       if (nombre){
         var edit = Ext.create('Infosys_web.view.ventas.BuscarSucursales').show();
          var st = this.getSucursales_clientesStore();
          st.proxy.extraParams = {nombre : nombre};
          st.load();
       }else {
          Ext.Msg.alert('Alerta', 'Debe seleccionar Cliente.');
            return;
       }
      
    },

    seleccionarcliente: function(){

        var view = this.getNotacreditobuscarclientes();
        var viewIngresa = this.getNotacreditoingresar();
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
        }
       
    },
    

    generarfacturapdf: function(){
        var view = this.getNotacreditoprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
             if(row.data.tipo_documento == 102){ // NOTA DE CREDITO ELECTRONICA
                window.open(preurl +'facturas/exportFePDF/' + row.data.id);   
             }else{
                if (row.data.forma==0){
                window.open(preurl +'facturas/exportPDF/?idfactura=' + row.data.id)
                };
                if (row.data.forma==1){
                window.open(preurl +'facturas/exportPDF/?idfactura=' + row.data.id)
                };
                if (row.data.forma==2){
                window.open(preurl +'facturaganado/exportfacturaganadoPDF/?idfactura=' + row.data.id)
                };
             }            
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    
    grabarnotacredito: function() {

        var viewIngresa = this.getNotacreditoingresar();
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
        
        var fechavenc = viewIngresa.down('#fechavencId').getValue();
        var stItem = this.getProductosItemsStore();
        var stNotacredito = this.getNotacreditoStore();

        var netofactura = viewIngresa.down('#finaltotalnetoId').getValue();
        var ivafactura =  viewIngresa.down('#finaltotalivaId').getValue();
        var afectofactura = viewIngresa.down('#finalafectoId').getValue();
        var totalfactura = ( netofactura + ivafactura );       


        if(numdocumento==0){
            Ext.Msg.alert('Ingrese Datos a La Factura');
            return;   
        }


        var tipo_nota_credito = 0;
        if(tipo_documento == 102){
            var tipo_nota_credito = viewIngresa.down('#tipoNotaCredito').getValue();
            if(tipo_nota_credito==0 || tipo_nota_credito == null || tipo_nota_credito == ''){
                Ext.Msg.alert('Atención','Debe seleccionar tipo de nota de crédito');
                return;   
                }


        }            

        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'notacredito/save',
            params: {
                idcliente: idcliente,
                idfactura: idfactura,
                numdocumento: numdocumento,
                idsucursal: idsucursal,
                idcondventa: idcondventa,
                idtipo: idtipo,
                items: Ext.JSON.encode(dataItems),
                vendedor : vendedor,
                numfactura_asoc : numfactura_asoc,
                fechafactura : fechafactura,
                fechavenc: fechavenc,
                tipodocumento : tipo_documento,
                netofactura: viewIngresa.down('#finaltotalnetoId').getValue(),
                ivafactura: viewIngresa.down('#finaltotalivaId').getValue(),
                afectofactura: viewIngresa.down('#finalafectoId').getValue(),
                totalfacturas: totalfactura,
                tipo_nota_credito : tipo_nota_credito
            },
             success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var idfactura= resp.idfactura;
                 viewIngresa.close();
                 stNotacredito.load();
                 if(tipo_documento == 102){ // NOTA DE CREDITO ELECTRONICA
                    window.open(preurl +'facturas/exportFePDF/' + idfactura);   
                 }else{
                    window.open(preurl + 'facturas/exportPDF/?idfactura='+idfactura);
                 }                 
                 

            }
           
        });      
        
    },

    cerrarfactura: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },
   

    validarut: function(){

        var view =this.getNotacreditoingresar();
        var rut = view.down('#rutId').getValue();
        var numero = rut.length;

       
        if(numero==0){
            var edit = Ext.create('Infosys_web.view.notacredito.BuscarClientes');            
                  
        }else{
        //console.log(dig);

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


    
    mnotacredito: function(){

        Ext.create('Infosys_web.view.notacredito.Notacredito').show();
        /*var nombre = 11;    
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
                    var view = Ext.create('Infosys_web.view.notacredito.Notacredito').show();
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

    buscarvendedor: function(){

        Ext.create('Infosys_web.view.vendedores.BuscarVendedor').show();
    },

    buscarproductos: function(){

        var view = this.getNotacreditoingresar();
        var st = this.getNotacreditopStore()
        var nombre = view.down('#facturaId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
        Ext.create('Infosys_web.view.notacredito.BuscarProductos').show();
    },

    seleccionarproductos: function(){

        var view = this.getBuscarproductosnotacredito();
        var viewIngresa = this.getNotacreditoingresar();
        //var idfactura = viewIngresa.down('#factId').getValue();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#productoId').setValue(row.data.id_producto);
            var idproducto = (row.data.id_producto);
            var nomproducto = (row.data.nombre);
            var idfactura = (row.data.id_factura);
            var pventa = (row.data.p_venta);

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
                      viewIngresa.down('#precioId').setValue(pventa);
                      viewIngresa.down('#factactId').setValue(row.data.id_factura);
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

     buscarp: function(){
        var view = this.getBuscarproductosnotacredito();
        var st = this.getNotacreditopStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {codigo : nombre}
        st.load();
    },
  
});










