Ext.define('Infosys_web.view.TopMenus' ,{
    extend: 'Ext.toolbar.Toolbar',
    alias : 'widget.topmenus',
    
    requires: [
        'Ext.button.Split'
    ],
    
    initComponent: function() {
        var me = this

        this.items = [{
            xtype: 'button',
            iconCls: 'icon-note',
            text : 'Parametros Generales',
            //hidden: true,
            menu: [{
                text: 'Cuentas de Centralizacion',
                iconCls: '',
                menu: [{
                        text: 'Ventas',
                        iconCls: '',
                        itemId: 'pg_cc_ventas',
                        disabled: true,
                        action: 'mcentraliza'
                        //hidden: true
                     
                },{
                        text: 'Adquisiciones',
                        iconCls: '',
                        itemId: 'pg_cc_adq',
                        disabled: true,
                        action: ''
                },{
                        text: 'Inventario',
                        iconCls: '',
                        itemId: 'pg_cc_inventario',
                        disabled: true,
                        action: ''
                },{
                        text: 'Cuentas Corrientes',
                        iconCls: '',
                        itemId: 'pg_cc_ccorrientes',
                        disabled: true,
                        action: ''
                }]

           },{
                text: 'Clave Autorizacion',
                iconCls: '',
                itemId: 'pg_clave_autoriza',
                disabled: true,
                action: 'mcambioClave'
                //hidden: true
                     
            },{
                text: 'Parametros de Sistema',
                iconCls: '',
                itemId: 'pg_psistema',
                disabled: true,
                action: ''
            
            },
            {
                text: 'Control Correlativos',
                iconCls: '',
                itemId: 'pg_ccorrelativos',
                disabled: true,
                action: 'mcorrelativos'
            
            }],
           
        },{
            xtype: 'button',
            iconCls: 'icon-casa',
            text : 'Inventario',
            menu: [{
                text: 'Tablas Generales',
                
                menu: [{
                        text: 'Productos',
                        iconCls: '',
                        disabled: true,
                        itemId: 'inv_tg_productos',
                        action: 'mproductos'
                    },{
                        text: 'Actualizar Precios',
                        iconCls: '',
                        disabled: true,
                        itemId: 'inv_tp_precios',
                        action: 'mprecios'
                    },{
                    text: 'Codigo Productos',
                    itemId: 'inv_tg_cproductos',
                        disabled: true,
                    iconCls: '',
                    menu: [{
                        text: 'Familias Productos',
                        iconCls: '',
                        action: 'mfamilias'
                    },{
                        text: 'Sub Familia Productos',
                        iconCls: '',                        
                        action: 'msubfamilias'
                    },{
                        text: 'Agrupacion Productos',
                        iconCls: '',                       
                        action: 'magrupaciones'
                                          
                }]
                },{
                    text: 'Bodegas',
                    iconCls: '',
                        itemId: 'inv_tg_bodegas',
                        disabled: true,
                    action: 'mbodegas'

                },{
                    text: 'Marcas',
                    iconCls: '',
                        itemId: 'inv_tg_marcas',
                        disabled: true,
                    action: 'mmarcas'

                },{
                    text: 'Ubicaciones',
                    iconCls: '',
                        itemId: 'inv_tg_ubicaciones',
                        disabled: true,
                    action: 'mubica'

                },{
                    text: 'Unidad de Medida',
                    iconCls: '',
                        itemId: 'inv_tg_umedida',
                        disabled: true,
                    action: 'mmedidas'

                                          
                },{
                    text: 'Tipo Movimientos',
                    iconCls: '',
                        itemId: 'inv_tg_tmovimientos',
                        disabled: true,
                    action: 'mtipomovimiento'

                }]

            },{
                text: 'Ingreso Movimientos',
                iconCls: '',
                 menu: [{
                        text: 'Inventario Inicial',
                        itemId: 'inv_inm_iinicial',
                        disabled: true,
                        iconCls: '',
                        action: 'minventario'
                    },{
                        text: 'Movimiento Diario',
                        iconCls: '',
                        itemId: 'inv_inm_mdiario',
                        disabled: true,
                        action: 'mtipomovimientoinventario'                        
                    },{
                        text: 'Estadisticas',
                        iconCls: '',
                        menu: [{
                                text: 'Existencia',
                                iconCls: '',
                                itemId: 'inv_inm_estadisticas',
                                disabled: true,
                                action: 'mexistencia'
                            },{
                                text: 'Existencia por Cliente',
                                itemId: 'inv_inm_Clientes',
                                disabled: true,
                                iconCls: '',
                                action: 'mexistenciaclientes'
                            },{
                                text: 'Movimiento Productos',
                                iconCls: '',
                                disabled: true,
                                action: ''
                            },{
                                text: 'Inventario Valorizado',
                                iconCls: '',
                                disabled: true,
                                action: ''    
                            },{
                                text: 'Inventario Selectivo',
                                iconCls: '',
                                action: ''                                          
                        }]
                                                                
                }]
            },{
                text: 'Centralizacion',
                iconCls: '',
                menu: [{
                        text: 'Centralizacion Contable',
                        iconCls: '',
                        itemId: 'inv_cen_ccontable',
                        disabled: true,
                        action: ''
                }]
                
            },{
                text: 'Cierre',
                iconCls: '',
                menu: [{
                        text: 'Cierre Mensual',
                        iconCls: '',
                        itemId: 'inv_cierr_cmensual',
                        disabled: true,
                        action: ''
                }]

            }],
            },'-',{
            xtype: 'button',
            iconCls: 'icon-user',
            text : 'Adquisiciones',
            menu: [{
                text: 'Tablas Generales',
                iconCls: '',
                menu: [{
                        text: 'Tipo Documentos Compras',
                        iconCls: '',
                        itemId: 'adq_tg_parametros',
                        disabled: true,
                        action: 'mtipodocumento'
                },{
                        text: 'Proveedores',
                        iconCls: '',
                        itemId: 'adq_tg_proveedores',
                        disabled: true,
                        action: 'mproveedores'
                }]

            },
            {
                text: 'Movimiento Diario',
                iconCls: '',
                menu: [{
                        text: 'Orden de Compra',
                        iconCls: '',
                        itemId: 'adq_md_oc',
                        disabled: true,
                        action: 'mordencompra'
                },{
                        text: 'Recepcion de Compra',
                        iconCls: '',
                        itemId: 'adq_md_rcompra',
                        disabled: true,
                        action: 'mordencomprarec'
                },{
                        text: 'Recepcion Forzada',
                        iconCls: '',
                        itemId: 'adq_md_rf',
                        disabled: true,
                        action: 'mordencomprafor'
                }]
            },{
                text: 'Consultas y Reportes',
                iconCls: '', 
                menu: [{
                        text: 'Orden de Compra',
                        iconCls: '',
                        itemId: 'adq_cr_oc',
                        disabled: true,
                        action: 'rordencompra'
                },{
                        text: 'Recepcion de Compra',
                        iconCls: '',
                        itemId: 'adq_cr_rcompra',
                        disabled: true,
                        action: 'mrecepcion'
                },{
                        text: 'Recepcion Forzada',
                        iconCls: '',
                        itemId: 'adq_cr_rf',
                        disabled: true,
                        action: ''
                }]

            },{
                text: 'Centralizacion',
                iconCls: '',
                 menu: [{
                        text: 'Centralizacion Contable',
                        iconCls: '',
                        itemId: 'adq_cen_ccontable',
                        disabled: true,
                        action: ''
                }]
             
            }],
           
        },{
            xtype: 'button',
            iconCls: 'icon-carro',
            text : 'Ventas y Facturacion',
            menu: [{
                text: 'Tablas Generales',
                iconCls: '',
                menu: [{
                        text: 'Clientes',
                        iconCls: '',
                        itemId: 'vyf_tg_clientes',
                        disabled: true,
                        action: 'mclientes'
                },{
                        text: 'Vendedores',
                        itemId: 'vyf_tg_vendedores',
                        disabled: true,
                        iconCls: '',
                        action: 'mvendedores'
                },{
                        text: 'Ciudad',
                        itemId: 'vyf_tg_ciudad',
                        disabled: true,
                        iconCls: '',
                        action: 'mciudades'
                },{
                        text: 'Comuna',
                        itemId: 'vyf_tg_comuna',
                        disabled: true,
                        iconCls: '',
                        action: 'mcomunas'
                },{
                        text: 'Codigo Actividad Economica',
                        iconCls: '',
                         itemId: 'vyf_tg_cactividade',
                        disabled: true,
                        action: 'mcodactivecon'
                },{
                        text: 'Condiciones de Pago',
                        itemId: 'vyf_tg_cpago',
                        disabled: true,
                        iconCls: '',
                        action: 'mcondicionpagos'
                },{
                        text: 'Sucursales',
                        itemId: 'vyf_tg_sucursales',
                        disabled: true,
                        iconCls: '',
                        action: 'msucursales'
                },{
                        text: 'Tablas Descuentos',
                        itemId: 'vyf_tg_tablasdescuento',
                        disabled: true,
                        iconCls: '',
                        action: 'mtablas'
                },{
                        text: 'Control de Caja',
                        itemId: 'vyf_tg_ccaja',
                        disabled: true,
                        iconCls: '',
                             menu: [{
                            text: 'Banco',
                            iconCls: '',
                            action: 'mbancos'
                        },{
                            text: 'Plaza',
                            iconCls: '',
                            action: 'mplazas'
                        },{
                            text: 'Cajero',
                            iconCls: '',
                            action: 'mcajeros'
                        },{
                            text: 'Caja',
                            iconCls: '',
                            action: 'mcajas'
                    }]
                }]
              

            },
            {
                text: 'Ingreso de Movimientos',
                iconCls: '',
                 menu: [,{
                        text: 'Punto de Ventas',
                        iconCls: '',
                        //itemId: 'vyf_im_flotes',
                        //disabled: true,
                        menu: [{
                            text: 'Ingreso Nota venta',
                            iconCls: '',
                            action: 'mpreventa'
                        }]
                },{
                        text: 'Ventas',
                        iconCls: '',
                        menu: [{
                            text: 'Venta Directa',
                            itemId: 'vyf_im_ventas',
                            disabled: true,
                            iconCls: '',
                            action: 'mejemplo'
                        },{
                            text: 'Caja',
                            iconCls: '',
                            action: 'mpagocaja'
                        },{
                            text: 'Guia Despacho',
                            iconCls: '',
                            action: 'mguias'
                        },{
                            text: 'Nota de Credito',
                            iconCls: '',
                            action: 'meNotacredito'
                        },{
                            text: 'Nota de Debito',
                            iconCls: '',
                            action: 'meNotadebito'
                        }]
                       
                },{
                        text: 'Control de Caja',
                        iconCls: '',
                        itemId: 'vyf_im_ccaja',
                        disabled: true,
                        menu: [{
                            text: 'Apertura de Caja',
                            iconCls: '',
                            action: ''
                        },{
                            text: 'Ingreso Recaudacion',
                            iconCls: '',
                            action: ''
                        },{
                            text: 'Consulta',
                            iconCls: '',
                            action: ''
                        },{
                            text: 'Libro de Recaudacion',
                            iconCls: '',
                            action: ''
                        },{
                            text: 'Informe de Caja Diaria',
                            iconCls: '',
                            action: ''
                        },{
                            text: 'Cierre de Caja Diaria',
                            iconCls: '',
                            action: ''
                        }]

                },{
                        text: 'Facturacion por Lotes',
                        iconCls: '',
                        itemId: 'vyf_im_flotes',
                        disabled: true,
                        menu: [{
                            text: 'Factura Guias',
                            iconCls: '',
                            action: 'fguias'
                        },{
                            text: 'Factura Nota de Ventas',
                            iconCls: '',
                            action: ''
                        }]
                }]

             
            
            },{
                text: 'Cotizacion y Pedido',
                iconCls: '',
                 menu: [{
                        text: 'Cotizacion',
                        itemId: 'vyf_cp_cotizacion',
                        disabled: true,
                        iconCls: '',
                        action: 'mcotizacion'
                       
                },{
                        text: 'Nota de Venta (Pedidos)',
                        iconCls: '',
                        itemId: 'vyf_cp_nventa',
                        disabled: true,
                        action: ''
                },{
                        text: 'Consultas',
                        iconCls: '',
                        itemId: 'vyf_cp_consultas',
                        disabled: true,
                        menu: [{
                            text: 'Cotizacion',
                            iconCls: '',
                            action: ''
                        },{
                            text: 'Nota de Venta (Pedidos)',
                            iconCls: '',
                            action: ''
                        }]
                }]         

            },{
                text: 'Estadisticas',
                iconCls: '',
                menu: [{
                        text: 'Control Caja',
                        itemId: 'vyf_eds_ventas',
                        disabled: true,
                        action: 'mcontrolcaja'
                       
                },{
                        text: 'Comisiones',
                        itemId: 'vyf_eds_comisiones',
                        disabled: true,
                        iconCls: '',
                        action: 'mcomisiones'
                },{
                        text: 'Recaudaciones',
                        itemId: 'vyf_eds_recaudaciones',
                        disabled: true,
                        iconCls: '',
                        action: 'mrecauda'
                },{
                        text: 'Resportes',
                        disabled: true,
                        itemId: 'vyf_eds_reportes',
                        iconCls: '',
                             menu: [{
                            text: 'Libro Ventas',
                            iconCls: '',
                            action: 'mejemplo'
                        },{
                            text: 'Resumen Ventas',
                            iconCls: '',
                            action: 'resumenventas'
                        },{
                            text: 'Informe Stock',
                            iconCls: '',
                            action: 'informestock'
                        },{
                            text: 'Estad&iacute;stica de Ventas',
                            iconCls: '',
                            action: 'estadisticasventas'
                        }]
                },]

            },{
                text: 'Centralizacion',
                iconCls: '',
                menu: [{
                        text: 'Centralizacion Contable',
                        iconCls: '',
                        itemId: 'vyf_centr_ccontable',
                        disabled: true,
                        action: ''
                }]
             

            },{
                text: 'Facturaci&oacute;n Electr&oacute;nica',
                iconCls: '',
                menu: [{
                        text: 'Registro de Empresa',
                        iconCls: '',
                        itemId: 'vyf_registro_empresa',
                        disabled: '',
                        action: 'mregempresa'
                },{
                        text: 'Par&aacute;metros Generales',
                        iconCls: '',
                        itemId: 'vyf_param_generales',
                        disabled: '',
                        action: 'mparamgenerales'
                },{
                        text: 'Carga Certificado Digital',
                        iconCls: '',
                        itemId: 'vyf_cert_digital',
                        disabled: '',
                        action: 'mcargacertdigital'
                },{
                        text: 'Carga Manual CAF',
                        iconCls: '',
                        itemId: 'vyf_carga_manual_caf',
                        disabled: '',
                        action: 'mcargamanualcaf'
                },{
                        text: 'Carga DTE Compras',
                        iconCls: '',
                        itemId: 'vyf_carga_dte_provee',
                        disabled: '',
                        action: 'mcargadteprovee'
                },{
                        text: 'Generaci&oacute;n Nuevo Libro Compra/Venta',
                        iconCls: '',
                        itemId: 'vyf_libro_compra_venta',
                        disabled: '',
                        action: 'mlibrocompraventa'
                },/*{
                        text: 'Hist&oacute;rico Libros Compra/Venta',
                        iconCls: '',
                        itemId: 'vyf_hist_libro_compra_venta',
                        disabled: '',
                        action: 'mhistlibrocompraventa'
                },*/{
                        text: 'Carga Contribuyentes Autorizados',
                        iconCls: '',
                        itemId: 'vyf_carga_contribuyentes',
                        disabled: '',   
                        action: 'mcargacontribuyentes'
                },{
                        text: 'Consumo de Folios Diario',
                        iconCls: '',
                        itemId: 'vyf_consumo_folios',
                        disabled: '',   
                        action: 'mconsumofolios'
                },{
                        text: 'Registro Emails',
                        iconCls: '',
                        itemId: 'vyf_email',
                        disabled: '',   
                        action: 'memail'
                }]
             

            }],           
        },{
            xtype: 'button',
            iconCls: 'icon-proveedores',
            text : 'Cuentas Corrientes',
            menu: [{
                text: 'Tablas Generales',
                iconCls: '',
                menu: [{
                        text: 'Parametros Generales',
                        iconCls: '',
                         itemId: 'cc_tg_parametros',
                        disabled: true,
                        action: ''
                },{
                        text: 'Asociacion de Cuentas',
                        iconCls: '',
                        itemId: 'cc_tg_creacioncuentas',
                        disabled: true,
                        action: 'cc_tg_creacioncuentas'
                },{
                        text: 'Circularizaciones',
                        iconCls: '',
                         itemId: 'cc_tg_circularizaciones',
                        disabled: true,
                        action: ''
                }]
               
            },
            {
                text: 'Movimiento Diario',
                iconCls: '',
                menu: [{
                        text: 'Cancelaciones',
                        iconCls: '',
                        itemId: 'cc_md_cancelaciones',
                        disabled: true,
                        action: 'cc_md_mcancelaciones'
                },{
                        text: 'Depositos',
                        iconCls: '',
                        itemId: 'cc_md_depositos',
                        disabled: true,
                        action: ''
                },{
                        text: 'Otros Ingresos',
                        iconCls: '',
                        itemId: 'cc_md_oingresos',
                        disabled: true,
                        action: 'cc_md_oingresos'
                },{
                        text: 'Resumen de Movimiento',
                        iconCls: '',
                        itemId: 'cc_md_resmovimiento',
                        disabled: true,
                        action: 'cc_md_resmovimiento'
                },{
                        text: 'Libro Diario',
                        iconCls: '',
                        itemId: 'cc_md_librodiario',
                        disabled: true,
                        action: 'cc_md_librodiario'
                }]
          
            
            },
            {
                text: 'Reportes',
                iconCls: '',
                menu: [{
                        text: 'Saldos de Cliente',
                        iconCls: '',
                        itemId: 'cc_rep_saldos',
                        disabled: true,
                        menu: [{
                            text: 'Saldo de Documentos',
                            iconCls: '',
                            itemId: 'cc_rep_saldosdocumentos',
                            disabled: true,
                            action: 'cc_rep_saldosdocumentos'
                        },{
                            text: 'Detalle de Documentos',
                            iconCls: '',
                            itemId: 'cc_rep_detalledocumentos',
                            disabled: true,
                        }]
                },{
                        text: 'Cartola de Cliente',
                        iconCls: '',
                        itemId: 'cc_rep_cartola',
                        disabled: true,
                        action: 'cc_rep_cartola'
                },{
                        text: 'Flujos',
                        iconCls: '',
                        itemId: 'cc_rep_flujos',
                        disabled: true,
                        menu: [{
                            text: 'Flujo de Caja',
                            iconCls: '',
                            itemId: 'cc_rep_flujocaja',
                            disabled: true
                        },{
                            text: 'Flujo de Vencimiento',
                            iconCls: '',
                            itemId: 'cc_rep_flujovencimiento',
                            disabled: true
                        }]
                },{
                        text: 'Cobranza',
                        iconCls: '',
                        itemId: 'cc_rep_cobranza',
                        disabled: true,
                        menu: [{
                            text: 'Informe de Cobranza',
                            iconCls: '',
                            itemId: 'cc_rep_infcobranza',
                            disabled: true
                        },{
                            text: 'Avisos de Cobranza',
                            iconCls: '',
                            itemId: 'cc_rep_avisocobranza',
                            disabled: true
                        }]
                },{
                        text: 'Circularizaciones',
                        iconCls: '',
                        itemId: 'cc_rep_circularizaciones',
                        disabled: true,
                        menu: [{
                            text: 'Circularizaciones de Saldo',
                            iconCls: '',
                            itemId: 'cc_rep_circsaldo',
                            disabled: true
                        },{
                            text: 'Morosidad Documentos Vencidos',
                            iconCls: '',
                            itemId: 'cc_rep_mordoctosvencidos',
                            disabled: true
                        }]
                },{
                        text: 'Saldo Contable Clientes',
                        iconCls: '',
                        itemId: 'cc_rep_saldocontable',
                        disabled: true,
                        action: ''
                }]
            },{
                text: 'Procesos',
                iconCls: '',
                menu: [{
                        text: 'Centralizaci&oacute;n Diaria',
                        iconCls: '',
                        itemId: 'cc_proc_centdiaria',
                        disabled: true,
                        action: ''
                }]
             

            }],
           
        },{
                xtype: 'button',
                iconCls: 'icon-user',
                text : 'Acceso Directo',
                menu: [
                {
                    text: 'Ventas',
                    iconCls: '',
                    itemId: 'vv_acc_preventa',
                    disabled: true,
                    action: 'mpreventa'                
                },{
                    text: 'Cotizaciones',
                    iconCls: '',
                    itemId: 'vv_acc_cotiza',
                    disabled: true,
                    action: 'mcotizacion'                
                },{
                    text: 'Productos',
                    iconCls: '',
                    itemId: 'vv_acc_productos',
                    disabled: true,
                    action: 'mproductos'                
                }],            
            }
            ,'->',{
                xtype: 'button',
                iconCls: 'icon-user',
                text : 'Usuarios',
                menu: [
                {
                    text: 'Usuarios',
                    itemId: 'sys_user',
                    disabled: true,
                    iconCls: '',
                    action: 'musuarios'
                
                },
                {
                    text: 'Roles',
                    itemId: 'sys_roles',
                    disabled: true,
                    iconCls: '',
                    action: 'mroles'
                
                },
                {
                    text: 'Bitacora',
                    itemId: 'sys_bitacora',
                    disabled: true,
                    iconCls: '',
                    action: 'mbitacora'
                
                }],
               
            },{
                text: 'Salir',
                iconCls: 'disabled',
                handler: function(){
                    Ext.Ajax.request({
                        url: preurl + 'login/salir',
                        success: function(response){
                            window.location = preurl_js;
                        },
                        failure: function(){
                            target.setLoading(false);
                        }
                    });
                }
            },'-',{
                text: 'Mis Datos',
                iconCls: 'micuenta',
                handler: function(){
                    Ext.create('Infosys_web.view.CambioPass').show()
                }
            }
       
            ];
        
        this.callParent(arguments);
    }
});