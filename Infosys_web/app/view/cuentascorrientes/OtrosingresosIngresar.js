Ext.define('Infosys_web.view.cuentascorrientes.OtrosingresosIngresar', {
    extend: 'Ext.window.Window',
    alias : 'widget.otrosingresosingresar',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Otros Ingresos',
    autoShow: true,
    width: 1310,
    modal: true,
    iconCls: 'icon-sheet',
    bodyPadding: 7,
    initComponent: function() {
        var me = this;

         var tipoComprobante = Ext.create('Ext.data.Store', {
            fields: ['value', 'nombre'],
            data : [
                {"value":"INGRESO", "nombre":"INGRESO"},
                {"value":"EGRESO", "nombre":"EGRESO"},
                {"value":"REGULARIZACION", "nombre":"REGULARIZACION"}
            ]
        });

         var cuentascontablecancela = Ext.create('Ext.data.Store', {
            model: 'Infosys_web.model.cuentascontable',
            proxy: {
              type: 'ajax',
                url : preurl +'cuentacorriente/cuentascancela',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad: true
        });   

         var cuentasDocumentos = Ext.create('Ext.data.Store', {
            fields: ['id', 'nombre', 'saldo','documento'],
            proxy: {
              type: 'ajax',
                actionMethods:  {
                    read: 'POST'
                 },              
                url : preurl +'cuentacorriente/getDocumentos',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad: true            
        });              
       
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                labelWidth: 150,
                //url: preurl + 'cuentacorriente/saveCuentaCorriente',
                border: false,
                style: 'background-color: #fff;',
                fieldDefaults: {
                    labelAlign: 'left',
                    combineErrors: true,
                    msgTarget: 'side'
                },

                items: [
                    {
                        xtype: 'numberfield',
                        name : 'id',
                        hidden:true
                    },{
                        xtype: 'numberfield',
                        itemId : 'ctacteId',
                        name: 'ctacteId',
                        hidden:true
                    },{
                        xtype: 'numberfield',
                        itemId : 'clienteId',
                        name: 'clienteId',
                        hidden:true
                    },{
                        xtype: 'numberfield',
                        itemId : 'totaldebe',
                        name: 'totaldebe',
                        hidden:true
                    },{
                        xtype: 'numberfield',
                        itemId : 'totalhaber',
                        name: 'totalhaber',
                        hidden:true
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        labelWidth: 150,
                        items: [{
                            xtype: 'numberfield',
                            fieldLabel: 'Folio',
                            width: 250,
                            name: 'numero',
                            itemId: 'numeroId',
                            readOnly: true
                        },{
                        xtype: 'splitter'
                        },{
                            xtype: 'datefield',
                            fieldLabel: 'Fecha',
                            width: 250,
                            name: 'Fecha',
                            itemId: 'fechaId',
                            value: new Date()
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        labelWidth: 150,
                        items: [{
                           xtype: 'combobox',
                            queryMode: 'local',
                             width: 250,
                            fieldLabel: 'Tipo',
                            store : tipoComprobante,
                            displayField : 'nombre',
                            valueField : 'value',                                    
                            emptyText : 'Seleccionar',
                            editable: false,
                            itemId : 'tipoComprobante' ,
                            name : 'tipoComprobante' ,
                            forceSelection: true,  
                            listConfig: {
                                minWidth: 280
                            },
                        }
                        ]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        labelWidth: 150,
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Observaci&oacute;n',
                            width: 500,
                            name: 'detalle',
                            itemId: 'detalleId'
                        }]
                    }

                ]
            }, 
                    {
                        xtype: 'fieldset',
                        title: 'Detalle',
                        items: [{
                        xtype: 'grid',
                        tbar: [],
                        selModel: {
                        selType: 'cellmodel'
                        },


                        plugins: [
                            Ext.create('Ext.grid.plugin.CellEditing', {
                                clicksToEdit: 1,
                                listeners: {
                                
                                    beforeedit: function(e, editor){

                                        if(editor.field == 'cuenta'){  // SI ES CUENTA SELECCIONA NORMAL

                                            return true;
                                        }else if(editor.field == 'cliente'){
                                            var record = editor.record;
                                            


                                             if(record.get('cuenta') == 0 || record.get('cuenta') == null){
                                                Ext.Msg.alert('Alerta', 'Debe seleccionar una cuenta.');
                                                return false;
                                             }else{
                                                reccuenta = cuentascontablecancela.findRecord('id', record.get('cuenta'));
                                                if(reccuenta.get('cancelaabono') == 0 && record.get('cuenta') != 7 && record.get('cuenta') != 18){
                                                    Ext.Msg.alert('Alerta', 'Cuenta Seleccionada no permite asociar a cliente.');
                                                    return false;
                                                }else{
                                                    return true;
                                                }
                                             }
                                        }else if(editor.field == 'documento'){
                                            var record = editor.record;

                                            if(record.get('cuenta') == 0 || record.get('cuenta') == null){
                                                Ext.Msg.alert('Alerta', 'Debe seleccionar una cuenta.');
                                                return false;
                                            }else{
                                                reccuenta = cuentascontablecancela.findRecord('id', record.get('cuenta'));
                                                if(reccuenta.get('cancelaabono') == 0){
                                                    Ext.Msg.alert('Alerta', 'Cuenta Seleccionada no permite asociar a un documento.');
                                                    return false;
                                                }else{
                                                    if(record.get('cuenta') == 18 && cuentasDocumentos.data.length == 0){
                                                        Ext.Msg.alert('Alerta', 'Cuenta Seleccionada no permite asociar a un documento.');
                                                        return false;
                                                    }else{
                                                        if(record.get('cliente') == 0 || record.get('cliente') == null){
                                                            Ext.Msg.alert('Alerta', 'Debe seleccionar un cliente.');
                                                            return false;
                                                        }
                                                    }
                                                }
                                            }                                             

                                        }else if(editor.field == 'docpago'){ 
                                            var record = editor.record;
                                            if(record.get('cuenta') == 0 || record.get('cuenta') == null){
                                                Ext.Msg.alert('Alerta', 'Debe seleccionar una cuenta.');
                                                return false;
                                            }else{
                                                if(record.get('cuenta') != 7 && record.get('cuenta') != 18){ // solo aplica a cuenta banco
                                                    Ext.Msg.alert('Alerta', 'Nro. documento solo aplica a cancelaciones con banco y cheque');
                                                    return false;
                                                }
                                            }

                                        }else if(editor.field == 'fecvenc'){   
                                            var record = editor.record;                                          

                                            if(record.get('cuenta') == 0 || record.get('cuenta') == null){
                                                Ext.Msg.alert('Alerta', 'Debe seleccionar una cuenta.');
                                                return false;
                                            }else{                                             
                                                reccuenta = cuentascontablecancela.findRecord('id', record.get('cuenta'));
                                                if(reccuenta.get('cancelaabono') == 1  && reccuenta.get('cuenta') != 7  && record.get('cuenta') != 18){
                                                    Ext.Msg.alert('Alerta', 'Cuenta Seleccionada no permite agregar Fecha de Vencimiento.');
                                                    return false;
                                                }else{
                                                    return true;
                                                }
                                            }

                                        }else if(editor.field == 'debe' || editor.field == 'haber'){ 
                                            var grid = me.down('grid')
                                            stItem = grid.getStore();

                                            var existe_nd = false;
                                            stItem.each(function(r){
                                                existe_nd = r.data.tipodocumento == 16 || r.data.tipodocumento == 104 ? true : existe_nd;
                                            });   

                                             var record = editor.record;
                                             if(record.get('cuenta') != 0 && record.get('cuenta') != null){
                                                if(editor.field == 'debe'){
                                                    if(record.get('haber') > 0){
                                                        Ext.Msg.alert('Alerta', 'Ya existe un valor asociado al Haber.');
                                                        return false;  
                                                    }else if(record.get('saldo') > 0 && record.get('tipodocumento') == 1 && !existe_nd){
                                                        Ext.Msg.alert('Alerta', 'Abonos para el documento se realizan en el haber.');
                                                        return false; 
                                                    }else if(record.get('saldo') > 0 && (record.get('tipodocumento') == 16 || record.get('tipodocumento') == 104)){
                                                        Ext.Msg.alert('Alerta', 'Abonos para el documento se realizan en el haber.');
                                                        return false;                                                         
                                                    }else{

                                                        reccuenta = cuentascontablecancela.findRecord('id', record.get('cuenta'));                                                        
                                                        if(reccuenta.get('cancelaabono') == 1  && (record.get('tipodocumento') == 1 || record.get('tipodocumento') == 101 || record.get('tipodocumento') == 19 || record.get('tipodocumento') == 103) && record.get('cuenta') != 18 && !existe_nd){
                                                             Ext.Msg.alert('Alerta', 'Abonos se realizan en el haber.');
                                                             return false;

                                                        }

                                                    }
                                                }else if(editor.field == 'haber'){
                                                    
                                                    if(record.get('debe') > 0){
                                                        Ext.Msg.alert('Alerta', 'Ya existe un valor asociado al Debe.');
                                                        return false; 
                                                    }else if(record.get('saldo') > 0 && (record.get('tipodocumento') == 11 || record.get('tipodocumento') == 102)){
                                                        Ext.Msg.alert('Alerta', 'Abonos para el documento se realizan en el debe.');
                                                        return false; 
                                                    }else if(record.get('saldo') == 0){
                                                        Ext.Msg.alert('Alerta', 'Cargos se realizan en el debe.');
                                                        return false;
                                                    }
                                                }else{                                                                                                        
                                                    reccuenta = cuentascontablecancela.findRecord('id', record.get('cuenta'));
                                                    if(editor.field == 'debe' && reccuenta.get('cancelaabono') == 1 && (record.get('tipodocumento') == 1 || record.get('tipodocumento') == 101 || record.get('tipodocumento') == 19 || record.get('tipodocumento') == 103) && !existe_nd){
                                                        Ext.Msg.alert('Alerta', 'Abonos se realizan en el haber.');
                                                        return false;
                                                    }else if(editor.field == 'haber' && reccuenta.get('cancelaabono') == 1 && (record.get('tipodocumento') == 11 || record.get('tipodocumento') == 102)){
                                                        Ext.Msg.alert('Alerta', 'Abonos se realizan en el debe.');
                                                        return false;                                                                                                                
                                                    }else if(editor.field == 'haber' && reccuenta.get('cancelacargo') == 1){
                                                        Ext.Msg.alert('Alerta', 'Cargos se realizan en el debe.');
                                                    }else{
                                                        return true;
                                                    } 
                                                }
                                             }else{

                                               Ext.Msg.alert('Alerta', 'Seleccione una cuenta.');
                                               return false;                                             
                                             }
                                     
                                        }

                                    },

                                    validateedit: function(e, editor, eop){
                                        var grid = me.down('grid')
                                   
                                        var record = editor.record;   
                                        if(editor.field == "debe" || editor.field == "haber"){
                                            if(editor.value != null && editor.value != 0){
                                                if(editor.field == "haber" && record.get('saldo') != 0 && editor.value > record.get('saldo')){
                                                        Ext.Msg.alert('Alerta', 'Monto no puede ser mayor que el saldo de la cuenta.');
                                                        editor.record.set({haber: 0});  
                                                        return false;

                                                }
                                                if(editor.field == 'debe'){
                                                //VER SI TIENE IMPUTACION, SI TIENE EXIGIR FECHA VENCIMIENTO
                                                   var imputacion = 0;
                                                   Ext.Ajax.request({
                                                       //url: preurl + 'cuentacorriente/getCuentaCorriente/' + record.get('cuenta') + '/' + editor.value ,
                                                       url: preurl + 'cuentacorriente/getImputacionByDocto/',
                                                            params: {
                                                                idCuenta: record.get('cuenta')
                                                            },                                                     
                                                       success: function(response, opts) {
                                                          var obj = Ext.decode(response.responseText);
                                                          imputacion =  obj.data[0].id_imputacion;

                                                          if(imputacion == 1 && (record.get('fecvenc') == 0 || record.get('fecvenc') == null)){
                                                             

                                                            grid.plugins[0].startEditByPosition({
                                                                row: editor.rowIdx,
                                                                column: 5
                                                            });                                                                   
                                                            Ext.Msg.alert('Alerta', 'Cuenta tiene Imputacion. Debe agregar fecha de Vencimiento.');
                                                             return false; 
                                                          }                                                              
                                                       },
                                                       failure: function(response, opts) {
                                                          console.log('server-side failure with status code ' + response.status);
                                                       }
                                                    });                                                

                                                }
                                            }
                                        }else if(editor.field == "cuenta"){
                                                editor.record.set({cliente : 0, documento : 0,docpago: 0, fecvenc:0,saldo : 0,debe: 0, haber : 0});  
                                                if(editor.value == null || editor.value == 0){
                                                    editor.record.set({cuenta: 0});  
                                                }else{
                                                    reccuenta = cuentascontablecancela.findRecord('id', editor.value);
                                                    if(reccuenta.get('cancelaabono') == 1){
                                                        cuentasDocumentos.proxy.extraParams = {
                                                                                                cuenta : editor.value,
                                                                                                cliente : me.down('#ctacteId').getValue()}
                                                        cuentasDocumentos.load();
                                                        editor.record.set({cliente:me.down('#ctacteId').getValue()});
                                                    }
                                                }

                                        }

                                        
                                        return true;
                                    },

                                    edit : function(ed, editor) {
                                        var grid = me.down('grid');
                                        var record = editor.record;                                        
                                        if(editor.field == "cuenta"){
                                            if(editor.value != null && editor.value != 0){
                                                reccuenta = cuentascontablecancela.findRecord('id', record.get('cuenta'));
                                                if(reccuenta.get('cancelaabono') == 0){
                                                            var diff = parseInt(me.down("#totalhaber").getValue()) - parseInt(me.down('#totaldebe').getValue());
                                                            if(diff > 0){
                                                                editor.record.set({debe: diff}); 
                                                            }          

                                                            var numcolumn = record.get('cuenta') == 7  ? 1 : 6;
                                                            // SI ES BANCO O CHEQUES POR COBRAR, DEBE IR AL CLIENTE
                                                            grid.plugins[0].startEditByPosition({
                                                                row: editor.rowIdx,
                                                                column: numcolumn
                                                            });    

                                                }else{
                                                            if(record.get('cuenta') == 18){
                                                                var diff = parseInt(me.down("#totalhaber").getValue()) - parseInt(me.down('#totaldebe').getValue());
                                                                if(diff > 0){
                                                                    editor.record.set({debe: diff}); 
                                                                }   
                                                                numcolumn = 1;
                                                            }else{
                                                                numcolumn = 3;
                                                            }
                                                            //var numcolumn = record.get('cuenta') == 18 ? 1 : 3;
                                                            grid.plugins[0].startEditByPosition({
                                                                row: editor.rowIdx,
                                                                column: numcolumn
                                                            });  

                                                }


                                            }
                                        }else if(editor.field == "debe" || editor.field == "haber"){
                                            if(editor.value != null && editor.value != 0){

                                                var sumdebe = 0;
                                                var sumhaber = 0;
                                                stItem = grid.getStore();
                                                
                                                stItem.each(function(r){
                                                    sumdebe += parseInt(r.data.debe);
                                                    sumhaber += parseInt(r.data.haber);
                                                });      
                                                me.down("#totaldebe").setValue(sumdebe);                                      
                                                me.down("#totalhaber").setValue(sumhaber); 

                                                var store = grid.getStore();
                                                if(store.count()-1!=editor.rowIdx){
                                                    if((store.count() - editor.rowIdx) > 1){
                                                                grid.plugins[0].startEditByPosition({
                                                                    row: editor.rowIdx + 1,
                                                                    column: 0
                                                                });  
                                                    }
                                                    return true;
                                                }
                                                store.insert(store.count(), {cuenta:0, cliente: 0, documento: 0,docpago: 0, fecvenc:0,glosa :'',debe: 0,haber: 0});
                                                var newRow = store.getCount()-1;
                                                grid.plugins[0].startEditByPosition({
                                                    row: newRow,
                                                    column: 0
                                                });
                                            }

                                        }else if(editor.field == "cliente"){
                                            if(record.get('cuenta') == 7){
                                                numcolumn = 4;
                                            }else if(record.get('cuenta') == 18){
                                                if(cuentasDocumentos.data.length > 0){
                                                    numcolumn = 3;
                                                }else{
                                                    numcolumn = 4;
                                                }

                                            }else{
                                                numcolumn = 3;
                                            }

                                            //var numcolumn = record.get('cuenta') == 7 || record.get('cuenta') == 18 ? 4 : 3;
                                            
                                            if(record.get('cuenta') == 7 || record.get('cuenta') == 18){
                                                editor.record.set({documento : 0}); 
                                            }else{
                                                editor.record.set({documento : 0,docpago: 0, fecvenc:0,saldo : 0,debe: 0, haber : 0}); 
                                            }

                                            
                                            if(editor.value != null && editor.value != 0){
                                                    grid.plugins[0].startEditByPosition({
                                                        row: editor.rowIdx,
                                                        column: numcolumn
                                                    });    
                                            }

                                        }else if(editor.field == 'docpago'){ 
                                                            if(record.get('cuenta') == 18){
                                                                editor.record.set({documento : 0, saldo: 0, haber : 0}); 
                                                            }
                                                            
                                                            grid.plugins[0].startEditByPosition({
                                                                row: editor.rowIdx,
                                                                column: 5
                                                            });                                             
                                        }else if(editor.field == 'fecvenc'){   
                                                            grid.plugins[0].startEditByPosition({
                                                                row: editor.rowIdx,
                                                                column: 6
                                                            });                                             
                                        }else if(editor.field == "documento"){

                                           
                                    
                                            if(editor.value != null && editor.value != 0){
                                              editor.record.set({docpago: 0, fecvenc:0,saldo : 0,debe: 0,haber: 0});  
                                               Ext.Ajax.request({
                                                   //url: preurl + 'cuentacorriente/getCuentaCorriente/' + record.get('cuenta') + '/' + editor.value ,
                                                   url: preurl + 'cuentacorriente/getDocumentoById/',
                                                        params: {
                                                            idDocumento: editor.value
                                                        },                                                     
                                                   success: function(response, opts) {
                                                      var obj = Ext.decode(response.responseText);
                                                       // REVISAR QUE EN CASO QUE NO EXISTA CUENTA, DESPLEGAR UN CERO
                                                      editor.record.set({saldo: obj.data[0].saldo});  
                                                      editor.record.set({tipodocumento: obj.data[0].tipodocumento});  
                                                      if(obj.data[0].tipodocumento == 11 || obj.data[0].tipodocumento == 102){
                                                        editor.record.set({debe: obj.data[0].saldo});
                                                        grid.plugins[0].startEditByPosition({
                                                            row: editor.rowIdx,
                                                            column: 8
                                                        }); 

                                                      }else if(obj.data[0].tipodocumento == 16 || obj.data[0].tipodocumento == 104){
                                                        editor.record.set({haber: obj.data[0].saldo});
                                                        grid.plugins[0].startEditByPosition({
                                                            row: editor.rowIdx,
                                                            column: 9
                                                        });                                                    

                                                      }else{

                                                        stItem = grid.getStore();

                                                        var existe_nd = false;
                                                        stItem.each(function(r){
                                                            existe_nd = r.data.tipodocumento == 16 || r.data.tipodocumento == 104 ? true : existe_nd;
                                                        });   


                                                        if(existe_nd){  // si tiene nota de debito, entonces la factura se va al debe                                                        
                                                            editor.record.set({debe: obj.data[0].saldo});  
                                                            grid.plugins[0].startEditByPosition({
                                                                row: editor.rowIdx,
                                                                column: 8
                                                            });                                                                  
                                                        }else{
                                                            editor.record.set({haber: obj.data[0].saldo});  
                                                            grid.plugins[0].startEditByPosition({
                                                                row: editor.rowIdx,
                                                                column: 9
                                                            });                                                                  

                                                        }
                                                      }      
                                                      

                                                   },
                                                   failure: function(response, opts) {
                                                      console.log('server-side failure with status code ' + response.status);
                                                   }
                                                });                                                
                                            }else{
                                                editor.record.set({saldo: 0,haber:0});  
                                            }


                                        }else if(editor.field == "glosa"){
                                            reccuenta = cuentascontablecancela.findRecord('id', record.get('cuenta'));
                                            if(reccuenta.get('cancelaabono') == 0){                                                
                                                    grid.plugins[0].startEditByPosition({
                                                        row: editor.rowIdx,
                                                        column: 8
                                                    });                                                    
                                            }else{
                                                    if((record.get('tipodocumento') == 11 || record.get('tipodocumento') == 102) || record.get('cuenta') == 18){
                                                        grid.plugins[0].startEditByPosition({
                                                            row: editor.rowIdx,
                                                            column: 8
                                                        });
                                                    }else{
                                                        grid.plugins[0].startEditByPosition({
                                                                row: editor.rowIdx,
                                                                column: 9
                                                            });
                                                    }               

                                            }
                                        }


                                    }                                  

                                }
                            })
                        ],


                        itemId: 'ingresoDetalleCancelacionId',
                        title: 'Cancelaci&oacute;n',
                        store: Ext.create('Ext.data.Store', {
                        autoDestroy: true,
                        fields: ['cuenta', 'cliente', 'tipodocumento', 'documento', 'docpago', 'fecvenc', 'glosa', 'debe', 'haber','saldo'],
                        data: [
                        {cuenta:0, cliente: 0, tipodocumento: 0 , documento: 0, docpago: 0, fecvenc:0, glosa : '',debe: 0,haber: 0, saldo :0}
                        ]
                        }),
                        height: 300,
                        columns: [
                        { 
                            text: 'Cuenta',  
                            dataIndex: 'cuenta', 
                            width: 150,
                            editor: {
                                xtype: 'combo',
                                typeAhead: true,
                                displayField : 'nombre',
                                valueField : 'id', 
                                triggerAction: 'all',
                                selectOnFocus: true,
                                store : cuentascontablecancela,
                                editable: false,
                                queryMode: 'local',
                                forceSelection: true,  
                                itemId : 'ccuenta',
                                listConfig: {
                                        width :  300,
                                        minWidth : 300
                                }                                  
                            },
                            // esto se ejecuta después de marcar
                            renderer: function(value,metaData,r) {
                                if(value) {
                                    var record = cuentascontablecancela.findRecord('id', value);
                                    return record ? record.get('nombre'): '';
                                } else return "";
                            }
                        },
                        { 
                            text: 'Cliente',  
                            dataIndex: 'cliente', 
                            width: 150,
                            editor: {
                                xtype: 'combo',
                                typeAhead: true,
                                displayField: 'cliente',
                                valueField: 'id',
                                triggerAction: 'all',
                                selectOnTab: true,
                                store: 'Cuentacorriente',
                                editable: false,
                                queryMode: 'local',
                                forceSelection: true,  
                                itemId: 'ccliente',
                                listConfig: {
                                        width :  300,
                                        minWidth : 300
                                }

                            },
                            // esto se ejecuta después de marcar
                            renderer: function(value,metaData,r) {
                                if(value) {
                                    cuentasDocumentos.proxy.extraParams = {
                                                                            cuenta : me.down('#ccuenta').getValue(),
                                                                            cliente : value}
                                    cuentasDocumentos.load();

                                    var cuentacorriente = Ext.getStore('Cuentacorriente');
                                    var record = cuentacorriente.findRecord('id', value);
                                    return record ? record.get('cliente'): '';
                                } else return "";
                            }
                        },
                        {
                            xtype: 'actioncolumn',
                            width: 55,
                            text: 'Buscar',
                            align: 'center',
                            items: [{
                                icon: preurl_js + 'resources/images/search.png',
                                // Use a URL in the icon config
                                tooltip: 'Buscar',
                                handler: function (grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    reccuenta = cuentascontablecancela.findRecord('id', rec.get('cuenta'));
                                    if(rec.get('cuenta') != 0 && reccuenta.get('cancelaabono') == 1){
                                        Ext.create('Infosys_web.view.cancelaciones.BuscarClientes', {record: rec});
                                    }

                                }
                            }]
                        },  
                        { 
                            text: 'Documento a cancelar',  
                            dataIndex: 'documento', 
                            width:160,
                            editor: {
                                xtype: 'combo',
                                typeAhead: true,
                                displayField: 'documento',
                                valueField: 'id',
                                triggerAction: 'all',
                                selectOnTab: true,
                                editable: false,
                                queryMode: 'remote',
                                store: cuentasDocumentos,
                                itemId: 'cuentaDocto',
                                listConfig: {
                                        width :  350,
                                        minWidth : 350
                                },
                            },
                              renderer: function(value,metaData,r) {
                                    if(value) {
                                        var record = cuentasDocumentos.findRecord('id', value);
                                        return record ? record.get('documento'): '';
                                    } else return "";
                                }                            
                        },{ 
                            text: 'Doc. Pago',  
                            dataIndex: 'docpago', 
                            width: 80,
                            editor: {
                                xtype: 'numberfield', 
                                value : 0,
                                minValue: 0,
                                maxValue: 10000000000
                            }
                         },{ 
                            text: 'Fec Vencimiento',  
                            dataIndex: 'fecvenc', 
                            width: 130,
                            editor: {
                                xtype: 'datefield',
                                itemId: 'fechavencimiento',
                                //format: 'Y/d/m',
                                renderer: Ext.util.Format.dateRenderer('d/m/Y')
                            },

                        },
                        { 
                            text: 'Glosa',  
                            dataIndex: 'glosa', 
                            width: 210,
                            editor: {
                                xtype: 'textfield', 
                                allowBlank: true,
                                value : '',
                            }                            
                        },{ 
                            text: 'Saldo',
                            dataIndex: 'saldo',   
                            width: 85,
                            xtype: 'numbercolumn', 
                            format: '0,000.'                            
                        },                                               
                        { 
                            text: 'Debe',  
                            dataIndex: 'debe', 
                            width: 88,
                            editor: {
                                xtype: 'numberfield', 
                                allowBlank: false,
                                value : 0,
                                minValue: 0,
                                maxValue: 10000000000
                            }
                         },
                        { 
                            text: 'Haber',  
                            dataIndex: 'haber', 
                            width: 88,
                            editor: {
                                xtype: 'numberfield', 
                                allowBlank: false,
                                value : 0,
                                minValue: 0,
                                maxValue: 10000000000
                            }                            
                        }
                        ,
                     
                        /*{ text: 'Valor', dataIndex: 'valor', width: 100, renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,000")}, editor: {xtype: 'numberfield', allowBlank: false,minValue: 0,maxValue: 10000000000}},
                        { text: 'Cantidad', dataIndex: 'cantidad', width: 100, renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,000")}, editor: {xtype: 'numberfield', allowBlank: false,minValue: 0,maxValue: 10000000000}},*/
                        {
                            xtype: 'actioncolumn',
                            width: 64,
                            text: 'Eliminar',
                            align: 'center',
                            items: [{
                                icon: preurl_js + 'resources/images/delete.png',
                                // Use a URL in the icon config
                                tooltip: 'Eliminar',
                                handler: function (grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    if(grid.getStore().getCount()==1){
                                       Ext.Msg.alert('Alerta', 'No puede eliminar el ultimo registro.');

                                       return false; 
                                    }
                                    grid.getStore().remove(rec);
                                }
                            }]
                        }

                        ]
                        }],
                    }
                ];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-save',
                text: 'Grabar',
                action: 'otrosingresosingresargrabar'
            },'-',{
                iconCls: 'icon-reset',
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});
