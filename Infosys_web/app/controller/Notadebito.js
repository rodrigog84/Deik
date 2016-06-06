Ext.define('Infosys_web.controller.Notadebito', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['notadebito.Items',
             'Notadebito',
             'Notadebitop',
             'Clientes',
             'Factura2',
             'Productosf',
             'Tipo_documento',
             'Sucursales_clientes',
             'Tipo_documento.Selector',
             'Tipo_documento.Selectornd'],

    models: ['Nota.Item',
             'Notadebito',
             'Notadebitop',
             'Tipo_documento',
             'Sucursales_clientes'],

    views: ['notadebito.Notadebito',
            'notadebito.Principal',
            'notadebito.BuscarClientes',
            'notadebito.BuscarProductos',
            'notadebito.BuscarSucursales',
            'notadebito.BuscarFacturas',
            'notadebito.Exportar'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
       ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{
        ref: 'notadebitoingresar',
        selector: 'notadebitoingresar'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{
        ref: 'notadebitoprincipal',
        selector: 'notadebitoprincipal'
    },{
        ref: 'notadebitobuscarclientes',
        selector: 'notadebitobuscarclientes'
    },{
        ref: 'buscarproductosnotadebito',
        selector: 'buscarproductosnotadebito'
    },{
        ref: 'buscarsucursalesclientesnotadebito',
        selector: 'buscarsucursalesclientesnotadebito'
    },{
        ref: 'buscarfacturasdebito',
        selector: 'buscarfacturasdebito'
    },{
        ref: 'formularioexportarnotadebito',
        selector: 'formularioexportarnotadebito'
    }

 
    ],
    //init es lo primero que se ejecuta en el controller
    //especia de constructor
    init: function() {
    	//el <<control>> es el puente entre la vista y funciones internas
    	//del controller
        this.control({

            'notadebitoingresar #rutId': {
                specialkey: this.special
            },

            'notadebitoingresar #numfactId': {
                specialkey: this.special2
            },

            'notadebitoprincipal button[action=mnotadebito]': {
                click: this.mnotadebito
            },
           
            'topmenus menuitem[action=meNotadebito]': {
                click: this.menotadebito
            },
            'notadebitoingresar button[action=notadebitobuscarclientes]': {
                click: this.notadebitobuscarclientes
            },
            'notadebitoingresar button[action=buscarfactura]': {
                click: this.buscarfactura
            },
            'notadebitoingresar button[action=buscarsucursalnotadebito]': {
                click: this.buscarsucursalnotadebito
            },
            'notadebitoingresar #tipodocumentoId': {
                select: this.selectItemdocuemento
            },

            'notadebitoingresar button[action=buscarvendedor]': {
                click: this.buscarvendedor
            },
            'notadebitoingresar button[action=buscarproductos]': {
                click: this.buscarproductos
            },
            'notadebitoingresar #nombreId': {
                click: this.special
            },

            'notadebitoingresar #netoId': {
                specialkey: this.calculaiva
            },            

            'notadebitoingresar button[action=validarut]': {
                click: this.validarut
            },
            'notadebitoingresar button[action=grabarnotadebito]': {
                click: this.grabarnotadebito
            },
            'notadebitoprincipal button[action=cerrarfactura]': {
                click: this.cerrarfactura
            },
            'notadebitoprincipal button[action=generarfacturapdf]': {
                click: this.generarfacturapdf
            },
            'notadebitobuscarclientes button[action=buscar]': {
                click: this.buscar
            },
            'notadebitobuscarclientes button[action=seleccionarcliente]': {
                click: this.seleccionarcliente
            },
            'buscarproductosnotadebito button[action=seleccionarproductos]': {
                click: this.seleccionarproductos
            },
            'buscarproductosnotadebito button[action=buscar]': {
                click: this.buscarp
            },
            'buscarsucursalesclientesnotadebito button[action=seleccionarsucursalcliente]': {
                click: this.seleccionarsucursalcliente
            },
            'notadebitoingresar #tipocondpagoId': {
                select: this.selecttipocondpago
            },
            'notadebitoingresar button[action=agregarItem]': {
                click: this.agregarItem
            }, 
            'notadebitoingresar button[action=eliminaritem]': {
                click: this.eliminaritem
            },           
            'buscarfacturasdebito button[action=seleccionarfactura]': {
                click: this.seleccionarfactura
            },
            'notadebitoprincipal button[action=exportarexcelnotadebito]': {
                click: this.exportarexcelnotadebito
            },
            'formularioexportarnotadebito button[action=exportarExcelFormulario]': {
                click: this.exportarExcelFormulario
            },
            'notadebitoprincipal button[action=buscarnota]': {
            click: this.buscarnota
            },
          

            
        });
    },

    special: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.buscarproductos()
        }
    },

    selectItemdocuemento: function() {
        

        var view =this.getNotadebitoingresar();
        var tipo_documento = view.down('#tipodocumentoId');
        var stCombo = tipo_documento.getStore();

        var record = stCombo.findRecord('id', tipo_documento.getValue()).data;
        //console.log(record);
        var nombre = (record.id);    
        if(nombre == 104){ // NOTA DE DEBITO ELECTRONICA

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


    
    calculaiva: function(){
        var view = this.getNotadebitoingresar();
        var neto = view.down('#netoId').getValue();
        var iva = (((neto * 19) / 100));
        var total = (neto + iva);
        view.down('#ivaId').setValue(iva);
        view.down('#totalId').setValue(total);
    },


    buscarnota: function(){        
        var view = this.getnotadebitoprincipal();
        var st = this.getnotadebitoStore()
        var opcion = view.down('#tipoSeleccionId').getValue()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : opcion}
        st.load();
    },

    exportarexcelnotadebito: function(){              
           Ext.create('Infosys_web.view.notadebito.Exportar').show();
    },

    exportarExcelFormulario: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getnotadebitoprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })

        var view =this.getFormularioexportarnotadebito()
        var viewnew =this.getnotadebitoprincipal()
        var fecha = view.down('#fechaId').getSubmitValue();
        var opcion = viewnew.down('#tipoSeleccionId').getValue()
        var nombre = viewnew.down('#nombreId').getSubmitValue();
        var fecha2 = view.down('#fecha2Id').getSubmitValue();

        if (fecha > fecha2) {
        
               Ext.Msg.alert('Alerta', 'Fechas Incorrectas');
            return;          

        };

        window.open(preurl + 'adminServicesExcel/exportarExcelnotadebito?cols='+Ext.JSON.encode(jsonCol)+'&fecha='+fecha+'&fecha2='+fecha2+'&opcion='+opcion+'&nombre='+nombre);
        view.close();
 
    },

    recalcularFinal: function(){
        var view = this.getNotadebitoingresar();
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

        var view = this.getNotadebitoingresar();
        var tipo_documento = view.down('#tipoDocumentoId');
        var rut = view.down('#rutId').getValue();
        var stItem = this.getNotadebitoItemsStore();;        
        var glosa = view.down('#glosaId').getValue();
        var neto = view.down('#netoId').getValue();
        var iva = view.down('#ivaId').getValue();
        var total = view.down('#totalId').getValue();
        var idfactura = view.down('#factId').getValue();
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

        if(idfactura){

        stItem.add(new Infosys_web.model.Nota.Item({
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
        totalfin = totalfin + total;
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

        //this.recalcularFinal();

        
        
    },

    eliminaritem: function() {
        var view = this.getNotadebitoingresar();
        var total = view.down('#finaltotalpostId').getValue();
        var neto = view.down('#finaltotalnetoId').getValue();
        var iva = view.down('#finaltotalivaId').getValue();
        var grid  = view.down('#itemsgridId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            var total = ((total) - (row.data.total));
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

        var view = this.getBuscarfacturasdebito();
        var viewIngresa = this.getNotadebitoingresar();
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

       var busca = this.getNotadebitoingresar()
       var nombre = busca.down('#id_cliente').getValue();

    
       if (nombre){
          var edit =  Ext.create('Infosys_web.view.notadebito.BuscarFacturas').show();
          var st = this.getFactura2Store();
          st.proxy.extraParams = {nombre : nombre};
          st.load();
       }else {
          Ext.Msg.alert('Alerta', 'Debe seleccionar Cliente.');
            return;
       }

    },

    menotadebito: function() {

        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'notadebitoprincipal'});
    },

    selecttipocondpago: function() {
        
        var view =this.getNotadebitoingresar();
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

        var view = this.getBuscarsucursalesclientesnotadebito();
        var viewIngresa = this.getNotadebitoingresar();
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

        var view = this.getNotadebitobuscarclientes()
        var st = this.getClientesStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre,
                                opcion : "Nombre"}
        st.load();
    },

    buscarsucursalnotadebito: function(){

       var busca = this.getNotadebitoingresar()
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

        var view = this.getNotadebitobuscarclientes();
        var viewIngresa = this.getNotadebitoingresar();
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
        var view = this.getNotadebitoprincipal();
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
             if(row.data.tipo_documento == 104){ // NOTA DE DEBITO ELECTRONICA
                window.open(preurl +'facturas/exportFePDF/' + row.data.id);   
             }else{
               window.open(preurl +'notadebito/exportnotadebitoPDF/?idfactura=' + row.data.id)
             }               
            
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

   
    grabarnotadebito: function() {

        var viewIngresa = this.getNotadebitoingresar();
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
        
        var fechavenc = viewIngresa.down('#fechavencId').getValue();
        var stItem = this.getNotadebitoItemsStore();
        var stnotadebito = this.getNotadebitoStore();


        if(numdocumento==0){
            Ext.Msg.alert('Ingrese Datos a La Factura');
            return;   
            }

        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });

        Ext.Ajax.request({
            url: preurl + 'notadebito/save',
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
                totalfacturas: viewIngresa.down('#finaltotalpostId').getValue()
            },
             success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var idfactura= resp.idfactura;
                 viewIngresa.close();
                 stnotadebito.load();
                 if(tipo_documento == 104){ // NOTA DE CREDITO ELECTRONICA
                    window.open(preurl +'facturas/exportFePDF/' + idfactura);   
                 }else{
                    window.open(preurl + 'notadebito/exportnotadebitoPDF/?idfactura='+idfactura);
                 }                 

            }
           
        });      
        
    },

    cerrarfactura: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
    },

    validarut: function(){

        var view =this.getNotadebitoingresar();
        var rut = view.down('#rutId').getValue();
        var numero = rut.length;

       
        if(numero==0){
            var edit = Ext.create('Infosys_web.view.notadebito.BuscarClientes');            
                  
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

    
    mnotadebito: function(){
        var view = Ext.create('Infosys_web.view.notadebito.Notadebito').show();
        /*var nombre = 16;    
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
                    var view = Ext.create('Infosys_web.view.notadebito.Notadebito').show();
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

        var view = this.getNotadebitoingresar();
        var st = this.getNotadebitopStore()
        var nombre = view.down('#facturaId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
        Ext.create('Infosys_web.view.notadebito.BuscarProductos').show();
    },

    seleccionarproductos: function(){

        var view = this.getBuscarproductosnotadebito();
        var viewIngresa = this.getNotadebitoingresar();
        var idfactura = viewIngresa.down('#factId').getValue();
        var grid  = view.down('grid');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            viewIngresa.down('#productoId').setValue(row.data.id_producto);
            var idproducto = (row.data.id_producto);
            var nomproducto = (row.data.nombre);

            Ext.Ajax.request({
                    url: preurl + 'notadebito/validaproducto',
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
        var view = this.getBuscarproductosnotadebito();
        var st = this.getProductosfStore()
        var nombre = view.down('#nombreId').getValue()
        st.proxy.extraParams = {nombre : nombre}
        st.load();
    },
  
});










