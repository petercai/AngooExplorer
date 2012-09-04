Ext.ns('ag.exp','ag.exp.App');

ag.exp.App = function(){
    return {

    copymoveCtxMenu : new Ext.menu.Menu({
        id:'copyCtx',
        items: [        {
            id: 'copymoveCtxMenu_copy',
            icon: 'images/_editcopy.png',
            text: 'Copy',
            handler: function() {copymoveCtxMenu.hide();this.copymove('copy');}
        },
        {
            id: 'copymoveCtxMenu_move',
            icon: 'images/_move.png',
            text: 'Move',
            handler: function() { copymoveCtxMenu.hide();this.copymove('move'); }
        },'-', 
        {
            id: 'copymoveCtxMenu_cancel',
            icon: 'images/_cancel.png',
            text: 'Cancel',
            handler: function() { copymoveCtxMenu.hide(); }
        }
    ]
    }),


    copymoveCtx:function (e){
        //ctxMenu.items.get('remove')[node.attributes.allowDelete ? 'enable' : 'disable']();
        this.copymoveCtxMenu.showAt(e.rawEvent.getXY());
    },


    dirContext: function (node, e ) {
        // Select the node that was right clicked
        node.select();
        // Unselect all files in the grid
        ext_itemgrid.getSelectionModel().clearSelections();
        
        dirCtxMenu.items.get('dirCtxMenu_rename')[node.attributes.is_deletable ? 'enable' : 'disable']();
        dirCtxMenu.items.get('dirCtxMenu_remove')[node.attributes.is_deletable ? 'enable' : 'disable']();
        dirCtxMenu.items.get('dirCtxMenu_chmod')[node.attributes.is_chmodable ? 'enable' : 'disable']();
        
        dirCtxMenu.node = node;
        dirCtxMenu.show(e.getTarget(), 't-b?' );
        
    },
    
    copymove:function( action ) {
        var s = dropEvent.data.selections, r = [];
        if( s ) {
            // Dragged from the Grid
            requestParams = getRequestParams();
            requestParams.new_dir = dropEvent.target.id.replace( /_RRR_/g, '/' );
            requestParams.new_dir = requestParams.new_dir.replace( /ext_root/g, '' );
            requestParams.confirm = 'true';
            requestParams.action = action;
            handleCallback(requestParams);
        } else {
            // Dragged from inside the tree
            //alert('Move ' + dropEvent.data.node.id.replace( /_RRR_/g, '/' )+' to '+ dropEvent.target.id.replace( /_RRR_/g, '/' ));
            requestParams = getRequestParams();
            requestParams.dir = datastore.directory.substring( 0, datastore.directory.lastIndexOf('/'));
            requestParams.new_dir = dropEvent.target.id.replace( /_RRR_/g, '/' );
            requestParams.new_dir = requestParams.new_dir.replace( /ext_root/g, '' );
            requestParams.selitems = Array( dropEvent.data.node.id.replace( /_RRR_/g, '/' ) );
            requestParams.confirm = 'true';
            requestParams.action = action;
            handleCallback(requestParams);
        }
    },

    // trigger the data store load
    loadDir:function() {
        datastore.load({params:{start:0, limit:150, dir: datastore.directory, option:'com_extplorer', action:'getdircontents', sendWhat: datastore.sendWhat }});
    },
   
    
    rowContextMenu:function(grid, rowIndex, e, f) {
        if( typeof e == 'object') {
            e.preventDefault();
        } else {
            e = f;
        }
        gsm = ext_itemgrid.getSelectionModel();
        gsm.clickedRow = rowIndex;
        var selections = gsm.getSelections();
        if( selections.length > 1 ) {
            gridCtxMenu.items.get('gc_edit').disable();
            gridCtxMenu.items.get('gc_delete').enable();
            gridCtxMenu.items.get('gc_rename').disable();
            gridCtxMenu.items.get('gc_chmod').enable();
            gridCtxMenu.items.get('gc_download').disable();
            gridCtxMenu.items.get('gc_extract').disable();
            gridCtxMenu.items.get('gc_archive').enable();
            gridCtxMenu.items.get('gc_view').enable();
        } else if(selections.length == 1) {
            gridCtxMenu.items.get('gc_edit')[selections[0].get('is_editable')&&selections[0].get('is_readable') ? 'enable' : 'disable']();
            gridCtxMenu.items.get('gc_delete')[selections[0].get('is_deletable') ? 'enable' : 'disable']();
            gridCtxMenu.items.get('gc_rename')[selections[0].get('is_deletable') ? 'enable' : 'disable']();
            gridCtxMenu.items.get('gc_chmod')[selections[0].get('is_chmodable') ? 'enable' : 'disable']();
            gridCtxMenu.items.get('gc_download')[selections[0].get('is_readable')&&selections[0].get('is_file') ? 'enable' : 'disable']();
            gridCtxMenu.items.get('gc_extract')[selections[0].get('is_archive') ? 'enable' : 'disable']();
            gridCtxMenu.items.get('gc_archive').enable();
            gridCtxMenu.items.get('gc_view').enable();
        }
        gridCtxMenu.show(e.getTarget(), 'tr-br?' );

    },
        
    handleRowClick:function (sm, rowIndex) {
        var selections = sm.getSelections();
        tb = ext_itemgrid.getTopToolbar();
        if( selections.length > 1 ) {
            tb.items.get('tb_edit').disable();
            tb.items.get('tb_delete').enable();
            tb.items.get('tb_rename').disable();
            tb.items.get('tb_chmod').enable();
            tb.items.get('tb_download').disable();
            tb.items.get('tb_extract').disable();
            tb.items.get('tb_archive').enable();
            tb.items.get('tb_view').enable();
        } else if(selections.length == 1) {
            tb.items.get('tb_edit')[selections[0].get('is_editable')&&selections[0].get('is_readable') ? 'enable' : 'disable']();
            tb.items.get('tb_delete')[selections[0].get('is_deletable') ? 'enable' : 'disable']();
            tb.items.get('tb_rename')[selections[0].get('is_deletable') ? 'enable' : 'disable']();
            tb.items.get('tb_chmod')[selections[0].get('is_chmodable') ? 'enable' : 'disable']();
            tb.items.get('tb_download')[selections[0].get('is_readable')&&selections[0].get('is_file') ? 'enable' : 'disable']();
            tb.items.get('tb_extract')[selections[0].get('is_archive') ? 'enable' : 'disable']();
            tb.items.get('tb_archive').enable();
            tb.items.get('tb_view').enable();
        } else {
            tb.items.get('tb_edit').disable();
            tb.items.get('tb_delete').disable();
            tb.items.get('tb_rename').disable();
            tb.items.get('tb_chmod').disable();
            tb.items.get('tb_download').disable();
            tb.items.get('tb_extract').disable();
            tb.items.get('tb_view').disable();
            tb.items.get('tb_archive').disable();
        }
        return true;
    },        
        
            // pluggable renders
    renderFileName: function(value,p, record){
        var t = new Ext.Template("<img src=\"{0}\" alt=\"* \" align=\"absmiddle\" />&nbsp;<b>{1}</b>");
        return t.apply([record.get('icon'), value] );
    },
    renderType: function(value){
        var t = new Ext.Template("<i>{0}</i>");
        return t.apply([value]);
    },
    filterDataStore: function(btn,e) { 
        var filterVal = Ext.getCmp("filterField").getValue();
        if( filterVal.length > 1 ) {
            datastore.filter( 'name', eval('/'+filterVal+'/gi') );
        } else {
            datastore.clearFilter();
        }
    },

        init: function(){
	Ext.BLANK_IMAGE_URL = "scripts/extjs34/resources/images/default/s.gif";
    // create the Data Store
    datastore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: "index.php",
            directory: "/",
            params:{start:0, limit:150, dir: this.directory, option:"com_extplorer", action:"getdircontents" }
        }),
		directory: "/",
		sendWhat: "both",
        // create reader that reads the File records
        reader: new Ext.data.JsonReader({
            root: "items",
            totalProperty: "totalCount"
        }, Ext.data.Record.create([
            {name: "name"},
            {name: "size"},
            {name: "type"},
            {name: "modified"},
            {name: "perms"},
            {name: "icon"},
            {name: "owner"},
            {name: "is_deletable"},
            {name: "is_file"},
            {name: "is_archive"},
            {name: "is_writable"},
            {name: "is_chmodable"},
            {name: "is_readable"},
            {name: "is_deletable"},
            {name: "is_editable"}
        ])),

        // turn on remote sorting
        remoteSort: true
    });
    datastore.paramNames["dir"] = "direction";
    datastore.paramNames["sort"] = "order";
    
    datastore.on("beforeload", function(ds, options) {
    								options.params.dir = options.params.dir ? options.params.dir : ds.directory;
    								options.params.option = "com_extplorer";
    								options.params.action = "getdircontents";
    								options.params.sendWhat = datastore.sendWhat;    								
    								}
    							 );

    var gridtb = new Ext.Toolbar([
                         	{
                             	xtype: "tbbutton",
                         		id: 'tb_home',
                         		icon: 'images/_home.png',
                         		text: 'Home',
                         		tooltip: 'Home',
                         		cls:'x-btn-text-icon',
                         		handler: function() { chDir('') }
                         	},
                            {
                         		xtype: "tbbutton",
                         		id: 'tb_reload',
                              	icon: 'images/_reload.png',
                              	text: 'Reload',
                            	tooltip: 'Reload',
                              	cls:'x-btn-text-icon',
                              	handler: this.loadDir
                            },
                                                          	{
                              		xtype: "tbbutton",
                             		id: 'tb_search',
                              		icon: 'images/_filefind.png',
                              		text: 'Search',
                              		tooltip: 'Search',
                              		cls:'x-btn-text-icon',
                              		handler: function() { openActionDialog(this, 'search'); }
                              	},
                                                        '-',
                            {
                            	xtype: "tbbutton",
                         		id: 'tb_new',
                              		icon: 'images/_filenew.png',
                              		tooltip: 'New File/Directory',
                              		cls:'x-btn-icon',
                              		disabled: false,
                              		handler: function() { openActionDialog(this, 'mkitem'); }
                              	},
                              	{
                              		xtype: "tbbutton",
                             		id: 'tb_edit',
                              		icon: 'images/_edit.png',
                              		tooltip: 'Edit',
                              		cls:'x-btn-icon',
                              		disabled: false,
                              		handler: function() { openActionDialog(this, 'edit'); }
                              	},
                              	{
                              		xtype: "tbbutton",
                             		id: 'tb_copy',
                              		icon: 'images/_editcopy.png',
                              		tooltip: 'Copy',
                              		cls:'x-btn-icon',
                              		disabled: false,
                              		handler: function() { openActionDialog(this, 'copy'); }
                              	},
                              	{
                              		xtype: "tbbutton",
                             		id: 'tb_move',
                              		icon: 'images/_move.png',
                              		tooltip: 'Move',
                              		cls:'x-btn-icon',
                              		disabled: false,
                              		handler: function() { openActionDialog(this, 'move'); }
                              	},
                              	{
                              		xtype: "tbbutton",
                             		id: 'tb_delete',
                              		icon: 'images/_editdelete.png',
                              		tooltip: 'Delete',
                              		cls:'x-btn-icon',
                              		disabled: false,
                              		handler: function() { openActionDialog(this, 'delete'); }
                              	},
                              	{
                              		xtype: "tbbutton",
                             		id: 'tb_rename',
                              		icon: 'images/_fonts.png',
                              		tooltip: 'Rename',
                              		cls:'x-btn-icon',
                              		disabled: false,
                              		handler: function() { openActionDialog(this, 'rename'); }
                              	},
                              	{
                              		xtype: "tbbutton",
                             		id: 'tb_chmod',
                              		icon: 'images/_chmod.png',
                              		tooltip: 'Change (chmod) Rights (Folder/File(s))',
                              		cls:'x-btn-icon',
                              		disabled: false,
                              		handler: function() { openActionDialog(this, 'chmod'); }
                              	},
                              	'-',
                              	{
                              		xtype: "tbbutton",
                             		id: 'tb_view',
                              		icon: 'images/_view.png',
                              		tooltip: 'View',
                              		cls:'x-btn-icon',
                              		handler: function() { openActionDialog(this, 'view'); }
                              	},
                              	{
                              		xtype: "tbbutton",
                             		id: 'tb_diff',
                              		icon: 'images/extension/document.png',
                              		tooltip: 'Diff',
                              		cls:'x-btn-icon',
                              		disabled: false,
                              		handler: function() { openActionDialog(this, 'diff'); }
                              	},
                              	{
                              		xtype: "tbbutton",
                             		id: 'tb_download',
                              		icon: 'images/_down.png',
                              		tooltip: 'Download',
                              		cls:'x-btn-icon',
                              		disabled: false,
                              		handler: function() { openActionDialog(this,'download'); }
                              	},
                              	'-',
                              	{
                              		xtype: "tbbutton",
                             		id: 'tb_upload',
                              		icon: 'images/_up.png',
                              		tooltip: 'Upload',
                              		cls:'x-btn-icon',
                              		disabled: false,
                              		handler: function() { 
                                  		Ext.ux.OnDemandLoad.load("scripts/extjs3-ext/ux.swfupload/SwfUploadPanel.css");
                              			Ext.ux.OnDemandLoad.load("scripts/extjs3-ext/ux.swfupload/SwfUpload.js" );
                              			Ext.ux.OnDemandLoad.load("scripts/extjs3-ext/ux.swfupload/SwfUploadPanel.js",
                              		    	function(options) { openActionDialog(this, 'upload'); }); 
                          		    }
                              	},
                              	{
                              		xtype: "tbbutton",
                             		id: 'tb_archive',
                              		icon: 'images/_archive.png',
                              		tooltip: 'Archive',
                          			cls:'x-btn-icon',
                          			                              		handler: function() { openActionDialog(this, 'archive'); }
                          			                              	},{
                              		xtype: "tbbutton",
                             		id: 'tb_extract',
                              		icon: 'images/_extract.gif',
                              		tooltip: 'Extract Archive',
                              		cls:'x-btn-icon',
                          			                              		handler: function() { openActionDialog(this, 'extract'); }
                          			                          		},
                              	'-',
                              	{
                          			xtype: "tbbutton",
                             		id: 'tb_info',
                              		icon: 'images/_help.png',
                              		tooltip: 'About...',
                              		cls:'x-btn-icon',
                              		handler: function() { openActionDialog(this, 'get_about'); }
                              	},
                              	'-',
                              	                          	    	{	// ADMIN
                          	    		xtype: "tbbutton",
                                 		id: 'tb_admin',
                          	    		icon: 'images/_admin.gif',
                          	    		tooltip: 'Admin',
                          	    		cls:'x-btn-icon',
                          	    		handler: function() { openActionDialog(this, 'admin'); }
                          	    	},
                          	    	                          	    	{	// LOGOUT
                          	    		xtype: "tbbutton",
                                 		id: 'tb_logout',
                          	    		icon: 'images/_logout.png',
                          	    		tooltip: 'Logout',
                          	    		cls:'x-btn-icon',
                          	    		handler: function() { document.location.href='index.php?option=com_extplorer&action=logout&order=name&direction=ASC'; }
                          	    	},		
                          	    	'-',
                          					
                            	new Ext.Toolbar.Button( {
                            		text: 'Show Directories',
                            		enableToggle: true,
                            		pressed: true,
                            		handler: function(btn,e) { 
                            					if( btn.pressed ) {
                            						datastore.sendWhat= 'both';
                            						this.loadDir();
                            					} else {
                            						datastore.sendWhat= 'files';
                            						this.loadDir();
                            					}
                            			}
                            	}), '-',
                            	new Ext.form.TextField( { 
                                	name: "filterValue", 
                                	id: "filterField",
                                	enableKeyEvents: true,
                                	title: "Filter",
                            		listeners: { 
                            			"keypress": { fn: 	function(textfield, e ) {
					                            		    	if( e.getKey() == Ext.EventObject.ENTER ) {
					                            		    		filterDataStore();
					                            		    	}
	                            							}
                            						}
                            		}
                                }),
                            	new Ext.Toolbar.Button( {
                            		text: '&nbsp;X&nbsp;',
                            	handler: function() { 
                                	datastore.clearFilter();
                                	Ext.getCmp("filterField").setValue(""); 
                                	}
                            	})

                            ]);
    // add a paging toolbar to the grid's footer
    var gridbb = new Ext.PagingToolbar({
        store: datastore,
        pageSize: 150,
        displayInfo: true,
        displayMsg: 'Displaying Items {0} - {1} of {2}',
        emptyMsg: 'No items to display',
        beforePageText: 'Page',
		afterPageText: 'of {0}',
		firstText: 'First Page',
		lastText: 'Last Page',
		nextText: 'Next Page',
		prevText: 'Previous Page',
		refreshText: 'Reload',
		items: ['-',' ',' ',' ',' ',' ',
			new Ext.ux.StatusBar({
			    defaultText: 'Done.',
			    id: 'statusPanel'
			})]
    });
    
    // the column model has information about grid columns
    // dataIndex maps the column to the specific data field in
    // the data store
    var cm = new Ext.grid.ColumnModel({
		columns: [{
           id: 'gridcm', // id assigned so we can apply custom css (e.g. .x-grid-col-topic b { color:#333 })
           header: "Name",
           dataIndex: 'name',
           width: 250,
		   sortable: true,
           renderer: this.renderFileName,
           editor: new Ext.form.TextField({
					allowBlank: false
				}),
           css: 'white-space:normal;'
        },{
           header: "Size",
           dataIndex: 'size',
           width: 50,
		   sortable: true
        },{
           header: "Type",
           dataIndex: 'type',
           width: 70,
		   sortable: true,
           align: 'right',
           renderer: this.renderType
        },{
           header: "Modified",
           dataIndex: 'modified',
           width: 150,
		   sortable: true
        },{
           header: "Perms",
           dataIndex: 'perms',
           width: 100,
		   sortable: true
        },{
           header: "Owner",
           dataIndex: 'owner',
           width: 100,
           sortable: false
        }, 
        { dataIndex: 'is_deletable', header: "is_deletable", hidden: true, hideable: false },
        {dataIndex: 'is_file', hidden: true, hideable: false },
        {dataIndex: 'is_archive', hidden: true, hideable: false },
        {dataIndex: 'is_writable', hidden: true, hideable: false },
        {dataIndex: 'is_chmodable', hidden: true, hideable: false },
        {dataIndex: 'is_readable', hidden: true, hideable: false },
        {dataIndex: 'is_deletable', hidden: true, hideable: false },
        {dataIndex: 'is_editable', hidden: true, hideable: false }],
	defaults: {
		sortable: true
		}
        });


    // Unregister the default double click action (which makes the name field editable - we want this when the user clicks "Rename" in the menu)
    //ext_itemgrid.un('celldblclick', ext_itemgrid.onCellDblClick);
    

    
    // The Quicktips are used for the toolbar and Tree mouseover tooltips!
	Ext.QuickTips.init();
	
    

    gridCtxMenu = new Ext.menu.Menu({
    	id:'gridCtxMenu',
    
        items: [{
    		id: 'gc_edit',
    		icon: 'images/_edit.png',
    		text: 'Edit',
    		handler: function() { openActionDialog(this, 'edit'); }
    	},
    	{
    		id: 'gc_diff',
    		icon: 'images/extension/document.png',
    		text: 'Diff',
    		handler: function() { openActionDialog(this, 'diff'); }
    	},
    	{
    		id: 'gc_rename',
    		icon: 'images/_fonts.png',
    		text: 'Rename',
    		handler: function() { ext_itemgrid.onCellDblClick( ext_itemgrid, gsm.clickedRow, 0 ); gsm.clickedRow = null; }
    	},
    	{
        	id: 'gc_copy',
    		icon: 'images/_editcopy.png',
    		text: 'Copy',
    		handler: function() { openActionDialog(this, 'copy'); }
    	},
    	{
    		id: 'gc_move',
    		icon: 'images/_move.png',
    		text: 'Move',
    		handler: function() { openActionDialog(this, 'move'); }
    	},
    	{
    		id: 'gc_chmod',
    		icon: 'images/_chmod.png',
    		text: 'Change (chmod) Rights (Folder/File(s))',
    		handler: function() { openActionDialog(this, 'chmod'); }
    	},
    	{
    		id: 'gc_delete',
    		icon: 'images/_editdelete.png',
    		text: 'Delete',
    		handler: function() { openActionDialog(this, 'delete'); }
    	},
    	'-',
    	{
    		id: 'gc_view',
    		icon: 'images/_view.png',
    		text: 'View',
    		handler: function() { openActionDialog(this, 'view'); }
    	},
    	{
    		id: 'gc_download',
    		icon: 'images/_down.png',
    		text: 'Download',
    		handler: function() { openActionDialog(this,'download'); }
    	},
    	'-',
    		    	{
    			id: 'gc_archive',
	    		icon: 'images/_archive.png',
	    		text: 'Archive',
	    		handler: function() { openActionDialog(this, 'archive'); }
	    	},
	    	{
	    		id: 'gc_extract',
	    		icon: 'images/_extract.gif',
	    		text: 'Extract Archive',
	    		handler: function() { openActionDialog(this, 'extract'); }
	    	},
    	    	'-',
		{
			id: 'cancel',
    		icon: 'images/_cancel.png',
    		text: 'Cancel',
    		handler: function() { gridCtxMenu.hide(); }
    	}
    	]
    });
    	

    // context menus
    var dirCtxMenu = new Ext.menu.Menu({
        id:'dirCtxMenu',
        items: [    	{
        	id: 'dirCtxMenu_new',
    		icon: 'images/_folder_new.png',
    		text: 'New File/Directory',
    		handler: function() {dirCtxMenu.hide();openActionDialog(this, 'mkitem');}
    	},
    	{
    		id: 'dirCtxMenu_rename',
    		icon: 'images/_fonts.png',
    		text: 'Rename',
    		handler: function() { dirCtxMenu.hide();openActionDialog(this, 'rename'); }
    	},
    	{
        	id: 'dirCtxMenu_copy',
    		icon: 'images/_editcopy.png',
    		text: 'Copy',
    		handler: function() { dirCtxMenu.hide();openActionDialog(this, 'copy'); }
    	},
    	{
    		id: 'dirCtxMenu_move',
    		icon: 'images/_move.png',
    		text: 'Move',
    		handler: function() { dirCtxMenu.hide();openActionDialog(this, 'move'); }
    	},
    	{
    		id: 'dirCtxMenu_chmod',
    		icon: 'images/_chmod.png',
    		text: 'Change (chmod) Rights (Folder/File(s))',
    		handler: function() { dirCtxMenu.hide();openActionDialog(this, 'chmod'); }
    	},
    	{
    		id: 'dirCtxMenu_remove',
    		icon: 'images/_editdelete.png',
    		text: 'Remove',
    		handler: function() { dirCtxMenu.hide();var num = 1; Ext.Msg.confirm('Confirm', String.format("Are you sure you want to delete these {0} item(s)?", num ), function(btn) { deleteDir( btn, dirCtxMenu.node ) }); }
    	},'-',
    		    	{
    			id: 'dirCtxMenu_archive',
	    		icon: 'images/_archive.png',
	    		text: 'Archive',
	    		handler: function() { openActionDialog(this, 'archive'); }
	    	},
    	    	{
    		id: 'dirCtxMenu_reload',
    		icon: 'images/_reload.png',
    		text: 'Reload',
    		handler: function() { dirCtxMenu.hide();dirCtxMenu.node.reload(); }
    	},
    	'-', 
		{
			id: 'dirCtxMenu_cancel',
    		icon: 'images/_cancel.png',
    		text: 'Cancel',
    		handler: function() { dirCtxMenu.hide(); }
    	}
	]
    });

    
	// Hide the Admin Menu under Joomla! 1.5
	try{ 
    		Ext.fly('header-box').hide();Ext.fly('border-top').hide();
	} catch(e) {}
	// Hide the Admin Menu under Joomla! 1.0
	try{
		Ext.fly('header').hide();Ext.select(".menubar").hide();
	} catch(e) {}
	
	var viewport = new Ext.Viewport({
	    layout:'border',
	    defaults: {
	        split: true
	    },
	    items:[{
	        region:"north",
            initialSize: 50,
            titlebar: false,
            closable: false,
            contentEl: "ext_header"
        },{
            xtype: "treepanel",
            region: "west",
        	id: "dirTree",
        	title: 'Directory Tree <img src="images/_reload.png" hspace="20" style="cursor:pointer;" title="reload" onclick="Ext.getCmp(\'dirTree\').getRootNode().reload();" alt="Reload" align="middle" />', 
        	closable: false,
            width: 230,
            titlebar: true,
            autoScroll:true,
    	    animate:true, 
    	    //rootVisible: false,
    	    loader: new Ext.tree.TreeLoader({
    	    	preloadChildren: true,
    	        dataUrl:'index.php',
    	        baseParams: {option:'com_extplorer', action:'getdircontents', dir: '',sendWhat: 'dirs'} // custom http params
    	    }),
    	    containerScroll: true,
    	    enableDD:true,
    	    ddGroup : 'TreeDD',
        	listeners: {
            	//"load": { fn: function(node) { chDir( node.id.replace( /_RRR_/g, '/' ), true ); } }, 
        		'contextmenu': { fn: this.dirContext },
    			'textchange': { fn: function(node, text, oldText) {
    						if( text == oldText ) return true;
    						var requestParams = getRequestParams();
    						var dir = node.parentNode.id.replace( /_RRR_/g, '/' );
    						if( dir == 'ext_root' ) dir = '';
    						requestParams.dir = dir;
    						requestParams.newitemname = text;
    						requestParams.item = oldText;
    						
    						requestParams.confirm = 'true';
    						requestParams.action = 'rename';
    						handleCallback(requestParams);
    						ext_itemgrid.stopEditing();
    						return true;
    					}	
        		},
        		'beforenodedrop': { fn: function(e){
    						    	    	dropEvent = e;
    						    	    	this.copymoveCtx(e);
    						    	    }
        		},
        		'beforemove': { fn: function() { return false; } }
        	},
        	root: new Ext.tree.AsyncTreeNode({
                text: '/', 
                draggable:false, 
                expanded: true,
                id:'ext_root',
                listeners: {
            		'contextmenu': { fn: this.dirContext },
            		'load': { fn: expandTreeToDir }
            	}
            })
        },{
            layout: "border",
            region: "center",
            items: [{
                region: "north",
                xtype: "locationbar",
                id: "locationbarcmp",
                height: 28
            	},
            	{
                region: "center",
                xtype: "tabpanel",
	            id: "mainpanel",
	            enableTabScroll: true,
	            activeTab: 0,
	            items: [{
					xtype: "editorgrid",
		        	region: "center",
		            title: "Directory",
		            autoScroll:true,
		            collapsible: false,
		            closeOnTab: true,
		            id: "gridpanel",
		            ds: datastore,
		            cm: cm,
		           	tbar: gridtb,
		            bbar: gridbb,
		            ddGroup : 'TreeDD',
		            enableDragDrop: true,
		            selModel: new Ext.grid.RowSelectionModel({
		                		listeners: {
		        					'rowselect': { fn: this.handleRowClick },
		                			'selectionchange': { fn: this.handleRowClick }
		            			}
		            		  }),
		            loadMask: true,
		            keys:
		            	[{
		                    key: 'c',
		                    ctrl: true,
		                    stopEvent: true,
		                    handler: function() { openActionDialog(this, 'copy'); }
		                   
		               },{
		                    key: 'x',
		                    ctrl: true,
		                    stopEvent: true,
		                    handler: function() { openActionDialog(this, 'move'); }
		                   
		               },{
		                 key: 'a',
		                 ctrl: true,
		                 stopEvent: true,
		                 handler: function() {
		            		ext_itemgrid.getSelectionModel().selectAll();
		                 }
		            }, 
		            {
		            	key: Ext.EventObject.DELETE,
		            	handler: function() { openActionDialog(this, 'delete'); }
		            }
		            ],
		        	listeners: { 'rowcontextmenu': { fn: this.rowContextMenu },
		        			'celldblclick': { fn: function( grid, rowIndex, columnIndex, e ) { 
	        										if( Ext.isOpera ) { 
	            										// because Opera <= 9 doesn't support the right-mouse-button-clicked event (contextmenu)
	            										// we need to simulate it using the ondblclick event
														this.rowContextMenu( grid, rowIndex, e );
													} else {
												    	gsm = ext_itemgrid.getSelectionModel();
												    	gsm.clickedRow = rowIndex;
												    	var selections = gsm.getSelections();
												    	if( !selections[0].get('is_file') ) {
													    	chDir( datastore.directory + '/' + selections[0].get('name') );
												    	} else if( selections[0].get('is_editable')) {
													    	openActionDialog( this, 'edit' );
												    	} else if( selections[0].get('is_readable')) {
													    	openActionDialog( this, 'view' );
												    	}
													}
												}
							 },
		        			'validateedit': { fn: function(e) {
		    						if( e.value == e.originalValue ) return true;
		    						var requestParams = getRequestParams();
		    						requestParams.newitemname = e.value;
		    						requestParams.item = e.originalValue;
		    						
		    						requestParams.confirm = 'true';
		    						requestParams.action = 'rename';
		    						handleCallback(requestParams);
		    						return true;
		    					}	
		        			}        			
	        			}
		        	}]
            	}]
	        }
        ],
        renderTo: Ext.getBody(),
        listeners: { "afterlayout": {
	        			fn: function() {
	        				ext_itemgrid = Ext.getCmp("gridpanel");
							//dirTree = Ext.getCmp("dirTree");
							locbar = Ext.getCmp("locationbarcmp");
							locbar.tree = Ext.getCmp("dirTree");
	        				try{ locbar.initComponent(); } catch(e) {}
	        			    /*
	        			    dirTree.loader.on('load', function(loader, o, response ) {
	        			    									if( response && response.responseText ) {
	        				    									var json = Ext.decode( response.responseText );
	        				    									if( json && json.error ) {
	        				    										Ext.Msg.alert('Error', json.error +'onLoad');
	        				    									}
	        				    								}
	        			    });*/
	        			    
	        			    
	        			    var tsm = Ext.getCmp("dirTree").getSelectionModel();
	        			    tsm.on('selectionchange', handleNodeClick );
	        			    
	        			    // create the editor for the directory tree
	        			    var dirTreeEd = new Ext.tree.TreeEditor(Ext.getCmp("dirTree"), {
	        			        allowBlank:false,
	        			        blankText:'A name is required',
	        			        selectOnFocus:true
	        			    });							

	        				chDir( '' );
							
	    				}
	    			}
		}
    });
	Ext.state.Manager.setProvider(new Ext.state.CookieProvider({
	    expires: new Date(new Date().getTime()+(1000*60*60*24*7)) //7 days from now
	}));
		
        
}// END OF init
    }
}();
if( typeof Ext == 'undefined' ) {
	document.location = 'index.php?option=com_extplorer&nofetchscript=1';
}

function startExtplorer() {
	if(Ext.isIE){
		// As this file is included inline (because otherwise it would throw Element not found JS errors in IE)
		// we need to run the init function onLoad, not onDocumentReady in IE
		Ext.EventManager.addListener(window, "load", ag.exp.App.init );
	} else {
		// Other Browsers eat onReady
		Ext.onReady( ag.exp.App.init,ag.exp.App );
	}
}
startExtplorer();


