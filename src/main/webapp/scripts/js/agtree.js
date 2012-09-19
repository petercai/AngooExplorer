age.TreePanel = Ext.extend(Ext.tree.TreePanel,{
	
	        title: 'Directory Tree <img src="images/_reload.png" hspace="20" style="cursor:pointer;" title="reload" onclick="Ext.getCmp(\'dirTree\').getRootNode().reload();" alt="Reload" align="middle" />', 
        	closable: false,
            width: 230,
            titlebar: true,
            autoScroll:true,
    	    animate:true, 
    	    //rootVisible: false,
    containerScroll: true,
    enableDD:true,
    ddGroup : 'TreeDD',
	
	initComponent: function(){
		var me = this;
		
		Ext.applyIf(me,{
		    // context menus
        dirCtxMenu : new Ext.menu.Menu({
        id:'dirCtxMenu',
        items: [        {
            id: 'dirCtxMenu_new',
            icon: 'images/_folder_new.png',
            text: 'New File/Directory',
                handler: function() {me.dirCtxMenu.hide();openActionDialog(this, 'mkitem');}
        },
        {
            id: 'dirCtxMenu_rename',
            icon: 'images/_fonts.png',
            text: 'Rename',
                handler: function() { me.dirCtxMenu.hide();openActionDialog(this, 'rename'); }
        },
        {
            id: 'dirCtxMenu_copy',
            icon: 'images/_editcopy.png',
            text: 'Copy',
                handler: function() { me.dirCtxMenu.hide();openActionDialog(this, 'copy'); }
        },
        {
            id: 'dirCtxMenu_move',
            icon: 'images/_move.png',
            text: 'Move',
                handler: function() { me.dirCtxMenu.hide();openActionDialog(this, 'move'); }
    },
        {
            id: 'dirCtxMenu_chmod',
            icon: 'images/_chmod.png',
            text: 'Change (chmod) Rights (Folder/File(s))',
                handler: function() { me.dirCtxMenu.hide();openActionDialog(this, 'chmod'); }
    },        
        {
            id: 'dirCtxMenu_remove',
            icon: 'images/_editdelete.png',
            text: 'Remove',
    
                    handler: function() {
                        me.dirCtxMenu.hide();
                        var num = 1;
                        Ext.Msg.confirm('Confirm', String.format("Are you sure you want to delete these {0} item(s)?", num), function(btn) {
                            deleteDir(btn, me.dirCtxMenu.node)
                        });
                    }
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
                handler: function() { me.dirCtxMenu.hide();me.dirCtxMenu.node.reload(); }
    },
        '-', 
        {
            id: 'dirCtxMenu_cancel',
            icon: 'images/_cancel.png',
            text: 'Cancel',
                handler: function() { me.dirCtxMenu.hide(); }
        }
    ]
        }),
		
		
		   dirContext:   function(node, e ) {
                // Select the node that was right clicked
                node.select();
                // TODO: Unselect all files in the grid
                // ext_itemgrid.getSelectionModel().clearSelections();

                
                this.dirCtxMenu.items.get('dirCtxMenu_rename')[node.attributes.is_deletable ? 'enable' : 'disable']();
                this.dirCtxMenu.items.get('dirCtxMenu_remove')[node.attributes.is_deletable ? 'enable' : 'disable']();
                this.dirCtxMenu.items.get('dirCtxMenu_chmod')[node.attributes.is_chmodable ? 'enable' : 'disable']();
                
                this.dirCtxMenu.node = node;
                this.dirCtxMenu.show(e.getTarget(), 't-b?' );
                
            },
    

    	    loader: new Ext.tree.TreeLoader({
    	    	preloadChildren: true,
    	        dataUrl:'index.php',
    	        baseParams: {option:'com_extplorer', action:'getdircontents', dir: '',sendWhat: 'dirs'} // custom http params
    	    }),
        	listeners: {
            	//"load": { fn: function(node) { chDir( node.id.replace( /_RRR_/g, '/' ), true ); } }, 
        		// 'contextmenu': { fn: this.dirContext, scope: this }, // cannot be here ?!!
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
    						    	    	copymoveCtx(e);
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
		}); // end of applyIf
		
			age.TreePanel.superclass.initComponent.call(this);

        this.on('contextmenu',this.dirContext, this);
	}, // end of initComponent
	
	
	endOfClass: function(){}
});
Ext.reg('agetree',age.TreePanel);
