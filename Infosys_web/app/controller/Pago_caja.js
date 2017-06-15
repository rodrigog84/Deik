Ext.define('Infosys_web.controller.Pago_caja', {
    extend: 'Ext.app.Controller',

    //asociamos vistas, models y stores al controller

    stores: ['Venta',
             'Tipo_documento',
             'Cond_pago',
             'Preventa_detalle',
             'recaudacion.Items',
             'Preventa',
             'Sucursales_clientes'
             ],

    models: ['Venta.Item',
              'Cond_pag',
              'Preventa_detalle',
              'Recaudacion',
              'Recaudacion_detalle',
              'recaudacion.Item',
              'Factura'],

    views: ['Pago_caja.Genera_pago',
            'Pago_caja.Principal',
            'Pago_caja.Facturas',
            'Pago_caja.Apertura',
            'Pago_caja.BuscarSucursales',
            'Pago_caja.Observaciones'],

    //referencias, es un alias interno para el controller
    //podemos dejar el alias de la vista en el ref y en el selector
    //tambien, asi evitamos enredarnos
    refs: [{
    
       ref: 'pagocajaprincipal',
        selector: 'pagocajaprincipal'
    },{    
        ref: 'generapagoingresar',
        selector: 'generapagoingresar'
    },{
        ref: 'topmenus',
        selector: 'topmenus'
    },{    
        ref: 'panelprincipal',
        selector: 'panelprincipal'
    },{    
        ref: 'facturasvizualizar',
        selector: 'facturasvizualizar'
    },{    
        ref: 'aperturacaja',
        selector: 'aperturacaja'
    },{    
        ref: 'buscarsucursalesfactura',
        selector: 'buscarsucursalesfactura'
    },{    
        ref: 'observacionesfacturas',
        selector: 'observacionesfacturas'
    }
    
    ],
    
    init: function() {
    	
        this.control({

            'topmenus menuitem[action=mpagocaja]': {
                click: this.mpagocaja
            },
            'pagocajaprincipal button[action=generarpago]': {
                click: this.generarpago
            },
            'pagocajaprincipal button[action=exportarexcelpagocaja]': {
                click: this.exportarexcelpagocaja
            },
            'pagocajaprincipal button[action=cerrarcajaventa]': {
                click: this.cerrarcajaventa
            },
            'generapagoingresar #tipoDocumentoId': {
                select: this.selectItemdocuemento
            },
            'generapagoingresar #condpagoId': {
                select: this.selectcondpago
            },
            'generapagoingresar button[action=visualizar]': {
                click: this.grabarfactura                
            },
            'facturasvizualizar button[action=salir]': {
                click: this.salir
            },
            'generapagoingresar #cajaId': {
                select: this.selectItemcaja                
            },
            'generapagoingresar #valorcancelaId': {
                specialkey: this.special,
                blur: this.selectItemcancela                    
            },
            'generapagoingresar #numfacturaId': {
                specialkey: this.special9,
                blur: this.valnum                   
            },
           
            'generapagoingresar button[action=agregarrecaudacion]': {
                click: this.agregarrecaudacion
            },
            'generapagoingresar button[action=eliminaritem]': {
                click: this.eliminaritem
            },
            'generapagoingresar button[action=grabarecaudacion]': {
                click: this.grabarecaudacion
            },
            'aperturacaja button[action=mpagocaja2]': {
                click: this.mpagocaja2
            },
            'aperturacaja #cajeroId': {
                select: this.aperturacaja  
            },
            'facturasvizualizar button[action=grabarfactura]': {
                click: this.grabarfactura
            },
            'facturasvizualizar button[action=buscarsucursalfactura]': {
                click: this.buscarsucursalfactura
            },
            'buscarsucursalesfactura button[action=seleccionarsucursalfact]': {
                click: this.seleccionarsucursalfact
            },
            'pagocajaprincipal button[action=generaticket]': {
                click: this.generaticket
            },
            'pagocajaprincipal #nombresId': {
                specialkey: this.special5
            },
            'facturasvizualizar button[action=observaciones]': {
                click: this.observaciones
            },
            'observacionesfacturas button[action=ingresaobs]': {
                click: this.ingresaobs
            },
            'observacionesfacturas button[action=validar]': {
                click: this.validarut
            },
            'observacionesfacturas #rutId': {
                specialkey: this.special6
            }

        });
    },

    special9: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.valnum()
        }
    },

    valnum: function(f,e){

        //if (e.getKey() == e.ENTER) {

        var view = this.getGenerapagoingresar();
        var numdoc = view.down('#numfacturaId').getValue();
        var tipdoc = view.down('#tipoDocumentoId').getValue();

        console.log(numdoc);
        
        Ext.Ajax.request({
            url: preurl + 'facturasvizualiza/validadocumento',
            params: {
                numdoc: numdoc,
                tipdoc: tipdoc
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {
                 view.down('#numfacturaId').setValue(resp.numdoc);
                 Ext.Msg.alert('Alerta', 'Correlativo para Documento ya Existe');
                 return;
                };
            }
           
        }); 
    //};        
          
    },


    special6: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.validarut()
        }
    },

    ingresaobs: function(){

        var view = this.getObservacionesfacturas();
        var viewIngresar = this.getFacturasvizualizar();                
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


   validarut: function(){

        var view = this.getObservacionesfacturas();
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


    observaciones: function(){

        var viewIngresa = this.getFacturasvizualizar();
        var numfactura = viewIngresa.down('#numfacturaId').getValue();
        var view = Ext.create('Infosys_web.view.Pago_caja.Observaciones').show();
        view.down("#rutId").focus();
        view.down("#FactId").setValue(numfactura);

    },

    special5: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.generaticket()
        }
    },    

    aperturacaja: function(){

         var view = this.getAperturacaja();
         var cajero = view.down('#cajeroId').getValue();
         var caja = view.down('#cajaId').getValue();
         var fecha = view.down('#fechaaperturaId').getValue();
       
         if (cajero){

            Ext.Ajax.request({
            url: preurl + 'genera_pagos/leer',
            params: {
                cajero: cajero,
                caja: caja,
                fecha: fecha
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var caja= resp.caja;
                if (resp.success == true) {
                    view.down('#efectuvoId').setValue(caja.efectivo);
                    view.down('#totchequesId').setValue(caja.cheques);
                    view.down('#otrosmontosId').setValue(caja.otros);
                    view.down('#recaudaId').setValue(caja.id);
                    
                }else{

                     view.down("#efectuvoId").focus();
                    
                         


                }
            }
           
            });            
        };

    },

    seleccionarsucursalfact: function(){

        var view = this.getBuscarsucursalesfactura();
        var viewIngresa = this.getFacturasvizualizar();
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

    buscarsucursalfactura: function(){

       var busca = this.getFacturasvizualizar()
       var nombre = busca.down('#id_cliente').getValue();
       
       if (nombre){
         var edit = Ext.create('Infosys_web.view.Pago_caja.BuscarSucursales').show();
          var st = this.getSucursales_clientesStore();
          st.proxy.extraParams = {nombre : nombre};
          st.load();
       }else {
          Ext.Msg.alert('Alerta', 'Debe seleccionar ClienteS.');
            return;
       }
      
    },

    grabarfactura: function() {
        //var viewIngresa = this.getFacturasvizualizar();

        var view = this.getGenerapagoingresar();
        var bolEnable = true;
        view.down('#vizualiza').setDisabled(bolEnable);
        var fpago = view.down('#fpagoId').getValue();
        var ticketid =  view.down('#idticketId').getValue();
        var idcliente = view.down('#id_cliente').getValue();
        var tipo_documento = view.down('#tipoDocumentoId');
        var tipodoc = view.down('#tipoDocumentoId').getValue();
        var idsucursal = view.down('#id_sucursalID').getValue();
        var vendedor = view.down('#VendedorId').getValue();
        var idvendedor = view.down('#idVendedorId').getValue();
        var ordencompra = view.down('#ordencompraId').getValue();
        var numfactura = view.down('#numfacturaId').getValue();
        var fechafactura = view.down('#fechafacturaId').getValue(); 
        var permite = "SI";                

        var fechavenc = view.down('#fechavencId').getValue();
        var permite = view.down('#permiteId').getValue();
        //var observa = viewIngresa.down('#observaId').getValue();
        var idobserva = view.down('#obsId').getValue();        
        var stPreventa = this.getPreventaStore();
        var formapago = view.down('#tipocondpagoId').getValue();
        var numcheque = view.down('#numchequeId').getValue()
        var preventa = view.down('#idticketId').getValue();
        var idobserva = view.down('#obsId').getValue();        
        var recItem = this.getRecaudacionItemsStore();
        var valida = view.down('#permiteId').getValue();
        var valida2 = view.down('#valida2Id').getValue();


        if (valida == "SI"){
           Ext.Msg.alert('Alerta', 'Documento ya Generado');
           return;       
        }

        if (tipodoc == 2 & valida2 == "NO"){

            Ext.Msg.alert('Alerta', 'Debe Cancelar Documento');
            return; 
            

        }
       
        if (!formapago){            
            var formapago = 1;
        }

        if (tipo_documento.getValue()== 2){            
            permite = "SI";
        };

       
        if (tipo_documento.getValue()== 1){
            
            var tipodocumento = 1;
        }

        if (tipo_documento.getValue()== 2){
            
            var tipodocumento = 2;
        }

        if (tipo_documento.getValue()== 3){
            
            var tipodocumento = 3;
        }
      
        if (tipo_documento.getValue()== 101){
            
            var tipodocumento = 101;
        }

        if (tipo_documento.getValue()== 103){
            
            var tipodocumento = 103;
        }

        if (tipo_documento.getValue()== 105){
            
            var tipodocumento = 105;
        }

        if(vendedor==0  && tipo_documento.getValue() == 1){
            Ext.Msg.alert('Ingrese Datos del Vendedor');
            return;   
        }


        if(numfactura==0){
            Ext.Msg.alert('Ingrese Datos a La Factura');
            return;   
        }

        var st = this.getPreventa_detalleStore();
        var ticket = view.down('#idticketId').getValue();
        st.proxy.extraParams = {ticket : ticket}
        st.load();
      
        var stItem = this.getPreventa_detalleStore();
        var dataItems = new Array();
        stItem.each(function(r){
            dataItems.push(r.data)
        });
        var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Grabando..."});
        myMask.show();   
        Ext.Ajax.request({            
            url: preurl + 'facturasvizualiza/save',
            params: {
                idcliente: idcliente,
                idticket: ticketid,
                idsucursal: idsucursal,
                items: Ext.JSON.encode(dataItems),
                ordencompra: ordencompra,
                idvendedor : idvendedor,
                //observacion: observa,
                idobserva: idobserva,
                preventa: preventa,
                fpago : fpago,
                numfactura : numfactura,
                fechafactura : fechafactura,
                fechavenc : fechavenc, 
                tipodocumento : tipodocumento,
                netofactura: view.down('#netoId').getValue(),
                ivafactura: view.down('#ivaId').getValue(),
                afectofactura: view.down('#afectoId').getValue(),
                totalfacturas: view.down('#totalId').getValue(),
                totalfacturasUnformat: view.down('#finaltotalUnformat').getValue(),
                formapago: formapago,
                numcheque: numcheque
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                var idfactura= resp.idfactura;
                myMask.hide();
                view.down('#facturaId').setValue(idfactura);
                var valida2 = "SI";
                view.down('#valida2Id').setValue(valida2);
                       
                stPreventa.load();
                window.open(preurl + 'facturas/exportPDF/?idfactura='+idfactura);

            }
           
        });

    },

    eliminaritem: function() {
        var view = this.getGenerapagoingresar();
        var grid  = view.down('#recaudacionId');
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelection()[0];
            grid.getStore().remove(row);
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },


    grabarecaudacion: function() {

        var view = this.getGenerapagoingresar();
        var idcajero = view.down('#cajeroId').getValue();
        var idcaja = view.down('#cajaId').getValue();
        var fechatransac =  view.down("#fechafacturaId").getValue();
        var valida2 =  view.down("#valida2Id").getValue();
        var documento = view.down('#tipoDocumentoId');
        var ordencompra = view.down('#ordencompraId');
        var stCombo = documento.getStore();
        var record = stCombo.findRecord('id', documento.getValue()).data;
        var docum = (record.id);

        var numdoc = view.down('#numfacturaId').getValue();
        var idfactura = view.down('#facturaId').getValue();
        var comprobante = view.down('#comprobanteId').getValue();
        var idcliente = view.down('#id_cliente').getValue();
        var ticketid =  view.down('#idticketId').getValue();
        var ticket =  view.down('#ticketId').getValue();
        var dataItems = new Array();
        var stItem = this.getRecaudacionItemsStore();
        var preventa = this.getPreventaStore();
        var valida = view.down('#validaId').getValue();
        var viewedit = this.getPagocajaprincipal();
        var contado =  view.down('#contadoId').getValue();
        var cheques =  view.down('#chequesId').getValue();
        var otros =  view.down('#otrosId').getValue();
        var recauda =  view.down('#recaudaId').getValue();
        var vali = view.down('#validapagoId').getValue();
        var valor1 =  view.down('#valortotalId').getValue();
        var valor2 =  view.down('#totalId').getValue();
        var viewedit = this.getPagocajaprincipal();             
        viewedit.down('#efectivonId').setValue(contado);
        viewedit.down('#efectivoId').setValue(Ext.util.Format.number(contado, '0,00'));        
        viewedit.down('#totchequesId').setValue(Ext.util.Format.number(cheques, '0,00'));
        viewedit.down('#totchequesnId').setValue(cheques);
        viewedit.down('#otrosmontosnId').setValue(otros);
        viewedit.down('#otrosmontosId').setValue(Ext.util.Format.number(otros, '0,00'));
        
        if (valor1 != valor2){
              Ext.Msg.alert('Alerta', 'Comprobante no cuadra ');
              return;
        };

        stItem.each(function(r){
            dataItems.push(r.data)
        });

         if (valida==0){
               Ext.Msg.alert('Alerta', 'Debe Cancelar Documento');
               return;                    
         }else{

            Ext.Ajax.request({
                url: preurl + 'recaudacion/averigua',
                params: {
                    ticketid : ticketid
                },
                success: function(response){
                    var text = response.responseText;
                    var resp = Ext.JSON.decode(response.responseText);
                    var iddocumento = resp.iddocumento;
                    if (iddocumento != 0){

                    if (documento.getValue()== "BOLETA"){            
                        imprime = "SI";
                    };

                   
                    Ext.Ajax.request({
                        url: preurl + 'recaudacion/save',
                        params: {
                            num_comprobante : comprobante,
                            fecha : fechatransac,
                            documento: docum,
                            num_documento : numdoc,
                            idfactura: idfactura,
                            id_cliente : idcliente,
                            id_caja : idcaja,
                            ticket : ticket,
                            idticket : ticketid,
                            id_cajero : idcajero,
                            items: Ext.JSON.encode(dataItems),
                            contado: contado,
                            cheques: cheques,
                            otros: otros,
                            idrecauda: recauda,
                        },

                        success: function(response){
                            var text = response.responseText;
                            var resp = Ext.JSON.decode(response.responseText);
                            var idrecauda= resp.idrecauda;
                            var numrecauda= resp.numrecauda;
                            viewedit.down('#comprobanteId').setValue(numrecauda);
                            Ext.Msg.alert('Informacion', 'Creada Exitosamente.');
                            preventa.load();
                            view.close();
                            
                        }
                    });                               
                                                                       
                                 
                };
            }            
        });
        };        
    },


    agregarrecaudacion: function() {

        var view = this.getGenerapagoingresar();
        var stItem = this.getRecaudacionItemsStore();
        var formapago = view.down('#condpagoId');
        var stCombo = formapago.getStore();
        var record = stCombo.findRecord('id', formapago.getValue()).data;
        var numcheque = view.down('#numchequeId').getValue();
        var fechacheque = view.down('#fechacheqId').getValue();
        var fechatransac = view.down('#fechafacturaId').getValue();
        var valortotal = view.down('#totalId').getValue(); 
        var valorpago = view.down('#valorpagoId').getValue();
        var valorcancela = view.down('#valorcancelaId').getValue();
        var documento = view.down('#tipoDocumentoId');
        var stCombo = documento.getStore();
        var iddocumento = stCombo.findRecord('id', documento.getValue()).data;
        var tipodoc  = iddocumento.id;
        var numdoc = view.down('#numfacturaId').getValue();
        var comprobante = view.down('#comprobanteId').getValue();
        var valorvuelto = view.down('#valorvueltoId').getValue();
        var contado = view.down('#contadoId').getValue();
        var cheques = view.down('#chequesId').getValue();
        var otros = view.down('#otrosId').getValue();
        var banco = view.down('#bancoId').getValue();
        var vali = "SI";
        
        if (!contado){
            
            var contado = 0;
        }

        if (!valorvuelto){
            
            var valorvuelto = 0;
        }

        if (!cheques){
            
            var cheques = 0;
        }

        if (!otros){
            
            var otros = 0;
        }

        
        var cero = 0;
        var valida = 1;       
               

        if (record.nombre == "CONTADO") {
                   
            var valortotal = ((valorcancela))-((valorvuelto)) ;
            var valort = ((valorcancela))-((valorvuelto)) ;
            var contado = ((contado)) + ((valortotal));
            var nombrebanco = "";
            var id_banco = "";
            var numcheque = 0;
            var nombrebanco = "Venta al Contado";                    

        }

        if (record.nombre == "CHEQUE AL DIA") {

            if (!banco){

                Ext.Msg.alert('Alerta', 'Debe Seleccionar Banco');
                return;

            }else{

                var banco = view.down('#bancoId');
                var stCombo = banco.getStore();
                var nombrebanco = stCombo.findRecord('id', banco.getValue()).data;
                var nombrebanco = nombrebanco.nombre;
                var id_banco = nombrebanco.id;          
            
            } 

            var valortotal = ((valorcancela));
            var valort = (valorcancela);
            var cheques = (cheques) + (valortotal); 
                       
            if (!numcheque){

             Ext.Msg.alert('Alerta', 'Ingrese Numero de Cheque');
             return; 
            };

        }
        
        if (record.nombre == "CHEQUE A FECHA") {

            if (!banco){

                Ext.Msg.alert('Alerta', 'Debe Seleccionar Banco');
                return;

            }else{

                var banco = view.down('#bancoId');
                var stCombo = banco.getStore();
                var nombrebanco = stCombo.findRecord('id', banco.getValue()).data;
                var nombrebanco = nombrebanco.nombre;
                var id_banco = nombrebanco.id;          
            
            } 

            var valortotal = ((valorcancela));
            var valort = (valorcancela);
            var cheques = (cheques) + (valortotal); 
                       
            if (!numcheque){

             Ext.Msg.alert('Alerta', 'Ingrese Numero de Cheque');
             return; 
            };

        } 


        if (record.nombre == "CREDITO 30 DIAS") {

            var otros = (otros) + (valortotal);
            var nombrebanco = "";
            var id_banco = "";
            var numcheque = 0;
            var nombrebanco = "Venta a Credito";                       
            var valorvuelto = view.down('#valorvueltoId').getValue();
            var nombrebanco = "";
            var id_banco = "";
            var valortotal = (valorcancela);
            var valort = (valorcancela);

        }

        if (record.nombre == "CREDITO 60 DIAS") {

            var otros = (otros) + (valortotal);
            var nombrebanco = "";
            var id_banco = "";
            var numcheque = 0;
            var nombrebanco = "Venta a Credito";    
            var valorvuelto = view.down('#valorvueltoId').getValue();
            var nombrebanco = "";
            var id_banco = "";
            var valortotal = (valorcancela);
            var valort = (valorcancela);

        }

        
        if (record.nombre == "TRANSFERENCIA BANCARIA") {

            var otros = (otros) + (valortotal);
            var nombrebanco = "";
            var id_banco = "";
            var numcheque = 0;
            var valortotal = (valorcancela);
            var valort = (valorcancela);                     

        }

        if (record.nombre == "TARJETA DEBITO") {

            
            var otros = (otros) + (valortotal);
            view.down('#validapagoId').setValue(vali);
            if(numcheque==0){

                 Ext.Msg.alert('Alerta', 'Debe Ingresar Numero Documento');
                return;
                
            };

            if (!banco){

                Ext.Msg.alert('Alerta', 'Debe Seleccionar Banco');
                return;

            }else{

                var banco = view.down('#bancoId');
                var stCombo = banco.getStore();
                var nombrebanco = stCombo.findRecord('id', banco.getValue()).data;
                var nombrebanco = nombrebanco.nombre;
                var id_banco = nombrebanco.id;
                var valortotal = (valorcancela);
                var valort = (valorcancela);         
            
            }                 

        }

        if (record.nombre == "TARJETA CREDITO") {

            var vali = "SI";
            var otros = (otros) + (valortotal);
            view.down('#validapagoId').setValue(vali);
            if(numcheque==0){

                 Ext.Msg.alert('Alerta', 'Debe Ingresar Numero Documento');
                return;
                
            };
            if (!banco){

                Ext.Msg.alert('Alerta', 'Debe Seleccionar Banco');
                return;

            }else{

                var banco = view.down('#bancoId');
                var stCombo = banco.getStore();
                var nombrebanco = stCombo.findRecord('id', banco.getValue()).data;
                var nombrebanco = nombrebanco.nombre;
                var id_banco = nombrebanco.id;
                var valortotal = (valorcancela);
                var valort = (valorcancela);        
            
            }
            
                                               

        }
        
               
        if (valortotal > valorpago ) {

            Ext.Msg.alert('Alerta', 'Valor Mayor a lo  Cancelado');
             return;
        }

       
        
        
        if (!valorcancela){

             Ext.Msg.alert('Alerta', 'Ingrese Monto a Cancelar');
             return; 
        }


        if (!numdoc){

             Ext.Msg.alert('Alerta', 'Seleccione Tipo Documento');
             return; 
        };

        if (!comprobante){

             Ext.Msg.alert('Alerta', 'Seleccione Caja');
             return; 
        };

        var exists = 0;        
        stItem.each(function(r){
            if (r.data.nom_forma == "PAGO CHEQUE "){
            if(r.data.id_record == record.id & r.data.num_cheque == numcheque ){
                Ext.Msg.alert('Alerta', 'El registro ya existe.');
                exists = 1;
                return; 
            }
            }           
        });

        if(exists == 1)
            return;

        stItem.add(new Infosys_web.model.recaudacion.Item({
            id_pago: record.id,
            detalle: nombrebanco,
            nom_forma: record.nombre,
            num_doc : numdoc,            
            id_num_doc : iddocumento.id, 
            id_forma: record.id,
            num_cheque: numcheque,
            fecha_comp: fechacheque,
            fecha_transac: fechatransac,            
            nom_banco: nombrebanco,
            id_banco: id_banco,
            valor_pago: valorpago,
            valor_cancelado: valorcancela,
            valor_vuelto: valorvuelto
        }));

        var valortotal = view.down('#valortotalId').getValue();
        var valortotal = valortotal + (valorcancela - valorvuelto);
        if (valorcancela<valorpago){            
            var valorsaldo = valorpago - valorcancela;
            view.down('#valorpagoId').setValue(valorsaldo);
        }else{

            view.down('#valorpagoId').setValue(cero);
                       
        };

        view.down('#valorvueltoId').setValue(cero);
        view.down('#valorcancelaId').setValue(cero);
        view.down('#valortotalId').setValue(valortotal);
        view.down('#validaId').setValue(valida);       
        view.down('#contadoId').setValue(contado);
        view.down('#chequesId').setValue(cheques);
        view.down('#otrosId').setValue(otros);
        view.down('#validapagoId').setValue(vali);
        view.down('#valida2Id').setValue(vali);
        if  (tipodoc == 2 && record.id == 7){
            view.down('#numfacturaId').setValue(numcheque);
            view.down('#fpagoId').setValue(record.id);
        }; 
        if (tipodoc == 2 && record.id == 4){
            view.down('#numfacturaId').setValue(numcheque);
            view.down('#fpagoId').setValue(record.id);           
        };      
        
    },

    special: function(f,e){
        if (e.getKey() == e.ENTER) {
            this.selectItemcancela()
        }
    },

    selectItemcancela : function() {
        
        var view =this.getGenerapagoingresar();
        var valorapagar = view.down('#valorpagoId').getValue();
        var valorpagado = view.down('#valorcancelaId').getValue();
        var condpago = view.down('#condpagoId');
        var stCombo = condpago.getStore();
        var record = stCombo.findRecord('id', condpago.getValue()).data;
        var valida = record.nombre;

        if (valida == "CONTADO") {

        if (valorapagar<valorpagado){

            calculo = ((valorpagado)-(valorapagar));
            view.down('#valorvueltoId').setValue(calculo);
                   

        }

        }else {

            if (valorapagar<valorpagado){

            Ext.Msg.alert('Alerta', 'Valor Cancelado debe ser Menor o Igual a Valor a Pagar');
            return;
            

        }
            


        }

        
    },

    selectItemcaja : function() {
        
        var view = this.getPagocajaprincipal();
        var tipo_caja = view.down('#cajaId').getValue();
        var stCombo = tipo_caja.getStore();
        var record = stCombo.findRecord('id', tipo_caja.getValue()).data;
        correlanue = record.correlativo;
        correlanue = (parseInt(correlanue)+1);
        view.down('#comprobanteId').setValue(correlanue);
        this.selectItemdocuemento();        
    },

    exportarexcelpagocaja: function(){
        
        var jsonCol = new Array()
        var i = 0;
        var grid =this.getPagocajaprincipal()
        Ext.each(grid.columns, function(col, index){
          if(!col.hidden){
              jsonCol[i] = col.dataIndex;
          }
          
          i++;
        })     
                         
        window.open(preurl + 'adminServicesExcel/exportarExcelPagocaja?cols='+Ext.JSON.encode(jsonCol));
 
    },

     salir : function() {
        var view =this.getFacturasvizualizar();
        view.close()
     },

     visualizar : function() {

        var view =this.getGenerapagoingresar();
        var factura = view.down('#tipoDocumentoId').getRawValue();
        var idticket = view.down('#idId').getValue();
        var preventa = view.down('#idticketId').getValue();
        var documento = view.down('#docuementoId').getValue();
        var numfactura = view.down('#numfacturaId').getValue();
        var rut = view.down('#rutId').getValue();
        var idcliente = view.down('#id_cliente').getValue();
        var ordencompra = view.down('#ordencompraId').getValue();
        var nombre = view.down('#nombre_id').getValue();
        var direccion = view.down('#direccionId').getValue();
        var giro = view.down('#giroId').getValue();
        var comuna = view.down('#tipoComunaId').getValue();
        var ciudad = view.down('#tipoCiudadId').getValue();
        var vendedor = view.down('#VendedorId').getRawValue();
        var idvendedor = view.down('#idVendedorId').getRawValue();
        var neto = view.down('#netoId').getValue();
        var descuento = view.down('#descuentoaId').getValue();
        var afecto = view.down('#afectoId').getValue();
        var iva = view.down('#ivaId').getValue();
        var valida2 =  view.down("#valida2Id").getValue();
        var total = view.down('#totalId').getValue();
        var total_unformat = view.down('#finaltotalUnformat').getValue();        
        var pago = view.down('#tipocondpagoId').getValue();
        var numcheque = view.down('#numchequeId').getValue();
        var valida = "";
        var tipodoc = view.down('#tipoDocumentoId').getValue();
        var condicion = view.down('#tipocondpagoId');
        var fechafactura = view.down('#fechafacturaId').getValue();
        var idobserva = view.down('#obsId').getValue();
        var stCombo = condicion.getStore();
        var record = stCombo.findRecord('id', condicion.getValue()).data;
        dias = record.dias;
         var st = this.getPreventa_detalleStore()
         var ticket = view.down('#idId').getValue();
         st.proxy.extraParams = {ticket : ticket}
         st.load();
         if (tipodoc == 2 & valida2 == "NO"){

            Ext.Msg.alert('Alerta', 'Debe Cancelar Documento');
                   return; 
            

        }else{

        Ext.Ajax.request({
            url: preurl + 'recaudacion/averigua',
            params: {
                ticketid : idticket
            },
            success: function(response){
                var text = response.responseText;
                var resp = Ext.JSON.decode(response.responseText);
                var iddocumento = resp.iddocumento;
               
                if (iddocumento != 0){

                   Ext.Msg.alert('Alerta', 'Documento ya Generado');
                   return;                 
                     
                }else{

                    if(!pago){
                        Ext.Msg.alert('Seleccione Condicion de Venta');
                        return;   
                    };

                    if (!record){
                        Ext.Msg.alert('Alerta', 'Seleccione Condicion de Venta');
                        return; 
                    };

                    if (!numfactura){
                         Ext.Msg.alert('Alerta', 'Seleccione Documento');
                         return; 
                    };

                    var newview =Ext.create('Infosys_web.view.Pago_caja.Facturas').show(); 
              Ext.Ajax.request({
                    url: preurl + 'facturas/calculofechas',
                    params: {
                        dias: dias,
                        fechafactura : fechafactura
                    },
                    success: function(response){
                       var resp = Ext.JSON.decode(response.responseText);
                       var fecha_final = resp.fecha_final;
                       newview.down("#fechavencId").setValue(fecha_final);
                       newview.down("#tipodocumentoId").setValue(factura);
                       newview.down("#numfacturaId").setValue(numfactura);
                       newview.down("#rutId").setValue(rut);
                       newview.down("#nombre_id").setValue(nombre);
                       newview.down("#direccionId").setValue(direccion);
                       newview.down("#giroId").setValue(giro);
                       newview.down("#tipoComunaId").setValue(comuna);
                       newview.down("#tipoCiudadId").setValue(ciudad);
                       newview.down("#idvendedorId").setValue(idvendedor);
                       newview.down("#vendedorId").setValue(vendedor);
                       newview.down("#id_cliente").setValue(idcliente);
                       newview.down("#finaltotalnetoId").setValue(Ext.util.Format.number(neto, '0,000'));
                       newview.down("#finaltotalnetonId").setValue(neto);
                       newview.down("#preventaId").setValue(preventa);
                       
                       newview.down("#finaldescuentoId").setValue(Ext.util.Format.number(descuento, '0,000'));
                       newview.down("#finaldescuentonId").setValue(descuento);
                       
                       newview.down("#finalafectoId").setValue(Ext.util.Format.number(afecto, '0,000'));
                       newview.down("#finalafectonId").setValue(afecto);
                       
                       newview.down("#finaltotalivaId").setValue(Ext.util.Format.number(iva, '0,000'));
                       newview.down("#finaltotalivanId").setValue(iva);
                       
                       newview.down("#finaltotalId").setValue(Ext.util.Format.number(total, '0,000'));

                       newview.down("#finaltotalpostId").setValue(total);
                       newview.down("#finaltotalUnformat").setValue(total_unformat);
                       newview.down("#tipocondpagoId").setValue(pago);
                       newview.down("#numchequeId").setValue(numcheque);                      
                                   
                    }
              });

            }


            }            
        });
    };
    },

    selectcondpago: function() {
      
        var view =this.getGenerapagoingresar();
        var condpago = view.down('#condpagoId');
        var totdocu = view.down('#totalId').getValue();
        var stCombo = condpago.getStore();
        var record = stCombo.findRecord('id', condpago.getValue()).data;
        var valida = record.nombre;


        var bolDisabled = valida == "CONTADO" ? true : false; // campos se habilitan sólo en factura
        
        view.down('#numchequeId').setDisabled(bolDisabled);
        view.down('#bancoId').setDisabled(bolDisabled);        

        if (valida == "PAGO CHEQUE "){
            view.down("#numchequeId").focus();
        };
               
        if (valida == "CONTADO"){

           view.down('#valorvueltoId').setDisabled(false);
           var nombrebanco = "";
           var id_banco = "";
           var numcheque = 0;
           view.down("#bancoId").setValue(id_banco);
           view.down("#numchequeId").setValue(numcheque);
           view.down("#valorcancelaId").focus();  
        
        };

        if (valida == "TARJETA CREDITO"){

            var corre = 20;

            Ext.Ajax.request({

            url: preurl + 'correlativos/generafact?valida='+corre,
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
                    view.down("#numchequeId").setValue(correlanue);
                    view.down('#valorvueltoId').setDisabled(true);
                    view.down("#valorcancelaId").setValue(totdocu);
                    view.down("#numchequeId").focus();                   
                }

            }            
            });          
        
        };

        if (valida == "TARJETA DEBITO"){
            
            var corre = 20;

            Ext.Ajax.request({

            url: preurl + 'correlativos/generafact?valida='+corre,
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
                    view.down("#numchequeId").setValue(correlanue);
                    view.down('#valorvueltoId').setDisabled(true);
                    view.down("#valorcancelaId").setValue(totdocu);
                    view.down("#numchequeId").focus();
                    
                }

            }            
            });
        
        };

        if (valida == "CREDITO 30 DIAS"){

           var id_banco = "";
           var numcheque = 0;
           view.down("#bancoId").setValue(id_banco);
           view.down("#numchequeId").setValue(numcheque);           
           view.down('#numchequeId').setDisabled(true);
           view.down('#valorvueltoId').setDisabled(true);
           view.down('#bancoId').setDisabled(true);
           view.down("#valorcancelaId").setValue(totdocu);
           view.down("#valorcancelaId").focus();
        
        };

        if (valida == "CREDITO 60 DIAS"){

           var id_banco = "";
           var numcheque = 0;
           view.down("#bancoId").setValue(id_banco);
           view.down("#numchequeId").setValue(numcheque);            
           view.down('#numchequeId').setDisabled(true);
           view.down('#valorvueltoId').setDisabled(true);
           view.down('#bancoId').setDisabled(true);
           view.down("#valorcancelaId").setValue(totdocu);
           view.down("#valorcancelaId").focus();
                
        };

    },


    selectItemdocuemento: function() {
        
        var view =this.getGenerapagoingresar();      
        var tipo_documento = view.down('#tipoDocumentoId');
        var stCombo = tipo_documento.getStore();
        var record = stCombo.findRecord('id', tipo_documento.getValue()).data;
        
        var bolDisabled = tipo_documento.getValue() == 1 ? false : true; // campos se habilitan sólo en factura
        
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
                    Ext.Msg.alert('Correlativo YA Existe');
                    return;
                }

            }            
        });
        
        view.down('#rutId').setDisabled(bolDisabled);
        view.down('#nombre_id').setDisabled(bolDisabled);
        view.down('#direccionId').setDisabled(bolDisabled);
        view.down('#giroId').setDisabled(bolDisabled);
        view.down('#tipoCiudadId').setDisabled(bolDisabled);
        view.down('#tipoComunaId').setDisabled(bolDisabled);
    },

    mpagocaja: function(){
       
        var cajero = "1";
        var caja = "1";
        var fecha = 0;
                
        Ext.Ajax.request({
            url: preurl + 'genera_pagos/leer',
            params: {
                cajero: cajero,
                caja: caja,
                fecha: fecha
            },
            success: function(response){
                var view = Ext.create('Infosys_web.view.Pago_caja.Apertura').show();
                var resp = Ext.JSON.decode(response.responseText);
                var caja= resp.caja;
                if (resp.success == true) {
                    view.down('#efectuvoId').setValue(caja.efectivo);
                    view.down('#totchequesId').setValue(caja.cheques);
                    view.down('#otrosmontosId').setValue(caja.otros);
                    view.down('#recaudaId').setValue(caja.id);
                    view.down('#cajaId').setValue(caja.id_caja);
                    view.down('#cajeroId').setValue(caja.id_cajero);
                    view.down('#efectuvoId').focus();                 
                    
                }else{

                 var caja1 = "1";
                 var cajero1 = "1";

                 view.down('#efectuvoId').focus();
                 view.down('#cajaId').setValue(caja1);   
                 view.down('#cajeroId').setValue(cajero1);   
                }
            }
           
        });

    },

    mpagocaja2: function(){

        var view = this.getAperturacaja();
        var cajero = view.down('#cajeroId');        
        var efectivo = view.down('#efectuvoId').getValue();
        var cheques = view.down('#totchequesId').getValue();
        var otros = view.down('#otrosmontosId').getValue();
        var fecha = view.down('#fechaaperturaId').getValue();
        var recauda = view.down('#recaudaId').getValue();
        
        var stCombo = cajero.getStore();
        var idcajero = stCombo.findRecord('id', cajero.getValue()).data;
        var caje = idcajero.id;

        var caja = view.down('#cajaId');
        
        var stCombo = caja.getStore();
        var idcaja = stCombo.findRecord('id', caja.getValue()).data;
        correlanue = idcaja.correlativo;
        correlanue = (parseInt(correlanue)+1);
        var caj = idcaja.id;
        
       
        if (!caje){

            Ext.Msg.alert('Alerta', 'Selecciona un Cajero.');
            return;
        };

        if (!caj){

            Ext.Msg.alert('Alerta', 'Selecciona una Caja.');
            return;
        };

        var viewport = this.getPanelprincipal();
        viewport.removeAll();
        viewport.add({xtype: 'pagocajaprincipal'});
        var viewedit = this.getPagocajaprincipal();        
        viewedit.down('#comprobanteId').setValue(correlanue);
        viewedit.down('#nomcajaId').setValue(idcaja.nombre);
        viewedit.down("#cajaId").setValue(idcaja.id);
        viewedit.down('#nomcajeroId').setValue(idcajero.nombre);
                
        viewedit.down("#cajeroId").setValue(idcajero.id);
        viewedit.down('#efectivonId').setValue(efectivo);
        viewedit.down('#efectivoId').setValue(Ext.util.Format.number(efectivo, '0,00'));        
        viewedit.down('#totchequesId').setValue(Ext.util.Format.number(cheques, '0,00'));
        viewedit.down('#totchequesnId').setValue(cheques);
        viewedit.down('#otrosmontosnId').setValue(otros);
        viewedit.down('#otrosmontosId').setValue(Ext.util.Format.number(otros, '0,00'));
        viewedit.down('#fechaaperturaId').setValue(fecha);
        var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Grabando..."});
        myMask.show();        
        Ext.Ajax.request({
            
            url: preurl + 'genera_pagos/grabar',
            params: {
                cajero: caje,
                caja: caj,
                fecha: fecha,
                efectivo: efectivo,
                cheques: cheques,
                otros: otros 
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                myMask.hide();
                recauda = (resp.recauda);
                viewedit.down('#recaudaId').setValue(recauda);
                view.close();
                
            }
           
        });
        viewedit.down("#nombresId").focus() 

        
    },

    generaticket: function(){

        var view = this.getPagocajaprincipal();
        var idcaja = view.down('#cajaId').getValue();
        var nomcaja = view.down('#nomcajaId').getValue();
        var comprobante = view.down('#comprobanteId').getValue();
        var condventa = view.down('#comprobanteId').getValue();
        var contado = view.down('#efectivonId').getValue();
        var cheques = view.down('#totchequesnId').getValue();
        var otros = view.down('#otrosmontosnId').getValue();
        var idcajero = view.down('#cajeroId').getValue();
        var nomcajero = view.down('#nomcajeroId').getValue();
        var recauda = view.down('#recaudaId').getValue();
        var ticket = view.down('#nombresId').getValue();

        var comprobante = comprobante +1;
            
        
        Ext.Ajax.request({
            url: preurl + 'preventa/edita3?idpreventa='+ticket,
            params: {
                id: 1,
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);
                if (resp.success == true) {                     
                    
                    if(resp.cliente){

                        var view = Ext.create('Infosys_web.view.Pago_caja.Genera_pago').show();                   
                        var cliente= resp.cliente;
                        var tipo_docu = (cliente.id_tip_docu);
                        var nombre = tipo_docu;
                        var idticket = (cliente.id);
                        var idcliente = (cliente.id_cliente);
                        if (idcliente == 0){                
                            var idcliente = 30992;
                        };
                        
                        var id_vendedor = (cliente.id_vendedor);
                        var neto = (cliente.neto);
                        var desc = (cliente.desc);
                        var total = (cliente.total);
                        var afecto = (neto-desc);
                        var iva = (total-afecto);

                        if(nombre == 101 || nombre == 103 || nombre == 105){ // FACTURA ELECTRONICA o FACTURA EXENTA

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
                            //console.log(obj_folio); 
                            nuevo_folio = obj_folio.folio;
                            if(nuevo_folio != 0){
                                view.down('#numfacturaId').setValue(nuevo_folio);  
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
                        
                        }else{        

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
                                    view.down("#numfacturaId").setValue(correlanue);                    
                                    
                                }else{
                                    Ext.Msg.alert('Correlativo YA Existe');
                                    return;
                                }

                            }            
                        });
                    }

                        view.down("#ticketId").setValue(ticket);
                        view.down("#idticketId").setValue(idticket);
                        view.down("#netoId").setValue(neto);
                        view.down("#descuentoId").setValue(desc);
                        view.down("#tipoDocumentoId").setValue(tipo_docu);
                        view.down("#ivaId").setValue(iva);                       
                        view.down("#afectoId").setValue(afecto);
                        view.down("#totalId").setValue(total);
                        view.down("#valorpagoId").setValue(total);
                        view.down("#tipocondpagoId").setValue(cliente.id_pago);
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
                        view.down("#nombre_id").setValue(cliente.nom_cliente);
                        view.down("#id_cliente").setValue(cliente.id_cliente);
                        view.down("#tipoCiudadId").setValue(cliente.ciudad);
                        view.down("#tipoComunaId").setValue(cliente.comuna);
                        view.down("#giroId").setValue(cliente.giro);
                        view.down("#direccionId").setValue(cliente.direccion);
                        view.down("#rutId").setValue(cliente.rut_cliente);
                        view.down("#idVendedorId").setValue(cliente.id_vendedor);
                        view.down("#VendedorId").setValue(cliente.nom_vendedor);
                        view.down("#obsId").setValue(cliente.id_observa);
                          
                    } 
                    }
                    }

        });   
       
              
       
    },

    generarpago: function(){

        var view = this.getPagocajaprincipal();
        var idcaja = view.down('#cajaId').getValue();
        var nomcaja = view.down('#nomcajaId').getValue();
        var comprobante = view.down('#comprobanteId').getValue();
        var condventa = view.down('#comprobanteId').getValue();
        var contado = view.down('#efectivonId').getValue();
        var cheques = view.down('#totchequesnId').getValue();
        var otros = view.down('#otrosmontosnId').getValue();
        var idcajero = view.down('#cajeroId').getValue();
        var nomcajero = view.down('#nomcajeroId').getValue();
        var recauda = view.down('#recaudaId').getValue();

        var comprobante = (comprobante +1);
       
        if (view.getSelectionModel().hasSelection()) {
            var row = view.getSelectionModel().getSelection()[0];
            var ticket = (row.get('num_ticket'));
            var idticket = (row.get('id'));
            var preventa = (row.get('id_documento'));
            if (preventa>0){                
                vali="SI";
            }else{
                vali="NO";
            }
            var idcliente = (row.get('id_cliente'));
            var observaciones = (row.get('observaciones'));
            var sucursal = (row.get('id_sucursal'));           
            
            if (idcliente == 0){                
                var idcliente = 30992;
            };
            var tipo_docu = (row.get('id_tip_docu'));
            var id_vendedor = (row.get('id_vendedor'));
            var id_pago = (row.get('id_pago'));
            var nom_vendedor = (row.get('nom_vendedor'))
            var neto = (row.get('neto'));
            var desc = (row.get('desc'));
            var total = (row.get('total'));
            var ordencompra = (row.get('orden_compra'));
            var afecto = (neto-desc);
            var iva = (total-afecto);
            var fechafactura = (row.get('fecha_venta'))
            var view = Ext.create('Infosys_web.view.Pago_caja.Genera_pago').show();
            Ext.Ajax.request({
                    url: preurl + 'cond_pago/calculodias',
                    params: {
                        idpago: id_pago
                    },
                    success: function(response){
                       var resp = Ext.JSON.decode(response.responseText);
                       var dias = resp.dias;
                       Ext.Ajax.request({
                            url: preurl + 'facturas/calculofechas',
                            params: {
                                dias: dias,
                                fechafactura : fechafactura
                            },
                            success: function(response){
                               var resp = Ext.JSON.decode(response.responseText);
                               var fecha_final = resp.fecha_final;
                               view.down("#fechavencId").setValue(fecha_final);                                  
                            }
                      });                                
                    }
            });
                     
            Ext.Ajax.request({
            url: preurl + 'clientes/getallc?idcliente='+idcliente,
            params: {
                id: 1,
                idcliente: idcliente
            },
            success: function(response){
                var resp = Ext.JSON.decode(response.responseText);

                if (resp.success == true) {                     
                    
                    if(resp.cliente){

                       var nombre = tipo_docu;

                    if(nombre == 101 || nombre == 103 || nombre == 105){ // FACTURA ELECTRONICA o FACTURA EXENTA

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
                            //console.log(obj_folio); 
                            nuevo_folio = obj_folio.folio;
                            if(nuevo_folio != 0){
                                view.down('#numfacturaId').setValue(nuevo_folio);  
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


                    }else{        

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
                                    if (preventa>0){                
                                        var correlanue = preventa;
                                    }else{
                                        var correlanue = correlanue;
                                    }

                                    view.down("#numfacturaId").setValue(correlanue);                    
                                    
                                }else{
                                    Ext.Msg.alert('Correlativo YA Existe');
                                    return;
                                }

                            }            
                        });
                    }
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
                        view.down("#id_sucursalID").setValue(sucursal);
                        var cliente = resp.cliente;
                        view.down("#nombre_id").setValue(cliente.nombres);
                        view.down("#id_cliente").setValue(cliente.id);
                        view.down("#tipoCiudadId").setValue(cliente.nombre_ciudad);
                        view.down("#tipoComunaId").setValue(cliente.nombre_comuna);
                        view.down("#ordencompraId").setValue(ordencompra);
                        view.down("#giroId").setValue(cliente.giro);
                        view.down("#direccionId").setValue(cliente.direccion);
                        view.down("#rutId").setValue(cliente.rut);
                        view.down("#idVendedorId").setValue(id_vendedor);
                        view.down("#VendedorId").setValue(nom_vendedor);
                        view.down('#permiteId').setValue(vali);
                                                                   
                    }
                    
                }
            }

        });       

           
                       
        }else{
            Ext.Msg.alert('Alerta', 'Selecciona un registro.');
            return;
        }
    },

    cerrarcajaventa: function(){
        var viewport = this.getPanelprincipal();
        viewport.removeAll();
     
    },
  
});










